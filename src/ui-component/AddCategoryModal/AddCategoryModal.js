import React from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

const AddCategoryModal = ({ open, handleClose, handleCategoryChanged }) => {
    const dispatch = useDispatch();
    const { isLoadingPOST } = useSelector((state) => state.PostJobAPI);
    const formik = useFormik({
        initialValues: {
            job_category_name: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            // handleClose();
            await dispatch(postJobAPIJSON({ API_PATH: `/admin/add-job-category`, body: values })).then((response) => {
                console.log(response, 'response ');
                dispatch(
                    openSnackbar({
                        open: true,
                        message: response?.payload?.status ? response?.payload?.message : '',
                        variant: 'alert',
                        alert: response?.payload?.status ? { color: 'success' } : { color: 'error' },
                        close: false
                    })
                );
                if (response?.payload?.status) {
                    console.log('my name is khan');

                    dispatch(resetPostJobAPIJSON());
                    handleCategoryChanged();
                    handleClose();
                }
            });
            formik.resetForm();
        }
    });

    return (
        <Modal open={Boolean(open)} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">Add Job Category</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="job_category_name"
                        name="job_category_name"
                        label="Category Name"
                        value={formik.values.job_category_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.job_category_name && Boolean(formik.errors.job_category_name)}
                        helperText={formik.touched.job_category_name && formik.errors.job_category_name}
                        margin="normal"
                    />

                    <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
                        <Button type="button" onClick={handleClose} color="inherit">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {isLoadingPOST ? 'Creating...' : 'Create'}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default AddCategoryModal;
