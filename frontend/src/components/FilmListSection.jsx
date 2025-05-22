import { useEffect, useState } from "react";
import {fetchAllFilms} from '../services/filmService'
import { Box, Grid, Typography } from "@mui/material";
import FilmSlider from "./FilmSlider";
import { enhanceWithPosters } from "../utils/enhanceWithPosters";

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
                      // Подгружаем постеры
                const updated = await enhanceWithPosters(data)
                setFilms(updated)
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
            <Typography variant="h5" gutterBottom sx={{mt: '32px', mb: '32px', color: '#FF00FF', fontSize: '28px'}}>
                Top Films
            </Typography>
            <FilmSlider films={films}/>
        </Box>
    )
}

export default FilmListSection