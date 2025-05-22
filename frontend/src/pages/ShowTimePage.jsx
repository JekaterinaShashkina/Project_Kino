import Header from "../components/Header"
import {ShowTime}  from "../components/ShowTime"
import {Box} from '@mui/material'

function ShowTimePage() {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box>
                <Header/>
            </Box>
            <Box sx={{pt: '130px'}}>            
                <ShowTime/>
            </Box>
        </Box>
    )
}

export default ShowTimePage