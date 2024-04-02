import "./layout.scss";
import { FC, Fragment, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Fragment>
			<main>{children}</main>
		</Fragment>
	);
};

export default RootLayout;
