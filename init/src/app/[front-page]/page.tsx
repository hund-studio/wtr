import styles from "./frontpage.module.scss";

export default function Page({ data, error }: any) {
	return (
		<section className={styles["container"]}>
			<h1>Homepage</h1>
		</section>
	);
}
