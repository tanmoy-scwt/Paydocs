// material-ui
import { Box, Divider, Grid, Pagination, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/system';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'store';
import { fetchAllJobsFromAPI, fetchSelectedJobByIDFromAPI } from 'store/jobThunks/jobThunks';
import { useSelector } from 'store';
import { setJobParams } from 'store/slices/JobsSlices/allJobsSlice';
import JobPostBoxTableSkeleton from 'ui-component/cards/Skeleton/JobPostBoxTableSkeleton';
import JobPostBoxTable from 'ui-component/JobPostBoxForTable/JobPostBoxForTable';
import useCrypto from 'hooks/useCrypto';

const JobManagement = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [deleted, setDeleted] = useState(false);
    const allJobsFromAPI = useSelector((state) => state.allJobs);
    const { isLoading, allJobs } = allJobsFromAPI;
    const ALL_JOBS_LIST_ARRAY = allJobs?.status === true ? allJobs?.data?.data : [];
    const TOTAL_PAGES = allJobs?.status === true ? allJobs?.data?.last_page : 1;
    const { encrypt } = useCrypto();
    const handleFormOpenAction = (id) => {
        const JOB_ID = encrypt(id);
        navigate(`/job-management/${JOB_ID}`);
        dispatch(fetchSelectedJobByIDFromAPI(`/admin/job-details/${id}`));
    };

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
            navigate(`/job-management?page=${value}`);
        },
        [page]
    );

    useEffect(() => {
        if (currentPage) setPage(currentPage);
        dispatch(fetchAllJobsFromAPI({ API_PATH: '/admin/job-list', params: { page: page } }));
        dispatch(setJobParams({ page: 1, category: 2 }));
    }, [page, currentPage, deleted]);

    return (
        <>
            <Grid sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}>
                <Grid item xs={12}>
                    <MainCard sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }} title="Manage All Jobs" content={false}>
                        <Box height="1rem" />
                        <Divider />
                        <Grid sx={{ paddingX: '0rem', paddingY: '0rem' }} container spacing={gridSpacing}>
                            <Grid item xs={12} sm={12} lg={12}>
                                {!isLoading &&
                                    allJobs?.status === true &&
                                    ALL_JOBS_LIST_ARRAY?.length > 0 &&
                                    ALL_JOBS_LIST_ARRAY?.map((jobProfile, index) => (
                                        <JobPostBoxTable
                                            key={`JobProfileAvailable${index}`}
                                            jobDetails={jobProfile}
                                            action={() => handleFormOpenAction(jobProfile?.id)}
                                            setter={setDeleted}
                                        />
                                    ))}
                                {isLoading && Array.from({ length: 10 }).map((_, index) => <JobPostBoxTableSkeleton key={index} />)}
                                {!isLoading && ALL_JOBS_LIST_ARRAY?.length === 0 && (
                                    <Box
                                        sx={{
                                            height: 250,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'transparent',
                                            borderRadius: 2,
                                            mt: 2
                                        }}
                                    >
                                        <Typography variant="h6" color="text.secondary" fontWeight={500}>
                                            No Jobs Found
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>

                            <Grid marginBottom={'2.5rem'} item xs={12} sm={6}>
                                <Grid container direction="column" spacing={2} alignItems="center">
                                    {!isLoading && ALL_JOBS_LIST_ARRAY?.length > 0 && (
                                        <Grid item xs={12}>
                                            <Pagination
                                                count={TOTAL_PAGES}
                                                color="secondary"
                                                page={page}
                                                onChange={handlePageChange}
                                                size="large"
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
};

export default JobManagement;
