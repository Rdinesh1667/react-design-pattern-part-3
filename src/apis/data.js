export const initialTasks = {
    tasks: [
        { id: "task-1", content: "Implement drag and drop for task board" },
        { id: "task-2", content: "Use Context for manage globel state" },
        { id: "task-3", content: "Fix the Bug" },
        { id: "task-4", content: "Add user Profile future" },
    ],
    columns: [
        {
            id: "column-1",
            title: "Task",
            taskIds: ["task-1", "task-2"],
        },
        {
            id: "column-2",
            title: "In Progress",
            taskIds: ["task-3"],
        },
        {
            id: "column-3",
            title: "Done",
            taskIds: ["task-4"],
        },
    ],
    columnOrder: ["column-1", "column-2", "column-3"],
};
