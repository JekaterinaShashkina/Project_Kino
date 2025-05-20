import { useEffect, useState } from "react";
import {fetchAllFilms} from '../services/filmService'
import { Box, Grid, Typography } from "@mui/material";


const FilmListSection = () => {
    const [films, setFilms] = useState()
    const [loading, setLoading] = useState(true);
    // const [searchTerm, setSearchTerm] = useState('')
    //const [selectedCategory, setSelectedCategory] = useState(null)
    // const filteredFilms = filterBooks(books, searchTerm, selectedCategory)

    useEffect(() => {
        const loadFilms = async () => {
            try {
                const data = await fetchAllFilms()
                setFilms(data)
            } catch (error) {
                console.error('Error fetching films', error)
            } finally {
                setLoading(false)
            }
        }
        loadFilms()
    }, [])
    if (loading) {
        return (
            <div>Loading</div>
        )
    }
    return (
        <Box>
            <Typography variant="h5" gutterBottom sx={{mt: '16px', mb: '32px'}}>
                Top Films
            </Typography>
            {
                films.map((film) => (
                <Grid item key={film.movieid} xs={12} sm={6} md={4} lg={3}>
                    <Typography>{film.title}</Typography>
                </Grid>
                ))
            }


        </Box>
    )
}

export default FilmListSection