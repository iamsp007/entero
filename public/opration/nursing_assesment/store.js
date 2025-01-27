import {
    NursingButtonHide,
    NursingaAlertText,
    nursingMasters
} from "./common_function.js";

/*Open message in model */
$("body").on('click',".nursingOpenPopop",function () {
    var t = $(this);
    NursingopopCallAjax(t);
});

/*Open message in model */
$("body").on('click',".insuranceLongTermOptions input[type='checkbox'], .insuranceShortTermOptions input[type='checkbox']",function () {
    if ($(this).prop('checked') == true) {
        var t = $(this);
        var term = '';
        if(t.parents('.insurance').find('.insuranceLongTerm').prop('checked') == true) {
            var term = 'long_term';
        } else if(t.parents('.insurance').find('.insuranceLongTerm').prop('checked') == true) {
            var term = 'short_term'
        }

        NursingopopCallAjax(t, term);
    }
});

function NursingopopCallAjax(t, term = '')
{

    var url =   t.attr('data-url');
    
    var user_id = t.attr('data-id');
    var array = t.attr('data-array');
    var stepData = [];
    if (typeof array !== 'undefined') {
        var obj = jQuery.parseJSON(array);

        if(obj.slug === 'stepEmail' || obj.slug === 'stepFax') {
           t.parents(".dragable-step").find(".allchk").prop("checked",true);
        } else if(obj.slug === 'insuranceEmail' || obj.slug === 'documentEmail' || obj.slug === 'documentFax' || obj.slug === 'insuranceFax') {
            t.parents("tr").find(".allchk").prop("checked",true);
        } else if(obj.slug === 'singleDocumentEmail') {
            t.parents(".health-care-proxy").find(".allchk").prop("checked",true);
        }

        if (obj.slug === 'statusUpdate') {
            var stepData = roadMapStepStatus(t);
        }
    }

    var len = $(".allchk:checked").length;

    var ids = [];
    var originalFileName = [];
    var docName = [];
    var phoneArray = [];
    var emailArray = [];

    if (len != 0) {
        $('.allchk:checked').map(function (i, x) {
            if (obj.slug === 'insuranceEmail') {
                ids.push($(this).attr('data-id'));
            } else {
                ids.push(this.value);
            }
            originalFileName.push($(this).attr('data-origianl-file-name'));
            docName.push($(this).attr('data-name'));
            phoneArray.push($(this).attr('data-phone'));
            emailArray.push($(this).attr('data-email'));
        });
    }

    var data = {
        user_id: user_id,
        array: array,
        term: term,
        ids: ids,
        originalFileName: originalFileName,
        docName: docName,
        phone: phoneArray,
        email: emailArray,
        stepData: stepData
    };

    if(typeof array !== 'undefined' && (obj.slug === 'insuranceEmail' || obj.slug === 'insuranceFax')) {
        if (len == 0) {
            alertText('Please select at least one record to continue.','warning');
        } else {
            nursingAjax(data, url);
        }
    } else {
        nursingAjax(data, url);
    }
}

function nursingAjax(data,url)
{
    // loader();
    $.ajax({
        url : url,
        type: 'GET',
        headers: {
            'X_CSRF_TOKEN':'{{ csrf_token() }}',
        },
        data: data,
        success:function(data, textStatus, jqXHR){
            // clearloader();
            $(".viewModelData").html(data);
            $(".viewModelData").modal('show');
        },
        error: function(jqXHR, textStatus, errorThrown){
            alertText("Server Timeout! Please try again",'error');
            // clearloader();
        }
    });
}