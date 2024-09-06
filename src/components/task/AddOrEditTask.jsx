import React, { useState, useEffect } from 'react';
import { useTaskContext, useTaskDispatchContext } from '../../context/TaskContext';
import IconButton from '../buttons/IconButton';
import { TaskActionTypes } from '../../reducers/taskReducer';

const AddOrEditTask = ({ editTask, setEditTask }) => {
    const state = useTaskContext();
    const dispatch = useTaskDispatchContext();
    const [newTaskContent, setNewTaskContent] = useState("");

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
        <div>
            {!editTask?.id ?
                <div className="add-task">
                    <input
                        type="text"
                        value={newTaskContent}
                        tabIndex={1}
                        onChange={(e) => setNewTaskContent(e.target.value)}
                        placeholder="New task..."
                    />
                    <IconButton onClick={handleAddTask} label={'Add Task'} iconName={'plus'} />
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
                    <IconButton onClick={handleSaveEditedTask} label={'Save'} iconName={'tick'} />
                    <IconButton onClick={() => { setEditTask(null) }} label={'Cancel'} iconName={'cross'} />
                </div>
            }
        </div>
    )
}

export default AddOrEditTask;