import { EnumDictionary, StatusColor, StatusItem } from "@/types/types";
import { Status } from "@/types/types";

export const tasksStatusDictionary: EnumDictionary<Status, StatusItem> = {
	[ Status.TODO ]:
		{
			name: Status.TODO,
			isDone: false,
			isOpen: false,
			iconSrc: "/images/todo.svg",
			color: StatusColor.TODO
		},
	[ Status.DONE ]:
		{
			name: Status.DONE,
			isDone: true,
			isOpen: false,
			iconSrc: "/images/done.svg",
			color: StatusColor.DONE
		}
};