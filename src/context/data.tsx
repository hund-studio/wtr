import { FC, PropsWithChildren, createContext, useEffect, useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { RouteArgs } from "../compiler";

interface WpDataState {
	history: {
		data: any;
		error: any;
		key: string;
		pathname: string;
		template: string | null;
	}[];
	loading: boolean;
	current?: {
		data: any;
		error: any;
		key: string | false;
		pathname: string;
		template: string | null;
	};
}

type WpDataContext = WpDataState & {
	fetch: (
		pathname: string,
		key: string | false,
		callback: undefined | (() => Promise<void> | void)
	) => void;
};

function replacePatternWithParams(pattern: string, replacements: { [key: string]: string }) {
	return pattern.replace(/:([^/]+)/g, (match, key) => replacements[key] || match);
}

export const wpDataContext = createContext<WpDataContext>(undefined!);

export const WpDataWrapper: FC<PropsWithChildren<{ routes: RouteArgs }>> = ({
	children,
	routes,
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [dataWrapperState, setDataWrapperState] = useState<WpDataState>({
		history: [],
		loading: false,
	});

	useEffect(() => {
		fetchPathname(location["pathname"], location["key"]);
	}, []);

	useEffect(() => {
		if (location["key"]) {
			const historyData = dataWrapperState["history"].find(
				(data) => data["key"] === location["key"]
			);

			if (historyData) {
				setDataWrapperState((prevState) => ({
					...prevState,
					current: {
						...historyData,
					},
				}));
			} else {
				setDataWrapperState((prevState) => {
					if (prevState["current"]) {
						return {
							...prevState,
							history: [...prevState["history"], { ...prevState["current"], key: location["key"] }],
						};
					}

					return prevState;
				});
			}
		}
	}, [location]);

	function getRouteInfoFromPathname(pathname: string) {
		const matches = [];
		for (const route of routes) {
			for (const key in route.pathnames) {
				if (route.pathnames.hasOwnProperty(key)) {
					const routePattern = route["pathnames"][key].replace(/:slug/g, "[^/]+") + "/?";
					const routeRegex = new RegExp(`^${routePattern}$`);

					if (routeRegex.test(pathname) || routeRegex.test(`${pathname}/`)) {
						matches.push({
							pattern: route["pathnames"][key],
							endpoint: route["endpoint"],
							template: route["template"],
						});
					}
				}
			}
		}

		return matches;
	}

	const fetchPathname = async (
		pathname: string,
		key: string | false = false,
		callback: undefined | (() => Promise<void> | void) = undefined
	) => {
		const matchedRoutes = getRouteInfoFromPathname(pathname);

		setDataWrapperState((prevState) => ({
			...prevState,
			loading: true,
		}));

		if (callback) {
			await callback();
		}

		if (!!matchedRoutes["length"]) {
			for (const routeInfo of matchedRoutes) {
				let endpointUrl: string = routeInfo["endpoint"];

				if (routeInfo["pattern"].includes(":")) {
					const matchedPath = matchPath(routeInfo["pattern"], pathname);

					if (matchedPath) {
						const slug = matchedPath["params"]["slug"];
						if (slug) {
							endpointUrl = replacePatternWithParams(routeInfo["endpoint"], { slug });
						}
					}
				}

				try {
					const response = await fetch(endpointUrl);

					if (!response["ok"]) {
						throw response["status"];
					}

					const data = await response.json();

					setDataWrapperState((prevState) => {
						const current = {
							data,
							error: undefined,
							key,
							pathname: pathname,
							template: routeInfo["template"],
						};

						return {
							...prevState,
							history: key ? [...prevState["history"], { ...current, key }] : prevState["history"],
							loading: false,
							current,
						};
					});
					return;
				} catch (e) {
					continue;
				}
			}
		}

		setDataWrapperState((prevState) => {
			const current = {
				data: null,
				error: undefined,
				key,
				pathname: pathname,
				template: null,
			};

			return {
				...prevState,
				history: key ? [...prevState["history"], { ...current, key }] : prevState["history"],
				loading: false,
				current,
			};
		});
	};

	useEffect(() => {
		if (dataWrapperState["current"]) {
			if (dataWrapperState["current"]["pathname"]) {
				if (dataWrapperState["current"]["pathname"] !== location["pathname"]) {
					navigate(dataWrapperState["current"]["pathname"]);
				}
			}
		}
	}, [dataWrapperState]);

	return (
		<wpDataContext.Provider value={{ ...dataWrapperState, fetch: fetchPathname }}>
			{children}
		</wpDataContext.Provider>
	);
};
