// material-ui
import { Box, Divider, Grid, Pagination, Skeleton, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/system';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'store';
import { fetchAllJobsFromAPI, fetchSelectedJobByIDFromAPI } from 'store/jobThunks/jobThunks';
import { useSelector } from 'store';
import { setJobParams } from 'store/slices/JobsSlices/allJobsSlice';
import JobPostBoxTableSkeleton from 'ui-component/cards/Skeleton/JobPostBoxTableSkeleton';
import JobPostBoxForTable from 'ui-component/JobPostBoxForTable/JobPostBoxForTable';
import useCrypto from 'hooks/useCrypto';
import JobListingSelectBox from 'ui-component/JobListingSelectBox/JobListingSelectBox';
import useUserAllUserList from 'hooks/useUserAllUserList';

const jobStatusOptions = [
    { value: 'all', label: 'All' },
    { value: '0', label: 'Blocked' },
    { value: '1', label: 'Open' },
    { value: '2', label: 'Closed' }
];

const AllJobsTable = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [deleted, setDeleted] = useState(false);
    const [selectJobStatus, setselectJobStatus] = useState('');

    const { userCompaniesList, loadinguserCompaniesList } = useUserAllUserList('/job-post-for-company-list');

    const [allCompanyList, setAllCompanyList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');

    const { encrypt } = useCrypto();

    const allJobsFromAPI = useSelector((state) => state.allJobs);
    const { isLoading, allJobs } = allJobsFromAPI;

    const ALL_JOBS_LIST_ARRAY = allJobs?.status === true ? allJobs?.data?.data : [];

    const TOTAL_PAGES = allJobs?.status === true ? allJobs?.data?.last_page : 1;

    const handleFormOpenAction = (id) => {
        const JobID = encrypt(id);
        navigate(`/posted-jobs/edit/${currentPage}/${JobID}`);
        dispatch(fetchSelectedJobByIDFromAPI(user?.user_role === 'admin' ? `/admin/job-details/${id}` : `/job-update/${id}`));
    };

    const handleViewButton = (id) => {
        const FORM_ID = encrypt(id);
        navigate(`/posted-jobs/application/${currentPage}/${FORM_ID}`);
        console.log(id);
        dispatch(fetchSelectedJobByIDFromAPI(`/posted-jobs/application/list/${id}`));
    };

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
            console.log(value);

            navigate('/posted-jobs?page=' + value);
        },
        [page]
    );
    const handleFilterChange = (setter, value) => {
        navigate('/posted-jobs');
        setter(value);
    };

    useEffect(() => {
        if (currentPage) setPage(currentPage);

        dispatch(
            fetchAllJobsFromAPI({
                API_PATH: user?.user_role === 'user' ? '/current-user-job-list' : '/admin/job-list',
                params:
                    selectedCompany || selectJobStatus
                        ? {
                              companyName: selectedCompany === 'all' ? '' : selectedCompany,
                              jobStatus: selectJobStatus === 'all' ? '' : selectJobStatus
                          }
                        : {
                              page: page
                          }
            })
        );

        dispatch(setJobParams({ page: 1 }));
    }, [page, currentPage, deleted, selectJobStatus, selectedCompany]);

    useEffect(() => {
        if (!loadinguserCompaniesList) {
            console.log(userCompaniesList, 'asdsajdklasjdlkaskdalskdlkasjlkdjsalkjdlj');

            const newDataAdminUserList = userCompaniesList?.map((user) => {
                const company = user?.company_name?.split(' ');
                const companyNameNew = company?.map((nameValue) => {
                    const name = nameValue?.toLowerCase();
                    return name[0].toUpperCase() + name.slice(1);
                });

                const userObj = {
                    value: user?.company_name,
                    // label: `${user?.email} (${user?.first_name} ${user?.last_name})`
                    label: `${companyNameNew?.join(' ')}`
                };
                return userObj;
            });
            newDataAdminUserList?.unshift({
                value: 'all',
                label: 'All'
            });
            setAllCompanyList(newDataAdminUserList);
        }
    }, [userCompaniesList]);

    return (
        <>
            <Grid sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}>
                <Grid item xs={12}>
                    <MainCard sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }} title="Jobs Posted" content={false}>
                        <Grid sx={{ paddingX: '1rem', paddingY: '0rem', paddingBottom: '1.5rem' }} spacing={2} container>
                            <Grid item xs={12} sm={12} lg={12}>
                                <Grid container spacing={1}>
                                    {/* No of Applicants */}
                                    {!loadinguserCompaniesList && userCompaniesList ? (
                                        <>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <JobListingSelectBox
                                                    id="companyName"
                                                    name="companyName"
                                                    placeholder="Company Name"
                                                    value={selectedCompany}
                                                    action={(e) => handleFilterChange(setSelectedCompany, e.target.value)}
                                                    allOptions={allCompanyList}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <JobListingSelectBox
                                                    id="selectJobStatus"
                                                    name="selectJobStatus"
                                                    placeholder="Job Status"
                                                    value={selectJobStatus}
                                                    action={(e) => handleFilterChange(setselectJobStatus, e.target.value)}
                                                    allOptions={jobStatusOptions}
                                                />
                                            </Grid>
                                        </>
                                    ) : (
                                        <>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 2 }} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                                <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 2 }} />
                                            </Grid>
                                        </>
                                    )}
                                    {/* No of Applicants */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid sx={{ paddingX: '0rem', paddingY: '0rem' }} container spacing={gridSpacing}>
                            <Grid item xs={12} sm={12} lg={12}>
                                {!isLoading &&
                                    allJobs?.status === true &&
                                    ALL_JOBS_LIST_ARRAY?.length > 0 &&
                                    ALL_JOBS_LIST_ARRAY?.map((jobProfile, index) => (
                                        <JobPostBoxForTable
                                            key={`JobProfileAvailable${index}`}
                                            jobDetails={jobProfile}
                                            action={() => handleFormOpenAction(jobProfile?.id)}
                                            viewaction={handleViewButton}
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

export default AllJobsTable;
