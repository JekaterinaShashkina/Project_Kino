import { Box, Container, Typography } from "@mui/material"
import FilmListSection from "./FilmListSection"

const MainContent = () => {
return (
    <Box sx={{display:'flex', flexDirection:'column'}}>
        <Container>
            <Typography className="title" variant="h3" component="h1" gutterBottom 
                sx={{fontSize: '60px', fontWeight: '700', color: '#FF00FF'}}>
               LUX Cinema
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{fontSize: '36px', color:'#EE82EE', fontStyle: 'italic'}}>
              More than comfort. More than cinema.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{fontSize: '42px', color:'#FF00FF', fontStyle: 'italic'}}>
              Forget the world for a while. Just watch.
            </Typography>
        </Container>
        <Container>
            <FilmListSection/>
        </Container>

    </Box>
)
}

export default MainContent