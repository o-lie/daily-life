import styles from "@/styles/components/header.module.scss";
import { Button, Stack } from "@mui/material";

type Props = {
	title: string,
	buttonPrimary?: {
		title: string,
		handleClick: () => void
	}
}

function HeaderComponent(props: Props) {

	const {
		title,
		buttonPrimary
	} = props;

	return (
		<div className={ styles.header }>
			<div className={ styles.header__top }>
				<Stack>
					<h1 className={ styles.header__title }>{ title }</h1>
					{/*<MyBreadcrumbs/>*/ }
				</Stack>
				{
					buttonPrimary &&
                    <Button variant={ "contained" } onClick={ buttonPrimary.handleClick }>{ buttonPrimary.title }</Button>
				}
			</div>
		</div>
	);
}

export default HeaderComponent;