
import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import AddSessionForm from '../components/AddSessionForm';

const AddSessionPage = () => {
    return (
        <Box>
            <Header />
            <Box sx={{ pt: '130px', px: 3 }}>
                <AddSessionForm />
            </Box>
        </Box>
    );
};

export default AddSessionPage;
