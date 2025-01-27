/** load/unload loader start*/
export function loader() {
    $(".loader").show();
}

export function clearloader() {
    $(".loader").hide();
}

export const notification = {
    showNotification(message, type, delay = 4000) {
        $(`.${type}-message`).show();
        $(`.${type}-html`).html(message);
        $(`.${type}-message`).delay(delay).hide('slow');
    },
    success(message, delay = 4000) {
        this.showNotification(message, 'success', delay);
    },
    error(message, delay = 4000) {
        this.showNotification(message, 'error', delay);
    },
    warning(message, delay = 4000) {
        this.showNotification(message, 'warning', delay);
    }
}

export function onlyDigit(event)
{
    if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
        event.preventDefault();
    }
}

export function masters(table, title = '', flag ='') {
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: "/masters",
        method: 'POST',
        data: {
            table: table,
            title: title,
            flag: flag
        },
        success: function (response) {
            $("#"+table).html(response);
        },
        error: function (error) {

        }
    });
}

/** show/Hide success/error message*/
export function alertText(text, status) {
    $("."+status+"-message").show();
    $("."+status+"-html").html(text);
    $("."+status+"-message").delay(4000).hide('slow');
}

/** show/Hide bulk action(active,inactive,delete etc) button*/
export function buttonHide(t) {
    t.closest('table').find('.acceptRejectBtn').hide();
}

export function buttonShow(t) {
    t.closest('table').find('.acceptRejectBtn').show();
}

/** Refresh datatable value after perform action */
export function tableRefresh(table) {
    $("."+table).DataTable().ajax.reload(null, false);
}

/** Modal popop open/close */
export function hidePopup(frmId) {
    $('#'+frmId).trigger("reset");
    $(".popup").hide();
    $(".viewModelData").modal('hide');
}

/** Load section after ajax response */
export function loadSection(section) {
    $(document).find("."+section).load(location.href + " ."+section+">*","",function(){
        if(section === 'enrollment-timeline' || section === 'personal_detail_section') {
            $(".date, .enrollment-date").datepicker({
                dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
                numberOfMonths: 1,
                changeYear: true,
                changeMonth: true,
                dateFormat: "mm/dd/yy",
                onSelect: function (dateText, inst) {
                    if(section === 'enrollment-timeline') {
                        onselectDate($(this), dateText);
                    }
                },
            });
        }     
        
        if (typeof $.fn.select2 !== 'undefined' && section === 'applicant-profile-details') {
            $('.spoken_language').select2();
            $('.office_ids').select2();
        }
        
        if (section === 'assesment_detail_section') {
            var dateCommonForm = new Date();
            var yearCommonForm = dateCommonForm.getFullYear();
            var yearPlusTwoForm = yearCommonForm + 2;

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
                    if(section === 'assesment_detail_section') {
                        onselectDate($(this), dateText);
                    }
                },
            });
        }
    });
}

/** Action after date select */
export function onselectDate(t, dateText) {
    var id_for_update = t.attr('data-id');
    var action = t.attr('data-action');
    var url = t.attr('data-url');

    var method = 'PUT';
    var data = {
        "action" : action,
        "id_for_update" : id_for_update,
        "date": dateText,
    };

    ajaxCall(t, url, action, data, method)
}

/** Ajax call common function used dynamic */
export function ajaxCall(t, url, action, dataObject) {
    loader();
    $.ajax({
        type: 'POST',
        url: url,
        headers: {
            'X_CSRF_TOKEN':'{{ csrf_token() }}',
        },
        data: dataObject,
        success: function (data) {
            if (action === 'email-registered') {
                // if(data.data.isRegistered) {
                    // t.parent('.grid-item').find('.emailvalidation').text(data.message);
                // } else {
              
                    if(data.data.isRegistered) {
                        $(".is_rehired_section").show();
                        t.parent('.grid-item').find('.emailvalidation').text(data.message);
                    } else {
                        $(".is_rehired_section").hide();
                        t.parent('.grid-item').find('.emailvalidation').text('');
                    }
                // }
            } else if (action === 'search-user') {
                var container = $('.auto-search-input').attr('data-container');
                $('.' + container + ' .auto-search-result').fadeIn();
                $('.' + container + ' .auto-search-result ul').html('');

                if (data.data.serachUser != '' && (typeof data.data.serachUser !== 'undefined')) {
                    $.each(data.data.serachUser, function (key, value) {
                        var id = value['id'];
                        var name = value['first_name'] + ' ' +  value['last_name'];
                        $('.' + container + ' .auto-search-result ul').append('<li><a href=' + id + ' target="_blank">' + name + '</a></li>');
                    });
                } else {
                    $('.' + container + ' .auto-search-result ul').append('<li>Record not found</li>');
                }
            } else if (action === 'get-exception-description') {
                var description = data.data.description;
                $(document).find(".description").val(description);
            } else if (action === 'get-insurance-detail') {
                var masterDatas = data.data.masterDatas.data;

                var id = data.data.masterDatas.id;
                var type = masterDatas.type;
                var phone = masterDatas.phone;
                var fax = masterDatas.fax;
                var address = masterDatas.address;

                $('.insurance_id').val(id);
                $('.insurance_type').val(type);
                $('.insurance_phone').val(phone);
                $('.insurance_fax').val(fax);
                $('.insurance_address').val(address);
                $(".referral_form_name").html('');

                if (data.data.masterDatas.insurance_users.length > 0) {
                    if (masterDatas.referral_form != null) {
                        $(".referral_form_name").append('<a target="_blank" href="'+data.data.referral_form_url+'" class="download-pdf" alt="PDF Icon"><span> '+masterDatas.referral_form+' </span></a>');
                    } else {
                        $(".referral_form_name").append('<a target="_blank" href="'+data.data.referral_form_url+'" class="download-pdf" alt="PDF Icon"><span>Default Form</span></a>');
                    }

                    $(".email_list").html('');
                    var emails = [];
                    $.each(data.data.masterDatas.insurance_users, function (key, value) {
                        $(".email_list").append('<a class="download-pdf" alt="PDF Icon" download><i class="fas fa-paperclip"></i><span> '+value.email+' </span></a>');
                        emails.push(value.email);
                    });
                    $("#email_list").val(emails.join(","))
                } else {
                    $(".email_list").append('<p class="text-red">opps! we are missing insurance detail. go to <a href="'+data.data.referral_setup_url+'" target="_blank">Referral Setup</a></p>');
                    $(".insurance_btn").attr('disabled', true);
                }
            } else if (action === 'update-follow-up-date') {
                alertText(data.message, 'success');
            } else if (action === 'edit-insurance-user-data') {
                var insuranceUser = data.data;
                t.closest("tr").find(".edit-text").hide();
                t.closest("tr").find("span").show();

                t.closest("tr").find(".spanFirstName").text(insuranceUser.first_name);
                t.closest("tr").find(".spanLastName").text(insuranceUser.last_name);
                t.closest("tr").find(".spanPhone").text(insuranceUser.phone);
                t.closest("tr").find(".spanEmail").text(insuranceUser.email);

                t.closest("tr").find(".edit-btn").show();
                t.closest("tr").find(".update-btn").hide();

                alertText(data.message, 'success');
            } else if(action === 'add-insurance-user') {
                //loadSection('insurance_table');
                masters('master_insurance');
                t.parents('tr.insurance_user_div').css({"display" : "block"});

                // t.closest("tr").find(".first_name").val('');
                // t.closest("tr").find(".last_name").val('');
                // t.closest("tr").find(".phone").val('');
                // t.closest("tr").find(".email").val('');

                alertText(data.message, 'success');
            } else if(action === 'import-hhax') {
                if (typeof masters !== 'undefined') {
                    masters(data.data.slug);
                }

                if(typeof dataObject.table !== 'undefined' && dataObject.table === 'coordinator-data') {
                    tableRefresh('coordinator-data');
                }

                alertText(data.message, 'success');
            } else if(action === 'get-insurance-name') {
                $(".insurance_name_action").html('<option value="">Select a name</option>');

                $(".type").val(dataObject.value);
                if (data.data.insurances != '') {
                    $.each(data.data.insurances, function (key, value) {
                        var id = value['id'];

                        var name = value['name'];
                        $(".insurance_name_action").append('<option value="' + id + '">' + name + '</option>');
                    });
                }
            } else if(action === 'get-sub-category') {
                $(".skill_category_id_value").val(dataObject.id);
                t.parents('.grid-row').find(".sub_category").html('<option value="">Select Skilled Category</option>');

                if (data.data.subCategory != '') {
                    var hhaxid = '';

                    $.each(data.data.subCategory, function (key, value) {
                        var id = value['id'];
                        var name = value['name'];

                        if (value['hhax_id']) {
                            var hhaxid = value['hhax_id'].join(',');
                        }

                        t.parents('.grid-row').find(".sub_category").append('<option value="' + id + '" data-hhaxId="'+hhaxid+'">' + name + '</option>');
                    });
                }
            } else if(action === 'get-wage-pay-code') {
               
                t.parents('.grid-row').find(".pay_code").html('<option value="">Select pay code</option>');
                console.log(data.data.payCode);
                if (data.data.payCode != '') {
                    var hhax_id = '';

                    $.each(data.data.payCode, function (key, value) {
                        var id = value['id'];
                        var name = value['name'];
                        var hhax_id = value['hhax_id'];

                        t.parents('.grid-row').find(".pay_code").append('<option value="' + hhax_id + '">' + name + '</option>');
                    });
                }  
            } else if(action === 'get-office-address') {
                $(document).find(".onlyAddress").val(data.data.office.address);
            } else if(action === 'get-wage-info-rate') {
                 $(".sub_category_name").val(dataObject.category_name);
                $("#rate_id").html('<option value="">Select wage rate</option>');

                if (data.data.wageRate != '') {
                    var i = 1;
                    $.each(data.data.wageRate, function (key, value) {
                        var rate_code = value['rate_code'];
                        var rate_id = value['id'];
                        $("#rate_id").append('<option value="'+rate_id+'">'+rate_code+'</option>');

                        i++;
                    });
                }

                var category_name = $(".get_wage_info option:selected").text();

                $(".start_application").attr('data-category-id', data.data.category_id);

                $(".start_application").attr('data-category-name', category_name);

                if(category_name  != 'CDPAP') {
                    if($('.patient_application').css('display') != 'none') {
                        $('.patient_application').hide();
                        $('.start_applicat_btn').hide();
                    }
                } else {

                    if($('.start_applicat').css('display') != 'none') {
                        var div_id = t.attr('data-from');
                        $('.patient_application').show();

                        if (div_id === '2') {
                            $('.start_patient_app_btn').hide();
                            $('.start_applicat_btn').show();
                        } else if (div_id === '1') {
                            $('.start_applicat_btn').hide();
                        }
                    }
                }
            } else if(action === 'change-sequence') {
                loadSection('enrollment-timeline');
            } else if (action === 'accept-in-service') {
                loadSection('in-service-container');
            } else if (action === 'assign-to-patient') {
                alertText(data.message, 'success');
            } else if (action === 'road-map-un-checked') {
                loadSection("enrollment-timeline");
                loadSection("enrollment-steps");
                loadSection("progress-bar-container");

                alertText(data.message, 'success');
            } else if (action === 'update-form-language') {
                $(".popup").hide();

                alertText("Language change succesfully.", 'success');
		        window.location.href = data.data.redirect_url;	  
            } else if (action === 'suggestion-answer-status') {   
             
                $("#wrong_answer_suggestion_"+data.data.quetion_id).hide();        
                if (typeof data.data.is_suggestion !== 'undefined') {
                    $("#wrong_answer_suggestion_"+data.data.quetion_id).show();    
                }
            }
            
            var refreshTable = t.closest("table").attr('id');

            if (typeof refreshTable !== 'undefined') {
                tableRefresh(refreshTable);
            }
            clearloader();
        },
        error: function () {
            alertText("Server Timeout! Please try again");
            clearloader();
        }
    });
}

/** Image preview on change file choose */
export function profileimage(input) {
    var fileTypes = ['jpg', 'jpeg', 'png'];
    if (input.files && input.files[0]) {
        var extension = input.files[0].name.split('.').pop().toLowerCase();
        var isSuccess = fileTypes.indexOf(extension) > -1;
        if (isSuccess) {
            $(input).parents('form').find('.imagepreview').css({'display':'block'});
            var reader = new FileReader();
            reader.onload = function(e) {
                $(input).parents('form').find('.imagepreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        } else {
            $(input).parents('form').find('.imagepreview').css({'display':'none'});
        }
    }
}

export function CKupdate() {
    if (typeof CKEDITOR !== 'undefined' && Object.keys(CKEDITOR.instances).length > 0) {
        for (var i in CKEDITOR.instances) {
            CKEDITOR.instances[i].updateElement();
        }
    } else {
        console.log('No CKEditor instances found.');
    }
}

export function showHidePassword(event, class1, class2) {
    $(event).parents('.input-field-container').find(".pass-hide").addClass(class1).removeClass(class2);
    $(event).parents('.input-field-container').find(".pass-show").addClass(class2).removeClass(class1);
}

/** Load section and clode popup */
export function loadSectionAndHidePopup(frmId, section) {
    loadSection(section);
    hidePopup(frmId);
    $('#modal').modal('hide');
}

export function initMap(latA, lonA, latS, lonS) {
    const center = {lat: latA, lng: lonA};
    const options = {zoom: 15, scaleControl: true, center: center};
    map = new google.maps.Map(document.getElementById('map'), options);
    // Locations of landmarks
    const dakota = {lat: latA, lng: lonA};
    const frick = {lat: latS, lng: lonS};
    // The markers for The Dakota and The Frick Collection
    var mk1 = new google.maps.Marker({position: dakota, map: map});
    var mk2 = new google.maps.Marker({position: frick, map: map});
    var line = new google.maps.Polyline({path: [dakota, frick], map: map});
    var distance = haversine_distance(mk1, mk2);
    document.getElementById('msg').innerHTML = "Distance between markers: " + distance.toFixed(2) + " mi.";
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map); // Existing map object displays directions
    // Create route from existing points used for markers
    const route = {
            origin: dakota,
            destination: frick,
            travelMode: 'DRIVING'
    }
    directionsService.route(route,
        function(response, status) { // anonymous function to capture directions
        if (status !== 'OK') {
            window.alert('Directions request failed due to ' + status);
            return;
        } else {
            directionsRenderer.setDirections(response); // Add route to the map
            var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
            if (!directionsData) {
            window.alert('Directions request failed');
            return;
            }else {
            document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
            }
        }
    });
}

export function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}

export function uplodLinkShow(){
    let fileList = [];
    $('#attachment').on('change', function() {
        let fileList = this.files; // Store the selected files
        const $fileIcon = $('#fileIcon');
    console.log(fileList);
        // Check if files are selected
        if (fileList.length > 0) {
            $fileIcon.show(); // Show the pin icon when files are selected
        } else {
            $fileIcon.hide(); // Hide the icon if no files are selected
        }
    });
    
    // Event listener for pin icon click to download the files
    $('#pinIcon').on('click', function() {
        const fileList = $('#attachment')[0].files; // Access the selected files
    
        if (fileList.length > 0) {
            // Loop through the selected files and create a download link for each
            $.each(fileList, function(i, file) {
                const url = URL.createObjectURL(file); // Create a URL for the file
                const link = $('<a></a>').attr({
                    href: url,
                    download: file.name
                });
                link[0].click(); // Trigger the download
                URL.revokeObjectURL(url); // Revoke the object URL after download
            });
        }
    });
}

export function tableRefreshNursing(selector) {
    if ($.fn.dataTable.isDataTable(selector)) {
        $(selector).DataTable().ajax.reload();
    }
}
