import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar sx={{ backgroundColor: '#FF00FF' }}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '5px'}}>
                <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none' }}>
                    <img src='../../public/logo-black.png' height='64px' alt='Logo' />
                </Typography>
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
        </Toolbar>
        </AppBar>
    )
}
export default Header