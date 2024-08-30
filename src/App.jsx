import { Link, Navigate, RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import DashBoard from './pages/Dashboard';
import React from 'react';
import "./App.css";

const Layout = () => {
    return (
        <React.Fragment>
            <main>
                <header>
                    <h1>React Design Pattern : Part - 3</h1>
                </header>
                <section>
                    <Outlet />
                </section>
            </main>
        </React.Fragment>
    );
};

const Intro = () => {
    return (
        <p> This for the&nbsp;
            <b><Link to='reducer-pattern'>State Reducer Pattern</Link></b> and&nbsp;
            <b>Component Composition Pattern</b>
        </p>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/react-design-pattern" replace />
    },
    {
        path: "react-design-pattern",
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Intro />

            },
            {
                path: "reducer-pattern",
                element: <DashBoard />
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} fallbackElement={"Loading ..."} />;
}

export default App;
