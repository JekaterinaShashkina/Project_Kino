import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants/env';
import { Box, Typography } from '@mui/material';

import AddSessionForm from '../components/AddSessionForm';

const EditSessionPage = () => {
    const { id } = useParams();
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`${API_URL}/session/${id}/full`);
                const session = response.data.session;
                const seats = response.data.seats;

                const ticketPrice = seats.length > 0 ? seats[0].price : '';

                setSessionData({
                    movieid: session.movie.movieid,
                    hallid: session.hall.hallid,
                    starttime: session.starttime,
                    price: ticketPrice
                });
            } catch (error) {
                console.error('Failed to fetch session data', error);
            }
        };
        fetchSession();
    }, [id]);

    const handleUpdate = async (updatedData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/sessions/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Session updated successfully!');
        } catch (error) {
            console.error('Error updating session', error);
            alert('Error updating session');
        }
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Box sx={{ pt: '150px', px: 2 }}>
                <Typography variant="h4" sx={{ color: '#DA70D6', textAlign: 'center', mb: 4 }}>
                    Edit Session
                </Typography>
                {sessionData ? (
                    <AddSessionForm initialData={sessionData} onSubmit={handleUpdate} />
                ) : (
                    <Typography sx={{ textAlign: 'center', color: '#DA70D6' }}>Loading...</Typography>
                )}
            </Box>
        </Box>
    );
};

export default EditSessionPage;
