import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import AddMovieForm from '../components/AddMovieForm';

const MovieAddPage = () => {
    return (
        <Box>
            <Header />
            <Box sx={{ pt: '130px', px: 3 }}>
                <AddMovieForm />
            </Box>
        </Box>
    );
};

export default MovieAddPage;