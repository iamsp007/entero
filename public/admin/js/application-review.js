$(document).on("click", function () {
   $(".applicant-header .setting ul").slideUp();
});

$(document).ready(function () {

   $( ".draggable-popup" ).draggable();

   $(".applicant-header .setting a").on("click", function (e) {
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
      e.preventDefault();
   });

   $("[data-popup-minimize]").on("click", function (e) {
      e.preventDefault();
      $(this).find(".fas").toggleClass('fa-plus-square fa-minus-square');
      var targeted_popup_class = jQuery(this).attr("data-popup-minimize");
      $('[data-popup="' + targeted_popup_class + '"]').toggleClass("minimize-popup");
   });

   $(".applicant-details-tabs .tab").on("click", function (e) {
      e.stopPropagation();
      $(".applicant-details-tabs .tab").removeClass("active");
      $(this).addClass("active");
      var targeted_tab_content = $(this).attr("tab-content-name");

      $(".applicant-details-tab-content .tab-content").removeClass("current");
      $('[tab-content="' + targeted_tab_content + '"]').addClass("current");
   });

   $(".vertical-left-tabs-container li").on("click", function (e) {
      e.stopPropagation();
      var tabCategory = $(this).parent().attr("tab-category");
      $( '.' + tabCategory + ' .vertical-left-tabs-container li').removeClass("active");
      $(this).addClass("active");
      var targeted_tab_content = $(this).attr("tab-content-name");
      $('.' + tabCategory + ' .vertical-right-content-container .vertical-right-tab-content').removeClass("current");
      $('[tab-content="' + targeted_tab_content + '"]').addClass("current");
   });

   $(".hozizontal-tabs-btns-container li").on("click", function (e) {
      e.stopPropagation();
      var tabCategory = $(this).parent().attr("tab-category");

      var phone = $(this).attr('data-phone');
      $(".phone_number_value").val(phone);

      $( '.' + tabCategory + ' .hozizontal-tabs-btns-container li').removeClass("active");
      $(this).addClass("active");
      var targeted_tab_content = $(this).attr("tab-content-name");
      $('.' + tabCategory + ' .hozizontal-tabs-content-container .hozizontal-tab-content').removeClass("current");
      $('[tab-content="' + targeted_tab_content + '"]').addClass("current");

      var url = $(this).attr('data-url');
      var action = 'message-read';

      $.ajax({
         url : url,
         type: 'GET',
         headers: {
             'X_CSRF_TOKEN':'{{ csrf_token() }}',
         },
         data: {
            phone: phone,
            action: action
         },
         success:function(data, textStatus, jqXHR){
            $(".all-notes-main-container1").html(data);
            $(".all-notes-main-container1").fadeIn();
            setTimeout(function(){
               $(".all-notes-container1").addClass("open");
            },10);

         },
         error: function(jqXHR, textStatus, errorThrown){
            //  alertText("Server Timeout! Please try again",'error');
            //  clearloader();
         }
      });
   });

   $(".edit-category").on("click", function (e) {
      e.stopPropagation();
      $(this).fadeOut();
      $(this).parent().find(".update-cancel-btn-container").fadeIn();
      var targeted_category = $(this).attr("data-category");
      $('.' + targeted_category + ' input, ' + '.' + targeted_category + ' select,' + '.' + targeted_category + ' textarea').removeClass("disabled-field");
      $('.' + targeted_category + ' input, ' + '.' + targeted_category + ' select,' + '.' + targeted_category + ' textarea').removeAttr("disabled");
      $('.' + targeted_category + ' .required-field').css("opacity", "1");
      $('.' + targeted_category + ' .edit-field').css("display", "inline-block");
      $('.' + targeted_category + ' .edit-profile-btns').css("display", "block");
      $('.' + targeted_category + ' .edit-profile-btns').addClass('is_updated_mode');
      // $('.' + targeted_category + ' .edit-profile-btns').css("display", "block");

      $(document).find('.' + targeted_category + ' input').each(function( i, x ){
         var placeholderVal = $(this).attr("data-placeholder");
         $(this).attr("placeholder", placeholderVal);
      });

$('.ssnshow-container').css({"display" : "block"});
      $('.ssn-container').css({"display" : "none"});
   });

   $(".cancel-edit-category").on("click", function (e) {
      e.stopPropagation();
     $(".edit-category").fadeIn();
      //$(this).parent(".edit-category").fadeIn();
      //$(this).parent(".update-cancel-btn-container").fadeOut();
      $(".update-cancel-btn-container").fadeOut();
      var targeted_category = $(this).attr("data-category");
       $('.' + targeted_category + ' input, ' + '.' + targeted_category + ' select,' + '.' + targeted_category + ' textarea').addClass("disabled-field");
      $('.' + targeted_category + ' input, ' + '.' + targeted_category + ' select,' + '.' + targeted_category + ' textarea').attr('disabled', true);
      $('.' + targeted_category + ' .required-field').css("opacity", "0");
      $('.' + targeted_category + ' .edit-field').css("display", "none");
      $('.' + targeted_category + ' .edit-profile-btns').css("display", "none");
      $('.' + targeted_category + ' .error').css("display", "none");
      // $('.' + targeted_category + ' .edit-profile-btns').css("display", "none");
   });

   // $('.auto-search-input').keypress(function () {
   //    var container = $('.auto-search-input').attr('data-container');
   //    $('.' + container + ' .auto-search-result').fadeIn();
   // });

   // $(".auto-search-result ul li").on("click", function () {
   //    var parent = $(this).parent().parent().parent().attr('data-container');
   //    $('.' + parent + ' .auto-search-result').fadeOut();
   //    // var selectedValue = $(this).html();
   //    // $('.' + parent).find("input").val(selectedValue);
   // });

   $(".date").datepicker({
      dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
      numberOfMonths: 1,
      changeYear: true,
      changeMonth: true,
      dateFormat: "mm/dd/yy",
      onSelect: function (dateText, inst) {},
   });

  $(".future_date").datepicker({
        dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
        numberOfMonths: 1,
        changeYear: true,
        changeMonth: true,
        dateFormat: "mm/dd/yy",
        minDate: 0,
        onSelect: function (dateText, inst) {},
    });

   $('.tb-test-select').on("change", function () {
      var $option = $(this).find('option:selected');
      var text = $option.text();

      if( text == "PPD") {
         $(".tb-test-quantiferon").slideUp();
         $(".tb-test-ppd").slideDown();
         $("#created_ppd_doc").show();
         $("#created_quantiferon_doc").hide();
      }
      if( text == "Quantiferon") {
         $(".tb-test-ppd").slideUp();
         $(".tb-test-quantiferon").slideDown();
         $("#created_ppd_doc").hide();
         $("#created_quantiferon_doc").show();
      }
  });

   $(".hiring-date").datepicker({
      dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
      numberOfMonths: 1,
      changeYear: true,
      changeMonth: true,
      dateFormat: "mm/dd/yy",
      onSelect: function (dateText, inst) {
         $("#orientationTab").css("display","inline-block");
      },
   });

   $(".orientation-date").datepicker({
      dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
      numberOfMonths: 1,
      changeYear: true,
      changeMonth: true,
      dateFormat: "mm/dd/yy",
      onSelect: function (dateText, inst) {
         $("#orientationTab").trigger( "click" );
         $(".orientationDateSelected").text(dateText);
      },
   });

   $(".hiringStatusRadio input[type='radio']").on("click", function (e) {
      e.stopPropagation();

      $("#orientationTab").hide();
      $(".hiringStatusHireOptions").hide();
      $(".hiringStatusHoldOptions").hide();
      $(".hiringStatusRejectOptions").hide();
      $(".call-sms-popup").hide();

      if ($(".hiringStatusRadioHire").is(":checked")) {
         $(".hiringStatusHireOptions").show();
         $(".hiringStatusRejectReason").val("");
      }

      if ($(".hiringStatusRadioHold").is(":checked")) {
         $(".hiringStatusHoldOptions").show();
         $(".hiring-date").val("");
         $(".orientation-date").val("");
         $(".hiringStatusRejectReason").val("");
      }

      if ($(".hiringStatusRadioReject").is(":checked")) {
         $(".hiringStatusRejectOptions").show();
         $(".hiring-date").val("");
         $(".orientation-date").val("");
      }

      if ($(".hiringStatusRadioIncomplete").is(":checked")) {
         $(".call-sms-popup").show();
         $(".hiring-date").val("");
         $(".orientation-date").val("");
         $(".hiringStatusRejectReason").val("");
      }
   });

   $(".preEmploymentPhysicalverified input[type='checkbox']").on("click", function (e) {
      if ($(this).is(":checked")) {
         $(".annualPhysicalDate").slideDown();
      } else {
         $(".annualPhysicalDate").slideUp();
      }
   });

   $(".tb-test-options input[type='radio']").on("click", function (e) {
      e.stopPropagation();
      if ($(".ppdTestPositive").is(":checked")) {
         $(".ppd-positive").slideDown();
      } else {
         $(".ppd-positive").slideUp();
      }
      if ($(".quantiferonTestPositive").is(":checked")) {
         $(".quantiferon-positive").slideDown();
      } else {
         $(".quantiferon-positive").slideUp();
      }
   });

   $(".rubella-btn input[type='checkbox']").on("click", function (e) {
      if ($(this).is(":checked")) {
         $(".rubella-option").slideDown();
      } else {
         $(".rubella-option").slideUp();
      }
   });

   $(".rubeola-btn input[type='checkbox']").on("click", function (e) {
      if ($(this).is(":checked")) {
         $(".rubeola-option").slideDown();
      } else {
         $(".rubeola-option").slideUp();
      }
   });

   /* applicant review page js  */
   // $('body').on('keyup','.applicant-search-box input', function () {
   //    var url = $('.applicant-search-box').attr('data-url');
   //    var postData = {
   //       'keywords' : $(this).val(),
   //    };

   //    var responseData = ajaxCall( url, postData );
   //    var liHtml = '';
   //    if (Array.isArray(responseData) && responseData.length) {

   //       $.each(responseData, function( index, value ) {
   //          liHtml += `<li data-id="`+value.id+`"  >`+value.text+`</li>`;
   //       });
   //    }else{
   //       liHtml = `<li></li>`;
   //    }
   //    $('.auto-search-result ul').html( liHtml );
   //    $('.applicant-search-box .auto-search-result').fadeIn();
   // });

   // $('body').on('click','.auto-search-result ul li', function () {
   //    var applicant_id = $(this).attr('data-id');

   //    $('.applicant-search-box input').val( $(this).html() );
   //    $('.applicant-search-box .auto-search-result').fadeOut();
   //    setTimeout(function(){
   //       window.location.href = base_url+'/application-review/'+applicant_id;
   //    },3000);
   // });

   $(".all-notes-open-btn").draggable({
      axis: "y"
   });

   $(".reply-section-toggle").on("click", function (e) {
      e.stopPropagation();
      $(this).toggleClass("down");
      $(this).parents(".comment").next("ul").slideToggle();
   });

   $(".all-notes-open-btn").on("click", function (e) {
      e.stopPropagation();
      $(".all-notes-main-container2").fadeIn();
      setTimeout(function(){
         $(".all-notes-container").addClass("open");
      },10);
   });

   $(document).on('click', '.all-notes-open-btn1',function (e) {
      e.stopPropagation();
      var user_id = $(this).attr('data-user-id');
      var url = $(this).attr('data-url');

      $.ajax({
         url : url,
         type: 'GET',
         headers: {
             'X_CSRF_TOKEN':'{{ csrf_token() }}',
         },
         data: {
            user_id: user_id,
         },
         success:function(data, textStatus, jqXHR){
             $(".all-notes-main-container1").html(data);
             $(".all-notes-main-container1").fadeIn();
             setTimeout(function(){
               $(".all-notes-container").addClass("open");
            },10);

         },
         error: function(jqXHR, textStatus, errorThrown){
            //  alertText("Server Timeout! Please try again",'error');
            //  clearloader();
         }
     });
   });

   $(document).on('click', '.all-notes-close-btn',function (e) {
      e.stopPropagation();
      $(".all-notes-container").removeClass("open");
      setTimeout(function(){
         $(".all-notes-main-container").fadeOut();
      },400);
   });

   $(document).on('click', '.add-note-btn',function (e) {
      e.stopPropagation();
      $(".add-note-form-container").slideToggle("slow");
   });

   $(".add-comment-input a").on("click", function (e) {
      e.stopPropagation();
      let value = $(this).prev("input").val();
      $(".comments-row").append(`
         <li>
            <div class="comment"><div class="user">M<span class="user-name">Mehul Rathod</span></div><p>${value} <em>09/02/2023 11:00 am</em></p></div>
            <ul>
               <li>
                  <div class="reply-container"></div>
                  <a class="reply-btn">Reply</a>
                  <div class="reply-input">
                     <div>
                        <input type="text" placeholder="Reply">
                        <a class="reply-input-btn"><i class="fas fa-arrow-circle-right"></i></a>
                     </div>
                  </div>

               </li>
            </ul>
         </li>
      `);
      $(this).prev("input").val("");
   });

   $('body').on('click','.reply-btn', function(e){
      e.stopPropagation();
      $(this).hide();
      $(this).next(".reply-input").show();
   });

   $('body').on('click','.reply-input-btn', function(e){
      e.stopPropagation();
      let value = $(this).prev("input").val();
      // $(this).parent().hide();
      let user = "S";
      $(".reply-container").append(`<div class="comment"><div class="user">${user}<span class="user-name">Shashikant Parmar</span></div><p>${value}<em>09/02/2023 11:00 am</em></p></div>`).show();
      $(this).prev("input").val("");
   });

   $('body').on('keyup','.search-box input', function () {
      $('.search-box .search-result').fadeIn();
   });

   $('body').on('click','.search-result ul li', function () {
      $('.search-box .search-result').fadeOut();
   });

});

function ajaxCall( url , postData ){
   var responseData;
   $.ajax({
       type: 'POST',
       url: url,
       headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
       data: postData,
       async: false,
       success: function (res) {
         responseData = JSON.parse( res );
      },
       error: function () {
           alertText("Server Timeout! Please try again");
           //clearloader();
       }
   });
   return responseData;
}
function alertText(text, status) {
    if (status === 'success') {
        $(".success-message").show();
        $(".success-html").html(text);
    } else {
        $(".error-message").show();
        $(".error-html").html(text);
    }
}