// material-ui
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';
import { useFormik } from 'formik';
import * as yup from 'yup';
// assets
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useTheme } from '@mui/system';
import useAuth from 'hooks/useAuth';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';
import { postJobFormData } from 'store/jobThunks/jobThunks';
import { resetPostJobFormData } from 'store/slices/JobsSlices/postJobFormData';
import { useSelector } from 'store';

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const UserProfile = () => {
    const theme = useTheme();
    const { user, updateUserDetails } = useAuth();

    const { isLoadingFormData } = useSelector((state) => state.PostJobFormDataAPI);

    const validationSchema = yup.object({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        companyName: yup.string().required('Company name is required'),
        siteInformation: yup.string().required('Site Information is Required'),
        phoneNumber: yup
            .string()
            .matches(/^\d{10}$/, 'Enter a valid 10-digit phone number')
            .required('Phone number is required')
    });

    console.log(user);

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            firstName: user?.first_name || '',
            lastName: user?.last_name || '',
            companyName: user?.company_name || '',
            phoneNumber: user?.mobile || '',
            companyLogo: user?.profile_pic || '',
            siteInformation: user?.website || ''
        },
        validationSchema,

        onSubmit: async (value) => {
            const formData = new FormData();
            const updateProfileFeild = ['first_name', 'last_name', 'company_name', 'mobile', 'uploadprofilepic', 'website'];
            Object.entries(value).forEach(([key, value], index) => {
                console.log(key);
                formData.append(updateProfileFeild[index], value);
            });
            await dispatch(postJobFormData({ API_PATH: '/update-profile', formData }))
                .unwrap()
                .then((response) => {
                    if (response?.status) {
                        localStorage.setItem('userDetails', JSON.stringify(response?.data));
                        const success = updateUserDetails(response?.data);
                        if (success) {
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: response?.message || '',
                                    variant: 'alert',
                                    alert: { color: 'success' },
                                    close: false
                                })
                            );
                        } else {
                            alert('Failed to update profile');
                        }
                        dispatch(resetPostJobFormData());
                    }
                })
                .catch((error) => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: error?.message || '',
                            variant: 'alert',
                            alert: { color: 'error' },
                            close: false
                        })
                    );
                });
        }
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('companyLogo', file);
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar
                                    alt="User Profile"
                                    src={
                                        formik.values.companyLogo instanceof File
                                            ? URL.createObjectURL(formik.values.companyLogo)
                                            : user?.profile_pic
                                            ? `${process.env.REACT_APP_API_IMAGE_URL}/${user.profile_pic}`
                                            : '' // Fallback empty string or default avatar
                                    }
                                    sx={{ height: 80, width: 80 }}
                                    onLoad={() => {
                                        // Revoke the object URL after the image is loaded to free memory
                                        if (formik.values.companyLogo instanceof File) {
                                            URL.revokeObjectURL(URL.createObjectURL(formik.values.companyLogo));
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item sm zeroMinWidth>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: '0.8rem',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                                                <ErrorTwoToneIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                                                Image size Limit should be 125kb Max.
                                            </Typography>
                                            <Button
                                                component="label"
                                                startIcon={<EditTwoToneIcon sx={{ color: theme.palette.secondary.main }} />}
                                                sx={{
                                                    padding: 0,
                                                    minWidth: 'auto',
                                                    width: 'max-content',
                                                    justifyContent: 'flex-start',
                                                    textTransform: 'none'
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 400,
                                                        fontSize: '13px',
                                                        lineHeight: '20px',
                                                        letterSpacing: '0%',
                                                        color: theme.palette.secondary.main,
                                                        borderBottom: `1px solid ${theme.palette.secondary.main}`,
                                                        display: 'inline-block'
                                                    }}
                                                >
                                                    Change Profile Picture
                                                </Typography>
                                                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Email Address" disabled value={user?.email || ''} />
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
                            id="siteInformation"
                            name="siteInformation"
                            label="Site Information"
                            value={formik.values.siteInformation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.siteInformation && Boolean(formik.errors.siteInformation)}
                            helperText={formik.touched.siteInformation && formik.errors.siteInformation}
                        />
                    </Grid>
                    <Grid item>
                        <AnimateButton>
                            <Button
                                type="submit"
                                sx={{
                                    border: `1px solid ${theme.palette.secondary.main}`,
                                    color: theme.palette.secondary.main
                                }}
                                variant="outlined"
                                size="large"
                                disabled={isLoadingFormData}
                            >
                                {isLoadingFormData ? 'Updating...' : 'Update Profile'}
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default UserProfile;
