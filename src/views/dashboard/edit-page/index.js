// material-ui
import {
    Avatar,
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { useTheme } from '@mui/system';
// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import SalarySliderDropdown from 'ui-component/salarySliderDropdown/SalarySliderDropdown';
// import { openSnackbar } from 'store/slices/snackbar';
import useJobCategoryList from 'hooks/useListCategory';
import { useSelector } from 'store';
import { useDispatch } from 'store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSelectedJobByIDFromAPI, postJobFormData } from 'store/jobThunks/jobThunks';
import useAuth from 'hooks/useAuth';
import { resetSelectedJobByID } from 'store/slices/JobsSlices/getJobByID';
import EditPageSkeleton from 'ui-component/cards/Skeleton/EditPageSkeleton';
import { openSnackbar } from 'store/slices/snackbar';
import { resetPostJobFormData } from 'store/slices/JobsSlices/postJobFormData';
import userPostJobValidation from 'validation/userPostJobValidation';
import { jobStatusData, workTypesData } from 'views/forms/FormSelectBoxData';
import useCrypto from 'hooks/useCrypto';

// ================== Work Types ====================
const work_types = workTypesData;
const job_Status = jobStatusData;
const validationSchema = userPostJobValidation;

const EditJobForm = () => {
    const { categories, loadingCategory, categoryError } = useJobCategoryList('/job-category-list');
    const theme = useTheme();
    const { user } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const selectedJOBValue = useSelector((state) => state.getJobByID);
    const JOB_POST_DETAILS = selectedJOBValue?.selectedJob;
    const { isLoadingFormData } = useSelector((state) => state.PostJobFormDataAPI);
    const { decrypt } = useCrypto();
    const JOBIDD = decrypt(id);
    useEffect(() => {
        if (id) {
            dispatch(fetchSelectedJobByIDFromAPI(`/job-update/${JOBIDD}`));
        }
        return () => {
            dispatch(resetSelectedJobByID());
        };
    }, [id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: JOB_POST_DETAILS?.data?.title || '',
            location: JOB_POST_DETAILS?.data?.location || '',
            work_type: JOB_POST_DETAILS?.data?.work_type || '',
            job_category_id: JOB_POST_DETAILS?.data?.job_category_id || '',
            salaryRange: [Math.ceil(JOB_POST_DETAILS?.data?.salary_from), Math.ceil(JOB_POST_DETAILS?.data?.salary_to)] || [0, 100000],
            // salaryRange: [],
            number_of_applicants: JOB_POST_DETAILS?.data?.number_of_applicants || '',
            company_name: JOB_POST_DETAILS?.data?.company_name || '',
            email_address: JOB_POST_DETAILS?.data?.email_address || '',
            phone_number: JOB_POST_DETAILS?.data?.phone_number || '',
            job_description: JOB_POST_DETAILS?.data?.job_description || '',
            uploadcompanylogo: JOB_POST_DETAILS?.data?.company_logo || null
        },

        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'salaryRange') {
                    formData.append('salary_from', value[0]);
                    formData.append('salary_to', value[1]);
                } else {
                    formData.append(key, value);
                }
            });
            console.log(JOBIDD, 'asdsad');

            await dispatch(postJobFormData({ API_PATH: `/job-update/${JOBIDD}`, formData: formData })).then((response) => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: response?.payload?.status ? 'Job Posted Successfully' : '',
                        variant: 'alert',
                        alert: response?.payload?.status ? { color: 'success' } : { color: 'error' },
                        close: false
                    })
                );
                if (response?.payload?.status) {
                    navigate('/posted-jobs');
                    dispatch(resetPostJobFormData());
                }
            });
        }
    });

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('uploadcompanylogo', file);
    };

    const handleSalaryChange = (newValue) => {
        formik.setFieldValue('salaryRange', newValue);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                {!JOB_POST_DETAILS ? (
                    <EditPageSkeleton />
                ) : (
                    <MainCard title="Share Your Hiring Needs" content={false}>
                        <Divider />
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={gridSpacing} sx={{ paddingX: '1rem', paddingY: '2rem' }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="title"
                                        name="title"
                                        label="Job Title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="location"
                                        name="location"
                                        label="Job Location"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.location && Boolean(formik.errors.location)}
                                        helperText={formik.touched.location && formik.errors.location}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <FormControl fullWidth error={formik.touched.work_type && Boolean(formik.errors.work_type)}>
                                        <InputLabel id="work_type-label">Work Type</InputLabel>
                                        <Select
                                            labelId="work_type-label"
                                            id="work_type"
                                            name="work_type"
                                            value={formik.values.work_type}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            label="Work Type"
                                        >
                                            {work_types.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>{formik.touched.work_type && formik.errors.work_type}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <FormControl fullWidth error={formik.touched.job_category_id && Boolean(formik.errors.job_category_id)}>
                                        <InputLabel id="job_category_id-label">Category</InputLabel>
                                        <Select
                                            labelId="job_category_id-label"
                                            id="job_category_id"
                                            name="job_category_id"
                                            value={formik.values.job_category_id}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            label="Category"
                                        >
                                            {!loadingCategory &&
                                                !categoryError &&
                                                categories.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        <FormHelperText>{formik.touched.job_category_id && formik.errors.job_category_id}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <SalarySliderDropdown
                                        id="salary-range"
                                        name="salaryRange"
                                        min={0}
                                        max={100000}
                                        value={formik.values.salaryRange}
                                        setter={formik.setFieldValue}
                                        action={handleSalaryChange}
                                        placeholder="Salary Range"
                                        getAriaValueText={(val) => `${val}₹`}
                                        isError={formik.touched.salaryRange && Boolean(formik.errors.salaryRange)}
                                        helperText={formik.touched.salaryRange && formik.errors.salaryRange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <TextField
                                        fullWidth
                                        id="number_of_applicants"
                                        name="number_of_applicants"
                                        label="Number Of Applicants"
                                        value={formik.values.number_of_applicants}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.number_of_applicants && Boolean(formik.errors.number_of_applicants)}
                                        helperText={formik.touched.number_of_applicants && formik.errors.number_of_applicants}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} lg={4}>
                                    <TextField
                                        fullWidth
                                        id="company_name"
                                        name="company_name"
                                        label="Company Name"
                                        value={formik.values.company_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                                        helperText={formik.touched.company_name && formik.errors.company_name}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} lg={4}>
                                    <TextField
                                        fullWidth
                                        id="email_address"
                                        name="email_address"
                                        label="Email"
                                        value={formik.values.email_address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.email_address && Boolean(formik.errors.email_address)}
                                        helperText={formik.touched.email_address && formik.errors.email_address}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={4}>
                                    <TextField
                                        fullWidth
                                        id="phone_number"
                                        name="phone_number"
                                        label="Phone Number"
                                        value={formik.values.phone_number}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                        helperText={formik.touched.phone_number && formik.errors.phone_number}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        id="job_description"
                                        name="job_description"
                                        label="Job Description"
                                        value={formik.values.job_description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.job_description && Boolean(formik.errors.job_description)}
                                        helperText={formik.touched.job_description && formik.errors.job_description}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            py: 4,
                                            px: 2,
                                            bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.level2 : '#f5f5f5',
                                            borderRadius: 2
                                        }}
                                    >
                                        <Grid container sx={{ display: 'flex', gap: '1rem' }} alignItems="center">
                                            <Grid item>
                                                <Typography variant="body2">Upload Your Company Logo</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Accepted file type: JPEG, PNG
                                                </Typography>
                                            </Grid>
                                            {formik.values.uploadcompanylogo && (
                                                <Avatar
                                                    src={
                                                        formik.values.uploadcompanylogo !== null
                                                            ? typeof formik.values.uploadcompanylogo === 'string'
                                                                ? `${process.env.REACT_APP_API_IMAGE_URL}/${formik.values.uploadcompanylogo}`
                                                                : URL.createObjectURL(formik.values.uploadcompanylogo)
                                                            : ''
                                                    }
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
                                                            color: '#2B2D3B',
                                                            '&:hover': { backgroundColor: '#E2E9F9' }
                                                        }}
                                                    >
                                                        Choose A File
                                                    </Button>
                                                </AnimateButton>
                                            </label>
                                            {formik.touched.uploadcompanylogo && formik.errors.uploadcompanylogo && (
                                                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                                                    {formik.errors.uploadcompanylogo}
                                                </Typography>
                                            )}
                                        </Grid>
                                    </Box>
                                    {user?.user_role === 'admin' && (
                                        <FormControl fullWidth error={formik.touched.work_type && Boolean(formik.errors.work_type)}>
                                            <InputLabel id="work_type-label">Job Status</InputLabel>
                                            <Select
                                                labelId="work_type-label"
                                                id="status"
                                                name="status"
                                                value={formik.values.status}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                label="Job Status"
                                            >
                                                {job_Status.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>{formik.touched.work_type && formik.errors.work_type}</FormHelperText>
                                        </FormControl>
                                    )}
                                </Grid>
                                <Grid item sx={{ paddingX: '1rem', paddingY: '2rem' }} container spacing={gridSpacing}>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                onClick={() => navigate('/posted-jobs')}
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
                                            >
                                                {isLoadingFormData ? 'Submiting...' : 'Submit Now'}
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </MainCard>
                )}
            </Grid>
        </Grid>
    );
};

export default EditJobForm;
