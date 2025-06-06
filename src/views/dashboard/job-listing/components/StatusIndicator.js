import React from 'react';
import { Box, Typography } from '@mui/material';

const statusColors = {
    0: '#FFC107', // Amber 500
    1: '#4CAF50', // Green 500
    2: '#F44336' // Red 500
};

const textColors = {
    0: '#000000',
    1: '#ffffff',
    2: '#ffffff'
};

export default function StatusIndicator({ status = 0 }) {
    const backgroundColor = statusColors[status] || '#f0f0f0';
    const textColor = textColors[status] || '#000';

    const label = {
        0: 'Approval Pending',
        1: 'Job Approved',
        2: 'Job Rejected'
    }[status];

    return (
        <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
                backgroundColor,
                borderRadius: '16px',
                padding: '6px 12px',
                width: 'fit-content',
                marginTop: '0.5rem',
                marginBottom: '1.5rem'
            }}
        >
            <Typography sx={{ fontSize: '10px', color: textColor, fontWeight: 700 }}>{label}</Typography>
        </Box>
    );
}
