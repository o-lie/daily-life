import Head from "next/head";
import Link from "next/link";

export default function TodosList() {
	return (
		<>
			<Head><title>Todos</title></Head>
			<h1>Todos</h1>
			<Link href={ "/" }>Home</Link>
		</>
	);
}