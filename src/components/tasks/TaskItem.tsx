import styles from "@/styles/components/tasks/TaskItem.module.scss";
import { Task } from "@/types/types";
import { Checkbox, FormControlLabel, FormGroup, IconButton, ListItem, ListItemText, Snackbar, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { convertStringToDate } from "@/utils/constants";
import axios from "axios";
import { useState } from "react";

type Props = {
	task: Task
}

const TaskItem = (props: Props) => {
	const {
		task: task
	} = props;

	const [ snackbarState, setSnackbarState ] = useState({
		isOpen: false,
		message: "",
		status: 100
	});

	const handleDeleteTask = (taskId: string | undefined) => {
		axios.delete(`/api/tasks/${ taskId }`).then((response) => {
			setSnackbarState(prevState => {
				return {
					...prevState,
					isOpen: true,
					message: response.data,
					status: response.status
				};
			});
		});
	};

	return (
		<>
			<Snackbar
				open={ snackbarState.isOpen }
				autoHideDuration={ 6000 }
				onClose={ () => setSnackbarState(prevState => {
					return {
						...prevState,
						isOpen: false
					};
				}) }
				message={ snackbarState.message }
			/>
			<ListItem
				className={ styles[ "task-item" ] }
				secondaryAction={
					<>
						<Tooltip title="Edytuj">
							<IconButton
								//Todo Add edit
								onClick={ () => console.log("Edytuj") }>
								<EditIcon/>
							</IconButton>
						</Tooltip>
						<Tooltip title="Usuń">
							<IconButton
								onClick={ () => handleDeleteTask(task.id) }
							>
								<DeleteIcon/>
							</IconButton>
						</Tooltip>
					</>

				}
			>
				<FormGroup>
					<FormControlLabel control={<Checkbox defaultChecked />} label="" />
				</FormGroup>
				<ListItemText
					primary={ task?.title }
					secondary={ task.date ? convertStringToDate(task.date as string) : "Brak daty" }
				/>
			</ListItem>
		</>

	);
};

export default TaskItem;