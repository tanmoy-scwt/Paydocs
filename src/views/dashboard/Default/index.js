import { useEffect, useState } from 'react';

// material-ui
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import CompanyBoxCard from './CompanyBoxCard';
// import ProjectTable from 'views/widget/Data/ProjectTable';
// import SalesLineChartCard from 'ui-component/cards/SalesLineChartCard';
// import chartData from '../../widget/Chart/chart-data';

// import RevenueChartCard from 'views/widget/Chart/RevenueChartCard';
import PopularCityChartCard from './PopularCityChartCard';
import TotalJobPostBarChart from './TotalJobPostBarChart';
import LatestJobsTable from './LatestJobsTable';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);

    const BAR_CHART_OBJ = {
        1: [20, 80, 100, 240, 115, 110, 100, 300, 50, 22, 16, 80],
        2: [20, 80, 100, 200, 115, 110, 100, 150, 50, 22, 16, 80],
        3: [20, 80, 100, 240, 115, 110, 100, 30, 50, 22, 16, 80]
    };
    const [data, setData] = useState(BAR_CHART_OBJ[1]);

    // const successDark = theme.palette.success.dark;
    // const orange = theme.palette.orange.main;
    // const orangeDark = theme.palette.orange.dark;
    useEffect(() => {
        setLoading(false);
    }, []);

    const activeBarChart = (tabIndex) => {
        setData(BAR_CHART_OBJ[tabIndex]);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Typography
                    component="h6"
                    sx={{
                        fontWeight: 500,
                        fontSize: '22px',
                        lineHeight: '19.2px',
                        letterSpacing: '0%',
                        marginBottom: '1rem'
                    }}
                >
                    Total Companies
                </Typography>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        {/* <EarningCard isLoading={isLoading} /> */}
                        <CompanyBoxCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <CompanyBoxCard isLoading={isLoading} />
                        {/* <TotalOrderLineChartCard isLoading={isLoading} /> */}
                    </Grid>
                    {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <TotalJobPostBarChart isLoading={isLoading} data={data} activeBarChart={activeBarChart} />
                        {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
                    </Grid>
                    {/* <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} alignItems="stretch">
                    <Grid item xs={12} lg={7} md={6} sx={{ paddingBottom: '0px' }}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent
                                sx={{
                                    height: '100%',
                                    padding: '0px',
                                    '&:last-child': {
                                        paddingBottom: '0px'
                                    }
                                }}
                            >
                                <LatestJobsTable title="Popular Jobs" isLoading={isLoading} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                        <Card sx={{ height: '100%', paddingBottom: '0rem' }}>
                            <CardContent
                                sx={{
                                    height: '100%',
                                    padding: '0px',
                                    '&:last-child': {
                                        paddingBottom: '0px'
                                    }
                                }}
                            >
                                <PopularCityChartCard isLoading={isLoading} />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Box
                        sx={{
                            width: '100%',
                            paddingTop: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="body2" color="textSecondary">
                            &copy; {new Date().getFullYear()} All copyrights reserved
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
