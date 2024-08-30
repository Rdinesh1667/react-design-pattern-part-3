import React, { useReducer, useState } from "react";
import { initialTasks } from "../apis/data";
import { taskReducer, TaskActionTypes } from "../reducers/taskReducer";
import { readMoreFormatter } from "../utils/formatter";

function DashBoard() {
    const [state, dispatch] = useReducer(taskReducer, initialTasks);
    const [newTaskContent, setNewTaskContent] = useState("");
    const [editTask, setEditTask] = useState(null);

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, destColumnId) => {
        const taskId = e.dataTransfer.getData("taskId");
        const sourceColumn = state.columns.find(column =>
            column.taskIds.includes(taskId)
        );

        console.log(sourceColumn)
        if (sourceColumn.id !== destColumnId) {
            dispatch({
                type: TaskActionTypes.MOVE_TASK,
                payload: {
                    sourceColumnId: sourceColumn.id,
                    destColumnId,
                    taskId,
                },
            });
        }
    };

    const handleAddTask = () => {
        if (newTaskContent.trim()) {
            const newTaskId = `task-${state.tasks.length + 1}`;

            const taskExists = state.tasks.some(
                task => task.content === newTaskContent
            );

            if (!taskExists) {
                dispatch({
                    type: TaskActionTypes.ADD_TASK,
                    payload: {
                        task: { id: newTaskId, content: newTaskContent },
                        columnId: "column-1",
                    },
                });
                setNewTaskContent("");
            }
        }
    };

    const handleDeleteTask = (taskId, columnId) => {
        dispatch({
            type: TaskActionTypes.DELETE_TASK,
            payload: { taskId, columnId },
        });
    };


    const handleEditTask = (task) => {
        setEditTask(task);
    };

    const handleSaveEditedTask = () => {
        if (editTask !== null) {
            dispatch({
                type: TaskActionTypes.EDIT_TASK,
                payload: {
                    task: {
                        taskId: editTask.id,
                        content: editTask.content
                    }
                },
            });
            setEditTask(null);
        }
    };

    return (
        <div className="board">
            {state.columnOrder.map(columnId => {
                const column = state.columns.find(col => col.id === columnId);
                const tasks = column.taskIds.map(taskId => state.tasks.find(task => task.id === taskId));


                return (
                    <div
                        className="column"
                        key={column.id}
                        onDragOver={handleDragOver}
                        onDrop={e => handleDrop(e, column.id)}
                    >
                        <h2>{column.title}</h2>
                        <div className="task-list">
                            {tasks.length === 0 && <h4 className="empty-content">&#128466; No Recoreds Found</h4>}
                            {tasks.map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={e => handleDragStart(e, task.id)}
                                    className="task"
                                >
                                    {readMoreFormatter(task?.content, 50)}
                                    <button onClick={() => handleEditTask(task)}>
                                        &#9999;&#65039;
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id, column.id)}
                                    >
                                        &#9940;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            {!editTask?.id ?
                <div className="add-task">
                    <input
                        type="text"
                        value={newTaskContent}
                        tabIndex={1}
                        onChange={(e) => setNewTaskContent(e.target.value)}
                        placeholder="New task..."
                    />
                    <button onClick={handleAddTask}>Add Task &#10133;</button>
                </div>
                :
                <div className="edit-task">
                    <input
                        type="text"
                        value={editTask?.content}
                        tabIndex={1}
                        onChange={(e) => setEditTask((pre) => ({ ...pre, content: e.target.value }))}
                        placeholder="Edit task..."
                    />
                    <button onClick={handleSaveEditedTask}>Save &#10004;&#65039;</button>
                    <button onClick={() => { setEditTask(null) }}>Cancel &#10060;</button>
                </div>
            }
        </div>
    );
}

export default DashBoard;
