import { FC, Fragment, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { RouteArgs } from "../compiler";
import { WpDataWrapper, wpDataContext } from "../context/data";
import parse from "html-react-parser";

// @ts-ignore
const { default: Root } = await import(`@/src/app/layout`);

const WordpressHead: FC<{ html: string }> = ({ html }) => {
	if (html) {
		return <Helmet>{parse(html)}</Helmet>;
	}

	return null;
};

const Resolver: FC<{
	template: string;
	Template: FC<{ data: any; error: any; loading: boolean }>;
}> = ({ Template, template }) => {
	const { current, loading } = useContext(wpDataContext);

	if (!current) {
		return null;
	}

	const { data, error, template: targetTemplate } = current;

	if (template !== targetTemplate) {
		return null;
	}

	return (
		<Fragment>
			{data && <WordpressHead html={data["yoast_head"]} />}
			<Template key={JSON.stringify(data)} data={data} error={error} loading={loading} />
		</Fragment>
	);
};

export const App: FC<{ routes: RouteArgs }> = ({ routes }) => {
	const routeTemplates = routes
		.reduce<
			{
				pathname: string;
				templates: { endpoint: string; Component: FC<{ data: any; error: any }>; name: string }[];
			}[]
		>((acc, route) => {
			const pathnames = [...new Set(Object.values(route["pathnames"]))];
			const matchedPathnames = acc.filter(({ pathname }) => pathnames.includes(pathname));
			const routeTemplate = {
				endpoint: route["endpoint"],
				name: route["template"],
				Component: route["Template"],
			};

			if (!!matchedPathnames["length"]) {
				for (const matchedPathname of matchedPathnames) {
					matchedPathname["templates"].push(routeTemplate);
				}
			} else {
				for (const pathname of pathnames) {
					acc.push({
						pathname,
						templates: [routeTemplate],
					});
				}
			}

			return acc;
		}, [])
		.sort((a, b) => a.pathname.localeCompare(b.pathname));

	return (
		<WpDataWrapper routes={routes}>
			<Root>
				<Routes>
					{routeTemplates.map(({ pathname, templates }) => (
						<Route
							key={pathname}
							path={pathname}
							element={
								<Fragment>
									{templates.map((template) => (
										<Resolver
											key={template["name"]}
											template={template["name"]}
											Template={template["Component"]}
										/>
									))}
								</Fragment>
							}
						/>
					))}
				</Routes>
			</Root>
		</WpDataWrapper>
	);
};
