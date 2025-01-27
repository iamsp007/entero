$(document).on('keydown', '.searchUsers', function (event) {
   if (event.key === "Enter") {
      event.preventDefault();
      var type = $(this).attr('data-type');
      var searchData = $(this).val();
      $.ajax({
         headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         },
         url: searchUser,
         type: "POST",
         data: {
            type: type, searchData: searchData
         },
         success: function (response) {
            if (response.code === 200) {
               if (type == 1) {
                  $('#patient_result').show();
                  $('#patient_result').empty();
                  var patientList = response.data;
                  if (patientList.length > 0) {

                     var ul = $('<ul></ul>');
                     ul.append(ul);
                     patientList.forEach(function (patient) {
                        var patientLi = $('<li></li>')
                           .attr('data-id', patient.id)
                           .text(patient.first_name + ' ' + patient.last_name + ' (' + patient.patient_details.patient_code + ')');
                        ul.append(patientLi);
                     });
                     $('#patient_result').append(ul);
                  } else {
                     $('#patient_result').append('<ul>No Patient found</ul>');
                  }
               } else {

                  $('#rn_list_get').empty();
                  var getRnList = response.data;
                  if (getRnList.length > 0) {
                     getRnList.forEach(function (rn) {
                        var rnItem = $('<li></li>').attr('data-id', rn.id).text(rn.first_name + ' ' + rn.last_name + ' (' + rn.caregiver_details.caregiver_code + ')' );
                        $('#rn_list_get').append(rnItem);
                     });
                  } else {
                     $('#rn_list_get').append('<ul><li>No RN found</li></ul>');
                  }
               }
            }
         },
         error: function (xhr, textStatus, errorThrown) {
            if (xhr.status === 422) {
               var errors = xhr.responseJSON.errors;

               $.each(errors, function (field, messages) {
                  var inputField = $('[name="' + field + '"]');
                  inputField.closest('.grid-item').append('<label class="error">' + messages[0] + '</label>');
               });
            }
         }
      });
   }
});

$(document).on("click", ".patient_result ul li", function () {

   $('#frm-broadcast')[0].reset();
   $("#rn_datepicker").datepicker("setDate", null);  // Reset datepicker
   $('#rn_list_get li').removeClass('active'); // Remove active class from RN list
   $('input[name="time_slot"]').prop('checked', false); // Uncheck time slots
   $(".time-slots-container input[type='radio']").prop('disabled', false);  // Disabled time slots

   var patientId = $(this).data("id");
   var patientText = $(this).text();
   $("#patient_id").val(patientId);
   $("#patient_search").val(patientText);
   $('#patient_result').empty();
   $.ajax({
      headers: {
         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      url: getPatientVisit,
      type: "POST",
      data: {
         patientId: patientId
      },
      success: function (response) {
         if (response.code === 200) {
            if (response.data) {
               var visitDetails = response.data.visitDetails;
               var selectedPatient = response.data.patientDetail;

               var visitDate = visitDetails && visitDetails.assesment_date ? visitDetails.assesment_date : null;
               if (visitDate) {
                  $("#rn_datepicker").datepicker("setDate", new Date(visitDate));
                  $("#assesment_date_modal").val(visitDate);
               }

               var selectedRNId = visitDetails && visitDetails.rn ? visitDetails.rn.id : null;
               if (selectedRNId) {
                  $('#rn_list_get li').removeClass('active');
                  $('input[name="time_slot"]').prop('checked', false);
                  $(".time-slots-container input[type='radio']").prop('disabled', false);

                  var selectedLi = $('#rn_list_get li[data-id="' + selectedRNId + '"]');
                  selectedLi.addClass('active');
                  var rnName = selectedLi.text().trim();
                  $('#rn_search').val(rnName);
                  $('#rn_id').val(selectedRNId);
               }

               if(visitDetails){
                  var visitId = visitDetails.id;
                  var assesmentStartTime = visitDetails.assesment_start_time;
                  var assesmentEndTime = visitDetails.assesment_end_time;

                  $("#id").val(visitId);

                  if (assesmentStartTime && assesmentEndTime) {
                     $('#time_slot li').each(function () {
                        var slotStartTime = $(this).find('input').data('start');
                        var slotEndTime = $(this).find('input').data('end');
   
                        if (assesmentStartTime === slotStartTime && assesmentEndTime === slotEndTime) {
                           $(this).find('input').prop('checked', true);
                        }
                     });
                  }
                  var selectedAssessmentType = visitDetails.assesment_type;
                  if (selectedAssessmentType) {
                        $('#assesment_type_model').val(selectedAssessmentType);
                        $('#assesment_type_model').trigger('change');
                  }
               }

               if(selectedPatient){

                  $(".patient-detailsDiv").slideDown();
                  // get patient data
                  if (selectedPatient.dob) {
                     $('#patient_dob').text(selectedPatient.dob);
                  }
   
                  // Set Insurance Name
                  if (selectedPatient.patient_details && selectedPatient.patient_details.insurance_names) {
                     $('#patient_insurance_name').text(selectedPatient.patient_details.insurance_names);
                  }
   
                  // Set Patient Number (home_phone or cell_phone)
                  if (selectedPatient.home_phone) {
                     $('#patient_mobile_number').text(selectedPatient.home_phone);
                  } else if (selectedPatient.cell_phone) {
                     $('#patient_mobile_number').text(selectedPatient.cell_phone);
                  }

                  if (selectedPatient.patient_details && selectedPatient.patient_details.coordinator) {
                     $('#coordinator_name_visit').text(selectedPatient.patient_details.coordinator);
                  }
   
                  // Set Address
                  var address = '';
                  if (selectedPatient.address.address_line_1) {
                     address += selectedPatient.address.address_line_1;
                  }
                  if (selectedPatient.address.address_line_2) {
                     address += (address ? ', ' : '') + selectedPatient.address.address_line_2;
                  }
                  if (selectedPatient.address.city) {
                     address += (address ? ', ' : '') + selectedPatient.address.city;
                  }
                  if (selectedPatient.address.state) {
                     address += (address ? ', ' : '') + selectedPatient.address.state;
                  }
                  if (selectedPatient.address.zipcode) {
                     address += (address ? ', ' : '') + selectedPatient.address.zipcode;
                  }
                  $('#patient_address').text(address);
               }
            }
         }
      },
      error: function (xhr, textStatus, errorThrown) {
         if (xhr.status === 422) {
            var errors = xhr.responseJSON.errors;

            $.each(errors, function (field, messages) {
               var inputField = $('[name="' + field + '"]');
               inputField.closest('.grid-item').append('<label class="error">' + messages[0] + '</label>');
            });
         }
      }
   });
});

$(document).on("click", '.start-broadcast', function () {
   $(".google-map-container").fadeIn();
   $(".broadcast-popup .patient-details").addClass("open");
});
$(document).on("click", '.stop-broadcast', function () {
   $(".google-map-container").fadeOut();
   $(".broadcast-popup .patient-details").removeClass("open");
});
$(document).on("click", '.google-map-container-close', function () {
   $(".google-map-container").fadeOut();
   $(".broadcast-popup .patient-details").removeClass("open");
});

$(document).on("click", '[data-popup-close="broadcast-popup"]', function (e) {
   e.preventDefault();
   $('#broadcast-popup').fadeOut();
   $(this).closest('.popupbroadcast').removeClass('active');
   $(".viewModelData").modal('hide');
});

function initMap() {
   const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 23.0121551, lng: 72.5018649 }, // Example: San Francisco
      zoom: 16,
   });
   addUserMarker(map);
}
function addUserMarker(map) {
   const userPosition = { lat: 23.0121551, lng: 72.5018649 }; // Example coordinates
   const rippleDiv = document.createElement("div");
   rippleDiv.className = "ripple-marker";
   rippleDiv.innerHTML = `
   <div class="ripple"></div>
   <div class="ripple"></div>
   <div class="ripple"></div>
   <div class="ripple"></div>
   <div class="ripple"></div>
   <div class="icon"></div>
   `;
   const userMarker = new google.maps.OverlayView();
   userMarker.onAdd = function () {
      const panes = this.getPanes();
      panes.overlayMouseTarget.appendChild(rippleDiv);
   };
   userMarker.draw = function () {
      const point = this.getProjection().fromLatLngToDivPixel(
         new google.maps.LatLng(userPosition)
      );
      if (point) {
         rippleDiv.style.left = point.x + "px";
         rippleDiv.style.top = point.y + "px";
      }
   };
   userMarker.onRemove = function () {
      rippleDiv.parentNode.removeChild(rippleDiv);
   };
   userMarker.setMap(map);
}

$(function () {

   initMap();

});
