import { Button, Grid, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/system';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { postJobAPIJSON } from 'store/jobThunks/jobThunks';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { useSelector } from 'store';

const ChangePassword = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { isLoadingPOST } = useSelector((state) => state.PostJobAPI);
    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string()
            .required('New password is required')
            .min(6, 'Minimum 6 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                'Must include uppercase, lowercase, number, and special character'
            ),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    });

    return (
        <Formik
            initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                const passwordObj = {
                    currentpass: values.currentPassword,
                    newpassword: values.newPassword
                };
                console.log('Password Change Submitted:', values);
                await dispatch(postJobAPIJSON({ API_PATH: '/change-password', body: passwordObj }))
                    .unwrap()
                    .then((response) => {
                        console.log(response);
                        if (response?.payload?.status) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            setMyEmail(values.email);
                            setShowOtpField(true);
                        }
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: response?.message,
                                variant: 'alert',
                                alert: { color: 'success' },
                                close: false
                            })
                        );
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: error?.message,
                                variant: 'alert',
                                alert: { color: 'error' },
                                close: false
                            })
                        );
                    });
                // Dispatch API call here
            }}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="password"
                                fullWidth
                                label="Current Password"
                                name="currentPassword"
                                value={values.currentPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.currentPassword && Boolean(errors.currentPassword)}
                                helperText={touched.currentPassword && errors.currentPassword}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} />

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="password"
                                fullWidth
                                label="New Password"
                                name="newPassword"
                                value={values.newPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.newPassword && Boolean(errors.newPassword)}
                                helperText={touched.newPassword && errors.newPassword}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="password"
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Stack direction="row">
                                <AnimateButton>
                                    <Button
                                        type="submit"
                                        disableElevation
                                        disabled={isSubmitting}
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            border: `1px solid ${theme.palette.secondary.main}`,
                                            color: theme.palette.secondary.main
                                        }}
                                    >
                                        {isLoadingPOST ? 'Changing...' : 'Change Password'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
};

export default ChangePassword;
