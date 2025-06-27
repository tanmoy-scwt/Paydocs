import React, { useEffect, useState } from 'react';
import { CardContent, Typography, Grid, Divider, Button, Stack, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, useTheme } from '@mui/system';
import { useSelector } from 'store';
import ApplicationDetailsShimmer from 'ui-component/cards/Skeleton/ApplicationDetailsShimmer';
import { useDispatch } from 'store';
import { resetSelectedJobByID } from 'store/slices/JobsSlices/getJobByID';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSelectedJobByIDFromAPI } from 'store/jobThunks/jobThunks';
import MainCard from 'ui-component/cards/MainCard';
import useCrypto from 'hooks/useCrypto';
import DownloadIcon from '@mui/icons-material/Download';
import useJobCategoryList from 'hooks/useListCategory';

const ApplicationDetails = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { id, page } = useParams();
    const JOB_APPLIED_DETAILS = useSelector((state) => state.getJobByID);
    const { isLoading, selectedJob } = JOB_APPLIED_DETAILS;
    const { decrypt } = useCrypto();
    const application = {
        f_name: selectedJob?.data?.f_name || 'N/A',
        l_name: selectedJob?.data?.l_name || 'N/A',
        company_name: selectedJob?.data?.company_name ? selectedJob?.data?.company_name : 'N/A',
        job_title: selectedJob?.data?.job_dtls?.title || 'N/A',
        presonalEmail: selectedJob?.data?.email || 'N/A',
        presonalPhone: selectedJob?.data?.phone || 'N/A',
        messgae: selectedJob?.data?.description || 'N/A',
        attachedFile: selectedJob?.data?.supported_doc !== 'null' ? selectedJob?.data?.supported_doc : 'N/A',
        email: selectedJob?.data?.job_dtls?.email_address || 'N/A',
        phone: selectedJob?.data?.job_dtls?.phone_number || 'N/A',
        job_description: selectedJob?.data?.job_dtls?.job_description ? selectedJob?.data?.job_dtls?.job_description : 'N/A',
        created_at: selectedJob?.data?.created_at ? selectedJob?.data?.created_at : 'N/A',
        location: selectedJob?.data?.job_dtls?.location ? selectedJob?.data?.job_dtls?.location : 'N/A',
        salaryRange: selectedJob?.data?.job_dtls?.salary_from
            ? `Rs ${Math.ceil(selectedJob?.data?.job_dtls?.salary_from)}-${Math.ceil(selectedJob?.data?.job_dtls?.salary_to)}`
            : 'N/A',
        number_of_applicants: selectedJob?.data?.job_dtls?.number_of_applicants ? selectedJob?.data?.job_dtls?.number_of_applicants : 'N/A',
        work_type: selectedJob?.data?.job_dtls?.work_type ? selectedJob?.data?.job_dtls?.work_type : 'N/A',
        jobPosted: selectedJob?.data?.job_dtls?.created_at ? selectedJob?.data?.job_dtls?.created_at : 'N/A'
    };
    const formattedDate = new Date(application?.created_at).toLocaleDateString('en-GB');
    const formattedJobPostedDate = new Date(application?.jobPosted).toLocaleDateString('en-GB');
    useEffect(() => {
        const JOB_ID = decrypt(id);
        dispatch(fetchSelectedJobByIDFromAPI(`/current-user-job-application-dtls/${JOB_ID}`));
        return () => {
            dispatch(resetSelectedJobByID());
        };
    }, []);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(`/job-applied?page=${page}`);
    };

    const { categories, loadingCategory } = useJobCategoryList('/job-category-list');

    const [categoryName, setCategoryName] = useState('');
    useEffect(() => {
        if (!loadingCategory) {
            console.log(selectedJob?.data?.job_dtls?.job_category_id);

            setCategoryName(categories.find((category) => category.value === selectedJob?.data?.job_dtls?.job_category_id)?.label || '');
        }
    }, [loadingCategory, categories, selectedJob]);

    if (isLoading) {
        return <ApplicationDetailsShimmer />;
    }

    return (
        <Grid sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}>
            <Grid item xs={12}>
                <MainCard
                    sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}
                    title="Your Job Applications Details"
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
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Job Title
                                </Typography>
                                <Typography variant="body1">{application?.job_title}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Company Name
                                </Typography>
                                <Typography variant="body1">{application?.company_name}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Location
                                </Typography>
                                <Typography variant="body1">{application?.location}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Work Type
                                </Typography>
                                <Typography variant="body1">{application?.work_type}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Category
                                </Typography>
                                <Typography variant="body1">{categoryName || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Email
                                </Typography>
                                <Typography variant="body1">{application?.email}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Phone
                                </Typography>
                                <Typography variant="body1">{application?.phone}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Salary Range
                                </Typography>
                                <Typography variant="body1">{application?.salaryRange}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    No of Applicants
                                </Typography>
                                <Typography variant="body1">{application?.number_of_applicants}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Job Posted
                                </Typography>
                                <Typography variant="body1">{formattedJobPostedDate}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Applied On
                                </Typography>
                                <Typography variant="body1">{formattedDate}</Typography>
                            </Grid>
                            <Divider sx={{ my: 4 }} />
                            <Grid item xs={12} sm={12}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Job Description
                                </Typography>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {application?.job_description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 4 }} />
                        <Grid item xs={12}>
                            <Typography variant="title" gutterBottom>
                                Applied Details
                            </Typography>
                            <Grid container spacing={3} sx={{ marginTop: 1 }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        First Name
                                    </Typography>
                                    <Typography variant="body1">{application?.f_name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Last Name
                                    </Typography>
                                    <Typography variant="body1">{application?.l_name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Email
                                    </Typography>
                                    <Typography variant="body1">{application?.presonalEmail}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Phone No
                                    </Typography>
                                    <Typography variant="body1">{application?.presonalPhone}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Message
                                    </Typography>
                                    <Typography variant="body1">{application?.messgae}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Attached File
                                    </Typography>
                                    {/* <Typography variant="body1">{application?.attachedFile}</Typography> */}
                                    {application?.attachedFile !== 'N/A' ? (
                                        <Grid item>
                                            <Tooltip title="Download">
                                                <IconButton
                                                    component="a"
                                                    href={`${process.env.REACT_APP_API_IMAGE_URL}/${application.attachedFile}`}
                                                    download
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    size="small"
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'transparent' // Remove hover background
                                                        },
                                                        padding: 0 // Optional: remove extra spacing
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <DownloadIcon fontSize="small" />
                                                        <Typography variant="caption">Download Attachment</Typography>
                                                    </Box>
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    ) : (
                                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                            {application?.attachedFile}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ApplicationDetails;
