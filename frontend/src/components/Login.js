import axios from 'axios';
import React from 'react';
import { Paper, TextField, Typography, Button } from "@mui/material";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const getToken = (username, password) => {
        axios.post(
            "http://127.0.0.1:8000/api/token/", {username: username, password: password}).then(
            response => {
                cookies.set('access', response.data.access)
                cookies.set('refresh', response.data.refresh)
                if (response.status === 200) {
                    window.location.reload()
                } else {
                    alert(response.data.toString())
                }
            }
        ).catch(error => alert(error.toString()))
    }

    const handleSubmit = (event) => {
        getToken(username, password)
        event.preventDefault();
    }

    return( 
        <div >
            <Paper>
                <form onSubmit={handleSubmit} >
                    <TextField  
                        value={username}
                        onInput={event=>setUsername(event.target.value)}
                    />
                    <TextField
                        value={password}
                        onInput={event=>setPassword(event.target.value)}
                    />
                    <Typography />
                        <Button type="submit">
                            Login
                        </Button>
                </form>
            </Paper>
        </div>
    );
}

export default Login