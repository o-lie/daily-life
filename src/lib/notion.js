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
        title: todo.properties.Name.title[ 0 ].plain_text,
        status: todo.properties.Status.status.name
    };
};