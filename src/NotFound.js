import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                px: 3
            }}
        >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: '#ff6f61', mb: 2 }} />
            <Typography variant="h2" fontWeight={700} gutterBottom>
                404
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
                {` Oops! The page you're looking for doesn't exist.`}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                It might have been moved or deleted.
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" onClick={handleBackHome}>
                    Go to Home
                </Button>
            </Stack>
        </Box>
    );
};

export default NotFound;
