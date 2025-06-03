import { useEffect, useState } from "react";
import { fetchAllFilms } from '../services/filmService';
import { Box, Grid, Typography } from "@mui/material";
import FilmCard from "./FilmCard";  // Используем карточки фильмов
import { enhanceWithPosters } from "../utils/enhanceWithPosters";

const FilmListSection = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFilms = async () => {
            try {
                const data = await fetchAllFilms();
                const updated = await enhanceWithPosters(data);
                setFilms(updated);
            } catch (error) {
                console.error('Error fetching films', error);
            } finally {
                setLoading(false);
            }
        };
        loadFilms();
    }, []);

    if (loading) {
        return <Typography color="#FF00FF">Loading...</Typography>;
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: '32px', mb: '32px', color: '#FF00FF', fontSize: '28rm' }}>
                Top Films
            </Typography>
            <Grid container spacing={2}>
                {films.map((film) => (
                    <Grid item key={film.movieid} xs={12} sm={6} md={4} lg={3}>
                        <FilmCard film={film} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FilmListSection;
