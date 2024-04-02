import axios from "axios";

interface Path {
	pathnames: Record<string, string>;
	templates: Array<string>;
	endpoint: string;
}

type Paths = Array<Path>;

export const getRoutes = async () => {
	let paths: Paths;

	paths = (() => {
		try {
			const innerHTML = document.getElementById("routes")?.["innerHTML"];

			if (!innerHTML) {
				throw new Error("");
			}

			return JSON.parse(innerHTML);
		} catch (e) {
			return null;
		}
	})();

	if (!paths) {
		const { data } = await axios.get<Paths>(`${WP_HOST}/wp-json/wtr/v1/routes`);
		paths = data;
	}

	return (
		await Promise.all(
			paths.map(async (path) => {
				const { pathnames, templates, endpoint } = path;
				const [template] = (
					await Promise.all(
						templates.map(async (template) => {
							try {
								// @ts-ignore
								const { default: Template } = await import(`@/src/app/[${template}]/page`);
								return { template, Template };
							} catch (error) {
								// Simply ignore
							}
						})
					)
				).flatMap((i) => (!!i ? [i] : []));

				if (template) {
					return {
						...template,
						pathnames,
						endpoint,
					};
				}
			})
		)
	).flatMap((i) => (!!i ? [i] : []));
};
