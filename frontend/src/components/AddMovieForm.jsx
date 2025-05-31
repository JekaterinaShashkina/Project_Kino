import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/env';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem
} from '@mui/material';
import { fetchCategories } from '../services/categoryService';

const AddMovieForm = () => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('');           
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);    

useEffect(() => {
    const loadCategories = async () => {
        try {
        const data = await fetchCategories();
        setCategories(data);
        } catch (err) {
        console.error('Error fetching categories', err);
        }
    };
    loadCategories();
    }, []);
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
    '& .MuiInputBase-input': { color: '#DA70D6' },
    '& .MuiInputBase-root': { color: '#DA70D6' },
    '& input': { color: '#DA70D6' },
    '& label': { color: '#DA70D6' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
        title,
        categoryids: selectedCategories,       
        movielanguage: language,
        releasedate: releaseDate,
        rating,
        duration,
        status
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/movies`, movieData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Movie added successfully!');
      setTitle('');
      setLanguage('');
      setReleaseDate('');
      setDuration('');
      setStatus('');
    } catch (error) {
      console.error('Failed to add movie:', error);
      setMessage('Failed to add movie');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 450, margin: 'auto', backgroundColor: 'transparent' }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#DA70D6', textAlign: 'center' }}>
        Add New Movie
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
          sx={inputStyles}
        />
        <TextField
        select
        label="Categories"
        value={selectedCategories}
        onChange={(e) => setSelectedCategories(e.target.value)}
        SelectProps={{ multiple: true }}
        fullWidth
        margin="normal"
        required
        sx={inputStyles}
        >
        {categories.map((cat) => (
            <MenuItem key={cat.categoryid} value={cat.categoryid}>
            {cat.catname}
            </MenuItem>
        ))}
        </TextField>
        <TextField
          label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          fullWidth
          margin="normal"
          required
          sx={inputStyles}
        />

        <TextField
          label="Release Date"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          fullWidth
          margin="normal"
          required
          sx={inputStyles}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Duration (min)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          fullWidth
          margin="normal"
          required
          sx={inputStyles}
        />
        <TextField
            label="Rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            sx={inputStyles}
        />
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          margin="normal"
          required
          sx={inputStyles}
        >
          <MenuItem value="Released" sx={{ color: '#DA70D6' }}>Released</MenuItem>
          <MenuItem value="Cancelled" sx={{ color: '#DA70D6' }}>Cancelled</MenuItem>
          <MenuItem value="Processes" sx={{ color: '#DA70D6' }}>Processes</MenuItem>
        </TextField>

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
          ADD MOVIE
        </Button>
      </form>

      {message && (
        <Typography variant="body2" sx={{ mt: 2, color: '#DA70D6', textAlign: 'center' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AddMovieForm;
