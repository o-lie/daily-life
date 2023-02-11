import { createTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Timestamp } from "@firebase/firestore";

export const projectTheme = createTheme({
	typography: {
		fontFamily: "Poppins",
	},
	palette: {
		primary: {
			main: "#6A48F5",
			contrastText: "white"
		},
		secondary: {
			main: "#487DF5",
			contrastText: "white"
		},
		error: {
			main: "#ef233c"
		},
		warning: {
			main: "#ffd166"
		},
		success: {
			main: "#06d6a0"
		},
		info: {
			main: "#118ab2"
		}
	}
});

export const modalContentStyle = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: "12px",
	p: 4
}

export const convertDateToString = (dateAsDate: Date) => {
	return JSON.parse(JSON.stringify(dateAsDate));
}

export const convertStringToDate = (date: string) => {
		return dayjs(date).format("D/MM/YYYY");
}

export const convertDayjsToString = (date: Dayjs | string | null) => {
	return dayjs(date).format();
}

export const convertStringToTimestamp = (dayjsDate: string) => {
	return Timestamp.fromDate(dayjs(dayjsDate).toDate());
}