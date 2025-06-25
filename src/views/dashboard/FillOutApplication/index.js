// material-ui
import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import FillOutApplicationSkeleton from 'ui-component/cards/Skeleton/FillOutApplicationSkeleton';
import { fetchSelectedJobByIDFromAPI, postJobFormData } from 'store/jobThunks/jobThunks';
import useCrypto from 'hooks/useCrypto';
import { openSnackbar } from 'store/slices/snackbar';
import { resetPostJobFormData } from 'store/slices/JobsSlices/postJobFormData';
import { resetSelectedJobByID } from 'store/slices/JobsSlices/getJobByID';
import { useDispatch } from 'store';

const FillOutApplication = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id, page } = useParams();
    const { decrypt } = useCrypto();
    const PostJobFormDataAPI = useSelector((state) => state.PostJobFormDataAPI);
    const { isLoadingFormData } = PostJobFormDataAPI;

    const validationSchema = yup.object({
        email: yup.string().email('Enter a valid email').required('Email is required'),
        f_name: yup.string().required('First Name is required'),
        l_name: yup.string().required('Last Name is required'),
        company_name: yup.string().required('Company name is required'),
        phone: yup
            .string()
            .matches(/^[0-9+\s-]{10,15}$/, 'Enter a valid phone number')
            .required('Phone number is required'),
        description: yup.string().min(10, 'Description should be at least 10 characters').required('Description is required')
    });

    const jobDetails = useSelector((state) => state.getJobByID);
    const { isLoading, selectedJob } = jobDetails;
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            company_name: selectedJob?.data?.company_name || '',
            email: '',
            phone: '',
            f_name: '',
            l_name: '',
            description: '',
            supported_doc: null
        },
        validationSchema,
        onSubmit: async (value) => {
            const formData = new FormData();
            const JOB_ID = decrypt(id);
            Object.entries(value).forEach(([key, val]) => {
                formData.append(key, val);
            });
            formData.append('job_id', JOB_ID);
            await dispatch(postJobFormData({ API_PATH: '/job-apply', formData })).then((response) => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: response?.payload?.message || null,
                        variant: 'alert',
                        alert: {
                            color: response?.payload?.message ? 'success' : 'error'
                        },
                        close: false
                    })
                );
                if (response?.payload?.status) {
                    navigate('/job-applied');
                    formik.resetForm();
                }
            });
        }
    });

    const [fileName, setFileName] = useState(null);

    const handleAttachment = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (
                file.type === 'application/pdf' ||
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                file.type === 'application/msword'
            ) {
                setFileName(file.name); // Show file name
                formik.setFieldValue('supported_doc', file);
            } else {
                // Optionally handle invalid type
                formik.setFieldValue('supported_doc', null);
                setFileName(null);
            }
        }
    };

    useEffect(() => {
        const ID = decrypt(id);
        dispatch(fetchSelectedJobByIDFromAPI(`/job-details/${ID}`));

        return () => {
            dispatch(resetPostJobFormData());
            dispatch(resetSelectedJobByID());
        };
    }, [id]);

    if (isLoading) {
        return <FillOutApplicationSkeleton />;
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Fill Out Your Application Below" content={false}>
                    <Divider />
                    <form onSubmit={formik.handleSubmit}>
                        <Grid sx={{ paddingX: '1rem', paddingY: '2rem' }} container spacing={gridSpacing}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    id="company_name"
                                    name="company_name"
                                    label="Company Name"
                                    disabled
                                    value={formik.values.company_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                                    helperText={formik.touched.company_name && formik.errors.company_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="f_name"
                                    name="f_name"
                                    label="First Name"
                                    value={formik.values.f_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.f_name && Boolean(formik.errors.f_name)}
                                    helperText={formik.touched.f_name && formik.errors.f_name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="l_name"
                                    name="l_name"
                                    label="Last Name"
                                    value={formik.values.l_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.l_name && Boolean(formik.errors.l_name)}
                                    helperText={formik.touched.l_name && formik.errors.l_name}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    label="Phone Number"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows={4}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        marginTop: '1rem',
                                        paddingX: 2.25,
                                        bgcolor: theme.palette.mode === 'dark' ? '' : '#f5f5f5',
                                        borderRadius: 2
                                    }}
                                >
                                    <Grid container spacing={2} alignItems="center" gap={'1rem'}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                bgcolor: theme.palette.mode === 'dark' ? '' : '#f5f5f5',
                                                borderRadius: 2,
                                                display: 'flex',
                                                flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' },
                                                alignItems: { xs: 'flex-start', md: 'center', lg: 'center' },
                                                gap: 2
                                            }}
                                        >
                                            <Grid item>
                                                <Typography variant="body2">Upload Your Attachment</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Accepted file type: PDF, DOC, DOCX
                                                </Typography>
                                            </Grid>

                                            {fileName ? (
                                                <Typography variant="body2" sx={{ color: 'green' }}>
                                                    {fileName}
                                                </Typography>
                                            ) : null}

                                            <input
                                                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                id="form-attachment"
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={handleAttachment}
                                                onBlur={formik.handleBlur}
                                            />

                                            <label htmlFor="form-attachment">
                                                <AnimateButton>
                                                    <Button
                                                        type="button"
                                                        variant="contained"
                                                        component="span"
                                                        size="large"
                                                        sx={{
                                                            backgroundColor: '#E2E9F8',
                                                            color: '#2B2D3B',
                                                            '&:hover': {
                                                                backgroundColor: '#E2E9F9'
                                                            }
                                                        }}
                                                    >
                                                        Choose A File
                                                    </Button>
                                                </AnimateButton>
                                            </label>

                                            {formik.touched.supported_doc && formik.errors.supported_doc && (
                                                <Typography variant="caption" color="error">
                                                    {formik.errors.supported_doc}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ paddingX: '1rem', paddingY: '2rem' }} container spacing={gridSpacing}>
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        onClick={() => navigate(`/job-listing?page=${page}`)}
                                        type="button"
                                        sx={{
                                            border: `1px solid ${theme.palette.secondary.main}`,
                                            color: theme.palette.secondary.main
                                        }}
                                        variant="outlined"
                                        size="large"
                                    >
                                        Back
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        sx={{
                                            background: theme.palette.secondary.main,
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.dark
                                            }
                                        }}
                                        disabled={isLoadingFormData}
                                    >
                                        {isLoadingFormData ? 'Submiting...' : 'Submit Now'}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default FillOutApplication;
