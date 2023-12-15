import axios from "axios";

interface Path {
	pathnames: Record<string, string>;
	templates: Array<string>;
	endpoint: string;
}

type Paths = Array<Path>;

export const getRoutes = async () => {
	const { data: paths } = await axios.get<Paths>(`${WP_HOST}/wp-json/wpreact/v1/registered-paths`);

	// esle get by id

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
								console.warn(`"${template}" not found while looking for available templates...`);
							}
						})
					)
				).flatMap((i) => (!!i ? [i] : []));

				if (template) {
					return {
						pathnames,
						template: templates[0],
						Template: template["Template"],
						endpoint,
					};
				}
			})
		)
	).flatMap((i) => (!!i ? [i] : []));
};
