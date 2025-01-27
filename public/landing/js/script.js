
// Email validation
function validateEmail(sEmail) {
	var sEmail = $.trim(sEmail);
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (filter.test(sEmail)) {
		return true;
  	}
	else {
    	return false;
  	}
}
// End

function remove_error(input_id) {
	$('#' + input_id).removeClass('error');
}

// Add 1 before USA phone number
$("#phone").keyup(function () {
	var firstLetter = $('#phone').val().charAt(0);
	var secondLetter = $('#phone').val().charAt(1);
	if (firstLetter == '(') {
		 if (firstLetter == '1' || secondLetter == '1') {
			  $('#phone').inputmask("9(999) 999-9999");
		 } else {
			  $('#phone').inputmask("(999) 999-9999");
		 }
	} else {
		 if (firstLetter == '1' || secondLetter == '1') {
			  $('#phone').inputmask("9(999) 999-9999");
		 } else if (firstLetter != '1') {
			  $('#phone').inputmask("(999) 999-9999");
		 }
	}
});


// Join Network
$("#schedule-demo-btn").on("click", function (e) {

	var company_name_val = $('#company_name').val();
	var full_name_val = $('#full_name').val();
	var phone_val = $('#phone').val();
	var email_val = $('#email').val();


	var company_name_val = $.trim(company_name_val);
	var full_name_val = $.trim(full_name_val);
	var phone_val = $.trim(phone_val);
	var email_val = $.trim(email_val);

	var companyNameLen = company_name_val.length;
	var fullNameLen = full_name_val.length;


  var phone_val_len = phone_val.length; //alert(input_val_len);

	if (phone_val_len == '15') {
		 var phone_val = phone_val.substr(1);
	}

	var inpVal = phone_val.replace(/["'\(\- )]/g, "");
	var regex = new RegExp(/^\(\d{3}\)\s?\d{3}-\d{4}$/);

	var flag = 1;

	// For all fields
	if (company_name_val == '' && full_name_val == '' && phone_val == '' && email_val == '')
	{
		 $('#company_name').addClass('error');
		 $('#full_name').addClass('error');
		 $('#phone').addClass('error');
		 $('#email').addClass('error');
		 var flag = 0;
		 return false;
	}

	// For Company Name
	if (company_name_val == '' || company_name_val != '' && companyNameLen <= 2) {
		 $('#company_name').addClass('error');
		 var flag = 0;
		 return false;
	}

	// For Full Name
	if (full_name_val == '' || full_name_val != '' && fullNameLen <= 2) {
		$('#full_name').addClass('error');
		var flag = 0;
		return false;
  }

	// For Phone number
	if (!phone_val.match(regex)) {
		 $('#phone').addClass('error');
		 var flag = 0;
		 return false;
	} else {
		 var cases = ['(000) 000-0000', '(111) 111-1111', '(222) 222-2222', '(333) 333-3333', '(444) 444-4444', '(555) 555-5555', '(666) 666-6666', '(777) 777-7777', '(888) 888-8888', '(999) 999-9999'];
		 if (jQuery.inArray(phone_val, cases) != -1) {
			  $('#phone').addClass('error');
			  var flag = 0;
			  return false;
		 }
	}

	// For Email Id
	if ($.trim(email_val).length == 0) {
		// Please enter valid email address
		e.preventDefault();
		$('#email').addClass('error');
		var flag = 0;
		return false;
  }
  if (validateEmail(email_val)) {
		// Email is valid
		var flag = 1;
  } else {
		// Invalid Email Address
		e.preventDefault();
		$('#email').addClass('error');
		var flag = 0;
		return false;
  }

	// Success Form
	if (flag == 1)
	{
		var bestTime_val = $.trim($('#bestTime').val());
		$.ajax({
	        headers: {
	            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        },
	        url: baseUrl + "/landind/schedule-demo",
	        method: 'POST',
	        data: {
	            company_name: company_name_val,
	            full_name:full_name_val,
	            phone:phone_val,
	            email:email_val,
	            besttime:bestTime_val
	        },
	        success: function (response) {
	        	if( response.success ){
	        		$('#company_name').val( '' );
					$('#full_name').val( '' );
					$('#phone').val( '' );
					$('#email').val( '' );
					$('#bestTime').val( '' );

	    			$('.schedule-demo-form').hide();
					$('.thank-you').show();
					setTimeout(function() {
						location.reload();
					}, 2000);
	        	}
	           //window.location = '/caregiver';
	        },
	        error: function (error) {

	        }
	    });

	}


});



$(document).ready(function () {

	// var url = $(location).attr('href');
	// var parts = url.split("/");
	// var last_part = parts[parts.length-1];
	
	// if(last_part === "demo") {
	// 	alert(last_part);
	// }

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

   /* Vertical Navigation Scroll Effect */

   var contentSection = $(".content-section");
   var navigation = $(".navigation");

   //when a nav link is clicked, smooth scroll to the section
   navigation.on("click", "a", function (event) {
      event.preventDefault(); //prevents previous event
      smoothScroll($(this.hash));
   });

   //update navigation on scroll...
   $(window).on("scroll", function () {
      updateNavigation();
   });
   //...and when the page starts
   updateNavigation();

   /////FUNCTIONS
   function updateNavigation() {
      contentSection.each(function () {
         var sectionName = $(this).attr("id");
         var navigationMatch = $('.navigation a[href="#' + sectionName + '"]');
         if (
            $(this).offset().top - $(window).height() / 7 <
               $(window).scrollTop() &&
            $(this).offset().top + $(this).height() - $(window).height() / 7 >
               $(window).scrollTop()
         ) {
            navigationMatch.addClass("active-section");
         } else {
            navigationMatch.removeClass("active-section");
         }
      });
   }
   function smoothScroll(target) {
      let position = target.offset().top;
      $("body,html").animate(
         {
            scrollTop: position,
         },
         1000
      );
   }

   $("#testimonials-carousel").owlCarousel({
      loop: true,
      margin: 30,
      dots: true,
      items: 1,
      // nav: true,
      // navText: ["≪" , "≫"]
   });

	$("#ourClients-carousel").owlCarousel({
      loop: true,
      margin: 30,
      dots: true,
      items: 3,
		autoplay:true,
    	autoplayTimeout:2500,
    	autoplayHoverPause:true,
		autoplaySpeed: 1500,
		dots: false,
		mouseDrag: false,
		responsive:{
			0:{
				 items:1
			},
			700:{
				 items:2,
			},
			1000:{
				 items:3,
			}
	  }
   });

	var dt = new Date();
	document.getElementById("year").innerHTML = dt.getFullYear();
	
});
