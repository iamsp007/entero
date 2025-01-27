$(document).ready(function () {

   // $("label").each(function () {
   //    var _width = $(this).width() + 5;
   //    $(this).css("width", _width);
   // });

   // $("input[type='number']").keypress(function(event) {
   //    if (event.keyCode < 48 || event.keyCode > 57 ) {
   //       $("input[type='number']").val("");
   //       event.preventDefault();	
   //    }
   // });



   var dt = new Date();
	document.getElementById("year").innerHTML = dt.getFullYear();

   $("[data-popup-open]").on("click", function (e) {
      var targeted_popup_class = jQuery(this).attr("data-popup-open");
      $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
      e.preventDefault();
   });

   $("[data-popup-close]").on("click", function (e) {
      var targeted_popup_class = jQuery(this).attr("data-popup-close");
      $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
      e.preventDefault();
   });

   $(document).on("click", ".profile-details-mobile-btn", function () {
      $(this).toggleClass("open");
      $(".profile-details-container").slideToggle();
   });

   $(".date").datepicker({
      dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SUN"],
      numberOfMonths: 1,
      changeYear: true,
      changeMonth: true,
      dateFormat: "mm/dd/yy",
      onSelect: function (dateText, inst) {},
   });

   $(".phone_no").keyup(function () {
      var firstLetter = $(".phone_no").val().charAt(0);
      var secondLetter = $(".phone_no").val().charAt(1);
      if (firstLetter == "(") {
         if (firstLetter == "1" || secondLetter == "1") {
            $(".phone_no").inputmask("9(999) 999-9999");
         } else {
            $(".phone_no").inputmask("(999) 999-9999");
         }
      } else {
         if (firstLetter == "1" || secondLetter == "1") {
            $(".phone_no").inputmask("9(999) 999-9999");
         } else if (firstLetter != "1") {
            $(".phone_no").inputmask("(999) 999-9999");
         }
      }
   });

   $('.needs-interpreter-yes-no-options input[type="radio"]').on("click",function (e) {
      e.stopPropagation();
      if ($(".needsInterpreter-yes").is(":checked")) {
         $(".needsInterpreter-language").slideDown();
      } else {
         $(".needsInterpreter-language").slideUp();
      }
   });
   
   $('.recent-hospitalization-container input[type="radio"]').on("click",function (e) {
      e.stopPropagation();
      if ($(".recentHospitalization-yes").is(":checked")) {
         $(".recent-hospitalization-details").slideDown();
      } else {
         $(".recent-hospitalization-details").slideUp();
      }
   });

   $(".blood-pressor").inputmask("999/999");

   $(".height").inputmask("99'99''");

   $("#fahrenheit").keyup(function () {
      var fahrenHeit = $(this).val();
      var regex = /^[0-9+\-*/().\s]*$/;
      if (!regex.test(fahrenHeit)) {
         return false;
      } else {
         if ( fahrenHeit != "" || fahrenHeit != 0) {
            $("#celsius").val(Math.round((fahrenHeit - 32) * 5 / 9));
         } else {
            $("#celsius").val("");
         }
      }
   });

   $("#celsius").keyup(function () {
      var celSius = $(this).val();
      var regex = /^[0-9+\-*/().\s]*$/;
      if (!regex.test(celSius)) {
         return false;
      } else {
         if ( celSius != "" || celSius != 0) {
            $("#fahrenheit").val(Math.round(celSius * 9 / 5 + 32));
         } else {
            $("#fahrenheit").val("");
         }
      }
   });

   $(".speak-to-type-btn").on("click", function () {
      $(this).toggleClass("active");
      if ($(this).hasClass("active")) {
         $(this).next(".speak-to-type-note").html("Tap to <b>stop</b>");
      } else {
         $(this).next(".speak-to-type-note").html("Tap to continue");
      }
   });

   $('fieldset label input[type="checkbox"]').on("click", function () {
      var noneAbove = $(this).val();
      if(noneAbove == "none-of-the-above") {
         $(this).closest(".half-container").find(".grid-row, .hide").slideUp();
         $(this).closest(".half-container").find("input").val('');
         $(this).closest(".half-container").find("input[type='checkbox']").prop("checked", false);
         $(this).closest(".half-container").find("input[type='radio']").prop("checked", false);
         $(this).closest(".half-container").find("select").val('');
         $(this).prop("checked", true);
      } else {
         $(this).parent().next(".grid-row, .hide").slideToggle();
         $(this).parent().next(".grid-row, .hide").find("input").val('');
         $(this).parent().next(".grid-row, .hide").find("input[type='checkbox']").prop("checked", false);
         $(this).parent().next(".grid-row, .hide").find("input[type='radio']").prop("checked", false);
         $(this).parent().next(".grid-row, .hide").find("select").val('');
         // $(this).parent().next(".grid-row, .hide").find(".hide").removeAttr("style");
      }

   });

   $('.health-care-proxy-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".health-care-proxy-yes").is(":checked")) {
            $(".health-care-proxy-yes-container").slideDown();
         } else {
            $(".health-care-proxy-yes-container").slideUp();
         }
      }
   );

   $(".idnetify-all-living .idnetify-all-living-add-row").on("click",function (e) {
         e.stopPropagation();
         $(".idnetify-all-living").append(`
            <div class="grid-row">
               <div class="grid-item">
                  <label>Full Name <span>*</span></label>
                  <input type="text" class="w100" autocomplete="off">
               </div>
               <div class="grid-item">
                  <label>Phone <span>*</span></label>
                  <input type="text" class="w100 phone_no" placeholder="(___) ___-____" autocomplete="off">
               </div>
               <div class="grid-item">
                  <label>Relation <span>*</span></label>
                  <input type="text" class="w100" autocomplete="off">
                  <a class="btn-icon idnetify-all-living-del-row"><i class="far fa-times-circle"></i></a>
               </div>
            </div>  
         `);
      }
   );

   $("body").on("click",".idnetify-all-living .idnetify-all-living-del-row",function (e) {
         e.stopPropagation();
         $(this).closest(".grid-row").remove();
      }
   );

   $(".list-of-medicine .list-of-medicine-add-row").on("click",function (e) {
         e.stopPropagation();
         $(".list-of-medicine").append(`
            <div class="grid-row">
               <div class="grid-item">
                  <label>Medicine Name <span>*</span></label>
                  <input type="text" class="w100" autocomplete="off">
               </div>
               <div class="grid-item">
                  <label>Dose <span>*</span></label>
                  <input type="text" class="w100" autocomplete="off">
               </div>
               <div class="grid-item">
                  <label>Forms <span>*</span></label>
                  <input type="text" class="w100" autocomplete="off">
               </div>
               <div class="grid-item">
                  <label>Frequency <span>*</span></label>
                  <input type="text" class="w100" autocomplete="off">
                  <a class="btn-icon list-of-medicine-del-row"><i class="far fa-times-circle"></i></a>
               </div>
            </div>
         `);
      }
   );

   $("body").on("click",".list-of-medicine .list-of-medicine-del-row",function (e) {
         e.stopPropagation();
         $(this).closest(".grid-row").remove();
      }
   );

   $('.lives-alone-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".lives-alone-yes").is(":checked")) {
            $(".lives-alone-yes-container").slideDown();
         } else {
            $(".lives-alone-yes-container").slideUp();
         }
         if ($(".lives-alone-no").is(":checked")) {
            $(".lives-alone-no-container").slideDown();
         } else {
            $(".lives-alone-no-container").slideUp();
         }
      }
   );

   $('.type-of-residence-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".type-of-residence-appt").is(":checked")) {
            $(".type-of-residence-appt-container").slideDown();
         } else {
            $(".type-of-residence-appt-container").slideUp();
         }
         if ($(".type-of-residence-other").is(":checked")) {
            $(".type-of-residence-other-container").slideDown();
         } else {
            $(".type-of-residence-other-container").slideUp();
         }
      }
   );

   $('.home-safety-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".home-safety-yes").is(":checked")) {
            $(".home-safety-yes-container").slideDown();
         } else {
            $(".home-safety-yes-container").slideUp();
         }
      }
   );

   $('.ed-preparedness-planning-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".ed-preparedness-planning-yes").is(":checked")) {
            $(".ed-preparedness-planning-yes-container").slideDown();
         } else {
            $(".ed-preparedness-planning-yes-container").slideUp();
         }
      }
   );

   $('.fire-safety-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".fire-safety-yes").is(":checked")) {
            $(".fire-safety-yes-container").slideDown();
         } else {
            $(".fire-safety-yes-container").slideUp();
         }
      }
   );

   $('.teaching-provided-other-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".teaching-provided-other-yes").is(":checked")) {
            $(".teaching-provided-other-yes-container").slideDown();
         } else {
            $(".teaching-provided-other-yes-container").slideUp();
         }
      }
   );

   $('.patient-direct-hcw-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".patient-direct-hcw-no").is(":checked")) {
            $(".patient-direct-hcw-no-container").slideDown();
         } else {
            $(".patient-direct-hcw-no-container").slideUp();
         }
      }
   );

   $('.additional-mental-status-options .add-mental-status-option .btn-icon').on("click",function (e) {
         e.stopPropagation();
         let input_val = $('.additional-mental-status-options .add-mental-status-option input').val();
         let capitalizedValue = input_val.charAt(0).toUpperCase() + input_val.slice(1);
         $(".additional-mental-status-options .mental-status-options-container").append(`
            <label><input type="checkbox" checked name="additional-mental-status"> ${capitalizedValue} <a class="btn-icon del-mental-status-option"><i class="far fa-times-circle"></i></a></label>
         `);
         $('.additional-mental-status-options .add-mental-status-option input').val("");
      }
   );

   $("body").on("click",".additional-mental-status-options .del-mental-status-option",function (e) {
      e.stopPropagation();
      $(this).parent().remove();
   }
);



   $('.significant-weight-loss-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".significant-weight-loss-yes").is(":checked")) {
            $(".significant-weight-loss-yes-container").slideDown();
         } else {
            $(".significant-weight-loss-yes-container").slideUp();
         }
      }
   );

   $('.pop-assessment-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".pop-assessment-yes").is(":checked")) {
            $(".ppop-assessment-yes-container").slideDown();
            $(".ppop-assessment-no-container").slideUp();
         } else {
            $(".ppop-assessment-yes-container").slideUp();
            $(".ppop-assessment-no-container").slideDown();
         }
      }
   );  

   $('.other-agency-providing-services-yes-no-options input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         if ($(".other-agency-providing-services-yes").is(":checked")) {
            $(".other-agency-providing-services-yes-container").slideDown();
         } else {
            $(".other-agency-providing-services-yes-container").slideUp();
         }
      }
   );   

   $('.dnr-radios-container input[type="radio"]').on("click",function (e) {
         e.stopPropagation();
         let value = $(this).val();
         if (value == "Yes") {
            $('.dnr-radios-container input[type="text"]').removeAttr("disabled").focus();
         } else {
            $('.dnr-radios-container input[type="text"]').val("").attr("disabled","disabled");
         }
      }
   );

   /* Affidavits JS */

   let evvFormkey = sessionStorage.getItem("evvForm");
   let hippaFormkey = sessionStorage.getItem("hippaForm");
   let psaAffidavitkey = sessionStorage.getItem("psaAffidavit");
   let cfcAffidavitkey = sessionStorage.getItem("cfcAffidavit");
   let prightsAffidavitkey = sessionStorage.getItem("prightsAffidavit");
   let paresAffidavitkey = sessionStorage.getItem("paresAffidavit");
   let npspAffidavitkey = sessionStorage.getItem("npspAffidavit");
   let yryihiAffidavitkey = sessionStorage.getItem("yryihiAffidavit");

   if ( evvFormkey == "done") {
      $("#EVV_Acknowledge_Form").addClass("completed");
   }

   if ( hippaFormkey == "done") {
      $("#HIPPA_Release_Form").addClass("completed");
   }
   
   if ( psaAffidavitkey == "done") {
      $("#Patient_Service_Agreement").addClass("completed");
   }

   if ( cfcAffidavitkey == "done") {
      $("#Consent_for_Care").addClass("completed");
   }
   
   if ( prightsAffidavitkey == "done") {
      $("#Patient_Rights").addClass("completed");
   }

   if ( paresAffidavitkey == "done") {
      $("#Patient_Responsibilities").addClass("completed");
   }

   if ( npspAffidavitkey == "done") {
      $("#Privacy_Security_Practices").addClass("completed");
   }

   if ( yryihiAffidavitkey == "done") {
      $("#Identifiable_Health_Information").addClass("completed");
   }

});

//================================================================

$(".primary-caregiver .add-primary-caregiver").on("click", function (e) {
   e.stopPropagation();
   $(".primary-caregiver .caregive-list").append(`
      <div class="caregiver">
         <div class="grid-row grid-cols-4">
            <div class="grid-item">
               <label>Full Name <span>*</span></label>
               <input type="text" class="w100" autocomplete="off">
            </div>
            <div class="grid-item">
               <label>Phone <span>*</span></label>
               <input type="text" class="w100 phone_no" placeholder="(___) ___-____" autocomplete="off">
            </div>
            <div class="grid-item">
               <label>Alternate Phone</label>
               <input type="text" class="w100 phone_no" placeholder="(___) ___-____" autocomplete="off">
            </div>
            <div class="grid-item">
               <label>Email <span>*</span></label>
               <input type="text" class="w100" autocomplete="off">
            </div>
         </div>
         <div class="btn-row"><a class="btn-icon delete-caregiver"><i class="far fa-times-circle"></i></a></div>
      </div>`);
});

$("body").on("click",".primary-caregiver .caregive-list .caregiver .delete-caregiver",function (e) {
   e.stopPropagation();
   $(this).closest(".caregiver").remove();
}
);

$(".other-organizations-involved .add-other-organizations-involved").on("click", function (e) {
   e.stopPropagation();
   $(".other-organizations-involved .other-organizations-list").append(`
      <div class="other-organization">
         <div class="grid-row">
            <div class="grid-item">
               <label>Full Name <span>*</span></label>
               <input type="text" class="w100" autocomplete="off">
            </div>
            <div class="grid-item">
               <label>Type Of Work</label>
               <input type="text" class="w100" autocomplete="off">
            </div>
            <div class="grid-item">
               <label>Phone <span>*</span></label>
               <input type="text" class="w100 phone_no" placeholder="(___) ___-____" autocomplete="off">
            </div>
            <div class="grid-item">
               <label>Fax</label>
               <input type="text" class="w100 phone_no" placeholder="(___) ___-____" autocomplete="off">
            </div>
            <div class="grid-item">
               <label>Address</label>
               <input type="text" class="w100" autocomplete="off">
            </div>
         </div>
         <div class="btn-row"><a class="btn-icon delete-other-organization"><i class="far fa-times-circle"></i></a></div>
      </div>`);
});

$("body").on("click",".other-organizations-involved .other-organizations-list .other-organization .delete-other-organization",function (e) {
   e.stopPropagation();
   $(this).closest(".other-organization").remove();
}
);

$(".allergies .add-allergy").on("click", function (e) {
   e.stopPropagation();
   $(".allergies .allergy-list").append(`<div class="allergy-container">
      <div class="type">
         <label>Type</label>
         <select class="w100">
            <option selected="" disabled="">Select Type</option>
            <option>Food</option>
            <option>Medication</option>
            <option>Environmental</option>
         </select>
      </div>
      <div class="allergy">
         <label>Allergy</label>
         <select class="w100">
            <option selected="" disabled="">Select Allergy</option>
         </select>
      </div>
      <div class="description">
         <label>Description</label>
         <div class="speak-comment-container">
            <a class="anim mic-container" data-popup-open="speak-to-type" title="Click to speak"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="anim"><path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"></path></svg></a>
            <textarea autocomplete="off"></textarea>
         </div>
      </div>
      <div class="btn-row"><a class="btn-icon delete-allergy"><i class="far fa-times-circle"></i></a></div>
   </div>`);
});

$("body").on("click",".allergy-container .delete-allergy",function (e) {
      e.stopPropagation();
      $(this).closest(".allergy-container").remove();
   }
);

$(".lpm-via-options").change(function () {
   var $option = $(this).find("option:selected");
   var value = $option.val();
   if ( value == "Trach"){
      $(".trach-options").slideDown();
   } else {
      $(".trach-options").slideUp();
   }
});

$(".cb-value").on("click", function () {
   var mainParent = $(this).parent(".required-toggle-btn");
   if ($(mainParent).find("input.cb-value").is(":checked")) {
      $(mainParent).addClass("active");
   } else {
      $(mainParent).removeClass("active");
   }
});


$(".nra-score-options").change(function () {
   nraScoreCount();
});

function nraScoreCount() {
   var _totalScore = 0;
   $(".nra-score-options").each(function () {
      var get_textbox_value = $(this).val();
      if ($.isNumeric(get_textbox_value)) {
         _totalScore += parseFloat(get_textbox_value);
      }
   });
   $(".nra-totalScore").html(_totalScore);
};

$(".phq9-question-options").change(function () {
   var $option = $(this).find("option:selected");
   var value = $option.val();
   $(this).next(".score").val(value);
   scoreCount();
   $(this).closest(".phq9-table-grid").addClass("completed");
});

function scoreCount() {

   var _totalScore = 0;
   
   $(".phq9-questions-table .score").each(function () {
      var get_textbox_value = $(this).val();
      if ($.isNumeric(get_textbox_value)) {
         _totalScore += parseFloat(get_textbox_value);
      }
   });
   $(".totalScore").html(_totalScore);
};

var fallRiskAssessment_input_oldvalue;

$(".fallRiskAssessment_input").keypress(function(event) {
   if (event.keyCode == 46 || event.keyCode == 8)
      { return; }
   else {
      if (event.keyCode < 48 || event.keyCode > 57 ) {
         event.preventDefault();	
      }	
   }
   if(event.keyCode == 13){
      let active = document.activeElement;
      let target = $('[tabindex="' + (active.tabIndex + 1) + '"]');
      target.focus();
   }
});

$(".fallRiskAssessment_input").on("focusin", function (e) {
   e.preventDefault();
   let oldValue = $(this).val();
   if (oldValue != "0") {
      fallRiskAssessment_input_oldvalue = oldValue;
      console.log(fallRiskAssessment_input_oldvalue);
   } else if (oldValue == "") {
      console.log("no value");
      fallRiskAssessment_input_oldvalue = fallRiskAssessment_input_oldvalue - oldValue;
   } 
});

$(".fallRiskAssessment_input").on("focusout", function (e) {
   e.preventDefault();
   let val = $(this).val();
   let name = $(this).attr("name");
   if (val != ""){
      let total = $("."+name+"_Total").html();
      total = total - fallRiskAssessment_input_oldvalue;
      let newVal = fallRiskScoreCount(val, total);  
      $("."+name+"_Total").html(newVal);
   }
});

function fallRiskScoreCount(value, newtotal) {
   let number = Number(value);
   let total = Number(newtotal);
   let scoreCountTotal = number + total;
   console.log(scoreCountTotal);
   return scoreCountTotal;  
}

let previousAssesmentDate_previousValue = $('#previousAssesmentDate').val();

$('#previousAssesmentDate').on('change', function(event) {
   const selectedValue = $(this).val();

   Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to select "${selectedValue}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
   }).then((result) => {
      if (result.isConfirmed) {
      // User confirmed the change
      previousAssesmentDate_previousValue = selectedValue;
      } else {
      // User canceled the change, revert to previous value
      $(this).val(previousAssesmentDate_previousValue);
      }
   });
});

