import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// chart data
// import chartData from './chart-data/total-job-per-month';

const status = [
    { value: 'today', label: 'This Year', tab: 1 },
    { value: 'month', label: '2024', tab: 2 },
    { value: 'year', label: '2023', tab: 3 }
];

const TotalJobPostBarChart = ({ isLoading, data, activeBarChart }) => {
    const [value, setValue] = React.useState('today');
    const theme = useTheme();
    const { navType, rtlLayout } = useConfig();

    const [selectedOption, setSelectedOption] = useState(status[0]);

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];
    const max = Math.max(...data);
    const chartMax = Math.ceil(Math.max(...data) / 10) * 10 + 10;

    const chartData = {
        height: 480,
        type: 'bar',

        options: {
            chart: {
                id: 'bar-chart',
                stacked: false,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%',
                    distributed: true, // enables individual bar color control
                    borderRadius: 12, // ✅ Rounded corners
                    dataLabels: {
                        position: 'top' // ✅ Keep labels at the top
                    }
                }
            },
            colors: data.map((value) => (value === max ? '#4caf50' : '#95A0C5D9')), // green for max, blue for others
            xaxis: {
                type: 'category',
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: theme.palette.mode === 'dark' ? Array(12).fill('#fff') : Array(12).fill('#666')
                    }
                }
            },
            yaxis: {
                max: chartMax, // Adjusted max for y-axis
                // tickAmount: 5, // number of y-axis ticks (optional)
                forceNiceScale: true, // ensure nicely spaced ticks
                // tickAmount: 7,
                labels: {
                    style: {
                        colors: theme.palette.mode === 'dark' ? ['#fff'] : ['#666']
                    }
                }
            },
            legend: {
                show: false
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: true,
                position: 'top', // Place data labels on top of bars
                style: {
                    fontSize: '14px',
                    colors: theme.palette.mode === 'dark' ? ['#fff'] : ['#333']
                },
                offsetY: -20 // Adjust to position labels above the bars
            },
            grid: {
                show: true,
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                borderColor: '#e0e0e0'
            },
            tooltip: {
                theme: 'light'
            }
        },
        series: [
            {
                name: 'Jobs',
                data: [...data]
            }
        ]
    };

    React.useEffect(() => {
        const newChartData = {
            ...chartData.options,
            xaxis: {
                ...chartData.options.xaxis,
                labels: {
                    style: {
                        colors: Array(12).fill(primary)
                    }
                }
            },
            borderColor: navType === 'dark' ? `${darkLight}20` : grey200,
            grid: {
                show: true,
                strokeDashArray: 4 // 👈 dotted lines
            },
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        if (!isLoading) {
            ApexCharts.exec('bar-chart', 'updateOptions', newChartData);
        }
    }, [navType, primary, darkLight, grey200, isLoading, grey500]);

    const handleSelectOptionYear = (e) => {
        console.log(e.target);
        activeBarChart(selectedOption.tab);
        setValue(e.target.value);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography sx={{ colors: theme.palette.mode === 'dark' ? '#fff' : '#2B2D3B' }} variant="h3">
                                                Job Post per month
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="select-status"
                                        select
                                        value={value}
                                        onChange={handleSelectOptionYear}
                                        SelectProps={{
                                            renderValue: (selected) => {
                                                // const selectedOption = status.find((opt) => opt.value === selected);
                                                setSelectedOption(status.find((opt) => opt.value === selected));
                                                return (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <CalendarMonthIcon fontSize="small" />
                                                        {selectedOption?.label}
                                                    </Box>
                                                );
                                            }
                                        }}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{option.label}</Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                '& .apexcharts-legend-text': {
                                    marginLeft: rtlLayout ? '8px' : 'initial'
                                }
                            }}
                        >
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

TotalJobPostBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalJobPostBarChart;
