$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// /** Hide/ show for Ask to user old qr code assign to new marketer? */
// $('.role_id').on("change", function () {

//     var textvalue = $(".role_id option:selected").text();

//     if(textvalue === 'Marketer') {
//         $(document).find(".marketer_section").show();
//         $(document).find(".intake_section_for_all_user").hide();
//         $(document).find(".intake_section_for_marketer").show();
//     } else {
//         $(document).find(".marketer_section").hide();
//         $(document).find(".intake_section_for_all_user").show();
//         $(document).find(".intake_section_for_marketer").hide();
//     }

//     if(textvalue === 'Vendor') {
//         $(document).find(".vendor_bank_detail").show();
//     } else {
//         $(document).find(".vendor_bank_detail").hide();
//     }
// });

/** Assign old QR code popup */
$('.assign_qr').on("click", function () {
    var mainParent = $(this).parent('.required-toggle-btn');

    if($(mainParent).find('input.assign_qr').is(':checked')) {
        $(mainParent).addClass('active');
        $(document).find(".assign_from").show();
    } else {
        $(mainParent).removeClass('active');
        $(document).find(".assign_from").hide();
    }
})

/** Initialize select2 */
$('.office_ids').select2({
    placeholder: "Select offices",
}).on('change', function() {
    $("#office_ids").removeClass('error');
    $("#office_ids-error").css({"display" : "none"});
});

/** Initialize select2 */
$('.intake_ids').select2({
    placeholder: "Select coordinators",
}).on('change', function() {
    $("#intake_ids").removeClass('error');
    $("#intake_ids-error").css({"display" : "none"});
});


$('.role_id').on("change", function () {
    var textvalue = $(".role_id option:selected").text();

    if(textvalue === 'Marketer') {
        $(document).find(".marketer_section").show();
        $(document).find(".intake_section_for_all_user").hide();
        $(document).find(".intake_section_for_marketer").show();
    } else {
        $(document).find(".marketer_section").hide();
        $(document).find(".intake_section_for_all_user").show();
        $(document).find(".intake_section_for_marketer").hide();
    }

    if(textvalue === 'Vendor') {
        $(document).find(".vendor_bank_detail").show();
    } else {
        $(document).find(".vendor_bank_detail").hide();
    }

    var role_id = $(this).val();

    $.ajax({
        'type': 'POST',
        'url': getPermissionUrl,
        data: {
            "user_id": role_id,
            "action": "get-role-permission"
        },
        // headers: {
        //     'X_CSRF_TOKEN':'{{ csrf_token() }}',
        // },
        'success': function (data) {
            var permissions = data.data.permissions;
            
            $('.permission-rows').empty();
            $('.permissions-list').empty();
            if (permissions.length > 0) {
                permissions.forEach(function(permission) {
                    var permissionRow = '<tr class="permission-row"><th>' + permission.name + '<input type="hidden" style="display:none;" value="' + permission.id + '" data-name="' + permission.name + '" class="permission-id-td"></th><td><div class="checkbox"><input type="checkbox" class="innerallchk chkassign" style="display: block;" name="permission[]" value="' + permission.name + '" checked></div></td></tr>';

                    $('.permission-rows').append(permissionRow);

                    var permissionRow = '<label>' + permission.name + '<input type="checkbox" class="innerallchk chkassign" style="display: block;" name="permission[]" value="' + permission.id + '"></label> ';

                    $('.permissions-list').append(permissionRow);
                });
            } else {
                var editRoleUrl1 = editRoleUrl + '/' + role_id + '/edit';

                $('.permission-rows').append('<tr class="permission-row"><th colspan="2" style="text-align: center;">Permission for this role was not found, Please set the necessary permissions to <role:name> role <a href="'+ editRoleUrl1 +'"> Role Setup.</a></th></tr>');

                $('.permissions-list').append('<p>Permission for this role was not found, Please set the necessary permissions to <role:name> role <a href="'+ editRoleUrl1 +'"> Role Setup.</a></p>');
            }
        },
        "error":function () {
            alert('error');
        }
    });
});

