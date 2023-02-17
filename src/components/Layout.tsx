import styles from "@/styles/components/layout.module.scss";
import Sidebar from "@/components/Sidebar";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {

	const router = useRouter();
	const [ isLoading, setIsLoading ] = useState(false);
	useEffect(() => {
		router.events.on("routeChangeStart", (url) => {
			setIsLoading(true);
		});

		router.events.on("routeChangeComplete", (url) => {
			setIsLoading(false);
		});

		router.events.on("routeChangeError", (url) => {
			setIsLoading(false);
		});
	}, []);

	return (
		<>
			<div className={ styles.layout }>
				<Sidebar/>
					<div className={ styles.layout__inner }>
						{
							isLoading
								?
								<LinearProgress/>
								:
								children
						}
					</div>
			</div>
		</>
	);
};