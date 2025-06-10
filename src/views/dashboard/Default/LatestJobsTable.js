import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

// material-ui
import {
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Skeleton,
    Avatar,
    Box,
    Grid
} from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// table data
function createData(logo, companyName, location, applicants) {
    return { logo, companyName, location, applicants };
}

// =========================|| DATA - LATEST JOBS TABLE ||========================= //

const LatestJobsTable = ({ title, isLoading, popularJobs }) => {
    const rows = popularJobs?.map((item) => createData(item?.company_logo, item?.title, item?.location, item?.application_list_count));

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (isSmallScreen) {
        // Stacked "card" style on small screens + header row above cards
        return (
            <MainCard title={title} isLoading={isLoading} content={false}>
                <PerfectScrollbar style={{ height: 345, padding: 0 }}>
                    <Box sx={{ paddingX: 2 }}>
                        {/* Header row */}
                        <Grid container spacing={2} sx={{ mb: 1, px: 1, fontWeight: 'bold', color: theme.palette.text.primary }}>
                            <Grid item xs={5}>
                                Job Title
                            </Grid>
                            <Grid item xs={4}>
                                City
                            </Grid>
                            <Grid item xs={3} textAlign="right">
                                Applicants
                            </Grid>
                        </Grid>

                        {(isLoading && !popularJobs ? Array.from({ length: 5 }) : rows)?.map((row, index) => (
                            <Box
                                key={index}
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: theme.shadows[1],
                                    backgroundColor: theme.palette.background.paper,
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center'
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <Skeleton variant="circular" width={50} height={50} />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Skeleton variant="text" width="70%" height={25} />
                                            <Skeleton variant="text" width="40%" height={20} />
                                        </Box>
                                        <Skeleton variant="text" width={40} height={20} />
                                    </>
                                ) : (
                                    <>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                borderRadius: '50%',
                                                width: 50,
                                                height: 50,
                                                backgroundColor: !row?.logo ? '#ccc' : 'transparent',
                                                border: !row?.logo ? '1px solid #ccc' : 'none'
                                            }}
                                            src={row?.logo ? `${process.env.REACT_APP_API_IMAGE_URL}/${row?.logo}` : ''}
                                            alt={row?.companyName}
                                        />
                                        <Typography variant="body1" sx={{ flex: 5 }}>
                                            {row?.companyName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ flex: 4 }}>
                                            {row?.location}
                                        </Typography>
                                        <Typography variant="body2" align="right" sx={{ flex: 3 }}>
                                            {row?.applicants}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        ))}

                        {!isLoading && (rows?.length === 0 || rows === undefined) && (
                            <Typography variant="body1" align="center" color="textSecondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                                No Data Found
                            </Typography>
                        )}
                    </Box>
                </PerfectScrollbar>
                <Divider />
            </MainCard>
        );
    }

    // Desktop / larger screens render regular table
    return (
        <MainCard title={title} isLoading={isLoading} content={false}>
            <PerfectScrollbar style={{ height: 345, padding: 0 }}>
                <TableContainer sx={{ paddingX: '24px' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ background: theme.palette.mode === 'dark' ? '' : '#F4F6F9' }}>
                                {isLoading && !popularJobs ? (
                                    <>
                                        <TableCell>
                                            <Skeleton variant="text" width={150} height={20} />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton variant="text" width={80} height={20} />
                                        </TableCell>
                                        <TableCell align="right" sx={{ pr: 3 }}>
                                            <Skeleton variant="text" width={60} height={20} />
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell sx={{ paddingY: '12px' }}>Job Title</TableCell>
                                        <TableCell sx={{ paddingY: '12px' }}>City</TableCell>
                                        <TableCell align="right" sx={{ pr: 3, paddingY: '12px' }}>
                                            Applicants
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {(isLoading && !popularJobs ? Array.from({ length: 5 }) : rows)?.map((row, index) => (
                                <TableRow sx={{ padding: '0px' }} hover key={index}>
                                    <TableCell sx={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '8px' }}>
                                        {isLoading ? (
                                            <>
                                                <Skeleton variant="circular" width={40} height={40} />
                                                <Skeleton variant="text" width={150} height={20} />
                                            </>
                                        ) : (
                                            <>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        ...theme.typography.commonAvatar,
                                                        ...theme.typography.largeAvatar,
                                                        borderRadius: '50%',
                                                        width: 40,
                                                        height: 40,
                                                        mt: 1,
                                                        backgroundColor: !row?.logo ? '#ccc' : 'transparent',
                                                        border: !row?.logo ? '1px solid #ccc' : 'none'
                                                    }}
                                                    src={row?.logo ? `${process.env.REACT_APP_API_IMAGE_URL}/${row?.logo}` : ''}
                                                />
                                                <Typography component="p" variant="body2">
                                                    {row?.companyName}
                                                </Typography>
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell>{isLoading ? <Skeleton variant="text" width={100} height={20} /> : row?.location}</TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }}>
                                        {isLoading ? <Skeleton variant="text" width={30} height={20} /> : row?.applicants}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {!isLoading && (rows?.length === 0 || rows === undefined) && (
                    <Typography variant="body1" align="center" color="textSecondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                        No Data Found
                    </Typography>
                )}
            </PerfectScrollbar>
            <Divider />
        </MainCard>
    );
};

LatestJobsTable.propTypes = {
    title: PropTypes.string,
    isLoading: PropTypes.bool,
    popularJobs: PropTypes.arrayOf(
        PropTypes.shape({
            company_logo: PropTypes.string,
            company_name: PropTypes.string,
            title: PropTypes.string,
            location: PropTypes.string,
            number_of_applicants: PropTypes.number
        })
    )
};

export default LatestJobsTable;
