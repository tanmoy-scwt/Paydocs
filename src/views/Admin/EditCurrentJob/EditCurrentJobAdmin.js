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
import useJobCategoryList from 'hooks/useListCategory';
import { useSelector, useDispatch } from 'store';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchAllJobsFromAPI, fetchSelectedJobByIDFromAPI, postJobFormData } from 'store/jobThunks/jobThunks';
import { resetSelectedJobByID } from 'store/slices/JobsSlices/getJobByID';
import EditPageSkeleton from 'ui-component/cards/Skeleton/EditPageSkeleton';
import { openSnackbar } from 'store/slices/snackbar';
import { resetPostJobFormData } from 'store/slices/JobsSlices/postJobFormData';
import useCrypto from 'hooks/useCrypto';
import useAdminAllUserList from 'hooks/useAdminAllUserList';
import adminEditJobValidation from 'views/forms/validations/adminEditJobValidation';
import { workTypesData, jobStatusData } from 'views/forms/FormSelectBoxData';

// ================== External Form Data ====================
const work_types = workTypesData;
const job_Status = jobStatusData;
const validationSchema = adminEditJobValidation;

const EditCurrentJobAdmin = () => {
    const { categories, loadingCategory, categoryError } = useJobCategoryList('/admin/job-category-list');
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { decrypt } = useCrypto();

    const selectedJOBValue = useSelector((state) => state.getJobByID);
    const JOB_POST_DETAILS = selectedJOBValue?.selectedJob;
    const { isLoadingFormData } = useSelector((state) => state.PostJobFormDataAPI);
    const { adminUserList, loadingAdminUserList, adminUserListError } = useAdminAllUserList('/admin/user-name-list');

    const JOB_ID = decrypt(id);
    useEffect(() => {
        if (id) {
            dispatch(fetchSelectedJobByIDFromAPI(`/admin/job-details/${JOB_ID}`));
        } else {
            dispatch(fetchAllJobsFromAPI({ API_PATH: '/admin/job-list' }));
        }
        return () => {
            dispatch(resetSelectedJobByID());
            dispatch(resetPostJobFormData());
        };
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: JOB_POST_DETAILS?.data?.title || '',
            location: JOB_POST_DETAILS?.data?.location || '',
            work_type: JOB_POST_DETAILS?.data?.work_type || '',
            job_category_id: JOB_POST_DETAILS?.data?.job_category_id || '',
            salaryRange: [Math.ceil(JOB_POST_DETAILS?.data?.salary_from), Math.ceil(JOB_POST_DETAILS?.data?.salary_to)] || [0, 100000],
            number_of_applicants: JOB_POST_DETAILS?.data?.number_of_applicants || '',
            company_name: JOB_POST_DETAILS?.data?.company_name || '',
            email_address: JOB_POST_DETAILS?.data?.email_address || '',
            phone_number: JOB_POST_DETAILS?.data?.phone_number || '',
            job_description: JOB_POST_DETAILS?.data?.job_description || '',
            uploadcompanylogo: JOB_POST_DETAILS?.data?.company_logo || null,
            status: JOB_POST_DETAILS?.data?.status + 1 || '',
            user_id: JOB_POST_DETAILS?.data?.user_id || ''
        },

        validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            console.log(values, 'values');

            Object.entries(values).forEach(([key, value]) => {
                if (key === 'salaryRange') {
                    formData.append('salary_from', value[0]);
                    formData.append('salary_to', value[1]);
                } else if (key === 'status') {
                    formData.append(key, value - 1);
                } else {
                    formData.append(key, value);
                }
            });
            await dispatch(postJobFormData({ API_PATH: `/admin/job-update/${JOB_ID}`, formData: formData })).then((response) => {
                console.log(response, 'response from post Job');
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
                    navigate('/job-management');
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
                                <Grid item xs={12} md={12} lg={12}>
                                    <FormControl fullWidth error={formik.touched.user_id && Boolean(formik.errors.user_id)}>
                                        <InputLabel id="user_id_label">User ID</InputLabel>
                                        <Select
                                            labelId="user_id_label"
                                            id="user_id"
                                            name="user_id"
                                            value={formik.values.user_id}
                                            // onChange={(e) => formik.setFieldValue('user_id', Number(e.target.value))}
                                            onChange={(e) => {
                                                const selectedUserId = Number(e.target.value);
                                                const selectedUser = adminUserList.find((user) => user.id === selectedUserId);
                                                formik.setFieldValue('user_id', selectedUserId);
                                                if (selectedUser) {
                                                    formik.setFieldValue('company_name', selectedUser.company_name || '');
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            label="User ID"
                                        >
                                            {!loadingAdminUserList &&
                                                !adminUserListError &&
                                                adminUserList?.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option?.first_name} {option?.last_name} ({option?.email})
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        <FormHelperText>{formik.touched.user_id && formik.errors.user_id}</FormHelperText>
                                    </FormControl>
                                </Grid>
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
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item sx={{ paddingX: '1rem', paddingY: '2rem' }} container spacing={gridSpacing}>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                onClick={() => navigate('/job-management')}
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
                                                {isLoadingFormData ? 'Submitting...' : 'Submit Now'}
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

export default EditCurrentJobAdmin;
