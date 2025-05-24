// SessionDetailsPage.jsx
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Button, Grid } from '@mui/material';
import Header from '../components/Header';
import { enhanceWithPosters } from '../utils/enhanceWithPosters';
import { jwtDecode } from "jwt-decode";
import MovieInfo from '../components/MovieInfo';
import SeatsGrid from '../components/SeatsGrid';
import PurchaseButton from '../components/PurchaseButton';

function SessionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/session/${id}/full`);
        const [enhancedMovie] = await enhanceWithPosters([response.data.session.movie]);
        setSessionData({
          ...response.data,
          session: {
            ...response.data.session,
            movie: enhancedMovie
          }
        });
      } catch (error) {
        console.error('Error loading session details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessionDetails();
  }, [id]);

  const handleSeatSelect = (seat) => {
    if (!seat.isBooked) {
      setSelectedSeats(prev => prev.includes(seat.placeid)
        ? prev.filter(id => id !== seat.placeid)
        : [...prev, seat.placeid]);
    }
  };

  const handleBuyTicket = async () => {
    if (selectedSeats.length) {
      try {
        const token = localStorage.getItem('token');
        const userId = jwtDecode(token).userid;
        await Promise.all(selectedSeats.map(placeid =>
          axios.post('http://localhost:3001/tickets', {
            sessionid: id,
            placeid,
            userid: userId
          }, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ));
        alert('Tickets booked successfully!');
        setSelectedSeats([]);
        navigate('/');
      } catch (error) {
        console.error('Error booking tickets:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress color="secondary" />
        <Typography sx={{ mt: 2, color: '#DA70D6' }}>Loading session details...</Typography>
      </Box>
    );
  }

  if (!sessionData) {
    return <Typography sx={{ p: 4, color: 'white' }}>Session not found.</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box sx={{ pt: '130px', px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#DA70D6', fontSize: '36px' }}>Session Details</Typography>
        
        <MovieInfo session={sessionData.session} />

        <SeatsGrid seats={sessionData.seats} selectedSeats={selectedSeats} onSelect={handleSeatSelect} />

        <PurchaseButton selectedSeats={selectedSeats} onBuy={handleBuyTicket} />

        <Box sx={{ mt: 4 }}>
          <Link to="/" style={{ color: '#DA70D6' }}>← Back to homepage</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default SessionDetailsPage;
