import { useLocation as _useLocation } from "react-router-dom";
import { useLocale } from "./useLocale";

const useLocation = () => {
	const locale = useLocale();
	const location = _useLocation();

	const defaultPathname =
		locale && location["pathname"].startsWith(`/${locale["current"]}`)
			? location["pathname"].replace(`/${locale["current"]}`, "")
			: location["pathname"];

	return { ...location, defaultPathname };
};

export { useLocation };
