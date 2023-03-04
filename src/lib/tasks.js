import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import { convertDateToString, convertStringToTimestamp } from "@/utils/constants";

const tasksCollectionRef = collection(db, "tasks");

export const getTasks = async () => {
	try {
		const data = await getDocs(tasksCollectionRef);

        console.log(data);
        return data.docs.map(doc => {
            return (getTaskMeta(doc));
        })
	} catch (e) {
        console.log(e);
		return e;
	}
}

export const addTask = async (task) => {
    if(task.date == null) {
        await addDoc(tasksCollectionRef, {title: task.title, done: task.done, allDay: task.allDay});
        console.log(`Task was successfully created.`)
    }
    else {
        await addDoc(tasksCollectionRef, {title: task.title, done: task.done, allDay: task.allDay, date: convertStringToTimestamp(task.date)});
        console.log(`Task was successfully created.`)
    }
}

export const updateTask = async (task) => {
    const docRef = doc(db, "tasks", task.id);

    if(task.date == null) {
        await setDoc(docRef, {
            title: task.title,
            done: task.done,
            allDay: task.allDay
        });
    }
    else {
        await setDoc(docRef, {
            title: task.title,
            done: task.done,
            allDay: task.allDay,
            date: convertStringToTimestamp(task.date)
        });
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
            done: task.data().done,
            allDay: task.data().allDay,
            date: convertDateToString(task.data().date.toDate())
        }
    }
	else {
        return {
            id: task.id,
            title: task.data().title,
            done: task.data().done,
            allDay: task.data().allDay
        }
    }
}

