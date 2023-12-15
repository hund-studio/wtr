import { StrictMode } from "react";
import { getRoutes } from "./utils/getRoutes";
import { hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/app";

const hydrate = async () => {
	const routes = await getRoutes();

	hydrateRoot(
		document.getElementById("app")!,
		<StrictMode>
			<HelmetProvider>
				<BrowserRouter>
					<App routes={routes} />
				</BrowserRouter>
			</HelmetProvider>
		</StrictMode>
	);
};

hydrate();
