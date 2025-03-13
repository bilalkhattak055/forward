export const MonthlyProfitsChartData = { 
    series: [30, 35, 55],
    options: { 
        labels: ["Defected", "Okay", "Total"],
      chart: { 
        type: "donut", 
        height: 300,
        dropShadow: {
            enabled: true,
            top: 3,        
            left: 3,       
            blur: 11.17,   
            color: '#3E3A641A', 
            opacity: 0.4,
            background: "transparent"
        }
      }, 
      dataLabels: { 
        enabled: false, 
      }, 
      legend: { 
        show: true,
        position: "bottom", 
        fontSize: "14px", 
        fontFamily: "Rubik, sans-serif", 
        fontWeight: 500, 
        labels: { 
          colors: "#666", // ← Changed from CSS variable to direct color
          useSeriesColors: false
        }, 
        markers: { 
          width: 6, 
          height: 6,
          offsetX: 0,
          offsetY: 0
        }, 
        itemMargin: { 
          horizontal: 7, 
          vertical: 0, 
        },
        onItemClick: {
          toggleDataSeries: true
        },
        formatter: undefined
      }, 
      stroke: { 
        width: 10, 
      }, 
      plotOptions: { 
        pie: { 
          expandOnClick: false, 
          donut: { 
            size: "83%", 
            background: "#FFFFFF",  
            labels: { 
              show: true, 
              name: { 
                offsetY: 4, 
              }, 
              total: { 
                show: true, 
                fontSize: "20px", 
                fontFamily: "Rubik, sans-serif", 
                fontWeight: 500, 
                label: "200", 
                formatter: () => "Total Panels", 
              }, 
            }, 
          }, 
        }, 
      },
      tooltip: {
        enabled: true,
      },
      states: { 
        normal: { 
          filter: { 
            type: "none", 
          }, 
        }, 
        hover: { 
          filter: { 
            type: "none", 
          }, 
        }, 
        active: { 
          allowMultipleDataPointsSelection: false, 
          filter: { 
            type: "none", 
          }, 
        }, 
      }, 
      colors: ["#FB0C0C", "#FDA844", "#54BA4A"],
      responsive: [ 
        { 
          breakpoint: 1630, 
          options: { 
            chart: { 
              height: 360, 
            }, 
          }, 
        }, 
        { 
          breakpoint: 1584, 
          options: { 
            chart: { 
              height: 400, 
            }, 
          }, 
        }, 
        { 
          breakpoint: 1473, 
          options: { 
            chart: { 
              height: 250, 
            }, 
          }, 
        }, 
        { 
          breakpoint: 1425, 
          options: { 
            chart: { 
              height: 270, 
            }, 
          }, 
        }, 
        { 
          breakpoint: 1400, 
          options: { 
            chart: { 
              height: 300, 
            }, 
          }, 
        }, 
        { 
          breakpoint: 480, 
          options: { 
            chart: { 
              height: 250, 
            }, 
          }, 
        }, 
      ], 
    }, 
  };