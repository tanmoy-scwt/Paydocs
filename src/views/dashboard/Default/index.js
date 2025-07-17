import { useCallback, useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import CompanyBoxCard from './CompanyBoxCard';
import PopularCityChartCard from './PopularCityChartCard';
import TotalJobPostBarChart from './TotalJobPostBarChart';
import LatestJobsTable from './LatestJobsTable';
import axiosServices from 'utils/axios';
import useAuth from 'hooks/useAuth';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState('');
    const [dashboardBarChat, setDashboardBarChat] = useState([]);
    const { user } = useAuth();

    console.log(dashboardData, 'asdasd');

    const fetchDetailsFromAPI = async () => {
        try {
            const API_PATH = user.user_role === 'user' ? '/dashboard' : '/admin/dashboard';
            const response = await axiosServices.get(API_PATH);
            const data = response?.data?.data;
            if (response.data.status) {
                setDashboardData(data);
                setDashboardBarChat(data?.jobPostPerMonthArray);
                setLoading(false);
            }
        } catch (error) {
            console.log('Connection Failed! ' + error);
        }
    };

    const activeBarChart = useCallback(
        (tabValue) => {
            const fetchChartData = async () => {
                try {
                    const API_VALUE = tabValue === 'This Year' ? 'thisYear' : tabValue;
                    const API_PATH =
                        user.user_role === 'user' ? '/job-posts-per-month-by-year?year=' : '/admin/job-posts-per-month-by-year?year=';
                    const response = await axiosServices.get(API_PATH + API_VALUE);
                    const data = response?.data?.data;
                    if (response?.data?.status) setDashboardBarChat(data?.jobPostPerMonthArray);
                } catch (error) {
                    console.log('Connection Failed! ' + error);
                }
            };
            fetchChartData();
        },
        [user]
    );

    useEffect(() => {
        fetchDetailsFromAPI();
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            {/* Company Overview */}
            <Grid item xs={12}>
                <Typography component="h6" sx={{ fontWeight: 500, fontSize: '22px', mb: '1rem' }}>
                    {user?.user_role === 'admin' && 'Top Companies'}
                </Typography>

                <Grid container spacing={gridSpacing}>
                    {user?.user_role === 'user'
                        ? dashboardData?.totalJobPost >= 0 || dashboardData?.totalJobApplication >= 0
                            ? [
                                  {
                                      profile: '',
                                      totalCount: `${dashboardData?.totalJobPost}`,
                                      titleName: 'Total Job Post',
                                      pathName: '/posted-jobs'
                                  },
                                  {
                                      profile: null,
                                      totalCount: `${dashboardData?.totalJobApplication}`,
                                      titleName: 'Total Job Application',
                                      pathName: '/job-applied'
                                  }
                              ]?.map((companyDetails, index) => (
                                  <Grid item key={index} xs={12} sm={12} md={6}>
                                      <Link style={{ textDecoration: 'none' }} to={companyDetails.pathName}>
                                          <CompanyBoxCard isLoading={isLoading} companyDetails={companyDetails} />
                                      </Link>
                                  </Grid>
                              ))
                            : [1, 2].map((_, index) => (
                                  <Grid item key={index} xs={12} sm={12} md={6}>
                                      <CompanyBoxCard isLoading={isLoading} />
                                  </Grid>
                              ))
                        : dashboardData?.topCompanies?.length
                        ? [
                              {
                                  profile: dashboardData?.topCompanies[0]?.user_dtls?.profile_pic,
                                  totalCount: `${dashboardData?.topCompanies[0]?.total_job_post}`,
                                  titleName: `${dashboardData?.topCompanies[0]?.user_dtls?.company_name}`
                              },
                              {
                                  profile: dashboardData?.topCompanies[1]?.user_dtls?.profile_pic,
                                  totalCount: `${dashboardData?.topCompanies[1]?.total_job_post}`,
                                  titleName: `${dashboardData?.topCompanies[1]?.user_dtls?.company_name}`
                              }
                          ]?.map((companyDetails, index) => (
                              <Grid item key={index} xs={12} sm={6}>
                                  <CompanyBoxCard isLoading={isLoading} companyDetails={companyDetails} />
                              </Grid>
                          ))
                        : [1, 2].map((_, index) => (
                              <Grid item key={index} xs={12} sm={6}>
                                  <CompanyBoxCard isLoading={isLoading} />
                              </Grid>
                          ))}
                </Grid>
            </Grid>

            {/* Bar Chart */}
            <Grid item xs={12}>
                <TotalJobPostBarChart isLoading={isLoading} data={dashboardBarChat} activeBarChart={activeBarChart} />
            </Grid>

            {/* Table + Chart Row */}
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6} lg={7}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                                <LatestJobsTable title="Popular Jobs" isLoading={isLoading} popularJobs={dashboardData?.popularJobs} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1, padding: 0 }}>
                                <PopularCityChartCard isLoading={isLoading} chartDataAPI={dashboardData?.topThreeCity} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            {/* Footer */}
            <Grid item xs={12}>
                <Box
                    sx={{
                        width: '100%',
                        pt: 2,
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
    );
};

export default Dashboard;
