import { createContext, useContext } from "react";


export const TaskContext = createContext(null);
export const TaskDispatchContext = createContext(null);

export const useTaskContext = () => useContext(TaskContext);
export const useTaskDispatchContext = () => useContext(TaskDispatchContext);


