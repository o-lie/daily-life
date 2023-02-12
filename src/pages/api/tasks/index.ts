import type { NextApiRequest, NextApiResponse } from "next";
import { addTask } from "@/lib/tasks";

type Data = {
	name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const method = req.method;
	console.log(req);
	if (method === "POST") {
		const task = req.body;
		console.log(task);
		addTask(task).then((_: any) => res.status(200).end(`Task was sucessfully created`));
	}
	else return res.json({name: "Success"});
}
