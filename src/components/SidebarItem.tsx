import clsx from "clsx";
import styles from "@/styles/components/sidebar.module.scss";
import { SidebarItem } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
	className?: string,
	item: SidebarItem,
	isSidebarOpen: boolean
}

const SidebarItem = (props: Props) => {
	const {
		item: {
			icon: Icon,
			title,
			link
		},
		isSidebarOpen
	} = props;

	const router = useRouter();
	const currentRoute = router.pathname;

	return (
		<Link
			className={ clsx(
				[ styles[ "sidebar__item" ] ],
				{
					[ styles[ "sidebar__item--active" ] ]: currentRoute === link
				}
			) }
			href={ link }
		>
			<Icon />
			<div
				className={ clsx([ styles[ "sidebar__item-text" ] ], {
					[ styles[ "sidebar__item-text--visible" ] ]: isSidebarOpen
				}) }
			>
				{ title }
			</div>
		</Link>
	)
}

export default SidebarItem;