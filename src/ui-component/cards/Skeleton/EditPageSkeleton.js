import { Divider, Grid, Skeleton } from '@mui/material';
import React from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

const EditPageSkeleton = () => {
    return (
        <>
            <MainCard title="Share Your Hiring Needs" content={false}>
                <Divider />
                <Grid container spacing={gridSpacing} sx={{ paddingX: '1rem', paddingY: '2rem' }}>
                    {[...Array(2)].map((_, index) => (
                        <Grid item xs={12} sm={12} md={6} key={index}>
                            <Skeleton sx={{ borderRadius: '6px' }} variant="rectangular" height={56} animation="wave" />
                        </Grid>
                    ))}
                    {[...Array(4)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Skeleton sx={{ borderRadius: '6px' }} variant="rectangular" height={56} animation="wave" />
                        </Grid>
                    ))}
                    {[...Array(3)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Skeleton sx={{ borderRadius: '6px' }} variant="rectangular" height={56} animation="wave" />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Skeleton sx={{ borderRadius: '6px' }} variant="rectangular" height={120} animation="wave" />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton sx={{ borderRadius: '6px' }} variant="rectangular" height={60} animation="wave" />
                    </Grid>
                    <Grid item sx={{ display: 'flex', gap: '1rem' }} xs={12}>
                        <Skeleton sx={{ borderRadius: '6px', width: '150px' }} variant="rectangular" height={60} animation="wave" />
                        <Skeleton sx={{ borderRadius: '6px', width: '150px' }} variant="rectangular" height={60} animation="wave" />
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default EditPageSkeleton;
