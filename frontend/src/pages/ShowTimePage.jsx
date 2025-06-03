import Header from "../components/Header";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@mui/material';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import SessionCard from "../components/SessionCard";
import { enhanceWithPosters } from "../utils/enhanceWithPosters";

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

function ShowTimePage() {
    const isMobile = useMediaQuery('(max-width:600px)'); 
    const [sessions, setSessions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // Date object

    const loadSessions = async (date = '') => {
        try {
            let url = 'http://localhost:3001/sessions';
            if (date) {
                url = `http://localhost:3001/sessions/date/${date}`;
            }
            const response = await axios.get(url);
            const enhancedSessions = await enhanceWithPostersForSessions(response.data);
            const today = new Date();
           
            const filtered = enhancedSessions.filter(s => new Date(s.starttime) >= today);
            setSessions(filtered);
        } catch (error) {
            console.error('Error loading sessions:', error);
        }
    };

    useEffect(() => {
        loadSessions();
    }, []);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        if (newValue) {
            const formattedDate = format(newValue, 'yyyy-MM-dd');
            loadSessions(formattedDate);
        } else {
            loadSessions();
        }
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Box sx={{ pt: '130px', px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Фильтр по дате с DatePicker */}
                <Typography variant="h4" gutterBottom sx={{ color: '#DA70D6', fontSize: '36px' }}>Sessions List</Typography>
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <Box
    sx={{
      mb: 4,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row', // адаптивное направление
      gap: 2,
      alignItems: isMobile ? 'stretch' : 'center', // растягиваем по ширине на мобилке
    }}
  >
    <DatePicker
      label="Select date"
      value={selectedDate}
      onChange={handleDateChange}
      format="MM/dd/yyyy"
      slotProps={{
        textField: {
          InputProps: {
            sx: {
              color: '#DA70D6', // цвет текста даты
              '& input': {
                color: '#DA70D6',
              },
            },
          },
          InputLabelProps: {
            sx: {
              color: '#DA70D6', // цвет лейбла
            },
          },
          sx: {
            '& .MuiSvgIcon-root': {
              color: '#DA70D6', // цвет иконки
            },
          },
        },
      }}
    />
    <Button
      variant="outlined"
      onClick={() => { setSelectedDate(null); loadSessions(); }}
      sx={{
        borderColor: '#DA70D6',
        color: '#DA70D6',
        '&:hover': { borderColor: '#fff', color: '#fff' },
        height: '56px',
        minWidth: '150px',
      }}
    >
      CLEAR DATE
    </Button>
  </Box>
</LocalizationProvider>

                {/* Список сеансов */}
                <Grid container spacing={2} justifyContent="center">
                    {sessions.map(session => (
                        <Grid item key={session.sessionid} xs={12} sm={6} md={4} lg={3}>
                            <SessionCard session={session} posterUrl={session.movie.imageUrl} />
                        </Grid>
                    ))}
                </Grid>

                {sessions.length === 0 && (
                    <Typography variant="body1" color="#DA70D6" sx={{ mt: 4 }}>
                        No sessions available for the selected date.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default ShowTimePage;

async function enhanceWithPostersForSessions(sessions) {
    const movies = sessions.map(s => s.movie);
    const uniqueMovies = Array.from(new Map(movies.map(m => [m.movieid, m])).values());
    const enhancedMovies = await enhanceWithPosters(uniqueMovies);
    return sessions.map(session => {
        const movieWithPoster = enhancedMovies.find(m => m.movieid === session.movie.movieid);
        return {
            ...session,
            movie: {
                ...session.movie,
                imageUrl: movieWithPoster?.imageUrl || null
            }
        };
    });
}
