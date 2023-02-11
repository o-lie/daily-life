import Card from "@/components/Card";
import { Task } from "@/types/types";

const TasksForTodayCard = (todos: Task[]) => {
	return (
		<Card>
			<h3>Todos na dziś</h3>
			{/*<div>*/}
			{/*	{*/}
			{/*		todos.filter(todo => todo.date === today.toDateString())*/}
			{/*			.map(todo =>*/}
			{/*				(*/}
			{/*					<div key={todo.id}>{todo.title}</div>*/}
			{/*				)*/}
			{/*			)*/}
			{/*	}*/}
			{/*</div>*/}
		</Card>
	)
}

export default TasksForTodayCard;

