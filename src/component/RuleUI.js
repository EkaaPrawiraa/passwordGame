import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';

const Rule = ({ index, text, passed, images,buttons, refreshImages }) => {
    return (
        <div style={{
            border: `1px solid ${passed ? 'green' : 'red'}`,
            backgroundColor: `${passed ? '#ccffcc' : '#ffcccc'}`,
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
            width: '30%', // Mengatur lebar komponen Rule
            marginBottom: '10px'
        }}>
            <div style={{ 
                display: 'flex', 
                marginBottom: '5px',
                color: `${passed ? '#2d6a4f' : '#d62828'}`,
                padding: '5px'
            }}>
                <span style={{ 
                    fontSize: '20px', 
                    marginRight: '10px'
                }}>
                    {passed ? '✓' : '✗'}
                </span>
                <strong style={{ 
                    fontSize: '16px',
                    color : 'black',
                    paddingTop : 2,
                }}>Rule {index}</strong>
            </div>
            
            <div style={{
                backgroundColor: `${passed ? '#e6ffed' : '#ffe6e6'}`,
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius:'10px',
                padding: '5px'
            }}>
                
                <p style={{
                    margin: 0,
                    fontSize: '20px',
                    color: 'black',
                    textAlign: 'left',
                    padding: 10,
                    marginBottom : 10
                }}>{text}</p>
                
                {images && images.length > 0 && (
                    <div style={{ marginBottom: '5px' }}>
                        {images.map((image, idx) => (
                            <img key={idx} src={image.imageSrc} alt={`Rule ${index} Image ${idx}`} style={{
                                width: `${100 / images.length}%`,
                                maxWidth: '200px',
                                borderRadius: '8px',
                                border: '2px solid #FFF',
                                marginBottom: '5px',
                                padding: '10px'
                            }} />
                        ))}
                    </div>
                )}
                
                {buttons && (
    <Button
        variant="contained"
        onClick={refreshImages}
        sx={{
            marginTop: '10px',
            backgroundColor: 'gray', 
            color: '#fff',
            borderRadius: '50%', 
            minWidth: '40px', 
            minHeight: '40px', 
            padding: '0', 
            '&:hover': {
                backgroundColor: '#0056b3',
            },
        }}
    >
        <RefreshIcon sx={{ fontSize: '24px' }} /> 
    </Button>
)}


                
            </div>
        </div>
    );
};

export default Rule;
