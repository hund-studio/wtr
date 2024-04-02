import { FC, PropsWithChildren } from "react";
import { LinkProps, Link as RouterLink } from "react-router-dom";

export const Link: FC<PropsWithChildren<LinkProps>> = (props) => {
	const to = props["to"].toString().startsWith(WP_HOST)
		? props["to"].toString().replace(WP_HOST, "")
		: props["to"];
	return <RouterLink {...props} to={to} />;
};
