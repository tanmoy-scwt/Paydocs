import React, { useEffect } from 'react';
import { useDispatch } from 'store';
import { useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    // Checkbox,
    FormControl,
    // FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';
import { openSnackbar } from 'store/slices/snackbar';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const RegisteredEmail = searchParams.get('email');

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState(false);
    // const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const { register } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                enableReinitialize="true"
                initialValues={{
                    firstName: '',
                    lastName: '',
                    company_name: '',
                    email: RegisteredEmail ? RegisteredEmail : '',
                    mobile: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('First name is required'),

                    lastName: Yup.string().required('Last name is required'),

                    company_name: Yup.string().required('Company name is required'),

                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),

                    mobile: Yup.string()
                        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
                        .required('Mobile number is required'),

                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log(values, 'values');
                    const { firstName, lastName, company_name, email, mobile, password } = values;
                    try {
                        const response = await register(firstName, lastName, company_name, email, mobile, password);
                        if (response.status) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            setTimeout(() => {
                                navigate('/', { replace: true });
                            }, 1500);
                        }
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: response.data.status ? 'Profile created successfully!' : 'Failed to create profile.',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: false
                            })
                        );
                    } catch (err) {
                        console.error(err);
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: err.message || '',
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                },
                                close: false
                            })
                        );
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
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.firstName && errors.firstName)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        margin="normal"
                                        name="firstName"
                                        type="text"
                                        value={values.firstName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.firstName && errors.firstName)}
                                    />
                                    {touched.firstName && errors.firstName && <FormHelperText error>{errors.firstName}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        margin="normal"
                                        name="lastName"
                                        type="text"
                                        value={values.lastName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.lastName && errors.lastName)}
                                    />
                                    {touched.lastName && errors.lastName && <FormHelperText error>{errors.lastName}</FormHelperText>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.company_name && errors.company_name)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <TextField
                                fullWidth
                                label="Company Name"
                                margin="normal"
                                name="company_name"
                                type="text"
                                value={values.company_name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.company_name && errors.company_name)}
                            />
                            {touched.company_name && errors.company_name && <FormHelperText error>{errors.company_name}</FormHelperText>}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                disabled
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.mobile && errors.mobile)} sx={{ ...theme.typography.customInput }}>
                            <TextField
                                fullWidth
                                label="Mobile"
                                margin="normal"
                                name="mobile"
                                type="tel"
                                value={values.mobile}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.mobile && errors.mobile)}
                            />
                            {touched.mobile && errors.mobile && <FormHelperText error>{errors.mobile}</FormHelperText>}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        {/* <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.sadad
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid> */}
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

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
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTRegister;
