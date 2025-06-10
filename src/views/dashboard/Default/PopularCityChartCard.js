import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import MainCard from 'ui-component/cards/MainCard';

const PopularCityChartCard = ({ isLoading, chartDataAPI }) => {
    const theme = useTheme();
    const values = chartDataAPI ? chartDataAPI.map((item) => item?.jobPostPercentage) : [0, 0, 0];
    const labels = chartDataAPI ? chartDataAPI.map((item) => item?.city) : ['---', '---', '---'];
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

    const labelStyles = {
        fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)',
        lineHeight: 1.2,
        width: '60px',
        textAlign: 'center',
        wordWrap: 'break-word'
    };

    return (
        <MainCard title="Top Three City" isLoading={isLoading}>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
                <Grid container spacing={2} direction="column" sx={{ margin: 0, width: '100%', height: '100%' }}>
                    <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                            <Chart options={chartOptions} series={chartOptions.series} type="donut" width={300} height={300} />
                        </Grid>

                        {/* Label 3rd - Top Left */}
                        <Typography
                            variant="body2"
                            sx={{
                                position: 'absolute',
                                top: '-5%',
                                left: '5%',
                                color: theme.palette.secondary.main,
                                ...labelStyles
                            }}
                        >
                            {percentages[2]}%<br />
                            {labels[2]}
                        </Typography>

                        {/* Label 1st - Right Middle */}
                        <Typography
                            variant="body2"
                            sx={{
                                position: 'absolute',
                                right: '4%',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: theme.palette.success.dark,
                                ...labelStyles
                            }}
                        >
                            {percentages[0]}%<br />
                            {labels[0]}
                        </Typography>

                        {/* Label 2nd - Bottom Left */}
                        <Typography
                            variant="body2"
                            sx={{
                                position: 'absolute',
                                left: '2%',
                                bottom: '30%',
                                color: theme.palette.primary.main,
                                ...labelStyles
                            }}
                        >
                            {percentages[1]}%<br />
                            {labels[1]}
                        </Typography>
                    </Box>
                </Grid>
            )}
        </MainCard>
    );
};

PopularCityChartCard.propTypes = {
    isLoading: PropTypes.bool,
    chartDataAPI: PropTypes.array
};

export default PopularCityChartCard;
