import { Box, Typography, Link } from "@mui/material";
import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import Header from "../components/Header"

const AuthPage = () => {
    return (
        <Box >
            { <Header /> }
            <Typography variant="h4" sx={{ pt: '50px', color: '#DA70D6', mb: 2 }}>Authentication</Typography>

            <Box sx={{px: 1, mx: 'auto',   display: "flex",
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: "center",
                    gap: {xs: '10px', md: '60px'} }}>
                <Box id="signin" sx={{ mb: 4, maxWidth: '330px' }}>
                    <SignIn />
                    <Typography variant="body1" mt={2}>
                        Don't have an account?{" "}
                        <Link href="#signup" sx={{ color: '#FF00FF' }}>Sign Up</Link>
                    </Typography>
                </Box>
                <Box id="signup" sx={{ mb: 4, maxWidth: '330px' }}>
                    <SignUp />
                    <Typography variant="body1" mt={2}>
                        Already have an account?{" "}
                        <Link href="#signin" sx={{ color: '#FF00FF' }}>Sign In</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default AuthPage