$(document).on("click", function () {
   $(".applicant-header .setting ul").slideUp();
});

$(document).ready(function () {

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
      var thisattribute = $(this);

      $.ajax({
         url : url,
         type: 'POST',
         headers: {
             'X_CSRF_TOKEN':'{{ csrf_token() }}',
         },
         data: {
            phone: phone,
            action: action
         },
         success:function(data, textStatus, jqXHR){
            // $(".all-notes-main-container1").html(data);
            // $(".all-notes-main-container1").fadeIn();
            // setTimeout(function(){
            //    $(".all-notes-container1").addClass("open");
            // },10);
            thisattribute.find(".notifications_badge_top").text(0);
         },
         error: function(jqXHR, textStatus, errorThrown){
            //  alertText("Server Timeout! Please try again",'error');
            //  clearloader();
         }
     });
   });

   $(".edit-category").on("click", function (e) {
      e.stopPropagation();
      $(this).parent().find(".update-cancel-btn-container").fadeIn();
      $(".introduction_btn").fadeIn();
      var targeted_category = $(this).attr("data-category");
      $('.' + targeted_category + ' input, ' + '.' + targeted_category + ' select,' + '.' + targeted_category + ' textarea').removeClass("disabled-field");
      $('.' + targeted_category + ' input, ' + '.' + targeted_category + ' select,' + '.' + targeted_category + ' textarea').removeAttr("disabled");
      $('.' + targeted_category + ' .required-field').css("opacity", "1");
      $('.' + targeted_category + ' .edit-field').css("display", "inline-block");
      $('.' + targeted_category + ' .edit-profile-btns').css("display", "block");
      $('.' + targeted_category + ' .edit-profile-btns').addClass('is_updated_mode');

      $(document).find('.' + targeted_category + ' input').each(function( i, x ){
         var placeholderVal = $(this).attr("data-placeholder");
         $(this).attr("placeholder", placeholderVal);
      });
   });

   $(".cancel-edit-category").on("click", function (e) {
      e.stopPropagation();
      $(this).parent(".update-cancel-btn-container").fadeOut();
      $(".update-cancel-btn-container").fadeOut();
      
      var targeted_category = $(this).attr("data-category");
      $('.' + targeted_category + ' input, ' + '.' + targeted_category + ' select,' + '.' + targeted_category + ' textarea').addClass("disabled-field");
      $('.' + targeted_category + ' input, ' + '.' + targeted_category + ' select,' + '.' + targeted_category + ' textarea').attr('disabled', true);
      $('.' + targeted_category + ' .required-field').css("opacity", "0");
      $('.' + targeted_category + ' .edit-field').css("display", "none");
      $('.' + targeted_category + ' .edit-profile-btns').css("display", "none");
   });

   $(document).on("click", ".introduction-call input[type='radio']", function (e) {
      e.stopPropagation();
      if ($(".introductionCallWithOther").is(":checked")) {
         $(".iCWOtherSpecify").show();
      } else {
         $(".iCWOtherSpecify").hide();
      }
   });

   $(document).on("click", ".health-care-proxy input[type='radio']", function (e) {
      e.stopPropagation();
      if ($(".healthCareProxyYes").is(":checked")) {
         $(".health-care-proxy-fields").slideDown();
      } else {
         $(".health-care-proxy-fields").slideUp();
      }
   });

   $('body').on('click', ".insurance input[type='radio']", function (e) {
      e.stopPropagation();
      if ($(".insuranceLongTerm").is(":checked")) {
         $(".insuranceLongTermOptions").show();
      } else {
         $(".insuranceLongTermOptions").hide();
      }
      if ($(".insuranceShortTerm").is(":checked")) {
         $(".insuranceShortTermOptions").show();
      } else {
         $(".insuranceShortTermOptions").hide();
      }
   });

   $("#longTermInsurancePopup .close").on("click", function (e) {
      e.stopPropagation();
      $("#longTermInsurancePopup").fadeOut();
   });

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
         $(".all-notes-container2").addClass("open");
      },10);
   });

   $(document).on('click', '.all-notes-open-btn1',function (e) {
      e.stopPropagation();
      var user_id = $(this).attr('data-user-id');
      var type = $(this).attr('data-type');
      var url = $(this).attr('data-url');

      $.ajax({
         url : url,
         type: 'GET',
         headers: {
             'X_CSRF_TOKEN':'{{ csrf_token() }}',
         },
         data: {
            user_id: user_id,
            type: type
         },
         success:function(data, textStatus, jqXHR){
            // Livewire.load('/comment?user_id=' + user_id + '&notes_id=', 'all-notes-main-container1');
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

   // $(".add-comment-input a").on("click", function (e) {
   //    e.stopPropagation();
   //    let value = $(this).prev("input").val();
      // $(".comments-row").append(`
      //    <li>
      //       <div class="comment"><div class="user">M<span class="user-name">Mehul Rathod</span></div><p>${value} <em>09/02/2023 11:00 am</em></p></div>
      //       <ul>
      //          <li>
      //             <div class="reply-container"></div>
      //             <a class="reply-btn">Reply</a>
      //             <div class="reply-input">
      //                <div>
      //                   <input type="text" placeholder="Reply">
      //                   <a class="reply-input-btn"><i class="fas fa-arrow-circle-right"></i></a>
      //                </div>
      //             </div>

      //          </li>
      //       </ul>
      //    </li>
      // `);
   //    $(this).prev("input").val("");
   // });

   // $('body').on('click','.reply-btn', function(e){
   //    e.stopPropagation();
   //    $(this).hide();
   //    $(this).next(".reply-input").show();
   // });

   // $('body').on('click','.reply-input-btn', function(e){
   //    e.stopPropagation();
   //    let value = $(this).prev("input").val();
   //    // $(this).parent().hide();
   //    let user = "S";
      // $(".reply-container").append(`<div class="comment"><div class="user">${user}<span class="user-name">Shashikant Parmar</span></div><p>${value}<em>09/02/2023 11:00 am</em></p></div>`).show();
      // $(this).prev("input").val("");
   // });

});
