var wrapper = document.getElementById('payroll-signature-pad1');

var clearButton = wrapper.querySelector("[data-action=clear]");
var changeColorButton = wrapper.querySelector("[data-action=change-color]");
var undoButton = wrapper.querySelector("[data-action=undo]");
var savePNGButton = wrapper.querySelector("[data-action=save-png]");
var url = wrapper.querySelector("[data-action=data-url]");
var saveJPGButton = wrapper.querySelector("[data-action=save-jpg]");
var saveSVGButton = wrapper.querySelector("[data-action=save-svg]");
var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {
  // It's Necessary to use an opaque color when saving image as JPEG;
  // this option can be omitted if only saving as PNG or SVG
  backgroundColor: 'rgb(255, 255, 255)'
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);

  // This part causes the canvas to be cleared
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  // This library does not listen for canvas changes, so after the canvas is automatically
  // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
  // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
  // that the state of this library is consistent with visual state of the canvas, you
  // have to clear it manually.
  signaturePad.clear();
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
    window.open(dataURL);
  } else {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

saveSVGButton.addEventListener("click", function (event) {
  var url = $(this).attr('data-url');
  var applicant_id = $(this).attr('data-user-id');
  var affidavit_id = $(this).attr('data-id');
  var type = $(this).attr('data-type');
  var sign = $(this).attr('data-sign');
  var title = $(this).attr('data-title');
  var print_page = $(this).attr('data-page');
  var page_type = $(this).attr('data-page-type');
  var view_sign = wrapper.querySelector(".view_sign").value;

  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL('image/svg+xml');
    loader();
    $.ajax({
        type:"POST",
        url:url,
        data: {
          dataURL: dataURL,
          applicant_id: applicant_id,
          affidavit_id: affidavit_id,
          type: type,
          title: title,
          page_type: page_type
        },
        success:function (data) {
          clearloader();
          // location.reload();
          // $('#sign2').find('> img').show();
          // $('#sign2').find('> img').attr('src', data.data.sign);
          var newSvg = data.data.sign;
          var redirect_url = data.data.redirect_url;
          newSvg = newSvg.replace(/^.*?(<svg)/, '$1'); // Removes anything before the <svg> tag

          // Inject the raw SVG into the #sign1 container
          $('#sign2').html(newSvg);
          $('.view_sign_2').val(newSvg);
          // Now modify the size of the injected SVG directly
          var svgElement = $('#sign2 svg');  // Find the SVG element
          svgElement.attr('width', '90px');  // Set width to 90px
          svgElement.attr('height', '50px');
          $("#payroll-signature-pad1").fadeOut();
          
          console.log("sign2 here"+sign);
          if ((page_type === 'ls62-32' || page_type === 'ls62-es-32') && (!view_sign)){
            Swal.fire({
              icon: "warning",
              title: "Uh oh! We need two signatures to finalize Form LS62. Please add 1st signature at the top of the page.",
              confirmButtonColor: '#035c96',
            }).then((result) => {
              // location.reload();
              $("html, body").animate({ scrollBottom: $(document).height()-$(window).height() });
$("#payrollSignBtn1").focus();
            });
          } else {
            if(typeof redirect_url !== 'undefined') {
              Swal.fire({
                icon: "success",
                title: "Thank you for signing the form in your Primary Language. To complete the process, please sign the English version of the form as well. You will now be redirected to the English version for your signature",
            }).then((result) => {
                  window.location.href = redirect_url;
              });
          } else {
            Swal.fire({
                icon: "success",
                title: "Signature stored successfully.",
            }).then((result) => {              
              clearloader();
                location.reload();               
              });
          }
        }

           
        },
        error:function (error) {
          alertText("Server Timeout! Please try again", 'error');
          clearloader();
        }
    });
  }
});

/** load/unload loader start*/
// function loader() {
//   $(".loader").show();
// }

// function clearloader() {
//   $(".loader").hide();
// }
function loader() {
  document.querySelector(".loader").style.display = "flex";  // Show loader
}

function clearloader() {
  document.querySelector(".loader").style.display = "none";  // Hide loader
}
/** show/Hide success/error message*/
function alertText(text, status) {
  $("."+status+"-message").show();
  $("."+status+"-html").html(text);
  $("."+status+"-message").delay(4000).hide('slow');
}
