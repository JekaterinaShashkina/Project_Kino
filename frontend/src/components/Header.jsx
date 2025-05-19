import {AppBar, Button, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    console.log('user in header:', user);
    return (
        <AppBar>
        { user ? (
            <>
            <Typography component="span" mr={2}>
                User: {user.username}
            </Typography>
            <Button color="inherit" onClick={logout}>
                Logout
            </Button>
            </>
        ) : (
            <Button color="inherit" component={Link} to="/auth">
                SignIn
            </Button>
        )
        }

        </AppBar>
    )
}
export default Header