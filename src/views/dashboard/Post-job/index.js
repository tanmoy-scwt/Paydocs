// material-ui
import { Avatar, Box, Button, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useState } from 'react';
import { useTheme } from '@mui/system';

const workTypes = [
    {
        value: 'fullTime',
        label: 'Full Time'
    },
    {
        value: 'partTime',
        label: 'Part Time'
    },
    {
        value: 'onSite',
        label: 'On Site'
    },
    {
        value: 'online',
        label: 'Online'
    }
];
const categories = [
    {
        value: 'other',
        label: 'Other'
    },
    {
        value: 'other1',
        label: 'Other1'
    },
    {
        value: 'other2',
        label: 'Other2'
    },
    {
        value: 'other3',
        label: 'Other3'
    }
];

const salaryRanges = [
    {
        value: 'salaryRange1',
        label: '₹25,000 - ₹45,000 a month'
    },
    {
        value: 'salaryRange2',
        label: '₹45,000 - ₹60,000 a month'
    },
    {
        value: 'salaryRange3',
        label: '₹60,000 - ₹80,000 a month'
    },
    {
        value: 'salaryRange4',
        label: '₹80,000 - ₹100,000 a month'
    }
];

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const PostAJob = () => {
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
        jobDescription: yup.string().min(10, 'Description should be at least 10 characters').required('Job description is required'),
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

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            emailInstant: '',
            jobTitleInstant: '',
            passwordInstant: '',
            jobLocation: '',
            numberOfApplicants: '',
            companyName: '',
            phoneNumber: '',
            jobDescription: '',
            workType: '',
            category: '',
            salaryRange: '',
            companyLogo: null
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

    const [preview, setPreview] = useState(null);
    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('companyLogo', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Share Your Hiring Needs" content={false}>
                    <Divider />
                    <form onSubmit={formik.handleSubmit}>
                        <Grid sx={{ paddingX: '1rem', paddingY: '2rem' }} container spacing={gridSpacing}>
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
                                    id="jobLocation"
                                    name="jobLocation"
                                    label="Job Location"
                                    value={formik.values.jobLocation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.jobLocation && Boolean(formik.errors.jobLocation)}
                                    helperText={formik.touched.jobLocation && formik.errors.jobLocation}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField
                                    select
                                    fullWidth
                                    id="workType"
                                    name="workType"
                                    label="Work Type"
                                    value={formik.values.workType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.workType && Boolean(formik.errors.workType)}
                                    helperText={formik.touched.workType && formik.errors.workType}
                                >
                                    {workTypes.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField
                                    select
                                    fullWidth
                                    id="category"
                                    name="category"
                                    label="Category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.category && Boolean(formik.errors.category)}
                                    helperText={formik.touched.category && formik.errors.category}
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <TextField
                                    select
                                    fullWidth
                                    id="salaryRange"
                                    name="salaryRange"
                                    label="salaryRange"
                                    value={formik.values.salaryRange}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.salaryRange && Boolean(formik.errors.salaryRange)}
                                    helperText={formik.touched.salaryRange && formik.errors.salaryRange}
                                >
                                    {salaryRanges.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} lg={3}>
                                <TextField
                                    fullWidth
                                    id="numberOfApplicants"
                                    name="numberOfApplicants"
                                    label="Number Of Applicants"
                                    value={formik.values.numberOfApplicants}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.numberOfApplicants && Boolean(formik.errors.numberOfApplicants)}
                                    helperText={formik.touched.numberOfApplicants && formik.errors.numberOfApplicants}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
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
                            <Grid item xs={12} sm={6} lg={4}>
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
                            <Grid item xs={12} sm={6} lg={4}>
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
                                    id="jobDescription"
                                    name="jobDescription"
                                    label="Job Description"
                                    value={formik.values.jobDescription}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows={4}
                                    error={formik.touched.jobDescription && Boolean(formik.errors.jobDescription)}
                                    helperText={formik.touched.jobDescription && formik.errors.jobDescription}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        marginTop: '1rem',
                                        paddingX: 2.25,
                                        // bgcolor: '#f5f5f5',
                                        // bgcolor: '#f5f5f5',
                                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.level2 : '#f5f5f5',
                                        borderRadius: 2
                                    }}
                                >
                                    <Grid container spacing={2} alignItems="center" gap={'1rem'}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                bgcolor: theme.palette.mode === 'dark' ? theme.palette.darkPaper : '#f5f5f5',
                                                borderRadius: 2,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 2
                                            }}
                                        >
                                            <Grid item>
                                                <Typography variant="body2">Upload Your Company Logo</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Accepted file type: JPEG, PNG
                                                </Typography>
                                            </Grid>

                                            {preview && (
                                                <Avatar
                                                    src={preview}
                                                    alt="Company Logo"
                                                    sx={{ width: 60, height: 60, border: '1px solid #ccc' }}
                                                />
                                            )}

                                            <input
                                                accept="image/png, image/jpeg"
                                                id="company-logo-upload"
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <label htmlFor="company-logo-upload">
                                                <AnimateButton>
                                                    <Button
                                                        variant="contained"
                                                        component="span"
                                                        size="large"
                                                        sx={{
                                                            backgroundColor: '#E2E9F8',
                                                            // backgroundColor:
                                                            // theme.palette.mode === 'dark' ? theme.palette.darkPaper : '#E2E9F8',
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
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    paddingX: 2.25,

                                    borderRadius: 2
                                }}
                            >
                                <AnimateButton>
                                    <Button
                                        type="submit"
                                        size="large"
                                        variant="contained"
                                        sx={{
                                            mt: 2,
                                            background: theme.palette.secondary.main,
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.dark
                                            }
                                        }}
                                    >
                                        Publish Job
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </Grid>
                    </form>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default PostAJob;
