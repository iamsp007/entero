import {
    loadSection,
    ajaxCall,
    profileimage,
    onselectDate,
} from "./common_function.js";

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

/** Initialize select2 */
$('.county_service').select2({
    placeholder: "Select County of Service",
}).on('change', function() {
    $("#county_service").removeClass('error');
    $("#county_service-error").css({"display" : "none"});
});

/** Initialize select2 */
$('.hc_software').select2({
    placeholder: "Select Current Home Care Software",
}).on('change', function() {
    $("#hc_software").removeClass('error');
    $("#hc_software-error").css({"display" : "none"});

    if($.inArray('Other', $(this).val()) !== -1 || $.inArray('other', $(this).val()) !== -1) {
        $(".otherSoftware").show();
    }else {
        $(".otherSoftware").hide();
    }
});

/** Initialize select2 */
$('.spoken_language').select2({
     placeholder: typeof spokenLanguagePlaceholder !== 'undefined' ? spokenLanguagePlaceholder : 'Select Spoken Language',
}).on('change', function() {
    $("#other_spoken_lang").removeClass('error');
    $("#other_spoken_lang-error").css({"display" : "none"});
});

/** Initialize select2 */
$('.cc_email').select2({
    placeholder: "Select CC Email",
}).on('change', function() {
    $("#cc_email").removeClass('error');
    $("#cc_email-error").css({"display" : "none"});
});

/** Initialize select2 */
$('.coordinators').select2({
    placeholder: "Select coordinators",
}).on('change', function() {
    $("#coordinators").removeClass('error');
    $("#coordinators-error").css({"display" : "none"});
});

/** Initialize select2 */
$('.event_attendees').select2({
    placeholder: "Select attendees",
}).on('change', function() {
    $("#attendees").removeClass('error');
    $("#attendees-error").css({"display" : "none"});
});

/** Initialize select2 */
$('.reminder_to').select2({
    placeholder: "Select attendees",
}).on('change', function() {
    $("#reminder_to").removeClass('error');
    $("#reminder_to-error").css({"display" : "none"});
});

/** Initialize select2 */
$('.office_ids').select2({
    placeholder: "Select offices",
}).on('change', function() {
    $("#office_ids").removeClass('error');
    $("#office_ids-error").css({"display" : "none"});
});

/** Image preview on change file */
$(".image_preview").on('change', function() {
    $(this).removeClass('error');
    $("#avatar-error").css({"display" : "none"});

    profileimage(this);
});

$(document).on('click', ".type-of-service input[type='radio']",function (e) {
    e.stopPropagation();
    if ($(this).val() == 1) {
        $(".type-of-service-cdpap-container").slideDown();
    } else {
        $(".type-of-service-cdpap-container").slideUp();
    }
})

$(document).on('change', '.class_frequency',function (e) {
    var textvalue = $(".class_frequency option:selected").text();

    if(textvalue === 'Custom') {
        $(this).parents('.grid-row').find('.custom_date_div').show();
    } else {
        $(this).parents('.grid-row').find('.custom_date_div').hide();
    }
})

$(document).on('click', '.is_rehired',function (e) {
    if($(this).val() === '0') {
        $(".another_patient_section").show();
    } else {
        $(".another_patient_section").hide();
    }
});

$(document).on('click', '.start_from',function (e) {
    var category_id_value = $('.category_id').val();
    var sub_category_value = $('.sub_category').val();

    // Check if the field is empty
    if (category_id_value === "" && sub_category_value === "") {
        $('.categories_error').show();
    } else {
        $('.categories_error').hide();

        if($(this).val() === '2') {
            $(".start_applicant_btn").show();
            $('.start_patient_btn').attr('data-part', 'onlyPatient');
            $('.send_label span').hide();
            $(".mailUnique").attr('data-rule', false);
        } else {
            if(sub_category_value === '7') {
                $(".start_applicant_btn").show();
            } else {
                $(".start_applicant_btn").hide();
                $('.start_patient_btn').attr('data-part', 'sendBoth');
            }
            $('.send_label span').show();
        }
    }
});

$("body").on('keyup', '.phone_format', function (event) {
    $('.phone_format').inputmask("(999) 999-9999");
});

$(document).on('click', '.cdpap-add-row',function (e) {
    var pa_length = $(document).find('.pa-details').length + 1;
    $(".type-of-service-cdpap").append('<fieldset><legend class="short-label">Patient Details('+pa_length+')</legend><div class="pa-details"><div class="pa_div"><div class="grid-row"><div class="grid-item"><label>First Name</label><div class="grid-input"><input type="text" name="patient_detail[cdpap_pa_detail][first_name][]"/></div></div><div class="grid-item"><label>Last Name</label><div class="grid-input"><input type="text" name="patient_detail[cdpap_pa_detail][last_name][]"/></div></div><div class="grid-item"><label>Phone</label><div class="grid-input"><input type="text" name="patient_detail[cdpap_pa_detail][home_phone][]" class="phone_format"/></div></div></div><div class="grid-row"><div class="grid-item"><label>Rate</label><div class="grid-input"><select name="patient_detail[cdpap_pa_detail][rate_id][]" class="rate_id"><option value="">Select a rate</option></select></div></div><div class="grid-item"><label>Relationship</label><div class="grid-input"><select name="patient_detail[cdpap_pa_detail][relation_id][]" class="relation_select"><option value="">Select a relation</option></select></div></div><div class="grid-item"><label>Email</label><div class="grid-input"><input type="text" name="patient_detail[cdpap_pa_detail][email][]"/></div><a class="cdpap-del-row"><i class="far fa-times-circle"></i></a></div></div></div></div></fieldset>');

    if (typeof rates !== 'undefined' && rates != '') {
        $.each(rates, function (key, value) {
            var rate_code = value['rate_code'];
            var rate_id = value['id'];
            $(document).find(".pa_div:last").find(".rate_id").append('<option value="'+rate_id+'">'+rate_code+'</option>');
        });
    }
    if (typeof relations !== 'undefined' && relations != '') {
        $.each(relations, function (key, value) {
            var name = value['name'];
            $(document).find(".pa_div:last").find(".relation_select").append('<option value="'+name+'">'+name+'</option>');
        });
    }
});

$('body').on('click','.type-of-service-cdpap .cdpap-del-row', function(e){
    e.stopPropagation();
    $(this).closest("fieldset").remove();
});

$(document).on('change', '.applicant_status',function (e) {
    var textvalue = $(".applicant_status option:selected").text();

    if(textvalue === 'Employee') {
        $(this).parents('.grid-row').find('.hire_date_div').show();
    } else {
        $(this).parents('.grid-row').find('.hire_date_div').hide();
    }

   if (textvalue === "Reject") {
       $('.reason_div').show();
   } else {
       $('.reason_div').hide();
   }

});


$(document).on('click', '.steps_of_application_radio',function (e) {
    if ($(this).val() === "2-step") {
        $('.quetion_if_2_step').show();
    } else {
        $('.quetion_if_2_step').hide();
    }
});

$(document).on('change', '.patient_status',function (e) {
    var textvalue = $(".patient_status option:selected").text();

    if(textvalue === 'Admitted') {
        $(this).parents('.grid-row').find('.admitted_date_div').show();
    } else {
        $(this).parents('.grid-row').find('.admitted_date_div').hide();
    }
});

$(document).on('change', '.referral_status',function (e) {
    var textvalue = $(".referral_status option:selected").text();

    if(textvalue === 'Agency transfer') {
        $(this).parents('.grid-row').find('.agency_date_div').show();
        $(this).parents('.grid-row').find('.mltc_name_div').hide();
    } else if(textvalue === 'MLTC Changed') {
        $(this).parents('.grid-row').find('.agency_date_div').hide();
        $(this).parents('.grid-row').find('.mltc_name_div').show();
    } else {
        $(this).parents('.grid-row').find('.agency_date_div').hide();
        $(this).parents('.grid-row').find('.mltc_name_div').hide();
    }
});


$(document).on('click', '.edit-category',function (e) {
    e.stopPropagation();
    $(this).hide();
    var targeted_category = $(this).attr("data-category");
    $('.' + targeted_category + ' .required-toggle-btn').removeClass("disabled-field");
    $(this).next('.update-category').show();
    $(this).prev('.cancle-category').show();
    $(this).parents('.' + targeted_category).find('.update-category').show();
    $('.affidavit_edit_icon').hide();
    $('.affidavit_status_icon').hide();
    $('.exam_edit_icon').hide();
    $('.exam_status_icon').hide();
});


$(document).on('click', '.cancle-category',function (e) {
    e.stopPropagation();
    $(this).hide();
    $('.affidavit_edit_icon').show();
    $('.affidavit_status_icon').show();
    $('.exam_edit_icon').show();
    $('.exam_status_icon').show();
    
    var targeted_category = $(this).attr("data-category");
    $('.' + targeted_category + ' .required-toggle-btn').addClass("disabled-field");
    $(this).next().next('.update-category').hide();
    $(this).parents('.' + targeted_category).find('.update-category').hide();
    $(this).next('.edit-category').show();
   
    loadSection(targeted_category);
});


$(document).on('click', '.reminder-acknowledgement-btn',function () {
    var t = $(this);
    var url = t.attr('data-url');
    var reminder_id = t.attr('data-id');
    var action = t.attr('data-action');

    var data = {
        reminder_id: reminder_id,
        acknowledgement: '1'
    };

    ajaxCall(t, url, action, data)
});

$(document).on('click', '.assign-to-patient',function () {
    var t = $(this);
    var url = t.attr('data-url');
    var action = 'assign-to-patient';

    var data = {
        action: action,
    };

    ajaxCall(t, url, action, data)
});

$(document).on('click', '.autoImportHHAX',function () {
    var t = $(this);
    var url = t.attr('data-url');
    var array = t.attr('data-array');
    var action = t.attr('data-action');
    var table = t.attr('data-table');

    var data = {
        array: array,
        table: table
    };

    ajaxCall(t, url, action, data)
});

$('body').on('keyup','.county-seach-box input', function () {
    var t = $(this);
    var url = t.attr('data-url');
    var company_id = t.attr('data-id');
    var action = t.attr('data-action');
    var search = t.val();

    var data = {
        company_id: company_id,
        action: action,
        search: search
    };

    ajaxCall(t, url, action, data)
});

$(document).on('click', '.attendance_update',function (e) {
    var action = 'attendance-update'
    var id = $(this).attr('data-id');
    var user_id = $(this).attr('data-user-id');
    var training_id = $(this).attr('data-training-id');

    var url = $(this).attr('data-url');
    var user_id = $(this).attr('data-user-id');

    var mainParent = $(this).parent('.required-toggle-btn');
    if($(mainParent).find('input.attendance_update').is(':checked')) {
        $(mainParent).addClass('active');
        var val = '1';
    } else {
        $(mainParent).removeClass('active');
        var val = '0';
    }

    var data = {
        "action": action,
        'id': id,
        "user_id": user_id,
        "training_id" : training_id,
        "val":val
    };

   ajaxCall($(this), url, action, data)
});

$(document).on('click', '.followup_completed',function (e) {
    var action = $(this).attr('data-action');
    var id = $(this).attr('data-id');
    var url = $(this).attr('data-url');

    var data = {
        "action": action,
        'id': id,
    };

   ajaxCall($(this), url, action, data)
});

$(document).on('click', '.roadmapUnChk',function (e) {
    var action = $(this).attr('data-action');
    var id = $(this).attr('data-id');
    var url = $(this).attr('data-url');

    var data = {
        "action": action,
        'id': id,
    };

    if (confirm("Are you sure want to undo this enrollment step?")) {
        ajaxCall($(this), url, action, data)
    }

    return false;
});

$(document).on('click', '.inServiceAccept',function () {
    var action = 'accept-in-service'

    var url = $(this).attr('data-url');
    var training_id = $(this).attr('data-training-id');
    var duration = $(this).attr('data-duration');
    var date = $(this).attr('data-date');
    var user_id = $(this).attr('data-user-id');

    var data = {
        "action": action,
        'training_id': training_id,
        'duration': duration,
        'training_date': date,
        'user_id': user_id
    };
    if (confirm("Are you sure want to accept this in service?")) {
        ajaxCall($(this), url, action, data)
    }
});

$(document).on('click', '.applicantStatus',function () {
    var action = 'applicant-status-update'
    var status = $(this).val();
    var id = $(this).attr('data-id');
    var url = $(this).attr('data-url');

    var data = {
        "action": action,
        'status': status,
        'id': id
    };

   ajaxCall($(this), url, action, data)
});

/** Filter user on keyup textbox */
$(document).on('keyup', '.auto-search-input',function () {
    var t = $(this);
    var url = t.attr('data-url');
    var action = t.attr('data-action');
    var value = t.val();
    var route = t.attr('data-route');
    var role = t.attr('data-role');

    var data = {
        email: value,
        search: value,
        field: 'email',
        route: route,
        action: action,
        role: role
    };

    if (value == '') {
        $('.auto-search-result').hide();
    } else {
        ajaxCall(t, url, action, data)
    }
});

$(".enrollment-date").datepicker({
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
    numberOfMonths: 1,
    changeYear: true,
    changeMonth: true,
    dateFormat: "mm/dd/yy",
    onSelect: function (dateText, inst) {
        onselectDate($(this), dateText);
    },
 });

 var d = new Date();
   var year = d.getFullYear();
$(".medical_date").datepicker({
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
    numberOfMonths: 1,
    changeYear: true,
    changeMonth: true,
    yearRange: "1910:" + year,
    dateFormat: "mm/dd/yy",
    maxDate: 0,
    onSelect: function (dateText, inst) {
        var date_id = $(this).attr('data-id');
        var date = new Date(dateText);
        var newDate = addOneYear(date);

        var dd = String(newDate.getDate()).padStart(2, '0');
        var mm = String(newDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = newDate.getFullYear();
        var today = mm + '/' + dd + '/' + yyyy;

        $("#"+date_id).val(today);
    },
});

function addOneYear(dateText) {
    dateText.setFullYear(dateText.getFullYear() + 1);
    return dateText;
}

$( ".dashboard .box-sortable").sortable({
    connectWith: ".box-sortable",
    stack: '.section-box',
    cursor: "move",
    update: function (event, ui) {
        var stepData = [];
        $(document).find(".box-sortable").each(function( i, x ) {
            var row = $(this).attr('data-row');
            $(this).find(".section-box").each(function( i, x ) {
                $(this).attr('data-sequence', i+1);
                var box_name = $(this).attr('data-name');


                stepData.push(
                   {'sequence': i+1, 'box_name': box_name, 'row': row},
                );
            });
        });

        //    $(document).find(".section-box").each(function( i, x ){
        //       $(this).attr('data-sequence', i+1);
        //       var box_name = $(this).attr('data-name');

        //       stepData.push(
        //          {'sequence': i+1, 'box_name': box_name},
        //       );
        //    });
       var action = 'change-dashboard-sequence'
       var data = {
          "action": action,
          'stepData': stepData
       };

       ajaxCall($(this), operationUrl, action, data)
    }
 }).disableSelection();;

$(".enrollment-timeline, .enrollment-steps").sortable({
    connectWith: ".connected-sortable",
    stack: '.connected-sortable div',
    cursor: "move",
    update: function (event, ui) {
        var stepData = [];
        $(".enrollment-date").val('');
        $(document).find(".enrollment-timeline .dragable-step").each(function( i, x ){
            $(this).attr('data-sequence', i+1);

            var enrollment_id = $(this).attr('data-id');
            var date = $(this).attr('data-date');
            stepData.push(
                {'sequence': i+1, 'enrollment_id': enrollment_id, 'date': date},
            );
        });
        var action = 'change-sequence'
        var data = {
            "action": action,
            'stepData': stepData
        };

       ajaxCall($(this), operationUrl, action, data)
    }
});

$(document).on('click', '.criterial',function () {
    var t = $(this);
    var value = t.val();

    var data = {
        "value": value,
    };

    var action = 'criterial'
    ajaxCall(t, criteriaUrl, action, data)
});

/** get document */
$(document).on('click', '.view_doc_clip',function () {
    var t = $(this);
    var url = t.attr('data-url');
    var action = t.attr('data-action');
    var user_id = t.attr('data-id');
    var type = t.attr('data-type');
    var title = t.attr('data-title');
    var page = t.attr('data-page');

    var data = {
        "user_id": user_id,
        "type": type,
        "action": action,
        "title": title,
        "page": page
    };

    ajaxCall(t, url, action, data)
});

/** Get step name and put step name in textbox */
$('body').on('change', '.step_id', function () {
    var step_name = $(this).find(':selected').attr('data-name')
    $(this).parents('.grid-item').find('.doc_name').val(step_name);
});


$('body').on('click', '.compliance_frequency', function (e) {
    if($(this).val() === '2') {
        $(".days").show();
    } else {
        $(".days").hide();
    }
});

$('body').on('change', '.assign_primary_id', function (e) {
    var intake_id = $(this).val();
    var user_id = $(this).attr('data-id');
    var operationUrl = $(this).attr('data-url');
    var action = $(this).attr('data-action');

    var data = {
        "action" : action,
        "intake_id" : intake_id,
        "user_id" : user_id,
        "primary" :'1'
    };

    if (intake_id) {
       ajaxCall($(this), operationUrl, action, data);
    }
});

$('body').on('click', '.editData1', function () {
    $(this).closest("tr").find(".edit-text1").show();
    $(this).closest("tr").find(".office_names").hide();

    $(this).closest("tr").find(".cancel-edit1").show();
});

$('body').on('click', '.cancel-edit1', function () {
    $(this).closest("tr").find(".edit-text1").hide();
    $(this).closest("tr").find(".office_names").show();
    $(this).hide();
});

$('body').on('click', '.editData', function () {
    $(this).closest("tr").find(".edit-text").show();
    $(this).closest("tr").find("span").hide();

    $(this).closest("tr").find(".edit-btn").hide();
    $(this).closest("tr").find(".update-btn").show();
    $(this).closest("tr").find(".add_button").show();
    $(this).closest("tr").find(".cancel-edit").show();

    $(this).closest("tr").find(".primary-field").prop("disabled", false);
});

$('body').on('click', '.cancel-edit', function () {
    $(this).closest("tr").find(".edit-text").hide();
    $(this).closest("tr").find("span").show();
    $(this).hide();

    // $(this).closest("tr").find(".edit-btn").show();
    // $(this).closest("tr").find(".update-btn").hide();
    // $(this).closest("tr").find(".add_button").show();

    // $(this).closest("tr").find(".primary-field").prop("disabled", false);
});

$(document).on('click', '.start_application', function (e) {
    var id = $(this).attr('data-id');
    var category_id = $(this).attr('data-category-id');
    var category_name = $(this).attr('data-category-name');

    $('.start_patient_app_btn').show();
    $('.send_applicat_btn').show();
    $('.start_applicat').show();

    if (id === 'start-application') {
        $('.send_label span').hide();
        $('.start_from').val('2');
        $('.sub_category').attr('data-from',2);
        $('.start_application_btn').text('Save & Start');

        if(category_name === 'CDPAP') {
            $('.patient_application').show();
            $('.start_applicat_btn').show();
            $('.start_application_btn').attr('data-part', 'onlyPatient');
        } else {
            $('.patient_application').hide();
            $('.start_applicat_btn').hide();
            $('.start_application_btn').attr('data-part', 'onlyApplicant');
        }
    } else if (id === 'send-application-link') {
        $('.send_label span').show();
        $('.start_from').val('1');
        $('.sub_category').attr('data-from',1);
        $('.start_application_btn').attr('data-part', 'sendBoth');
        $('.start_application_btn').text('Save & Send');
        $('.start_applicat_btn').hide();

        if(category_name === 'CDPAP') {
            $('.patient_application').show();
        } else {
            $('.patient_application').hide();
        }
    }
});

// $('body').on('change', '.insurance_type', function (e) {
//     var id = $(this).val();
//     var operationUrl = $(this).attr('data-url');
//     var action = $(this).attr('data-action');
//     alert(operationUrl);
//     var data = {
//         "action" : action,
//         "status" : id,
//     };

//     if (id) {
//        ajaxCall($(this), operationUrl, action, data);
//     }
// });

$('body').on('click', '.update-btn', function () {

    var t = $(this);
    var action = $(this).attr('data-action');

    if (action === 'edit-insurance-user-data' || action === 'add-insurance-user') {
        var first_name = $(this).closest("tr").find(".first_name").val();
        var last_name = $(this).closest("tr").find(".last_name").val();
        var phone = $(this).closest("tr").find(".phone").val();
        var email = $(this).closest("tr").find(".email").val();
        var insurance_id = $(this).closest("tr").find(".insurance_id").val();
    }

    var id = $(this).attr('data-id');
    var url = $(this).attr('data-url');

    if (first_name == '' && email == '') {
        $(".add_some_info").append('<td colspan="4"><div class="add_some_info"><label class="error">Please add some information.</label></div></td>');
    } else {
        $(".add_some_info").html('');

        var data = {
            "insurance_id": insurance_id,
            "first_name": first_name,
            "last_name": last_name,
            "phone": phone,
            "email": email,
            "id_for_update": id,
        };

        ajaxCall(t, url, action, data)
    }
});

$('body').on('change', '.form_language', function () {
    var url = $(this).attr('data-url');
    var action = $(this).attr('data-action');
    var form_language = $(this).val();
    var user_id = $(this).attr('data-userId');
    var data = {
        "action": action,
        "form_language" : form_language,
        "user_id" : user_id
    };
    if (form_language != "") {
        if (confirm("Are you sure want to update form language?")) {
            ajaxCall($(this), url, action, data)
        }
    }
});

/*@Fetch category of department on change event of department */
$('body').on('change', '.category_id, .sub_category_id, .office_id, .exception_id, .sub_category_1', function () {
    var url = $(this).attr('data-url');
    var action = $(this).attr('data-action');
    var hhaxid = $(".sub_category option:selected").attr('data-hhaxid');
    
    var id = $(this).val();
   
    var data = {
        "id": id,
        "action": action,
        'hhaxid': hhaxid
    };
    
    if (id != "") {
        ajaxCall($(this), url, action, data)
    }
});

/*@Fetch category of department on change event of department */
/*Open message in model */
$("body").on('click',".insuranceLongTermOptionsPopup input[type='radio'], .insuranceShortTermOptionsPopup input[type='radio']",function () {
    var url = $(this).attr('data-url');
    var action = $(this).attr('data-action');
    var category_id = $(this).val();

    var data = {
        "value": category_id,
        "action": action,
    };

    if (category_id != "") {
        ajaxCall($(this), url, action, data)
    }
});

/*@Fetch category of department on change event of department */
$('body').on('change', '.get_wage_info', function () {
    var url = $(this).attr('data-url');
    var action = $(this).attr('data-action');
    var category_id = $(this).val();
 var category_name = $(".get_wage_info option:selected").text();

    var data = {
        "category_id": category_id,
        "action": action,
"category_name": category_name
    };

    if (category_id != "") {
        ajaxCall($(this), url, action, data)
    }
});

$('body').on('change', '.steps_of_application', function () {
    var url = $(this).attr('data-url');
    var action = $(this).attr('data-action');
    var step_value = $(this).val();

    var data = {
        "step_value": step_value,
        "action": action,
    };

    if (step_value != "") {
        Swal.fire({
            title: "Are you sure want to?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I am sure!"
        }).then((result) => {
            if (result.isConfirmed) {
                ajaxCall($(this), url, action, data)
            }
        })
    }
});

$(document).on("change", ".suggestion_answer_status", function () {
    var quetion_id = $(this).attr('data-id');
    var action = $(this).attr('data-action');
    var url = $(this).attr('data-url');
    var answer = $(this).val();
  
    var elementId = "#wrong_answer_suggestion_" + quetion_id;
  
    if ($(elementId).css('display') === 'inline-flex') {
        var data = {
            "quetion_id": quetion_id,
            "action": action,
            "answer": answer    
        };

        if (quetion_id != "") {       
            ajaxCall($(this), url, action, data)
        }    
    }
});

$('body').on('click', '.application_send', function () {
    var applicant_id = $(this).attr('data-id');
    var action = $(this).attr('data-action');
    var url = $(this).attr('data-url');

    var data = {
        "applicant_id": applicant_id,
        "action": action
    };

    if (applicant_id != "") {
        ajaxCall($(this), url, action, data)
    }
});

$('body').on('click', '.legallyAuthorisedCheck', function () {
    var type = $(this).attr('data-type');
    var url = $(this).attr('data-url');
    var action = 'update-application-error';
    var id = $(this).attr('data-applicant-id');

    if (type == 1) {
        $("#legallyAuthorisedCheck").show();
        $("#next").show();
    } else {
        $("#legallyAuthorisedCheck").hide();
        $("#next").hide();
        $(".btnDiv").hide();
        $("#submitApplication").hide();
        $("#printApplication").hide();
          alert(contact_soon);
        $('.nextBtn').attr('disabled', true);
        // if (url != '') {
        //     location.href = url;
        // }
        var data = {
            'tab': '1',
            'error': contact_soon,
            'id': id,
            'action': action
        };
        ajaxCall($(this), url, action, data)
    }
});

$('body').on('change', '.insurance_name_at_update', function () {
    var insurance_id = $(this).find(':selected').data('id');
    $(this).closest('td').find(".insurance_id_at_update").val(insurance_id);
});

$('body').on('change', '.insurance_name_action', function () {
    var t = $(this);
    var insurance_id = $(this).val();
    var action = $(this).attr('data-action');
    var url = $(this).attr('data-url');
    var user_id = $(this).attr('data-user-id');

    var data = {
        "insurance_id": insurance_id,
        "action": action,
        "user_id": user_id
    };

    if (insurance_id != "") {
        ajaxCall(t, url, action, data)
    }
});

$('body').on('click', '.print_page', function () {

    var t = $(this);
    var url = t.attr('data-url');
    var action = 'test';
    var data = {
        url: url,
    };

    ajaxCall(t, url, action, data)
});

$('body').on('click', '.custom-search-box ul li', function (e) {
    var value = $(this).text();
    var id = $(this).attr('data-id');

    $(this).closest(".custom-search-box").find(".user_name").val(id);
    $(this).closest(".custom-search-box").find(".auto-search-input").val(value);
    $(this).parent("ul").fadeOut();
});

$('body').on('click', '.masterDataPopup', function (e) {
    var title = $(this).attr('data-title');
    var table = $(this).attr('data-slug');

    $(".master-popup-title").html("Add "+title+ " Option / Detail");
    $(".master_slug").val(table);
});


$('body').on('click', ".insurance input[type='radio']", function (e) {
    e.stopPropagation();

    if ($(".insuranceLongTerm").is(":checked")) {
       $(".insuranceLongTermOptionsPopup").show();
       $(".insuranceShortTermOptionsPopup").hide();
    } else {
       $(".insuranceLongTermOptionsPopup").hide();
    }
    if ($(".insuranceShortTerm").is(":checked")) {
       $(".insuranceShortTermOptionsPopup").show();
       $(".insuranceLongTermOptionsPopup").hide();
    } else {
       $(".insuranceShortTermOptionsPopup").hide();
    }
 });

    $('.emailUnique').blur(function () {
         var t = $(this);
         var url = t.attr('data-url');
         var action = t.attr('data-action');
         var page = t.attr('data-page');
         var emailVal = t.val();

         var dataObject = {
            "action": action,
            "email": emailVal,
            "page": page
         };
       
         if (emailVal != '') {
            ajaxCall(t, url, action, dataObject)
         }  else {
            $(".is_rehired_section").hide();
            t.parent('.grid-item').find('.emailvalidation').text('');
         }
      });