import {AppBar, Box, Toolbar, Typography, InputBase, Select, MenuItem, Grid} from '@mui/material'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { AppButton } from './buttonStyles.jsx';
import { useState,useEffect } from 'react';
import { searchFilms} from '../services/filmService.js';
import { enhanceWithPosters } from '../utils/enhanceWithPosters.js';
import { fetchCategories } from '../services/categoryService.js';

const Header = () => {
    const { user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

        useEffect(() => {
    const loadCategories = async () => {
        try {
        const data = await fetchCategories();
        setCategories(data);
        } catch (error) {
        console.error('Failed to fetch categories', error);
        }
    };
    loadCategories();
    }, []);

    const handleSearch = async () => {
        try {
            const results = await searchFilms({
                title: searchTerm,
                category: selectedCategory,
                releasedateFrom: fromDate,
                releasedateTo: toDate
            })
            const updated = await enhanceWithPosters(results)            
            navigate('/search-results', { state: { results: updated } });
        } catch (error) {
            console.error('Search failed', error);
        }
    }
    return (
        <AppBar sx={{ backgroundColor: '#FF00FF' }}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '5px'}}>
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none' }}>
                <img src='../../public/logo-black.png' height='64px' alt='Logo' />
            </Typography>

            <AppButton component={Link} to="/showtime">
                ShowTimes
            </AppButton>
        { user ? (
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'flex-end', gap: '20px', mr: '40px'}}>
            <Typography component="span" mr={2} color='#000' sx={{fontSize: '1.2rem'}}>
                User: {user.username}
            </Typography>
            <AppButton onClick={logout}>
                Logout
            </AppButton>
            </Box>
        ) : (
            <AppButton component={Link} to="/auth">
                SignIn
            </AppButton>
        )
        }
        </Toolbar>
        <Grid container sx={{justifyContent: 'space-between', alignItems: 'center', mt: '5px'}}>
        <Grid item xs={12} md={8} sx={{margin:'5px 60px'}}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#222',
                padding: '4px 8px',
                borderRadius: '8px',
                color: '#fff',
                }}>
                <InputBase placeholder="Search…" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ color: '#fff', width: '350px' 
                }} />

            </Box>
        </Grid>
            <Grid item xs={12} md={8} sx={{margin:'5px 60px' }}>
            
                <Select sx={{mr:2, height: '40px',}}
                    size="small"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                    
                >
                    <MenuItem value="">All categories</MenuItem>
                    {categories.map((cat) => (
                        <MenuItem key={cat.categoryid} value={cat.catname}>
                        {cat.catname}
                        </MenuItem>
                    ))}
                </Select>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    views={['year']}
                    label="Release Year From"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                    minDate={dayjs('1940-01-01')}
                    maxDate={dayjs('2025-12-31')}
                    renderInput={(params) => <TextField {...params} />}
                    slotProps={{
                        textField: {
                        size: 'small',
                        sx: { width: '150px', mr: 2 }
                        }
                    }}

                />
                <DatePicker
                    views={['year']}
                    label="Release Year To"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    minDate={dayjs('1940-01-01')}
                    maxDate={dayjs('2025-12-31')}
                    renderInput={(params) => <TextField {...params}/>}
                      slotProps={{
                        textField: {
                        size: 'small',
                        sx: { width: '150px', mr: 2 }
                        }
                    }}
                />
                </LocalizationProvider>
                <AppButton onClick={handleSearch} startIcon={<SearchIcon sx={{ color: 'black' }} />}>
                    Search
                </AppButton>


                </Grid>
        </Grid>
        </AppBar>
    )
}
export default Header