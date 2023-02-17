import styles from "@/styles/components/layout.module.scss";
import Sidebar from "@/components/Sidebar";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarMobile from "@/components/SidebarMobile";

export default function Layout({ children }: { children: React.ReactNode }) {

	const router = useRouter();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ isMobile, toggleIsMobile ] = useState<boolean>(window.innerWidth < 992);

	useEffect(() => {
		router.events.on("routeChangeStart", () => {
			setIsLoading(true);
		});

		router.events.on("routeChangeComplete", () => {
			setIsLoading(false);
		});

		router.events.on("routeChangeError", () => {
			setIsLoading(false);
		});

		window.addEventListener("resize", () => {
			if (window.innerWidth < 992) {
				toggleIsMobile(true);
			} else {
				toggleIsMobile(false);
			}
		});

	}, []);

	return (
		<>
			<div className={ styles.layout }>
				{
					isMobile ?
						<SidebarMobile/>
						:
						<Sidebar/>
				}
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