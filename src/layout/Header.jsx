import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <nav className="header-nav">
                <ul className="nav-list">
                    <h2 className="header-title">Task App</h2>
                    <li><Link to="/tasks" className="nav-link">Tasks</Link></li>
                    <li><Link to="/tasks/new" className="nav-link">Add New Task</Link></li>

                </ul>
            </nav>
        </header>
    );
}

export default Header;
