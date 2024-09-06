import React, { useState } from 'react'
import { useTaskContext, useTaskDispatchContext } from '../../context/TaskContext';
import AddOrEditTask from './AddOrEditTask';
import { readMoreFormatter } from '../../utils/formatter';
import { TaskActionTypes } from '../../reducers/taskReducer';
import IconButton from '../buttons/IconButton';

const TaskList = () => {

    const state = useTaskContext();
    const dispatch = useTaskDispatchContext();
    const [editTask, setEditTask] = useState(null);



    const handleDeleteTask = (taskId, columnId) => {
        dispatch({
            type: TaskActionTypes.DELETE_TASK,
            payload: { taskId, columnId },
        });
    };

    const handleEditTask = (task) => {
        setEditTask(task);
    };

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

    return (
        <>
            <AddOrEditTask editTask={editTask} setEditTask={setEditTask} />
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
                                        <IconButton onClick={() => handleEditTask(task)} iconName={'edit'} />
                                        <IconButton onClick={() => handleDeleteTask(task.id, column.id)} iconName={'remove'} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

            </div>
        </>
    )
}

export default TaskList;