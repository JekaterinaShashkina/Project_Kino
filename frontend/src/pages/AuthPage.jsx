import { Box } from "@mui/material"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import Header from "../components/Header"

const AuthPage = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box>
            <Header/>
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', gap:'60px', mt: '130px'}}>
            <Box>
                <SignIn/>
            </Box>
            <Box>
                <SignUp/>
            </Box>
        </Box>
        </Box>
    )
}

export default AuthPage