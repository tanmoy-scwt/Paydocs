import { Grid, Skeleton, Box, useTheme } from '@mui/material';
import MainCard from '../MainCard';

const FillOutApplicationSkeleton = () => {
    const theme = useTheme();

    return (
        <MainCard title="Fill Out Your Application Below" content={false}>
            <Grid sx={{ paddingX: '1rem', paddingY: '2rem' }} container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Skeleton sx={{ borderRadius: '10px' }} variant="rectangular" height={50} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton sx={{ borderRadius: '10px' }} variant="rectangular" height={50} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton sx={{ borderRadius: '10px' }} variant="rectangular" height={50} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Skeleton sx={{ borderRadius: '10px' }} variant="rectangular" height={50} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton sx={{ borderRadius: '10px' }} variant="rectangular" height={100} />
                </Grid>

                <Grid item xs={12}>
                    <Box
                        sx={{
                            marginTop: '1rem',
                            paddingX: 2.25,
                            bgcolor: theme.palette.mode === 'dark' ? '' : '#f5f5f5',
                            borderRadius: 2
                        }}
                    >
                        <Grid container spacing={2} alignItems="center" gap={'1rem'}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: theme.palette.mode === 'dark' ? '' : '#f5f5f5',
                                    borderRadius: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 2,
                                    flexWrap: 'wrap'
                                }}
                            >
                                <Box>
                                    <Skeleton sx={{ borderRadius: '6px' }} variant="text" width={150} />
                                    <Skeleton sx={{ borderRadius: '6px' }} variant="text" width={120} />
                                </Box>
                                <Skeleton sx={{ borderRadius: '10px' }} variant="rectangular" width={160} height={40} />
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>

            <Grid item sx={{ paddingX: '1rem', paddingY: '2rem' }} container spacing={2}>
                <Grid item>
                    <Skeleton sx={{ borderRadius: '8px' }} variant="rectangular" width={100} height={40} />
                </Grid>
                <Grid item>
                    <Skeleton sx={{ borderRadius: '8px' }} variant="rectangular" width={120} height={40} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default FillOutApplicationSkeleton;
