import { useEffect, useState } from "react";

interface LocaleData {
	current: string;
	available: string[];
}

const useLocale = () => {
	const [data, setData] = useState<LocaleData | null>(null);

	useEffect(() => {
		const scriptElement = document.getElementById("locale-data");

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

export { useLocale };
