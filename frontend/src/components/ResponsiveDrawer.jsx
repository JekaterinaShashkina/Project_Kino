import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, InputBase, Select, MenuItem, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ResponsiveDrawer = ({ open, toggleDrawer, isAdmin, user, onLogout, 
    searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, 
    fromDate, setFromDate, toDate, setToDate, categories, handleSearch }) => {

    return (
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} sx={{ display: {xs: 'flex', md: 'none'}}}>

            <List sx={{ width: 250, p: 2, backgroundColor:'#FFF0F5' }}>
            {user && (
                <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color:'#8B008B' }}>
                        {Array.isArray(user.roles) ? user.roles.join(', ') : user.roles} : {user.username}
                    </Typography>
                <Divider sx={{ my: 2 }} />

                </Box>
            )}            
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, backgroundColor: '#222', p: 1, borderRadius: 1 }}>
                    <InputBase
                        placeholder="Search…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ color: '#fff', width: '100%' }}
                    />
                    <IconButton onClick={handleSearch}>
                        <SearchIcon sx={{ color: 'magenta' }} />
                    </IconButton>
                </Box>

                <Select
                    fullWidth
                    size="small"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                    sx={{ mb: 2 }}
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
                        views={["year"]}
                        label="Release Year From"
                        value={fromDate}
                        onChange={(newValue) => setFromDate(newValue)}
                        minDate={dayjs("1940-01-01")}
                        maxDate={dayjs("2025-12-31")}
                        slotProps={{ textField: { size: 'small', sx: { width: '100%', mb: 2 } } }}
                    />
                    <DatePicker
                        views={["year"]}
                        label="Release Year To"
                        value={toDate}
                        onChange={(newValue) => setToDate(newValue)}
                        minDate={dayjs("1940-01-01")}
                        maxDate={dayjs("2025-12-31")}
                        slotProps={{ textField: { size: 'small', sx: { width: '100%', mb: 2 } } }}
                    />
                </LocalizationProvider>

                <Button variant="outlined" onClick={handleSearch} fullWidth sx={{ mb: 2, color: 'magenta', borderColor: 'magenta' }}>
                    Search
                </Button>

                <Divider />

                <ListItem button component={Link} to="/showtime" onClick={toggleDrawer(false)}>
                    <ListItemText primary="ShowTimes" />
                </ListItem>

                {user && (
                    <ListItem button component={Link} to="/my-tickets" onClick={toggleDrawer(false)}>
                        <ListItemText primary="My Tickets" />
                    </ListItem>
                )}

                {isAdmin && (
                    <>
                        <ListItem button component={Link} to="/admin/movie/new" onClick={toggleDrawer(false)}>
                            <ListItemText primary="Create Movie" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/sessions/new" onClick={toggleDrawer(false)}>
                            <ListItemText primary="Create Session" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/sessions" onClick={toggleDrawer(false)}>
                            <ListItemText primary="Manage Sessions" />
                        </ListItem>
                    </>
                )}

                <Divider />
 

                {user ? (
                    <ListItem button onClick={() => { onLogout(); toggleDrawer(false)(); }}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                ) : (
                    <ListItem button component={Link} to="/auth" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Login" />
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
};

export default ResponsiveDrawer;
