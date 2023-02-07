import styles from "@/styles/components/layout.module.scss";
import Sidebar from "@/components/Sidebar";

export default function Layout ({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className={ styles.layout }>
				<Sidebar/>
				<div className={ styles.layout__inner }>
					{ children }
				</div>
			</div>
		</>
	);
};