import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/env';
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddSessionForm = () => {
    const [movies, setMovies] = useState([]);
    const [halls, setHalls] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedHall, setSelectedHall] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [ticketPrice, setTicketPrice] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesRes = await axios.get(`${API_URL}/movies`);
                const hallsRes = await axios.get(`${API_URL}/halls`);
                setMovies(moviesRes.data);
                setHalls(hallsRes.data);
            } catch (error) {
                console.error('Failed to fetch movies or halls:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const sessionData = {
                movieid: selectedMovie,
                hallid: selectedHall,
                starttime: startTime ? new Date(startTime).toISOString() : '',
                price: ticketPrice,
            };
            await axios.post(`${API_URL}/sessions`, sessionData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Session created successfully!');
            setSelectedMovie('');
            setSelectedHall('');
            setStartTime(null);
            setTicketPrice('');
        } catch (error) {
            console.error('Failed to create session', error);
            setMessage('Failed to create session');
        }
    };

    const inputStyles = {
        flex: 1,
        height: '56px',
        border: '1px solid #DA70D6',
        borderRadius: '12px',
        backgroundColor: '#222',
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: 'transparent' },
            '&.Mui-focused fieldset': { borderColor: 'transparent' },
        },
        '& .MuiInputBase-input': {
            color: '#DA70D6',
        },
        '& .MuiInputBase-root': {
            color: '#DA70D6',
        },
        '& input': {
            color: '#DA70D6',  // Для текстового ввода
        },
        '& .MuiSvgIcon-root': { color: '#DA70D6' },
        '& label': { color: '#DA70D6' }
    };
    
    return (
        <Box sx={{ p: 4, maxWidth: 450, margin: 'auto', backgroundColor: 'transparent' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#DA70D6', textAlign: 'center' }}>
                Add New Session
            </Typography>
            <form onSubmit={handleSubmit}>

                {/* Select Movie */}
                <TextField
                    select
                    label="Select Movie"
                    value={selectedMovie}
                    onChange={(e) => setSelectedMovie(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={inputStyles}
                >
                    {movies.map((movie) => (
                        <MenuItem key={movie.movieid} value={movie.movieid} sx={{ color: '#DA70D6' }}>
                            {movie.title}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Select Hall */}
                <TextField
                    select
                    label="Select Hall"
                    value={selectedHall}
                    onChange={(e) => setSelectedHall(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={inputStyles}
                >
                    {halls.map((hall) => (
                        <MenuItem key={hall.hallid} value={hall.hallid} sx={{ color: '#DA70D6' }}>
                            {hall.hallname}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Start Time (DateTimePicker) */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
  label="Start Time"
  value={startTime}
  onChange={(newValue) => setStartTime(newValue)}
  format="MM/dd/yyyy HH:mm"
  slotProps={{
    textField: {
      fullWidth: true,
      sx: {
        ...inputStyles,
      },
      InputProps: {
        sx: {
          '& input': {
            color: '#DA70D6', // цвет текста в input
          },
        },
      },
    },
  }}
  required
/>


                </LocalizationProvider>

                {/* Ticket Price */}
                <TextField
                    label="Ticket Price (€)"
                    type="number"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ min: 0.01, step: 0.01 }}
                    sx={inputStyles}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="outlined"
                    fullWidth
                    sx={{
                        mt: 2,
                        borderColor: '#DA70D6',
                        color: '#DA70D6',
                        '&:hover': { borderColor: '#fff', color: '#fff' },
                        height: '56px',
                        fontWeight: 'bold'
                    }}
                >
                    CREATE SESSION
                </Button>
            </form>

            {/* Feedback Message */}
            {message && (
                <Typography variant="body2" sx={{ mt: 2, color: '#DA70D6', textAlign: 'center' }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default AddSessionForm;
