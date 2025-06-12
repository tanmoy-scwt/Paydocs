import { Button, Grid, Pagination } from '@mui/material';
import { useTheme } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'store';
import { fetchAllJobsFromAPI, fetchSelectedJobByIDFromAPI, postJobAPIJSON } from 'store/jobThunks/jobThunks';
import { clearJobData } from 'store/slices/JobsSlices/allJobsSlice';
import { resetSelectedJobByID } from 'store/slices/JobsSlices/getJobByID';
import { resetPostJobAPIJSON } from 'store/slices/JobsSlices/postjobSlice';
import { openSnackbar } from 'store/slices/snackbar';
import AddCategoryModal from 'ui-component/AddCategoryModal/AddCategoryModal';
import MainCard from 'ui-component/cards/MainCard';
import TableSkeleton from 'ui-component/cards/Skeleton/TableSkeleton';
import ConfirmDeleteJobModal from 'ui-component/ConfirmDeleteJobModel/ConfirmDeleteJobModel';
import JobCategoryDetailModal from 'ui-component/JobCategoryDetailModal/JobCategoryDetailModal';
import ReusableTable from 'ui-component/ReusableTable/ReusableTable';

const AllJobCategory = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const [categoryModelOpen, setCategoryModelOpen] = useState(false);
    const [isCategoryEdited, setCategoryEdited] = useState(false);
    const [isAddCategoryModelOpen, setAddCategoryModelOpen] = useState(false);
    const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);
    const [deletedId, setDeletedId] = useState(null);
    const { isLoadingPOST } = useSelector((state) => state.PostJobAPI);
    const navigate = useNavigate();

    const handleCategoryChanged = () => {
        setCategoryEdited((prev) => !prev);
    };

    const ALL_JOBS_APPLIED = useSelector((state) => state.allJobs);
    const selectedCategoryDetails = useSelector((state) => state.getJobByID);

    const isCategoryLoading = selectedCategoryDetails?.isLoading;
    const { isLoading, allJobs } = ALL_JOBS_APPLIED;

    const jobCategoryData = selectedCategoryDetails?.selectedJob?.data;

    const columns = [
        { id: 'jobID', label: 'Category ID' },
        { id: 'job_category_name', label: 'Category Name' },
        { id: 'updatedAT', label: 'Updated On' },
        { id: 'jobPublished', label: 'Created On' }
    ];

    const rows =
        allJobs &&
        allJobs?.data?.data?.length > 0 &&
        allJobs?.data?.data?.map((job) => {
            const jobObj = {
                jobID: job?.id,
                job_category_name: job?.job_category_name,
                jobPublished: job?.created_at,
                updatedAT: job?.updated_at
            };
            return jobObj;
        });

    useEffect(() => {
        dispatch(fetchAllJobsFromAPI({ API_PATH: '/admin/all-job-category', params: { page: page } }));
        return () => {
            dispatch(clearJobData());
        };
    }, [isCategoryEdited, currentPage, page]);

    const handleViewButton = (id) => {
        setCategoryModelOpen(true);
        dispatch(fetchSelectedJobByIDFromAPI(`/admin/edit-job-category/${id}`));
    };

    const handleCategoryModelClose = () => {
        setCategoryModelOpen(false);
        dispatch(resetSelectedJobByID());
    };
    const handleNewCategory = () => {
        setAddCategoryModelOpen((prev) => !prev);
    };
    const handleDeleteCategory = async (id) => {
        const categoryBody = {
            category_id: id
        };
        dispatch(postJobAPIJSON({ API_PATH: `/admin/delete-job-category`, body: categoryBody }))
            .unwrap()
            .then((response) => {
                console.log(response, 'response');
                dispatch(
                    openSnackbar({
                        open: true,
                        message: response?.status ? response?.message : '',
                        variant: 'alert',
                        alert: { color: response?.status ? 'success' : 'error' },
                        close: false
                    })
                );
                if (response?.status) {
                    dispatch(resetPostJobAPIJSON());
                    handleCategoryChanged();
                    setDeleteModelOpen(false);
                }
            })
            .catch((error) => {
                console.log(error, 'error');
                dispatch(
                    openSnackbar({
                        open: true,
                        message: error?.message || 'Something went wrong while deleting category.',
                        variant: 'alert',
                        alert: { color: 'error' },
                        close: false
                    })
                );
                setDeleteModelOpen(false);
            });
    };

    const openDeleteModal = (id) => {
        setDeleteModelOpen(true);
        setDeletedId(id);
    };

    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
            navigate(`/job-category?page=${value}`);
        },
        [page]
    );
    const TOTAL_PAGES = allJobs?.data?.last_page;

    return (
        <>
            <Grid sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }}>
                <Grid item xs={12}>
                    <MainCard sx={{ background: theme.palette.mode === 'dark' ? '' : '#fafafa' }} title="All Categories" content={false}>
                        <Grid container alignItems="center" justifyContent="flex-end" sx={{ mb: 2 }}>
                            <Grid item>
                                <Button variant="contained" color="primary" sx={{ mr: '2rem' }} onClick={handleNewCategory}>
                                    Add New Category
                                </Button>
                            </Grid>
                        </Grid>
                        {isLoading ? (
                            <TableSkeleton columnCount={6} />
                        ) : (
                            <ReusableTable
                                columns={columns}
                                rows={rows}
                                formatDateFields={['jobPublished']}
                                onView={handleViewButton}
                                onDelete={openDeleteModal}
                            />
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
            {categoryModelOpen && (
                <JobCategoryDetailModal
                    open={categoryModelOpen}
                    handleClose={handleCategoryModelClose}
                    data={jobCategoryData}
                    isLoading={isCategoryLoading}
                    handleCategoryChanged={handleCategoryChanged}
                />
            )}
            {isAddCategoryModelOpen && (
                <AddCategoryModal
                    open={isAddCategoryModelOpen}
                    handleClose={handleNewCategory}
                    handleCategoryChanged={handleCategoryChanged}
                />
            )}
            {isDeleteModelOpen && (
                <ConfirmDeleteJobModal
                    open={isDeleteModelOpen}
                    onClose={() => setDeleteModelOpen(false)}
                    onConfirm={() => handleDeleteCategory(deletedId)}
                    isDeleting={isLoadingPOST}
                />
            )}
        </>
    );
};

export default AllJobCategory;
