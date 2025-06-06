import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import useAuth from 'hooks/useAuth';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.paper,
    color: theme.palette.secondary.dark,
    overflow: 'hidden',
    position: 'relative'
}));

const CompanyBoxCard = ({ isLoading, companyDetails }) => {
    const theme = useTheme();
    const { user } = useAuth();
    return isLoading ? (
        <SkeletonEarningCard />
    ) : (
        <CardWrapper border={false} content={false}>
            <Box sx={{ p: { xs: 2, sm: 2.25 } }}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Avatar
                                    variant="rounded"
                                    src={
                                        companyDetails?.user_dtls?.profile_pic
                                            ? `${process.env.REACT_APP_API_IMAGE_URL}/${companyDetails?.user_dtls?.profile_pic}`
                                            : ''
                                    }
                                    sx={{
                                        backgroundColor: '#fff',
                                        mt: 1,
                                        borderRadius: '50% !important',
                                        width: { xs: 64, sm: 72, md: 83 },
                                        height: { xs: 64, sm: 72, md: 83 }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Typography
                                    sx={{
                                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
                                        fontWeight: 500,
                                        textTransform: 'capitalize',
                                        mr: 1,
                                        mt: 2,
                                        mb: 1
                                    }}
                                >
                                    {user?.user_role === 'user'
                                        ? companyDetails?.user_dtls?.company_name
                                            ? companyDetails?.user_dtls?.company_name
                                            : 'Company Name'
                                        : companyDetails?.user_dtls?.first_name
                                        ? `${companyDetails?.user_dtls?.first_name} ${companyDetails?.user_dtls?.last_name}`
                                        : 'Owner Name'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item sx={{ mb: 1.25 }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                                fontWeight: 500,
                                color: theme.palette.mode === 'dark' ? '#fff' : '#061237'
                            }}
                        >
                            {companyDetails?.total_job_post ? `${companyDetails?.total_job_post} Jobs Posted` : companyDetails?.totalCount}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </CardWrapper>
    );
};

CompanyBoxCard.propTypes = {
    isLoading: PropTypes.bool,
    companyDetails: PropTypes.object
};

export default CompanyBoxCard;
