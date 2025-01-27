function initSignaturePads(wrapper) {
   // Get all signature pads, clear buttons, and save buttons
   var signaturePads = document.querySelectorAll(wrapper + " .sign-pad");
   var clearButtons = document.querySelectorAll(wrapper + " .clear-button");
   var saveButtons = document.querySelectorAll(wrapper + " .save-button");

   // Initialize signature pads
   var signaturePadInstances = Array.from(signaturePads).map(function (canvas) {
      return new SignaturePad(canvas);
   });

   // Add event listeners to each set of buttons
   for (var i = 0; i < signaturePadInstances.length; i++) {
      var signaturePad = signaturePadInstances[i];
      var clearButton = clearButtons[i];
      var saveButton = saveButtons[i];

      clearButton.addEventListener("click", function () {
         signaturePad.clear();
      });

   saveButton.addEventListener("click", function () {
 
         var disable = $(this).attr('data-disable');
         var data_div_key = $(this).attr('data-div-key');

         if (disable === 'true') {
            alert("Please first download the file and acknowled downloaded file.");
            signaturePad.clear();
         } else {
            if (signaturePad.isEmpty()) {
               alert("Please provide a signature first.");
            } else {
               var t = $(this);
               var url = $(this).attr('data-url');
               var applicant_id = $(this).attr('data-user-id');
               var affidavit_id = $(this).attr('data-id');
               var type = $(this).attr('data-type');

               // var dataURL = signaturePad.toDataURL();
               var dataURL = signaturePad.toDataURL('image/svg+xml');
               console.log("Signature Data URL:", dataURL);

               loader();
               $.ajax({
                  type:"POST",
                  url:url,
                  data: {
                     dataURL: dataURL,
                     applicant_id: applicant_id,
                     affidavit_id: affidavit_id,
                     type: type
                  },
                  headers: {
                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  },
                  success:function (data) {
                     alertText(data.message, 'success');
                     clearloader();
                     // $("#signature-pad0").fadeOut();
                     // $(document).find(".signature_affidavit").load(location.href + " .signature_affidavit");
                     // $(document).find(".signature-pad").removeClass('active');
                     // $(document).find('.signature_sections_0').load(location.href + " .signature_sections_0");
                     // t.parents('.half-container').find(".error").hide();
                     // t.parents('.half-container').find(".affidavit_sign").hide();
                     // t.parents('#signature').find(".error").hide();
                     // t.parents('#signature').find(".affidavit_sign").hide();
                     // alert(t.parents('.content').find(".affidavit_sign").attr('class'));
                     // t.parents('.content').find(".affidavit_sign").val(data.data.sign);

                     $(document).find(".error-div-"+data.data.type).load(location.href + " .error-div");

                     if (data.data.sign_date) {
                        t.parents('.half-container').find(".signature_date-"+data.data.type).val(data.data.sign_date);
                     }

                     if (typeof data_div_key !== 'undefined') {
                        $("#affidavit"+data_div_key).attr('data-mandatory', '');
                        $(".add_some_info"+data_div_key).html('');
                     }

                     if (data.data.applicant_tax_detail_id) {
                        t.parents('#payroll').find("#applicant_tax_detail_id").val(data.data.applicant_tax_detail_id);
                        t.attr("data-id", data.data.applicant_tax_detail_id);
                     }
                  },
                  error:function (error) {
                     alertText("Server Timeout! Please try again", 'error');
                     clearloader();
                  }
               });
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