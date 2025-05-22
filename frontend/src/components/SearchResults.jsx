import { useLocation } from "react-router-dom";
import FilmCard from "./FilmCard"; // или FilmSlider, если хочешь
import { Box, Typography, Grid } from "@mui/material";
import Header from "./Header";


export const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <>
    <Header/>
    <Box sx={{ pt: '180px' }}>
      <Typography variant="h3" sx={{fontWeight: '700', color: '#FF00FF', mb:'20px'}}>Search Results</Typography>
      {results.length > 0 ? (
        <Grid container spacing={2}>
          {results.map((film) => (
            <Grid item key={film.movieid} xs={12} sm={6} md={4}>
              <FilmCard film={film} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No movies found.</Typography>
      )}
    </Box>
    </>
  );
};
