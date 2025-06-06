// material-ui
import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useState } from 'react';
import { useTheme } from '@mui/system';
import useAuth from 'hooks/useAuth';

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const FillOutApplication = ({ action }) => {
    const theme = useTheme();
    const validationSchema = yup.object({
        emailInstant: yup.string().email('Enter a valid email').required('Email is required'),
        jobTitleInstant: yup.string().required('Job title is required'),
        passwordInstant: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
        jobLocation: yup.string().required('Job location is required'),
        numberOfApplicants: yup
            .number()
            .typeError('Must be a number')
            .positive('Must be positive')
            .required('Number of applicants is required'),
        companyName: yup.string().required('Company name is required'),
        phoneNumber: yup
            .string()
            .matches(/^[0-9+\s-]{10,15}$/, 'Enter a valid phone number')
            .required('Phone number is required'),
        description: yup.string().min(10, 'Description should be at least 10 characters').required('Job description is required'),
        workType: yup.string().required('Work type is required'),
        category: yup.string().required('Category is required'),
        salaryRange: yup.string().required('Salary range is required'),
        companyLogo: yup
            .mixed()
            .required('Company logo is required')
            .test('fileType', 'Only JPEG or PNG files are allowed', (value) => {
                return value && ['image/jpeg', 'image/png'].includes(value.type);
            })
    });

    const { user } = useAuth();

    console.log(user);

    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            companyName: user ? user?.company_name : '',
            emailInstant: user ? user?.email : '',
            phoneNumber: user ? user?.mobile : '',
            jobTitleInstant: '',
            description: '',
            attachment: null
        },
        validationSchema,
        onSubmit: () => {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'On Leave - Submit Success',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    });
    const [pdfName, setPdfName] = useState(null);
    const handleAttachment = (event) => {
        const file = event.target.files[0];
        console.log(file);

        if (file) {
            if (
                file.type === 'application/pdf' ||
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                file.type === 'application/msword'
            ) {
                setPdfName(file.name); // Show file name
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
            }

            formik.setFieldValue('companyLogo', file);
        }
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Fill Out Your Application Below" content={false}>
                    <Divider />
                    <form onSubmit={formik.handleSubmit}>
                        <Grid sx={{ paddingX: '1rem', paddingY: '2rem' }} container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="companyName"
                                    name="companyName"
                                    label="Company Name"
                                    value={formik.values.companyName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                    helperText={formik.touched.companyName && formik.errors.companyName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="jobTitleInstant"
                                    name="jobTitleInstant"
                                    label="Job Title"
                                    value={formik.values.jobTitleInstant}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.jobTitleInstant && Boolean(formik.errors.jobTitleInstant)}
                                    helperText={formik.touched.jobTitleInstant && formik.errors.jobTitleInstant}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="emailInstant"
                                    name="emailInstant"
                                    label="Email"
                                    value={formik.values.emailInstant}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.emailInstant && Boolean(formik.errors.emailInstant)}
                                    helperText={formik.touched.emailInstant && formik.errors.emailInstant}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 2
                                            }}
                                        >
                                            <Grid item>
                                                <Typography variant="body2">Upload Your Attachment</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Accepted file type: Doc, PDF
                                                </Typography>
                                            </Grid>

                                            {pdfName ? (
                                                <Typography variant="body2" sx={{ color: 'green' }}>
                                                    {pdfName}
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

                                            {formik.touched.companyLogo && formik.errors.companyLogo && (
                                                <Typography variant="caption" color="error">
                                                    {formik.errors.companyLogo}
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
                                        onClick={action}
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
                                        onClick={action}
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        sx={{
                                            background: theme.palette.secondary.main,
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.dark
                                            }
                                        }}
                                    >
                                        Submit Now
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
