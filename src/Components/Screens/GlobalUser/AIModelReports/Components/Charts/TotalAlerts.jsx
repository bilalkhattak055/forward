import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function TotalAlerts({ filters, defaultData, chartsData, lastFilter,setLastFilter,data,setData }) {
 


const categoryAbbreviations = {
    "Emergency Exit": "E. Exit",
    "MMHE": "MMHE",
    "Helmet": "Helmet",
    "Vest": "Vest",
    "Machine Guard": "M. Guard"
};
    // Track shift changes
    // useEffect(() => {
        
    //         setLastFilter('shifts'); // Set 'shifts' as the latest filter
        
    // }, [filters?.shifts]);
    // useEffect(() => {
       
    //         setLastFilter('areas'); // Set 'areas' as the latest filterr
    
    // }, [ filters?.areas]);

    // // Update the data based on the latest filter (shift or week)
    // useEffect(() => {
    //   // Update the data state with new values
    // }, [lastFilter, filters]);

    // Create series for the different segments (Low, Medium, Severe)
    // const createSeries = () => {
    //     const blueSeries = [];
    //     const orangeSeries = [];
    //     const redSeries = [];

    //     data.forEach((item) => {
    //         // Blue segment (up to 40)
    //         blueSeries.push(Math.min(item.value, 40));

    //         // Orange segment (41 to 60)
    //         orangeSeries.push(item.value > 40 ? Math.min(item.value, 60) - 40 : 0);

    //         // Red segment (above 60)
    //         redSeries.push(item.value > 60 ? item.value - 60 : 0);
    //     });

    //     return [
    //         { name: 'Low', data: blueSeries, color: '#40a1ff' },
    //         { name: 'Medium', data: orangeSeries, color: '#f9c50a' },
    //         { name: 'Severe', data: redSeries, color: '#ff7340' },
    //     ];
    // };

    // const createSeries = () => {
    //     return [{
    //         name: 'Alerts',
    //         data: data.map(item => item.value),  // Use the values from the `data`
    //         colors: data.map(item => {
    //             if (item.category === 'Helmet' || item.category === 'Emergency Exit' || item.category === 'Machine Guard') {
    //                 return '#ff0000'; // Red for Helmet, Emergency Exit, and Machine Guard
    //             } else if (item.category === 'MMHE') {
    //                 return '#f9c50a'; // Yellow for MMHE
    //             } else if (item.category === 'Vest') {
    //                 return '#40a1ff'; // Blue for Vest
    //             }
    //             // Default color (black) if category doesn't match
    //         }),
    //     }];
    // };

    const createSeries = () => {
        return [
            {
                name: 'High Severity',
                data: data?.map(item => 
                    (item?.category === 'MMHE' || item?.category === 'Emergency Exit') 
                        ? item.value : 0),  // Include value for High Severity categories
                color: '#ef4343',  // Red for High Severity
            },
          
            {
                name: 'Medium Plus Severity',
                data: data?.map(item => 
                    (item?.category === 'Helmet' || item?.category === 'Vest') 
                        ? item?.value : 0),  // Include value for Medium Plus Severity category (Vest)
                color: '#f0ab43',  // Blue for Medium Plus Severity
            },
            {
                name: 'Medium Severity',
                data: data?.map(item => 
                    item?.category === 'Machine Guard' 
                        ? item?.value : 0),  // Include value for Medium Severity category (MMHE)
                color: '#40a1ff',  // Yellow for Medium Severity
            },
        ];
    };
    
    

    const options = {
        chart: {
            type: 'bar',
            stacked: true,  // Stacked bars
            height: 350,
        },
        toolbar: {
            show: false
        },
        dataLabels: {
            enabled: true,  // Enable data labels
            style: {
                colors: ['#ffffff'],  // Label color
                fontSize: '11px',  // Adjust font size
            },
            formatter: function (val, opts) {
                return `${val}`; // Show data value in labels
            },
            textAnchor: 'middle',
        },
        tooltip: {
            enabled: true,
            shared: true,  // Tooltip is shared across all series (columns)
            intersect: false,  // Show tooltip only on hover
            style: {
                fontSize: '12px',  // Tooltip text size
                fontWeight: 'normal',
            },
            x: {
                show: true,  // Show category name
                formatter: function (value) {
                    return `${value}`;  // Return category name
                },
            },
            y: {
                formatter: function (value, opts) {
                    // Get the data for the current category (across all series)
                    const seriesValues = opts.w.globals.series;
                    const categoryIndex = opts.dataPointIndex;  // Index for the current category
                    const isAllZero = seriesValues.every(series => series[categoryIndex] === 0 || series[categoryIndex] === null); // Check if all values for this category are 0 or null
                    
                    // If all values are zero/null for this category, return 0%
                    if (isAllZero) {
                        return '0';  // Return 0% when all values for this category are zero or null
                    }
                    else{
                        // If the value is non-zero, show the value as percentage
                        if (value !== 0 && value !== null) {
                            return `${value}`;  // Format and return the value as percentage
                        } 
                    }
                    
                  
                        }
            }
            
            
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadiusWhenStacked: 'all',
                columnWidth: '65%',
                distributed: false,  // Ensures each bar gets its assigned color
                borderRadiusApplication: 'around',
                borderRadius: 4,
            },
        },
        xaxis: {
            categories: data?.map(item => categoryAbbreviations[item?.category] || item?.category),  // Categories for x-axis
            labels: {
                style: {
                    fontSize: '12px',  // Label font size
                },
                rotate: 0,
                hideOverlappingLabels: false,
                trim: true,  // Trim labels if they are too long
            },
        },
        yaxis: {
            title: {
                text: 'Alerts',
                style: {
                    lineHeight: '2.5',
                    fontSize: '13px',
                    fontWeight: '100',
                    fontFamily: 'sans-serif',
                },
            },
            labels: {
                style: {
                    fontSize: '12px',
                },
            },
        },
        title: {
            text: 'Summary of Alerts',
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: '500',
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            show: true,
            position: 'bottom',  // Position the legend at the bottom
            horizontalAlign: 'center',
            labels: {
                useSeriesColors: false,  // Use the series colors
            },
            markers: {
                width: 12,
                height: 12,
                radius: 12,  // Circular markers for legend
            },
            formatter: function(val, opts) {
                if (opts?.seriesIndex === 0) return 'High Severity';  // Red
                if (opts?.seriesIndex === 1) return 'Medium Plus Severity';  // Yellow
                if (opts?.seriesIndex === 2) return 'Medium Severity';  // Blue
            },
        },
        responsive: [
            {
                breakpoint: 1367,
                options: {
                    chart: {
                        width: '100%',
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '12px',  // Adjust font size for smaller screens
                            },
                            rotate: -45,  // Rotate labels for better fit
                        },
                    },
                }
            },
            {
                breakpoint: 992,
                options: {
                    chart: {
                        height: 400,
                    },
                }
            },
            {
                breakpoint: 697,
                options: {
                    chart: {
                        width: '100%',
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '12px',  // Adjust font size for smaller screens
                            },
                            rotate: -45,  // Rotate labels for better fit
                        },
                    },
                }
            },
            {
                breakpoint: 620,
                options: {
                    chart: {
                        width: '100%',
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '10px',  // Adjust font size for smaller screens
                            },
                            rotate: -45,  // Rotate labels for better fit
                        },
                    },
                    dataLabels: {
                        style: {
                            fontSize: '9px',  // Adjust font size for readability
                        },
                    },
                }
            }
        ]
    };
    
    
    

    return (
        <>
            <ReactApexChart
                options={options}
                series={createSeries()} // Series based on updated data
                type="bar"
                height={options?.chart?.height}
            />
        </>
    );
}
