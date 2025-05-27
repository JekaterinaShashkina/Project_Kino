import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/env';
import { Box, Typography, List, ListItem, Button } from '@mui/material';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const MyTicketsPage = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const decoded = jwtDecode(token);
                const response = await axios.get(`${API_URL}/tickets/user/${decoded.userid}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTickets(response.data);
            } catch (err) {
                console.error('Failed to load tickets:', err);
            }
        };
        if (user) fetchTickets();
    }, [user]);

    const handleRefund = async (ticketid) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/tickets/${ticketid}/refund`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTickets(prev => prev.map(t => t.ticketid === ticketid ? { ...t, status: 'refunded' } : t));
        } catch (err) {
            console.error('Refund failed', err);
        }
    };

    const now = new Date();
    const futureTickets = tickets.filter(t => new Date(t.session.starttime) > now && t.status === 'active');
    const pastTickets = tickets.filter(t => new Date(t.session.starttime) <= now || t.status !== 'active');

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Box sx={{ pt: '150px', px: 2, maxWidth: '900px', mx: 'auto' }}>
                <Typography variant="h4" color="#DA70D6" mb={4}>My Tickets</Typography>

                {/* Future Tickets */}
                <Typography variant="h5" color="#DA70D6" mb={2}>Upcoming Tickets</Typography>
                <List sx={{ width: '100%' }}>
                    {futureTickets.map(ticket => (
                        <ListItem
                            key={ticket.ticketid}
                            sx={{
                                mb: 2,
                                border: '1px solid #DA70D6',
                                borderRadius: 2,
                                p: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography color="#DA70D6" mb={1}><strong>{ticket.session.movie.title}</strong></Typography>
                                <Typography color="#DA70D6">{new Date(ticket.session.starttime).toLocaleString()}</Typography>
                                <Typography color="#DA70D6">Row {ticket.place.rownumber}, Seat {ticket.place.seatnumber}</Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRefund(ticket.ticketid)}
                            >
                                Refund
                            </Button>
                        </ListItem>
                    ))}
                </List>

                {/* Past/Refunded Tickets */}
                <Typography variant="h5" color="#DA70D6" mt={4} mb={2}>Past / Refunded Tickets</Typography>
                <List sx={{ width: '100%' }}>
                    {pastTickets.map(ticket => (
                        <ListItem
                            key={ticket.ticketid}
                            sx={{
                                mb: 2,
                                border: '1px solid #DA70D6',
                                borderRadius: 2,
                                p: 2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography color="#DA70D6" mb={1}><strong>{ticket.session.movie.title}</strong></Typography>
                                <Typography color="#DA70D6">{new Date(ticket.session.starttime).toLocaleString()}</Typography>
                                <Typography color="#DA70D6">Row {ticket.place.rownumber}, Seat {ticket.place.seatnumber}</Typography>
                                <Typography color="#DA70D6">Status: {ticket.status}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default MyTicketsPage;
