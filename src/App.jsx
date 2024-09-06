import { useReducer } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";
import { initialTasks } from './apis/data';
import TaskList from './components/task/TaskList';
import { TaskContext, TaskDispatchContext } from './context/TaskContext';
import Layout from './layout/Layout';
import Intro from './pages/Intro';
import NewTaskPage from './pages/NewTaskPage';
import { taskReducer } from './reducers/taskReducer';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/react-design-patterns" replace />
    },
    {
        path: "react-design-patterns",
        element: <Intro />
    },
    {
        path: "tasks",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <TaskList />
            },
            {
                path: "new",
                element: <NewTaskPage />
            }
        ]
    }
]);

function App() {

    const [state, dispatch] = useReducer(taskReducer, initialTasks);

    return (
        <TaskContext.Provider value={state}>
            <TaskDispatchContext.Provider value={dispatch}>
                <RouterProvider router={router} fallbackElement={"Loading ..."} />
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );
}

export default App;
