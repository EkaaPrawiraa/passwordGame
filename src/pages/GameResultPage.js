import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import defeat from './defeat.png';
import victory from './victory.png';

export default function GameResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { resultMessage, highest,score, searchTerm } = location.state || {};

    const handleBackToGame = () => {
        navigate('/');
    };

    const getResultImage = () => {
        if (resultMessage && resultMessage.toLowerCase().includes('win')) {
            return victory;
        } else {
            return defeat;
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#fdf4e3',
                textAlign: 'center',
                padding: 3,
            }}
        >
           
            <img src={getResultImage()} alt={resultMessage && resultMessage.toLowerCase().includes('win') ? 'Victory' : 'Defeat'} style={{ width: '40%', marginBottom: '20px' }} />

            <Typography variant="h4" gutterBottom>Highest Score: {highest}</Typography>
            <Typography variant="h4" gutterBottom>Score: {score}</Typography>
            <Typography variant="h5" gutterBottom>Your Password: </Typography>
            <Typography variant="h5" gutterBottom>{searchTerm}</Typography>

            <Button 
                variant="contained" 
                sx={{ 
                    backgroundColor: '#9e9e9e', 
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#757575', 
                    }
                }}
                onClick={handleBackToGame}
            >
                Back
            </Button>
        </Box>
    );
}
