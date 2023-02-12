import { Box, Divider, Modal, Typography } from "@mui/material";
import { modalContentStyle } from "@/utils/constants";

type Props = {
	isOpen: boolean,
	title: string,
	handleClose: any,
	children: React.ReactNode
}

const MyModal = (props: Props) => {


	const {
		isOpen: isOpen,
		title: title,
		handleClose: handleClose,
		children: children
	} = props;

	const onClose = () => {
		console.log(handleClose);
	}

	return (
		<Modal
			open={ isOpen }
			onClose={ handleClose }
		>
			<Box sx={ modalContentStyle }>
				<Typography variant="h5">{ title }</Typography>
				<Divider/>
				{ children }
			</Box>
		</Modal>
	);
};

export default MyModal;