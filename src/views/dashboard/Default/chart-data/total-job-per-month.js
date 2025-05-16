const data = [20, 80, 100, 250, 115, 110, 100, 70, 50, 22, 16, 80];
const max = Math.max(...data);
const chartMax = Math.ceil(Math.max(...data) / 10) * 10 + 10; // Dynamic max with a buffer

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
        colors: data.map((value) => (value === max ? '#4caf50' : '#1976D2')), // green for max, blue for others
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
                    colors: Array(12).fill('#666') // default label colors (can be overridden)
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
                    colors: ['#666']
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
                colors: ['#333']
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

export default chartData;
