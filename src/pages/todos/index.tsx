import Head from "next/head";
import Layout from "@/components/Layout";
import { getTodos } from "@/lib/notion";
import { Todo } from "@/types/todos.types";
import Header from "@/components/Header";

export default function TodosList(todos: { todos: Todo[] }) {
	console.log(todos);
	return (
		<Layout>
			<Head><title>Todos</title></Head>
			<Header title={"Lista todos"}/>
			<div>
				{
					todos.todos.map((todo) => {
						return (
							<div>{todo.title}</div>
						)
					})
				}
			</div>
		</Layout>
	);
}

export const getStaticProps = async () => {
	const data = await getTodos();

	return {
		props: {
			todos: data
		},
		revalidate: 60
	};
};