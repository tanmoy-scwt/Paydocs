import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
// assets
import CompanyLogo from 'assets/images/icons/MLogo.png';
import MenuLogo from 'assets/images/icons/menu.svg';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.paper,
    // color: 'black',
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.dark,
    overflow: 'hidden',
    position: 'relative'
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const CompanyBoxCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: '#fff',
                                                mt: 1,
                                                width: 83,
                                                height: 83,
                                                borderRadius: '50% !important'
                                            }}
                                        >
                                            <img src={CompanyLogo} alt="Notification" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            //  borderRadius: '50%'
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.mediumAvatar,
                                                background:
                                                    theme.palette.mode === 'dark'
                                                        ? `linear-gradient(212.7deg, ${theme.palette.secondary.dark} 9.7%, #999999 342.68%)`
                                                        : 'linear-gradient(212.7deg, #FFFFFF 9.7%, #999999 342.68%)',

                                                color: theme.palette.secondary[200],
                                                zIndex: 1,
                                                width: 50,
                                                height: 50
                                            }}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <img src={MenuLogo} width={30} height={30} alt="Menu" />
                                        </Avatar>
                                        <Menu
                                            id="menu-earning-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            Company Name
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        // color: '#061237',
                                        color: theme.palette.mode === 'dark' ? '#ffff' : '#061237'
                                    }}
                                >
                                    100+ Jobs Posted
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

CompanyBoxCard.propTypes = {
    isLoading: PropTypes.bool
};

export default CompanyBoxCard;
