import type { NextApiRequest, NextApiResponse } from "next";
import { deleteTask, updateTask } from "@/lib/tasks";
import { getServerSideProps } from "@/pages/tasks";

type Data = {
	message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	if (req.method === "DELETE") {
		const id = String(req.query.id);

		deleteTask(id).then(() => res.status(200).send({
			message: `Task: ${ id } was sucessfully deleted.`
		}));
	}

	if (req.method === "POST") {
		const task = req.body;

		updateTask(task).then(() => res.status(200).send({
			message: `Task: ${ task.id } was sucessfully updated.`
		}));
	}

}
