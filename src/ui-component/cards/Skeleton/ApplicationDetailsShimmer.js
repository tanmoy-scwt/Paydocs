import React from 'react';
import { Grid, Card, Skeleton, Stack, Divider, Button, CardContent } from '@mui/material';
import MainCard from '../MainCard';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/system';

const ApplicationDetailsShimmer = () => {
    // const theme = useTheme();
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/admin-job-application');
    };
    const theme = useTheme();

    return (
        <Card>
            <Grid item xs={12}>
                <MainCard
                    sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}
                    title="Job Application Details"
                    content={false}
                >
                    <CardContent>
                        {/* Go Back Button */}
                        <Stack direction="row" justifyContent="flex-start" mb={3}>
                            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={goBack}>
                                Go Back
                            </Button>
                        </Stack>

                        <Grid container spacing={3}>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Grid item xs={12} sm={6} key={i}>
                                    <Skeleton variant="text" width="40%" />
                                    <Skeleton variant="text" width="80%" />
                                </Grid>
                            ))}

                            <Grid item xs={12}>
                                <Skeleton variant="text" width="40%" />
                                <Skeleton variant="text" width="90%" />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 4 }} />

                        <Skeleton variant="text" width="30%" />
                        <Skeleton variant="rectangular" width="100%" height={100} sx={{ mt: 1 }} />
                    </CardContent>
                </MainCard>
            </Grid>
        </Card>
    );
};

export default ApplicationDetailsShimmer;
