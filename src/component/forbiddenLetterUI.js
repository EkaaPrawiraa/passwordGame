import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const ForbiddenLetterUI = ({ setForbiddenLetters }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    const uniqueLetters = Array.from(new Set(value.toLowerCase().split('')));
    setForbiddenLetters(uniqueLetters);
  };

  return (
    <TextField 
      id="standard-basic" 
      variant="outlined" 
      value={searchTerm} 
      onChange={handleSearch}
      sx={{
        
        borderRadius: '15px',
        backgroundColor: '#fff',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: '5px',
            borderColor: 'black',
          },
        },
        // paddingLeft:'10px',
        width: '10%' 
      }} 
    />
  );
};

export default ForbiddenLetterUI;
