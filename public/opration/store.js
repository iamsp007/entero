import {
    loader,
    clearloader,
    alertText,
    tableRefresh,
    hidePopup,
    loadSection,
    loadSectionAndHidePopup,
    masters,
    CKupdate
} from "./common_function.js";

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

/*add and edit data start*/
$('body').on('click', '.add_button', function (e) {
    e.preventDefault();

    var t = $(this);
    storeAjax(t);
});

$('body').on('click', '.exportButton', function (e) {
    e.preventDefault();

    var t = $(this);
    var url = t.attr("data-url");
    var frmId = t.attr("data-frm");
    var formdata = new FormData($("#"+frmId)[0]);

    loader();
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
            clearloader();
            alertText('Dowload Successfully', 'success');
            var blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create a URL for the Blob.
            var url = window.URL.createObjectURL(blob);

            // Create an invisible <a> element to trigger the download.
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'exported_data.xlsx'; // Set the desired file name and extension.

            // Trigger a click event to start the download.
            document.body.appendChild(a);
            a.click();

            // Clean up the object URL.
            window.URL.revokeObjectURL(url);
            hidePopup(frmId);
        },
        error:function (error) {
            alertText("Server Timeout! Please try again", 'error');
            clearloader();
        }
    });
});

function storeAjax(t) {
    var frmId = t.attr("data-frm");
    var val = formValidation(frmId, t);

    if(val.form() != false) {

       if (typeof ckeditorAction !== 'undefined') {
            CKupdate();
        }

        var formdata = new FormData($("#"+frmId)[0]);

        if (typeof t.attr("data-flag") !== 'undefined' && t.attr("data-flag") == 'saveAndSend') {
            formdata.append('action', 'saveAndSend');
        }
        var url = t.attr("data-url");

        if (frmId === 'frm-applicant-affidavit') {
            var applicantAffidavitdiv_2 = $("#applicantAffidavitdiv_2").clone();
            if ($("#have").is(":checked")) {
                applicantAffidavitdiv_2.find("#have").attr("checked", true);
            } else {
                applicantAffidavitdiv_2.find("#have").attr("checked", false);
            }
            if ($("#havenot").is(":checked")) {
                applicantAffidavitdiv_2.find("#havenot").attr("checked", true);
            } else {
                applicantAffidavitdiv_2.find("#havenot").attr("checked", false);
            }
            if ($("#do1").is(":checked")) {
                applicantAffidavitdiv_2.find("#do1").attr("checked", true);
            } else {
                applicantAffidavitdiv_2.find("#do1").attr("checked", false);
            }
            if ($("#do2").is(":checked")) {
                applicantAffidavitdiv_2.find("#do2").attr("checked", true);
            } else {
                applicantAffidavitdiv_2.find("#do2").attr("checked", false);
            }

            applicantAffidavitdiv_2.find("#haveNoteField").attr("value", $("#haveNoteField").val());
            applicantAffidavitdiv_2.find("#doNoteField").attr("value", $("#doNoteField").val());
            var applicant_content_div_2 = applicantAffidavitdiv_2.prop('outerHTML');
            formdata.append('applicantAffidavitdiv_2', applicant_content_div_2);

            var applicantAffidavitdiv_3 = $("#applicantAffidavitdiv_3").clone();
            if ($("#md").is(":checked")) {
                applicantAffidavitdiv_3.find("#md").attr("checked", true);
            } else {
                applicantAffidavitdiv_3.find("#md").attr("checked", false);
            }
            if ($("#pe").is(":checked")) {
                applicantAffidavitdiv_3.find("#pe").attr("checked", true);
            } else {
                applicantAffidavitdiv_3.find("#pe").attr("checked", false);
            }
            if ($("#stp").is(":checked")) {
                applicantAffidavitdiv_3.find("#stp").attr("checked", true);
            } else {
                applicantAffidavitdiv_3.find("#stp").attr("checked", false);
            }
            if ($("#ppr").is(":checked")) {
                applicantAffidavitdiv_3.find("#ppr").attr("checked", true);
            } else {
                applicantAffidavitdiv_3.find("#ppr").attr("checked", false);
            }

            var applicant_content_div_3 = applicantAffidavitdiv_3.prop('outerHTML');
            formdata.append('applicantAffidavitdiv_3', applicant_content_div_3);

            var applicantAffidavitdiv_4 = $("#applicantAffidavitdiv_4").clone();
            var originalSelect = $("#vaccination_proof");
            var clonedSelect = applicantAffidavitdiv_4.find('select[name="affidavit_detail[vaccination_proof]"]').clone();
            clonedSelect.val(originalSelect.val());
            applicantAffidavitdiv_4.find('select[name="affidavit_detail[vaccination_proof]"]').replaceWith(clonedSelect);
            var content_div_6 = applicantAffidavitdiv_4.prop('outerHTML');
            formdata.append('applicantAffidavitdiv_4', content_div_6);

            var applicantAffidavitdiv_11 = $("#applicantAffidavitdiv_11").clone();
            if ($("#osha_acknow").is(":checked")) {
                applicantAffidavitdiv_11.find("#osha_acknow").attr("checked", true);
            } else {
                applicantAffidavitdiv_11.find("#osha_acknow").attr("checked", false);
            }

            if ($("#osha_acknow1").is(":checked")) {
                applicantAffidavitdiv_11.find("#osha_acknow1").attr("checked", true);
            } else {
                applicantAffidavitdiv_11.find("#osha_acknow1").attr("checked", false);
            }

            if ($("#osha_acknow2").is(":checked")) {
                applicantAffidavitdiv_11.find("#osha_acknow2").attr("checked", true);
            } else {
                applicantAffidavitdiv_11.find("#osha_acknow2").attr("checked", false);
            }

            if ($("#osha_acknow3").is(":checked")) {
                applicantAffidavitdiv_11.find("#osha_acknow3").attr("checked", true);
            } else {
                applicantAffidavitdiv_11.find("#osha_acknow3").attr("checked", false);
            }

            if ($("#osha_acknow4").is(":checked")) {
                applicantAffidavitdiv_11.find("#osha_acknow4").attr("checked", true);
            } else {
                applicantAffidavitdiv_11.find("#osha_acknow4").attr("checked", false);
            }

            if ($("#osha_acknow5").is(":checked")) {
                applicantAffidavitdiv_11.find("#osha_acknow5").attr("checked", true);
            } else {
                applicantAffidavitdiv_11.find("#osha_acknow5").attr("checked", false);
            }

            if ($("#osha_acknow6").is(":checked")) {
                applicantAffidavitdiv_11.find("#osha_acknow6").attr("checked", true);
            }else {
                applicantAffidavitdiv_11.find("#osha_acknow6").attr("checked", false);
            }

            var applicant_content_div_11 = applicantAffidavitdiv_11.prop('outerHTML');
            formdata.append('applicantAffidavitdiv_11', applicant_content_div_11);

            var applicantAffidavitdiv_25 = $("#applicantAffidavitdiv_25").clone();
            if ($("#i_vaccine_1").is(":checked")) {
                applicantAffidavitdiv_25.find("#i_vaccine_1").attr("checked", true);
            } else {
                applicantAffidavitdiv_25.find("#i_vaccine_1").attr("checked", false);
            }
            if ($("#i_vaccine_2").is(":checked")) {
                applicantAffidavitdiv_25.find("#i_vaccine_2").attr("checked", true);
            } else {
                applicantAffidavitdiv_25.find("#i_vaccine_2").attr("checked", false);
            }
            if ($("#i_vaccine_3").is(":checked")) {
                applicantAffidavitdiv_25.find("#i_vaccine_3").attr("checked", true);
            } else {
                applicantAffidavitdiv_25.find("#i_vaccine_3").attr("checked", false);
            }

            var applicant_content_div_25 = applicantAffidavitdiv_25.prop('outerHTML');
            formdata.append('applicantAffidavitdiv_25', applicant_content_div_25);

            var applicantAffidavitdiv_28 = $("#applicantAffidavitdiv_28").clone();
            if ($("#paycheck_distribution_1").is(":checked")) {
                applicantAffidavitdiv_28.find("#paycheck_distribution_1").attr("checked", true);
            } else {
                applicantAffidavitdiv_28.find("#paycheck_distribution_1").attr("checked", false);
            }
            if ($("#paycheck_distribution_2").is(":checked")) {
                applicantAffidavitdiv_28.find("#paycheck_distribution_2").attr("checked", true);
            } else {
                applicantAffidavitdiv_28.find("#paycheck_distribution_2").attr("checked", false);
            }

            if ($("#paycheck_distribution_3").is(":checked")) {
                applicantAffidavitdiv_28.find("#paycheck_distribution_3").attr("checked", true);
            } else {
                applicantAffidavitdiv_28.find("#paycheck_distribution_3").attr("checked", false);
            }

            var applicant_content_div_28 = applicantAffidavitdiv_28.prop('outerHTML');
            formdata.append('applicantAffidavitdiv_28', applicant_content_div_28);
        }

        var redirecturl = t.attr("data-redirecturl");
        var refreshSection = t.attr("data-section");
        var refreshSectionWithPopup = t.attr("data-section-popup");
        var refreshSectionArray = t.attr("data-section-array");
        var refreshTableWithPopup = t.attr("data-table-popup");
        var refreshTab = t.attr("data-tab");
        var hidePopups = t.attr("data-hide-popup");

        loader();
        $.ajax({
            type:"POST",
            url:url,
            data: formdata,
            contentType: false,
            processData: false,
            success:function (data) {
                if(data.code == 200) {
                    var status = 'success';

                    alertText(data.message, 'success');

                    if (typeof redirecturl !== 'undefined') {
                        setTimeout(function () {
                            location.href = redirecturl;
                        });
                    } else if (typeof refreshSectionWithPopup !== 'undefined') {
                        loadSectionAndHidePopup(frmId, refreshSectionWithPopup);
                    } else if (typeof refreshSection !== 'undefined') {
                        loadSection(refreshSection);

                        var mandatorySection = t.attr("data-mandatory");
                        if (typeof mandatorySection !== 'undefined') {
                            $(this).hide();
                            $(this).prev('.edit-category').show();
                        }

                    } else if (typeof refreshSectionArray !== 'undefined') {
                        var refreshSections = refreshSectionArray.split(',');
                        $.each(refreshSections, function(key, section) {
                            if (section === 'user_documents' || section === 'static_user_documents' || section === 'master_road_map_steps') {
                                var flag = t.attr('data-flag');
                                if (typeof masters !== 'undefined') {
                                    masters(section,"",flag);
                                }
                            } else if (section === 'document-send-history' || section === 'insurance-history-data') {
                                $(".allchk").prop("checked","");

                                setTimeout(function() {
                                    tableRefresh(section);
                                }, 4000);

                                hidePopup(frmId);
                            } else if (section === 'doc_bank_document') {                               
                                loadSection(section);
                                hidePopup(frmId);
                                $(document).find("#bank_detail_provide_later").prop("checked",true);
                                $(document).find("#bank_detail-error").hide();
                                $(document).find(".provide_later_bank_div").hide();
                                $(document).find("#bank_detail").val("bank_detail");
                            } else {
                                loadSection(section);

                                if (section != 'send_form_section') {
                                    hidePopup(frmId);
                                }
                            }
                        });

                        hidePopup(frmId);
                    } else if (typeof refreshTab !== 'undefined') {
                        var hideTabId = t.attr("data-hide-tab");
                        var showTabId = t.attr("data-show-tab");
                        var showTab = t.attr("data-add-class");

                        $("."+refreshTab).removeClass('active');
                        $("."+refreshTab).addClass('success');
                        $("."+showTab).addClass('active');
                        $("#"+hideTabId).hide();
                        $("#"+showTabId).show();
                        $("."+refreshTab).addClass('directMoveSection');

                        var label = $('.'+showTab).find('span').text();

                        $(".step-active-name").html(label);
                    } else if (typeof hidePopups !== 'undefined') {
                        hidePopup(frmId);
                    } else if (frmId === "frm-start-application") {
console.log(data.data);
			 if (data.data.sub_category_name === 'CDPAP') {

                            $('#application_count').val(function(i, val) { return +val+1 });
                            if (data.data.start_value === 'onlyApplicant'){
                                $(".caregiver_detail_id").val(data.data.caregiver_detail_id);
                            }
                            if (data.data.start_value === 'onlyApplicant' || data.data.start_value === 'onlyPatient') {
                                setTimeout(function () {
                                    window.open(data.data.redirect_url, '_blank');
                                    if ($("#application_count").val() >= 2) {
                                        setTimeout(function () {
                                            location.href = data.data.application_list;
                                        }, 100);
                                    }
                                }, 500);
                            } else {
                                setTimeout(function () {
                                    location.href = data.data.redirect_url;
                                }, 500);
                            }
                        } else {
                            if (data.data.start_from == 2) {
                                window.open(data.data.redirect_url, '_blank');
                            }

                            setTimeout(function () {
                                location.href = data.data.application_list;
                            }, 500);
                        }
                    } else if (frmId === "frm-w4-verify" || frmId === "frm-ls62-verify" || frmId === "frm-it-204" || frmId === "frm-i9-verify" || frmId === "frm-8850-verify" || frmId === 'frm-emp-verify' || frmId === 'frm-reference-request' || frmId === "frm-hhax-config") {
                        if(t.attr('data-action') == 'saveAndPrint') {
                            var div = t.attr('data-div');
                            $("#page1-div, #page2-div, #page3-div, #page4-div, #page5-div, #page6-div, #page7-div, #page8-div, #page9-div").css({ "border" : "none" });
                            $("#"+div).hide();
                            onafterprint = function () {
                                $("#page1-div, #page2-div, #page3-div, #page4-div, #page5-div, #page6-div, #page7-div, #page8-div, #page9-div").css({ "border" : "2px solid gray" });
                                $("#"+div).show();
                            }
                            window.print("_blank");
                        } else {
                            if (frmId === 'frm-reference-request' || frmId === 'frm-emp-verify' || frmId === "frm-w4-verify") {
                                location.reload();
                            }
                        }
                    } else if (frmId === "frm-reset-email"){

		    } else if (frmId === 'frm-mandatory-affidavit') {
                        $('.affidavit_edit_icon').show();
                        $('.affidavit_status_icon').show();
                    } else {
                        var responceData = data.data;

                        if (typeof masters !== 'undefined') {
                            masters(responceData.slug, responceData.title);
                        }

                        hidePopup(frmId);
                    }

                    if (typeof refreshTableWithPopup !== 'undefined') {
                        $(".allchk").prop("checked","");
                        tableRefresh(refreshTableWithPopup);

                        // if (required-inservice-data === 'required-inservice-data') {
                        //     $(".jobRunning").attr('disabled', true);
                        // }
                        hidePopup(frmId);
                    }

                    clearloader();
                } else {
                    var status = 'error';
                    alertText(data.message, status);
                    clearloader();
                }
            },
            error:function (error) {
                alertText("Server Timeout! Please try again", 'error');
                clearloader();
            }
        });
    } else {
        return false;
    }
}

function formValidation(frmId, t) {
    var val = true;
    if (frmId === 'frm-affidavi') {
        var val = $("#"+frmId).validate();
    } else if (frmId === 'frm-patient-application') {
        var rules = {};
        var messages = {};

        $.each(personal_required.patient_affidavit, function (key, value) {
            rules[value] = {
                required: true
            };

            messages[value] = {
                required: "Please sign here",
            };
        });
        var val = $("#"+frmId).validate({
            ignore: [],
            rules: rules,
            errorPlacement: function (error, element) {
                if(element.hasClass('affidavit_checkbox') && element.parents('.common-checkbox').length) {
                    error.insertAfter(element.parents('.common-checkbox'));
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
            messages: messages
        });
    } else if (frmId === 'frm-applicant-affidavit') {
        var rules = {};
        var messages = {};
        $.each(personal_required.affidavit, function (key, value) {
            rules[value] = {
                required: true
            };

            messages[value] = {
                required: "Please sign here",
            };
        });
        var val = $("#"+frmId).validate({
            ignore: [],
            rules: rules,
            errorPlacement: function (error, element) {
                if(element.hasClass('affidavit_checkbox') && element.parents('.common-checkbox').length) {
                    error.insertAfter(element.parents('.common-checkbox'));
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
            messages: messages
        });
    } else if (frmId === 'frm-send-sms' || frmId === 'frm-send-sms1') {
        var val = $("#"+frmId).validate({
            rules: {
                message :{
                    required: true,
                },
            },
            messages : {
                message: {
                    required : "Please enter message.",
                },
            }
        });
    } else if (frmId === 'frm-upload') {
        var val = $("#frm-upload").validate({
            rules: {
                name: {
                    required: true
                },
                "attachment[]": {
                    required: true,
                },
            },
            messages : {
                name: {
                    required : "Please enter name."
                },
                "attachment[]": {
                    required : "Please select document.",
                    // extension : "Please select a valid file."
                },
            }
        });
    } else if (frmId === 'frm-download-report') {
        var val = $("#frm-download-report").validate({
            rules: {
                report_of: {
                    required: true
                },
            },
            messages : {
                report_of: {
                    required : "Please select report type for download."
                },
            }
        });
    } else if (frmId === 'frm-followup-date') {
        var val = $("#frm-followup-date").validate({
            ignore: [],
            rules: {
                "start_of_care_date": {
                    required: true
                },
            },
            messages : {
                "start_of_care_date": {
                    required: 'Please select start of care date.'
                },
            }
        });
    } else if (frmId === 'frm-training' || frmId === 'frm-training-update') { // TODO: Remove code because this in service module we dont want
        var val = $("#"+frmId).validate({
            ignore: [],
            rules: {
                date: {
                    required: true
                },
                office_id: {
                    required: true
                },
                start_time: {
                    required: true
                },
                end_time: {
                    required: true
                },
                capacity: {
                    required: true
                },
                address: {
                    required: true
                },
                title: {
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                if(element.hasClass('time') && element.parents('.flex-row').length) {
                    error.insertAfter(element.parents('.flex-row'));
                } else {
                    error.insertAfter(element);
                }
            },
            messages : {
                date: {
                    required: 'Please select in service date.'
                },
                office_id: {
                    required: 'Please select office.'
                },
                start_time: {
                    required: 'Please select start time.'
                },
                end_time: {
                    required: 'Please select end time.'
                },
                capacity: {
                    required: 'Please enter capacity.'
                },
                address: {
                    required: 'Please enter address.'
                },
                title: {
                    required: 'Please enter title.'
                }
            }
        });
    // } else if (frmId === 'frm-compliance') { // TODO: Remove code because this compliance module we dont want
    //     var val = $("#frm-compliance").validate({
    //         ignore: [],
    //         rules: {
    //             "send_to": {
    //                 required: true,
    //                 email: true
    //             },
    //         },
    //         messages : {
    //             "send_to": {
    //                 required: 'Please enter email.',
    //                 email : "Please enter valid email."
    //             },
    //         }
    //     });
    } else if (frmId === 'frm-send-fax') {
        var email_val = $("#frm-send-fax").find('.document_link a.email_array span').length;
        // var document_array = $("#frm-send-fax").find('.document_link a.document_array span').length;

        var rules_object = new Object();
        var message_object = new Object();

        if (email_val === 0) {
            rules_object['send_to_email'] = { required: true, email: true};
            message_object['send_to_email'] = { required: 'Please enter email.', email : "Please enter valid email."};

            rules_object['send_to_fax'] = { required: true};
            message_object['send_to_fax'] = { required: 'Please enter fax number.'}
        }

        // if (document_array === 0) {
        //     rules_object['attachment[]'] = { required: true};
        //     message_object['attachment[]'] = { required: 'Please select document'};
        // }

        rules_object['description'] = { required: true };
        message_object['description'] = { required: 'Please enter content.'};

        var val = $("#frm-send-fax").validate({
            rules: rules_object,
            messages : message_object
        });
    } else if (frmId === 'frm-insurane') {
        var val = $("#frm-insurane").validate({
            rules: {
                "name": {
                    required: true
                },
                "status": {
                    required: true
                },
            },
            messages : {
                "name": {
                    required : "Please enter name."
                },
                "status": {
                    required : "Please select status."
                },
            }
        });
    } else if (frmId === 'frm-start-application') {
        $(".start_value").val(t.attr('data-part'));

        $.validator.addMethod("eitherEmailOrPhoneRequired", function(value, element) {
            if ($(".start_value").val() === "sendBoth") {
                var emailValue = $("input[name='email']").val();
                var phoneValue = $("input[name='cell_phone']").val();
        
                return emailValue !== "" || phoneValue !== "";
            }
            return true;
        }, "Either email or phone number is required.");

        $.validator.addMethod("eitherPatientEmailOrPhoneRequired", function(value, element) {
            if ($(".start_value").val() === "sendBoth") {
                var emailValue = $("input[name='patients[email]']").val();
                var phoneValue = $("input[name='patients[cell_phone]']").val();
        
                return emailValue !== "" || phoneValue !== "";
            }
            return true;
        }, "Either email or phone number is required.");

        var val = $(document).find("#frm-start-application").validate({
            rules: {
                skill_category_id: {
                    required: true
                },
                skill_sub_category_id: {
                    required: true
                },
		        form_language: {
                    required: true
                },
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                email: {
                    // required: function(element) {
                    //     if($(".start_value").val() === "sendBoth" ) {
                    //         return true;
                    //     } else {
                    //         return false;
                    //     }
                    // }
                    eitherEmailOrPhoneRequired: true
                },
                // cell_phone: {
                //     // required: function(element) {
                //         // if($(".start_value").val() === "sendBoth") {
                //         //     return true;
                //         // } else {
                //         //     return false;
                //         // }                       
                //     // }
                //     eitherEmailOrPhoneRequired: true
                // },
                "patients[first_name]": {
                    required: function(element) {
                        if($(".start_value").val() === "onlyPatient" || $(".start_value").val() === "sendBoth") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                "patients[last_name]": {
                    required: function(element) {
                        if($(".start_value").val() === "onlyPatient" || $(".start_value").val() === "sendBoth") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                "patients[email]": {
                    // required: function(element) {
                    //     if($(".start_value").val() === "sendBoth") {
                    //         return true;
                    //     } else {
                    //         return false;
                    //     }
                    // }
                    eitherPatientEmailOrPhoneRequired: true
                },
                // "patients[cell_phone]": {
                //     required: function(element) {
                //         if($(".start_value").val() === "sendBoth" ) {
                //             return true;
                //         } else {
                //             return false;
                //         }
                //     }
                // }
            },
            messages : {
                skill_category_id: {
                    required : "Please select category."
                },
                skill_sub_category_id: {
                    required : "Please select sub category."
                },
	            form_language: {
                    required : "Please select application language."
                },
                first_name: {
                    required : "Please enter first name."
                },
                last_name: {
                    required : "Please enter last name."
                },
                email: {
                    eitherEmailOrPhoneRequired : "Either email or phone number is required",
                    email : "Please enter valid email."
                },
                // cell_phone:  {
                //     required : "Please enter phone."
                // },
                "patients[first_name]": {
                    required: "Please enter first name."
                },
                "patients[last_name]": {
                    required: "Please enter last name."
                },
                "patients[email]": {
                    required : "Either email or phone number is required",
                    email : "Please enter valid email."
                },
                // "patients[cell_phone]": {
                //     required: "Please enter phone."
                // },
            }
        });
    } else if(frmId === 'frm-send-in-service' || frmId === 'frm-send-in-service-1') { // TODO: Remove code because this in service module we dont want
        var val = $("#"+frmId).validate({
            rules: {
                "sendTo[]": {
                    required: true
                },
            },
            errorPlacement: function (error, element) {
                if(element.hasClass('sendTo') && element.parents('.grid-row').length) {
                    error.insertAfter(element.parents('.grid-row'));
                } else {
                    error.insertAfter(element);
                }
            },
            messages : {
                "sendTo[]": {
                    required : "Please select notification type."
                },
            }
        });
        // } else if(frmId === 'in-service-master') { // TODO: Remove code because this in service module we dont want
        //     var val = $("#in-service-master").validate({
        //         rules: {
        //             frequency: {
        //                 required: true
        //             },
        //             hours: {
        //                 required: true
        //             },
        //             days: {
        //                 required: true
        //             },
        //         },
        //         messages : {
        //             frequency: {
        //                 required : "Please select frequency."
        //             },
        //             hours: {
        //                 required : "Please enter hours."
        //             },
        //             days: {
        //                 required : "Please enter days."
        //             },
        //         }
        //     });
    } else if (frmId === 'frm-emp-verify') {
        $.validator.addMethod("signatureRequiredIfAcknowledgedNotChecked", function(value, element) {
            var verisign = $('#verisign').val();
           
            var is_acknowledged = $('input[name="watermark_text"]').is(':checked');
            
            if (!is_acknowledged && !verisign) {
                return false;
            }
        
            return true;
        }, "Signature is required.");

        var val = $("#frm-emp-verify").validate({
            ignore: [],
            rules: {
                verifysign: {
                    signatureRequiredIfAcknowledgedNotChecked: true
                }
            },
        });

    } else if (frmId === 'frm-mandatory-test' || frmId === 'frm-mandatory-demographic' || frmId === 'frm-mandatory-emergency' || frmId === 'frm-mandatory-references' || frmId === 'frm-mandatory-educations' || frmId === 'frm-mandatory-professional-licenses' || frmId === 'frm-mandatory-employer' || frmId === 'frm-mandatory-tax' || frmId === 'frm-mandatory-affidavit' || frmId === 'frm-mandatory-document' || frmId === 'frm-w4-verify' || frmId === 'frm-ls62-verify' || frmId === 'frm-signature' || frmId === 'frm-assign-permission' || frmId === 'frm-insurance' || frmId === 'frm-it-204' || frmId === 'frm-i9-verify' || frmId === 'frm-8850-verify' || frmId === 'frm-reference-request' || frmId === 'frm-mandatory-patient-affidavit' || frmId === 'insurance-form-frm' || frmId === 'frm-mandatory-referral-personal'|| frmId === 'frm-mandatory-referral-emergency' || frmId === 'frm-mandatory-referral-physician' || frmId === 'frm-mandatory-referral-eligibility' || frmId === 'frm-mandatory-referral-introduction' || frmId === 'frm-tab' || frmId === 'frm-hhax-config' || frmId === 'frm-mandatory-deposite') {
        var val = $("#"+frmId).validate();
    }

    return val;
}

$("body").on('click', '.modal-close, .btn-close', function (event) {
    event.stopPropagation();
    var formId = $(this).attr('data-form');

    if (typeof formId !== 'undefined') {
        $('.document_link').html('');

        var $alertas = $('#'+formId);
        $alertas.validate().resetForm();
        $alertas.find('.error').removeClass('error');
    }

    $(".allchk, .roadmapchk").prop("checked","");
});
$("body").on('click', '.popup-close1', function (event) {
    var formId = $(this).attr('data-form');
    $("#"+formId).validate().resetForm();
    $("#"+formId).find('.error').removeClass('error');

    $(".timesheet-shift-container1").find(".first_row").nextAll('tr').remove();
    hidePopup(formId);
});

/*Open message in model */
$("body").on('click',".openPopop",function () {
    var t = $(this);

    popopCallAjax(t);
});

/*Open message in model */
$("body").on('click',".insuranceLongTermOptions input[type='checkbox'], .insuranceShortTermOptions input[type='checkbox']",function () {
    if ($(this).prop('checked') == true) {
        var t = $(this);
        var term = '';
        if(t.parents('.insurance').find('.insuranceLongTerm').prop('checked') == true) {
            var term = 'long_term';
        } else if(t.parents('.insurance').find('.insuranceLongTerm').prop('checked') == true) {
            var term = 'short_term'
        }

        popopCallAjax(t, term);
    }
});

function roadMapStepStatus(t) {
    var movableStepsLength = $(".enrollment-timeline").find(".dragable-step").length;
    var completedStep = $(".dragable-step.success").length + 1;
    var step_name = t.closest(".dragable-step").find('.step-title').text();
    var next_step = t.closest(".dragable-step").next().find('.step-title').text();

    var step_name_tag = "achieved the " + step_name;
    var date_label = 'follow date for ' + next_step;
    var date_label_field = 'Followup date';
    var action = 'update-next-step';

    if (movableStepsLength === completedStep) {
        var step_name_tag = "completed all the steps.";
        var date_label = 'potential start of care';
        var date_label_field = 'Estimated SOC Date';
        var action = 'update-all-step';
    }

    return {
        "step_name_tag" : step_name_tag,
        "date_label" : date_label,
        "date_label_field" : date_label_field,
        "action": action
    };
}

function popopCallAjax(t, term = '')
{

    var url =   t.attr('data-url');
	
    var user_id = t.attr('data-id');
    var array = t.attr('data-array');
    var stepData = [];
    if (typeof array !== 'undefined') {
        var obj = jQuery.parseJSON(array);

        if(obj.slug === 'stepEmail' || obj.slug === 'stepFax') {
           t.parents(".dragable-step").find(".allchk").prop("checked",true);
        } else if(obj.slug === 'insuranceEmail' || obj.slug === 'documentEmail' || obj.slug === 'documentFax' || obj.slug === 'insuranceFax') {
            t.parents("tr").find(".allchk").prop("checked",true);
        } else if(obj.slug === 'singleDocumentEmail') {
            t.parents(".health-care-proxy").find(".allchk").prop("checked",true);
        }

        if (obj.slug === 'statusUpdate') {
            var stepData = roadMapStepStatus(t);
        }
    }

    var len = $(".allchk:checked").length;

    var ids = [];
    var originalFileName = [];
    var docName = [];
    var phoneArray = [];
    var emailArray = [];

    if (len != 0) {
        $('.allchk:checked').map(function (i, x) {
            if (obj.slug === 'insuranceEmail') {
                ids.push($(this).attr('data-id'));
            } else {
                ids.push(this.value);
            }
            originalFileName.push($(this).attr('data-origianl-file-name'));
            docName.push($(this).attr('data-name'));
            phoneArray.push($(this).attr('data-phone'));
            emailArray.push($(this).attr('data-email'));
        });
    }

    var data = {
        user_id: user_id,
        array: array,
        term: term,
        ids: ids,
        originalFileName: originalFileName,
        docName: docName,
        phone: phoneArray,
        email: emailArray,
        stepData: stepData
    };

    if(typeof array !== 'undefined' && (obj.slug === 'insuranceEmail' || obj.slug === 'insuranceFax')) {
        if (len == 0) {
            alertText('Please select at least one record to continue.','warning');
        } else {
            ajax(data, url);
        }
    } else {
        ajax(data, url);
    }
}

$("body").on('click',".exportReport",function () {
    var t = $(this);
    var url =   t.attr('data-url');
    var slug = t.attr('data-slug');
    var type = t.attr('data-type');
    var data = {
        slug: slug,
        type: type
    }

    ajax(data,url)
});

function ajax(data,url)
{
    loader();
    $.ajax({
        url : url,
        type: 'GET',
        headers: {
            'X_CSRF_TOKEN':'{{ csrf_token() }}',
        },
        data: data,
        success:function(data, textStatus, jqXHR){
            clearloader();
            $(".viewModelData").html(data);
            $(".viewModelData").modal('show');
        },
        error: function(jqXHR, textStatus, errorThrown){
            alertText("Server Timeout! Please try again",'error');
            clearloader();
        }
    });
}

var dateCommon = new Date();
var yearCommon = dateCommon.getFullYear();
var yearPlusTwo = yearCommon + 2;
$(".future_date_picker").datepicker({
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
    numberOfMonths: 1,
    changeYear: true,
    changeMonth: true,
    dateFormat: "mm/dd/yy",
    maxDate: new Date(yearPlusTwo, 11, 31),
    onSelect: function (dateText, inst) {
    },
});