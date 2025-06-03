// Header.jsx
import { AppBar, Box, Toolbar, Typography, IconButton, Collapse } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppButton } from './buttonStyles.jsx';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { fetchCategories } from '../services/categoryService.js';
import { searchFilms } from '../services/filmService.js';
import { enhanceWithPosters } from '../utils/enhanceWithPosters.js';
import SearchFilters from './SearchFilter';
import UserMenu from './UserMenu';
import ResponsiveDrawer from './ResponsiveDrawer';

const Header = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  
  let isAdmin = false
  if (user) {
    isAdmin = Array.isArray(user.roles) && user.roles.some(r => {
    if (typeof r === 'string') return r.toLowerCase() === 'admin';  
    if (typeof r === 'object' && r.rolename) return r.rolename.toLowerCase() === 'admin';  
    return false;
  });
  }
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(err => console.error('Failed to load categories', err));
  }, []);

  const handleSearch = async () => {
    try {
      const results = await searchFilms({ title: searchTerm, category: selectedCategory, releasedateFrom: fromDate, releasedateTo: toDate });
      const updated = await enhanceWithPosters(results);
      navigate('/search-results', { state: { results: updated } });
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  return (
    <AppBar sx={{ backgroundColor: '#FF00FF', position: 'fixed' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none' }}>
            <img src="/logo-black.png" height="64px" alt="Logo" />
          </Typography>
        </Box>

        {/* Mobile menu icon */}
        <IconButton sx={{ display: { xs: 'flex', md: 'none' } }} onClick={toggleDrawer(true)}>
          <MenuIcon sx={{ color: 'black' }} />
        </IconButton>

        {/* Desktop buttons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => setSearchOpen(prev => !prev)} sx={{ p: 1 }}>
            {searchOpen ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
          <AppButton component={Link} to="/showtime">ShowTimes</AppButton>
          {user
            ? <UserMenu user={user} anchorEl={anchorEl} setAnchorEl={setAnchorEl} logout={logout} isAdmin={isAdmin} />
            : <AppButton component={Link} to="/auth">Sign In</AppButton>}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <ResponsiveDrawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        isAdmin={isAdmin}
        user={user}
        onLogout={logout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        categories={categories}
        handleSearch={handleSearch}
      />

      {/* Search Panel */}
      <Collapse in={searchOpen}>
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          categories={categories}
          onSearch={handleSearch}
        />
      </Collapse>
    </AppBar>
  );
};

export default Header;
