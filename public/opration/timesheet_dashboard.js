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
        getTSDashboardData();
        
        

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
    });

    

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

    
});
    
