import Card from "@/components/Card";
import styles from "@/styles/components/TodosForTodayCard.module.scss";
import { getTodos } from "@/lib/notion";
import { Todo } from "@/types/types";
import moment from "moment";

const TodosForTodayCard = (todos: Todo[]) => {

	const today = new Date();

	return (
		<Card>
			<h3>Todos na dziś</h3>
			<div>
				{
					todos.filter(todo => todo.date === today.toDateString())
						.map(todo =>
							(
								<div>{todo.title}</div>
							)
						)
				}
			</div>
		</Card>
	)
}

export default TodosForTodayCard;

