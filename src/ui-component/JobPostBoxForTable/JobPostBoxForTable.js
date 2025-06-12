import PropTypes from 'prop-types';
import { Avatar, Box, Button, CardActions, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import building from 'assets/images/icons/building.svg';
import watch from 'assets/images/icons/watch.svg';
import salary from 'assets/images/icons/moneyCirculation.svg';
import location_icon from 'assets/images/icons/location.svg';
import bag from 'assets/images/icons/bag.svg';
import { useTheme } from '@mui/system';
import { memo, useCallback, useState } from 'react';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useDeleteAPI from 'hooks/useDeleteAPI';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';

import ConfirmDeleteJobModal from 'ui-component/ConfirmDeleteJobModel/ConfirmDeleteJobModel';
import StatusIndicator from 'ui-component/StatusIndicator/StatusIndicator';

const JobPostBoxForTable = ({ action, jobDetails, setter }) => {
    const { company_logo, status, id, title, company_name, job_description, location, work_type, salary_to, salary_from, category_dtls } =
        jobDetails;
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [isViewMore, setViewMore] = useState(false);
    const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const handleViewMore = useCallback(() => {
        setViewMore((prev) => !prev);
    }, []);

    const callingDeleteAPI = useDeleteAPI();
    const handleDelete = async (id) => {
        setDeleting(true);
        const responseDelete = await callingDeleteAPI(user?.user_role === 'admin' ? `/admin/job-delete/${id}` : `/job-delete/${id}`);
        if (responseDelete.status === 200) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Job Deleted Successfully!',
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false
                })
            );
            setDeleting(false);
            setDeleteModelOpen(false);
            setter(true);
        }
    };

    const infoItems = [
        { icon: building, text: company_name || '' },
        { icon: watch, text: work_type || '' },
        { icon: bag, text: category_dtls?.job_category_name || 'category' },
        {
            icon: salary,
            text: salary_to && salary_from ? `₹${Math.ceil(salary_from)} - ₹${Math.ceil(salary_to)} per month` : ''
        },
        { icon: location_icon, text: location || '' }
    ];

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? 'inherit' : '#fafafa'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'flex-start', md: 'flex-start' }
                    }}
                >
                    <Avatar
                        variant="rounded"
                        sx={{
                            borderRadius: '50%',
                            width: 70,
                            height: 70,
                            mt: { xs: 0, md: 1 },
                            backgroundColor: !company_logo ? '#ccc' : 'transparent',
                            border: !company_logo ? '1px solid #ccc' : 'none',
                            mx: 0 // removes auto-centering
                        }}
                        src={company_logo ? `${process.env.REACT_APP_API_IMAGE_URL}/${company_logo}` : ''}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography component="h3" variant="body1" fontSize={18} fontWeight={600} mb={1}>
                        {title || ''}
                    </Typography>
                    <StatusIndicator status={status} />
                    <List
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            justifyContent: { lg: 'space-between' },
                            p: 0,
                            mb: 1,
                            width: { lg: '90%' }
                        }}
                    >
                        {infoItems?.map((item, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: 0,
                                    py: 0.5,
                                    width: 'auto'
                                }}
                            >
                                <ListItemIcon sx={{ width: 20, height: 20, minWidth: 'auto', mr: 0.5 }}>
                                    <img src={item.icon} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="icon" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        sx: {
                                            fontSize: '12px',
                                            whiteSpace: 'nowrap',
                                            color: '#2B2D3B',
                                            lineHeight: '20px'
                                        }
                                    }}
                                    sx={{ m: 0 }}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Typography sx={{ color: '#697586', lineHeight: '20px' }} variant="body2">
                        {job_description &&
                            (!isViewMore && job_description.length > 365 ? `${job_description.slice(0, 300)}...` : job_description)}
                    </Typography>
                    {job_description?.length > 365 ? (
                        <CardActions sx={{ p: 0, px: 0, pt: 1 }}>
                            <Button
                                onClick={handleViewMore}
                                sx={{
                                    color: theme.palette.secondary.main,
                                    textTransform: 'capitalize'
                                }}
                                variant="text"
                                size="small"
                            >
                                {isViewMore ? 'View Less' : 'View Details'}
                            </Button>
                        </CardActions>
                    ) : (
                        <Box sx={{ padding: '1rem' }} />
                    )}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        justifyContent: 'flex-start',
                        width: 'max-content',
                        gap: 1,
                        py: 0
                    }}
                >
                    <AnimateButton sx={{ flex: 1 }}>
                        <Button
                            onClick={() => action(id)}
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                '&:hover': { backgroundColor: theme.palette.secondary.dark },
                                textTransform: 'capitalize',
                                width: '100%'
                            }}
                            variant="contained"
                            size="large"
                        >
                            Edit
                        </Button>
                    </AnimateButton>

                    <AnimateButton sx={{ flex: 1 }}>
                        <Button
                            onClick={() => setDeleteModelOpen(true)}
                            sx={{
                                border: `1px solid ${theme.palette.error.main}`,
                                color: theme.palette.error.main
                            }}
                            variant="outlined"
                            size="large"
                        >
                            Delete
                        </Button>
                    </AnimateButton>
                </Box>
            </Box>
            <Divider sx={{ borderBottomWidth: 2, color: '#BDBDBD' }} />
            {isDeleteModelOpen && (
                <ConfirmDeleteJobModal
                    open={isDeleteModelOpen}
                    onClose={() => setDeleteModelOpen(false)}
                    onConfirm={() => handleDelete(id)}
                    isDeleting={isDeleting}
                />
            )}
        </>
    );
};

JobPostBoxForTable.propTypes = {
    title: PropTypes.string,
    action: PropTypes.func.isRequired,
    jobDetails: PropTypes.shape({
        company_logo: PropTypes.string,
        company_name: PropTypes.string.isRequired,
        job_description: PropTypes.string,
        title: PropTypes.string,
        location: PropTypes.string,
        work_type: PropTypes.string,
        salary_to: PropTypes.string,
        salary_from: PropTypes.string,
        category_dtls: PropTypes.object
    })
    // givingJOBID: PropTypes.func.isRequired
};

export default memo(JobPostBoxForTable);
