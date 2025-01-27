import {
    NursingButtonHide,
    NursingaAlertText,
    nursingMasters
} from "./common_function.js";

$('body').on('click', '.update-status', function() {
    var t = $(this);

    var status = $(this).attr("data-status");
    var url = $(this).attr("data-url");
    var action = $(this).attr("data-action");
    var model = $(this).attr("data-model");
    var message = $(this).attr("data-message");
    var slug = $(this).attr("data-slug");
    var intake_count = $(this).attr("data-count");
    var page = $(this).attr("data-page");
    var user_id = $(this).attr('data-user-id');

    $(this).parents("tr").find(".innerallchk").prop("checked", true);

    var data = {
        status: status,
        action: action,
        model: model,
        slug: slug,
        intake_count: intake_count,
        user_id: user_id,
    };

    doactionnursingadmin(t, url, message, data)
});

function doactionnursingadmin(t, url, message, dataObject) {
    var len = $(".innerallchk:checked").length;

    if (len == 0) {
        NursingaAlertText('Please select at least one record to continue.', 'warning');
    } else {
        var val = $('.innerallchk:checked').map(function() {
            return this.value;
        }).get();

        var data = {
            "id": val,
            "model": dataObject.model,
            "action": dataObject.action,
            "status": dataObject.status,
            "slug": dataObject.slug,
            "user_id": dataObject.user_id,
        };

        postdataforactionnursingadmin(t, url, message, data);
    }
}

function postdataforactionnursingadmin(t, url, message, dataObject) {
    confirmationPopup("Are you sure want to " + message + "?", function(confirm) {
        if (confirm) {
            if (dataObject.page_action === 'assign-coordinator') {
                $(".page_action").val('assign-coordinator');
            }

            $.ajax({
                'type': 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                'url': url,
                data: dataObject,
                'success': function(data) {
                    if (data.code == 400) {
                        var smsStatus = 'error';
                    } else {
                        var smsStatus = 'success';
                    }

                    NursingaAlertText(data.message, smsStatus);
                    nursingMasters(dataObject.slug);

                    var refreshTable = t.closest("table").attr('id');

                    NursingButtonHide(t);
                    $(".innerallchk, .mainchk").prop("checked", "");
                },
                "error": function() {
                    NursingaAlertText("Server Timeout! Please try again", "error");
                }
            });
        }
    });
    $(".innerallchk").prop("checked", "");
    return false;
}