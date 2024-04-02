import { App } from "./components/app";
import { cpSync, writeFileSync } from "fs";
import { generateTemplate } from "./utils/wpTemplate";
import { getRoutes } from "./utils/getRoutes";
import { HelmetProvider } from "react-helmet-async";
import { renderToString } from "react-dom/server";
import { resolve } from "path";
import { StaticRouter } from "react-router-dom/server";
import { StrictMode } from "react";

export type RouteArgs = Awaited<ReturnType<typeof getRoutes>>;

const renderRouteToString = (pathname: string, routes: RouteArgs) => {
	return renderToString(
		<StrictMode>
			<HelmetProvider>
				<StaticRouter location={pathname}>
					<App routes={routes} />
				</StaticRouter>
			</HelmetProvider>
		</StrictMode>
	);
};

const compiler = async () => {
	cpSync(resolve(CORE_WP, "core/wp"), resolve(PROJECT, "_out/wp-theme"), {
		recursive: true,
	});

	cpSync(resolve(PROJECT, "src/functions"), resolve(PROJECT, "_out/wp-theme", "includes/user"), {
		recursive: true,
	});

	cpSync(resolve(PROJECT, "src/theme"), resolve(PROJECT, "_out/wp-theme"), {
		recursive: true,
	});

	const routes = await getRoutes()
		.then((routes) => routes)
		.catch((error) => {
			return [];
		});

	for (const route of routes) {
		const wpTemplate = generateTemplate(
			Object.entries(route["pathnames"]).map(([id, pathname]) => ({
				id,
				html: renderRouteToString(pathname, [route]),
			}))
		);

		writeFileSync(
			resolve(PROJECT, "_out/wp-theme", `${route["template"]}.php`),
			wpTemplate,
			"utf8"
		);
	}
};

compiler();
