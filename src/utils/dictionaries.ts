import { EnumDictionary, StatusColor, StatusItem } from "@/types/types";
import { Status } from "@/types/types";

export const todosStatusDictionary: EnumDictionary<Status, StatusItem> = {
	[ Status.TODO ]:
		{
			name: Status.TODO,
			isOpen: false,
			iconSrc: "/images/todo.svg",
			color: StatusColor.TODO
		},
	[ Status.INPROGRESS ]:
		{
			name: Status.INPROGRESS,
			isOpen: false,
			iconSrc: "/images/in-progress.svg",
			color: StatusColor.INPROGRESS
		},
	[ Status.DONE ]:
		{
			name: Status.DONE,
			isOpen: false,
			iconSrc: "/images/done.svg",
			color: StatusColor.DONE
		}
};