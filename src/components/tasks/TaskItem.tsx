import styles from "@/styles/components/tasks/TaskItem.module.scss";
import { Task } from "@/types/types";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, ListItem, ListItemText, Snackbar, Stack, Switch, TextField, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { convertDayjsToString, convertStringToDate } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import MyModal from "@/components/MyModal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useRouter } from "next/router";

type Props = {
	task: Task
}

const TaskItem = (props: Props) => {

	const {
		task: task
	} = props;

	const router = useRouter();

	const [ taskState, setTaskState ] = useState<Task>(task);

	const [ isModalOpen, toggleModalOpen ] = useState(false);

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
					message: response.data.message,
					status: response.status
				};
			});
			router.replace(router.asPath);
			console.log(response);
		});
	};

	const closeModal = () => {
		toggleModalOpen(false);
		setTaskState(task);
	};

	const updateTask = () => {
		axios.post(`/api/tasks/${ taskState.id }`, taskState).then((response) => {
			setSnackbarState(prevState => {
				return {
					...prevState,
					isOpen: true,
					message: response.data.message,
					status: response.status
				};
			});
			router.replace(router.asPath);
			console.log(response);
			toggleModalOpen(false);
		});
	};

	const EditTaskModal = () => {
		return (
			<Stack spacing={ 2 }>
				<FormControl fullWidth>
					<TextField
						id="taskt-title"
						label="Nazwa"
						variant="outlined"
						value={ taskState.title }
						onChange={ e => setTaskState(prevState => {
							return {
								...prevState,
								title: e.target.value
							};
						}) }
						required
					/>
				</FormControl>
				<FormControlLabel
					control={ <Switch
						checked={ taskState.done }
						onChange={ e => setTaskState(prevState => {
							return {
								...prevState,
								done: e.target.checked
							};
						}) }
					/> }
					label="Done"
				/>
				<FormControl fullWidth>
					<LocalizationProvider dateAdapter={ AdapterDayjs }>
						<DatePicker
							onChange={ newDate => setTaskState(prevState => {
								return {
									...prevState,
									date: convertDayjsToString(newDate as Dayjs)
								};
							}) }
							renderInput={ (params) => <TextField { ...params }/> }
							value={ taskState.date }
							label={ "Data" }
						/>
					</LocalizationProvider>
				</FormControl>
				<Stack spacing={ 2 } direction="row">
					<Button
						type="submit"
						variant="contained"
						onClick={ () => updateTask() }
						disabled={ taskState.title === "" }
					>
						Zapisz
					</Button>
					<Button color="secondary" variant={ "outlined" } onClick={ () => closeModal() }>Anuluj</Button>
				</Stack>
			</Stack>
		);
	};

	// useEffect(() => {
	// 	updateTask();
	// }, [taskState.done]);

	return (
		<>
			<MyModal isOpen={ isModalOpen } handleClose={ () => toggleModalOpen(false) } title={ "Edytuj zadanie" } children={ EditTaskModal() }/>
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
								onClick={ () => toggleModalOpen(true) }>
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
				{/*<FormControl>*/}
				{/*	<Tooltip title="Oznacz jako wykonane">*/}
				{/*		<Checkbox*/}
				{/*			checked={ taskState.done }*/}
				{/*			onChange={ (e) => setTaskState(prevState => {*/}
				{/*				return {*/}
				{/*					...prevState,*/}
				{/*					done: e.target.checked*/}
				{/*				};*/}
				{/*			})}*/}
				{/*		/>*/}
				{/*	</Tooltip>*/}
				{/*</FormControl>*/}
				<ListItemText
					primary={ task?.title }
					secondary={ task.date ? convertStringToDate(task.date as string) : "Brak daty" }
				/>
			</ListItem>
		</>

	);
};

export default TaskItem;