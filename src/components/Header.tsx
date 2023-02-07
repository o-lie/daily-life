import styles from "@/styles/components/header.module.scss";

type Props = {
	title: string,
}

function HeaderComponent(props: Props) {

	const {
		title,
	} = props;

	return (
		<div className={ styles.header }>
			<div className={ styles.header__top }>
				<h1 className={ styles.header__title }>{ title }</h1>
			</div>
		</div>
	);
}

export default HeaderComponent;