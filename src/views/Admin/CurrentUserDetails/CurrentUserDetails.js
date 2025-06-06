import React, { useEffect } from 'react';
import { Avatar, Box, CardContent, Divider, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import useCrypto from 'hooks/useCrypto';
import { useSelector } from 'store';
import { useDispatch } from 'store';
import { fetchSelectedJobByIDFromAPI } from 'store/jobThunks/jobThunks';
import { resetSelectedJobByID } from 'store/slices/JobsSlices/getJobByID';
import MainCard from 'ui-component/cards/MainCard';
import CurrentUserDetailsShimmer from 'ui-component/cards/Skeleton/CurrentUserDetailsShimmer';

const CurrentUserDetails = () => {
    const { id } = useParams();
    const { decrypt } = useCrypto();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selecetedUser = useSelector((state) => state.getJobByID);
    const { isLoading } = selecetedUser;

    const CURRENT_USER = selecetedUser?.selectedJob?.data;
    const CURRENT_USER_ID = decrypt(id);

    useEffect(() => {
        if (id) {
            dispatch(fetchSelectedJobByIDFromAPI(`/admin/user-details/${CURRENT_USER_ID}`));
        }
        return () => {
            dispatch(resetSelectedJobByID());
        };
    }, []);

    if (isLoading) {
        return <CurrentUserDetailsShimmer />;
    }

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
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        gap: '4rem',
                        textAlign: { xs: 'center', sm: 'left' },
                        mb: 3
                    }}
                >
                    <Avatar
                        alt={`${CURRENT_USER?.first_name || ''} ${CURRENT_USER?.last_name || ''}`}
                        src={CURRENT_USER?.profile_pic}
                        sx={{
                            width: { xs: 90, sm: 90 },
                            height: { xs: 90, sm: 90 },
                            boxShadow: 2
                        }}
                    />
                    <Box>
                        <Typography variant="h5" fontWeight="bold">
                            {CURRENT_USER?.first_name} {CURRENT_USER?.last_name}
                        </Typography>

                        <Typography color="text.secondary" mt={0.5}>
                            Role: <strong>{CURRENT_USER?.user_role}</strong>
                        </Typography>

                        <Typography color="text.secondary" mt={0.5}>
                            Company: <strong>{CURRENT_USER?.company_name}</strong>
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Email
                        </Typography>
                        <Typography>{CURRENT_USER?.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Mobile
                        </Typography>
                        <Typography>{CURRENT_USER?.mobile}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Website
                        </Typography>
                        <Typography>{CURRENT_USER?.website || 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Email Verified
                        </Typography>
                        <Typography>{CURRENT_USER?.email_verified_at ? 'Yes' : 'No'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Created At
                        </Typography>
                        <Typography>{CURRENT_USER?.created_at ? new Date(CURRENT_USER?.created_at).toLocaleString() : 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Updated At
                        </Typography>
                        <Typography>{CURRENT_USER?.updated_at ? new Date(CURRENT_USER?.updated_at).toLocaleString() : 'N/A'}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

export default CurrentUserDetails;
