import { useEffect, useState } from "react";

interface WebsiteData {
	rest_url: string;
}

const useSiteInfo = () => {
	const [data, setData] = useState<WebsiteData | null>(null);

	useEffect(() => {
		const scriptElement = document.getElementById("website-data");

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

export { useSiteInfo };
