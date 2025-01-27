import {
    loader,
    clearloader,
    alertText
} from "./common_function.js";

$( ".draggable-popup" ).draggable();

/*@ Radio button unclicked with diffrent name(Primary coordinator) */
$('body').on('click', '.primaryRadio', function () {
    $(".primaryRadio").prop("checked","");
    $(this).prop("checked","checked");
});

/** */
$(".start-of-care-date").datepicker({
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
    numberOfMonths: 1,
    changeYear: true,
    changeMonth: true,
    dateFormat: "mm/dd/yy",
    minDate: 0,
 });

/** Get referrer, marketer, physician on change first name */
$('body').on('change', '.get_detail_for_referral_form', function () {
    var user_id = $(this).find(':selected').attr('data-id');
    var action = $(this).attr('data-action');
    var url = $(this).attr('data-url');

    if (user_id) {
        loader()
        $.ajax({
            'type': 'POST',
            'url': url,
            data: {
                "user_id": user_id,
                "action": action
            },
            'success': function (data) {
                if (action === 'get-referrer-detail') {
                    // $('.referrer_first_name').val(data.data.referrer.first_name);
                    // $('.referrer_last_name').val(data.data.referrer.last_name);
                    $('#referrer_last_name option[value="'+data.data.referrer.last_name+'"]').prop('selected', 'selected').change();
                    $('#referrer_email').val(data.data.referrer.email);
                    $('#referrer_phone').val(data.data.referrer.phone);
                    $('#referrer_id').val(data.data.referrer.id);

                    $("#referrer_email, #referrer_last_name, #referrer_phone").removeClass('error');
                    $("#referrer_email-error, #referrer_last_name-error, #referrer_phone-error").css({"display" : "none"});
                } else if (action === 'get-marketer-detail') {
                    $('.marketer_first_name').val(data.data.marketer.first_name);
                    $('.marketer_last_name').val(data.data.marketer.last_name);
                    $('#marketer_last_name option[value="'+data.data.marketer.last_name+'"]').prop('selected', 'selected').change();
                    $('#marketer_email').val(data.data.marketer.email);
                    $('#marketer_phone').val(data.data.marketer.home_phone);
                    $('#marketer_id').val(data.data.marketer.id);

                    $("#marketer_email, #marketer_last_name, #marketer_phone").removeClass('error');
                    $("#marketer_email-error, #marketer_last_name-error, #marketer_phone-error").css({"display" : "none"});
                } else if (action === 'get-physician-detail') {
                    $('.physician_fist_name').val(data.data.physician.first_name);
                    $('.physician_last_name').val(data.data.physician.last_name);
                    $('#physician_id').val(data.data.physician.id);
                    $('#physician_last_name option[value="'+data.data.physician.last_name+'"]').prop('selected', 'selected').change();
                    $('#physician_phone').val(data.data.physician.phone);
                    $('#physician_fax').val(data.data.physician.view_fax);
                    $('#physician_license').val(data.data.physician.license);
                    $('#secondAddress1').val(data.data.physician.address['address_line_1']);
                    $('#secondAddress2').val(data.data.physician.address['address_line_2']);
                    $('#secondCity').val(data.data.physician.address['city']);
                    $('#secondState').val(data.data.physician.address['state']);
                    $('#secondZipcode').val(data.data.physician.address['zipcode']);
                    $('#borough').val(data.data.physician.address['borough']);
                    $('#secondCounty').val(data.data.physician.address['county']);

                    $("#physician_last_name, #physician_phone, #physician_fax, #physician_license, #secondAddress1, #secondAddress2, #secondCity, #secondState, #secondZipcode, #borough, #secondCounty").removeClass('error');
                    $("#physician_last_name-error, #physician_phone-error, #physician_fax-error, #physician_license-error, #secondAddress1-error, #secondAddress2-error, #secondCity-error, #secondState-error, #secondZipcode-error, #borough-error, #secondCounty-error").css({"display" : "none"});
                }

                clearloader();
            },
            "error":function () {
                alertText("Server Timeout! Please try again", 'error');
                clearloader();
            }
        });
    }
});

/** Referral master page js start */
$('body').on('click', '.insurance_user', function () {
    $(this).parents('tr').next(".insurance_user_div").toggle('slow');
});

$('body').on('click', '.cancle-icon', function () {
    $(this).closest("tr").find(".first_name_text").val('');
    $(this).closest("tr").find(".last_name_text").val('');
    $(this).closest("tr").find(".phone_text").val('');
    $(this).closest("tr").find(".email_text").val('');
});

$('body').on('click', '.completed_steps, .add_more_steps', function () {
    $('#modal').modal('hide');
    $(".roadmapchk").prop('checked', "");
});
