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
import { openSnackbar } from 'store/slices/snackbar';
import useJobCategoryList from 'hooks/useListCategory';
import { useDispatch } from 'store';
import EditPageSkeleton from 'ui-component/cards/Skeleton/EditPageSkeleton';
import useAdminAllUserList from 'hooks/useAdminAllUserList';
import { workTypesData } from 'views/forms/FormSelectBoxData';
import adminPostJobValidation from 'views/forms/validations/adminPostJobValidation';
import { postJobFormData } from 'store/jobThunks/jobThunks';
import { useSelector } from 'store';

// ================== Work Types ====================
const work_types = workTypesData;
const validationSchema = adminPostJobValidation;

const AdminPostJob = () => {
    const { categories, loadingCategory, categoryError } = useJobCategoryList('/admin/job-category-list');
    const { adminUserList, loadingAdminUserList, adminUserListError } = useAdminAllUserList('/admin/user-name-list');
    const { isLoadingFormData } = useSelector((state) => state.PostJobFormDataAPI);
    const theme = useTheme();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            user_id: '',
            title: '',
            location: '',
            work_type: '',
            job_category_id: '',
            salaryRange: [],
            number_of_applicants: '',
            company_name: '',
            email_address: '',
            phone_number: '',
            job_description: '',
            uploadcompanylogo: null
        },

        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            const formData = new FormData();
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
            await dispatch(postJobFormData({ API_PATH: `/admin/add-new-job`, formData: formData })).then((response) => {
                console.log(response, 'response from post Job');
                dispatch(
                    openSnackbar({
                        open: true,
                        message: response?.payload?.status ? 'Job Posted Successfully' : '',
                        variant: 'alert',
                        alert: response?.payload?.status ? { color: 'success' } : { color: 'error' },
                        close: false
                    })
                );
            });
            formik.resetForm();
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
                {loadingCategory ? (
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
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            label="User ID"
                                        >
                                            {!loadingAdminUserList &&
                                                !adminUserListError &&
                                                adminUserList?.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option?.first_name} {option?.email}
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
                                        <FormControl
                                            fullWidth
                                            error={formik.touched.uploadcompanylogo && Boolean(formik.errors.uploadcompanylogo)}
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
                                                                ? URL.createObjectURL(formik.values.uploadcompanylogo)
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
                                                            type="button"
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
                                            </Grid>

                                            {formik.touched.uploadcompanylogo && formik.errors.uploadcompanylogo && (
                                                <FormHelperText>{formik.errors.uploadcompanylogo}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
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
                                            {isLoadingFormData ? 'Publishing...' : 'Publish Job'}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    </MainCard>
                )}
            </Grid>
        </Grid>
    );
};

export default AdminPostJob;
