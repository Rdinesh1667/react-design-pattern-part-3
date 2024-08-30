export const TaskActionTypes = {
    MOVE_TASK: 'MOVE_TASK',
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK',
    DELETE_TASK: 'DELETE_TASK',
};
export const taskReducer = (state, action) => {
    switch (action.type) {
        case TaskActionTypes.MOVE_TASK: {
            const { sourceColumnId, destColumnId, taskId } = action.payload;

            const sourceColumn = state.columns.find(col => col.id === sourceColumnId);
            const destColumn = state.columns.find(col => col.id === destColumnId);

            const newSourceTaskIds = sourceColumn.taskIds.filter(id => id !== taskId);
            const newDestTaskIds = destColumn.taskIds.includes(taskId)
                ? destColumn.taskIds
                : [...destColumn.taskIds, taskId];

            const updatedColumns = state.columns.map(col => {
                if (col.id === sourceColumnId) {
                    return { ...col, taskIds: newSourceTaskIds };
                }
                if (col.id === destColumnId) {
                    return { ...col, taskIds: newDestTaskIds };
                }
                return col;
            });

            return {
                ...state,
                columns: updatedColumns,
            };
        }
        case TaskActionTypes.ADD_TASK: {
            const { task, columnId } = action.payload;

            const updatedColumns = state.columns.map(col => {
                if (col.id === columnId) {
                    return { ...col, taskIds: [...col.taskIds, task.id] };
                }
                return col;
            });

            return {
                ...state,
                tasks: [...state.tasks, task],
                columns: updatedColumns,
            };
        }
        case TaskActionTypes.EDIT_TASK: {
            const { taskId, content } = action.payload.task;

            const updatedTasks = state.tasks.map(task =>
                task.id === taskId ? { ...task, content } : task
            );

            return {
                ...state,
                tasks: updatedTasks,
            };
        }
        case TaskActionTypes.DELETE_TASK: {
            const { taskId, columnId } = action.payload;
            const updatedColumns = state.columns.map(col => {
                if (col.id === columnId) {
                    return { ...col, taskIds: col.taskIds.filter(id => id !== taskId) };
                }
                return col;
            });

            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== taskId),
                columns: updatedColumns,
            };
        }
        default:
            return state;
    }
};
