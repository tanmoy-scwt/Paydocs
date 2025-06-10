import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useDispatch } from 'store';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'store/slices/snackbar';
import { useEffect, useState } from 'react';
import { postJobAPIJSON } from 'store/jobThunks/jobThunks';

const AuthForgotPassword = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [myEmail, setMyEmail] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [counter, setCounter] = useState(30);
    const [showOtpField, setShowOtpField] = useState(false);
    const [resendOTPButtonDisabled, setResendOTPButtonDisabled] = useState(false);
    const [showPasswordField, setShowPasswordField] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        ...(showOtpField && {
            otp: Yup.string().required('OTP is required')
        }),
        ...(showPasswordField && {
            newPassword: Yup.string()
                .required('New Password is required')
                .min(6, 'Minimum 6 characters required')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                    'Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character'
                )
        })
    });

    useEffect(() => {
        let timer;
        if (resendDisabled) {
            timer = setInterval(() => {
                setCounter((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setResendDisabled(false);
                        setResendOTPButtonDisabled(false);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendDisabled]);

    return (
        <Formik
            initialValues={{
                email: '',
                otp: '',
                newPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (!showOtpField) {
                        const emailVerification = {
                            email: values.email,
                            send_otp_reason: 'resetPassword'
                        };
                        await dispatch(postJobAPIJSON({ API_PATH: '/send-otp', body: emailVerification }))
                            .unwrap()
                            .then((response) => {
                                console.log(response, 'otp response');
                                if (response?.status) {
                                    setStatus({ success: true });
                                    setSubmitting(false);
                                    setMyEmail(values.email);
                                    setShowOtpField(true);
                                    setResendDisabled(true);
                                    setCounter(30);
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
                    } else if (showOtpField && !showPasswordField) {
                        await dispatch(postJobAPIJSON({ API_PATH: '/verify-otp', body: values }))
                            .unwrap()
                            .then((response) => {
                                if (response?.status) {
                                    setStatus({ success: true });
                                    setSubmitting(false);
                                    setShowPasswordField(true);
                                }
                                dispatch(
                                    openSnackbar({
                                        open: true,
                                        message: response?.message || '',
                                        variant: 'alert',
                                        alert: { color: 'success' },
                                        close: false
                                    })
                                );
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
                    } else {
                        // Final step: Submit new password
                        const passwordReset = {
                            email: myEmail,
                            newpassword: values.newPassword
                        };
                        await dispatch(postJobAPIJSON({ API_PATH: '/reset-password', body: passwordReset }))
                            .unwrap()
                            .then((response) => {
                                if (response?.status) {
                                    setStatus({ success: true });
                                    setSubmitting(false);
                                    navigate('/');
                                }
                                dispatch(
                                    openSnackbar({
                                        open: true,
                                        message: response?.message || '',
                                        variant: 'alert',
                                        alert: { color: 'success' },
                                        close: false
                                    })
                                );
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
                } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    {/* Email Field */}
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <OutlinedInput
                            id="email"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Email Address"
                            disabled={showOtpField}
                        />
                        {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                    </FormControl>

                    {/* OTP Field */}
                    {showOtpField && (
                        <>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.otp && errors.otp)}
                                sx={{ ...theme.typography.customInput, mt: 2 }}
                            >
                                <InputLabel htmlFor="otp">Enter OTP</InputLabel>
                                <OutlinedInput
                                    id="otp"
                                    type="text"
                                    value={values.otp}
                                    name="otp"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Enter OTP"
                                    disabled={showPasswordField}
                                />
                                {touched.otp && errors.otp && <FormHelperText error>{errors.otp}</FormHelperText>}
                            </FormControl>

                            {/* Resend OTP */}
                            {!showPasswordField && (
                                <Box sx={{ mt: 1, textAlign: 'right' }}>
                                    <Button
                                        variant="text"
                                        size="small"
                                        sx={{ textTransform: 'none' }}
                                        disabled={resendOTPButtonDisabled}
                                        onClick={async () => {
                                            const emailVerification = {
                                                email: myEmail,
                                                send_otp_reason: 'emailVerification'
                                            };
                                            setResendOTPButtonDisabled(true);
                                            await dispatch(postJobAPIJSON({ API_PATH: '/send-otp', body: emailVerification }))
                                                .unwrap()
                                                .then((response) => {
                                                    if (response?.status) {
                                                        dispatch(
                                                            openSnackbar({
                                                                open: true,
                                                                message: response?.message,
                                                                variant: 'alert',
                                                                alert: { color: 'success' },
                                                                close: false
                                                            })
                                                        );
                                                        setResendDisabled(true);
                                                        setCounter(30);
                                                    }
                                                })
                                                .catch((error) => {
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
                                        }}
                                    >
                                        {resendOTPButtonDisabled
                                            ? resendDisabled
                                                ? `Resend OTP (${counter}s)`
                                                : 'Sending OTP...'
                                            : 'Resend OTP'}
                                        {/* {resendDisabled ? `Resend OTP (${counter}s)` : 'Resend OTP'} */}
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}

                    {/* New Password Field */}
                    {showPasswordField && (
                        <FormControl
                            fullWidth
                            error={Boolean(touched.newPassword && errors.newPassword)}
                            sx={{ ...theme.typography.customInput, mt: 2 }}
                        >
                            <InputLabel htmlFor="new-password">New Password</InputLabel>
                            <OutlinedInput
                                id="new-password"
                                type="password"
                                value={values.newPassword}
                                name="newPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="New Password"
                            />
                            {touched.newPassword && errors.newPassword && <FormHelperText error>{errors.newPassword}</FormHelperText>}
                        </FormControl>
                    )}

                    {/* Submit Button */}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                {showPasswordField ? 'Reset Password' : showOtpField ? 'Verify OTP' : 'Send Mail'}
                            </Button>
                        </AnimateButton>
                    </Box>

                    {/* Submit Error */}
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                </form>
            )}
        </Formik>
    );
};

export default AuthForgotPassword;
