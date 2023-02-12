import type { NextApiRequest, NextApiResponse } from "next";
import { addTask, getTasks } from "@/lib/tasks";

type Data = {
	message: string,
	data?: any
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const method = req.method;
	console.log(req);
	if(method === "GET") {
		return getTasks().then(() => res.status(200).send({
			message: `Tasks was sucessfully fetched.`,
		}));
	}
	if (method === "POST") {
		const task = req.body;
		console.log(task);
		return addTask(task).then(() => res.status(200).send({
			message: `Task was sucessfully created.`
		}));
	} else {
		return res.send({
			message: `A request has been sent.`
		});
	}
}
