import React from "react"
import {Link} from "react-router-dom"

function AdminDashboard(){

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link to="/create-users">Create Users</Link>
        </div>
    )
}

export default AdminDashboard