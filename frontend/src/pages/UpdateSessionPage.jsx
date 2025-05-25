import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/env';
import { Box, Typography, List, ListItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";

const UpdateSessionPage = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const now = new Date();
 

        const response = await axios.get(`${API_URL}/sessions`);

        const futureSessions = response.data.filter(session => new Date(session.starttime) > new Date(now));
        setSessions(futureSessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };
    fetchSessions();
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
  <Header />
  <Box
    sx={{
      pt: '150px',
      px: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '800px', // Сделаем шире (например, 800px)
      mx: 'auto',        // Центрируем по горизонтали
      width: '100%'      // Полная ширина для контейнера
    }}
  >
    <Typography variant="h4" color="#DA70D6" mb={4}>
      Select Session to Update
    </Typography>
    <List sx={{ width: '100%' }}> {/* Задаем ширину списка */}
      {sessions.map(session => (
        <ListItem
          key={session.sessionid}
          sx={{
            mb: 2,
            border: '1px solid #DA70D6',
            borderRadius: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'  // Растягиваем элемент списка на всю ширину
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography color="#DA70D6" mb={2}><strong>{session.movie.title}</strong></Typography>
            <Typography color="#DA70D6">
              {new Date(session.starttime).toLocaleString()}
            </Typography>
            <Typography color="#DA70D6"> Hall: {session.hall.hallname}</Typography>
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(`/admin/sessions/update/${session.sessionid}`)}
          >
            Edit
          </Button>
        </ListItem>
      ))}
    </List>
  </Box>
</Box>
  );
};

export default UpdateSessionPage;
