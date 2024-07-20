import React from 'react';

const Rule = ({ index, text, passed }) => {
    return (
        <div style={{
            border: `1px solid ${passed ? 'green' : 'red'}`,
            backgroundColor: `${passed ? '#ccffcc' : '#ffcccc'}`,
            // padding: '10px',
            // margin: '5px 0',
            borderRadius: '10px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
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
                    fontSize: '16px'
                }}>Rule {index}</strong>
            </div>
            <div style={{
                backgroundColor: `${passed ? '#e6ffed' : '#ffe6e6'}`,
                borderTopLeftRadius:'0',
                borderTopRightRadius:'0',
                borderRadius: '10px',
                padding: '5px'
            }}>
                <p style={{
                    margin: 0,
                    fontSize: '14px',
                    color: 'black',
                    textAlign: 'left'
                }}>{text}</p>
            </div>
        </div>
    );
};

export default Rule;
