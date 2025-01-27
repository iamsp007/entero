
$(document).ready(function () {

   $(".date").datepicker({
      dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
      numberOfMonths: 1,
      changeYear: true,
      changeMonth: true,
      dateFormat: "mm/dd/yy",
      onSelect: function (dateText, inst) {
      },
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

   function performed_refused(){
      alert("performed_refused function clicked");
   }

   $(".toggle-section").on("click", function () {
      $(this).toggleClass("open");
      var dataSection = jQuery(this).attr("data-section");
      $('.'+ dataSection + '-content').slideToggle();
   });

});
