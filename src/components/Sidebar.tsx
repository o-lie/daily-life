import { useState } from "react";
import styles from "@/styles/components/sidebar.module.scss";
import clsx from "clsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { sidebarItems } from "@/utils/constants";
import SidebarItem from "@/components/SidebarItem";

const Sidebar = () => {
	const [ isOpen, toggleIsOpen ] = useState<boolean>(false);

	return (
		<>
			<section className={ styles.sidebar }>
				<div className={ styles.sidebar__inner }>
					<div
						className={ clsx(
							[ styles.sidebar__navigation ], {
								[ styles[ "sidebar__navigation--open" ] ]: isOpen
							}
						) }
					>
						<div
							className={ clsx([ styles.sidebar__arrow ], [ styles["sidebar__arrow--desktop"] ], { [ styles[ "sidebar__arrow--left" ] ]: isOpen }) }
							onClick={ () => toggleIsOpen(!isOpen) }
						>
							<ArrowForwardIosIcon color="secondary"/>
						</div>
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
					</div>
				</div>
			</section>
		</>
	);
};

export default Sidebar;