import axios from "axios";
import { useEffect, useState } from "react";

interface MenuItem {
	label: string;
	to: string;
	children?: MenuItem[];
}

interface MenuData {
	[key: string]: MenuItem[];
}

const useMenu = () => {
	const [data, setData] = useState<MenuData | null>(null);

	useEffect(() => {
		const scriptElement = document.getElementById("menu-data");

		if (scriptElement) {
			try {
				const jsonData = JSON.parse(scriptElement.textContent || "");
				setData(jsonData);
			} catch (error) {
				console.error("Error parsing menu data:", error);
			}
		} else {
			axios.get(`${WP_HOST}/wp-json/wtr/v1/menu`).then(({ data }) => setData(data));
		}
	}, []);

	return data;
};

export { useMenu };
