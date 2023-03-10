import { Dayjs } from "dayjs";

export type SVG = React.FunctionComponent<React.SVGProps<SVGSVGElement>>

export type EnumDictionary<T extends string | symbol | number, U> = {
	[K in T]: U;
};

export type Task = {
	id: string,
	title: string,
	done: boolean,
	allDay: boolean,
	date?: string | Dayjs | null
}

export type Snackbar = {
	isOpen: boolean,
	message: string,
	status: string
}

export enum RequestResponse {
	SUCCESS = 200,
	WARNING = 201,
	ERROR = 400,
	INFO = 100
}

export enum Status {
	TODO = "To-do",
	DONE = "Done"
}

export enum StatusColor {
	TODO = "#48D4F5",
	DONE = "#48F568"
}

export type StatusItem = {
	name: string,
	isDone: boolean,
	isOpen: boolean,
	color: StatusColor
}

export type SidebarItem = {
	icon: SVG,
	title: string,
	link: string
}