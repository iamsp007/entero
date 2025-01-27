import {
    loader,
    clearloader,
    loadSection,
    notification
} from "../common_function.js";

jQuery(document).ready(function ($) {
    $("form[name='form_medical']").validate({
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
                        loadSection('medical-tab-content');
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

  $.validator.addMethod("ssnFormat",function(value, element) {    
        // Regular expression to match the format XXX-XX-5654 or 768-76-5654
        return this.optional(element) ||  /^(xxx-xx-\d{4}|\d{3}-\d{2}-\d{4})$/.test(value); },
        "Please enter a valid SSN (e.g., XXX-XX-XXXX)."
        );
 
    $.each(personal_required.personal, function (key, value) {
        rules[value] = {
            required: true
        };

 	var storedFileName = $('#avatar_valid').data('filename');
        var fileInput = $('#avatar_valid');

        if(key === 'avatar') {
            if(fileInput.length === 0 && !storedFileName)
            {
                var field = 'select';
                var replace_key = key.replace(/_/g, ' ');
                messages['avatar'] = {
                    required: "Please " + field + " " + replace_key,
                };
            }
            else{
                rules["avatar"].required = false;
            }
        }

        var field = 'enter';
        if (key === 'title') {
            var field = 'select';
        }

        var replace_key = key.replace(/_/g, ' ');

        messages[value] = {
            required: "Please " + field + " " + replace_key,
        };

        messages['avatar'] = {
            required: "Please upload profile pic"
        };
    });

 rules["ssn"] = rules["ssn"] || {};
    rules["ssn"].ssnFormat = true;

    $.each(personal_required.language, function (key, value) {
        rules['languages[other_primary_lang]'] = {
            required : function(element) {
                return ($('#primary_langauge option:selected').text() == 'Other');
            },
        },

        rules['languages[other_spoken_language]'] = {
            required : function(element) {
                var items = $("#other_spoken_lang").val();
                if($.inArray('Other', items) !== -1 ) {
                    return true;
                }
            },
        },

        rules[value] = {
            required: true
        };

        var replace_key = key.replace(/_/g, ' ');

        messages['languages[other_primary_lang]'] = {
            required: "Please enter other primary language.",
        };

        messages['languages[other_spoken_language]'] = {
            required: "Please enter other spoken language.",
        };

        messages[value] = {
            required: "Please select " + replace_key,
        };
    });

    $.each(personal_required.address, function (key, value) {
        rules[value] = {
            required: true
        };

        var field = 'enter';
        if (key === 'county') {
            var field = 'select';
        }

        var replace_key = key.replace(/_/g, ' ');

        messages[value] = {
            required: "Please " + field + " " + replace_key,
        };
    });

    $.each(personal_required.allergic, function (key, value) {
        rules[value] = {
            required: true
        };
        var replace_key = key.replace(/_/g, ' ');

        messages[value] = {
            required: "Please select " + replace_key,
        };
    });

    $.each(personal_required.other_info, function (key, value) {
        rules[value] = {
            required: true
        };

        var field = 'enter';
        if (key === 'is_citizen' || key === 'is_maiden' || key === 'marital_status' || key === 'eye_color' || key === 'hair_color') {
            var field = 'select';
        }

        var replace_key = key.replace(/_/g, ' ');

        messages[value] = {
            required: "Please " + field + " " + replace_key,
        };
    });

    $("form[name='form_demographic']").validate({
        ignore: [],
        rules: rules,
        invalidHandler: function(form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top - 100
            }, 1000);
        },
        errorPlacement: function (error, element) {
            if(element.hasClass('spoken_language') && element.next('.select2-container').length) {
                error.insertAfter(element.next('.select2-container'));
            } else if(element.hasClass('allergics') && element.parents('.grid-row').length) {
                error.insertAfter(element.parents('.grid-row'));
            } else if(element.hasClass('selection_field') && element.parents('.single-row').length) {
                error.insertAfter(element.parents('.single-row'));
            } else if(element.hasClass('is_maiden') && element.parents('.single-row').length) {
                error.insertAfter(element.parents('.single-row'));
            } else if(element.hasClass('is_citizen') && element.parents('.single-row').length) {
                error.insertAfter(element.parents('.single-row'));
            } else if(element.hasClass('height-feet') && element.parents('.height-container').length) {
                error.insertAfter(element.parents('.height-container'));
            } else if(element.hasClass('types_certification') && element.parents('.single-row').length) {
                error.insertAfter(element.parents('.single-row'));
            } else if(element.hasClass('work_days') && element.parents('.work-availability-table').length) {
                error.insertAfter(element.parents('.table-responsive'));
            } else if(element.hasClass('leftWorkTime') && element.parents('.work-availability-table').length) {
                // error.insertAfter(element.parents('.table-responsive'));
            } else if(element.hasClass('preferred_method') && element.parents('.grid-item').length) {
                element.parents('.grid-item').append(error);
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
                        //loadSection('referredByName');
                        //loadSection('allicant-name-status');
                        //loadSection('personal_detail_section');
                        //loadSection('language_section');
                        //loadSection('address_section');
                        //loadSection('allergic_section');
                        //loadSection('other-information');
                        //loadSection('call_phone_tab');
                        loadSection('referredBy');
                        loadSection('applicant-profile-details');
                        $(".update-cancel-btn-container").fadeOut();
                        $(".edit-profile-btns").fadeOut();
                        $(".edit-category").fadeIn();
                        
                        //$('#other_spoken_lang').select2();

                        // $('.spoken_language').select2();
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

    $.each(personal_required.working, function (key, value) {

        rules[value] = {
            required: true
        };

        var field = 'enter';
        if (key === 'title') {
            var field = 'select';
        }

        var replace_key = key.replace(/_/g, ' ');
        messages[value] = {
            required: "Please " + field + " " + replace_key,
        };
    });
    $("form[name='form_availability']").validate({
        ignore: [],
        rules: rules,
        invalidHandler: function(form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top - 100
            }, 1000);
        },
        errorPlacement: function (error, element) {
            if(element.hasClass('types_certification') && element.parents('.single-row').length) {
                error.insertAfter(element.parents('.single-row'));
            } else if(element.hasClass('work_days') && element.parents('.work-availability-table').length) {
                error.insertAfter(element.parents('.table-responsive'));
            } else if(element.hasClass('leftWorkTime') && element.parents('.work-availability-table').length) {
                // error.insertAfter(element.parents('.table-responsive'));
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
                        loadSection('work-availability-table');
                        loadSection('work_availablity1');
                        loadSection('work_availablity2');
                        loadSection('work_area1');
                        loadSection('work_area2');
                        $(".update-cancel-btn-container").fadeOut();
                        $(".edit-category").fadeIn();
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
                        hidePopup("form_note");
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

    var rules = {};
    var messages = {};
    rules['bank_detail[check_type]'] = {
        required : function(element) {
            return '.depositeCheck[value="check"]:checked';
        }
    };

    rules['bank_detail[bank_name]'] = {
        required : function(element) {
            return bankDetailRequiredOrNot()
        }
    };
    rules['bank_detail[routing_number]'] = {
        required : function(element) {
            return bankDetailRequiredOrNot()
        }
    };
    rules['bank_detail[account_number]'] = {
        required : function(element) {
            return bankDetailRequiredOrNot()
        }
    };
    rules['confirm_account_number'] = {
        equalTo : function(element) {
            return confirmBankDetailRequiredOrNot()
        }
    };

    messages['bank_detail[bank_name]'] = {
        required: "Please enter bank name"
    }
    messages['bank_detail[routing_number]'] = {
        required: "Please enter routing number"
    }
    messages['bank_detail[account_number]'] = {
        required: "Please enter account number"
    }
    messages['confirm_account_number'] = {
        equalTo: "The account number confirmation does not match."
    }
    $("form[name='form_deposite']").validate({
        ignore: [],
            rules: rules,
            invalidHandler: function(form, validator) {
                if (!validator.numberOfInvalids())
                    return;

                $('html, body').animate({
                    scrollTop: $(validator.errorList[0].element).offset().top - 100
                }, 1000);
            },
            errorPlacement: function (error, element) {
                if(element.hasClass('filling') &&element.parents('.single-row').length) {
                    error.insertAfter(element.parents('.single-row'));
                } else if(element.hasClass('parallel_job') &&element.parents('.single-row').length) {
                    error.insertAfter(element.parents('.single-row'));
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
                            loadSection('payroll');
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

    function bankDetailRequiredOrNot() {
        return '.depositeCheck[value="deposit"]:checked';
    }

    function confirmBankDetailRequiredOrNot() {
        if('.depositeCheck[value="deposit"]:checked') {
            return "#account_number";
        }
    }
});
