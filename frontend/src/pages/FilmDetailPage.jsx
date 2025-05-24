import {FilmDetail} from "../components/FilmDetail"
import { Box } from "@mui/material"
import Header from "../components/Header"

function FilmDetailPage() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box>
                <Header/>
            </Box>
            <Box sx={{pt: '180px'}}>            
                <FilmDetail />
            </Box>
        </Box>
    )
}

export default FilmDetailPage