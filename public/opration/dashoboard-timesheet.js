// $('.daterangepicker-icon').daterangepicker({
//     opens: 'left',
//     drops: 'down',
//     autoUpdateInput: false,
// }, function(start, end, label) {
//     $(".caregivers-patients-data-range").html("Date : " + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));
// });

// $('.daterangepicker-referral').daterangepicker({
//     opens: 'left',
//     drops: 'down',
//     autoUpdateInput: false,
//     ranges: {
//     'Today': [moment(), moment()],
//     'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
//     'Last 7 Days': [moment().subtract(6, 'days'), moment()],
//     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
//     'This Month': [moment().startOf('month'), moment().endOf('month')],
//     'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
//     },
//     alwaysShowCalendars: true,
// }, function(start, end, label) {
//     $(".daterangepicker-referral span").html('<b>From :</b> ' + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));
// });

$(document).ready(function() {
    var chart1;
    var chart2;
    var chart3;
    var chart4;
    var chart5;
    var chart6;

    var initialCategories = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    loader('chart-loader-t');

    $.ajax({
        type: 'GET',
        url: timesheet_weekly_wise,
        headers: {
            'X_CSRF_TOKEN':'{{ csrf_token() }}',
        },
        success: function (data) {
            var weeklyRequired = [];
            var weeklySigned = [];
            var weeklyRejected = [];
            var weeklyApproved = [];
            var weeklyLabel = [];
            var weeklyVisitDate = [];

            $("#total_required").text(data.data.totalRequired);
            $("#total_signed").text(data.data.totalSigned);
            $("#total_approved").text(data.data.totalApproved);
            $("#total_rejected").text(data.data.totalRejected);

            $.each(data.data.timesheet, function(idx2,val2) {
                weeklyRequired.push(val2['required']);
                weeklySigned.push(val2['signed']);
                weeklyApproved.push(val2['approved']);
                weeklyRejected.push(val2['rejected']);
                weeklyVisitDate.push(val2['visit_date']);

                weeklyLabel.push(idx2);
            })

            var options = {
                chart: {
                    type: 'bar',
                    height: 350,
                    events: {
                        click: function(event, chartContext, config) {

                            if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                var categoryIndex = config.dataPointIndex;
                                // var categoryName = weeklyLabel[categoryIndex];
                                var categoryDate = weeklyVisitDate[categoryIndex];
                                const status = config.seriesIndex + 1;

                                if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                    var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate;

                                    window.open(url, '_blank');
                                }
                            }
                        }
                    }
                },
                colors:['#267ec3', '#26e7a6', '#ff6178', '#febc3b'],
                series: [{
                    name: 'Required',
                    data: weeklyRequired
                }, {
                    name: 'Signed',
                    data: weeklySigned
                }, {
                    name: 'Rejected',
                    data: weeklyRejected
                }, {
                    name: 'Approved',
                    data: weeklyApproved
                }],
                xaxis: {
                    categories: weeklyLabel,
                },
                dataLabels: {
                    enabled: false
                },
            };

            if ($('#timesheet_chart').length) {
                chart1 = new ApexCharts(document.querySelector("#timesheet_chart"), options);
                chart1.render();
            }

            clearloader('chart-loader-t');
        },
        error: function () {
            alert("Server Timeout! Please try again", 'error');
            clearloader('chart-loader-t');
        }
    }).done(function (result) {
        loader('chart-loader-ht');
        loader('chart-loader-vt');
        $.ajax({
            type: 'GET',
            url: h_and_v_weekly_wise,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            success: function (data) {
                var weeklyHtTotal = [];
                var weeklyHtUnBlock = [];
                var weeklyHtLabel = [];
                var weeklyHtVisitDate = [];

                $("#total_h").text(data.data.H.total);
                $("#total_h_unblock").text(data.data.H.unBlockedTotal);

                $.each(data.data.timesheet.H, function(idx2,val2) {
                    weeklyHtTotal.push(val2['total']);
                    weeklyHtUnBlock.push(val2['unblocked']);
                    weeklyHtLabel.push(idx2);

                    weeklyHtVisitDate.push(val2['visit_date']);
                })

                var options = {
                    chart: {
                        type: 'bar',
                        height: 350,
                        events: {
                            click: function(event, chartContext, config) {

                                if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                    var categoryIndex = config.dataPointIndex;
                                    // var categoryName = weeklyHtLabel[categoryIndex];
                                    var categoryDate = weeklyHtVisitDate[categoryIndex];
                                    const status = config.seriesIndex + 1;

                                    if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                        var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate+'&slug=hospitalize';

                                        window.open(url, '_blank');
                                    }
                                }
                            }
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    series: [{
                        name: 'Total',
                        data: weeklyHtTotal
                    }, {
                        name: 'UnBlocked',
                        data: weeklyHtUnBlock
                    }],
                    xaxis: {
                        categories: weeklyHtLabel,
                    },
                    dataLabels: {
                        enabled: false
                    },
                };

                if ($('#hospitalization_chart').length) {
                    chart3 = new ApexCharts(document.querySelector("#hospitalization_chart"), options);
                    chart3.render();
                }

                var weeklyVtTotal = [];
                var weeklyVtUnBlock = [];
                var weeklyVtLabel = [];
                var weeklyVtVisitDate = [];

                $("#total_v").text(data.data.V.total);
                $("#total_v_unblock").text(data.data.V.unBlockedTotal);

                $.each(data.data.timesheet.V, function(idx2,val2) {
                    weeklyVtTotal.push(val2['total']);
                    weeklyVtUnBlock.push(val2['unblocked']);
                    weeklyVtLabel.push(idx2);

                    weeklyVtVisitDate.push(val2['visit_date']);
                })

                var options = {
                    chart: {
                        type: 'bar',
                        height: 350,
                        events: {
                            click: function(event, chartContext, config) {

                                if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                    var categoryIndex = config.dataPointIndex;
                                    // var categoryName = weeklyVtLabel[categoryIndex];
                                    var categoryDate = weeklyVtVisitDate[categoryIndex];
                                    const status = config.seriesIndex + 1;

                                    if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                        var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate+'&slug=vacation';

                                        window.open(url, '_blank');
                                    }
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Total',
                        data: weeklyVtTotal
                    }, {
                        name: 'UnBlocked',
                        data: weeklyVtUnBlock
                    }],
                    xaxis: {
                        categories: weeklyVtLabel,
                    },
                    dataLabels: {
                        enabled: false
                    },
                };

                if ($('#vacation_chart').length) {
                    chart4 = new ApexCharts(document.querySelector("#vacation_chart"), options);
                    chart4.render();
                }

                clearloader('chart-loader-ht');
                clearloader('chart-loader-vt');
            },
            error: function () {
                alert("Server Timeout! Please try again", 'error');
                clearloader('chart-loader-ht');
                clearloader('chart-loader-vt');
            }
        });
    }).done(function (result) {
        loader('chart-loader-lt');
        $.ajax({
            type: 'GET',
            url: live_in_weekly_wise,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            success: function (data) {
                var weeklyLtTotal = [];
                var weeklyLtUnBlock = [];
                var weeklyLtLabel = [];
                var weeklyLtVisitDate = [];

                $("#total_l").text(data.data.total);
                $("#total_l_unblock").text(data.data.unBlockedTotal);

                $.each(data.data.timesheet, function(idx2,val2) {
                    weeklyLtTotal.push(val2['total']);
                    weeklyLtUnBlock.push(val2['unblocked']);
                    weeklyLtLabel.push(idx2);

                    weeklyLtVisitDate.push(val2['visit_date']);
                })

                var options = {
                    chart: {
                        type: 'bar',
                        height: 350,
                        events: {
                            click: function(event, chartContext, config) {

                                if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                    var categoryIndex = config.dataPointIndex;
                                    // var categoryName = weeklyLtLabel[categoryIndex];
                                    var categoryDate = weeklyLtVisitDate[categoryIndex];
                                    const status = config.seriesIndex + 1;

                                    if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                        var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate+'&slug=live-in';

                                        window.open(url, '_blank');
                                    }
                                }
                            }
                        },
                        toolbar: {
                            show: false,
                        }
                    },
                    series: [{
                        name: 'Total',
                        data: weeklyLtTotal
                    }, {
                        name: 'UnBlocked',
                        data: weeklyLtUnBlock
                    }],
                    xaxis: {
                        categories: weeklyLtLabel,
                    },
                    dataLabels: {
                        enabled: false
                    },
                };

                if ($('#live_in_chart').length) {
                    chart5 = new ApexCharts(document.querySelector("#live_in_chart"), options);
                    chart5.render();
                }

                clearloader('chart-loader-lt');
            },
            error: function () {
                alert("Server Timeout! Please try again", 'error');
                clearloader('chart-loader-lt');
            }
        });
    }).done(function (result) {
        loader('chart-loader-wt');
        $.ajax({
            type: 'GET',
            url: weekend_timesheet,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            success: function (data) {
                var weeklyRequired = [];
                var weeklySigned = [];
                var weeklyRejected = [];
                var weeklyApproved = [];
                var weekendDateLabel = [];
                // var weeklyVisitDate = [];
                console.log(data.data);
                $("#total_wt_required").text(data.data.totalRequired);
                $("#total_wt_signed").text(data.data.totalSigned);
                $("#total_wt_approved").text(data.data.totalApproved);
                $("#total_wt_rejected").text(data.data.totalRejected);

                $.each(data.data.timesheet, function(idx2,val2) {
                    weeklyRequired.push(val2['required']);
                    weeklySigned.push(val2['signed']);
                    weeklyApproved.push(val2['approved']);
                    weeklyRejected.push(val2['rejected']);
                    // weeklyVisitDate.push(val2['visit_date']);

                    weekendDateLabel.push(idx2);
                })

                var options = {
                    chart: {
                        type: 'bar',
                        height: 350,
                        events: {
                            click: function(event, chartContext, config) {

                                if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                    var categoryIndex = config.dataPointIndex;
                                    var categoryDate = weekendDateLabel[categoryIndex];
                                    // var categoryDate = weeklyVisitDate[categoryIndex];
                                    const status = config.seriesIndex + 1;

                                    if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                        var url = timeshet_detail + '?status='+status+'&weekend_date='+categoryDate+'&slug=weekend';

                                        window.open(url, '_blank');
                                    }
                                }
                            }
                        }
                    },
                    colors:['#267ec3', '#26e7a6', '#ff6178', '#febc3b'],
                    series: [{
                        name: 'Required',
                        data: weeklyRequired
                    }, {
                        name: 'Signed',
                        data: weeklySigned
                    }, {
                        name: 'Rejected',
                        data: weeklyRejected
                    }, {
                        name: 'Approved',
                        data: weeklyApproved
                    }],
                    xaxis: {
                        categories: weekendDateLabel,
                    },
                    dataLabels: {
                        enabled: false
                    },
                };

                if ($('#weekend_timesheet_chart').length) {
                    chart6 = new ApexCharts(document.querySelector("#weekend_timesheet_chart"), options);
                    chart6.render();
                }

                clearloader('chart-loader-wt');
            },
            error: function () {
                alert("Server Timeout! Please try again", 'error');
                clearloader('chart-loader-wt');
            }
        })
    });

    $(document).on("click",".weekendTimesheet", function() {
        $("#timesheet_slug_wt").val('weekend_wise');

        var currentClass = $("#referesh_btn_wt").attr('class');
        $("#referesh_btn_wt").removeClass(currentClass).addClass('btn btn-blue weekendTimesheet');

        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-wt');
            $.ajax({
                type: 'GET',
                url: weekend_timesheet,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                data: {
                    chart_type: 'weekend_wise',
                    sessionName: 'button_week_wt_at',
                },
                success: function (data) {
                    $("#startTime_wt").val('');
                    $("#endTime_wt").val('');

                    var weeklyRequired = [];
                    var weeklySigned = [];
                    var weeklyRejected = [];
                    var weeklyApproved = [];
                    var weekendDateLabel = [];
                    // var weeklyVisitDate = [];
                    console.log(data.data);
                    $("#total_wt_required").text(data.data.totalRequired);
                    $("#total_wt_signed").text(data.data.totalSigned);
                    $("#total_wt_approved").text(data.data.totalApproved);
                    $("#total_wt_rejected").text(data.data.totalRejected);

                    $.each(data.data.timesheet, function(idx2,val2) {
                        weeklyRequired.push(val2['required']);
                        weeklySigned.push(val2['signed']);
                        weeklyApproved.push(val2['approved']);
                        weeklyRejected.push(val2['rejected']);
                        // weeklyVisitDate.push(val2['visit_date']);

                        weekendDateLabel.push(idx2);
                    })

                    chart6.updateSeries([{
                        name: 'Required',
                        data: weeklyRequired
                    }, {
                        name: 'Signed',
                        data: weeklySigned
                    }, {
                        name: 'Rejected',
                        data: weeklyRejected
                    }, {
                        name: 'Approved',
                        data: weeklyApproved
                    }]);

                    var updatedCategories = weekendDateLabel;
                    chart6.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {

                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        var categoryDate = weekendDateLabel[categoryIndex];
                                        // var categoryDate = weeklyVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&weekend_date='+categoryDate+'&slug=weekend';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        colors:['#267ec3', '#26e7a6', '#ff6178', '#febc3b'],
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: updatedCategories
                        }
                    });

                    clearloader('chart-loader-wt');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-wt');
                }
            });
        }
    });

    $(document).on("click",".visitTimesheet", function() {
        $("#timesheet_slug_wt").val('visit_wise');

        var currentClass = $("#referesh_btn_wt").attr('class');
        $("#referesh_btn_wt").removeClass(currentClass).addClass('btn btn-blue visitTimesheet');

        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-wt');
            $.ajax({
                type: 'GET',
                url: weekend_timesheet,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                data: {
                    chart_type: 'visit_wise',
                    sessionName: 'button_visit_wt_at',
                },
                success: function (data) {
                    $("#startTime_wt").val('');
                    $("#endTime_wt").val('');

                    var weeklyRequired = [];
                    var weeklySigned = [];
                    var weeklyRejected = [];
                    var weeklyApproved = [];
                    var weekendDateLabel = [];
                    // var weeklyVisitDate = [];
                    console.log(data.data);
                    $("#total_wt_required").text(data.data.totalRequired);
                    $("#total_wt_signed").text(data.data.totalSigned);
                    $("#total_wt_approved").text(data.data.totalApproved);
                    $("#total_wt_rejected").text(data.data.totalRejected);

                    $.each(data.data.timesheet, function(idx2,val2) {
                        weeklyRequired.push(val2['required']);
                        weeklySigned.push(val2['signed']);
                        weeklyApproved.push(val2['approved']);
                        weeklyRejected.push(val2['rejected']);
                        // weeklyVisitDate.push(val2['visit_date']);

                        weekendDateLabel.push(idx2);
                    })

                    chart6.updateSeries([{
                        name: 'Required',
                        data: weeklyRequired
                    }, {
                        name: 'Signed',
                        data: weeklySigned
                    }, {
                        name: 'Rejected',
                        data: weeklyRejected
                    }, {
                        name: 'Approved',
                        data: weeklyApproved
                    }]);

                    var updatedCategories = weekendDateLabel;
                    chart6.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {

                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        var categoryDate = weekendDateLabel[categoryIndex];
                                        // var categoryDate = weeklyVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&weekend_date='+categoryDate+'&slug=weekend-visit';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        colors:['#267ec3', '#26e7a6', '#ff6178', '#febc3b'],
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: updatedCategories
                        }
                    });

                    clearloader('chart-loader-wt');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-wt');
                }
            });
        }
    });

    $(document).on("click",".weeklyHospitalizeTimesheet", function() {
        $("#timesheet_slug").val('weekly');

        var currentClass = $("#referesh_btn_ht").attr('class');
        $("#referesh_btn_ht").removeClass(currentClass).addClass('btn btn-blue weeklyHospitalizeTimesheet');

        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-ht');
            $.ajax({
                type: 'GET',
                url: h_and_v_weekly_wise,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                data: {
                    sessionName: 'button_week_h',
                },
                success: function (data) {
                    var weeklyHtTotal = [];
                    var weeklyHtUnBlock = [];
                    var weeklyHtLabel = [];
                    var weeklyHtVisitDate = [];

                    $("#total_h").text(data.data.H.total);
                    $("#total_h_unblock").text(data.data.H.unBlockedTotal);

                    $.each(data.data.timesheet.H, function(idx2,val2) {
                        weeklyHtTotal.push(val2['total']);
                        weeklyHtUnBlock.push(val2['unblocked']);
                        weeklyHtVisitDate.push(val2['visit_date']);

                        weeklyHtLabel.push(idx2);
                    })

                    chart3.updateSeries([{
                        name: 'Total',
                        data: weeklyHtTotal
                    }, {
                        name: 'UnBlock',
                        data: weeklyHtUnBlock
                    }]);

                    var updatedCategories = weeklyHtLabel;
                    chart3.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {
                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        // var categoryName = weeklyHtLabel[categoryIndex];
                                        var categoryDate = weeklyHtVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate+'&slug=hospitalize';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: updatedCategories
                        }
                    });

                    clearloader('chart-loader-ht');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-ht');
                }
            });
        }
    });

    $(document).on("click",".monthlyHospitalizeTimesheet", function() {
        $("#timesheet_slug").val('monthly')

        var currentClass = $("#referesh_btn_ht").attr('class');
        $("#referesh_btn_ht").removeClass(currentClass).addClass('btn btn-blue monthlyHospitalizeTimesheet');

        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-ht');
            $.ajax({
                type: 'GET',
                url: timesheet_hospitalization,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                success: function (data) {
                    var monthlyHtTotal = [];
                    var monthlyHtUnBlock = [];

                    $("#total_h").text(data.data.total);
                    $("#total_h_unblock").text(data.data.unBlockedTotal);

                    $.each(data.data, function(idx2,val2) {
                        monthlyHtTotal.push(val2['total']);
                        monthlyHtUnBlock.push(val2['unblocked']);
                    })

                    chart3.updateSeries([{
                        name: 'Total',
                        data: monthlyHtTotal
                    }, {
                        name: 'UnBlocked',
                        data: monthlyHtUnBlock
                    }]);

                    chart3.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {
                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        var categoryName = initialCategories[categoryIndex];
                                        const status = config.seriesIndex + 1;
                                        if (typeof categoryName !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&month='+categoryName+'&slug=hospitalize';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: initialCategories
                        }
                    });

                    clearloader('chart-loader-ht');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-ht');
                }
            })
        }
    });

    $(document).on("click",".weeklyVacationTimesheet", function() {
        $("#timesheet_slug_vt").val('weekly');

        var currentClass = $("#referesh_btn_ht").attr('class');
        $("#referesh_btn_ht").removeClass(currentClass).addClass('btn btn-blue weeklyVacationTimesheet');

        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-vt');
            $.ajax({
                type: 'GET',
                url: h_and_v_weekly_wise,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                data: {
                    sessionName: 'button_week_v',
                },
                success: function (data) {
                    var weeklyVtTotal = [];
                    var weeklyVtUnBlock = [];
                    var weeklyVtLabel = [];
                    var weeklyVtVisitDate = [];

                    $("#total_v").text(data.data.V.total);
                    $("#total_v_unblock").text(data.data.V.unBlockedTotal);

                    $.each(data.data.timesheet.V, function(idx2,val2) {
                        weeklyVtTotal.push(val2['total']);
                        weeklyVtUnBlock.push(val2['unblocked']);
                        weeklyVtVisitDate.push(val2['visit_date']);

                        weeklyVtLabel.push(idx2);
                    })

                    chart4.updateSeries([{
                        name: 'Total',
                        data: weeklyVtTotal
                    }, {
                        name: 'UnBlock',
                        data: weeklyVtUnBlock
                    }]);

                    var updatedCategories = weeklyVtLabel;
                    chart4.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {

                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        // var categoryName = weeklyVtLabel[categoryIndex];
                                        var categoryDate = weeklyVtVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate+'&slug=vacation';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: updatedCategories
                        }
                    });

                    clearloader('chart-loader-vt');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-vt');
                }
            });
        }
    });

    $(document).on("click",".monthlyVacationTimesheet", function() {
        $("#timesheet_slug_vt").val('monthly');

        var currentClass = $("#referesh_btn_ht").attr('class');
        $("#referesh_btn_ht").removeClass(currentClass).addClass('btn btn-blue monthlyVacationTimesheet');

        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-vt');
            $.ajax({
                type: 'GET',
                url: timesheet_vacation,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                success: function (data) {
                    var monthvtHtTotal = [];
                    var monthvtHtUnBlock = [];

                    $("#total_v").text(data.data.total);
                    $("#total_v_unblock").text(data.data.unBlockedTotal);

                    $.each(data.data, function(idx2,val2) {
                        monthvtHtTotal.push(val2['total']);
                        monthvtHtUnBlock.push(val2['unblocked']);
                    })

                    chart4.updateSeries([{
                        name: 'Total',
                        data: monthvtHtTotal
                    }, {
                        name: 'UbBlocked',
                        data: monthvtHtUnBlock
                    }]);

                    chart4.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {
                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        var categoryName = initialCategories[categoryIndex];
                                        const status = config.seriesIndex + 1;
                                        if (typeof categoryName !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&month='+categoryName+'&slug=vacation';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: initialCategories
                        }
                    });
                    clearloader('chart-loader-vt');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-vt');
                }
            })
        }
    });

    $(document).on("click",".weeklyLiveInTimesheet", function() {
        $("#timesheet_slug_lt").val('weekly');

        var currentClass = $("#referesh_btn_ht").attr('class');
        $("#referesh_btn_ht").removeClass(currentClass).addClass('btn btn-blue weeklyLiveInTimesheet');

        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-lt');
            $.ajax({
                type: 'GET',
                url: live_in_weekly_wise,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                success: function (data) {
                    var weeklyLtTotal = [];
                    var weeklyLtUnBlock = [];
                    var weeklyLtLabel = [];
                    var weeklyLtVisitDate = [];

                    $("#total_l").text(data.data.total);
                    $("#total_l_unblock").text(data.data.unBlockedTotal);

                    $.each(data.data.timesheet, function(idx2,val2) {
                        weeklyLtTotal.push(val2['total']);
                        weeklyLtUnBlock.push(val2['unblocked']);
                        weeklyLtVisitDate.push(val2['visit_date']);

                        weeklyLtLabel.push(idx2);
                    })

                    chart5.updateSeries([{
                        name: 'Total',
                        data: weeklyLtTotal
                    }, {
                        name: 'UnBlock',
                        data: weeklyLtUnBlock
                    }]);

                    var updatedCategories = weeklyLtLabel;
                    chart5.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {

                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        // var categoryName = weeklyLtLabel[categoryIndex];
                                        var categoryDate = weeklyLtVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate+'&slug=live-in';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: updatedCategories
                        }
                    });

                    clearloader('chart-loader-lt');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-lt');
                }
            });
        }
    });

    $(document).on("click",".monthlyLiveInTimesheet", function() {
        $("#timesheet_slug_lt").val('monthly');

        var currentClass = $("#referesh_btn_ht").attr('class');
        $("#referesh_btn_ht").removeClass(currentClass).addClass('btn btn-blue monthlyLiveInTimesheet');

        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-lt');
            $.ajax({
                type: 'GET',
                url: monthly_live_in,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                success: function (data) {
                    var monthvtLtTotal = [];
                    var monthvtLtUnBlock = [];

                    $("#total_l").text(data.data.total);
                    $("#total_l_unblock").text(data.data.unBlockedTotal);

                    $.each(data.data, function(idx2,val2) {
                        monthvtLtTotal.push(val2['total']);
                        monthvtLtUnBlock.push(val2['unblocked']);
                    })

                    chart5.updateSeries([{
                        name: 'Total',
                        data: monthvtLtTotal
                    }, {
                        name: 'UbBlocked',
                        data: monthvtLtUnBlock
                    }]);

                    chart5.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {
                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        var categoryName = initialCategories[categoryIndex];
                                        const status = config.seriesIndex + 1;
                                        if (typeof categoryName !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&month='+categoryName+'&slug=live-in';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: initialCategories
                        }
                    });
                    clearloader('chart-loader-lt');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-lt');
                }
            })
        }
    });

    // Timesheet based on weekly
    $(document).on("click",".weeklyTimesheet", function() {
        $("#timesheet_slug_t").val('weekly');

        var currentClass = $("#referesh_btn_ht").attr('class');
        $("#referesh_btn_ht").removeClass(currentClass).addClass('btn btn-blue weeklyTimesheet');

        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-t');
            $.ajax({
                type: 'GET',
                url: timesheet_weekly_wise,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                success: function (data) {
                    var weeklyRequired = [];
                    var weeklySigned = [];
                    var weeklyRejected = [];
                    var weeklyApproved = [];
                    var weeklyLabel = [];
                    var weeklyVisitDate = [];

                    $("#total_required").text(data.data.totalRequired);
                    $("#total_signed").text(data.data.totalSigned);
                    $("#total_approved").text(data.data.totalApproved);
                    $("#total_rejected").text(data.data.totalRejected);

                    $.each(data.data.timesheet, function(idx2,val2) {
                        weeklyRequired.push(val2['required']);
                        weeklySigned.push(val2['signed']);
                        weeklyApproved.push(val2['approved']);
                        weeklyRejected.push(val2['rejected']);
                        weeklyVisitDate.push(val2['visit_date']);

                        weeklyLabel.push(idx2);
                    })

                    chart1.updateSeries([{
                        name: 'Required',
                        data: weeklyRequired
                    }, {
                        name: 'Signed',
                        data: weeklySigned
                    }, {
                        name: 'Rejected',
                        data: weeklyRejected
                    }, {
                        name: 'Approved',
                        data: weeklyApproved
                    }]);
                    chart1.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {

                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        var categoryDate = weeklyVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate;

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        colors:['#267ec3', '#26e7a6', '#ff6178', '#febc3b'],
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: weeklyLabel
                        }
                    });

                    clearloader('chart-loader-t');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-t');
                }
            });
        }
    });

    // Timesheet based on monthly
    $(document).on("click",".monthlyTimesheet", function() {
        $("#timesheet_slug_t").val('monthly');

        var currentClass = $("#referesh_btn_ht").attr('class');
        $("#referesh_btn_ht").removeClass(currentClass).addClass('btn btn-blue monthlyTimesheet');


        $('.timesheets-footer').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            loader('chart-loader-t');
            $.ajax({
                type: 'GET',
                url: timesheet_month_wise,
                headers: {
                    'X_CSRF_TOKEN':'{{ csrf_token() }}',
                },
                success: function (data) {
                    var monthlyRequired = [];
                    var monthlySigned = [];
                    var monthlyRejected = [];
                    var monthlyApproved = [];

                    $("#total_required").text(data.data.totalRequired);
                    $("#total_signed").text(data.data.totalSigned);
                    $("#total_approved").text(data.data.totalApproved);
                    $("#total_rejected").text(data.data.totalRejected);

                    $.each(data.data, function(idx2,val2) {
                        monthlyRequired.push(val2['required']);
                        monthlySigned.push(val2['signed']);
                        monthlyRejected.push(val2['rejected']);
                        monthlyApproved.push(val2['approved']);
                    })

                    chart1.updateSeries([{
                        name: 'Required',
                        data: monthlyRequired
                    }, {
                        name: 'Signed',
                        data: monthlySigned
                    }, {
                        name: 'Rejected',
                        data: monthlyRejected
                    }, {
                        name: 'Approved',
                        data: monthlyApproved
                    }]);

                    chart1.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {

                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        var categoryName = initialCategories[categoryIndex];
                                        const status = config.seriesIndex + 1;
                                        if (typeof categoryName !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&month='+categoryName;

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        colors:['#267ec3', '#26e7a6', '#ff6178', '#febc3b'],
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: initialCategories
                        }
                    });
                    clearloader('chart-loader-t');
                },
                error: function () {
                    alert("Server Timeout! Please try again", 'error');
                    clearloader('chart-loader-t');
                }
            })
        }
    });

    $(document).on("click",".refereshAll", function() {
        $(".weeklyHospitalizeTimesheet").click();
        $(".weeklyVacationTimesheet").click();
        $(".weeklyLiveInTimesheet").click();
        $(".weeklyTimesheet").click();
        $(".weekendTimesheet").click();
    });

    $(document).on("click",".dateHTimesheet", function() {
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();

        var dataUrl = $(this).attr('data-url');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            dateHAjax(dataUrl, startTime, endTime);
        }
    });

    $('.hospitaliz_date_picker').daterangepicker({
        opens: 'left',
        drops: 'down',
        autoUpdateInput: false,
        maxDate: moment()
    }, function(start, end, label) {
        var startTime = start.format('MM-DD-YYYY');
        var endTime = end.format('MM-DD-YYYY');
        $(".h-date-range").html("Date : " + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));

        var days = daysdifference(startTime, endTime);
        if (days > 90) {
            $('.hospitaliz_date_picker').val('');
            alert('Date range cannot be more than 90 days.');
        } else if (start.year() !== end.year()) {
            $('.hospitaliz_date_picker').val('');
            alert('Search with the same year.');
        } else {
            $("#timesheet_slug").val('date-range');

            var currentClass = $("#referesh_btn_ht").attr('class');
            $("#referesh_btn_ht").removeClass(currentClass).addClass('btn btn-blue dateHTimesheet');

            $("#startTime").val(startTime);
            $("#endTime").val(endTime);

            $('.hospitaliz_date_picker').val(start.format('MM-DD-YYYY') + ' - ' + end.format('MM-DD-YYYY'));

            var dataUrl = $('.hospitaliz_date_picker').attr('data-url');

            if ($(this).hasClass('button_disable')) {
                alert('Disable button for 1 hour');
            } else {
                $(this).addClass('button_disable');

                dateHAjax(dataUrl, startTime, endTime);
            }
        }
    });

    function dateHAjax(dataUrl, startTime, endTime)
    {
        loader('chart-loader-ht');
        $.ajax({
            type: 'GET',
            url: dataUrl,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            data: {
                startTime: startTime,
                endTime: endTime
            },
            success: function (data) {
                if (typeof data.data !== 'undefined' && data.data != null) {
                    var betweenHtTotal = [];
                    var betweenHtUnBlock = [];
                    var betweenHtLabel = [];
                    var weeklyHtVisitDate = [];

                    $.each(data.data.timesheetA, function(idx2,val2) {
                        betweenHtTotal.push(val2['total']);
                        betweenHtUnBlock.push(val2['unblocked']);
                        weeklyHtVisitDate.push(val2['visit_date']);

                        betweenHtLabel.push(idx2);
                    })
                    $("#total_h").text(data.data.total);
                    $("#total_h_unblock").text(data.data.unBlockedTotal);

                    chart3.updateSeries([{
                        name: 'Total',
                        data: betweenHtTotal
                    }, {
                        name: 'UnBlocked',
                        data: betweenHtUnBlock
                    }]);
                    chart3.updateOptions({
                        chart: {
                            stacked: true,
                            events: {
                                click: function(event, chartContext, config) {
                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        // var categoryName = weeklyHtLabel[categoryIndex];
                                        var categoryDate = weeklyHtVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate+'&slug=hospitalize';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: betweenHtLabel
                        }
                    });
                } else {
                    alert('Record Not Found.')
                }

                clearloader('chart-loader-ht');
            },
            error: function () {
                alert("Server Timeout! Please try again", 'error');
                clearloader('chart-loader-ht');
            }
        });
    }

    $(document).on("click",".dateLTimesheet", function() {
        var startTime = $("#startTime_lt").val();
        var endTime = $("#endTime_lt").val();

        var dataUrl = $(this).attr('data-url');
        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            dateLAjax(dataUrl, startTime, endTime);
        }
    });

    $('.live_in_date_picker').daterangepicker({
        opens: 'left',
        drops: 'down',
        autoUpdateInput: false,
        maxDate: moment()
    }, function(start, end, label) {
        var startTime = start.format('MM-DD-YYYY');
        var endTime = end.format('MM-DD-YYYY');
        $(".l-date-range").html("Date : " + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));

        var days = daysdifference(startTime, endTime);
        if (days > 90) {
            $('.live_in_date_picker').val('');
            alert('Date range cannot be more than 90 days.');
        } else if (start.year() !== end.year()) {
            $('.live_in_date_picker').val('');
            alert('Search with the same year.');
        } else {
            $("#timesheet_slug_lt").val('date-range');

            var currentClass = $("#referesh_btn_lt").attr('class');
            $("#referesh_btn_lt").removeClass(currentClass).addClass('btn btn-blue dateLTimesheet');

            $("#startTime_lt").val(startTime);
            $("#endTime_lt").val(endTime);

            $('.live_in_date_picker').val(start.format('MM-DD-YYYY') + ' - ' + end.format('MM-DD-YYYY'));

            var dataUrl = $('.live_in_date_picker').attr('data-url');

            if ($(this).hasClass('button_disable')) {
                alert('Disable button for 1 hour');
            } else {
                $(this).addClass('button_disable');

                dateLAjax(dataUrl, startTime, endTime);
            }
        }
    });

    function dateLAjax(dataUrl, startTime, endTime)
    {
        loader('chart-loader-lt');
        $.ajax({
            type: 'GET',
            url: dataUrl,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            data: {
                startTime: startTime,
                endTime: endTime
            },
            success: function (data) {
                if (typeof data.data !== 'undefined' && data.data != null) {
                    var betweenLtTotal = [];
                    var betweenLtUnBlock = [];
                    var betweenLtLabel = [];
                    var weeklyLtVisitDate = [];

                    $.each(data.data.timesheetA, function(idx2,val2) {
                        betweenLtTotal.push(val2['total']);
                        betweenLtUnBlock.push(val2['unblocked']);
                        weeklyLtVisitDate.push(val2['visit_date']);

                        betweenLtLabel.push(idx2);
                    })

                    $("#total_l").text(data.data.total);
                    $("#total_l_unblock").text(data.data.unBlockedTotal);

                    chart5.updateSeries([{
                        name: 'Total',
                        data: betweenLtTotal
                    }, {
                        name: 'UnBlocked',
                        data: betweenLtUnBlock
                    }]);

                    chart5.updateOptions({
                        chart: {
                            stacked: true,
                            events: {
                                click: function(event, chartContext, config) {

                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        // var categoryName = weeklyLtLabel[categoryIndex];
                                        var categoryDate = weeklyLtVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate+'&slug=live-in';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: betweenLtLabel
                        }
                    });
                } else {
                    alert('Record Not Found.')
                }
                clearloader('chart-loader-lt');
            },
            error: function () {
                alert("Server Timeout! Please try again", 'error');
                clearloader('chart-loader-lt');
            }
        });
    }

    $(document).on("click",".dateVTimesheet", function() {
        var startTime = $("#startTime_vt").val();
        var endTime = $("#endTime_vt").val();

        var dataUrl = $(this).attr('data-url');
        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            dateVAjax(dataUrl, startTime, endTime);
        }
    });

    $('.vacation_date_picker').daterangepicker({
        opens: 'left',
        drops: 'down',
        autoUpdateInput: false,
        maxDate: moment()
    }, function(start, end, label) {
        var startTime = start.format('MM-DD-YYYY');
        var endTime = end.format('MM-DD-YYYY');
        $(".v-date-range").html("Date : " + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));

        var days = daysdifference(startTime, endTime);
        if (days > 90) {
            $('.vacation_date_picker').val('');
            alert('Date range cannot be more than 90 days.');
        } else if (start.year() !== end.year()) {
            $('.vacation_date_picker').val('');
            alert('Search with the same year.');
        } else {
            $('.vacation_date_picker').val(start.format('MM-DD-YYYY') + ' - ' + end.format('MM-DD-YYYY'));
            $("#timesheet_slug_vt").val('date-range');

            var currentClass = $("#referesh_btn_vt").attr('class');
            $("#referesh_btn_vt").removeClass(currentClass).addClass('btn btn-blue dateVTimesheet');

            $("#startTime_vt").val(startTime);
            $("#endTime_vt").val(endTime);

            var dataUrl = $('.vacation_date_picker').attr('data-url');
            if ($(this).hasClass('button_disable')) {
                alert('Disable button for 1 hour');
            } else {
                $(this).addClass('button_disable');

                dateVAjax(dataUrl, startTime, endTime);
            }
        }
    });

    function dateVAjax(dataUrl, startTime, endTime)
    {
        loader('chart-loader-vt');
        $.ajax({
            type: 'GET',
            url: dataUrl,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            data: {
                startTime: startTime,
                endTime: endTime
            },
            success: function (data) {
                if (typeof data.data !== 'undefined' && data.data != null) {
                    var betweenVtTotal = [];
                    var betweenVtUnBlock = [];
                    var betweenVtLabel = [];
                    var weeklyVtVisitDate = [];

                    $.each(data.data.timesheetA, function(idx2,val2) {
                        betweenVtTotal.push(val2['total']);
                        betweenVtUnBlock.push(val2['unblocked']);
                        weeklyVtVisitDate.push(val2['visit_date']);

                        betweenVtLabel.push(idx2);
                    })

                    $("#total_v").text(data.data.total);
                    $("#total_v_unblock").text(data.data.unBlockedTotal);

                    chart4.updateSeries([{
                        name: 'Total',
                        data: betweenVtTotal
                    }, {
                        name: 'UnBlocked',
                        data: betweenVtUnBlock
                    }]);

                    chart4.updateOptions({
                        chart: {
                            stacked: true,
                            events: {
                                click: function(event, chartContext, config) {

                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        // var categoryName = weeklyVtLabel[categoryIndex];
                                        var categoryDate = weeklyVtVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate+'&slug=vacation';

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: betweenVtLabel
                        }
                    });
                } else {
                    alert('Record Not Found.')
                }

                clearloader('chart-loader-vt');
            },
            error: function () {
                alert("Server Timeout! Please try again", 'error');
                clearloader('chart-loader-vt');
            }
        });
    }

    $(document).on("click",".dateTimesheet", function() {
        var startTime = $("#startTime_t").val();
        var endTime = $("#endTime_t").val();

        var dataUrl = $(this).attr('data-url');
        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            ateTAjax(dataUrl, startTime, endTime);
        }
    });

    $('.timesheet_date_picker').daterangepicker({
        opens: 'left',
        drops: 'down',
        autoUpdateInput: false,
        maxDate: moment()
    }, function(start, end, label) {
        var startTime = start.format('MM-DD-YYYY');
        var endTime = end.format('MM-DD-YYYY');
        $(".t-date-range").html("Date : " + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));

        var days = daysdifference(startTime, endTime);
        if (days > 90) {
            $('.timesheet_date_picker').val('');
            alert('Date range cannot be more than 90 days.');
        } else if (start.year() !== end.year()) {
            $('.timesheet_date_picker').val('');
            alert('Search with the same year.');
        } else {
            $('.timesheet_date_picker').val(start.format('MM-DD-YYYY') + ' - ' + end.format('MM-DD-YYYY'));
            $("#timesheet_slug_t").val('date-range');

            var currentClass = $("#referesh_btn_t").attr('class');
            $("#referesh_btn_t").removeClass(currentClass).addClass('btn btn-blue dateTimesheet');

            $("#startTime_t").val(startTime);
            $("#endTime_t").val(endTime);

            var dataUrl = $('.timesheet_date_picker').attr('data-url');
            if ($(this).hasClass('button_disable')) {
                alert('Disable button for 1 hour');
            } else {
                $(this).addClass('button_disable');

                dateTAjax(dataUrl, startTime, endTime);
            }
        }
    });

    function dateTAjax(dataUrl, startTime, endTime)
    {
        loader('chart-loader-t');
        $.ajax({
            type: 'GET',
            url: dataUrl,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            data: {
                startTime: startTime,
                endTime: endTime
            },
            success: function (data) {
                if (typeof data.data !== 'undefined' && data.data != null) {
                    var weeklyRequired = [];
                    var weeklySigned = [];
                    var weeklyRejected = [];
                    var weeklyApproved = [];
                    var weeklyLabel = [];

                    $("#total_required").text(data.data.totalRequired);
                    $("#total_signed").text(data.data.totalSigned);
                    $("#total_approved").text(data.data.totalApproved);
                    $("#total_rejected").text(data.data.totalRejected);

                    $.each(data.data.timesheetA, function(idx2,val2) {
                        weeklyRequired.push(val2['required']);
                        weeklySigned.push(val2['signed']);
                        weeklyApproved.push(val2['approved']);
                        weeklyRejected.push(val2['rejected']);

                        weeklyLabel.push(idx2);
                    })

                    chart1.updateSeries([{
                        name: 'Required',
                        data: weeklyRequired
                    }, {
                        name: 'Signed',
                        data: weeklySigned
                    }, {
                        name: 'Rejected',
                        data: weeklyRejected
                    }, {
                        name: 'Approved',
                        data: weeklyApproved
                    }]);

                    chart1.updateOptions({
                        chart: {
                            stacked: true,
                            events: {
                                click: function(event, chartContext, config) {
                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        var categoryDate = weeklyLabel[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            var url = timeshet_detail + '?status='+status+'&visit_date='+categoryDate;

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        colors:['#267ec3', '#26e7a6', '#ff6178', '#febc3b'],
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: weeklyLabel
                        }
                    });
                } else {
                    alert('Record Not Found.')
                }

                clearloader('chart-loader-t');
            },
            error: function () {
                alert("Server Timeout! Please try again", 'error');
                clearloader('chart-loader-t');
            }
        });
    }

    $(document).on("click",".dateWTimesheet", function() {
        var startTime = $("#startTime_wt").val();
        var endTime = $("#endTime_wt").val();

        var dataUrl = $(this).attr('data-url');

        if ($(this).hasClass('button_disable')) {
            alert('Disable button for 1 hour');
        } else {
            $(this).addClass('button_disable');

            dateWTAjax(dataUrl, startTime, endTime);
        }
    });

    $('.weekend_date_picker').daterangepicker({
        opens: 'left',
        drops: 'down',
        autoUpdateInput: false,
        maxDate: moment()
    }, function(start, end, label) {
        var startTime = start.format('MM-DD-YYYY');
        var endTime = end.format('MM-DD-YYYY');
        $(".wt-date-range").html("Date : " + start.format('MM-DD-YYYY') + ' <b>to</b> ' + end.format('MM-DD-YYYY'));

        var days = daysdifference(startTime, endTime);
        if (days > 90) {
            $('.weekend_date_picker').val('');
            alert('Date range cannot be more than 90 days.');
        } else if (start.year() !== end.year()) {
            $('.weekend_date_picker').val('');
            alert('Search with the same year.');
        } else {
            // $("#timesheet_slug_wt").val('date-range');

            var currentClass = $("#referesh_btn_wt").attr('class');
            $("#referesh_btn_wt").removeClass(currentClass).addClass('btn btn-blue dateWTimesheet');

            $("#startTime_wt").val(startTime);
            $("#endTime_wt").val(endTime);

            $('.weekend_date_picker').val(start.format('MM-DD-YYYY') + ' - ' + end.format('MM-DD-YYYY'));

            var dataUrl = $('.weekend_date_picker').attr('data-url');

            if ($(this).hasClass('button_disable')) {
                alert('Disable button for 1 hour');
            } else {
                $(this).addClass('button_disable');

                dateWTAjax(dataUrl, startTime, endTime);
            }
        }
    });

    function dateWTAjax(dataUrl, startTime, endTime)
    {
        var chart_type = $("#timesheet_slug_wt").val();

        loader('chart-loader-wt');
        $.ajax({
            type: 'GET',
            url: dataUrl,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },
            data: {
                startTime: startTime,
                endTime: endTime,
                chart_type: chart_type
            },
            success: function (data) {
                if (typeof data.data !== 'undefined' && data.data != null) {
                    var weeklyRequired = [];
                    var weeklySigned = [];
                    var weeklyRejected = [];
                    var weeklyApproved = [];
                    var weekendDateLabel = [];
                    // var weeklyVisitDate = [];
                    console.log(data.data);
                    $("#total_wt_required").text(data.data.totalRequired);
                    $("#total_wt_signed").text(data.data.totalSigned);
                    $("#total_wt_approved").text(data.data.totalApproved);
                    $("#total_wt_rejected").text(data.data.totalRejected);

                    $.each(data.data.timesheet, function(idx2,val2) {
                        weeklyRequired.push(val2['required']);
                        weeklySigned.push(val2['signed']);
                        weeklyApproved.push(val2['approved']);
                        weeklyRejected.push(val2['rejected']);
                        // weeklyVisitDate.push(val2['visit_date']);

                        weekendDateLabel.push(idx2);
                    })

                    chart6.updateSeries([{
                        name: 'Required',
                        data: weeklyRequired
                    }, {
                        name: 'Signed',
                        data: weeklySigned
                    }, {
                        name: 'Rejected',
                        data: weeklyRejected
                    }, {
                        name: 'Approved',
                        data: weeklyApproved
                    }]);

                    var updatedCategories = weekendDateLabel;
                    chart6.updateOptions({
                        chart: {
                            stacked: false,
                            events: {
                                click: function(event, chartContext, config) {

                                    if (config && config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
                                        var categoryIndex = config.dataPointIndex;
                                        var categoryDate = weekendDateLabel[categoryIndex];
                                        // var categoryDate = weeklyVisitDate[categoryIndex];
                                        const status = config.seriesIndex + 1;

                                        if (typeof categoryDate !== 'undefined' && typeof status !== 'undefined') {
                                            if (chart_type === 'visit_wise') {
                                                var url = timeshet_detail + '?status='+status+'&weekend_date='+categoryDate+'&slug=weekend-visit';
                                            } else {
                                                var url = timeshet_detail + '?status='+status+'&weekend_date='+categoryDate+'&slug=weekend';
                                            }

                                            window.open(url, '_blank');
                                        }
                                    }
                                }
                            }
                        },
                        colors:['#267ec3', '#26e7a6', '#ff6178', '#febc3b'],
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: updatedCategories
                        }
                    });
                } else {
                    alert('Record Not Found.')
                }

                clearloader('chart-loader-wt');
            },
            error: function () {
                alert("Server Timeout! Please try again", 'error');
                clearloader('chart-loader-wt');
            }
        });
    }

    $('body').on('click', '.exportTimesheetBtn', function (e) {
        e.preventDefault();

        var t = $(this);
        var url = t.attr("data-url");
        var frmId = t.attr("data-frm");
        var loaderClass = t.attr("data-loader");
        var formdata = new FormData($("#"+frmId)[0]);

        loader(loaderClass);
        $.ajax({
            url: url,
            method: 'POST',
            xhrFields: {
                responseType: 'blob' // Set the response type to 'blob' for binary data.
            },
            data: formdata,
            processData: false, // Prevent jQuery from processing the data
            contentType: false, // Prevent jQuery from setting a Content-Type header
            success: function (response) {
                clearloader(loaderClass);

                alert('Dowload Successfully', 'success');
                var blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // Create a URL for the Blob.
                var url = window.URL.createObjectURL(blob);

                // Create an invisible <a> element to trigger the download.
                var a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'weekly-data.xlsx'; // Set the desired file name and extension.

                // Trigger a click event to start the download.
                document.body.appendChild(a);
                a.click();

                // Clean up the object URL.
                window.URL.revokeObjectURL(url);
                // hidePopup(frmId);
            },
            error:function (error) {
                alert("Server Timeout! Please try again", 'error');
                clearloader(loaderClass);
            }
        });
    });

    function daysdifference(firstDate, secondDate){
        var startDay = new Date(firstDate);
        var endDay = new Date(secondDate);

        var millisBetween = startDay.getTime() - endDay.getTime();
        var days = millisBetween / (1000 * 3600 * 24);

        return Math.round(Math.abs(days));
    }

    function loader(className) {
        $("."+className).show();
    }

    function clearloader(className) {
        $("."+className).hide();
    }
});
