import { Box } from '@mui/material';

const CardBase = ({ children, sx }) => (
  <Box sx={{
    border: '1px solid #DA70D6',
    borderRadius: 3,
    boxShadow: 3,
    overflow: 'hidden',
    backgroundColor: '#222',
    color: '#fff',
    p: 1,
    textAlign: 'center',
    ...sx
  }}>
    {children}
  </Box>
);

export default CardBase;
