import Head from "next/head";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Task } from "@/types/types";
import { getTasks } from "@/lib/tasks";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import Card from "@/components/Card";
type Props = {
	tasks: Task[]
}


dayjs.extend(isToday);

export default function Home(props: Props) {

	return (
		<Layout>
			<Head>
				<title>Daily Life</title>
				<meta name="description" content="Generated by create next app"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>
			<Header title={"Dzień dobry, Oliwka!"}/>

			<Card>
				<h3>Zadania na dziś</h3>
				<div>
					{
						props.tasks
							 .filter(task => task.date != null && dayjs(task.date).isToday())
							 .map(task =>
								 (
									 <div>
										 {task.title}
									 </div>
								 )
							 )
					}
				</div>
			</Card>
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