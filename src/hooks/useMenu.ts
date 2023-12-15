import { useEffect, useState } from "react";

interface MenuItem {
	label: string;
	to: string;
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
		}
	}, []);

	return data;
};

export { useMenu };
