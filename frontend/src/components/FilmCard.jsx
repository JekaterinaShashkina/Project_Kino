import { Box, Typography } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';

const FilmCard = ({ film }) => {
  return (
    <Link to={`/films/${film.movieid}`} style={{ textDecoration: 'none' }}>
    <Box sx={{         
        m: 2,
        width: 220,
        border: '1px solid #DA70D6',
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
        backgroundColor: '#222',
        p: 1,
        textAlign: 'center'
        }}>
        {/* Обёртка под картинку */}
        <Box sx={{
            width: '100%',
            aspectRatio: '2/3',
            overflow: 'hidden',
            borderRadius: 2,
            backgroundColor: '#333', // на случай отсутствия картинки
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1
            }}>
                {film.imageUrl ? (
                    <Box
                    component="img"
                    src={film.imageUrl}
                    alt={film.title}
                    sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'contain',
                        objectPosition: 'top',
                        borderRadius: 2,
                    }}
                    />
                ) : (
                    <MovieIcon sx={{ fontSize: 64, color: '#777' }} />
                )}
        </Box>
      <Typography variant="h6" mt={1} sx={{
        fontSize: '22px', 
        color: '#DA70D6', 
        height: '3em', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis',
        display: '-webkit-box', 
        WebkitLineClamp: '2',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center', mb: '8px'}}>{film.title}</Typography>
      <Typography variant="body2" color="#DA70D6" mb='5px'>
        {film.categories.map((c) => c.catname).join(', ')}
      </Typography>
      <Typography variant="body2" color="warning.main">
        ⭐ {film.rating}
      </Typography>
    </Box>
    </Link>
  );
};

export default FilmCard