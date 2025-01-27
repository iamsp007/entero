import {
    loader,
    clearloader,
    notification,
    tableRefresh,
} from "../common_function.js";

$(document).on('click', '.downloadSignDocument', function () {
    var t = $(this);
    var url = t.attr('data-url');
    var flag = t.attr('data-flag');
    var slug = t.attr('data-slug');

    var selectedDocumentIds = [];
    // Loop through checked checkboxes and get their data-name attributes
    if (slug === 'with-name-query') {
        $(this).parents('.grid-item').find('.documentCHK:checked').each(function () {
            var name = $(this).attr('data-origianl-file-name'); // Get the data-name attribute

            selectedDocumentIds.push($(this).val()); // Add it to the array
        });
    } else {
        $('.documentCHK:checked').each(function () {
            var name = $(this).attr('data-origianl-file-name'); // Get the data-name attribute

            selectedDocumentIds.push($(this).val()); // Add it to the array
        });
    }

    Swal.fire({
        title: "Are you sure, you want to download document?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I am sure!"
    }).then((result) => {
        if (result.isConfirmed) {
            loader()
            $.ajax({
                type: 'get',
                url: url,
                data: {
                    ids:selectedDocumentIds,
                    flag : flag,
                    slug: slug
                },
                success: function (response) {
                    clearloader();
                    if (response.document_urls && response.document_urls.length > 0) {
                        // Iterate over the document URLs and trigger downloads
                        response.document_urls.forEach((fileDocument) => {
                            const anchor = document.createElement("a");
                            anchor.href = fileDocument.url;
                            anchor.download = fileDocument.custom_file_name; // Use custom file name
                            document.body.appendChild(anchor);
                            anchor.click(); // Trigger the download
                            document.body.removeChild(anchor);
                        });

                        Swal.fire({
                            icon: "success",
                            title: "Documents downloaded successfully.",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No documents available to download.",
                        });
                    }
                    $(".select_all").prop("checked","");
                    $(".documentCHK").prop("checked","");
                },
                error: function (xhr, textStatus, errorThrown) {
                    clearloader();
                    alert('Error occurred while generating ZIP file.');
                }
            });
        }
    })
});

$(document).on('click', '.viewFileOnly', function (e) {
    e.preventDefault();

    var user_id = $(this).attr('data-user-id');
    var flag = $(this).attr('data-flag');
    var section = $(this).attr('data-section'); // DOTO: Remove
    var type = $(this).attr('data-type');
    var url = $(this).attr('data-url');
    var slug = $(this).attr('data-slug');

    const types = [];
    const ids = [];
    const affidavitPage = [];
    $('.afiidavitchk:checked').each(function () {
        types.push(this.value);
        ids.push(this.value);
        affidavitPage.push($(this).attr('data-affidavit'));
    });

    if (types.length === 0) {
        alert('Please select at least one record to continue.');
        return;
    }

    $(".loader").show();

    $.ajax({
        url: url,
        type: "GET",
        data: {flag: flag, name: types, ids: ids, user_id: user_id, slug: slug, affidavitPage: affidavitPage, section:section},
        xhrFields: {
            responseType: 'blob' // Expect a binary PDF response
        },
        success: function (data) {
            const blob = new Blob([data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(blob);
            $("#iframeModal1").attr('src', pdfUrl);
            $('.timesheet-file-popup1').show();
            $(".loader").hide();
        },
        error: function () {
            alert('Something went wrong');
            $(".loader").hide();
        }
    });
});

$(document).on('click', '.viewFile', function (e) {
    var user_id = $(this).attr('data-user-id');
    var flag = $(this).attr('data-flag');
    var section = $(this).attr('data-section'); // DOTO: Remove
    var type = $(this).attr('data-type');
    var url = $(this).attr('data-url');
    var slug = $(this).attr('data-slug');

    $("#iframeModal1").attr('src', '');

    if (typeof type !== 'undefined') {
        $(this).parents("li").find(".afiidavitchk").prop("checked",true);
    } else {
        if (slug === 'ls62_all') {
            $(this).parent(".payroll").find(".afiidavitchk").prop("checked",true);
        }
    }

    var len = $(".afiidavitchk:checked").length;

    var types = [];
    var ids = [];
    var affidavitPage = [];
    if (len == 0) {
        alert('Please select at least one record to continue.');
        // $(".warning-message").show();
        // $(".warning-html").html('Please select at least one record to continue.');
    } else {
        // if (len != 0) {
            $('.afiidavitchk:checked').map(function (i, x) {
                types.push(this.value);
                ids.push(this.value);
                affidavitPage.push($(this).attr('data-affidavit'));
            });
        // }
        $(".loader").show();
        $.ajax({
            url: url,
            type: "GET",
            data: {flag: flag, name: types, ids: ids, user_id: user_id, slug: slug, affidavitPage: affidavitPage, section:section},
            success: function (result) {
                var file_name = $.trim(result);

                var getFile = "../applicant/pdf/" +file_name;

                $("#iframeModal1").attr('src', getFile + '?page=hsn#toolbar=1');
                $('.timesheet-file-popup1').show();
                $(".loader").hide();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Something went wrong');
            }
        });
    }
});

$(".select_all").on('click',function (e) {
    var ch = $(this).prop("checked");
    var checkboxes = $(this).closest('.grid-item').find(".afiidavitchk:not(:disabled)");

    if (ch == true) {
        checkboxes.prop("checked", true);
    } else {
        checkboxes.prop("checked", false);
    }
});
