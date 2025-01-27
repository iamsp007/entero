import {
    loader,
    clearloader,
    notification
} from "../common_function.js";
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
jQuery(document).ready(function ($) {
    var rules = {};
    var messages = {};

    $.validator.addMethod("atLeastOneChecked", function(value, element, params) {
        return $('input[name^="working["][name$="[name]"]').filter(':checked').length > 0;
    }, validationMessages['days'] || "Please select at least one day.");

	$.validator.addMethod("ssnFormat",function(value, element) {
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
                // var field = 'select';
                // var replace_key = key.replace(/_/g, ' ');
                // messages['avatar'] = {
                //     required: "Please " + field + " " + replace_key,
                // };
            }
            else{
                rules["avatar"].required = false;
            }
        }


        // if ($("#avatar_validation").val() != '' && value === 'avatar') {
        //     rules["avatar"].required = false;
        // }

        var field = 'enter';
        if (key === 'title') {
            var field = 'select';
        }

        var replace_key = key.replace(/_/g, ' ');

        // messages[value] = {
        //     required: "Please " + field + " " + replace_key,
        // };

        // messages['avatar'] = {
        //     required: "Please upload profile pic"
        // };

        messages[value] = {
            required: validationMessages[value] || "Please " + field + " " + replace_key,
        };
    });

    rules["ssn"] = rules["ssn"] || {};
    rules["ssn"].ssnFormat = true;

    $.each(personal_required.language, function (key, value) {
        rules[value] = {
            required: true
        };

        var replace_key = key.replace(/_/g, ' ');


        // messages[value] = {
        //     required: "Please select " + replace_key,
        // };

        messages[value] = {
            required: validationMessages[value] || "Please select " + replace_key,
        };
    });

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

    messages['languages[other_primary_lang]'] = {
        required: validationMessages['languages[other_primary_lang]'] || "Please enter other primary language.",
    };

    messages['languages[other_spoken_language]'] = {
        required: validationMessages['languages[other_primary_lang]'] || "Please enter other spoken language.",
    };

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
            required: validationMessages[value] || "Please " + field + " " + replace_key,
        };
    });

    $.each(personal_required.allergic, function (key, value) {
        rules[value] = {
            required: true
        };
        var replace_key = key.replace(/_/g, ' ');

        // messages[value] = {
        //     required: "Please select " + replace_key,
        // };

        messages[value] = {
            required: validationMessages[value] || "Please select " + replace_key,
        };
    });

    $.each(personal_required.working, function (key, value) {

        rules[value] = {
            required: true
        };

        if (value === 'days') {
            rules['working[Sunday][name]'] = {
                atLeastOneChecked: true
            };
        }

        var field = 'enter';
        if (key === 'title') {
            var field = 'select';
        }

        var replace_key = key.replace(/_/g, ' ');
        // messages[value] = {
        //     required: "Please " + field + " " + replace_key,
        // };

        messages[value] = {
            required: validationMessages[value] || "Please select " + replace_key,
        };
    });
    // console.log(personal_required.other_info);
    $.each(personal_required.other_info, function (key, value) {
        rules[value] = {
            required: true
        };


        var field = 'enter';
        if (key === 'is_citizen' || key === 'is_maiden' || key === 'marital_status' || key === 'eye_color' || key === 'hair_color') {
            var field = 'select';
        }

        var replace_key = key.replace(/_/g, ' ');

        // messages[value] = {
        //     required: "Please " + field + " " + replace_key,
        // };

        messages[value] = {
            required: validationMessages[value] || "Please " + field + " " + replace_key,
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
            } else if(element.hasClass('image_preview') && element.parents('.grid-item').length) {
                element.parents('.grid-item').append(error);
                 
            } else {
                error.insertAfter(element);
            }
        },
        messages: messages,
        submitHandler: function(form) {
            loader();

            var formData = new FormData(form);
            submitAction(form, formData)
        }
    });

    var rules = {};
    var messages = {};

    $.each(personal_required.tax, function (key, value) {
        rules[value] = {
            required: true
        };

        var replace_key = key.replace(/_/g, ' ');

        messages[value] = {
            required: validationMessages[value] || "Please select " + replace_key,
        };
    });


	function checkTypeRequiredOrNot() {
            return $('.depositeCheck[value="check"]:checked').length > 0;
        }

        function bankDetailRequiredOrNot() {
            return $('.depositeCheck[value="deposit"]:checked').length > 0;
        }

        function confirmBankDetailRequiredOrNot() {
            if('.depositeCheck[value="deposit"]:checked') {
                return "#account_number";
            }
        }

        $.each(personal_required.deposite, function (key, value) {
            rules[value] = {
                required: function(element) {
                    const isRequired = bankDetailRequiredOrNot();
                    return isRequired; // Return the boolean result
                }
            };

            var replace_key = key.replace(/_/g, ' ');

            var field = 'enter';

            if (key === 'ownership' || key === 'account_type' || key === 'deposit') {
                var field = 'select';
            }

            messages[value] = {
                 required: "Please " + field + " " + replace_key,
            };
        });

        rules['bank_detail[confirm_account_number]'] = {
            required: function(element) {
                const isRequired = bankDetailRequiredOrNot();
                return isRequired;
            },
            equalTo : function(element) {
                return confirmBankDetailRequiredOrNot()
            }
        };

        rules['bank_detail[check_type]'] = {
            required: function(element) {
                const isRequired = checkTypeRequiredOrNot();
                return isRequired;
            }
        };

        messages["bank_detail[check_type]"] = {
            required : "Please select check type."
        };

        messages["bank_detail[confirm_account_number]"] = {
            required : "Please enter account number.",
            equalTo : "The account number confirmation does not match."
        };

    rules['bank_doc'] = {
        required: !$('#bank_detail_provide_later').is(':checked')
    };

    messages['bank_doc'] = {
        required: validationMessages['bank_detail[provide_later]'] || "Please upload deposite document.",
    };

    $("form[name='form_payroll']").validate({
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
 		        if(element.hasClass('depositeCheck') && element.parents('.single-row').length) {
                    element.parents('.single-row').after(error);
                } else if(element.hasClass('check_type') && element.parents('.grid-item').length) {
                    element.parents('.grid-item').append(error);
                } else if(element.hasClass('account_type') && element.parents('.grid-item').length) {
                    element.parents('.grid-item').append(error);
                } else if(element.hasClass('ownership') && element.parents('.grid-item').length) {
                    element.parents('.grid-item').append(error);
                } else if(element.hasClass('filling') &&element.parents('.single-row').length) {
                    error.insertAfter(element.parents('.single-row'));
                } else if(element.hasClass('parallel_job') &&element.parents('.single-row').length) {
                    error.insertAfter(element.parents('.single-row'));
                } else if(element.hasClass('inline-checkbox-radio') &&element.parents('.row').length) {
                    error.insertAfter(element.parents('.row'));
                } else if(element.hasClass('affidavit_sign') &&element.parents('.half-container').length) {
                    error.insertAfter(element.parents('.half-container'));
                } else {
                    error.insertAfter(element);
                }
            },
            messages: messages,
            submitHandler: function(form) {
            loader();

 		var patientName = $('#patient_name').val().trim().toLowerCase();
                var accountHolderName = $('#account_holder_name').val().trim();
                if (patientName === accountHolderName && patientName !== '') {
                    alert("Under CDPAP, PA payment should not be deposited on Patient Account");
                }

	     var formData = new FormData(form);
             submitAction(form, formData)

        }
    });

    var rules = {};
    var messages = {};

    $.each(personal_required.document, function (key, value) {
        rules[value] = {
            required: !$('#' + value + '_provide_later').is(':checked') // Set required based on checkbox state
        };

        var replace_key = key.replace(/_/g, ' ');
        // messages[value] = {
        //     required: "Please upload " + replace_key,
        // };

        messages[value] = {
            required: validationMessages[value] || "Please " + field + " " + replace_key,
        };
    });

    $('.provide_later').on('change', function() {
        var fieldName = $(this).parents('.table_row').attr('data-name');

        if ($(this).is(':checked')) {
            $("#"+fieldName).val(fieldName);
            $("#"+fieldName+"-error").hide();
        } else {
            $("#"+fieldName).val("");
            $("#"+fieldName+"-error").show();
        }
    });
    
    $("form[name='form_document']").validate({
        ignore: [],
        rules: rules,
        invalidHandler: function(form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top
            }, 1000);
        },
        messages: messages,
        submitHandler: function(form) {
            loader();
            var formData = new FormData(form);
            submitAction(form, formData)
        }
    });

    $("form[name='form_contact_step']").validate({
        submitHandler: function(form) {
            loader();
            var formData = new FormData(form);

            var emergency_length = $('#contact').find('.emergency-section').find('.table_row').find('.table_cell').hasClass('record-not-found');
            var references_length = $('#contact').find('.references-section').find('.table_row').length;
            var reference_length = $('#contact').find('.references-section').find('.table_row').find('.table_cell').hasClass('record-not-found');
            var sub_category = $('#contact').find('.references-section').attr('id');

            if(personal_required.emergency != '' && emergency_length === true) {
                typeof minimum_1_emergency !== 'undefined' ? minimum_1_emergency : 'You should add minimum 1 emergency contact.',

                alertText(minimum_1_emergency, 'error');

                formData.append("tab", '2');
                formData.append("error", minimum_1_emergency);
            } else if (references_length < 2 && sub_category != 'CDPAP') {
                typeof minimum_2_referrence !== 'undefined' ? minimum_2_referrence : 'You should add minimum 2 referrence contact.',

                alertText(minimum_2_referrence, 'error');

                formData.append("tab", '2');
                formData.append("error", minimum_2_referrence);
            } else if(personal_required.references != '' && reference_length === true) {
                typeof minimum_1_referrence !== 'undefined' ? minimum_1_referrence : 'You should add minimum 1 referrence contact.',

                alertText(minimum_1_referrence, 'error');

                formData.append("tab", '2');
                formData.append("error", minimum_1_referrence);
            }
            submitAction(form, formData)
        }
    });

    $("form[name='form_education_step']").validate({
        submitHandler: function(form) {
            loader();
            var formData = new FormData(form);

            var education_length = $('#education').find('.education-section').find('.table_row').find('.table_cell').hasClass('record-not-found');
            var professional_length = $('#education').find('.professional-section').find('.table_row').find('.table_cell').hasClass('record-not-found');

            if((personal_required.educations != []) && education_length === true) {
                typeof minimum_1_education !== 'undefined' ? minimum_1_education : 'You should add minimum 1 education.',

                alertText(minimum_1_education, 'error');

                formData.append("tab", '3');
                formData.append("error", minimum_1_education);
            } else if(personal_required.licenses != '' && professional_length === true) {
                typeof minimum_1_professional !== 'undefined' ? minimum_1_professional : 'You should add minimum 1 professional.',
                alertText(minimum_1_professional, 'error');

                formData.append("tab", '3');
                formData.append("error", minimum_1_professional);
            }

            submitAction(form, formData)
        }
    });

    rules['employee_sign'] = {
        required: true
    };
    rules['is_acknowledge'] = {
        required: true
    };

    messages['employee_sign'] = {
        required: "Signature required."
    };
    messages['is_acknowledge'] = {
        required: "Acknowledged required.",
    };

    $("form[name='form_employer_step']").validate({
        ignore: [],
        rules: rules,
        messages: messages,
        errorPlacement: function (error, element) {
            if(element.hasClass('inline-checkbox-radio') &&element.parents('.row').length) {
                error.insertAfter(element.parents('.row'));
            } else if(element.hasClass('sign') &&element.parents('.half-container').length) {
                error.insertAfter(element.parents('.half-container'));
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            loader();
            // console.log("Validation rules: ", rules);
            var formData = new FormData(form);
            var employer_length = $('#employment_history').find('.employer-section').find('.table_row').find('.table_cell').hasClass('record-not-found');
            if(personal_required.employer != '' && employer_length === true) {
                typeof minimum_1_employer !== 'undefined' ? minimum_1_employer : 'You should add minimum 1 employer.',

                alertText(minimum_1_employer, 'error');

                formData.append("tab", '4');
                formData.append("error", minimum_1_employer);
            }

            submitAction(form, formData)
        }
    });

    // var rules = {};
    // var messages = {};
    // $.each(personal_required.affidavit, function (key, value) {
    //     rules[value] = {
    //         required: true
    //     };

    //     messages[value] = {
    //         required: validationMessages[value] || "Signature required",
    //     };
    // });


        rules['signature'] = {
            required: true
        };

        messages['signature'] = {
            required: "Signature required",
        };

    $("form[name='form_signature']").validate({
          ignore: [],
        rules: rules,
        errorPlacement: function (error, element) {
            if(element.hasClass('sign') && element.parents('.main-signature').length) {
                error.insertAfter(element.parents('.main-signature'));
            } else {
                error.insertAfter(element);
            }
        },
        invalidHandler: function(form, validator) {
            if (!validator.numberOfInvalids())
                return;

            $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).offset().top
            }, 1000);
        },
        messages: messages,
        submitHandler: function(form) {
            loader();

            var formData = new FormData(form);

            if (!formData.has('affidavite_id') || formData.get('affidavite_id').trim() === "") {
                $("#setup-error-message").show();
                clearloader();              
            } else {
                $("#setup-error-message").hide();
                submitAction(form, formData)
            }
        }
    });

    var rules = {};
    var messages = {};
    $.each(personal_required.exam, function (key, value) {
      
        var fieldName = "answer[" + value + "][]"; // Adjust field name pattern here as needed

        rules[fieldName] = {
            required: true
        };

        messages[fieldName] = {
            required: "Answer required",
        };
    });

    rules['test_name'] = {
        required: true
    };

    rules['showHideVal[]'] = {
        required: true
    };

    rules['steps'] = {
        required: true
    };
    console.log(rules);
    $("form[name='form_skill_assessment']").validate({
        ignore: [],
        errorPlacement: function (error, element) {
            if(element.hasClass('sign') && element.parents('.main-signature').length) {
                error.insertAfter(element.parents('.main-signature'));
            } else if (element.is(':radio') || element.is(':checkbox')) {                
                element.closest('ol').after(error);
            } else {
                error.insertAfter(element);
            }
        },

        invalidHandler: function (event, validator) {
            $.each(validator.errorMap, function (fieldName, message) {
                if (fieldName.startsWith('answer[')) {
                    var customMessage = "Answer required"; 
                    $.each(validator.errorList, function (index, error) {
                        if (error.element.name === fieldName) {
                            error.message = customMessage;
                        }
                    });
                }
            });
        },      
        submitHandler: function(form) {           
            loader();
            var formData = new FormData(form);

            submitAction(form, formData)
        }
    });
});

$('input[name^="working["][name$="[name]"]').on('change', function() {
    $('input[name^="working["][name$="[name]"]').each(function() {
        $(this).valid();
    });
});

function submitAction(form, formData)
{
    $.ajax({
        type: form.method,
        url: form.action,
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            clearloader();
            
            if(response.code == 200) {
                if (form.name === 'form_skill_assessment' && response.data.quetionResultCount > 0) {        
                
                    $.each(response.data.quetionResult, function (key, value) {                    
                        if (value === 'Failed') {
                            $('#wrong_answer_suggestion_'+key).show();
                            
                            Swal.fire({
                                icon: "error",
                                title: "Some of your answers are incorrect. You may choose another answers to improve your score.",
                                confirmButtonColor: '#035c96',
                            });
                        } else {
                            $('#wrong_answer_suggestion_'+key).hide();
                        }
                    });
                } else {
                    if ($(form).attr('data-redirecturl')) {
                        window.location.href = $(form).attr('data-redirecturl');
                    } else {
                        var refreshTab = $(form).attr('data-tab');
                        var hideTabId = $(form).attr("data-hide-tab");
                        var showTabId = $(form).attr("data-show-tab");
                        var showTab = $(form).attr("data-add-class");

                        $("."+refreshTab).removeClass('active');
                        $("."+refreshTab).addClass('success');
                        $("."+showTab).addClass('active');
                        $("#"+hideTabId).hide();
                        $("#"+showTabId).show();
                        $("."+refreshTab).addClass('directMoveSection');

                        var label = $('.'+showTab).find('span').text();

                        $(".step-active-name").html(label);
                    }
                }
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

$('.provide_later_bank').on('change', function() {
    if ($(this).is(':checked')) {
        $("#bank_detail").val("bank_detail");
        $("#bank_detail-error").hide();
    } else {
        $("#bank_detail").val(""); // Remove the value if unchecked
    }
});

$(document).on('blur', '.from_time, .to_time', function () {
    let $row = $(this).closest('tr');
    let $validationMessage = $row.next('.validation-message');

    // Check if both 'from' and 'to' time inputs are filled
    let fromTimeFilled = $row.find('.from_time').val() !== '';
    let toTimeFilled = $row.find('.to_time').val() !== '';

    if (fromTimeFilled && toTimeFilled && $validationMessage.length) {
        $validationMessage.remove();
    }
});

$(document).on('click', '.clone-time-row', function () {
    let dayName = $(this).data('id');
    const nextIndex = dayName.length;
  
    let row_index = $(this).data('row'); 
    let $lastRow = $(`tr.${dayName}:last`);   

    let $firstTimeInput = $lastRow.find('input[type="time"]').first();          
    if ($firstTimeInput.val() == '') {               
        $lastRow.next('.validation-message').remove();

        $lastRow.after('<span class="validation-message" style="color: red; font-size: 12px;">Please fill this field before adding a new row.</span>');
        return false;
    } else {              
        $lastRow.next('.validation-message').remove();
    }

    if ($lastRow.length > 0) {       
        let $newRow = $lastRow.clone();

        let lastIndex = parseInt($lastRow.find('input[type="time"]').attr('id').split('_').pop());
        let newIndex = lastIndex + 1;

        $newRow.find('input[type="time"]').each(function () {
            let oldId = $(this).attr('id');
            let newId = oldId.replace(/_\d+$/, `_${newIndex}`);
            $(this).attr('id', newId);
            $(this).attr('name', $(this).attr('name').replace(/\[\d+\]/, `[${newIndex}]`));
            $(this).val('');
        });

        $newRow.find('.delete-row-btn').attr('data-row-id', `row_${newIndex}`);

        $newRow.find('td:first').html('');
        $newRow.find('td:last').html('<a class="delete-row-btn" data-row-id="row_0" data-id="${dayName}"><i class="fas fa-minus-circle"></i></a>');
        $lastRow.after($newRow);
    } else {      
        let $tableBody = $(this).closest('table').find('tbody');
        let newRow = `
            <tr class="${dayName}">
                <td></td>
                <td>
                    <input
                        type="time"
                        placeholder="hh:mm"
                        id="working_${dayName}_from_0"
                        name="working[${dayName}][0][from]"
                        value="" />
                </td>
                <td>
                    <input
                        type="time"
                        placeholder="hh:mm"
                        id="working_${dayName}_to_0"
                        name="working[${dayName}][0][to]"
                        value="" />
                </td>
                <td>
                    <a class="delete-row-btn" data-row-id="row_0" data-id="${dayName}">
                        <i class="fas fa-minus-circle"></i>
                    </a>
                </td>
            </tr>
        `;
      
        $tableBody.append(newRow);
    }
});

$(document).on('click', '.delete-row-btn', function () {
    if (confirm("Are you sure you want to delete this row?")) {
        let $row = $(this).closest('tr');
        let $nextElement = $row.next('.validation-message');
        
        $row.remove();
        if ($nextElement.length) {
            $nextElement.remove();
        }
    }
});