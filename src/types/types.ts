import { Dayjs } from "dayjs";

export type EnumDictionary<T extends string | symbol | number, U> = {
	[K in T]: U;
};

export type Task = {
	id?: string,
	title: string,
	status: Status,
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
	TODO = "grey",
	DONE = "green"
}

export type StatusItem = {
	name: string,
	isOpen: boolean,
	iconSrc: string,
	color: StatusColor
}