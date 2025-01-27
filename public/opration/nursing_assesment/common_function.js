
/** show/Hide success/error message*/
export function NursingAlertText(text, status) {
    $("."+status+"-message").show();
    $("."+status+"-html").html(text);
    $("."+status+"-message").delay(4000).hide('slow');
}

/** show/Hide bulk action(active,inactive,delete etc) button*/
export function NursingButtonHide(t) {
    t.closest('table').find('.acceptRejectBtn').hide();
}

export const nursingNotification = {
    showNotification(message, type, delay = 4000) {
        $(`.${type}-message`).show();
        $(`.${type}-html`).html(message);
        $(`.${type}-message`).delay(delay).hide('slow');
    },
    success(message, delay = 4000) {
        this.showNotification(message, 'success', delay);
    },
    error(message, delay = 4000) {
        this.showNotification(message, 'error', delay);
    },
    warning(message, delay = 4000) {
        this.showNotification(message, 'warning', delay);
    }
}


/** Modal popop open/close */
export function nursingHidePopup(frmId) {
    $('#'+frmId).trigger("reset");
    $(".popup").hide();
    $(".viewModelData").modal('hide');
}


/** show/Hide success/error message*/
export function NursingaAlertText(text, status) {
    $("."+status+"-message").show();
    $("."+status+"-html").html(text);
    $("."+status+"-message").delay(4000).hide('slow');
}

export function nursingMasters(table, title = '', flag ='') {
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/nursing-masters',
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