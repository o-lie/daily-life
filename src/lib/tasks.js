import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { convertDateToString, convertStringToTimestamp } from "@/utils/constants";

const tasksCollectionRef = collection(db, "tasks");

export const getTasks = async () => {
	try {
		const data = await getDocs(tasksCollectionRef);

        return data.docs.map(doc => {
            return (getTaskMeta(doc));
        })
	} catch (e) {
		return e;
	}
}

export const addTask = async (task) => {
    if(task.date == null) {
        const docRef = await addDoc(tasksCollectionRef, {title: task.title, status: task.status})
        console.log(`task with id ${docRef.id} was created`)
    }
    else {
        const docRef = await addDoc(tasksCollectionRef, {title: task.title, status: task.status, date: convertStringToTimestamp(task.date)})
        console.log(`task with id ${docRef.id} was created`)
    }
}

export const deleteTask = async (taskId) => {
    const docRef = doc(db, "tasks", taskId);

    await deleteDoc(docRef);
}

const getTaskMeta = (task) => {
    if(task.data().date) {
        return {
            id: task.id,
            title: task.data().title,
            status: task.data().status,
            date: convertDateToString(task.data().date.toDate())
        }
    }
	else {
        return {
            id: task.id,
            title: task.data().title,
            status: task.data().status
        }
    }
}

