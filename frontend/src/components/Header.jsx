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
  const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

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
    <AppBar sx={{ backgroundColor: '#FF00FF' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '5px' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none' }}>
          <img src="/logo-black.png" height="64px" alt="Logo" />
        </Typography>
        <IconButton
        sx={{ display: { xs: 'flex', sm: 'none' } }}
        onClick={toggleDrawer(true)}
        >
        <MenuIcon sx={{ color: 'black' }} />
        </IconButton>
        <ResponsiveDrawer
            open={drawerOpen}
            toggleDrawer={toggleDrawer}
            isAdmin={user}
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
        <Box sx={{ display: {xs: 'none', sm: 'flex'}, alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => setSearchOpen(prev => !prev)} sx={{ p: 1 }}>
            {searchOpen ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
          <AppButton component={Link} to="/showtime">ShowTimes</AppButton>
          {user
            ? <UserMenu user={user} anchorEl={anchorEl} setAnchorEl={setAnchorEl} logout={logout} />
            : <AppButton component={Link} to="/auth">Sign In</AppButton>
          }
        </Box>
      </Toolbar>

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
