import Head from "next/head";
import Layout from "@/components/Layout";
import { Task } from "@/types/types";
import Header from "@/components/Header";
import styles from "@/styles/pages/tasks/tasks.module.scss";
import { Box, Button, Collapse, FormControl, IconButton, ListItem, ListItemText, Paper, Snackbar, Stack, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { tasksStatusDictionary } from "@/utils/dictionaries";
import CircleIcon from "@mui/icons-material/Circle";
import TaskItem from "@/components/tasks/TaskItem";
import { getTasks } from "@/lib/tasks";
import { convertDayjsToString, convertStringToDate } from "@/utils/constants";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import axios from "axios";
import MyModal from "@/components/MyModal";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
	tasks: Task[]
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
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

	const [ openedTab, setOpenedTab ] = useState(0);
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
					<LocalizationProvider dateAdapter={ AdapterDayjs } adapterLocale={ "pl" }>
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
						<Typography>{ children }</Typography>
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
						<Tab label="Tabela" { ...a11yProps(2) } />
					</Tabs>
				</Box>
				<TabPanel value={ openedTab } index={ 0 }>
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
											<CircleIcon
												style={ {
													color: stateItem.color
												} }
											/>
											<h3>{ stateItem.name }</h3>
										</div>
										<Collapse
											in={ stateItem.isOpen }
											className={ styles[ "tasks__list" ] }
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
				</TabPanel>
				<TabPanel value={ openedTab } index={ 1 }>
					Kalendarz
				</TabPanel>
				<TabPanel value={ openedTab } index={ 2 }>
					<TableContainer>
						<Table sx={ { minWidth: 650 } } aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="left"><h3>Status</h3></TableCell>
									<TableCell align="left"><h3>Tytuł</h3></TableCell>
									<TableCell align="left"><h3>Data</h3></TableCell>
									<TableCell align="right"><h3>Akcje</h3></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									tasks.map((task) => (
										<TableRow
											key={ task.title }
											sx={ { "&:last-child td, &:last-child th": { border: 0 } } }
										>
											<TableCell align="left">
												<Switch checked={ task.done }/>
											</TableCell>
											<TableCell component="th" scope="row">
												{ task.title }
											</TableCell>
											<TableCell align="left">{ task.date ? convertStringToDate(task.date as string) : "Brak daty" }</TableCell>
											<TableCell align="right">
												<Tooltip title="Edytuj">
													<IconButton
														onClick={ () => console.log("edit") }>
														<EditIcon/>
													</IconButton>
												</Tooltip>
												<Tooltip title="Usuń">
													<IconButton
														onClick={ () => console.log("delete") }
													>
														<DeleteIcon/>
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					</TableContainer>
				</TabPanel>
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