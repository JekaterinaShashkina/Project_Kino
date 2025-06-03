import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

const UserMenu = ({ user, anchorEl, setAnchorEl, logout, isAdmin }) => {
  const userRoles = user?.roles ?? [];



  console.log('Is Admin:', isAdmin);  

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', mr: '40px' }}>
      <Typography component="span" mr={2} color='#000' sx={{ fontSize: '1.2rem' }}>
        {Array.isArray(userRoles) ? userRoles.map(r => typeof r === 'string' ? r : r.rolename).join(', ') : ''}: {user.username}
      </Typography>
      <IconButton size="large" edge="end" color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
        <AccountCircle sx={{ color: 'black' }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem component={Link} to="/my-tickets" onClick={() => setAnchorEl(null)}>My Ticket</MenuItem>
        {isAdmin ? [
          <MenuItem key="m1" component={Link} to="/admin/movie/new" onClick={() => setAnchorEl(null)}>Create Movie</MenuItem>,
          <MenuItem key="m2" component={Link} to="/admin/sessions/new" onClick={() => setAnchorEl(null)}>Create Session</MenuItem>,
          <MenuItem key="m3" component={Link} to="/admin/sessions" onClick={() => setAnchorEl(null)}>Manage Sessions</MenuItem>
        ] : null}
        <MenuItem onClick={() => { logout(); setAnchorEl(null); }}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
