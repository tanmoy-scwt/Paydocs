import PropTypes from 'prop-types';
import React, { memo, useEffect, useMemo, useState } from 'react';

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

const TotalJobPostBarChart = ({ isLoading, data, activeBarChart }) => {
    const currentYear = new Date().getFullYear();
    const openingYear = 2023;

    const status = useMemo(() => {
        const years = Array.from({ length: currentYear - openingYear + 1 }, (_, index) => {
            const year = currentYear - index;
            return {
                value: String(year),
                label: year === currentYear ? 'This Year' : String(year),
                tab: index + 1
            };
        });
        return years;
    }, [currentYear, openingYear]);

    const [value, setValue] = React.useState('today');
    const theme = useTheme();
    const { navType, rtlLayout } = useConfig();

    const [selectedOption, setSelectedOption] = useState(status[0]);
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];
    // const max = Math.max(...data);
    // const chartMax = Math.ceil(Math.max(...data) / 10) * 10 + 10;

    const chartData = useMemo(() => {
        const max = Math.max(...data);
        const chartMax = Math.ceil(Math.max(...data) / 10) * 10 + 10;
        return {
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
                    },
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800,
                        animateGradually: {
                            enabled: false
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 800
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '50%',
                        distributed: true,
                        borderRadius: 12,
                        dataLabels: {
                            position: 'top'
                        }
                    }
                },
                colors: data.map((value) => (value === max ? '#4caf50' : '#95A0C5D9')),
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
                    max: chartMax,
                    forceNiceScale: true,
                    labels: {
                        style: {
                            colors: theme.palette.mode === 'dark' ? ['#fff'] : ['#666']
                        }
                    }
                },
                legend: {
                    show: false,
                    labels: {
                        colors: grey500
                    }
                },
                fill: {
                    type: 'solid'
                },
                dataLabels: {
                    enabled: true,
                    position: 'top',
                    style: {
                        fontSize: '14px',
                        colors: theme.palette.mode === 'dark' ? ['#fff'] : ['#333']
                    },
                    offsetY: -20,
                    background: {
                        enabled: false
                    }
                },
                grid: {
                    show: true,
                    strokeDashArray: 4,
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    borderColor: '#e0e0e0'
                },
                tooltip: {
                    theme: navType === 'dark' ? 'dark' : 'light'
                },
                borderColor: navType === 'dark' ? `${darkLight}20` : grey200
            },
            series: [
                {
                    name: 'Jobs',
                    data: [...data]
                }
            ]
        };
    }, [data, theme.palette.mode, navType]);

    const handleSelectOptionYear = (e) => {
        const selectedVal = e.target.value;
        setValue(selectedVal);
        const matchedOption = status.find((opt) => opt.value === selectedVal);
        setSelectedOption(matchedOption);
    };

    useEffect(() => {
        if (!isLoading) {
            ApexCharts.exec('bar-chart', 'updateOptions', chartData.options);
        }
        if (selectedOption?.tab) {
            activeBarChart(selectedOption.tab);
        }
    }, [selectedOption, isLoading]);

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
                                            renderValue: () => (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CalendarMonthIcon fontSize="small" />
                                                    {selectedOption?.label}
                                                </Box>
                                            )
                                        }}
                                    >
                                        {status?.map((option) => (
                                            <MenuItem key={option?.value} value={option?.value}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{option?.label}</Box>
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
    isLoading: PropTypes.bool,
    data: PropTypes.array.isRequired,
    activeBarChart: PropTypes.func.isRequired
};

export default memo(TotalJobPostBarChart);
