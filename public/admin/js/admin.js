// Email validation
function validateEmail(sEmail) {
   var sEmail = $.trim(sEmail);
   var filter =
      /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
   if (filter.test(sEmail)) {
      return true;
   } else {
      return false;
   }
}

//Show/Hide pfi
function checkPf(pfi) {
   var sEmail = pfi.value;
   if(sEmail == "LTHHCP") {
       $(".pfifield").show();
   }else {
       $(".pfifield").hide();
   }
}

// End
// $(".collapsible-content-container > li > a").on("click", function () {
//       $(this).toggleClass("open");
//       $(this).next(".collapsible-content").slideToggle();
//    });
$(document).on("click", function () {
   $(".dashboard-container .header .setting ul").slideUp();
});

$("body").on('keypress', '.phone_format', function (event) {
   if($(this).val() == 1) {
      $(this).val('');
   }else {
      if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
            event.preventDefault();
      }
      $(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d+)$/, "($1) $2-$3"));
   }
});

$(document).ready(function () {

   $("#current_year").html(new Date().getFullYear());

   $("#login-submit-button").on("click", function (e) {
      e.preventDefault();
      var user = $("#login-user-input").val();
      var password = $("#login-user-password").val();

      var flag = 1;

      if (user == "" && password == "") {
         $("#login-user-input, #login-user-password").addClass("error");
         flag = 0;
         return false;
      }

      if (user == "") {
         $("#login-user-input").addClass("error");
         flag = 0;
         return false;
      }

      if (password == "") {
         $("#login-user-input").addClass("error");
         flag = 0;
         return false;
      }

      if (flag == 1) {
         alert("Success");
      }
   });

   $(".sidebar-toggle-btn").on("click", function () {
      $(this).toggleClass("close");
      $(".sideBar").toggleClass("hide");
      $(".dashboard-container, .dashboard-container .header").toggleClass("full-width");
   });

   $(".navigation li a.submenu").on("click", function () {
      if($(this).hasClass("open")){
         $(this).removeClass("open");
         $(this).next("ul").slideUp();
      } else {
         $(".navigation li a.submenu, .navigation li a.innermenu").removeClass("open");
         $(".navigation li ul").slideUp();
         $(this).addClass("open");
         $(this).next("ul").slideDown();
      }
   });

   $(".navigation li a.innermenu").on("click", function () {
      $(this).toggleClass("open");
      $(this).siblings('ul').slideToggle();
   });

   $(".collapsible-content-container > li > a").on("click", function () {

      if($(this).hasClass("open")) {
         $(this).removeClass("open");
         $(this).next(".collapsible-content").slideUp();
      } else {
         $(".collapsible-content-container > li > a").removeClass("open");
         $(".collapsible-content-container .collapsible-content").slideUp();
         $(this).addClass("open");
         $(this).next(".collapsible-content").slideToggle();
      }
      if($(this).hasClass("open") && $(this).hasClass('collaps1')) {
         masters("master_eye_color", "Eye Color");
         masters("master_hair_color", "Hair Color");
         masters("master_allergic", "Allergic");
         masters("master_educations", "Educations");
         masters("master_gender", "Gender");
         masters("master_para_certificates", "Certificate type");
         masters("master_personal_titles", "Person Title");
         masters("master_country", "Country");
         masters("master_relationship", "Reference Relationship");
         masters("master_emergency_relationship", "Emergency Relationship");
         masters("master_working_area", "Work Area");
         masters("master_working_certification", "Work Certifications");
         masters("master_working_days", "Work Days");
         masters("master_working_hours", "Work Hours");
         masters("master_working_transportation", "Work Transportation");
         masters("master_primary_language", "Primary Language");
         masters("master_spoken_language", "Spoken Language");
         masters("master_marrital_status", "Marital Status");
         masters("master_reason_for_leaving", "Reason For Job Change");
         masters("master_compliance_type","QA & Compliance");
         masters("master_ethnicity","Ethnicity");
         masters("master_application_note_type","Note Type");
         masters("master_federal_filing","Fedaral Filing");
         masters("master_state_filing","State Filinge");
         masters("master_affidavits", "Affidavit");
         masters("master_skill_categories", "Applicant Category");
         masters("master_skill_sub_categories", "Applicant SubCategory");
         masters("master_check_options", "Check Options");
	 masters("master_payment_type", "Payment Type");


      }

      // TODO: Remove code because this compliance module we dont want
      // if($(this).hasClass("open") && $(this).hasClass('collaps2')) {
      //    masters("compliances","QA & Compliance");
      // }
      if($(this).hasClass("open") && $(this).hasClass('collaps3')) {
         masters("user_documents","","5");
      }
      if($(this).hasClass("open") && $(this).hasClass('collaps4')) {
         masters("company_payrol_wage_infos");
      }

      if($(this).hasClass("open") && $(this).hasClass('collaps5')) {
         masters("static_user_documents","","2");
      }

      if($(this).hasClass("open") && $(this).hasClass('collaps6')) {
         masters("master_document","","2");
      }
   });

   $(".dashboard-container .header .setting a").on("click", function (e) {
      e.stopPropagation();
      $(this).next("ul").slideToggle();
   });

   $("[data-popup-open]").on("click", function (e) {
      var targeted_popup_class = jQuery(this).attr("data-popup-open");
      $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
      e.preventDefault();
   });
   $("[data-popup-close]").on("click", function (e) {
      var targeted_popup_class = jQuery(this).attr("data-popup-close");
      $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
      $(".afiidavitchk").prop("checked","");
      e.preventDefault();
   });

   var d = new Date();
   var year = d.getFullYear();
   $(".date").datepicker({
      dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
      numberOfMonths: 1,
      changeYear: true,
      changeMonth: true,
      yearRange: "1910:" + year,
      dateFormat: "mm/dd/yy",
      maxDate: 0,
      onSelect: function (dateText, inst) {
         $("#patient_dob").removeClass('error');
         $("#patient_dob-error").css({"display" : "none"});
      },
   });

   $(".dataTable-filters-btn").on("click", function (e) {
      e.stopPropagation();
      $(".dataTable-filters-container").slideToggle();
   });

   $(".error-message-close").on("click", function () {
      $(".error-message").fadeOut();
   });

   $(".success-message-close").on("click", function () {
      $(".success-message").fadeOut();
   });

   $(".warning-message-close").on("click", function () {
      $(".warning-message").fadeOut();
   });

   $(".eye-btn").on("click", function () {
      $(this).toggleClass("closeed");
   });

   $(document).on("click", '.cb-value', function () {
      var mainParent = $(this).parent('.required-toggle-btn');
      var showHideVal = '';
      var showHideLabel = '';

      if($(mainParent).find('input.cb-value').is(':checked')) {
         
         if ($(this).val() === 'select_all') {
            var targeted_category = $(this).attr("data-category");
            $('.' + targeted_category + ' .required-toggle-btn').addClass('active');
            $('.' + targeted_category + ' .required-toggle-btn').find('.cb-value').attr('checked', true);
         }  else if ($(this).val() === 'showHideTab' || $(this).val() === 'requiredRadio') {
            var showHideVal = '1';
            var showHideLabel = 'mandate';
         }

         if($(this).attr('data-value') === 'disclaimer') {
            $(".disclaimer-div").show();
         }

         if($(this).attr('data-value') === 'quetion_popup') {
            $(".quetion-div").show();
         }

         if($(this).attr('data-value') === 'correct_option') {
            var input_type = $(this).parents('#question-container').find('.input_type').val();
            
            if (input_type === 'radio') {
               $('.answer_option_table .required-toggle-btn').removeClass('active');
               $('.answer_option_table .required-toggle-btn').find('.cb-value').attr('checked', false);
               $('.answer_option_table .required-toggle-btn').find('.cb-value').val('');
            }           

            var answerOptions = $(this).parents('tr').find('.answerOptions').val();         
            $(mainParent).find('input.cb-value').val(answerOptions);
         }

         $(mainParent).addClass('active');
      } else {
         if ($(this).val() === 'select_all') {
            var targeted_category = $(this).attr("data-category");
            $('.' + targeted_category + ' .required-toggle-btn').removeClass('active');
            $('.' + targeted_category + ' .required-toggle-btn').find('.cb-value').attr('checked', false);

            if (targeted_category === 'section1') {
               $('.' + targeted_category + ' .disabled').addClass('active');
               $('.' + targeted_category + ' .disabled').find('.cb-value').attr('checked', true);
            }
         }  else if ($(this).val() === 'showHideTab' || $(this).val() === 'requiredRadio') {
            var showHideVal = '0';
            var showHideLabel = 'non mandate';
         }

         if($(this).attr('data-value') === 'disclaimer') {
            $(".disclaimer-div").hide();
         }

         if($(this).attr('data-value') === 'quetion_popup') {
            $(".quetion-div").hide();
         }

         if($(this).attr('data-value') === 'correct_option') {
            $(mainParent).find('input.cb-value').val('');
         }

         $(mainParent).removeClass('active');
         $(this).removeAttr('checked');
      }

      if ($(this).val() === 'requiredRadio') {
        
         var t = $(this);
         var url = t.attr('data-url');
         var action = t.attr('data-action');
         var questionId = t.attr('data-id');
         
         if (confirm("Are you sure, you want to " + showHideLabel + " the question")) {
            $(".loader").show();
            $.ajax({
               type: 'POST',
               url: url,
               headers: {
                     'X_CSRF_TOKEN':'{{ csrf_token() }}',
               },
               data: {
                  action: action,
                  is_required_field: showHideVal,
                  id:questionId
               },
               success: function (data) {
                  masters("master_questions", data.data.skill_assessment_id);
                  $(".loader").hide();
                  $(".success-message").show();
                  $(".success-message").html(data.message);
               }
            });
         }

         return false;
      }
   });

   /* Vertical Navigation Scroll Effect */
   var contentSection = $('.content-section');
	var navigation = $('.vertical-tabs');

	//when a nav link is clicked, smooth scroll to the section
	navigation.on('click', 'a', function(event){
		event.preventDefault(); //prevents previous event
		smoothScroll($(this.hash));
	});

	//update navigation on scroll...
	$(window).on('scroll', function(){
		updateNavigation();
	})
	//...and when the page starts
	updateNavigation();

	/////FUNCTIONS
	function updateNavigation(){
		contentSection.each(function(){
			var sectionName = $(this).attr('id');
			var navigationMatch = $('.vertical-tabs a[href="#' + sectionName + '"]');
			if( ($(this).offset().top - $(window).height()/3 < $(window).scrollTop()) &&
				  ($(this).offset().top + $(this).height() - $(window).height()/3 > $(window).scrollTop()))
				{
					navigationMatch.addClass('active-section');
				}
			else {
				navigationMatch.removeClass('active-section');
			}
		});
	}
	function smoothScroll(target){
      let position = target.offset().top - 90;
		$('body,html').animate({
			scrollTop: position
		}, 800);
	}

   // $( ".dashboard .box-sortable").sortable({
   //    connectWith: ".box-sortable",
   //    stack: '.section-box',
   //    cursor: "move"
   // }).disableSelection();

   $(".dashboard .box-sortable").droppable({
      activeClass: 'box-sortable-active',
      hoverClass: 'box-sortable-hover',
      /*drop :function(){
         alert("I am dropped-1");
      },*/
      //update: function( ) {
        // do stuff
    //}
   });

   $('.reminder-respond-btn').on("click", function (e) {
      e.preventDefault();
      $(this).hide();
      $('.reminder-reply-note-input, .reminder-submit').show();
   });


   $(".api-imports input[type='radio']").on("click", function (e) {
      e.stopPropagation();
      if ($("#API_imports_weekly").is(":checked")) {
         $(".API_imports_weekly_Days").show();
      } else {
         $(".API_imports_weekly_Days").hide();
      }
      if ($("#API_imports_monthly").is(":checked")) {
         $(".API_imports_monthly_months").show();
      } else {
         $(".API_imports_monthly_months").hide();
      }
   });

   $("#getPatients").change(function() {
      $('#getPatientsList').toggle(this.checked);
   });

   $("#getCaregivers").change(function() {
      $('#getCaregiversList').toggle(this.checked);
   });
    $("#getOtherUsers").change(function() {
      $('#getOtherUsersList').toggle(this.checked);
   });
   $('.pdf-preview-popup-open').on("click", function () {
      // $('.pdf-preview-popup-container').fadeIn();
      $('.timesheet-file-popup').fadeIn();

   });

   $('.pdf-preview-popup-close').on("click", function () {
      $('.pdf-preview-popup-container').fadeOut();
   });
});
