import { FC, PropsWithChildren, useContext } from "react";
import { wpDataContext } from "../context/data";

const stripWpHostFromTo = (to?: string) => {
	if (!to) {
		return undefined;
	}

	return to.toString().startsWith(WP_HOST) ? to.toString().replace(WP_HOST, "") : to;
};

export const Link: FC<
	PropsWithChildren<JSX.IntrinsicElements["a"] & { callback?: () => Promise<void> | void }>
> = ({ callback, ...props }) => {
	const wpData = useContext(wpDataContext);
	const to = stripWpHostFromTo(props["href"]);

	const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
		event.preventDefault();
		if (to) {
			wpData.fetch(to, false, callback);
		}
	};

	return <a {...props} onClick={handleClick} href={to} />;
};
