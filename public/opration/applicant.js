$(document).ready(function () {
    calculateIncome();

    var company_name = $("#company_name").val();
    var applicant_name = $("#applicant_name").val();
    var applicant_date = $("#applicant_date").val();

    $(".main_company_name").html(" <b style='color: blue !important;'>"+company_name+"</b>");
    $(".main-applicant_name").html(" <b style='color: blue !important;'>"+applicant_name+"</b>");
    $(".application-date").html(applicant_date);
});

$(document).on('click', '.checkbox_click',function (e) {
    var title = $(this).attr('data-title');
    alert('You can dowload (' + title + ') information by clicking on download icon for you future referrence');
});

function calculateIncome() {
    var inc1 = $("#claim1").val() * 2000;
    var inc2 = $("#claim2").val() * 500;
    var incTotal = inc1 + inc2;

    $("#claim1Total").val(inc1);
    $("#claim2Total").val(inc2);
    $("#claimsTotal").val(incTotal);
}

function usCitizenCheck(type) {
    if (type == 1) {
        $("#usCitizenCheck").show();
        $("#lawfullsection").hide();
        $("#lawfulPermCheck").hide();
        $("#legallyAuthorisedsection").hide();
        $("#legallyAuthorisedCheck").hide();

        $("#lawfullsection input[name='citizen[is_lawful]']").prop("checked", false);
        $("#legallyAuthorisedsection input[name='citizen[is_authorised]']").prop("checked", false);
    } else {
        $("#usCitizenCheck").hide();
        $("#lawfullsection").show();
    }
}

function lawfulPermCheck(type) {
    if (type == 1) {
        $("#lawfulPermCheck").show();
        $("#legallyAuthorisedsection").hide();
        $("#legallyAuthorisedCheck").hide();
        $("#legallyAuthorisedsection input[name='citizen[is_authorised]']").prop("checked", false);
    } else {
        $("#lawfulPermCheck").hide();
        $("#legallyAuthorisedsection").show();
        //$("#legallyAuthorisedCheck").hide();
    }
}

function maidenNameCheck(type) {
    if (type == 1) {
        $("#maidenNameCheck").show();
    } else {
        $("#maidenNameCheck").hide();
    }
}

function reasonLeavingCond(reason) {
    if (reason.value.toLowerCase() == "other") {
        $("#other_reason_section").show();
    } else {
        $("#other_reason_section").hide();
    }
}

function courseTypeSection(type) {
    if (type == 1) {
        $(".course-type").show();
    } else {
        $(".course-type").hide();
    }
}

$(document).on('click', '.checkLang',function (e) {
    var val = $(this).val();

    if(val == "Other" || val == "other") {
        $("#otherLangSection").show();
    } else {
        $("#otherLangSection").hide();
    }
});

$(document).on('click', '.depositeCheck',function (e) {
    var val = $(this).val();

    if (val === "check") {
        $("#depositeCheck").hide();
        $("#checkSection").show();
    } else if (val === "deposit") {
        $("#depositeCheck").show();
        $("#checkSection").hide();
    }
});

$(document).on('click', '.documentChecked',function (e) {
    var val = $(this).val();

    if (val === "driving_licence") {
        $("#docid_passport").hide();
        $("#docid_greencard").hide();
        $("#docid_USCIS").hide();
        $("#docid_driving").show();
    } else if (val === "passport") {
        $("#docid_passport").show();
        $("#docid_greencard").hide();
        $("#docid_USCIS").hide();
        $("#docid_driving").hide();
    } else if (val === "resident_card") {
        $("#docid_passport").hide();
        $("#docid_greencard").show();
        $("#docid_USCIS").hide();
        $("#docid_driving").hide();
    } else if (val === "authorisation_card") {
        $("#docid_passport").hide();
        $("#docid_greencard").hide();
        $("#docid_USCIS").show();
        $("#docid_driving").hide();
    }
});

$("#other_spoken_lang").on("select2:select select2:unselect", function (e) {
    var items= $(this).val();

    $("#otherSpokenLangSection").hide();
    if($.inArray('Other', items) !== -1 || $.inArray('other', items) !== -1) {
        $("#otherSpokenLangSection").show();
    }
})

// $(document).on("click", ".referredBy input[type='radio']", function () {
//     var val = $(this).val();

//     if (val == "Yes") {
//         $(".referredByName").show();
//     } else {
//         $(".referredByName").hide();
//     }
// });

$(".transportation").on("change", function (e) {
    var items= $(this).val();
    if (items == "Other") {
        if ($(this).is(":checked")) {
            $("#transportationMode").show();
        } else {
            $("#transportationMode").hide();
        }
    }
});

$(document).on('click', '.selectDoc',function (e) {
    var field = $(this).attr('data-value');
    if (field === 'docid_driving') {
        $("#docid_driving").show();
        $("#docid_passport").hide();
        $("#docid_greencard").hide();
        $("#docid_USCIS").hide();
    } else if (field === 'docid_passport') {
        $("#docid_driving").hide();
        $("#docid_passport").show();
        $("#docid_greencard").hide();
        $("#docid_USCIS").hide();
    } else if (field === 'docid_greencard') {
        $("#docid_driving").hide();
        $("#docid_passport").hide();
        $("#docid_greencard").show();
        $("#docid_USCIS").hide();
    } else if (field === 'docid_USCIS') {
        $("#docid_driving").hide();
        $("#docid_passport").hide();
        $("#docid_greencard").hide();
        $("#docid_USCIS").show();
    }
});

// if($(document).find(".userApplication").hasClass('active')) {
//     var hideTab = $(document).find(".userApplication").attr('data-show-tab');
//     $(document).find('#'+hideTab).hide();

//     var showTab = $(document).find(".userApplication").next().attr('data-show-tab');
//     var addClass = $(document).find(".userApplication").next().attr('data-add-class');

//     $(document).find("."+addClass).addClass('active');
//     $(document).find("."+addClass).addClass('directMoveSection');
//     $(document).find("."+addClass).addClass('success');
//     $(document).find('#'+showTab).show();
// }

$(document).on('click', '.directMoveSection',function (e) {
    $(document).find(".applicant_Sections").each(function( i, x ){
        if($(this).css("display") == "block") {
            var hideTab = $(this).attr("id")
            var removeClass = $(this).attr("data-class")
            $(document).find("."+removeClass).removeClass('active');
            $(document).find('#'+hideTab).css({"display" :"none"});
        }
    });

    var label = $(this).find('span').text()
    $(".step-active-name").html(label);

    var showTab = $(this).attr('data-show-tab');
    var addClass = $(this).attr('data-add-class');
    $(document).find("."+addClass).addClass('active');
    $(document).find('#'+showTab).show();
});

$(document).on('click', '.prevNextClick',function (e) {
    var hideTab = $(this).attr('data-hide-tab');
    var showTab = $(this).attr('data-show-tab');
    var addClass = $(this).attr('data-add-class');
    var removeClass = $(this).attr('data-remove-class');

    $("."+removeClass).removeClass('active');
    $("."+addClass).addClass('active');

    $('#'+showTab).show();
    $('#'+hideTab).hide();

    $("."+removeClass).addClass('success');
});