import { IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

export const PrevArrow = (props) => {
  const {  style, onClick } = props;
  return (
    <IconButton
      onClick={onClick}
           sx={{
        ...style,
        zIndex: 1,
        color: '#FF00FF', // фиолетовый
        fontSize: '36px',
        position: "absolute",
        left: "-28px",
        top: "50%",
        transform: "translateY(-50%)",
        border: 'none',
        '&:focus': {
        outline: 'none',
        border: 'none',
        boxShadow: 'none',
        },
        '&:active': {
        outline: 'none',
        border: 'none',
        boxShadow: 'none',
        }
        }}
    >
      <ArrowBackIosNew fontSize="inherit" />
    </IconButton>
  );
};

export const NextArrow = (props) => {
  const { style, onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        ...style,
        zIndex: 1,
        position: "absolute",
        right: "-28px",
        top: "50%",
        transform: "translateY(-50%)",
        color: '#FF00FF',
        fontSize: '36px',
        border: 'none',
        '&:focus': {
        outline: 'none',
        border: 'none',
        boxShadow: 'none',
        },
        '&:active': {
        outline: 'none',
        border: 'none',
        boxShadow: 'none',
        }
      }}
    >
      <ArrowForwardIos fontSize="inherit" />
    </IconButton>
  );
};
