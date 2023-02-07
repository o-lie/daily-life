import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/components/sidebar.module.scss";

const Sidebar = () => {
	const [ isOpen, toggleIsOpen ] = useState<boolean>(false);

	return (
		<>
			<section className={ styles.sidebar }>
				<div className={ styles.sidebar__inner }>
					<div className={ styles.sidebar__navigation }>
						<div className={ styles.sidebar__arrow }
							 // onClick={ () => toggleIsOpen(!isOpen) }
						>
							{/*<ArrowRight/>*/}
						</div>
						{/*<div className="sidebar__top">*/}
						{/*	logo*/}
						{/*</div>*/}
						<div className={ styles.sidebar__items }>
								<Link href={"/"}>Home</Link>
								<Link href={"/todos/"}>Todos</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Sidebar;