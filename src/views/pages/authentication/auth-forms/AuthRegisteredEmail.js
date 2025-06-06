import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useDispatch } from 'store';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'store/slices/snackbar';
import { useEffect, useState } from 'react';
import { postJobAPIJSON } from 'store/jobThunks/jobThunks';

const AuthRegisteredEmail = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [myEmail, setMyEmail] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [counter, setCounter] = useState(60);

    const [showOtpField, setShowOtpField] = useState(false);
    useEffect(() => {
        let timer;
        if (resendDisabled) {
            timer = setInterval(() => {
                setCounter((prevCounter) => {
                    if (prevCounter <= 1) {
                        clearInterval(timer);
                        setResendDisabled(false);
                        return 30;
                    }
                    return prevCounter - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [resendDisabled]);

    return (
        <Formik
            initialValues={{
                email: '',
                otp: ''
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                otp: Yup.string().when('showOtpField', {
                    is: true,
                    then: Yup.string().required('OTP is required')
                })
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (!showOtpField) {
                        const emailVerification = {
                            email: values.email,
                            send_otp_reason: 'emailVerification' //"resetPassword" or "emailVerification"
                        };
                        await dispatch(postJobAPIJSON({ API_PATH: '/send-otp', body: emailVerification })).then((response) => {
                            console.log(response);
                            if (response?.payload?.status) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                setMyEmail(values.email);
                                dispatch(
                                    openSnackbar({
                                        open: true,
                                        message: 'Check mail for reset password OTP',
                                        variant: 'alert',
                                        alert: { color: 'success' },
                                        close: false
                                    })
                                );
                                setShowOtpField(true);
                            }
                        });
                    } else {
                        // Step 2: Submit OTP (implement your OTP verify logic here)
                        console.log('Entered OTP:', values);
                        await dispatch(postJobAPIJSON({ API_PATH: '/verify-otp', body: values })).then((response) => {
                            console.log(response);
                            if (response?.payload?.status) {
                                setStatus({ success: true });
                                setSubmitting(false);
                                dispatch(
                                    openSnackbar({
                                        open: true,
                                        message: 'Your OTP has been successfully verified!',
                                        variant: 'alert',
                                        alert: { color: 'success' },
                                        close: false
                                    })
                                );
                                navigate(`/register?email=${values.email}`);
                                setShowOtpField(true);
                            }
                        });
                        // Navigate or call verify API
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
                        <InputLabel htmlFor="outlined-adornment-email-forgot">Email Address</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-forgot"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Email Address"
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {/* Conditional OTP Field */}
                    {showOtpField && (
                        <>
                            <FormControl
                                fullWidth
                                error={Boolean(touched.otp && errors.otp)}
                                sx={{ ...theme.typography.customInput, mt: 2 }}
                            >
                                <InputLabel htmlFor="outlined-adornment-otp">Enter OTP</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-otp"
                                    type="text"
                                    value={values.otp}
                                    name="otp"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="Enter OTP"
                                />
                                {touched.otp && errors.otp && (
                                    <FormHelperText error id="standard-weight-helper-text-otp">
                                        {errors.otp}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {/* Didn't get OTP link */}
                            <Box sx={{ mt: 1, textAlign: 'right' }}>
                                <Button
                                    variant="text"
                                    size="small"
                                    sx={{ textTransform: 'none' }}
                                    onClick={async () => {
                                        const emailVerification = {
                                            email: myEmail,
                                            send_otp_reason: 'emailVerification'
                                        };
                                        await dispatch(postJobAPIJSON({ API_PATH: '/send-otp', body: emailVerification })).then(
                                            (response) => {
                                                if (response?.payload?.status) {
                                                    dispatch(
                                                        openSnackbar({
                                                            open: true,
                                                            message: 'Check mail for reset password OTP',
                                                            variant: 'alert',
                                                            alert: { color: 'success' },
                                                            close: false
                                                        })
                                                    );
                                                    setShowOtpField(true);
                                                    setResendDisabled(true);
                                                    setCounter(30); // start counter from 30
                                                }
                                            }
                                        );
                                    }}
                                    disabled={resendDisabled}
                                >
                                    {resendDisabled ? `Resend OTP (${counter}s)` : 'Resend OTP'}
                                </Button>
                            </Box>
                        </>
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
                                {showOtpField ? 'Verify OTP' : 'Send Mail'}
                            </Button>
                        </AnimateButton>
                    </Box>

                    {/* Server Error */}
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

export default AuthRegisteredEmail;
