import { Box } from "@mui/material"
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"

const AuthPage = () => {
    return (
        <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center', gap:'60px'}}>
            <Box>
                <SignIn/>
            </Box>
            <Box>
                <SignUp/>
            </Box>
        </Box>
    )
}

export default AuthPage