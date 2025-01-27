$.ajax({
    headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    url: getUserUrl,
    method: 'get',
    data: {
       id: patient_id,
       type: type
    },
    success: function (response) {
        if(response.data) {
            var responseData = response.data;
            var patient = responseData.user;

            $("#first_name").val(patient.first_name);
            $("#last_name").val(patient.last_name);
            $("#dob").val(patient.dob);
            $("#home_phone").val(patient.view_home_phone);
            $("#cell_phone").val(patient.view_cell_phone);

            $("#email").val(patient.email);
            $("#age").val(patient.view_age);

            $(".gender_data[value=" + patient.gender + "]").attr('checked', 'checked');

            if (patient.company) {
                var company = patient.company;

                var company_data = company.company_detail.company_data;

                var company_line_1 = company_data.address_street;
                var company_line_2 = company_data.address_floor;
                var company_city = company_data.address_city;
                var company_state = company_data.address_state;
                var company_zipcode = company_data.address_zip;

                $("#company_address").val(company_line_1 + " " + company_line_2 + " " + company_city + " " + company_state + " " + company_zipcode);

                $("#company_name").val(company.first_name);
                $("#company_phone").val(company.view_cell_phone);
                $("#company_fax").val(company.company_detail.view_fax_no);
            }

            if (patient.default_form && (responseData.type == '1' || responseData.type == '3')) {
                var default_form = patient.default_form;
                var extra_field = default_form.extra_field;

                var sendBy = default_form.send_by;
                $("#send_date").text(default_form.created_at);
                $("#referral_send_date").val(default_form.created_at);
                $("#auth_user_full_name").val(sendBy.first_name + ' ' +sendBy.last_name);
                $("#company_phone").val(patient.company.view_cell_phone);
                $("#auth_user_email").val(sendBy.email);

                if (extra_field != null) {
                    $("#lastet_emergency_address").val(extra_field.emergency['address_line_1']);
                    $("#lastet_emergency_city").val(extra_field.emergency['city']);
                    $("#lastet_emergency_zipcode").val(extra_field.emergency['zipcode']);

                    if (typeof extra_field.emergency.county !== 'undefined') {
                        var counties = extra_field.emergency.county;

                        $(document).find(".county_array").each(function( i, x ){
                            if($.inArray($(this).val(), counties) !== -1 ) {
                                $(this).prop("checked","checked");
                            } else {
                                $(this).prop("checked","");
                            }
                        });
                    }

                    if (typeof extra_field.referral_type !== 'undefined') {
                        var referral_type = extra_field.referral_type;

                        $(document).find(".referral_type_array").each(function( i, x ){
                            if($.inArray($(this).val(), referral_type) !== -1 ) {
                                $(this).prop("checked","checked");
                            } else {
                                $(this).prop("checked","");
                            }
                        });
                    }

                    if (typeof extra_field.other_language !== 'undefined') {
                        var other_language = extra_field.other_language;
                        $(".languages ").show();
                        $(".written-material-yes").prop("checked","checked");
                        $(document).find(".language_array").each(function( i, x ){
                            if($.inArray($(this).val(), other_language) !== -1 ) {
                                $(this).prop("checked","checked");
                            } else {
                                $(this).prop("checked","");
                            }
                        });
                    }
                }
            }

            if (patient.map_form && responseData.type == '2') {
                var map_form = patient.map_form;
                var map_extra_field = map_form.extra_field;

                var sendBy = map_form.send_by;

                $("#send_date").text(map_form.created_at);
                $("#referral_send_date").val(map_form.created_at);
                $("#auth_user_full_name").val(sendBy.first_name + ' ' +sendBy.last_name);
                $("#company_phone").val(patient.company.view_cell_phone);
                $("#auth_user_email").val(sendBy.email);

                if (map_extra_field != null) {

                    if (typeof map_extra_field.best_time_to_contact !== 'undefined') {
                        $("#best_time_to_contact").val(map_extra_field.best_time_to_contact);
                    }

                    if (typeof map_extra_field.CFEEC_assessment !== 'undefined') {
                        $(".CFEEC_assessment_flag[value=" + map_extra_field.CFEEC_assessment.flag + "]").attr('checked', 'checked');

                        if (map_extra_field.CFEEC_assessment.flag == 'Yes') {
                            $(".maximus-cfeec-date").css({"display":"inline-block"});
                            $("#CFEEC_assessment_date").val(map_extra_field.CFEEC_assessment.date);
                        }
                    }

                    if (typeof map_extra_field.receiving_homecare !== 'undefined') {
                        $(".receiving_homecare_flag[value=" + map_extra_field.receiving_homecare.flag + "]").attr('checked', 'checked');

                        if (map_extra_field.receiving_homecare.flag == 'Yes') {
                            $(".receiving-homecare-details").css({"display":"inline-block"});
                            $("#receiving_homecare_details").val(map_extra_field.receiving_homecare.detail);
                        }
                    }

                    if (typeof map_extra_field.service !== 'undefined') {
                        $(".patient_service[value=" + patient.patient_details.service + "]").attr('checked', 'checked');

                        if (patient.patient_details.service == '1') {
                            $(".cdpas-options").css({"display":"block"});

                            $(".cdpap_service[value=" + map_extra_field.service.cdpap + "]").attr('checked', 'checked');
                            $("#designated_rep").val(map_extra_field.service.designated_rep);
                            $("#cdpap_caregiver").val(map_extra_field.service.caregiver);
                        }
                    }

                    if (typeof map_extra_field.health_insurance !== 'undefined') {
                        $("#other_health_insurance").val(map_extra_field.health_insurance.other);
                        $(".care_plan_flag[value=" + map_extra_field.receiving_homecare.flag + "]").attr('checked', 'checked');
                        $("#plan_name").val(map_extra_field.health_insurance.plan_name);
                    }

                    if (typeof map_extra_field.physician !== 'undefined') {
                        var physician = map_extra_field.physician;
                        $("#specialist_npi").val(physician.npi);
                    }

                    if (typeof map_extra_field.specialist1 !== 'undefined') {
                        var specialist1 = map_extra_field.specialist1;
                        $("#specialist1_name").val(specialist1.name);
                        $("#specialist1_phone_fax").val(specialist1.phone_fax);
                        $("#onlyAddress2").val(specialist1.address_line_1);
                        $("#specialist1_npi").val(specialist1.npi);
                        $("#note").val(specialist1.note);
                    }

                    if (typeof map_extra_field.specialist2 !== 'undefined') {
                        var specialist2 = map_extra_field.specialist2;
                        $("#specialist2_name").val(specialist2.name);
                        $("#specialist2_phone_fax").val(specialist2.phone_fax);
                        $("#onlyAddress3").val(specialist2.address_line_1);
                        $("#specialist2_npi").val(specialist2.npi);
                    }

                    if (typeof map_extra_field.specialist3 !== 'undefined') {
                        var specialist3 = map_extra_field.specialist3;
                        $("#specialist3_name").val(specialist3.name);
                        $("#specialist3_phone_fax").val(specialist3.phone_fax);
                        $("#onlyAddress4").val(specialist3.address_line_1);
                        $("#specialist3_npi").val(specialist3.npi);
                    }

                    if (typeof map_extra_field.specialist4 !== 'undefined') {
                        var specialist4 = map_extra_field.specialist4;
                        $("#specialist4_name").val(specialist4.name);
                        $("#specialist4_phone_fax").val(specialist4.phone_fax);
                        $("#onlyAddress5").val(specialist4.address_line_1);
                        $("#specialist4_npi").val(specialist4.npi);
                    }

                    if (typeof map_extra_field.specialist5 !== 'undefined') {
                        var specialist5 = map_extra_field.specialist5;
                        $("#specialist5_name").val(specialist5.name);
                        $("#specialist5_phone_fax").val(specialist5.phone_fax);
                        $("#onlyAddress6").val(specialist5.address_line_1);
                        $("#specialist5_npi").val(specialist5.npi);
                    }

                    if (typeof map_extra_field.specialist6 !== 'undefined') {
                        var specialist6 = map_extra_field.specialist6;
                        $("#specialist6_name").val(specialist6.name);
                        $("#specialist6_phone_fax").val(specialist6.phone_fax);
                        $("#onlyAddress7").val(specialist6.address_line_1);
                        $("#specialist6_npi").val(specialist6.npi);
                    }
                }
            }

            if (patient.referral_form  && responseData.type == '4') {
                var referral_form = patient.referral_form;
                var referral_extra_field = referral_form.extra_field;

                var sendBy = referral_form.send_by;

                $("#send_date").text(referral_form.created_at);
                $("#referral_send_date").val(referral_form.created_at);
                $("#auth_user_full_name").val(sendBy.first_name + ' ' +sendBy.last_name);
                $("#company_phone").val(patient.company.view_cell_phone);
                $("#auth_user_email").val(sendBy.email);

                if (referral_extra_field != null) {
                    if (typeof referral_extra_field.current_location !== 'undefined') {
                        $("#current_location").val(referral_extra_field.current_location);
                    }

                    if (typeof referral_extra_field.marital_status !== 'undefined') {
                        $(".marital_status_array[value=" + referral_extra_field.marital_status + "]").attr('checked', 'checked');
                    }

                    if (typeof referral_extra_field.patient_aware_or_referral !== 'undefined') {
                        $(".patient_aware_or_referral[value=" + referral_extra_field.patient_aware_or_referral + "]").attr('checked', 'checked');
                    }

                    if (typeof referral_extra_field.live_alone !== 'undefined') {
                        $(".live_alone[value=" + referral_extra_field.live_alone + "]").attr('checked', 'checked');
                    }

                    if (referral_extra_field.live_alone == 'No') {
                        $(".mutual-container").css({"display":"block"});

                        if (typeof referral_extra_field.client_mutual !== 'undefined') {
                            $(".client_mutual[value=" + referral_extra_field.client_mutual + "]").attr('checked', 'checked');

                            if (referral_extra_field.client_mutual == 'Yes') {
                                $(".mutual-name").show();
                                $("#mutual_name").val(referral_extra_field.mutual_name);
                            }
                        }
                    }

                    if (typeof referral_extra_field.mutual_case !== 'undefined') {
                        $(".mutual_case[value=" + referral_extra_field.mutual_case + "]").attr('checked', 'checked');
                    }

                    if (typeof referral_extra_field.best_time_contact !== 'undefined') {
                        $(".best_time_contact[value=" + referral_extra_field.best_time_contact + "]").attr('checked', 'checked');
                    }

                    if (typeof referral_extra_field.instructions !== 'undefined') {
                        $("#instructions").val(referral_extra_field.instructions);
                    }

                    if (typeof referral_extra_field.animals !== 'undefined') {
                        $(".animals[value=" + referral_extra_field.animals + "]").attr('checked', 'checked');
                    }

                    if (typeof referral_extra_field.english_speaking !== 'undefined') {
                        $(".english_speaking[value=" + referral_extra_field.english_speaking + "]").attr('checked', 'checked');
                    }

                    if (typeof referral_extra_field.ssn !== 'undefined') {
                        $("#ssn").val(referral_extra_field.ssn);
                    }

                    if (typeof referral_extra_field.specialist_npi !== 'undefined') {
                        $("#specialist_npi").val(referral_extra_field.specialist_npi);
                    }

                    if (typeof referral_extra_field.primary_diagnoses !== 'undefined') {
                        $("#primary_diagnoses").val(referral_extra_field.primary_diagnoses);
                    }

                    if (typeof referral_extra_field.agency_type !== 'undefined') {
                        $("#agency_type").val(referral_extra_field.agency_type);
                    }

                    if (typeof referral_extra_field.CFEEC_assessment.flag !== 'undefined') {
                        $(".CFEEC_assessment_flag[value=" + referral_extra_field.CFEEC_assessment.flag + "]").attr('checked', 'checked');
                    }

                    if (typeof referral_extra_field.CFEEC_assessment.maximus !== 'undefined') {
                        $(".CFEEC_maximus[value=" + referral_extra_field.CFEEC_assessment.maximus + "]").attr('checked', 'checked');

                        if (referral_extra_field.CFEEC_assessment.maximus == 'Yes') {
                            $(".maximus-scheduled").show();

                            if (typeof referral_extra_field.CFEEC_assessment.scheduled !== 'undefined') {
                                $("#maximus_scheduled").val(referral_extra_field.CFEEC_assessment.scheduled);
                            }
                        }
                    }

                    if (typeof referral_extra_field.physician !== 'undefined') {
                        var physician = referral_extra_field.physician;
                        $("#specialist_npi").val(physician.npi);
                    }

                    if (patient.patient_details.physician) {
                        var physician = patient.patient_details.physician;

                        $('#physician_license').val(physician.license);
                    }
                }
            }

            if (patient.vns_form  && responseData.type == '5') {
                var vns_form = patient.vns_form;
                var vns_extra_field = vns_form.extra_field;

                var sendBy = vns_form.send_by;

                $("#send_date").text(vns_form.created_at);
                $("#referral_send_date").val(vns_extra_field.created_at);
                $("#auth_user_full_name").val(sendBy.first_name + ' ' +sendBy.last_name);
                $("#company_phone").val(patient.company.view_cell_phone);
                $("#auth_user_email").val(sendBy.email);
                $("#auth_phone").val(sendBy.view_home_phone);

                if (vns_extra_field != null) {
                    if (typeof vns_extra_field.patient_discharged.day_14 !== 'undefined') {
                        $(".patient_discharged_14_day[value=" + vns_extra_field.patient_discharged.day_14 + "]").attr('checked', 'checked');
                    }
                    if (typeof vns_extra_field.facility_name !== 'undefined') {
                        $('#facility_name').val(vns_extra_field.facility_name);
                    }
                    if (typeof vns_extra_field.patient_discharged.date !== 'undefined') {
                        $('#patient_discharged_date').val(vns_extra_field.patient_discharged.date);
                    }
                    if (typeof vns_extra_field.stay_in_patient !== 'undefined') {
                        $(".stay_in_patient[value=" + vns_extra_field.stay_in_patient + "]").attr('checked', 'checked');
                    }
                    if (typeof vns_extra_field.ed_visit !== 'undefined') {
                        $(".ed_visit[value=" + vns_extra_field.ed_visit + "]").attr('checked', 'checked');
                    }
                    if (typeof vns_extra_field.observation_stay !== 'undefined') {
                        $(".observation_stay[value=" + vns_extra_field.observation_stay + "]").attr('checked', 'checked');
                    }
                    if (typeof vns_extra_field.insurance1.carrier !== 'undefined') {
                        $('#insurance1_carrier').val(vns_extra_field.insurance1.carrier);
                    }

                    if (typeof vns_extra_field.insurance1.subscriber_name !== 'undefined') {
                        $('#insurance1_subscriber_name').val(vns_extra_field.insurance1.subscriber_name);
                    }

                    if (typeof vns_extra_field.insurance1.policy_no !== 'undefined') {
                        $('#insurance1_policy_no').val(vns_extra_field.insurance1.policy_no);
                    }

                    if (typeof vns_extra_field.insurance1.group_no !== 'undefined') {
                        $('#insurance1_group_no').val(vns_extra_field.insurance1.group_no);
                    }

                    if (typeof vns_extra_field.insurance2.carrier !== 'undefined') {
                        $('#insurance2_carrier').val(vns_extra_field.insurance2.carrier);
                    }

                    if (typeof vns_extra_field.insurance2.subscriber_name !== 'undefined') {
                        $('#insurance2_subscriber_name').val(vns_extra_field.insurance2.subscriber_name);
                    }

                    if (typeof vns_extra_field.insurance2.policy_no !== 'undefined') {
                        $('#insurance2_policy_no').val(vns_extra_field.insurance2.policy_no);
                    }

                    if (typeof vns_extra_field.insurance2.group_no !== 'undefined') {
                        $('#insurance2_group_no').val(vns_extra_field.insurance2.group_no);
                    }

                    // .instruction
                    if (typeof vns_extra_field.encounter_date !== 'undefined') {
                        $('#encounter_date').val(vns_extra_field.encounter_date);
                    }

                    if (typeof vns_extra_field.diagnoses1 !== 'undefined') {
                        $('#diagnoses1').val(vns_extra_field.diagnoses1);
                    }

                    if (typeof vns_extra_field.diagnoses2 !== 'undefined') {
                        $('#diagnoses2').val(vns_extra_field.diagnoses2);
                    }

                    if (typeof vns_extra_field.diagnoses3 !== 'undefined') {
                        $('#diagnoses3').val(vns_extra_field.diagnoses3);
                    }

                    if (typeof vns_extra_field.diagnoses4 !== 'undefined') {
                        $('#diagnoses4').val(vns_extra_field.diagnoses4);
                    }

                    if (typeof vns_extra_field.diagnoses5 !== 'undefined') {
                        $('#diagnoses5').val(vns_extra_field.diagnoses5);
                    }

                    if (typeof vns_extra_field.diagnoses6 !== 'undefined') {
                        $('#diagnoses6').val(vns_extra_field.diagnoses6);
                    }

                    var skilled_array = vns_extra_field.skilled;
                    $(document).find(".skilled_array").each(function( i, x ){
                        if($.inArray($(this).val(), skilled_array) !== -1 ) {
                            $(this).prop("checked","checked");
                        } else {
                            $(this).prop("checked","");
                        }
                    });

                    if (typeof vns_extra_field.skilled_text1 !== 'undefined') {
                        $('#skilled_text1').val(vns_extra_field.skilled_text1);
                    }

                    if (typeof vns_extra_field.skilled_text2 !== 'undefined') {
                        $('#skilled_text2').val(vns_extra_field.skilled_text2);
                    }

                    if (typeof vns_extra_field.skilled_text3 !== 'undefined') {
                        $('#skilled_text3').val(vns_extra_field.skilled_text3);
                    }

                    if (typeof vns_extra_field.skilled_text4 !== 'undefined') {
                        $('#skilled_text4').val(vns_extra_field.skilled_text4);
                    }

                    if (typeof vns_extra_field.skilled_text5 !== 'undefined') {
                        $('#skilled_text5').val(vns_extra_field.skilled_text5);
                    }

                    if (typeof vns_extra_field.skilled_text6 !== 'undefined') {
                        $('#skilled_text6').val(vns_extra_field.skilled_text6);
                    }

                    if (typeof vns_extra_field.skilled_text7 !== 'undefined') {
                        $('#skilled_text7').val(vns_extra_field.skilled_text7);
                    }

                    if (typeof vns_extra_field.skilled_text8 !== 'undefined') {
                        $('#skilled_text8').val(vns_extra_field.skilled_text8);
                    }

                    var therary_array = vns_extra_field.therary;

                    $(document).find(".therary_array").each(function( i, x ){
                        if($.inArray($(this).val(), therary_array) !== -1 ) {
                            $(this).prop("checked","checked");
                        } else {
                            $(this).prop("checked","");
                        }
                    });

                    if (typeof vns_extra_field.therary_text1 !== 'undefined') {
                        $('#therary_text1').val(vns_extra_field.therary_text1);
                    }

                    if (typeof vns_extra_field.therary_text2 !== 'undefined') {
                        $('#therary_text2').val(vns_extra_field.therary_text2);
                    }

                    if (typeof vns_extra_field.therary_text3 !== 'undefined') {
                        $('#therary_text3').val(vns_extra_field.therary_text3);
                    }

                   if (typeof vns_extra_field.therary_text4 !== 'undefined') {
                        $('#therary_text4').val(vns_extra_field.therary_text4);
                    }

                    if (typeof vns_extra_field.therary_text5 !== 'undefined') {
                        $('#therary_text5').val(vns_extra_field.therary_text5);
                    }

                    if (typeof vns_extra_field.therary_text6 !== 'undefined') {
                        $('#therary_text6').val(vns_extra_field.therary_text6);
                    }
                }
            }

            if (patient.patient_details) {
                var patient_details = patient.patient_details
                var medicaid_id = patient_details.medicaid_id;
                var medicare_id = patient_details.medicare_id;

                $("#alt_phone").val(patient_details.alt_phone);

                if (patient.patient_hmo_insurances_count > 0) {
                    $("input[name=hmo_insurance]").attr('checked', 'checked');
                } else {
                    $("input[name=employeement_type][value=" + patient_details.referral_type + "]").attr('checked', 'checked');
                }

                $("input[name=receiving-homecare][value=" + patient_details.referral_type + "]").attr('checked', 'checked');

                $("#medicaid_id").val(medicaid_id);
                $("#medicare_id").val(medicare_id);

                $("#language option[value=" + patient_details.language + "]").prop('selected', true)

                if (patient_details.languages) {
                    $("#languagetext").val(patient_details.languages.name);
                }

                if (patient_details.referrer) {
                    $("#source").val(patient_details.referrer.source.name);
                }
                $("input[name=service_type][value=" + patient_details.service + "]").attr('checked', 'checked');

                if (patient_details.address != null) {
                    var address = patient_details.address;

                    var address_line_1 = address.address_line_1;
                    var address_line_2 = address.address_line_2;
                    var city = address.city;
                    var state = address.state;
                    var zipcode = address.zipcode;

                    $("#address1").val(address_line_1);
                    $("#address2").val(address_line_2);
                    $("#city").val(city);
                    $("#state").val(state);
                    $("#zipcode").val(zipcode);

                    $("#single_line_address").val(address_line_1 + " " + address_line_2 + " " + city + " " + state + " " + zipcode);
                }

                if (patient_details.physician) {
                    var physician = patient_details.physician;
                    $('#physician_full_name').val(physician.first_name + ' ' + physician.last_name);
                    $('#physician_phone').val(physician.phone);
                    $('#physician_id').val(physician.id);

                    if (physician.address != null) {
                        var physician_address = '';
                        if (typeof physician.address['address_line_1'] !== 'undefined') {
                            physician_address += physician.address['address_line_1'];
                        }
                        if (typeof physician.address['address_line_2'] !== 'undefined') {
                            physician_address += physician.address['address_line_2'];
                        }

                        if (typeof physician.address['city'] !== 'undefined') {
                            physician_address += physician.address['city'];
                        }


                        if (typeof physician.address['state'] !== 'undefined') {
                            physician_address += physician.address['state'];
                        }


                        if (typeof physician.address['zipcode'] !== 'undefined') {
                            physician_address += physician.address['zipcode'];
                        }


                        if (typeof physician.address['borough'] !== 'undefined') {
                            physician_address += physician.address['borough'];
                        }

                        if (typeof physician.address['county'] !== 'undefined') {
                            physician_address += physician.address['county'];
                        }

                        $('#onlyAddress').val(physician_address);
                        $('#onlyAddress1').val(physician_address);
                    }
                }
            }

            if (typeof emergency_table !== 'undefined') {
                if (patient.patient_emergencies != '') {
                    $.each(patient.patient_emergencies, function (key, value) {
                        if (emergency_table === 'map_submission_form') {
                            $('.emergency_table').append('<tr><td class="cell-pad-5-10" style="width: 33%;"><table cellspacing="0" cellpadding="0" width="100%" class="no-border"><tr><td style="width: 62px;"><b>Name (1) :</b></td><td><input type="text" name="emergency[name]" value="'+value.name+'" placeholder="Type here" tabindex="6"/></td></tr></table></td><td class="cell-pad-5-10" style="width: 33%;"><table cellspacing="0" cellpadding="0" width="100%" class="no-border"><tr><td style="width: 80px;"><b>Relationship :</b></td><td><input type="text" name="emergency[relation]" value="'+value.relation+'" placeholder="Type here" tabindex="7"/></td></tr></table> </td><td class="cell-pad-5-10" style="width: 33%;"><table cellspacing="0" cellpadding="0" width="100%" class="no-border"><tr><td style="width: 55px;"><b>Phone # :</b></td><td><input type="text" name="emergency[phone]" value="'+value.phone+'" placeholder="Type here" tabindex="8"/></td></tr></table></td></tr>');
                        } else if (emergency_table === 'referral_submission_form') {
                            $('.emergency_table').append('<tr><td><input type="text" value="'+value.name+'" placeholder="Type here" tabindex="18"/></td><td><input type="text" value="'+value.relation+'" placeholder="Type here" tabindex="19"/></td><td><input type="text" value="'+value.phone+'" placeholder="Type here" tabindex="20"/></td></tr>');
                        }
                    });
                }
            }

            if (patient.lastest_patient_emergencies != null) {
                var lastest_emergencies = patient.lastest_patient_emergencies;

                if (lastest_emergencies.address != null) {
                    var address = lastest_emergencies.address;

                    var address_line_1 = address.address_line_1;
                    var address_line_2 = address.address_line_2;
                    var city = address.city;
                    var zipcode = address.zipcode;

                    $("#lastet_emergency_address").val(address_line_1 + ' ' + address_line_2);
                    $("#lastet_emergency_city").val(city);
                    $("#lastet_emergency_zipcode").val(zipcode);
                }
                $("#lastet_emergency_phone").val(lastest_emergencies.phone);
                $("#lastet_emergency_relation").val(lastest_emergencies.relation);

            }
        }
    },
    error: function (error) {

    }
});