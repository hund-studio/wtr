import { FC, Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Route, Routes, useParams } from "react-router-dom";
import { RouteArgs } from "../compiler";
import { useFetch } from "usehooks-ts";
import parse from "html-react-parser";

// @ts-ignore
const { default: Root } = await import(`@/src/app/layout`);

const WordpressHead: FC<{ html: string }> = ({ html }) => {
	if (html) {
		return <Helmet>{parse(html)}</Helmet>;
	}

	return null;
};

function replaceSlugWithObject(slug: string | null, replacements: any) {
	if (!slug) {
		return undefined;
	}
	return slug.replace(/:([^/]+)/g, (match, key) => replacements[key] || match);
}

const RouteResolver: FC<{
	endpoint: string;
	Template: FC<{ data: any; error: any }>;
}> = ({ endpoint, Template }) => {
	let { slug } = useParams();
	const { data, error } = useFetch<any>(replaceSlugWithObject(endpoint, { slug }));

	return (
		<Fragment>
			{data && <WordpressHead html={data["yoast_head"]} />}
			<Template data={data} error={error} />
		</Fragment>
	);
};

export const App: FC<{ routes: RouteArgs }> = ({ routes }) => {
	return (
		<Root>
			<Routes>
				{routes.map(({ pathnames, endpoint, Template }) =>
					Object.values(pathnames).map((pathname) => (
						<Route
							key={pathname}
							path={pathname}
							element={<RouteResolver endpoint={endpoint} Template={Template} />}
						/>
					))
				)}
			</Routes>
		</Root>
	);
};
