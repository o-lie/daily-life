const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

export const getTodos = async () => {
    const todos = await notion.databases.query(
        {
            database_id: process.env.NOTION_TODOS_DATABASE_ID
        }
    );

    const allTodos = todos.results;

    return allTodos.map((todo) => {
        return getTodoMetaData(todo);
    });
};

const getTodoMetaData = (todo) => {
    return {
        id: todo.id,
        title: todo.properties.Name.title[ 0 ].plain_text ?? "",
        status: todo.properties.Status.status.name,
        date: todo.properties.Date.date?.start ?? ""
    };
};

function getToday (datestring) {
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = new Date();

    if (datestring) {
        date = new Date(datestring);
    }

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let today = `${month} ${day}, ${year}`;

    return today;
};