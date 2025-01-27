import {
    loader,
    clearloader,
    hidePopup,
    loadSection,
    tableRefresh
} from "../common_function.js";

jQuery(document).ready(function ($) {
    $('body').on('click', '.add_other_label', function () {
        $(this).html(function(_, tag) {
            var name = $(this).attr('data-name');
            var id = $(this).attr('data-id');

            if (tag === '<i class="fas fa-plus-circle"></i>') {
                $("#"+id).val('');
                $(this).parents('.grid-item').find('.add_new_select_div').find('select').attr('name', '');
                $(this).parents('.grid-item').find('.add_new_select_div').hide();
                $(this).parents('.grid-item').find('.add_new_text_div').append('<input type="text" name="'+name+'" placeholder="Enter first name"/>');

                return '<i class="fas fa-minus-circle"></i>';
            } else {
                $(this).parents('.grid-item').find('.add_new_select_div').find('select').attr('name', name);
                $(this).parents('.grid-item').find('.add_new_select_div').show();
                $(this).parents('.grid-item').find('.add_new_text_div').html('');

                return '<i class="fas fa-plus-circle"></i>';
            }
        })
    });

    $.validator.addMethod('medicaidFormat', function(value, element) {
        const regex = /^[A-Z]{2}\d{5}[A-Z]{1}$/i;

        return this.optional(element) || regex.test(value);
    }, 'Medicaid no format is invalid.');

    var rules = {};
    var messages = {};

    var arraysToMerge = [
        personal_required.personal,
        personal_required.eligibility,
        personal_required.marketer_referrer,
        personal_required.physicians,
    ];

    $.each(arraysToMerge, function (index, array) {
        $.each(array, function (key, fieldName) {
            rules[fieldName] = {
                required: true
            };

            var replace_key = key.replace(/_/g, ' ');
            messages[fieldName] = {
                required: "Please enter " + replace_key,
            };
        });
    });

    rules["patient_detail[medicaid_id]"] = rules["patient_detail[medicaid_id]"] || {};
    rules["patient_detail[medicaid_id]"].medicaidFormat = true;

    rules["patient_detail[medicare_id]"] = rules["patient_detail[medicare_id]"] || {};
    rules["patient_detail[medicare_id]"].minlength = 11;

    $("form[name='form_patient']").validate({
        ignore: [],
        rules: rules,
        errorPlacement: function (error, element) {
            if(element.hasClass('js-example-tags') && element.next('.select2-container').length) {
                error.insertAfter(element.next('.select2-container'));
            } else {
                error.insertAfter(element);
            }
        },
        invalidHandler: function(form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top - 100
            }, 1000);
        },
        messages: messages,
        submitHandler: function(form) {
            loader();
            $.ajax({
                type: form.method,
                url: form.action,
                data: new FormData(form),
                processData: false,
                contentType: false,
                success: function(response) {
                    clearloader();

                    if(response.code == 200) {
                        window.location.href = $(form).attr("data-redirecturl");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    clearloader();

                    if (xhr.status === 422) {
                        var errors = xhr.responseJSON.errors;

                        $.each(errors, function (field, messages) {
                            var inputField = $('[name="' + field + '"]');
                            inputField.closest('.grid-item').append('<label class="error">' + messages[0] + '</label>');
                        });
                    } else {
                        notification.error("Error: " + errorThrown);
                    }
                }
            });
            return false;
        }
    });
});
