import styles from "@/styles/components/layout.module.scss";
import Sidebar from "@/components/Sidebar";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarMobile from "@/components/SidebarMobile";

export default function Layout({ children }: { children: React.ReactNode }) {

	const [ isLoading, setIsLoading ] = useState(false);
	const [ isMobile, toggleIsMobile ] = useState<boolean>(false);

	const router = useRouter();

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

		const setWindowWidth = () => {
			if (window.innerWidth < 992) {
				toggleIsMobile(true);
			} else {
				toggleIsMobile(false);
			}
		};

		window.addEventListener("resize", setWindowWidth);

		setWindowWidth();

		return () => window.removeEventListener("resize", setWindowWidth);
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