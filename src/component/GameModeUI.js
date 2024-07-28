import React from 'react';
import { Select, MenuItem } from '@mui/material';

const GameModeSelector = ({ gameLevel, onLevelChange }) => {
    const handleChange = (event) => {
        onLevelChange(event.target.value);
    };

    return (
        <Select 
            value={gameLevel} 
            onChange={handleChange}
            sx={{
                width:'10%',
                border: '2px solid', 
                borderColor: 'black', 
                borderRadius: '4px', 
            }}
        >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
        </Select>
    );
};

export default GameModeSelector;
