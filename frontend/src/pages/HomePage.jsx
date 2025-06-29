import MainContent from "../components/MainContent"
import Header from "../components/Header"
import {Box} from '@mui/material'

function HomePage() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box>
                <Header/>
            </Box>
            <Box sx={{pt: '80px'}}>            
                <MainContent/>
            </Box>
        </Box>
    )
}

export default HomePage