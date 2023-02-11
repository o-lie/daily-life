import type { NextApiRequest, NextApiResponse } from "next";
import { deleteTask } from "@/lib/tasks";
import { getServerSideProps } from "@/pages/tasks";

type Data = {
	name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const id = String(req.query.id);

	if (req.method === "DELETE") {
		deleteTask(id).then(r => res.status(200).end(`Task: ${ id } was sucessfully deleted`));
	}

}
