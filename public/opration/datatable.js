import {
    loader,
    clearloader,
    alertText,
    buttonHide,
    buttonShow,
    tableRefresh,
    initMap,
    loadSection,
    masters
} from "./common_function.js";

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

/*@ Start Fetch data using datatable with dynamic filter */
var length = '50';
if (typeof page_length !== 'undefined') {
    length = page_length;
}

if (typeof tableList !== 'undefined') {
    $.each(tableList, function(key, columnDaTas) {
        datatableAjax(key,columnDaTas);
    });
}

$(".event_date").datepicker({
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
    numberOfMonths: 1,
    changeYear: true,
    changeMonth: true,
    dateFormat: "mm/dd/yy",
    onSelect: function (dateText, inst) {
        tableRefresh('event-data');
    },
});

function datatableAjax(key,columnDaTas) {
    var url = $(document).find('.'+key).attr('data-url');
    if (key != 'note-data' && key != 'note-applicant-status-history' && key != 'reminder-data' && key != 'insurance-history-data' && key != 'document-send-history' && key != 'caregiver-search-data') {
        $('.' + key + ' thead tr').clone(true).appendTo('.' + key + ' thead');
        $('.' + key + ' thead tr:eq(1) th').each(function (i) {
            var title = $(this).text().trim();
            if (title != '' && title != 'Action' && title != 'Primary' && title != 'Status' && title != 'Status#' && title != 'Class Time' && title !="Sr No") {
                if (title == 'Event Date' || title == 'DOB' || title == 'Referral Date' || title == 'Introduction Call') {
                    $(this).html('<input type="text" title="Filter By '+title+'" placeholder="Filter By '+title+'" data-column="'+i+'" class="date_search"/>');
                } else if (title == 'Service') {
                    $(this).html('<select class="select_search" data-column="'+i+'"><option value="">Select service</option><option value="1">CDPAP</option><option value="2">HHA/PCA</option></select>');
                } else {
                    $(this).html('<input type="text" title="Filter By '+title+'" placeholder="Filter By '+title+'" />');
                }
                $('input', this).on('keyup change', function (event) {
                    if (event.key === "Enter") {
                        if (table.column(i).search() !== this.value) {
                            table
                                .column(i)
                                .search(this.value)
                                .draw();
                        }
                    }
                });
            } else if (title === "Action" && key === 'ezeeConnect-data') {
                $(this).html('<div class="svg-icon-container"><input type="checkbox" style="display:block; cursor:pointer;" class="ezeeConnect_checkbox_all" name="ezeeConnect_checkbox_all" id="ezeeConnect_checkbox_all" value=""/><button class="svg-icon action-btn" title="SMSMMS" onclick="openEzeeConnectModal(0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" xmlns:v="https://vecta.io/nano"><path d="M400 448H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zM238.1 145.9L102.4 281.6l-6.3 57.1c-.8 7.6 5.6 14.1 13.3 13.3l57.1-6.3L302.2 210c2.3-2.3 2.3-6.1 0-8.5L246.7 146c-2.5-2.4-6.3-2.4-8.6-.1h0zM345 133.1L314.9 103c-9.4-9.4-24.6-9.4-33.9 0l-23.1 23.1c-2.3 2.3-2.3 6.1 0 8.5l55.5 55.5c2.3 2.3 6.1 2.3 8.5 0L345 167c9.3-9.3 9.3-24.5 0-33.9z"></path></svg></button></div>');
            } else if (title === "Action" && key === 'wishes-data') {
                $(this).html('<div class="svg-icon-container"><input type="checkbox" style="display:block; cursor:pointer;" class="wishes_checkbox_all" name="wishes_checkbox_all" id="wishes_checkbox_all" value=""/><button class="svg-icon action-btn" title="SMSMMS" onclick="wishesModal(0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" xmlns:v="https://vecta.io/nano"><path d="M400 448H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zM238.1 145.9L102.4 281.6l-6.3 57.1c-.8 7.6 5.6 14.1 13.3 13.3l57.1-6.3L302.2 210c2.3-2.3 2.3-6.1 0-8.5L246.7 146c-2.5-2.4-6.3-2.4-8.6-.1h0zM345 133.1L314.9 103c-9.4-9.4-24.6-9.4-33.9 0l-23.1 23.1c-2.3 2.3-2.3 6.1 0 8.5l55.5 55.5c2.3 2.3 6.1 2.3 8.5 0L345 167c9.3-9.3 9.3-24.5 0-33.9z"></path></svg></button></div>');
            } else if (title === "Action" && (key === 'company-data')) {
                var html = '<div class="svg-icon-container"><div class="checkbox"><input type="checkbox" class="mainchk" style="display: block;"></div>';
                html += statusBtn(key);
                html += deleteBtn(key);
                html += '</div>';

                $(this).html(html);
            } else if (title === "Action" && (key === 'permission-data' || key === 'role-data' || key === 'email-template-data' || key === 'sms-content-data' || key === 'event-data' || key === 'training-data')) {
                var html = '<div class="svg-icon-container"><div class="checkbox"><input type="checkbox" class="mainchk" style="display: block;"></div>';
                html += statusBtn(key);
                html += '</div>';

                $(this).html(html);
            } else if (title === "Action" && (key === 'log-activity-data' || key === 'ticket-data' || key === 'contact-data' || key === 'required-inservice-data')) {
                var html = '<div class="svg-icon-container"><div class="checkbox"><input type="checkbox" class="mainchk" style="display: block;"></div>';
                html += deleteBtn(key);
                html += '</div>';

                $(this).html(html);
            } else if (title === "Action" && (key === 'user-data' || key === 'company-user-data')) {
                var html = '<div class="svg-icon-container"><div class="checkbox"><input type="checkbox" class="mainchk" style="display: block;"></div>';
                html += statusBtn(key);
                html += lockedBtn(key);
                html += deleteBtn(key);
                html += '</div>';

                $(this).html(html);
            } else {
                $(this).html('');
            }
        });
    }

    var lengthChange = true;
    if (key === 'note-data' || key === 'note-applicant-status-history' || key === 'reminder-data' || key === 'insurance-history-data' || key === 'document-send-history') {
        lengthChange = false;
    }

    var table = $('.' + key).DataTable({
        order: [[ 0, 'DESC' ]],
        responsive: true,
        processing: true,
        serverSide: true,
        // "bSort" : true,
        // "bSortable" : true,
        orderable: true,
        lengthChange: lengthChange,
        orderCellsTop: true,
        fixedHeader: true,
        language: {
            processing: '<i class="fas fa-spin fa-sync-alt"></i>'
        },
        ajax: {
            'url': url,
            'type': 'GET',
            data: function (d) {
                d.name = $('select[name="name"]').val();
                d.status = $('select[name="status"]').val();
                d.company_id = $('input[name="company_id"]').val();
                d.patient_id = $('input[name="patient_id"]').val();
                d.is_patient = $('#getPatientsList').val();
                d.is_caregiver = $('#getCaregiversList').val();
                d.is_otherUsers = $('#getOtherUsersList').val();
                d.eventId = $('#eventId').val();
                d.user_id = $('input[name="user_id"]').val();
                d.count_intake = $('input[name="count_intake"]').val();
                d.calendarStartDate = $('input[name="calendarStartDate"]').val();
                d.log_name = $('input[name="log_name"]').val();
                d.training_id = $('input[name="training_id"]').val();
                d.noteType = $('input[name="noteType"]').val();
                d.status = $("#filterCaregiverByStatus").val();
                d.language = $("#filterCaregiverByLanguage").val();
                d.slug =  $('input[name="slug"]').val();
                d.day =  $('input[name="day"]').val();
                d.timesheetStatus =  $('input[name="status"]').val();
                d.visit_date =  $('input[name="visit_date"]').val();
                d.month =  $('input[name="month"]').val();
                d.weekend_date =  $('input[name="weekend_date"]').val();
                d.first_name = $('input[name="first_name"]').val();
                d.last_name = $('input[name="last_name"]').val();
                d.gender = $('select[name="gender"]').val();
                d.service = $('select[name="service"]').val();
                d.address = $('input[name="address"]').val();
                d.county = $('input[name="county"]').val();
                d.zipcode = $('input[name="zipcode"]').val();
                d.caregiver_code = $('input[name="caregiver_code"]').val();
                d.caregiver_id = $('input[name="caregiver_id"]').val();
                d.email = $('input[name="email"]').val();
                d.phone_no = $('input[name="phone_no"]').val();
                d.language = $('select[name="language"]').val();
            },
        },
        columns: columnDaTas,
        "initComplete": function() {
            if (key === 'failed-timesheet-data') {
                $('.timesheet-datatable').on('click', '.mapModal', function() {
                    $(".timesheet-map-popup").show();
                    var latA = $(this).data('lata-id');
                    var lonA = $(this).data('lona-id');
                    var latS = $(this).data('lats-id');
                    var lonS = $(this).data('lons-id');
                    initMap(latA, lonA, latS, lonS);
                });
                $(document).on('click', '#bulk_delete', function(){
                    var id = [];
                    if(confirm("Are you sure you want to Delete this data?"))
                    {
                        $('.timesheet_checkbox:checked').each(function(){
                            id.push($(this).val());
                        });
                        if(id.length > 0)
                        {
                            $.ajax({
                                url:"{{ route('timesheet.bulkdelete')}}",
                                method:"get",
                                data:{id:id},
                                success:function(data)
                                {
                                    $('.timesheet-datatable').DataTable().ajax.reload();
                                }
                            });
                        }
                        else
                        {
                            alert("Please select atleast one checkbox");
                        }
                    }
                });
            }
        },
        drawCallback : function(settings) {
            if (window.livewire) {
                window.livewire.rescan();
            }
        },
        "pageLength": length,
        "lengthMenu": [[5, 10, 20, 50, 100, -1], [5, 10, 20, 50, 100, "All"] ],
        // "aoColumnDefs": [
        //     { "bSortable": false, "aTargets": [ 0 ] },
        //     { "bSearchable": false, "aTargets": [ 6 ] }
        // ],
    });
    // clearloader();

    if (key === 'note-data' || key === 'note-applicant-status-history' || key === 'reminder-data' || key === 'insurance-history-data' || key === 'document-send-history') {
        $(document).find(".dataTables_filter").show();
    }

    $(".date_search").datepicker({
        dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
        numberOfMonths: 1,
        changeYear: true,
        changeMonth: true,
        dateFormat: "mm/dd/yy",
        onSelect: function (dateText, inst) {
            var date_column = $(this).attr('data-column');
            table.column(date_column).search(dateText).draw();
        },
    });

    $('body').on('change', '.select_search', function () {
        var date_column = $(this).attr('data-column');
        table.column(date_column).search($(this).val()).draw();
    });
}

function statusBtn(key)
{
    var model = $('.' + key).attr('data-model');
    var action_url = $('.' + key).attr('data-action-url');

    return '<a data-status="1" data-url="'+action_url+'" data-action="update-status" data-message="active this record" data-model="'+model+'" data-refresh-table="'+key+'" href="javascript:void(0)" class="svg-icon edit-icon update-status acceptRejectBtn" title="Active"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" xmlns:v="https://vecta.io/nano"><path d="M400 0H48C21.5 0 0 21.5 0 48v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48z"></path><path d="M224 74c-82.7 0-150 67.3-150 150s67.3 150 150 150 150-67.3 150-150S306.7 74 224 74zm0 258.6c-59.9 0-108.6-48.7-108.6-108.6S164.1 115.4 224 115.4 332.6 164.1 332.6 224 283.9 332.6 224 332.6zm-21.1-39.5c-3.3 0-6.4-1.3-8.8-3.6l-46.8-47.2c-4.8-4.8-4.8-12.7.1-17.4l11.7-11.6c2.3-2.3 5.4-3.6 8.7-3.6s6.4 1.3 8.8 3.6l26.5 26.7 68.6-68c2.3-2.3 5.4-3.6 8.7-3.6s6.4 1.3 8.8 3.6l11.6 11.7c4.8 4.8 4.8 12.7-.1 17.4l-89.1 88.4c-2.3 2.3-5.4 3.6-8.7 3.6z" fill="#fff"></path></svg></a><a href="javascript:void(0)" data-status="0" data-url="'+action_url+'" data-action="update-status" data-message="deactive this record" data-model="'+model+'" data-refresh-table="'+key+'" class="svg-icon inactive-icon update-status acceptRejectBtn" title="Inactive"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" xmlns:v="https://vecta.io/nano"><path d="M400 0H48C21.5 0 0 21.5 0 48v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48z"></path><path d="M224 374c-40.1 0-77.7-15.6-106.1-43.9C89.6 301.7 74 264.1 74 224s15.6-77.7 43.9-106.1S183.9 74 224 74s77.7 15.6 106.1 43.9S374 183.9 374 224s-15.6 77.7-43.9 106.1c-28.4 28.3-66 43.9-106.1 43.9zm0-264.6c-63.2 0-114.6 51.4-114.6 114.6S160.8 338.6 224 338.6 338.6 287.2 338.6 224 287.2 109.4 224 109.4zm41.8 180.3c-2.8 0-5.5-1.1-7.5-3.1L224 252.4l-34.2 34.2c-2 2-4.7 3.1-7.5 3.1s-5.5-1.1-7.5-3.1l-13.3-13.3c-4.1-4.1-4.1-10.9 0-15l34.2-34.2-34.2-34.2c-2-2-3.1-4.7-3.1-7.5s1.1-5.5 3.1-7.5l13.3-13.3c2-2 4.7-3.1 7.5-3.1s5.5 1.1 7.5 3.1l34.2 34.2 34.2-34.2c2-2 4.7-3.1 7.5-3.1s5.5 1.1 7.5 3.1l13.3 13.3c2 2 3.1 4.7 3.1 7.5s-1.1 5.5-3.1 7.5L252.4 224l34.2 34.2c4.1 4.1 4.1 10.9 0 15l-13.3 13.3a10.29 10.29 0 0 1-7.5 3.2z" fill="#fff"></path></svg></a>';
}

function lockedBtn(key)
{
    var model = $('.' + key).attr('data-model');
    var action_url = $('.' + key).attr('data-action-url');

    return '<a href="javascript:void(0)" class="update-status acceptRejectBtn svg-icon unlock-icon" data-status="0" title="Unlocked" data-url="'+action_url+'" data-action="update-lock-status" data-message="lock this user" data-model="'+model+'"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" xmlns:v="https://vecta.io/nano"><path d="M309.2 238.6H138.9c-10.4 0-18.9 8.2-18.9 18.3v72.3c0 10.1 8.5 18.3 18.9 18.3h170.3c10.4 0 18.9-8.2 18.9-18.3v-72.3c0-10.1-8.5-18.3-18.9-18.3zm-64.9 74.6c0 7.9-6.9 14.4-15.5 14.4h-9.7c-8.5 0-15.5-6.5-15.5-14.4v-40.4c0-7.9 6.9-14.4 15.5-14.4h9.7c8.5 0 15.5 6.5 15.5 14.4v40.4zM397.7 0H50.3C22.5 0 0 22.5 0 50.3v347.4C0 425.5 22.5 448 50.3 448h347.4c27.8 0 50.3-22.5 50.3-50.3V50.3C448 22.5 425.5 0 397.7 0zm-64 383.8H114.2c-18.9 0-34.2-15-34.2-33.5V233.7c0-18.5 15.4-33.5 34.2-33.5h8.3a2.26 2.26 0 0 0 2.3-2.3v-37.1c0-53.3 44.5-96.6 99.1-96.6s99.1 43.3 99.1 96.6v.1a2.26 2.26 0 0 1-2.3 2.3h-36.6a2.26 2.26 0 0 1-2.3-2.3h0-.1c0-30.9-25.9-56.1-57.7-56.1s-57.7 25.2-57.7 56.1v37.4a2.26 2.26 0 0 0 2.3 2.3h99.7 13.5 56.9.4c16.3 2.6 28.8 16.4 28.8 33.1v116.6h.1c0 18.5-15.4 33.5-34.3 33.5z"/></svg></a><a href="javascript:void(0)" class="update-status acceptRejectBtn svg-icon lock-icon" data-status="1" title="Locked" data-url="'+action_url+'" data-action="update-lock-status" data-message="unlock this user" data-model="'+model+'"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" xmlns:v="https://vecta.io/nano"><path d="M309.2 238.6H138.9c-10.4 0-18.9 8.2-18.9 18.3v72.3c0 10.1 8.5 18.3 18.9 18.3h170.3c10.4 0 18.9-8.2 18.9-18.3v-72.3c0-10.1-8.5-18.3-18.9-18.3zm-64.9 74.6c0 7.9-6.9 14.4-15.5 14.4h-9.7c-8.5 0-15.5-6.5-15.5-14.4v-40.4c0-7.9 6.9-14.4 15.5-14.4h9.7c8.5 0 15.5 6.5 15.5 14.4v40.4zm37.4-152.3c0-30.9-25.9-56.1-57.7-56.1s-57.7 25.2-57.7 56.1v39.7h115.5v-39.7zM400 0H48C21.5 0 0 21.5 0 48v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-32 350.3c0 18.5-15.4 33.5-34.3 33.5H114.2c-18.9 0-34.2-15-34.2-33.5V233.7c0-18.5 15.4-33.5 34.2-33.5h10.6v-39.4c0-53.3 44.5-96.6 99.1-96.6s99.1 43.3 99.1 96.6v39.4h10.6c18.9 0 34.3 15 34.3 33.5v116.6z"/></svg></a>';
}

function deleteBtn(key)
{
    var model = $('.' + key).attr('data-model');
    var delete_url = $('.' + key).attr('data-delete-url');

    return '<a href="javascript:void(0)" class="svg-icon delete-icon update-status acceptRejectBtn" data-url="'+delete_url+'" data-action="delete-data" data-message="delete this record" data-model="'+model+'" title="Delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448" xmlns:v="https://vecta.io/nano"><path d="M400 448H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zM114.7 342.4c0 15.1 12.2 27.3 27.3 27.3h0 164c15.1 0 27.3-12.2 27.3-27.3h0V151.1H114.7v191.3zm154.8-145.7c0-5 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1v127.5c0 5-4.1 9.1-9.1 9.1s-9.1-4.1-9.1-9.1V196.7zm-54.6 0c0-5 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1v127.5c0 5-4.1 9.1-9.1 9.1s-9.1-4.1-9.1-9.1V196.7zm-54.7 0c0-5 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1v127.5c0 5-4.1 9.1-9.1 9.1s-9.1-4.1-9.1-9.1V196.7zM342.4 96.5h-68.3l-5.4-10.6c-2.3-4.6-7.1-7.6-12.2-7.6h-65.1c-5.2 0-9.9 2.9-12.2 7.6l-5.4 10.6h-68.3c-5 0-9.1 4.1-9.1 9.1v18.2c0 5 4.1 9.1 9.1 9.1h236.8c5 0 9.1-4.1 9.1-9.1v-18.2c.1-5-4-9.1-9-9.1z"></path></svg></a>';
}

$('#filterCaregiverByStatus').on('change', function () {
    tableRefresh('caregiver-data');
});
$('#filterCaregiverByLanguage').on('change', function () {
    tableRefresh('caregiver-data');
});

// Start Ezee Connect
$(document).on('change', '#getPatientsList, #getCaregiversList, #getOtherUsersList', function(){
    tableRefresh('wishes-data');
    tableRefresh('ezeeConnect-data');
});

$("#filter_btn").click(function () {
    var table = $(this).attr('data-table');
    tableRefresh(table);
});

$('#getPatients').click(function(){
    if($(this).prop("checked") == true){
        $("#getPatientsList").val("");
    }
    else if($(this).prop("checked") == false){
        $("#getPatientsList").val("");
        tableRefresh('ezeeConnect-data');
        tableRefresh('wishes-data');
    }
});

$('#getCaregivers').click(function(){
    if($(this).prop("checked") == true){
        $("#getCaregiversList").val("");
    }
    else if($(this).prop("checked") == false){
        $("#getCaregiversList").val("");
        tableRefresh('ezeeConnect-data');
    }
});

$('#getOtherUsers').click(function(){
    if($(this).prop("checked") == true){
        $("#getOtherUsersList").val("");
    }
    else if($(this).prop("checked") == false){
        $("#getOtherUsersList").val("");
        tableRefresh('ezeeConnect-data');
        tableRefresh('wishes-data');
    }
});

$('body').on('click', '.update-status', function () {
    // var mainParent = $(this).parent('.required-toggle-btn');
    // if($(mainParent).find('input.update-status').is(':checked')) {
    //     $(mainParent).addClass('active');
    //     var val = '1';
    // } else {
    //     $(mainParent).removeClass('active');
    //     var val = '0';
    // }

    var t = $(this);

    var status = $(this).attr("data-status");
    var url = $(this).attr("data-url");
    var action = $(this).attr("data-action");
    var model = $(this).attr("data-model");
    var message = $(this).attr("data-message");
    var slug = $(this).attr("data-slug");
    var intake_count = $(this).attr("data-count");
    var page = $(this).attr("data-page");
    var user_id = $(this).attr('data-user-id');

    if (action === 'delete-data' && status === 'deleteDocument') {
        $(this).parents(".image-container").find(".innerallchk").prop("checked",true);
    } else if (page === 'master' || page === 'application' || page === 'patient') {
        $(this).parents(".table_row").find(".innerallchk").prop("checked",true);
    } else if (page === 'ticket') {
        $(this).parents(".text-right").find(".innerallchk").prop("checked",true);
    } else if (action === 'accept-in-service') {
        $(this).parents(".in-service-box").find(".innerallchk").prop("checked",true);
    } else if (action === 'affidavit-status-update' || action === 'exam-status-update') {
        $(this).parents(".svg-icon-container").find(".innerallchk").prop("checked",true);
    } else if (model === 'BankDetail') {
        $(this).parents(".deposite-details").find(".innerallchk").prop("checked",true);
    } else {
        $(this).parents("tr").find(".innerallchk").prop("checked",true);
    }

    var data = {
        status: status,
        action: action,
        model: model,
        slug: slug,
        intake_count: intake_count,
        user_id: user_id,
    };

    doaction(t, url, message, data)
});

$(".mainchk").on('click',function (e) {
    var action = $(this).attr("data-action");
    var ch = $(this).prop("checked");
    var role_name =  $(this).attr("data-id");

    if (action === 'role-main-chk') {
        var counter = 2;
        $.each(roles, function (key, value) {
            var name = value['name'];

            if (name == role_name) {
                if(ch == true) {
                    $(e.target).closest('table').find('tr td:nth-child('+ counter +') input:checkbox').prop('checked', "checked");
                } else {
                    $(e.target).closest('table').find('tr td:nth-child('+ counter +') input:checkbox').prop('checked', "");
                }
            }

            counter++;
        });

    } else {
        if(ch == true) {
            $(this).closest('table').find(".innerallchk").prop("checked","checked");
            buttonShow($(this));
        } else {
            $(this).closest('table').find(".innerallchk").prop("checked","");
            buttonHide($(this));
        }
    }
});

$(document).on('click', '.chkmain',function (e) {
    var ch = $(this).closest('table').find(".innerallchk").prop("checked");

    if(ch == true) {
        buttonShow($(this));
        var len = $(this).closest('table').find(".innerallchk:unchecked").length;
        if(len == 0) {
            $(this).closest('table').find(".mainchk").prop("checked","checked");
        } else {
            $(this).closest('table').find(".mainchk").prop("checked","");
        }
    } else {
        var len = $(this).closest('table').find(".innerallchk:checked").length;

        if(len == 0) {
            buttonHide($(this));
            $(this).closest('table').find(".mainchk").prop("checked","");
        } else {
            buttonShow($(this));
            var len = $(this).closest('table').find(".innerallchk:unchecked").length;
            if(len == 0) {
                $(this).closest('table').find(".mainchk").prop("checked","checked");
            } else {
                $(this).closest('table').find(".mainchk").prop("checked","");
            }
        }
    }
});

function doaction(t, url, message, dataObject) {
    var len = $(".innerallchk:checked").length;

    if (len == 0) {
        alertText('Please select at least one record to continue.','warning');
    } else {
        var val = $('.innerallchk:checked').map(function () {
            return this.value;
        }).get();

        var data = {
            "id": val,
            "model": dataObject.model,
            "action" : dataObject.action,
            "status" : dataObject.status,
            "slug": dataObject.slug,
            "intake_count": dataObject.intake_count,
            "user_id": dataObject.user_id,
        };

        postdataforaction(t, url, message, data);
    }
}

function postdataforaction(t, url, message, dataObject) {

    var alertMessage = "Are you sure want to " + message + "?";

    if (dataObject.action === 'un-send-in-service') {
        var alertMessage = "Are you sure" + message + "?";
    }

    if (dataObject.intake_count > 0) {
        var alertMessage = "This intake coordinator is assigned a patient, so do you want to assign another coordinator?";
    }

    if (confirm(alertMessage)) {
        loader();

        if (dataObject.page_action === 'assign-coordinator') {
            $(".page_action").val('assign-coordinator');
        }

        $.ajax({
            'type': 'POST',
            'url': url,
            data: dataObject,
            'success': function (data) {
                if(data.code == 400) {
                    var smsStatus = 'error';
                } else {
                    var smsStatus = 'success';
                }

                alertText(data.message, smsStatus);

                if (dataObject.action === 'delete-data' && dataObject.status === 'deleteDocument') {
                    var referreshDiv = t.attr('data-refersh-section');
                    var referreshDivs = t.attr('data-section-array');
                    if (typeof referreshDivs !== 'undefined') {
                        var refreshSections = referreshDivs.split(',');
                    
                        $.each(refreshSections, function(key, section) {
                            console.log(section);
                            loadSection(section);
                        });
                    }  

                    if (referreshDiv === 'popup_image_view') {
                        t.closest('.image-container').remove();
                    } else {
                        $(document).find("."+referreshDiv).load(location.href + " ."+referreshDiv);
                    }

                    // loadSection('record_tr_references');                  
                }

                if (typeof masters !== 'undefined') {
                    if (dataObject.slug === 'user_documents') {
                        masters("user_documents","","1");
                    } else {
                        masters(dataObject.slug);
                    }
                }

                if (dataObject.model === 'PatientInsurance' || dataObject.model === 'InsuranceUser') {
                    t.closest("tr").remove();
                }

                if (dataObject.action === 'affidavit-status-update') {
                    $(document).find("#affidavitContainer").load(location.href + " #affidavitContainer");
			$("#searchInput").val('');
                }
   if (dataObject.action === 'exam-status-update') {
                    $(document).find("#examContainer").load(location.href + " #examContainer");
			
                }

	
   if (dataObject.action === 'question-status-update') {

	  masters("master_questions", data.data.skill_assessment_id);

			
                }


                if (dataObject.action === 'assign-coordinator') {
                    var html = '<ul>';
                    var user_id = [];
                    $.each(data.data.assignCoordinator, function (key, value) {
                        var first_name = value.user.first_name;
                        var last_name = value.user.last_name;
                        html+='<li>' + first_name + ' ' + last_name + '</li>';
                        user_id.push(value.user.id);
                    });

                    html+='</ul>';

                    $(".patient_name").html(html);
                    $(".user_id").val(user_id.join(","));

                    $("#assginCoordinator").fadeIn();
                }

                if (dataObject.action === 'delete-data' && dataObject.model === 'Emergency') {
                    loadSection(dataObject.status);
                }

                var refreshTable = t.closest("table").attr('id');

                if (typeof refreshTable !== 'undefined') {
                    tableRefresh(refreshTable);
                } else if(t.attr('data-refresh-table') === 'company-data' || t.attr('data-refresh-table') === 'role-data') {
                    var refreshTable = t.attr('data-refresh-table');
                    tableRefresh(refreshTable);
                } else if(t.attr('data-refresh-table') === 'emergency-body' || t.attr('data-refresh-table') === 'education-body' || t.attr('data-refresh-table') === 'licenses-body' || t.attr('data-refresh-table') === 'employer-body' || t.attr('data-refresh-table') === 'ticket-detail' || t.attr('data-refresh-table') === 'exception-body' || t.attr('data-refresh-table') === 'ticket-chat') {
                    var refreshTable = t.attr('data-refresh-table');
                    loadSection(refreshTable);
                }

                    if (dataObject.action === 'delete-data' && dataObject.status === 'question-body') {
                        t.closest("tr").remove();
                    }

                if (dataObject.model === 'BankDetail') {
                    loadSection('payroll');
                }

                buttonHide(t);
                clearloader();
                $(".innerallchk, .mainchk").prop("checked","");
            },
            "error":function () {
                alertText("Server Timeout! Please try again", "error");
                clearloader();
            }
        });
    }
    $(".innerallchk").prop("checked","");
    return false;
}

$(".popup .close").on("click", function (e) {

    e.stopPropagation();

    var popoId = $(this).attr('data-popup-close');
    var formId = $(this).attr('data-form');

    if (typeof formId !== 'undefined') {
        $('.document_link').html('');

        var $alertas = $('#'+formId);
        $alertas.validate().resetForm();
        $alertas.find('.error').removeClass('error');
    }

    $(".allchk").prop("checked","");

    $("#"+popoId).fadeOut();
});
