function initSignaturePads2(wrapper) {  
   var signaturePads = document.querySelectorAll(wrapper + " .sign-pad");
   var clearButtons = document.querySelectorAll(wrapper + " .clear-button");

   var signaturePadInstances = Array.from(signaturePads).map(function (canvas) {
      return new SignaturePad(canvas);
   });
 
   for (var i = 0; i < signaturePadInstances.length; i++) {
      var signaturePad = signaturePadInstances[i];
      var clearButton = clearButtons[i];
 
      clearButton.addEventListener("click", function () {
         signaturePad.clear();
         $(this).parents('.half-container').find('.reference_sign').val('');
         $(this).parents('.half-container').find('.sign').val('');
         $(this).parents('.half-container').find('.affidavit_sign').val('');
         $(this).parents('.main-signature').find('.sign').val('');
      });

      $(signaturePads[i]).on('click', function() {
         $(this).focus();

         setTimeout(() => {
            $(this).blur();
         },);
      });
      $(signaturePads[i]).on('blur mouseleave touchend touchcancel', function () {
      // $(signaturePads[i]).on('touchend touchcancel blur mouseleave pointerup pointerleave', function () {
         var disable = $(this).attr('data-disable');
         var affidavit_slug = $(this).attr('data-slug');

         if (disable === 'true') {
            alert("Please first download the file and acknowled downloaded file.");
            signaturePad.clear();
         } else {
            if (signaturePad.isEmpty()) {
               //alert("Please provide a signature first.");
            } else {
               var t = $(this);
               var dataURL = signaturePad.toDataURL('image/svg+xml');
               var affidavit_id = $(this).attr('data-id');              
               t.parents('.half-container').find('.reference_sign').val(dataURL);
               t.parents('.half-container').find('.sign').val(dataURL);
               t.parents('.half-container').find('.affidavit_sign').val(dataURL);
               t.parents('.main-signature').find('.sign').val(dataURL);
               t.parents('.half-container').find('.sign-'+affidavit_id).val(dataURL);
   
               $("#signature-error").hide();
               $("#employee_sign-error").hide();
               $('#'+affidavit_slug+'-error').hide();
               $(".error").hide();

               clearloader();
            }
         }
      });   
   }
}

$(document).ready(function () {
   $(".sign-btn").click(function () {
      var pad_class = $(this).attr("data-pad");
      $("." + pad_class).show();
   });
});
 
/** load/unload loader start*/
function loader() {
   $(".loader").show();
}
 
function clearloader() {
   $(".loader").hide();
}
 
/** show/Hide success/error message*/
function alertText(text, status) {
   $("."+status+"-message").show();
   $("."+status+"-html").html(text);
   $("."+status+"-message").delay(4000).hide('slow');
}