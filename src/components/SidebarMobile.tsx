import styles from "@/styles/components/sidebar.module.scss";
import { Drawer } from "@mui/material";
import clsx from "clsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { sidebarItems } from "@/utils/constants";
import { useState } from "react";
import SidebarItem from "@/components/SidebarItem";

const SidebarMobile = () => {
	const [ isOpen, toggleIsOpen ] = useState<boolean>(false);

	return (
		<section className={ clsx([ styles.sidebar ], [styles["sidebar--mobile"]]) }>
			<div
				className={ clsx([ styles.sidebar__arrow ], [ styles[ "sidebar__arrow--mobile" ] ], { [ styles[ "sidebar__arrow--mobile-open" ] ]: isOpen }) }
				onClick={ () => toggleIsOpen(!isOpen) }
			>
				<ArrowForwardIosIcon color="secondary"/>
			</div>
			<Drawer
				anchor={ "left" }
				open={ isOpen }
				onClose={ () => toggleIsOpen(false) }
				classes={
					{
						root: styles[ "sidebar__drawer" ]
					}
				}
				PaperProps={
					{
						classes: {
							root: styles[ "sidebar__mobile" ]
						}
					}
				}
			>
				{/*<div className="sidebar__top">*/ }
				{/*	logo*/ }
				{/*</div>*/ }
				<div className={ styles.sidebar__items }>
					{
						sidebarItems.map(item =>
							<SidebarItem key={ item.title } item={ item } isSidebarOpen={ isOpen }/>
						)
					}
				</div>
			</Drawer>
		</section>
	);
};

export default SidebarMobile;