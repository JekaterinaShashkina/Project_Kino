import { Box, Typography, Link } from "@mui/material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Header from "../components/Header";

const AuthPage = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            { <Header /> }
            <Box sx={{ pt: '50px', px: 1, maxWidth: '330px', mx: 'auto' }}>
                <Typography variant="h4" sx={{ color: '#DA70D6', mb: 2 }}>Authentication</Typography>
                <Box id="signin" sx={{ mb: 4 }}>
                    <SignIn />
                    <Typography variant="body1" mt={2}>
                        Don't have an account?{" "}
                        <Link href="#signup" sx={{ color: '#FF00FF' }}>Sign Up</Link>
                    </Typography>
                </Box>
                <Box id="signup">
                    <SignUp />
                    <Typography variant="body1" mt={2}>
                        Already have an account?{" "}
                        <Link href="#signin" sx={{ color: '#FF00FF' }}>Sign In</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AuthPage;
