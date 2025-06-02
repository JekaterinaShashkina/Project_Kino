// components/SearchFilters.jsx
import { Box, Grid, InputBase, Select, MenuItem, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { AppButton } from './buttonStyles';
import dayjs from 'dayjs';

const SearchFilters = ({
  searchTerm, setSearchTerm,
  selectedCategory, setSelectedCategory,
  fromDate, setFromDate,
  toDate, setToDate,
  categories, onSearch
}) => (
  <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', mt: '5px' }}>
    <Grid item xs={12} md={8} sx={{ margin: '5px 60px' }}>
      <Box sx={{
        display: 'flex', alignItems: 'center', backgroundColor: '#222',
        padding: '4px 8px', borderRadius: '8px', color: '#fff',
      }}>
        <InputBase
          placeholder="Search…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ color: '#fff', width: '350px' }}
        />
      </Box>
    </Grid>
    <Grid item xs={12} md={8} sx={{ margin: '5px 60px' }}>
      <Select
        sx={{ mr: 2, height: '40px' }}
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
          slotProps={{ textField: { size: 'small', sx: { width: '150px', mr: 2 } } }}
        />
        <DatePicker
          views={['year']}
          label="Release Year To"
          value={toDate}
          onChange={(newValue) => setToDate(newValue)}
          minDate={dayjs('1940-01-01')}
          maxDate={dayjs('2025-12-31')}
          slotProps={{ textField: { size: 'small', sx: { width: '150px', mr: 2 } } }}
        />
      </LocalizationProvider>
      <AppButton onClick={onSearch} startIcon={<SearchIcon sx={{ color: 'black' }} />}>
        Search
      </AppButton>
    </Grid>
  </Grid>
);

export default SearchFilters;
