import { Grid, Pagination } from '@mui/material';
import { useTheme } from '@mui/system';
import useCrypto from 'hooks/useCrypto';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'store';
import { fetchAllJobsFromAPI, fetchSelectedJobByIDFromAPI } from 'store/jobThunks/jobThunks';
import { clearJobData } from 'store/slices/JobsSlices/allJobsSlice';
import MainCard from 'ui-component/cards/MainCard';
import TableSkeleton from 'ui-component/cards/Skeleton/TableSkeleton';
import ReusableTable from 'ui-component/ReusableTable/ReusableTable';

const JobApplications = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const ALL_JOBS_APPLIED = useSelector((state) => state.allJobs);
    const { isLoading, allJobs } = ALL_JOBS_APPLIED;
    const { encrypt } = useCrypto();

    const columns = [
        { id: 'jobID', label: 'Job ID' },
        { id: 'jobTitle', label: 'Job Title' },
        { id: 'companyName', label: 'Company' },
        { id: 'location', label: 'Location' },
        { id: 'email', label: 'Email ID' },
        { id: 'phoneNo', label: 'Phone No' },
        { id: 'appliedDate', label: 'Applied Date' }
    ];

    const rows =
        allJobs &&
        allJobs?.data?.data?.length > 0 &&
        allJobs?.data?.data?.map((job) => {
            const jobObj = {
                jobID: job?.id,
                jobTitle: job?.job_title,
                companyName: job?.company_name,
                location: job?.job_dtls?.location,
                email: job?.job_dtls?.email_address,
                phoneNo: job?.job_dtls?.phone_number,
                appliedDate: job?.created_at
            };
            return jobObj;
        });
    useEffect(() => {
        dispatch(
            fetchAllJobsFromAPI({
                API_PATH: '/current-user-job-application-list',
                params: { page: page }
            })
        );
        return () => {
            dispatch(clearJobData());
        };
    }, [page, currentPage]);

    const handleViewButton = (id) => {
        const FORM_ID = encrypt(id);
        navigate(`/job-applied/${FORM_ID}`);
        console.log(id);
        dispatch(fetchSelectedJobByIDFromAPI(`/current-user-job-application-dtls/${id}`));
    };

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
            navigate(`/job-applied?page=${value}`);
        },
        [page]
    );
    const TOTAL_PAGES = allJobs?.data?.last_page;

    return (
        <Grid sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}>
            <Grid item xs={12}>
                <MainCard sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }} title="Your Job Applications" content={false}>
                    {isLoading ? (
                        <TableSkeleton columnCount={6} />
                    ) : (
                        <ReusableTable columns={columns} rows={rows} formatDateFields={['appliedDate']} onView={handleViewButton} />
                    )}
                    <Grid marginY={'2.5rem'} item xs={12} sm={6}>
                        <Grid container direction="column" spacing={2} alignItems="center">
                            {!isLoading && allJobs?.data?.data?.length > 0 && (
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
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default JobApplications;
