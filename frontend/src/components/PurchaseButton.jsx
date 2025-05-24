import { Button } from '@mui/material';

const PurchaseButton = ({ selectedSeats, onBuy }) => {
  if (!selectedSeats.length) return null;

  return (
    <Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={onBuy}>
      Confirm and Buy {selectedSeats.length} Ticket{selectedSeats.length > 1 ? 's' : ''}
    </Button>
  );
};

export default PurchaseButton;
