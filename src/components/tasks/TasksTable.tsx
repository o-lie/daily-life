import Table from "@/components/Table";
import { GridActionsCellItem, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Task } from "@/types/types";
import { Chip, Snackbar } from "@mui/material";
import { convertStringToDate, convertStringToDateTime } from "@/utils/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import MyModal from "@/components/MyModal";
import EditTaskModal from "@/components/tasks/EditTaskModal";

type Props = {
	tasks: Task[]
}

type Row = {
	id: string,
	title: string,
	status: boolean,
	date: string
}

const TasksTable = (props: Props) => {
	const tasks = props.tasks;

	const initialRows = tasks.map(task => {
		const formatedDate = task.date ? (task.allDay ? convertStringToDate(task.date as string) : convertStringToDateTime(task.date as string)) : " "

		return (
			{
				id: task.id,
				title: task.title,
				status: task.done,
				date: formatedDate
			}
		);
	});

	const [ snackbarState, setSnackbarState ] = useState({
		isOpen: false,
		message: "",
		status: 100
	});
	const [ isModalOpen, toggleModalOpen ] = useState(false);
	const [ rows, setRows ] = useState<Row[]>(initialRows);
	const [ editingTask, setEditingTask ] = useState<Task>();

	const router = useRouter();

	const handleDeleteTask = (taskId: string | undefined) => {
		axios.delete(`/api/tasks/${ taskId }`).then((response) => {
			setSnackbarState(prevState => {
				return {
					...prevState,
					isOpen: true,
					message: response.data.message,
					status: response.status
				};
			})
			router.replace(router.asPath);
			setRows(initialRows);
			console.log(response);
		});
	};

	const handleEditTask = (id: any) => {
		toggleModalOpen(true);
		setEditingTask(tasks.find(task => task.id === id));
	}

	const columns: GridColDef[] = [
		{
			field: "status",
			headerName: "Status",
			width: 150,
			renderCell: (params: GridRenderCellParams<any, boolean>) => (
				<Chip
					label={ params.value ? "Done" : "To-do" }
					size={ "small" }
					variant={ "outlined" }
					style={ {
						borderColor: params.value ? "#92f9a5" : "#92e5f9"
					} }
					icon={ <CircleIcon
						style={ {
							color: params.value ? "#48F568" : "#48D4F5"
						} }
					/> }
				/>
			)
		},
		{
			field: "title",
			headerName: "Nazwa",
			flex: 1
		},
		{
			field: "date",
			headerName: "Data",
			width: 250,
		},
		{
			field: "actions",
			type: "actions",
			width: 150,
			headerName: "Działania",
			getActions: (params) => [
				<GridActionsCellItem
					icon={ <EditIcon/> }
					label="Edytuj"
					onClick={ () => handleEditTask(params.id) }
				/>,
				<GridActionsCellItem
					icon={ <DeleteIcon/> }
					label="Usuń"
					onClick={ () =>  handleDeleteTask(params.id as string) }
				/>
			]
		}
	];

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
			{
				editingTask &&
                <MyModal isOpen={ isModalOpen } handleClose={ () => toggleModalOpen(false) } title={ "Edytuj zadanie" } children={ <EditTaskModal task={ editingTask } handleClose={ () => toggleModalOpen(false)}/> }/>
			}
			<Table
				rows={ rows }
				columns={ columns }
			/>
		</>
	);
};

export default TasksTable;