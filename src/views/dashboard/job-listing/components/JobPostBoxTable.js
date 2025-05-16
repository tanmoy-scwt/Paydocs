import PropTypes from 'prop-types';
import { Avatar, Box, Button, CardActions, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
// import MainCard from 'ui-component/cards/MainCard';
// import Company1 from 'assets/images/icons/logoplasan.png';
import building from 'assets/images/icons/building.svg';
import watch from 'assets/images/icons/watch.svg';
import salary from 'assets/images/icons/moneyCirculation.svg';
import location from 'assets/images/icons/location.svg';
import bag from 'assets/images/icons/bag.svg';
import { useTheme } from '@mui/system';

const JobPostBoxTable = ({ action, jobDetails }) => {
    const { companylogo, companyName, companyDetails, companyAbout } = jobDetails;
    const infoItems = [
        { icon: building, text: companyDetails[0] },
        { icon: watch, text: companyDetails[1] },
        { icon: salary, text: companyDetails[2] },
        { icon: bag, text: companyDetails[3] },
        { icon: location, text: companyDetails[4] }
    ];
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 2,
                    padding: 2,
                    borderRadius: 1,
                    // backgroundColor: '#FAFAFA'
                    background: theme.palette.mode === 'dark' ? '' : '#fafafa'
                }}
            >
                {/* Image */}
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: 'transparent',
                        borderRadius: '50%',
                        width: 70,
                        height: 70,
                        mt: 1
                    }}
                >
                    <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                        src={companylogo}
                        alt="Notification"
                    />
                </Avatar>
                {/* Text Content */}
                <Box sx={{ flex: 1, mx: 2 }}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography component="h3" variant="body1" fontSize={18} fontWeight={600}>
                            {companyName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <List
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                columnGap: '1rem',
                                rowGap: '0rem',
                                padding: 0
                            }}
                        >
                            {infoItems?.map((item, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingX: 0,
                                        paddingY: '0.5rem',
                                        width: 'auto',
                                        flexShrink: 0
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            minWidth: 'auto',
                                            marginRight: '0.5rem'
                                        }}
                                    >
                                        <img
                                            src={item?.icon}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}
                                            alt="icon"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item?.text}
                                        primaryTypographyProps={{
                                            sx: {
                                                fontSize: '12px',
                                                whiteSpace: 'nowrap',
                                                color: '#2B2D3B',
                                                lineHeight: '20px'
                                            }
                                        }}
                                        sx={{
                                            margin: 0
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item xs={12} md={12} lg={12}>
                        <Typography sx={{ color: '#697586', lineHeight: '20px' }} component="p" variant="body2" mt={1}>
                            {companyAbout}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <CardActions sx={{ justifyContent: 'flex-start', padding: '0rem', paddingTop: '1rem' }}>
                            <Button
                                sx={{ justifyContent: 'flex-start', padding: '0rem', color: theme.palette.secondary.main }}
                                variant="text"
                                size="small"
                            >
                                View Details
                            </Button>
                        </CardActions>
                    </Grid>
                </Box>

                {/* Button */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', paddingY: '1rem' }}>
                    <Button
                        onClick={action}
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.dark
                            }
                        }}
                        variant="contained"
                        size="large"
                    >
                        Action
                    </Button>
                </Box>
            </Box>
            <Divider
                sx={{
                    borderBottomWidth: '2px',
                    color: '#BDBDBD'
                }}
            />
        </>
    );
};

JobPostBoxTable.propTypes = {
    title: PropTypes.string,
    action: PropTypes.func.isRequired,
    jobDetails: PropTypes.shape({
        companylogo: PropTypes.string.isRequired,
        companyName: PropTypes.string.isRequired,
        companyDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
        companyAbout: PropTypes.string.isRequired
    })
};

export default JobPostBoxTable;
