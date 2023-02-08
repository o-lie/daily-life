import Head from "next/head";
import Layout from "@/components/Layout";
import { getTodos } from "@/lib/notion";
import { Todo } from "@/types/types";
import Header from "@/components/Header";
import styles from "@/styles/pages/todos/todos.module.scss";
import { Collapse } from "@mui/material";
import { useState } from "react";
import { todosStatusDictionary } from "@/utils/dictionaries";
import Image from "next/image";

export default function TodosList(todos: { todos: Todo[] }) {
	const allTodos = todos.todos.map((todo) => todo);

	const [ isLoading, toggleIsLoading ] = useState(true);
	const [ statusState, setStatusState ] = useState(Object.values(todosStatusDictionary));

	return (
		<Layout>
			<Head><title>Todos</title></Head>
			<Header title={ "Lista todos" }/>
			<div className={ styles.todos }>
				<div className={ styles.todos__inner }>
					{
						statusState.map(stateItem => {

							return (
								<div className={ styles[ "todos__list-wrapper" ] }>
									<div
										className={ styles[ "todos__list-top-bar" ] }
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
										className={ `${ styles[ "todos__list" ] } ${ styles[ `todos__list--${ stateItem.color }` ] }` }
									>
										{
											allTodos.filter(todo => todo.status === stateItem.name).map(todo => {
												return (
													<div className={ styles[ "todos__list-item" ] } key={ todo.id }>{ todo.title }</div>
												);
											})
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

export const getStaticProps = async () => {

	const data = await getTodos();

	return {
		props: {
			todos: data
		},
		revalidate: 60
	};
};