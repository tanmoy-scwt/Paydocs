import PropTypes from 'prop-types';

// material-ui
import { CardMedia, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Skeleton } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import Company1 from 'assets/images/icons/company.png';
import Company2 from 'assets/images/icons/company2.png';
import { useTheme } from '@emotion/react';

// table data
function createData(image, subject, dept, date) {
    return { image, subject, dept, date };
}

const rows = [
    createData(Company1, 'Lorem ipsum dolor sit ame', 'Bangalore', '250'),
    createData(Company2, 'Lorem ipsum dolor sit ame', 'Noida', '250'),
    createData(Company1, 'Lorem ipsum dolor sit ame', 'Delhi', '250'),
    createData(Company2, 'Lorem ipsum dolor sit ame', 'Mumbai', '250'),
    createData(Company1, 'Lorem ipsum dolor sit ame', 'Chennai', '250')
];

// =========================|| DATA WIDGET - LATEST JOBS TABLE ||========================= //

const LatestJobsTable = ({ title, isLoading }) => {
    const theme = useTheme();
    return (
        <MainCard title={title} isLoading={isLoading} content={false}>
            <PerfectScrollbar style={{ height: 345, padding: 0 }}>
                <TableContainer sx={{ paddingX: '24px' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ background: theme.palette.mode === 'dark' ? '' : '#F4F6F9' }}>
                                {isLoading ? (
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
                            {(isLoading ? Array.from({ length: 5 }) : rows).map((row, index) => (
                                <TableRow sx={{ padding: '0px' }} hover key={index}>
                                    <TableCell sx={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '8px' }}>
                                        {isLoading ? (
                                            <>
                                                <Skeleton variant="circular" width={40} height={40} />
                                                <Skeleton variant="text" width={150} height={20} />
                                            </>
                                        ) : (
                                            <>
                                                <CardMedia
                                                    component="img"
                                                    image={row.image}
                                                    title="image"
                                                    sx={{
                                                        borderRadius: '8px',
                                                        width: 40,
                                                        height: 'auto',
                                                        boxShadow: '0px 4px 9.1px 0px #0000001A'
                                                    }}
                                                />
                                                <Typography component="p" variant="body2">
                                                    {row.subject}
                                                </Typography>
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell>{isLoading ? <Skeleton variant="text" width={100} height={20} /> : row.dept}</TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }}>
                                        {isLoading ? <Skeleton variant="text" width={30} height={20} /> : row.date}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </PerfectScrollbar>
            <Divider />
        </MainCard>
    );
};

LatestJobsTable.propTypes = {
    title: PropTypes.string,
    isLoading: PropTypes.bool
};

export default LatestJobsTable;
