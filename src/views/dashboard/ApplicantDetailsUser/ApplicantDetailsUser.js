import React, { useEffect } from 'react';
import { CardContent, Typography, Grid, Divider, Button, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/system';
import { useSelector } from 'store';
import ApplicationDetailsShimmer from 'ui-component/cards/Skeleton/ApplicationDetailsShimmer';
import { useDispatch } from 'store';
import { resetSelectedJobByID } from 'store/slices/JobsSlices/getJobByID';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSelectedJobByIDFromAPI } from 'store/jobThunks/jobThunks';
import MainCard from 'ui-component/cards/MainCard';
import useCrypto from 'hooks/useCrypto';
import ApplicantDetails from 'views/dashboard/ApplicantDetails/ApplicantDetails';

const ApplicantDetailsUser = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { id, page } = useParams();
    const JOB_APPLIED_DETAILS = useSelector((state) => state.getJobByID);
    const { isLoading, selectedJob } = JOB_APPLIED_DETAILS;

    const { decrypt } = useCrypto();
    const application = {
        company_name: selectedJob?.data?.[0]?.company_name ? selectedJob?.data?.[0]?.company_name : 'N/A',
        job_title: selectedJob?.data?.[0]?.title || 'N/A',
        presonalEmail: selectedJob?.data?.[0]?.email || 'N/A',
        presonalPhone: selectedJob?.data?.[0]?.phone || 'N/A',
        messgae: selectedJob?.data?.[0]?.description || 'N/A',
        attachedFile: selectedJob?.data?.[0]?.supported_doc !== 'null' ? selectedJob?.data?.[0]?.supported_doc : 'N/A',
        email: selectedJob?.data?.[0]?.email_address || 'N/A',
        phone: selectedJob?.data?.[0]?.phone_number || 'N/A',
        noOfApplicant: selectedJob?.data?.[0]?.application_list?.length || 'N/A',
        job_description: selectedJob?.data?.[0]?.job_description ? selectedJob?.data?.[0]?.job_description : 'N/A',
        // created_at: selectedJob?.data?.[0]?.created_at ? selectedJob?.data?.[0]?.created_at : 'N/A',
        location: selectedJob?.data?.[0]?.location ? selectedJob?.data?.[0]?.location : 'N/A',
        salaryRange: selectedJob?.data?.[0]?.salary_from
            ? `Rs ${Math.ceil(selectedJob?.data?.[0]?.salary_from)}-${Math.ceil(selectedJob?.data?.[0]?.salary_to)}`
            : 'N/A',
        number_of_applicants: selectedJob?.data?.[0]?.number_of_applicants ? selectedJob?.data?.[0]?.number_of_applicants : 'N/A',
        work_type: selectedJob?.data?.[0]?.work_type ? selectedJob?.data?.[0]?.work_type : 'N/A',
        jobPosted: selectedJob?.data?.[0]?.created_at ? selectedJob?.data?.[0]?.created_at : 'N/A'
    };

    useEffect(() => {
        const JOB_ID = decrypt(id);
        dispatch(fetchSelectedJobByIDFromAPI(`/jobs/posted/application/list/${JOB_ID}`));
        return () => {
            dispatch(resetSelectedJobByID());
        };
    }, []);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(`/posted-jobs?page=${page}`);
    };

    if (isLoading) {
        return <ApplicationDetailsShimmer />;
    }

    const applicationFields = [
        { title: 'Job Title', content: application?.job_title },
        { title: 'Company Name', content: application?.company_name },
        { title: 'Location', content: application?.location },
        { title: 'Work Type', content: application?.work_type },
        { title: 'Email', content: application?.email },
        { title: 'Phone', content: application?.phone },
        { title: 'Salary Range', content: application?.salaryRange },
        { title: 'No of Applicants', content: application?.number_of_applicants },
        { title: 'Job Posted', content: new Date(application?.jobPosted).toLocaleDateString('en-GB') },
        // { title: 'Created On', content: new Date(application?.created_at).toLocaleDateString('en-GB') },
        { title: 'Total Applications Received', content: application?.noOfApplicant }
    ];

    return (
        <Grid sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}>
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
                        <Divider sx={{ my: 4 }} />
                        <Grid item xs={12}>
                            <Grid sx={{ mt: 2, mb: 4 }}>
                                <Typography variant="title" gutterBottom>
                                    Job Profile Details
                                </Typography>
                            </Grid>

                            <Grid container spacing={3}>
                                {!isLoading &&
                                    applicationFields?.length > 0 &&
                                    applicationFields?.map((jobProfile, index) => {
                                        return (
                                            <Grid key={index} item xs={12} sm={6}>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    {jobProfile?.title}
                                                </Typography>
                                                <Typography variant="body1">{jobProfile?.content}</Typography>
                                            </Grid>
                                        );
                                    })}
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Job Description
                                    </Typography>

                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {application?.job_description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 4 }} />
                        <Grid item xs={12}>
                            <Typography variant="title" gutterBottom>
                                Application Details
                            </Typography>

                            {selectedJob?.data?.[0]?.application_list && selectedJob?.data?.[0]?.application_list.length > 0 ? (
                                selectedJob?.data?.[0]?.application_list?.map((application, index) => {
                                    return <ApplicantDetails key={index} applicant={application} />;
                                })
                            ) : (
                                <Grid
                                    sx={{
                                        height: 200,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography>No Application Received</Typography>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ApplicantDetailsUser;
