import { Button } from "@mui/material";

const buttonStyles = {
  fontSize: '1.2rem',
  color: '#000',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#EE82EE',
    color: '#6a00b8', // немного светлее при наведении
  },
  '&:focus': {
    outline: 'none',
    backgroundColor: '#EE82EE',
    color: '#6a00b8',
  },
  '&:active': {
    backgroundColor: '#EE82EE',
    color: '#6a00b8',
  }
};

export const AppButton = ({ children, sx = {}, ...props }) => {
  return (
    <Button sx={{ ...buttonStyles, ...sx }} {...props}>
      {children}
    </Button>
  );
};