$('.daterangepicker-icon').daterangepicker({
    opens: 'left',
    drops: 'down',
    autoUpdateInput: false,
}, function(start, end, label) {
    $(".caregivers-patients-data-range").html("Date : " + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));
});

$('.daterangepicker-referral').daterangepicker({
    opens: 'left',
    drops: 'down',
    autoUpdateInput: false,
    ranges: {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    alwaysShowCalendars: true,
}, function(start, end, label) {
    $(".daterangepicker-referral span").html('<b>From :</b> ' + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

$(document).ready(function() {
    //-------------------------------------------------------------------------//
    // Referral Chart Start Here
    //-------------------------------------------------------------------------//
    var referralChartOptions = {
        series: [44, 55, 13, 43, 22],
        chart: {
            height: 300,
            type: "pie",
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                    download: true,
                },
                export: {
                    csv: {
                        filename: undefined,
                        columnDelimiter: ',',
                        headerCategory: 'category',
                        headerValue: 'value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: undefined,
                    },
                    png: {
                        filename: undefined,
                    }
                },
            },
        },
        labels: ["A", "B", "C", "D", "E"],
        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
    };
    var chart = new ApexCharts(document.querySelector("#referralChart"), referralChartOptions);
    chart.render();

    var coordinatorsChartOptions = {
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }],
        chart: {
            height: 220,
            type: 'area'
        },
        colors: ['#f58534'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        markers: {
            size: 4,
            colors: ["#f58534"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 6,
            }
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    };
    var chart = new ApexCharts(document.querySelector("#coordinatorsChart"), coordinatorsChartOptions);
    chart.render();
    chart.updateOptions({
        xaxis: {
            labels: {
                show: true
            }
        }
    })

    var caregiversChartOptions = {
        series: [{
            name: 'English',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Spanish',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Other',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        chart: {
            height: 220,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        colors:['#7eb73e', '#e6bc4b', '#d772e8'],
        markers: {
            size: 4,
            colors: ["#7eb73e"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 6,
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
            format: 'dd/MM/yy HH:mm'
            },
        },
    };
    var chart = new ApexCharts(document.querySelector("#caregiversChart"), caregiversChartOptions);
    chart.render();
    chart.updateOptions({
        xaxis: {
            labels: {
                show: true
            }
        }
    })

    var autoAPIChartOptions = {
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }],
        chart: {
            height: 220,
            type: 'area'
        },
        colors: ['#0083d9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        markers: {
            size: 4,
            colors: ["#0083d9"],
            strokeColors: "#fff",
            strokeWidth: 2,
            hover: {
                size: 6,
            }
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
            format: 'dd/MM/yy HH:mm'
            },
        },
    };
    var chart = new ApexCharts(document.querySelector("#autoAPIChart"), autoAPIChartOptions);
    chart.render();
    chart.updateOptions({
        xaxis: {
            labels: {
                show: true
            }
        }
    })

    var textMessagesChartOptions = {
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        }],
        chart: {
            height: 220,
            curve: 'smooth',
            // type: 'area'
        },
        colors: ['#931be5'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#931be5'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 0.5,
                stops: [0, 100, 100, 100]
            },
        },
        markers: {
            size: 6,
            colors: ["#000"],
            strokeColors: "#fff",
            strokeWidth: 4,
            hover: {
                size: 10,
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
            x: {
            format: 'dd/MM/yy HH:mm'
            },
        },
    };
    var chart = new ApexCharts(document.querySelector("#textMessagesChart"), textMessagesChartOptions);
    chart.render();
    chart.updateOptions({
        xaxis: {
            labels: {
                show: true
            }
        }
    })
});

$(document).ready(function() {
    var chart1;
    var chart2;
    var chart3;

    // Timesheet for mothly
    var initialCategories = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var weeklyCategories = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    $.ajax({
        type: 'GET',
        url: timesheet_month_wise,
        headers: {
            'X_CSRF_TOKEN':'{{ csrf_token() }}',
        },
        success: function (data) {
            var monthRequiredStr = [];
            $.each(data.data.requiredTimeSheet, function(idx2,val2) {
                monthRequiredStr.push(val2);
            })

            var monthSignedStr = [];
            $.each(data.data.signedTimeSheet, function(idx2,val2) {
                monthSignedStr.push(val2);
            })

            var monthRejectedStr = [];
            $.each(data.data.rejectedTimeSheet, function(idx2,val2) {
                monthRejectedStr.push(val2);
            })

            var monthApprovedStr = [];
            $.each(data.data.approvedTimeSheet, function(idx2,val2) {
                monthApprovedStr.push(val2);
            })

            var options = {
                chart: {
                    type: 'bar',
                    height: 350,
                },
                series: [{
                    name: 'Required',
                    data: monthRequiredStr
                }, {
                    name: 'Signed',
                    data: monthSignedStr
                }, {
                    name: 'Approved',
                    data: monthApprovedStr
                }, {
                    name: 'Rejected',
                    data: monthRejectedStr
                }],
                xaxis: {
                    categories: initialCategories,
                },
                dataLabels: {
                    enabled: false
                },
            };

            // Create and render the chart
            chart1 = new ApexCharts(document.querySelector("#chart"), options);
            chart1.render();

            $("#weeklyCount").text(data.data.weeklyCount);
            $("#todayCount").text(data.data.todayCount);
            $("#monthCount").text(data.data.monthCount);
        },
        error: function () {
            console.log('error');
        }
    }).done(function (result) {
        $.ajax({
            type: 'GET',
            url: timesheet_coordinator_wise,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            success: function (data) {
                var coordinatoRequiredStr = [];
                var coordinatorRequiredLabel= [];
                $.each(data.data.requiredCoordinatorTimesheet, function(idx2,val2) {
                    coordinatoRequiredStr.push(val2);
                    coordinatorRequiredLabel.push(idx2);
                })

                var options = {
                    chart: {
                        type: 'bar',
                        height: 350,
                    },
                    series: [{
                        name: 'Patients',
                        data: coordinatoRequiredStr
                    }],
                    xaxis: {
                        categories: coordinatorRequiredLabel,
                    },
                    dataLabels: {
                        enabled: false
                    },
                };

                // Create and render the chart
                chart2 = new ApexCharts(document.querySelector("#coordinator_chart"), options);
                chart2.render();
            },
            error: function () {
                console.log('error');
            }
        });
    });

    //Timesheet based on today
    $(document).on("click","#todayTimesheet", function() {
        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');
        $.ajax({
            type: 'GET',
            url: timesheet_today_wise,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            success: function (data) {
                var todayRequiredStr = [];
                $.each(data.data.requiredTodayTimesheet, function(idx2,val2) {
                    todayRequiredStr.push(val2);
                })

                var todaySignedStr = [];
                $.each(data.data.signedTodayTimesheet, function(idx2,val2) {
                    todaySignedStr.push(val2);
                })

                var todayRejectedStr = [];
                $.each(data.data.rejectedTodayTimesheet, function(idx2,val2) {
                    todayRejectedStr.push(val2);
                })

                var todayApprovedStr = [];
                $.each(data.data.approvedTodayTimesheet, function(idx2,val2) {
                    todayApprovedStr.push(val2);
                })

                chart1.updateSeries([{
                    name: 'Required',
                    data: todayRequiredStr
                }, {
                    name: 'Signed',
                    data: todaySignedStr
                }, {
                    name: 'Approved',
                    data: todayApprovedStr
                }, {
                    name: 'Rejected',
                    data: todayRejectedStr
                }]);

                var updatedCategories = ['01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM', '12:00 PM'];
                chart1.updateOptions({
                    chart: {
                        stacked: false,
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        categories: updatedCategories
                    }
                });
            },
            error: function () {
                console.log('error');
            }
        });
    });

    // Timesheet based on coordinator
    // $(document).on("click","#coordinatorTimesheet", function() {
    //     $(this).addClass('active');
    //     $.ajax({
    //         type: 'GET',
    //         url: timesheet_coordinator_wise,
    //         headers: {
    //             'X_CSRF_TOKEN':'{{ csrf_token() }}',
    //         },
    //         success: function (data) {
    //             var coordinatoRequiredStr = [];
    //             var coordinatorRequiredLabel = [];
    //             $.each(data.data.requiredCoordinatorTimesheet, function(idx2,val2) {
    //                 coordinatoRequiredStr.push(val2);
    //                 coordinatorRequiredLabel.push(idx2);
    //             })

    //             chart2.updateSeries([{
    //                 name: 'Timesheet',
    //                 data: coordinatoRequiredStr
    //             }]);

    //             chart2.updateOptions({
    //                 chart: {
    //                     stacked: true,
    //                 },
    //                 xaxis: {
    //                     categories: coordinatorRequiredLabel
    //                 },
    //                 dataLabels: {
    //                     enabled: false
    //                 },
    //             });
    //         },
    //         error: function () {
    //            console.log('error');
    //         }
    //     });
    // });

    $('.timesheet-daterangepicker-icon').daterangepicker({
        opens: 'left',
        drops: 'down',
        autoUpdateInput: false,
    }, function(start, end, label) {
        var startTime = start.format('MM-DD-YYYY');
        var endTime = end.format('MM-DD-YYYY');
        $(".Timesheets-data-range").html("Date : " + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));

        var days = daysdifference(startDate, endDate);
        if (days > 90) {
            $('.timesheet-daterangepicker-icon').val('');
            alert('Date range cannot be more than 90 days.');
        } else {
            $('.timesheet-daterangepicker-icon').val(start.format('MM-DD-YYYY') + ' - ' + end.format('MM-DD-YYYY'));
            $.ajax({
                type: 'GET',
                url: timesheet_date_wise,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                data: {
                    startTime: startTime,
                    endTime: endTime
                },
                success: function (data) {
                    var betweenDateRequired = [];
                    var betweenDateSigned = [];
                    var betweenDateRejected = [];
                    var betweenDateApproved = [];

                    var betweenDateRequiredLabel = [];
                    $.each(data.data.betweenRequiredTimeSheet, function(idx2,val2) {
                        if (typeof val2[1] !== 'undefined') {
                            betweenDateRequired.push(val2[1]);
                        }
                        if (typeof val2[2] !== 'undefined') {
                            betweenDateSigned.push(val2[2]);
                        }
                        if (typeof val2[3] !== 'undefined') {
                            betweenDateRejected.push(val2[3]);
                        }
                        if (typeof val2[4] !== 'undefined') {
                            betweenDateApproved.push(val2[4]);
                        }
                        betweenDateRequiredLabel.push(idx2);
                    })

                    chart1.updateSeries([{
                        name: 'Required',
                        data: betweenDateRequired
                    }, {
                        name: 'Signed',
                        data: betweenDateSigned
                    }, {
                        name: 'Approved',
                        data: betweenDateApproved
                    }, {
                        name: 'Rejected',
                        data: betweenDateRejected
                    }]);
                    chart1.updateOptions({
                        chart: {
                            stacked: true,
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: betweenDateRequiredLabel
                        }
                    });
                },
                error: function () {
                    console.log('error');
                }
            });
        }
    });

    function daysdifference(firstDate, secondDate){
        var startDay = new Date(firstDate);
        var endDay = new Date(secondDate);

        var millisBetween = startDay.getTime() - endDay.getTime();
        var days = millisBetween / (1000 * 3600 * 24);

        return Math.round(Math.abs(days));
    }
});
