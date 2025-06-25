import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import useAuth from 'hooks/useAuth';
import JOBPOSTINGIMG from '../../../assets/images/jobPosting.jpg';
import COMPANYLOGO from '../../../assets/images/icons/MLogo.png';
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
            {/* <Box sx={{ p: { xs: 2, sm: 2.25 } }}> */}
            <Box
                sx={{
                    px: {
                        xs: '12px',
                        sm: '16px',
                        md: '18px',
                        lg: '20px',
                        xl: '24px'
                    },
                    py: {
                        xs: '16px',
                        sm: '24px',
                        md: '28px',
                        lg: '35px',
                        xl: '40px'
                    }
                }}
            >
                <Grid container direction="column">
                    <Grid container justifyContent="space-between" alignItems="center">
                        {/* LEFT SIDE: Avatar + Company Name */}
                        <Grid item>
                            <Grid container flexDirection={'column'} alignItems="flex-start" spacing={2}>
                                <Grid item>
                                    {user?.user_role === 'admin' ? (
                                        <Avatar
                                            variant="rounded"
                                            src={
                                                companyDetails?.profile
                                                    ? `${process.env.REACT_APP_API_IMAGE_URL}/${companyDetails?.profile}`
                                                    : COMPANYLOGO
                                            }
                                            sx={{
                                                backgroundColor: '#fff',
                                                borderRadius: '50% !important',
                                                width: { xs: 64, sm: 72, md: 83 },
                                                height: { xs: 64, sm: 72, md: 83 }
                                            }}
                                        />
                                    ) : (
                                        <Avatar
                                            variant="rounded"
                                            src={companyDetails?.profile === null ? companyDetails?.profile : JOBPOSTINGIMG}
                                            sx={{
                                                backgroundColor: '#fff',
                                                borderRadius: '50% !important',
                                                width: { xs: 64, sm: 72, md: 83 },
                                                height: { xs: 64, sm: 72, md: 83 }
                                            }}
                                        />
                                    )}
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                                            fontWeight: 600,
                                            textTransform: 'capitalize',
                                            textOverflow: 'wrap'
                                        }}
                                    >
                                        {companyDetails?.titleName}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* RIGHT SIDE: Job Count + Label */}
                        <Grid item textAlign="right">
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '5rem',
                                        sm: '5rem',
                                        md: '5rem',
                                        lg: '6rem'
                                    },
                                    fontWeight: 900,
                                    fontStyle: 'italic',
                                    fontFamily: `'Work Sans', ${theme.typography.fontFamily}`,
                                    color: theme.palette.secondary.main,
                                    lineHeight: 1
                                }}
                            >
                                {companyDetails?.totalCount}
                            </Typography>

                            {user?.user_role === 'admin' && (
                                <Typography
                                    sx={{
                                        fontSize: { xs: '0.875rem', sm: '1rem' },
                                        fontWeight: 500,
                                        color: theme.palette.mode === 'dark' ? '#fff' : '#061237'
                                    }}
                                >
                                    Jobs Posted
                                </Typography>
                            )}
                        </Grid>
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
