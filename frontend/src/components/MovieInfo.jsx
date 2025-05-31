import { Box, Typography } from '@mui/material';

const MovieInfo = ({ session }) => (
  <>
    <Box component="img" src={session.movie.imageUrl} alt={session.movie.title} sx={{ width: '200px', borderRadius: '8px', mb: 2 }} />
    <Typography variant="h5" sx={{ color: '#DA70D6', mb: 1 }}>{session.movie.title}</Typography>
    <Typography variant="body1" sx={{ color: '#DA70D6', mb: 1 }}>Date: {new Date(session.starttime).toLocaleString()}</Typography>
    <Typography variant="body1" sx={{ color: '#DA70D6', mb: 1 }}>Hall: {session.hall.hallname}</Typography>
    <Typography variant="body1" sx={{ color: '#DA70D6', mb: 2 }}>Duration: {session.movie.duration} min | Language: {session.movie.movielanguage} | Rating: ⭐ {session.movie.rating}</Typography>
  </>
);

export default MovieInfo;
