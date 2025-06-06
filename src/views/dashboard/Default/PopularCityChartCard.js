import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Skeleton, Typography, useMediaQuery } from '@mui/material';
import Chart from 'react-apexcharts';
// import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const PopularCityChartCard = ({ isLoading, chartDataAPI }) => {
    const theme = useTheme();
    // const { rtlLayout } = useConfig();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));
    const values = chartDataAPI ? chartDataAPI?.map((item) => item?.jobPostPercentage) : [0, 0, 0];
    const labels = chartDataAPI ? chartDataAPI?.map((item) => item?.city) : ['---', '---', '---'];
    const total = values.reduce((a, b) => a + b, 0);
    const percentages = values.map((v) => (isNaN(((v / total) * 100).toFixed(1)) ? 0 : ((v / total) * 100).toFixed(1)));

    const chartOptions = {
        chart: {
            id: 'revenue-chart',
            type: 'donut'
        },
        dataLabels: {
            enabled: false
        },
        labels: labels,
        legend: {
            show: true,
            position: 'bottom',
            fontFamily: 'inherit',
            labels: {
                positions: 'relative',
                colors: 'inherit'
            },
            itemMargin: {
                horizontal: 10,
                vertical: 10
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '80%',
                    labels: {
                        show: true
                    }
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (value) {
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                }
            }
        },
        series: values,
        colors: [theme.palette.success.dark, theme.palette.primary.main, theme.palette.secondary.main],
        stroke: {
            colors: ['#ffffff']
        }
    };

    return (
        <MainCard title="Top Three City" isLoading={isLoading}>
            {isLoading ? (
                <Skeleton variant="rectangle" width={380} height={300} />
            ) : (
                <Grid
                    sx={{
                        margin: '0rem',
                        width: '100%',

                        height: '100%'
                    }}
                    container
                    spacing={2}
                    direction={matchDownMd && !matchDownXs ? 'row' : 'column'}
                >
                    <Box sx={{ position: 'relative', paddingY: '0rem' }}>
                        <Grid
                            item
                            xs={12}
                            sm={7}
                            md={12}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0rem' }}
                        >
                            <Chart options={chartOptions} series={chartOptions.series} type="donut" width={300} height={300} />
                        </Grid>
                        <Typography
                            variant="h6"
                            sx={{
                                position: 'absolute',
                                top: '0%',
                                left: '5%',
                                fontSize: '16px',
                                lineHeight: '21px',
                                color: theme.palette.secondary.main,
                                cursor: 'pointer',
                                textAlign: 'center'
                            }}
                        >
                            {percentages[2]}%<br />
                            {labels[2]}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                position: 'absolute',
                                right: '5%',
                                top: '50%',
                                // transform: 'translateY(-50%)',
                                fontSize: '16px',
                                lineHeight: '21px',
                                color: theme.palette.success.dark,
                                cursor: 'pointer',
                                textAlign: 'center'
                            }}
                        >
                            {percentages[0]}% <br /> {labels[0]}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                position: 'absolute',
                                left: '5%',
                                bottom: '8%',
                                transform: 'translateY(-50%)',
                                fontSize: '16px',
                                lineHeight: '21px',
                                color: theme.palette.primary.main,
                                cursor: 'pointer',
                                textAlign: 'center'
                            }}
                        >
                            {percentages[1]}%<br />
                            {labels[1]}
                        </Typography>
                    </Box>
                    {/* <Box sx={{ mt: 2 }}>
                    <Grid
                        item
                        xs={12}
                        sm={7}
                        md={12}
                        sx={{
                            display: 'flex',
                            gap: '0.4rem',
                            background: '#F4F6F9',
                            paddingY: '1rem',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <CalendarMonthIcon fontSize="small" />
                        <Typography component="p" variant="body2" color={'#2B2D3B'} fontWeight={500}>
                            01 January 2024 to 31 December 2024
                        </Typography>
                    </Grid>
                </Box> */}
                </Grid>
            )}
        </MainCard>
    );
};

PopularCityChartCard.propTypes = {
    chartData: PropTypes.object
};

export default PopularCityChartCard;
