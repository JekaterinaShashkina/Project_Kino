import React, { useState } from "react"
import axios from 'axios'
import { API_URL } from "../../constants/env"
import { Box, Paper, Typography, TextField, Button } from "@mui/material"
import PasswordInput from "./PasswordInput"

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('');
  const [useremail, setUseremail] = useState('')
  const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setMessage("Passwords is not the same");
      return;
    }

    try {
       await axios.post(`${API_URL}/register`, {
        username,
        password,
        useremail
      });
      setMessage('Successful registration')
      setUsername('')
      setPassword('')
      setRepeatPassword('')
      setUseremail('')
    } catch (error) {
        setMessage('Registration error. Seems that this user is existed')
        console.error(error)      
    }
  }
  return  (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper elevation={3} sx={{ padding: 4, width: 350, backgroundColor: '#FFF0F5', color: '#8B008B' }}>
          <Typography variant="h5" mb={2}>
            Sign Up
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
            <PasswordInput
            fullWidth
            label="Repeat Password"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            margin="normal"
            required
          />
            <TextField
            fullWidth
            label="Email"
            type="email"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor:'#8B008B' }}>
            Register
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

export default SignUp