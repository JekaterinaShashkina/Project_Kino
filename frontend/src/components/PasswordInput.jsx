import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ label, value, onChange, name, required = true }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleToggle} 
            edge="end"   
            disableRipple
            sx={{ outline: 'none',
            color:'lightgray',
            '&:focus': { outline: 'none', color: 'gray' },
            '&:focus-visible': { outline: 'none', color:'gray' },
            '&:hover': { backgroundColor: 'transparent', color:'gray' },
            }}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default PasswordInput;
