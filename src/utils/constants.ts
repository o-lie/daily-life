import { createTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Timestamp } from "@firebase/firestore";
import TasksIcon from "public/images/tasks.svg";
import DashboardIcon from "public/images/dashboard.svg";
import "dayjs/locale/pl";
import { plPL } from "@mui/x-date-pickers";

export const projectTheme = createTheme({
		typography: {
			fontFamily: "Nunito"
		},
		palette: {
			primary: {
				main: "#6A48F5",
				contrastText: "white"
			},
			secondary: {
				main: "#48D4F5",
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
	},
	plPL
);

export const modalContentStyle = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: "12px",
	p: 4,
	display: "flex",
	flexDirection: "column",
	gap: "1rem"
};

export const sidebarItems = [
	{
		icon: DashboardIcon,
		title: "Home",
		link: "/"
	},
	{
		icon: TasksIcon,
		title: "Zadania",
		link: "/tasks"
	}
];

export const convertDateToString = (dateAsDate: Date) => {
	return JSON.parse(JSON.stringify(dateAsDate));
};

export const convertStringToDate = (date: string) => {
	return dayjs(date).format("D.MM.YYYY");
};

export const convertStringToDateTime = (date: string) => {
	return dayjs(date).format("HH:mm D.MM.YYYY");
};

export const convertDayjsToString = (date: Dayjs | string | null) => {
	return dayjs(date).format();
};

export const convertStringToTimestamp = (dayjsDate: string) => {
	return Timestamp.fromDate(dayjs(dayjsDate).toDate());
};