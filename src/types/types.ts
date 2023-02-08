export type EnumDictionary<T extends string | symbol | number, U> = {
	[K in T]: U;
};

export type Todo = {
	id: string,
	title: string,
	status: Status,
	date: string
}

export enum Status {
	TODO = "To-do",
	INPROGRESS = "In progress",
	DONE = "Done"
}

export enum StatusColor {
	TODO = "grey",
	INPROGRESS = "yellow",
	DONE = "green"
}

export type StatusItem = {
	name: string,
	isOpen: boolean,
	iconSrc: string,
	color: StatusColor
}