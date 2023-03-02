import { EnumDictionary, StatusColor, StatusItem } from "@/types/types";
import { Status } from "@/types/types";

export const tasksStatusDictionary: EnumDictionary<Status, StatusItem> = {
	[ Status.TODO ]:
		{
			name: Status.TODO,
			isDone: false,
			isOpen: false,
			color: StatusColor.TODO
		},
	[ Status.DONE ]:
		{
			name: Status.DONE,
			isDone: true,
			isOpen: false,
			color: StatusColor.DONE
		}
};