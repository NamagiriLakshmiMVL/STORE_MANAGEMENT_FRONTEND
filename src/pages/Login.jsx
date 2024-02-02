import React from "react";
import { API } from "../API";
import axios from "axios"
import {useNavigate} from "react-router-dom"
function Login() {
const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const userDetails = {
            userId: e.target.userId.value,
            password: e.target.password.value
        }
        axios.post(`${API}/users/login`,userDetails)
        .then((res)=>{
            console.log(res.data)
            alert("Login Success")
           
            localStorage.setItem("user_data",JSON.stringify(res.data))
            navigate("/home")
        })
        .catch((err)=>{
            alert("Invalid Credentials")
        })
        
        
    }
    return (
        <div>
            <div className="login">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="login-root">
                        <h1>Store Management</h1>
                        <h4>Login Form</h4>
                    </div>
                    <div className="login-root">
                        <label>User ID:</label>
                        <input type="number" name="userId" />
                    </div>
                    <div className="login-root">
                        <label>Password:</label>
                        <input type="text" name="password" />
                    </div>
                    <div className="login-root">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login