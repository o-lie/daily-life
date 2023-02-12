import Head from "next/head";
import Layout from "@/components/Layout";
import { Task } from "@/types/types";
import Header from "@/components/Header";
import styles from "@/styles/pages/tasks/tasks.module.scss";
import { Box, Button, Collapse, Divider, FormControl, IconButton, ListItem, ListItemText, Modal, Snackbar, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { tasksStatusDictionary } from "@/utils/dictionaries";
import Image from "next/image";
import TaskItem from "@/components/tasks/TaskItem";
import { getTasks } from "@/lib/tasks";
import AddIcon from "@mui/icons-material/AddCircle";
import { convertDayjsToString, modalContentStyle } from "@/utils/constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import axios from "axios";
import MyModal from "@/components/MyModal";
import { useRouter } from "next/router";
import { TransitionGroup } from "react-transition-group";

type Props = {
	tasks: Task[]
}

const initialState = {
	title: "",
	done: false,
	date: null
};

export default function TodosList(props: Props) {

	const {
		tasks: tasks
	} = props;

	const router = useRouter();

	const [ statusState, setStatusState ] = useState(Object.values(tasksStatusDictionary));
	const [ isModalOpen, toggleModalOpen ] = useState(false);
	const [ snackbarState, setSnackbarState ] = useState({
		isOpen: false,
		message: "",
		status: 100
	});
	const [ newTask, setNewTask ] = useState<Task>(initialState);

	const onClose = () => {
		toggleModalOpen(false);
		setNewTask(initialState);
	};

	const onSubmit = () => {
		axios.post("/api/tasks", newTask).then((response) => {
			setSnackbarState(prevState => {
				return {
					...prevState,
					isOpen: true,
					message: response.data.message,
					status: response.status
				};
			});
			router.replace(router.asPath);
			toggleModalOpen(false);
			setNewTask(initialState);
		});
	};

	const AddTaskModal = () => {
		return (
			<Stack spacing={ 2 }>
				<FormControl fullWidth>
					<TextField
						id="taskt-title"
						label="Nazwa"
						variant="outlined"
						value={ newTask?.title }
						onChange={ e => setNewTask(prevState => {
							return {
								...prevState,
								title: e.target.value
							};
						}) }
						required
					/>
				</FormControl>
				<FormControl fullWidth>
					<LocalizationProvider dateAdapter={ AdapterDayjs }>
						<DatePicker
							onChange={ newDate => setNewTask(prevState => {
								return {
									...prevState,
									date: convertDayjsToString(newDate as Dayjs)
								};
							}) }
							renderInput={ (params) => <TextField { ...params }/> }
							value={ newTask.date }
							label={ "Data" }
						/>
					</LocalizationProvider>
				</FormControl>
				<Stack spacing={ 2 } direction="row">
					<Button
						type="submit"
						variant="contained"
						onClick={ onSubmit }
						disabled={ newTask.title === "" }
					>
						Zapisz
					</Button>
					<Button color="secondary" variant={ "outlined" } onClick={ () => onClose() }>Anuluj</Button>
				</Stack>
			</Stack>
		);
	};

	// @ts-ignore
	return (
		<Layout>
			<Head><title>Tasks</title></Head>
			<Header title={ "Lista zadań" }/>
			<MyModal isOpen={ isModalOpen } title={ "Dodaj nowe zadanie" } handleClose={ () => toggleModalOpen(false) } children={ AddTaskModal() }/>
			<div className={ styles.tasks }>
				<Tooltip title={ "Dodaj" }>
					<IconButton
						onClick={ () => toggleModalOpen(true) }
					>
						<AddIcon/>
					</IconButton>
				</Tooltip>
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
				<div className={ styles.tasks__inner }>
					{
						statusState.map(stateItem => {
							const currentTasks = tasks.filter(task => task.done === stateItem.isDone);

							return (
								<div key={ stateItem.name } className={ styles[ "tasks__list-wrapper" ] }>
									<div
										className={ styles[ "tasks__list-top-bar" ] }
										onClick={ () => setStatusState(prevState => prevState.map(state => {
											if (stateItem.name !== state.name) return state;

											return {
												...state,
												isOpen: !state.isOpen
											};
										})) }
									>
										<Image
											src={ stateItem.iconSrc }
											width={ 30 }
											height={ 30 }
											alt="status icon"
										/>
										<h3>{ stateItem.name }</h3>
									</div>
									<Collapse
										in={ stateItem.isOpen }
										className={ `${ styles[ "tasks__list" ] } ${ styles[ `tasks__list--${ stateItem.color }` ] }` }
									>
										{

											currentTasks.length > 0
												?
												currentTasks.map(task => {
													return (
														<TaskItem key={ task.id } task={ task }/>
													);
												})
												:
												<ListItem>
													<ListItemText primary={ "Nie ma żadnych zadań z tym statusem." }/>
												</ListItem>
										}
									</Collapse>
								</div>
							);
						})
					}
				</div>
			</div>
		</Layout>
	);
}

export const getServerSideProps = async () => {
	const tasks = await getTasks();

	return {
		props: {
			tasks: tasks
		}
	};
};