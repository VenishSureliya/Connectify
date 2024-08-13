import React, { useState } from "react"
import axios from "axios"

function AdminCreateUsers() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("proctor")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const token = localStorage.getItem("toekn")
            let endpoint = ""

            if(role === "professor"){
                endpoint = "/api/users/register-professor"
            } else if(role === "proctor"){
                endpoint = "/api/users/register-proctor"
            } else{
                return setMessage("Invalid role selected!")
            }

            const response = await axios.post(endpoint, {name, email, password}, {
                headers: {Authorization: 'Bearer ${token}'}
            })
            setMessage(response.data.message)
        } catch(error){
            setMessage(error.response.data.message || error.response.data.error)
        }
    }

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </label>

                <label>
                    Email Address:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </label>

                <label>
                    Password:
                    <input type="password" value={name} onChange={(e) => setPassword(e.target.value)} required/>
                </label>

                <label>
                    Role:
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="professor">Professor</option>
                        <option value="proctor">Proctor</option>
                    </select>
                </label>

                <button type="submit">Create User</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default AdminCreateUsers