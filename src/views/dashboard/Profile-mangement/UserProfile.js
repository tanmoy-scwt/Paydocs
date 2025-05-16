// material-ui
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import Avatar1 from 'assets/images/users/avatar-1.png';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useTheme } from '@mui/system';

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const UserProfile = () => {
    const theme = useTheme();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onImageChange(file);
        }
    };
    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Avatar alt="User 1" src={Avatar1} sx={{ height: 80, width: 80 }} />
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
                                    <Box sx={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                    <TextField fullWidth label="Last Name" defaultValue="Schorl" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name" defaultValue="Delaney" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email Address" defaultValue="demo@company.com" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Phone Number" defaultValue="000-00-00000" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Company Name" defaultValue="company.ltd" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Site Information" defaultValue="www.company.com" />
                </Grid>
            </Grid>
        </>
    );
};

export default UserProfile;
