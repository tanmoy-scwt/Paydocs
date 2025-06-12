import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton, TextField, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import JobCategoryDetailSkeleton from 'ui-component/cards/Skeleton/JobCategoryDetailSkeleton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'store';
import { postJobAPIJSON } from 'store/jobThunks/jobThunks';
import { openSnackbar } from 'store/slices/snackbar';
import { resetPostJobAPIJSON } from 'store/slices/JobsSlices/postjobSlice';
import { useSelector } from 'store';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const validationSchema = yup.object({
    job_category_name: yup.string().required('Category name is required')
});

const JobCategoryDetailModal = ({ open, handleClose, data, isLoading, handleCategoryChanged }) => {
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();

    const { isLoadingPOST } = useSelector((state) => state.PostJobAPI);

    const handleEdit = () => setEditMode(true);
    const handleCancel = () => {
        setEditMode(false);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            job_category_name: data?.job_category_name || ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const categoryBody = {
                category_id: data?.id,
                job_category_name: values?.job_category_name
            };
            await dispatch(postJobAPIJSON({ API_PATH: `/admin/edit-job-category`, body: categoryBody }))
                .unwrap()
                .then((response) => {
                    console.log(response, 'response ');
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: response?.message || '',
                            variant: 'alert',
                            alert: { color: 'success' },
                            close: false
                        })
                    );
                    if (response?.status) {
                        dispatch(resetPostJobAPIJSON());
                        handleCategoryChanged();
                        handleClose();
                    }
                })
                .catch((error) => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: error.message || '',
                            variant: 'alert',
                            alert: { color: 'error' },
                            close: false
                        })
                    );
                });
            setEditMode(false);
        }
    });

    if (isLoading) {
        return <JobCategoryDetailSkeleton open={true} handleClose={handleClose} />;
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Job Category Details</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2">Category Name:</Typography>
                        {!editMode && (
                            <IconButton onClick={handleEdit}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>

                    {editMode ? (
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            id="job_category_name"
                            name="job_category_name"
                            value={formik.values.job_category_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.job_category_name && Boolean(formik.errors.job_category_name)}
                            helperText={formik.touched.job_category_name && formik.errors.job_category_name}
                        />
                    ) : (
                        <Typography mt={1}>{data?.job_category_name || 'N/A'}</Typography>
                    )}

                    <Typography variant="subtitle2" mt={3}>
                        Created At:
                    </Typography>
                    <Typography>{data?.created_at ? new Date(data.created_at).toLocaleString() : 'N/A'}</Typography>

                    <Typography variant="subtitle2" mt={2}>
                        Updated At:
                    </Typography>
                    <Typography>{data?.updated_at ? new Date(data.updated_at).toLocaleString() : 'N/A'}</Typography>

                    {editMode && (
                        <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
                            <Button onClick={handleCancel} color="inherit">
                                Cancel
                            </Button>
                            <Button disabled={isLoadingPOST} type="submit" variant="contained" color="primary">
                                {isLoadingPOST ? 'Saving...' : 'Save'}
                            </Button>
                        </Stack>
                    )}
                </form>
            </Box>
        </Modal>
    );
};

export default JobCategoryDetailModal;
