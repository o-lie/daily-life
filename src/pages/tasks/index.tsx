import Head from "next/head";
import Layout from "@/components/Layout";
import { Task } from "@/types/types";
import Header from "@/components/Header";
import styles from "@/styles/pages/tasks/tasks.module.scss";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Stack, Tab, Tabs, TextField } from "@mui/material";
import { useState } from "react";
import { tasksStatusDictionary } from "@/utils/dictionaries";
import { getTasks } from "@/lib/tasks";
import { convertDayjsToString } from "@/utils/constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import axios from "axios";
import MyModal from "@/components/MyModal";
import { useRouter } from "next/router";
import { EventInput } from "@fullcalendar/core";
import Calendar from "@/components/Calendar";
import TasksTable from "@/components/tasks/TasksTable";

type Props = {
	tasks: Task[]
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const initialState: Task = {
	id: "",
	title: "",
	done: false,
	date: null,
	allDay: true
};

export default function TodosList(props: Props) {

	const {
		tasks: tasks
	} = props;

	const router = useRouter();

	const [ openedTab, setOpenedTab ] = useState(0);
	const [ isModalOpen, toggleModalOpen ] = useState(false);
	const [ snackbarState, setSnackbarState ] = useState({
		isOpen: false,
		message: "",
		status: 100
	});

	const [ newTask, setNewTask ] = useState<Task>(initialState);

	//@ts-ignore
	const filteredTasks: EventInput[] =
		tasks.filter(task => task.date !== null && !task.done)
			 .map(task => {
				 return task.allDay ? (
						 {
							 title: task.title,
							 start: task.date,
							 allDay: true
						 })
					 :
					 ({
							 title: task.title,
							 start: task.date,
							 end: task.date
						 }
					 );
			 });


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
				<FormControlLabel
					control={
						<Checkbox
							checked={ newTask.allDay }
							onChange={ e => setNewTask(prevState => {
								return {
									...prevState,
									allDay: e.target.checked
								};
							}) }
						/>
					}
					label={ "Całodniowe" }
				/>
				<FormControl fullWidth>
					<LocalizationProvider dateAdapter={ AdapterDayjs } adapterLocale={ "pl" }>
						{
							newTask.allDay
								?
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
								:
								<DateTimePicker
									label="Data"
									value={ newTask.date }
									onChange={ newDate => setNewTask(prevState => {
										return {
											...prevState,
											date: convertDayjsToString(newDate as Dayjs)
										};
									}) }
									renderInput={ (params) => <TextField { ...params } /> }
								/>
						}


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

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setOpenedTab(newValue);
	};

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${ index }`,
			"aria-controls": `simple-tabpanel-${ index }`
		};
	}

	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={ value !== index }
				id={ `simple-tabpanel-${ index }` }
				aria-labelledby={ `simple-tab-${ index }` }
				{ ...other }
			>
				{ value === index && (
					<Box sx={ { p: 3 } }>
						{ children }
					</Box>
				) }
			</div>
		);
	}

	const handleModalOpen = () => {
		toggleModalOpen(true);
	};

// @ts-ignore
	return (
		<Layout>
			<Head><title>Tasks</title></Head>
			<Header
				title={ "Lista zadań" }
				buttonPrimary={
					{
						title: "Dodaj zadanie",
						handleClick: handleModalOpen
					}
				}
			/>
			<MyModal isOpen={ isModalOpen } title={ "Dodaj nowe zadanie" } handleClose={ () => toggleModalOpen(false) } children={ AddTaskModal() }/>
			<div className={ styles.tasks }>
				<Box sx={ { borderBottom: 1, borderColor: "divider" } }>
					<Stack direction={ "row" } spacing={ 2 } justifyContent={ "space-between" }>

					</Stack>
					<Tabs value={ openedTab } onChange={ handleTabChange } aria-label="basic tabs example">
						<Tab label="Lista" { ...a11yProps(0) } />
						<Tab label="Kalendarz" { ...a11yProps(1) } />
					</Tabs>
				</Box>
				<div className={ styles.tasks__inner }>
					<TabPanel value={ openedTab } index={ 0 }>
						<TasksTable tasks={tasks}/>
					</TabPanel>
					<TabPanel value={ openedTab } index={ 1 }>
						<Calendar events={ filteredTasks }/>
					</TabPanel>

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