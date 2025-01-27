var company_id;

function masters(table, title = '', flag ='') {

    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: "/masters",
        method: 'POST',
        data: {
            table: table,
            title: title,
            flag: flag
        },
        success: function (response) {
            $("#"+table).html(response);
        },
        error: function (error) {

        }
    });
}

function checkOTRate(ot) {
    var otrate = ot.value * 1.5;
    var dailyRate = ot.value * 13;
    $("#ot_rate").val(otrate.toFixed(2));
    $("#daily_rate").val(dailyRate.toFixed(2));
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
