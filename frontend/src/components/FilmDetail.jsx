import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material"
import { fetchFilmById, fetchPoster, fetchFilmExtraDetails} from "../services/filmService";
// import { useAuth } from "../context/AuthContext";


export const FilmDetail = () => {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);
    // const { user } = useAuth();
    // const navigate = useNavigate()
    const [poster, setPoster] = useState(null);   

        const loadFilm = async () => {
            try {
                const data = await fetchFilmById(id)
                const extra = await fetchFilmExtraDetails(data.title);
                setFilm({...data, ...extra})

                const image = await fetchPoster(data.title);
                setPoster(image);
            } catch (error) {
                console.error('Error with fetching book', error);
            }finally {
                setLoading(false)
            }
        }
        
    useEffect(()=> {
        loadFilm()       
    }, [id])

    if (loading) return <div>Loading...</div>;
    if (!film) return <div>Film not found</div>;

    return  (
        <>
        <Box sx={{ maxWidth: '1280px', margin: 'auto', display: 'flex', justifyContent: 'space-between', gap: '40px',    
        flexDirection: {
            xs: 'column',  // <600px
            sm: 'column',  // <900px
            md: 'row',     // ≥900px — в строку
            },}}>
            <Box
                component="img"
                src={poster}
                alt={film.title}
                sx={{
                maxHeight: 500,
                border: 'solid 1px #DA70D6',
                borderRadius: 2,
                boxShadow: 3,
                objectFit: 'contain'
                }}
            />
            <Box sx={{border: 'solid 1px #DA70D6', borderRadius: 2, p: 4, color: ' #EE82EE', }}>
                <Typography variant="h3" gutterBottom>{film.title}</Typography>
                <Typography variant="body1" fontSize={22}><b>Language:</b> {film.movielanguage}</Typography>
                <Typography variant="body1" fontSize={22}><b>Release date:</b> {film.releasedate}</Typography>
                <Typography variant="body1" fontSize={22}><b>Rating:</b> {film.rating}</Typography>
                <Typography variant="body1" fontSize={22}><b>Duration:</b> {film.duration} min</Typography>
                <Typography variant="body1" fontSize={22}><b>Status:</b> {film.status}</Typography>
                  <Box mt={2}>
                    <Typography variant="body1"><b>Categories:</b> {film.categorynames?.join(', ')}</Typography>
                </Box>
                <Typography variant="body1" fontSize={18}><b>Overview: </b>{film.overview}</Typography>
            </Box>
        </Box>
        <Box>
                        {film.trailerKey && (
                <Box mt={4} sx={{border: 'solid 1px #DA70D6', borderRadius: 2, p: 2,       position: 'relative',
      paddingTop: '56.25%'}}>
                    <iframe
      src={`https://www.youtube.com/embed/${film.trailerKey}`}
      title="YouTube trailer"
      allow="autoplay; encrypted-media"
      allowFullScreen
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
                    />
                </Box>
            )}
        </Box>
        </>
    )
}