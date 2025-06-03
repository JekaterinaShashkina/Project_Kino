import { Box, Container, Typography, useTheme, useMediaQuery } from "@mui/material";
import FilmListSection from "./FilmListSection";

const MainContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flex: 1 }}>
      <Container sx={{ pt: isMobile ? 8 : 12, textAlign: 'center' }}>
        <Typography variant={isMobile ? "h4" : "h2"} sx={{ fontWeight: '700', color: '#FF00FF' }}>
          LUX Cinema
        </Typography>
        <Typography variant={isMobile ? "h6" : "h4"} sx={{ color: '#EE82EE', fontStyle: 'italic' }}>
          More than comfort. More than cinema.
        </Typography>
        <Typography variant={isMobile ? "h6" : "h4"} sx={{ color: '#FF00FF', fontStyle: 'italic' }}>
          Forget the world for a while. Just watch.
        </Typography>
      </Container>
      <Container sx={{ pt: 4 }}>
        <FilmListSection />
      </Container>
    </Box>
  );
};

export default MainContent;
