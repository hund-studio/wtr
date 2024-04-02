declare const MODE: string;
declare const PROJECT: string;
declare const CORE_WP: string;
declare const WP_HOST: string;

declare module "*.scss" {
	const styles: { [className: string]: string };
	export default styles;
}

declare module "*.png" {
	const value: any;
	export default value;
}

declare module "*.jpg" {
	const value: any;
	export default value;
}

declare module "*.svg" {
	const value: any;
	export default value;
}
