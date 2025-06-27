import React, { useEffect, useState } from 'react';
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
import AnimateButton from 'ui-component/extended/AnimateButton';
import useJobCategoryList from 'hooks/useListCategory';

const job_Status = [
    { value: 1, label: 'Open' },
    { value: 2, label: 'Closed' },
    { value: 0, label: 'Blocked' }
];

const JobDetailsView = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { id, page } = useParams();
    const JOB_APPLIED_DETAILS = useSelector((state) => state.getJobByID);
    const { categories, loadingCategory } = useJobCategoryList('/job-category-list');
    const { isLoading, selectedJob } = JOB_APPLIED_DETAILS;
    const [categoryName, setCategoryName] = useState('');
    console.log(selectedJob, 'selectedJob');

    const { decrypt, encrypt } = useCrypto();
    const newDecryptedID = decrypt(id);
    const SELECTED_STATUS_VALUE = job_Status.find((status) => status.value === selectedJob?.data?.status)?.label || 'N/A';
    const application = {
        company_name: selectedJob?.data?.company_name ? selectedJob?.data?.company_name : 'N/A',
        job_title: selectedJob?.data?.title || 'N/A',
        presonalEmail: selectedJob?.data?.email || 'N/A',
        presonalPhone: selectedJob?.data?.phone || 'N/A',
        messgae: selectedJob?.data?.description || 'N/A',
        attachedFile: selectedJob?.data?.supported_doc !== 'null' ? selectedJob?.data?.supported_doc : 'N/A',
        email: selectedJob?.data?.email_address || 'N/A',
        phone: selectedJob?.data?.phone_number || 'N/A',
        noOfApplicant: selectedJob?.data?.application_list?.length || 'N/A',
        job_description: selectedJob?.data?.job_description ? selectedJob?.data?.job_description : 'N/A',
        // created_at: selectedJob?.data?.created_at ? selectedJob?.data?.created_at : 'N/A',
        location: selectedJob?.data?.location ? selectedJob?.data?.location : 'N/A',
        salaryRange: selectedJob?.data?.salary_from
            ? `Rs ${Math.ceil(selectedJob?.data?.salary_from)}-${Math.ceil(selectedJob?.data?.salary_to)}`
            : 'N/A',
        number_of_applicants: selectedJob?.data?.number_of_applicants ? selectedJob?.data?.number_of_applicants : 'N/A',
        work_type: selectedJob?.data?.work_type ? selectedJob?.data?.work_type : 'N/A',
        jobPosted: selectedJob?.data?.created_at ? selectedJob?.data?.created_at : 'N/A',
        status: SELECTED_STATUS_VALUE ? SELECTED_STATUS_VALUE : 'N/A'
    };
    useEffect(() => {
        if (!loadingCategory) {
            console.log(selectedJob?.data?.job_category_id);

            setCategoryName(categories.find((category) => category.value === selectedJob?.data?.job_category_id)?.label || '');
        }
    }, [loadingCategory, categories, selectedJob]);
    useEffect(() => {
        const JOB_ID = decrypt(id);

        dispatch(fetchSelectedJobByIDFromAPI(`/job-details/${JOB_ID}`));
        return () => {
            dispatch(resetSelectedJobByID());
        };
    }, []);
    const handleFormOpenAction = (id) => {
        // const ID = decrypt(id);
        // console.log(ID);
        const ID = encrypt(id);
        console.log(page, 'page');
        console.log(ID, 'id');

        navigate(`/job-listing/form/${page}/${ID}`);
        // dispatch(fetchSelectedJobByIDFromAPI(`/job-details/${ID}`));
        //  navigate(`/job-listing/form/${currentPage}/${ID}`);
        // dispatch(fetchSelectedJobByIDFromAPI(user?.user_role === 'admin' ? `/admin/job-details/${ID}` : `/job-update/${ID}`));
    };

    const navigate = useNavigate();

    const goBack = () => {
        navigate(`/job-listing?page=${page}`);
    };

    if (isLoading) {
        return <ApplicationDetailsShimmer />;
    }

    const applicationFields = [
        { title: 'Job Title', content: application?.job_title },
        { title: 'Company Name', content: application?.company_name },
        { title: 'Location', content: application?.location },
        { title: 'Work Type', content: application?.work_type },
        { title: 'Category', content: categoryName || 'N/A' },
        { title: 'Total Applications Received', content: application?.noOfApplicant },
        { title: 'Email', content: application?.email },
        { title: 'Phone', content: application?.phone },
        { title: 'Salary Range', content: application?.salaryRange },
        { title: 'No of Applicants', content: application?.number_of_applicants },
        { title: 'Job Posted', content: new Date(application?.jobPosted).toLocaleDateString('en-GB') },
        // { title: 'Created On', content: new Date(application?.created_at).toLocaleDateString('en-GB') },
        { title: 'Status', content: application?.status || 'N/A' }
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
                        <Stack direction="row" justifyContent="space-between" mb={3}>
                            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={goBack}>
                                Go Back
                            </Button>
                            <AnimateButton sx={{ flex: 1 }}>
                                <Button
                                    onClick={() => handleFormOpenAction(newDecryptedID)}
                                    sx={{
                                        backgroundColor: theme.palette.secondary.main,
                                        '&:hover': { backgroundColor: theme.palette.secondary.dark },
                                        textTransform: 'capitalize',
                                        width: '100%'
                                    }}
                                    variant="contained"
                                    size="large"
                                >
                                    Apply Now
                                </Button>
                            </AnimateButton>
                        </Stack>
                        <Divider sx={{ my: 4 }} />
                        <Grid item xs={12}>
                            <Grid sx={{ mt: 2, mb: 4 }}>
                                <Typography variant="title" gutterBottom>
                                    Job Details
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
                    </CardContent>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default JobDetailsView;
