import React from 'react';
import { Box, CardContent, Divider, Grid, IconButton, Skeleton, Typography, useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';

const CurrentUserDetailsShimmer = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <MainCard title="Current User Details" content={false}>
            {/* Back Button */}
            <Box display="flex" marginLeft={1} alignItems="center" mb={2}>
                <IconButton onClick={() => navigate('/all-user')} aria-label="go back">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" ml={1}>
                    Back
                </Typography>
            </Box>

            <CardContent>
                {/* Top Avatar + Info */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        gap: 4,
                        textAlign: { xs: 'center', sm: 'left' },
                        mb: 3
                    }}
                >
                    <Skeleton
                        variant="circular"
                        width={isMobile ? 90 : 110}
                        height={isMobile ? 80 : 100}
                        sx={{ mx: { xs: 'auto', sm: 0 } }}
                    />

                    <Box width="100%">
                        <Skeleton variant="text" width={isMobile ? '80%' : '60%'} height={30} />
                        <Skeleton variant="text" width={isMobile ? '60%' : '40%'} height={25} sx={{ mt: 1 }} />
                        <Skeleton variant="text" width={isMobile ? '70%' : '50%'} height={25} sx={{ mt: 1 }} />
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Details Grid */}
                <Grid container spacing={3}>
                    {[...Array(6)].map((_, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Skeleton variant="text" width="40%" height={20} />
                            <Skeleton variant="text" width="80%" height={25} />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </MainCard>
    );
};

export default CurrentUserDetailsShimmer;
