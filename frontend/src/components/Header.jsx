import {AppBar, Box, Button, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar sx={{ backgroundColor: '#FF00FF' }}>
        { user ? (
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'flex-end', gap: '20px', mr: '40px'}}>
            <Typography component="span" mr={2} color='#4B0082'>
                User: {user.username}
            </Typography>
            <Button sx={{color:'#4B0082'}} onClick={logout}>
                Logout
            </Button>
            </Box>
        ) : (
            <Button color="#4B0082" component={Link} to="/auth">
                SignIn
            </Button>
        )
        }

        </AppBar>
    )
}
export default Header