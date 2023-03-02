import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import Layout from "@/components/Layout"; // a plugin!
import plLocale from "@fullcalendar/core/locales/pl";
import Header from "@/components/Header";
import { getTasks } from "@/lib/tasks";
import { Task } from "@/types/types";
import { EventInput } from "@fullcalendar/core";

type Props = {
	tasks: Task[]
}

const Calendar = (props: Props) => {

	const {
		tasks: tasks
	} = props;

	//@ts-ignore
	const filteredTasks: EventInput[] = tasks.filter(task => task.date !== null && !task.done).map(task => {
		return (
			{
				title: task.title,
				start: task.date,
				end: task.date
			}
		);
	});

	return (
		<>
			<Layout>
				<Header title={ "Kalendarz" }/>
				<FullCalendar
					viewClassNames={ "calendar" }
					plugins={ [ timeGridPlugin ] }
					initialView="timeGridWeek"
					locale={ plLocale }
					height={ "100%" }
					// nowIndicatorClassNames={ "now-indicator" }
					events={ filteredTasks }
				/>
			</Layout>
		</>
	);
};

export default Calendar;

export const getServerSideProps = async () => {
	const tasks = await getTasks();

	return {
		props: {
			tasks: tasks
		}
	};
};