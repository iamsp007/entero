$(document).ready(function() {
  $( ".draggable-popup" ).draggable();
        
  $("[data-popup-close]").on("click", function (e) {
      e.preventDefault();
      var targeted_popup_class = $(this).attr("data-popup-close");
      $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
      
  });

  $("[data-popup-minimize]").on("click", function (e) {
    e.preventDefault();
    $(this).find(".fas").toggleClass('fa-plus-square fa-minus-square');
    var targeted_popup_class = $(this).attr("data-popup-minimize");
    $('[data-popup="' + targeted_popup_class + '"]').toggleClass("minimize-popup");
  });

  $('body').on('click',".open_call_sms_popup",function (e) {
    e.preventDefault();  
    
    $('#call_sms_popup').fadeIn(350);
    $('#callMini').css('display','block');
      var home_phone = $(this).attr( 'data-home_phone' );
      var cell_phone = $(this).attr( 'data-cell_phone' );
      
      if( home_phone ){
          
          $('#home_phone_tr').css('display','table');
          $('#home_phone_number').val(home_phone);
          $('#home_phone_td_txt').html('Home Phone : +1 '+ home_phone +'');
          $('#home_button_sms').attr('data-phone', home_phone );
          
      }
      if( cell_phone ){
          $('#cell_phone_tr').css('display','table');
          $('#cell_phone_number').val(cell_phone);
          $('#cell_phone_td_txt').html('Cell Phone : +1 '+ cell_phone +'');
          $('#cell_button_sms').attr('data-phone', cell_phone );
          
      }
  });
  $('body').on('click',"#home_button_sms",function (e) {
      e.preventDefault();  
      var home_phone = $(this).attr( 'data-phone' );
      smsBox(home_phone);
        
  });
  $('body').on('click',"#cell_button_sms",function (e) {
      e.preventDefault();
      var cell_phone = $(this).attr( 'data-phone' );
      smsBox(cell_phone );
  });
  
  
  

});
function smsBox(type) {
  phone = type;
  if(type == 'other') {
      var phone = $("#phone-number2").val();
  }
  $(".CustName").html($(".allicant-name").html());
  $(".CustNo").html("Message will be send to : "+phone);
  $("#smsNumberId").val(phone);
  $('.sms-box').show();
}
function sendSMS() {
  $("#loader-wrapper").show();
  $.ajax({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      url: "/send-message",
      method: 'POST',
      data: {
          getNumber: $("#smsNumberId").val(),
          message:$("#smsText").val()
      },
      success: function (response) {
          $("#loader-wrapper").hide();
          $("#smsText").val('');
          $("#smsSendResp").html('Message Sent Succeessfully.');
      },
      error: function (error) {
          $("#smsSendResp").html('Message Send not Succeessfully. Please try again later.');
      }
  });
}