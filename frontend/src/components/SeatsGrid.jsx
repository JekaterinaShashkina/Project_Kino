import { Grid, Button, Typography, Box } from '@mui/material';  // Добавлен импорт Typography и Box

const SeatsGrid = ({ seats, selectedSeats, onSelect }) => {
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.rownumber]) acc[seat.rownumber] = [];
    acc[seat.rownumber].push(seat);
    return acc;
  }, {});
  Object.keys(groupedSeats).forEach(row => groupedSeats[row].sort((a, b) => a.seatnumber - b.seatnumber));

  return (
    <>
      <Typography variant="h6" sx={{ color: '#DA70D6', mb: 2 }}>Select Your Seats:</Typography>
      <Box>
        {Object.keys(groupedSeats).sort((a, b) => a - b).map(row => (
          <Grid container spacing={1} justifyContent="center" key={row} sx={{ mb: 1 }}>
            {groupedSeats[row].map(seat => (
              <Grid item key={seat.placeid}>
                <Button
                  variant={seat.isBooked ? 'contained' : (selectedSeats.includes(seat.placeid) ? 'outlined' : 'outlined')}
                  color={seat.isBooked ? 'error' : (selectedSeats.includes(seat.placeid) ? 'secondary' : 'primary')}
                  disabled={seat.isBooked}
                  onClick={() => onSelect(seat)}
                  sx={{ minWidth: '60px', minHeight: '60px', m: 0.5, display: 'flex', flexDirection: 'column' }}
                >
                  <span>{seat.rownumber}-{seat.seatnumber}</span>
                  {seat.price !== undefined && <span style={{ fontSize: '0.75em', marginTop: '2px' }}>{seat.price} €</span>}
                </Button>
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default SeatsGrid;
