var wrapper = document.getElementById("signature-pad");

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
  var applicant_id = $(this).attr('data-id');
  var employee_id = $(this).attr('data-user-id');
  var type = $(this).attr('data-type');
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
          employee_id : employee_id,
          applicant_id: applicant_id,
          type: type
        },
        success:function (data) {
          // location.reload();
        
          if(typeof data.data.sign !== 'undefined') {
            $('#verisign').val(data.data.sign);
            $('#sign1').find('> img').attr('src', data.data.sign);
          } else {
            $('#verisign').val(dataURL);
            $('#sign1').html('<img src="' + dataURL + '" style="width: 90px; height: auto;" />');
          }
          $(".error").hide();
          
          $("#signature-pad").fadeOut();
          alertText(data.message, 'success');
          clearloader();
          // $(document).find('.signature_sections_main').load(location.href + " .signature_sections_main");
        },
        error:function (error) {
          alertText("Server Timeout! Please try again", 'error');
          clearloader();
        }
    });
  }
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
