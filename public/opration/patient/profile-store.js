import {
    loader,
    clearloader,
    hidePopup,
    loadSection,
    tableRefresh,
    notification
} from "../common_function.js";

jQuery(document).ready(function ($) {
    $("form[name='form_enrollment_step']").validate({
        rules: {
            "step_id[]": { required: true},
        },
        errorPlacement: function (error, element) {
            if(element.hasClass('enrollment-step-id') && element.parents('.grid-steps').length) {
                error.insertAfter(element.parents('.grid-steps'));
            } else {
                error.insertAfter(element);
            }
        },
        messages : {
            "step_id[]": {
                required : "Please select steps."
            },
        },
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
                        loadSection('enrollment-timeline');
                        loadSection('enrollment-steps');
                        loadSection('progress-bar-container');
                        hidePopup("form_enrollment_step");
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

    var rules = {};
    var messages = {};
    $.each(personal_required.physicians, function (key, value) {
        rules[value] = {
            required: true
        };

        var replace_key = key.replace(/_/g, ' ');

        messages[value] = {
            required: "Please enter" + replace_key,
        };
    });
    $("form[name='form_physician']").validate({
        ignore: [],
        rules: rules,
        invalidHandler: function(form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('.physician-details').animate({
                scrollTop: $(validator.errorList[0].element).offset().top
            }, 1000);
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            if(element.hasClass('disabled-field') && element.parents('.grid-input').length) {
                error.insertAfter(element.parents('.grid-input'));
            } else {
                error.insertAfter(element);
            }
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

                    notification.success(response.message);
                    if(response.code == 200) {
                        loadSection("physician_section");
                        loadSection("physician_address_section");
                        $(".update-cancel-btn-container").fadeOut();
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

    $.validator.addMethod('medicaidFormat', function(value, element) {
        const regex = /^[A-Z]{2}\d{5}[A-Z]{1}$/i;

        return this.optional(element) || regex.test(value);
    }, 'Medicaid no format is invalid.');

    var rules = {};
    var messages = {};

    $.each(personal_required.eligibility, function (key, field) {
        rules[field] = {
            required: true
        };

        var replace_key = key.replace(/_/g, ' ');

        messages[field] = {
            required: "Please enter" + replace_key,
        };
    });

    rules["patient_detail[medicaid_id]"] = rules["patient_detail[medicaid_id]"] || {};
    rules["patient_detail[medicaid_id]"].medicaidFormat = true;

    rules["patient_detail[medicare_id]"] = rules["patient_detail[medicare_id]"] || {};
    rules["patient_detail[medicare_id]"].minlength = 11;

    $("form[name='form_eligibility']").validate({
        ignore: [],
        rules: rules,
        messages: messages,
        errorPlacement: function (error, element) {
            if(element.hasClass('medicaid_number') && element.parents('.grid-row').length) {
                error.insertAfter(element.parents('.grid-row'));
            } else if(element.hasClass('medicare_number') && element.parents('.grid-row').length) {
                error.insertAfter(element.parents('.grid-row'));
            } else {
                error.insertAfter(element);
            }
        },
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
                    notification.success(response.message);
                    if(response.code == 200) {
                        loadSection("patient_exception_data");
                        loadSection("eligibility_section");
                        $(".update-cancel-btn-container").fadeOut();
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

    var rules = {};
    var messages = {};

    $.each(personal_required.introduction, function (key, value) {
        rules[value] = {
            required: true
        };

        var replace_key = key.replace(/_/g, ' ');

        messages[value] = {
            required: "Please enter " + replace_key,
        };
    });

    // rules["patient_detail[rate_id]"] = {
    //     required: function(element) {
    //         return requiredIfServiceCDPAP();
    //     },
    // };

    rules["patient_detail[previous_rate]"] = {
        required: function(element) {
            return requiredIfServiceCDPAP();
        },
    };

    rules["patient_detail[rate_note]"] = {
        required: function(element) {
            return requiredIfServiceCDPAP();
        },
    };

    rules["patient_detail[cdpap_pa_detail][first_name][]"] = {
        required: function(element) {
            return requiredIfServiceCDPAP();
        },
    };

    rules["patient_detail[cdpap_pa_detail][last_name][]"] = {
        required: function(element) {
            return requiredIfServiceCDPAP();
        },
    };

    rules["patient_detail[cdpap_pa_detail][home_phone][]"] = {
        required: function(element) {
            return requiredIfServiceCDPAP();
        },
    };

    rules["patient_detail[cdpap_pa_detail][relation][]"] = {
        required: function(element) {
            return requiredIfServiceCDPAP();
        },
    };

    rules["patient_detail[cdpap_pa_detail][email][]"] = {
        required: function(element) {
            return requiredIfServiceCDPAP();
        },
    };

    rules["patient_detail[introduction][specify_name]"] = {
        required: function(element) {
            return requiredIfCallWithOther();
        },
    };

    // messages["patient_detail[rate_id]"] = 'Please select rate';
    messages["patient_detail[previous_rate]"] = 'Please enter previous rate';
    messages["patient_detail[rate_note]"] = 'Please enter rate note';
    messages["patient_detail[cdpap_pa_detail][first_name][]"] = 'Please enter first name';
    messages["patient_detail[cdpap_pa_detail][last_name][]"] = 'Please enter last name ';
    messages["patient_detail[cdpap_pa_detail][home_phone][]"] = 'Please enter home phone';
    messages["patient_detail[cdpap_pa_detail][relation][]"] = 'Please select relation';
    messages["patient_detail[cdpap_pa_detail][email][]"] = 'Please enter email';
    messages["patient_detail[introduction][specify_name]"] = 'Please specify name';
    $("form[name='form_introduction']").validate({
        ignore: [],
        rules: rules,
        invalidHandler: function(form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('.content').animate({
                scrollTop: $(validator.errorList[0].element).offset().top - 200
            }, 1000);
        },
        errorPlacement: function (error, element) {
            if(element.hasClass('disabled-field') && element.parents('.grid-input').length) {
                error.insertAfter(element.parents('.grid-input'));
            } else if(element.hasClass('type-of-service') && element.parent('.type-of-service').length) {
                error.insertAfter(element.parent('.type-of-service'));
            } else if(element.hasClass('errorplace') && element.parents('.grid-row').length) {
                error.insertAfter(element.parents('.grid-row'));
            } else if(element.hasClass('healthCareProxy') && element.parent('.health-care-proxy-option').length) {
                error.insertAfter(element.parent('.health-care-proxy-option'));
            } else if(element.hasClass('insurance_type') && element.parent('.insurance-option').length) {
                error.insertAfter(element.parent('.insurance-option'));
            } else {
                error.insertAfter(element);
            }
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
                        tableRefresh("note-data");
                        loadSection("applicant-profile-details");
                        loadSection("introduction-form");

                        $(".update-cancel-btn-container").fadeOut();
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

    function requiredIfCallWithOther() {
        return '.call_with[value="other"]:checked';
    }

    function requiredIfServiceCDPAP() {
        return '.typeOfServiceCDPAP[value="1"]:checked';
    }

    $.validator.addMethod('medicaidFormat', function(value, element) {
        const regex = /^[A-Z]{2}\d{5}[A-Z]{1}$/i;

        return this.optional(element) || regex.test(value);
    }, 'Medicaid no format is invalid.');

    var rules = {};
    var messages = {};

    var arraysToMerge = [
        personal_required.personal,
        personal_required.marketer_referrer,
        personal_required.other_info,
    ];

    $.each(arraysToMerge, function (index, array) {
        $.each(array, function (key, value) {
            rules[value] = {
                required: true
            };

            if (value === "patient_detail[medicaid_id]") {
                requiredMedicaid(rules);
            }

            var replace_key = key.replace(/_/g, ' ');
            messages[value] = {
                required: "Please enter " + replace_key,
            };
        });
    });

    rules["patient_detail[medicaid_id]"] = rules["patient_detail[medicaid_id]"] || {};
    rules["patient_detail[medicaid_id]"].medicaidFormat = true;

    rules["patient_detail[medicare_id]"] = rules["patient_detail[medicare_id]"] || {};
    rules["patient_detail[medicare_id]"].minlength = 11;

    $("form[name='form_personal_info']").validate({
        ignore: [],
        rules: rules,
        errorElement: "span",
        errorPlacement: function (error, element) {
            if(element.hasClass('disabled-field') && element.parents('.grid-input').length) {
                error.insertAfter(element.parents('.grid-input'));
            } else if(element.hasClass('typeOfService') && element.parent('.type-of-service').length) {
                error.insertAfter(element.parent('.type-of-service'));
            } else {
                error.insertAfter(element);
            }
        },
        invalidHandler: function(form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('.personal-details').animate({
                scrollTop: $(validator.errorList[0].element).offset().top
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

                    notification.success(response.message);

                    if(response.code == 200) {
                        loadSection("allicant-name-status");
                        loadSection("other_detail_section");
                        loadSection("personal_detail_section");
                        loadSection("contact_detail_section");
                        loadSection("special_detail_section");
                        loadSection("call_phone_tab");
                        loadSection("applicant-profile-details");
                        $(".update-cancel-btn-container").fadeOut();
                        $(".edit-profile-btns").fadeOut();

                        // var script = document.createElement("script");
                        // script.type = "text/javascript";
                        // script.src = "http://thegimbal.local/opration/auto-search-address.js";
                        // script.onload = function() {
                        //     initAddress();
                        // };
                        // document.getElementsByTagName("head")[0].appendChild(script);
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

    $("form[name='form_note']").validate({
        rules: {
            service_type :{
                required: true,
            },
            description:{
                required: true,
            },
        },
        messages : {
            service_type: {
                required : "Please select note type.",
            },
            description: {
                required : "Please enter note.",
            },
        },
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
                        tableRefresh("note-data");
                        $(".add-note-form-container").hide();
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
