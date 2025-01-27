$.validator.addMethod("validDate", function(value, element) {
    var regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return this.optional(element) || regex.test(value); // Optional if the field is not required
}, "Please enter a valid date in MM/DD/YYYY format");

$(".future_date_show_common_class").datepicker({
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
    numberOfMonths: 1,
    changeYear: true,
    changeMonth: true,
    dateFormat: "mm/dd/yy",
    minDate: 0,
    onSelect: function(dateText, inst) {
        $(".future_date_show_common_class").valid();
        if ($(this).attr('id') === 'assesment_date_form') {
            calculateExpiryDate();
        }
    }
});

$(".dateofbirth_date_show_common_class").datepicker({
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"],
    numberOfMonths: 1,
    changeYear: true,
    changeMonth: true,
    dateFormat: "mm/dd/yy",
    minDate: -10000,
    maxDate: new Date(),
    onSelect: function (dateText, inst) {},
});

$(".start_of_care_date_show_common_class").datepicker({
    dayNamesMin: ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SUN"],
    numberOfMonths: 1,
    changeYear: true,
    changeMonth: true,
    dateFormat: "mm/dd/yy",
    onSelect: function (dateText, inst) {},
 });