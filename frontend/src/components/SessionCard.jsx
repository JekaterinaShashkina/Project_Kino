import { Box, Typography, Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { Link, useNavigate } from 'react-router-dom';
import CardBase from './CardBase';  

const SessionCard = ({ session, posterUrl }) => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleBuyTicket = () => {
        navigate(`/session/${session.sessionid}`);
    };

    return (
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
            <CardBase sx={{
                width: '350px',  
                display: 'flex',
                alignItems: 'center',
                p: 2
            }}>
                <Link to={`/session/${session.sessionid}`} style={{ textDecoration: 'none' }}>
                    <Box sx={{
                        width: '120px',
                        aspectRatio: '2/3',
                        overflow: 'hidden',
                        borderRadius: 2,
                        backgroundColor: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                        mr: 2
                    }}>
                        {posterUrl ? (
                            <Box
                                component="img"
                                src={posterUrl}
                                alt={session.movie.title}
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'top',
                                    borderRadius: 2,
                                }}
                            />
                        ) : (
                            <MovieIcon sx={{ fontSize: 64, color: '#777' }} />
                        )}
                    </Box>
                </Link>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: '#DA70D6', mb: 1 }}>
                        {session.movie.title}
                    </Typography>
                    <Typography variant="body2" color="warning.main">
                        ⭐ {session.movie.rating}
                    </Typography>
                    <Typography variant="body2" color="#DA70D6" mb='5px'>
                        {session.movie.categorynames?.join(', ') || 'No categories'}
                    </Typography>
                    <Typography variant="body1" color="#DA70D6">
                        {new Date(session.starttime).toLocaleString()}
                    </Typography>
                    <Typography variant="body1" color="#DA70D6">
                        Hall: {session.hall.hallname}
                    </Typography>
                    {isLoggedIn && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleBuyTicket}
                            sx={{ mt: 1 }}
                        >
                            Buy Ticket
                        </Button>
                    )}
                </Box>
            </CardBase>
        </Box>
    );
};

export default SessionCard;
