
import {
    loader,
    clearloader,
    alertText
} from "./common_function.js";

$(document).ready(function() {
    $.each(roles, function (key, value) {
        var user_id = value['id'];
        $.ajax({
            'type': 'POST',
            'url': url,
            data: {
                "user_id": user_id,
                "action": "get-role-permission"
            },
            'success': function (data) {

                $(document).find("."+data.data.role_name).each(function( i, x ){

                    var permissionId = $(this).parents("tr").find('.permission-id-td').val();
                    var permissionName = $(this).parents("tr").find('.permission-id-td').attr('data-name');

                    $(this).parents("tr").find("."+data.data.role_name).attr('name', data.data.role_id+'['+permissionName+']');

                    if($.inArray(parseInt(permissionId), data.data.permission_id) !== -1 ) {
                        $(this).parents("tr").find("."+data.data.role_name).prop("checked","checked");
                    } else {
                        $(this).parents("tr").find("."+data.data.role_name).prop("checked","");
                    }
                });
            },
            "error":function () {
                alertText("Server Timeout! Please try again", 'error');
                clearloader();
            }
        });
    });
});

$('body').on('change', '.assign_user_id', function () {
    var role_name = $(this).find(':selected').attr('data-id');
    var user_id = $(this).val();
    var action = $(this).attr('data-action');
    var url = $(this).attr('data-url');
    var user_name = $(this).find(':selected').text();
    var counter = 2;

    $.each(roles, function (key, value) {
        var name = value['name'];

        if (name != role_name) {
            $('td:nth-child('+counter+'),th:nth-child('+counter+')').hide();
        } else {
            $('td:nth-child('+counter+'),th:nth-child('+counter+')').show();
        }
        counter++;
    });
    if (user_id != "") {
        loader();
        $.ajax({
            'type': 'POST',
            'url': url,
            data: {
                "user_id": user_id,
                "action": action
            },
            'success': function (data) {
                $(".chkassign").prop("checked","");
                $(document).find("."+data.data.role_name).each(function( i, x ){
                    var permissionId = $(this).parents("tr").find('.permission-id-td').val();

                    var permissionName = $(this).parents("tr").find('.permission-id-td').attr('data-name');
                    $(this).parents("tr").find("."+data.data.role_name).attr('name', data.data.role_id+'['+permissionName+']');
                    $(this).parents("tr").find("."+data.data.role_name).attr('data-userId', user_id);

                    if($.inArray(parseInt(permissionId), data.data.permission_id) !== -1 ) {
                        $(this).parents("tr").find("."+data.data.role_name).prop("checked","checked");
                    } else {
                        $(this).parents("tr").find("."+data.data.role_name).prop("checked","");
                    }
                });

                clearloader();
            },
            "error":function () {
                alertText("Server Timeout! Please try again", 'error');
                clearloader();
            }
        });
    } else {
        location.reload();
    }
});
