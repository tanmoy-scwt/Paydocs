// material-ui
import { Box, Divider, Grid, Pagination, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SearchBox from './components/SearchBox';
import { useCallback, useEffect, useState } from 'react';
import JobPostBoxTable from './components/JobPostBoxTable';
import { useTheme } from '@mui/system';
import JobListingSelectBox from './components/JobListingSelectBox';
import { useNavigate, useSearchParams } from 'react-router-dom';
import JobPostBoxTableSkeleton from './components/JobPostBoxTableSkeleton';
import SalarySliderDropdown from 'ui-component/salarySliderDropdown/SalarySliderDropdown';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'store';
import { fetchAllJobsFromAPI, fetchSelectedJobByIDFromAPI } from 'store/jobThunks/jobThunks';
import { useSelector } from 'store';
import { setJobParams } from 'store/slices/JobsSlices/allJobsSlice';
import useCrypto from 'hooks/useCrypto';

const noOfApplicantsOptions = [
    { value: '0-0', label: 'ALL' },
    { value: '1-50', label: '1-50 ' },
    { value: '51-100', label: '51-100 ' },
    { value: '101-150', label: '101-150 ' },
    { value: '151-200', label: '151-200 ' }
];

const JobListing = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [noOfApplicants, setNoOfApplicants] = useState('');
    const [searchInputCompany, setSearchInputCompany] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [salary, setSalary] = useState([0, 100000]);
    const [page, setPage] = useState(1);

    const allJobsFromAPI = useSelector((state) => state.allJobs);
    const { isLoading, allJobs } = allJobsFromAPI;
    const ALL_JOBS_LIST_ARRAY = allJobs?.status === true ? allJobs?.data?.jobList?.data : [];

    const TOTAL_PAGES = allJobs?.status === true ? allJobs?.data?.jobList?.last_page : 1;

    const { encrypt } = useCrypto();
    const formatSalary = (val) => `${val}₹`;

    const [CATEGORIES_ARR, setCATEGORY_ARR] = useState([]);
    const CategoryList = allJobs?.data?.categoryList
        ? allJobs?.data?.categoryList?.map((category) => {
              const categoryOBJ = {
                  value: category?.id,
                  label: category?.name
              };
              return categoryOBJ;
          })
        : [];

    useEffect(() => {
        CategoryList.unshift({
            value: 'all',
            label: 'All'
        });
        setCATEGORY_ARR(CategoryList);
    }, [allJobs]);

    const handleFormOpenAction = (id) => {
        const ID = encrypt(id);
        navigate(`/job-listing/form/${currentPage}/${ID}`);
        dispatch(fetchSelectedJobByIDFromAPI(`/job-details/${id}`));
    };
    const handleDetailsOpenAction = (id) => {
        const ID = encrypt(id);
        navigate(`/job-listing/details/${currentPage}/${ID}`);
        dispatch(fetchSelectedJobByIDFromAPI(`/job-details/${id}`));
    };

    const handleFilterChange = (setter, value) => {
        setter(value);
    };
    const handleSearchChange = (value) => {
        setSearchInputCompany(value[0]);
        setSearchLocation(value[1]);
    };

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
            navigate('/job-listing?page=' + value);
        },
        [page]
    );

    useEffect(() => {
        if (currentPage) {
            setPage(currentPage);
        }
        const NoOFApplicant = noOfApplicants.split('-');
        console.log(NoOFApplicant);

        const allParamsFilter = {
            page: page,
            jobTitleOrCompanyName: searchInputCompany,
            location: searchLocation,
            category: category === 'all' ? '' : category,
            salaryLowerRange: salary[0],
            salaryUpperRange: salary[1],
            // noOfApplicants: noOfApplicants === 'all' ? '' : noOfApplicants,
            noOfApplicantsLowerRange: NoOFApplicant[0] == 0 ? '' : NoOFApplicant[0],
            noOfApplicantsUpperRange: NoOFApplicant[1] == 0 ? '' : NoOFApplicant[1]
        };

        dispatch(
            fetchAllJobsFromAPI({
                API_PATH: user?.user_role === 'user' ? '/all-job-list' : '/admin/job-list',
                params: allParamsFilter
            })
        );

        dispatch(
            setJobParams({
                page: 1,
                category: 2
            })
        );
    }, [page, searchInputCompany, searchLocation, category, salary, noOfApplicants, currentPage]);

    return (
        <>
            <Grid container sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}>
                <Grid item xs={12}>
                    <MainCard sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }} title="Job Listing" content={false}>
                        <Grid sx={{ paddingX: '1rem', paddingY: '0rem', paddingBottom: '1.5rem' }} spacing={2} container>
                            <Grid item xs={12} sm={12} lg={6}>
                                <SearchBox handleSearchChange={handleSearchChange} />
                            </Grid>

                            <Grid item xs={12} sm={12} lg={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <JobListingSelectBox
                                            id="category"
                                            name="category"
                                            placeholder="Category"
                                            value={category}
                                            action={(e) => handleFilterChange(setCategory, e.target.value)}
                                            allOptions={CATEGORIES_ARR}
                                        />
                                    </Grid>
                                    {/* Salary Range */}
                                    <Grid item xs={12} sm={12} md={4}>
                                        <SalarySliderDropdown
                                            id="salary-range"
                                            name="salary"
                                            value={salary}
                                            action={(value) => handleFilterChange(setSalary, value)}
                                            placeholder="Salary Range"
                                            getAriaValueText={formatSalary}
                                        />
                                    </Grid>

                                    {/* No of Applicants */}
                                    <Grid item xs={12} sm={12} md={4}>
                                        <JobListingSelectBox
                                            id="noOfApplicants"
                                            name="noOfApplicants"
                                            placeholder="No Of Applicants"
                                            value={noOfApplicants}
                                            action={(e) => handleFilterChange(setNoOfApplicants, e.target.value)}
                                            allOptions={noOfApplicantsOptions}
                                        />
                                    </Grid>
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
                                        <JobPostBoxTable
                                            key={`JobProfileAvailable${index}`}
                                            jobDetails={jobProfile}
                                            action={() => handleFormOpenAction(jobProfile?.id)}
                                            viewAction={() => handleDetailsOpenAction(jobProfile?.id)}
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

export default JobListing;
