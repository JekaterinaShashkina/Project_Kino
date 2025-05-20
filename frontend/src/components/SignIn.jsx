import React, { useState } from "react"
import {API_URL} from '../../constants/env'
import axios from 'axios'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import PasswordInput from "./PasswordInput";

const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            });
            const token = response.data.token
            localStorage.setItem('token', `Bearer ${token}`)
            login(response.data.user)
            setMessage('Login is successful')
            navigate('/');
        } catch (error) {
            setMessage('Something wrong. Control username and password')
            console.error(error)
        }
    }
    return (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" mb={2}>
            Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
            <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            />
            <PasswordInput
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor:'#2c3755' }}>
            Login
            </Button>
        </form>

        {message && (
            <Typography variant="body2" mt={2} color="secondary">
            {message}
            </Typography>
        )}
        </Paper>
    </Box>
    )
}

export default SignIn