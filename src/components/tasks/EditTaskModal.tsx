import { Button, Checkbox, FormControl, FormControlLabel, Stack, TextField } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { convertDayjsToString } from "@/utils/constants";
import { Dayjs } from "dayjs";
import { Task } from "@/types/types";
import axios from "axios";
import { useState } from "react";

type Props = {
	task: Task,
	handleClose: any
}

const EditTaskModal = (props: Props) => {

	const [ taskState, setTaskState ] = useState<Task>(props.task);

	const handleUpdateTask = () => {
		axios.post(`/api/tasks/${ taskState.id }`, taskState).then((response) => {
			props.handleClose;
			console.log(response);
		});
	};

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
				control={
					<Checkbox
						checked={ taskState.allDay }
						onChange={ e => setTaskState(prevState => {
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
				<LocalizationProvider dateAdapter={ AdapterDayjs }>
					{
						taskState.allDay
							?
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
							:
							<DateTimePicker
								label="Data"
								value={ taskState.date }
								onChange={ newDate => setTaskState(prevState => {
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
			<FormControlLabel
				control={
					<Checkbox
						checked={ taskState.done }
						onChange={ e => setTaskState(prevState => {
							return {
								...prevState,
								done: e.target.checked
							};
						}) }
					/> }
				label="Zrobione"
			/>
			<Stack spacing={ 2 } direction="row">
				<Button
					type="submit"
					variant="contained"
					onClick={ () => handleUpdateTask() }
					disabled={ taskState.title === "" }
				>
					Zapisz
				</Button>
				<Button color="secondary" variant={ "outlined" } onClick={ props.handleClose }>Anuluj</Button>
			</Stack>
		</Stack>
	);
};

export default EditTaskModal;