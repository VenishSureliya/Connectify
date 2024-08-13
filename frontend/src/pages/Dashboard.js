import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    const token = localStorage.getItem('token');
    const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;

    return (
        <div>
            <h1>Dashboard</h1>
            {role === 'admin' && <Link to="/admin-dashboard">Admin Dashboard</Link>}
            {role === 'proctor' && <Link to="/proctor-dashboard">Proctor Dashboard</Link>}
            <p>Welcome to your dashboard!</p>
        </div>
    );
}

export default Dashboard;