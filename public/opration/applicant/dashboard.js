var applicantStatus;
var applicantprogress;
var applicant2progress;
var applicantDocumente1;    
var applicantDocumente2;

$(document).ready(function () {  
    // 1 - Weekly Applicant status wise pie chart start    
    var statusSeriesData = [
        weeklyStatusCounts.Active || 0,
        weeklyStatusCounts.Hold || 0,
        weeklyStatusCounts.InReview || 0,
        weeklyStatusCounts.Reject || 0,
    ];
   
    var statusLabelsData = ['active', 'Hold', 'In Review', 'Reject'];

    var statusChartOptions = {
        series: statusSeriesData,
        chart: {
            height: 300,
            type: "pie",
            toolbar: {
                show: false,              
            },
        },
        labels: statusLabelsData,
        colors: ['#2E93fA', '#546E7A', '#FF9800', '#E91E63'],
    };

    if ($('#applicantStatusChart').length) {
      applicantStatus = new ApexCharts(document.querySelector("#applicantStatusChart"), statusChartOptions);
      applicantStatus.render();
    }
    // Weekly Applicant status wise pie chart end

    // 2 - Weekly Applicant progress wise pie chart start    
    var percentageSeriesData = [
        progressCounts["0-20%"] || 0,
        progressCounts["21-40%"] || 0,
        progressCounts["41-60%"] || 0,
        progressCounts["61-80%"] || 0,
        progressCounts["81-100%"] || 0
    ];
    
    var progressLabelsData = ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'];

    var progressChartOptions = {
        series: percentageSeriesData,
        chart: {
            height: 300,
            type: "pie",
            toolbar: {
                show: false,              
            },
        },
        labels: progressLabelsData,
        colors: ['#2E93fA', '#546E7A', '#E91E63', '#FF9800', '#66DA26'],
    };

    if ($('#applicantPercentangeChart').length) {
        applicantprogress = new ApexCharts(document.querySelector("#applicantPercentangeChart"), progressChartOptions);
        applicantprogress.render();
    }
    // 2 - Weekly Applicant progress wise pie chart end
    
    // 3 - Weekly Applicant 2 phase progress wise pie chart start    
    var stepLabelsData = ['Step 1', 'Step 2', 'Overall'];  
    var progress2ChartOptions = {
          series: [
            {
                name: "0-20%",
                data: [progress1PhaseCounts['0-20%'], progress2PhaseCounts['0-20%'], (progress1PhaseCounts['0-20%'] + progress2PhaseCounts['0-20%'])],
            },
            {
                name: "21-40%",
                data: [progress1PhaseCounts['21-40%'], progress2PhaseCounts['21-40%'], (progress1PhaseCounts['21-40%'] + progress2PhaseCounts['21-40%'])],
            },
            {
                name: "41-60%",
                data: [progress1PhaseCounts['41-60%'], progress2PhaseCounts['41-60%'], (progress1PhaseCounts['41-60%'] + progress2PhaseCounts['41-60%'])],
            },
            {
                name: "61-80%",
                data: [progress1PhaseCounts['61-80%'], progress2PhaseCounts['61-80%'], (progress1PhaseCounts['61-80%'] + progress2PhaseCounts['61-80%'])],
            },
            {
                name: "81-100%",
                data: [progress1PhaseCounts['81-100%'], progress2PhaseCounts['81-100%'], (progress1PhaseCounts['81-100%'] + progress2PhaseCounts['81-100%'])],
            }
        ],
        chart: {
            type: 'bar',
            height: 300,
            stacked: true,
            toolbar: {
              show: false
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
                endingShape: 'rounded',
            },
        },        
        xaxis: {
            categories: stepLabelsData,
        },
        colors: ['#2E93fA', '#546E7A', '#E91E63', '#FF9800', '#66DA26'],
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
    };
  
    if ($('#applicant2PercentangeChart').length) {
      applicant2progress = new ApexCharts(document.querySelector("#applicant2PercentangeChart"), progress2ChartOptions);
      applicant2progress.render();
    }   
    // 3 - Weekly Applicant 2 phase progress wise pie chart end    
});


$('.daterangepicker-icon').daterangepicker({
    opens: 'left',
    drops: 'down',
    autoUpdateInput: false,
    // maxDate: moment()
});

// Handle date selection
$('.daterangepicker-icon').on('apply.daterangepicker', function (ev, picker) { 
    var startDate = picker.startDate.format('MM-DD-YYYY');
    var endDate = picker.endDate.format('MM-DD-YYYY');
    
    var parentsDiv = $(this).parents('.section-box');

    parentsDiv.find('.show-date-range').html("Date : " + startDate + ' <b>to</b> ' + endDate);

    var days = daysdifference(startDate, endDate);
    // if (days > 90) {
    //     $(this).val('');
    //     alert('Date range cannot be more than 90 days.');     
    // } else {
        var currentChart = parentsDiv.find(".chart").val();
        parentsDiv.find(".chart_slug").val('date-range');
        parentsDiv.find(".startDate").val(startDate);
        parentsDiv.find(".endDate").val(endDate);
        var dataUrl = $(this).attr('data-url');
       
        $.ajax({
            type: 'GET',
            url: dataUrl,
            headers: {
                'X_CSRF_TOKEN':'{{ csrf_token() }}',
            },         
            data: {
                'period': 'date-range',
                'startDate' : startDate,
                'endDate' : endDate,
            },  
            success: function (data) {
                if (currentChart === 'applicant-status') {
                    var monthlyAsApplicant = data.data.statusCounts.Active || 0;
                    var monthlyAsHold = data.data.statusCounts.Hold || 0;
                    var monthlyAsInReview =data.data.statusCounts.InReview || 0;
                    var monthlyAsReject = data.data.statusCounts.Reject || 0;
    
                    // var allStatusCounts = data.data.allStatusCounts || 0;
                    // $currentElement.find('.applicant_count').text(allStatusCounts);
                   
                    applicantStatus.updateSeries([
                        monthlyAsApplicant,
                        monthlyAsHold,
                        monthlyAsInReview,
                        monthlyAsReject
                    ]);
                } else if (currentChart === 'applicant-document') {                     
                    var mustHaveDocument = data.data.pendingDocumentsCount.mustHave;
                    var shouldHaveDocument = data.data.pendingDocumentsCount.shouldHave;
                 
                    var documentSeriesData = [];
        
                    for (var key in mustHaveDocument) {
                        documentSeriesData.push({
                            name: key,
                            data: [mustHaveDocument[key], 0]
                        });
                    }
        
                    for (var key in shouldHaveDocument) {
                        documentSeriesData.push({
                            name: key,
                            data: [0, shouldHaveDocument[key]]
                        });
                    }      
                    applicantDocumente1.updateSeries(documentSeriesData);
                } else if (currentChart === 'applicant-percentange') { // Applicant percentage in pie chart
                    var progress_0_20 = data.data.progressCounts["0-20%"] || 0;
                    var progress_21_40 = data.data.progressCounts["21-40%"] || 0;
                    var progress_41_60 =data.data.progressCounts["41-60%"] || 0;
                    var progress_61_80 = data.data.progressCounts["61-80%"] || 0;
                    var progress_81_100 = data.data.progressCounts["81-100%"] || 0;
                
                    // var allprogressCounts = data.data.allprogressCounts || 0;
                    // $currentElement.find('.applicant_count').text(allprogressCounts);
                
                    applicantprogress.updateSeries([
                        progress_0_20,
                        progress_21_40,
                        progress_41_60,
                        progress_61_80,
                        progress_81_100
                    ]);
                } else if (currentChart === 'applicant-2-phase-percentage') { // Applicant percentage 2 phase in bar chart             
                    const progress1PhaseCounts = data.data.progress1PhaseCounts || {};
                    const progress2PhaseCounts = data.data.progress2PhaseCounts || {};
            
                    // $currentElement.find('.applicant_count').text(data.data.progressPhaseAllCounts);
    
                    const getSafeValue = (obj, key) => Number(obj[key] || 0);
    
                    applicant2progress.updateSeries([
                        {
                            name: "0-20%",
                            data: [
                                getSafeValue(progress1PhaseCounts, '0-20%'),
                                getSafeValue(progress2PhaseCounts, '0-20%'),
                                getSafeValue(progress1PhaseCounts, '0-20%') + getSafeValue(progress2PhaseCounts, '0-20%')
                            ],
                        },
                        {
                            name: "21-40%",
                            data: [
                                getSafeValue(progress1PhaseCounts, '21-40%'),
                                getSafeValue(progress2PhaseCounts, '21-40%'),
                                getSafeValue(progress1PhaseCounts, '21-40%') + getSafeValue(progress2PhaseCounts, '21-40%')
                            ],
                        },
                        {
                            name: "41-60%",
                            data: [
                                getSafeValue(progress1PhaseCounts, '41-60%'),
                                getSafeValue(progress2PhaseCounts, '41-60%'),
                                getSafeValue(progress1PhaseCounts, '41-60%') + getSafeValue(progress2PhaseCounts, '41-60%')
                            ],
                        },
                        {
                            name: "61-80%",
                            data: [
                                getSafeValue(progress1PhaseCounts, '61-80%'),
                                getSafeValue(progress2PhaseCounts, '61-80%'),
                                getSafeValue(progress1PhaseCounts, '61-80%') + getSafeValue(progress2PhaseCounts, '61-80%')
                            ],
                        },
                        {
                            name: "81-100%",
                            data: [
                                getSafeValue(progress1PhaseCounts, '81-100%'),
                                getSafeValue(progress2PhaseCounts, '81-100%'),
                                getSafeValue(progress1PhaseCounts, '81-100%') + getSafeValue(progress2PhaseCounts, '81-100%')
                            ],
                        }
                    ]);
                } else if (currentChart === 'applicant-today') { // Applicant today count  
                    $(".todayCount").text(data.data.allStatusCounts);
                }
            },
            error: function () {
                alert("Server Timeout! Please try again", 'error');
            }
        })
    // }
});

var ajaxCallMade = false;
$(".dashboard-tabs-main-container .dashboard-tabs .tab").on("click", function () {
    var targeted_tab_content = $(this).attr("tab-content-name");
    if($(this).hasClass("active")){
       return;
    } else {
        $(".dashboard-tabs-main-container .dashboard-tabs .tab").removeClass("active");
        $(this).addClass("active");


        $(".dashboard-tabs-content .tab-content").removeClass("current");
        $('.dashboard-tabs-content [tab-content="' + targeted_tab_content + '"]').addClass("current");

        if (targeted_tab_content === 'dashboard-2-content') {               
            if (!ajaxCallMade) {  
                $.ajax({
                    type: 'GET',
                    url: fetch_applicant_pending_document,
                    headers: {
                        'X_CSRF_TOKEN':'{{ csrf_token() }}',
                    },         
                    data: {
                        'period': 'weekly'
                    },  
                    success: function (data) {  
                                
                        var documentLabelsData = ['Must Have', 'Should Have'];  
                        var mustHaveDocument = data.data.pendingDocumentsCount.mustHave;
                        var shouldHaveDocument = data.data.pendingDocumentsCount.shouldHave;
                        $('.applicant-document-weekly-count').text(data.data.totalApplicantPendingDocument);
                        
                        var documentSeriesData = [];

                        for (var key in mustHaveDocument) {
                            documentSeriesData.push({
                                name: key,
                                data: [mustHaveDocument[key], 0]
                            });
                        }

                        // Process Should Have documents
                        for (var key in shouldHaveDocument) {
                            documentSeriesData.push({
                                name: key,
                                data: [0, shouldHaveDocument[key]] // 0 for Must Have category, value for Should Have
                            });
                        }

                        var applicantDocumente1ChartOptions = {
                            series: documentSeriesData,
                            chart: {
                                type: 'bar',
                                height: 300,
                                stacked: true,
                                toolbar: {
                                    show: false
                                },
                            },
                            plotOptions: {
                                bar: {
                                    horizontal: false,
                                    columnWidth: '45%',
                                    endingShape: 'rounded',
                                },
                            },        
                            xaxis: {
                                categories: documentLabelsData,
                            },
                            colors: [
                                '#74C4F9', '#A0C6D7', '#F9A8D4', '#FFB574', '#B2F4A9', '#E0E0E0', 
                                '#B3E5FC', '#B0BEC5', '#FFCDD2', '#FFECB3', '#C8E6C9', '#FFEB3B', 
                                '#FF9800', '#FFE57F'
                            ],
                            legend: {
                                position: 'right',
                                offsetY: 40
                            },
                            fill: {
                                opacity: 1
                            }
                        };
                        
                        if ($('#applicantDocumenteChart').length) {
                            applicantDocumente1 = new ApexCharts(document.querySelector("#applicantDocumenteChart"), applicantDocumente1ChartOptions);
                            applicantDocumente1.render();
                        }   

                        const pendingAffidavitSignCount = data.data.pendingAffidavitSignCount;
                        $('.applicant-affidavit-weekly-count').text(data.data.totalApplicantPendingAffidavit);

                        const affidavitLabelsData = Object.keys(pendingAffidavitSignCount);
                        const affidavitSeriesData = [{
                            name: 'Sign Count',
                            data: Object.values(pendingAffidavitSignCount)
                        }];

                        var applicantDocumente2ChartOptions = {
                            series: affidavitSeriesData, // Dynamic series data
                            chart: {
                                type: 'bar',
                                height: 300,
                                stacked: true,
                                toolbar: {
                                    show: false
                                },
                            },
                            plotOptions: {
                                bar: {
                                    horizontal: false,
                                    columnWidth: '45%',
                                    endingShape: 'rounded',
                                },
                            },
                            xaxis: {
                                categories: affidavitLabelsData,
                            },
                            colors: [
                                '#74C4F9'
                            ],
                            legend: {
                                position: 'right',
                                offsetY: 40
                            },
                            fill: {
                                opacity: 1
                            }
                        };

                        if ($('#applicantAffidavitChart').length) {
                            applicantDocumente2 = new ApexCharts(document.querySelector("#applicantAffidavitChart"), applicantDocumente2ChartOptions);
                            applicantDocumente2.render();
                        }
                       
                        ajaxCallMade = true;                        
                    },
                    error: function () {
                        alert("Server Timeout! Please try again", 'error');
                        
                    }
                })   
            }                
        }
    }
});

$(document).on("click",".chartOnClick", function() {
    var $currentElement = $(this);
    var period = $(this).attr('data-period');   
    var parentsDiv = $(this).parents('.section-box');  
    var slug = parentsDiv.find(".chart").val();    

    parentsDiv.find(".chart_slug").val(period);    
    parentsDiv.find('.box-footer a').removeClass('active');
    $(this).addClass('active');
    var currentChart = parentsDiv.find(".chart").val();

    var dataUrl = parentsDiv.find('.box-footer').attr('data-url');
    
    if (typeof dataUrl == 'undefined') {
        var dataUrl = $(this).attr('data-url');   
    }
   
    $.ajax({
        type: 'GET',
        url: dataUrl,
        headers: {
            'X_CSRF_TOKEN':'{{ csrf_token() }}',
        },         
        data: {
          'period': period,
          'slug': slug,
        },  
        success: function (data) {            
            if (currentChart === 'applicant-status') { // Applicant status wise pie chart
                var monthlyAsApplicant = data.data.statusCounts.Active || 0;
                var monthlyAsHold = data.data.statusCounts.Hold || 0;
                var monthlyAsInReview =data.data.statusCounts.InReview || 0;
                var monthlyAsReject = data.data.statusCounts.Reject || 0;

                var allStatusCounts = data.data.allStatusCounts || 0;
                $currentElement.find('.applicant_count').text(allStatusCounts);
               
                applicantStatus.updateSeries([
                    monthlyAsApplicant,
                    monthlyAsHold,
                    monthlyAsInReview,
                    monthlyAsReject
                ]);
            } else if (currentChart === 'applicant-document') { // Applicant pending document bar chart
                var mustHaveDocument = data.data.pendingDocumentsCount.mustHave;
                var shouldHaveDocument = data.data.pendingDocumentsCount.shouldHave;
                $currentElement.find('.applicant_count').text(data.data.totalApplicantPendingDocument);

                var documentSeriesData = [];

                for (var key in mustHaveDocument) {
                    documentSeriesData.push({
                        name: key,
                        data: [mustHaveDocument[key], 0]
                    });
                }

                for (var key in shouldHaveDocument) {
                    documentSeriesData.push({
                        name: key,
                        data: [0, shouldHaveDocument[key]]
                    });
                }      
                applicantDocumente1.updateSeries(documentSeriesData);
            } else if (currentChart === 'applicant-percentange') { // Applicant percentage in pie chart
                var progress_0_20 = data.data.progressCounts["0-20%"] || 0;
                var progress_21_40 = data.data.progressCounts["21-40%"] || 0;
                var progress_41_60 =data.data.progressCounts["41-60%"] || 0;
                var progress_61_80 = data.data.progressCounts["61-80%"] || 0;
                var progress_81_100 = data.data.progressCounts["81-100%"] || 0;
            
                var allprogressCounts = data.data.allprogressCounts || 0;
                $currentElement.find('.applicant_count').text(allprogressCounts);
            
                applicantprogress.updateSeries([
                    progress_0_20,
                    progress_21_40,
                    progress_41_60,
                    progress_61_80,
                    progress_81_100
                ]);
            } else if (currentChart === 'applicant-2-phase-percentage') { // Applicant percentage 2 phase in bar chart             
                const progress1PhaseCounts = data.data.progress1PhaseCounts || {};
                const progress2PhaseCounts = data.data.progress2PhaseCounts || {};
        
                $currentElement.find('.applicant_count').text(data.data.progressPhaseAllCounts);

                const getSafeValue = (obj, key) => Number(obj[key] || 0);

                applicant2progress.updateSeries([
                    {
                        name: "0-20%",
                        data: [
                            getSafeValue(progress1PhaseCounts, '0-20%'),
                            getSafeValue(progress2PhaseCounts, '0-20%'),
                            getSafeValue(progress1PhaseCounts, '0-20%') + getSafeValue(progress2PhaseCounts, '0-20%')
                        ],
                    },
                    {
                        name: "21-40%",
                        data: [
                            getSafeValue(progress1PhaseCounts, '21-40%'),
                            getSafeValue(progress2PhaseCounts, '21-40%'),
                            getSafeValue(progress1PhaseCounts, '21-40%') + getSafeValue(progress2PhaseCounts, '21-40%')
                        ],
                    },
                    {
                        name: "41-60%",
                        data: [
                            getSafeValue(progress1PhaseCounts, '41-60%'),
                            getSafeValue(progress2PhaseCounts, '41-60%'),
                            getSafeValue(progress1PhaseCounts, '41-60%') + getSafeValue(progress2PhaseCounts, '41-60%')
                        ],
                    },
                    {
                        name: "61-80%",
                        data: [
                            getSafeValue(progress1PhaseCounts, '61-80%'),
                            getSafeValue(progress2PhaseCounts, '61-80%'),
                            getSafeValue(progress1PhaseCounts, '61-80%') + getSafeValue(progress2PhaseCounts, '61-80%')
                        ],
                    },
                    {
                        name: "81-100%",
                        data: [
                            getSafeValue(progress1PhaseCounts, '81-100%'),
                            getSafeValue(progress2PhaseCounts, '81-100%'),
                            getSafeValue(progress1PhaseCounts, '81-100%') + getSafeValue(progress2PhaseCounts, '81-100%')
                        ],
                    }
                ]);
            } else if (currentChart === 'applicant-today') { // Applicant today count  
                $(".todayCount").text(data.data.allStatusCounts);
                parentsDiv.find('.show-date-range').html('');
            } else if (currentChart === 'applicant-affidavit') {
                const pendingAffidavitSignCount = data.data.pendingAffidavitSignCount;

                $currentElement.find('.applicant_count').text(data.data.totalApplicantPendingAffidavit);

                const affidavitLabelsData = Object.keys(pendingAffidavitSignCount);
                const affidavitSeriesData = [{
                    name: 'Sign Count',
                    data: Object.values(pendingAffidavitSignCount)
                }];
                 
                applicantDocumente2.updateSeries(affidavitSeriesData);
            }            
        },
        error: function () {
            alert("Server Timeout! Please try again", 'error');
        }
    })
});

$('body').on('click', '.exportApplicantBtn', function (e) {
    e.preventDefault();

    var t = $(this);
    var url = t.attr("data-url");
   
    var form = t.closest("form");
    var formdata = new FormData(form[0]);
    
    var file_name = t.attr("data-file-name");

    $.ajax({
        url: url,
        method: 'POST',
        xhrFields: {
            responseType: 'blob'
        },
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {

            alert('Downloaded successfully.', 'success');
            var blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            var url = window.URL.createObjectURL(blob);
           
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = file_name;
         
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);           
        },
        error: function (error) {
            alert("Server Timeout! Please try again", 'error');
        }
    });
});

function daysdifference(firstDate, secondDate) {
  var startDay = new Date(firstDate);
  var endDay = new Date(secondDate);

  var millisBetween = startDay.getTime() - endDay.getTime();
  var days = millisBetween / (1000 * 3600 * 24);

  return Math.round(Math.abs(days));
}