//datepicker start
$(function() {
    $('.daterange').daterangepicker({
        autoUpdateInput: false,
        opens: 'right',
        maxDate: moment().add(10, 'years'),
        locale: {
            cancelLabel: 'Clear'
        }
    });
    var picker = $('.daterange').data('daterangepicker');
    $('.daterange').on('input change', function(e) {
        var inputVal = $(this).val();
        var dates = inputVal.split(' to ');

        if (dates.length === 2) {
            var startDate = moment(dates[0], 'YYYY-MM-DD');
            var endDate = moment(dates[1], 'YYYY-MM-DD');

            if (startDate.isValid() && endDate.isValid()) {
                picker.setStartDate(startDate);
                picker.setEndDate(endDate);
                picker.updateView();
                picker.updateView();
            }
        }
    });

    $('.daterange').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' to ' + picker.endDate.format('YYYY-MM-DD'));
    });

    $('.daterange').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
    $('.daterange').on('hide.daterangepicker', function(ev, picker) {
        if (picker.startDate.isValid() && picker.endDate.isValid()) {
            $(this).val(picker.startDate.format('YYYY-MM-DD') + ' to ' + picker.endDate.format('YYYY-MM-DD'));
        }
    });
    $('.daterange').on('keydown', function(e) {
        var picker = $(this).data('daterangepicker');
        if (!picker) return;

        if (e.altKey) {
            switch (e.keyCode) {
                case 37: // Alt + Left Arrow moves the end date back by one month
                var newEndDate = picker.endDate.clone().subtract(1, 'months');
                if (newEndDate.isSameOrAfter(picker.startDate)) {
                    picker.setEndDate(newEndDate);
                    $(this).val(picker.startDate.format('YYYY-MM-DD') + ' to ' + newEndDate.format('YYYY-MM-DD'));
                    picker.updateCalendars();
                }
                break;
            case 39: // Alt + Right Arrow moves the end date forward by one month
                var newEndDate = picker.endDate.clone().add(1, 'months');
                if (newEndDate.isSameOrAfter(picker.startDate)) {
                    picker.setEndDate(newEndDate);
                    $(this).val(picker.startDate.format('YYYY-MM-DD') + ' to ' + newEndDate.format('YYYY-MM-DD'));
                    picker.updateCalendars();
                }
                break;
            case 38: // Alt + Up Arrow moves the start date back by one month
                var newStartDate = picker.startDate.clone().subtract(1, 'months');
                if (newStartDate.isSameOrBefore(picker.endDate)) {
                    picker.setStartDate(newStartDate);
                    $(this).val(newStartDate.format('YYYY-MM-DD') + ' to ' + picker.endDate.format('YYYY-MM-DD'));
                    picker.updateCalendars();
                }
                break;
            case 40: // Alt + Down Arrow moves the start date forward by one month
                var newStartDate = picker.startDate.clone().add(1, 'months');
                if (newStartDate.isSameOrBefore(picker.endDate)) {
                    picker.setStartDate(newStartDate);
                    $(this).val(newStartDate.format('YYYY-MM-DD') + ' to ' + picker.endDate.format('YYYY-MM-DD'));
                    picker.updateCalendars();
                }
                break;
            }
        }else if (!e.ctrlKey) {
            switch (e.keyCode) {
                case 37: // Left Arrow moves the start date back by one day.
                    var newStartDate = picker.startDate.clone().subtract(1, 'days');
                    if (newStartDate.isSameOrBefore(picker.endDate)) {
                        picker.setStartDate(newStartDate);
                        $(this).val(newStartDate.format('YYYY-MM-DD') + ' to ' + picker.endDate.format('YYYY-MM-DD'));
                        picker.updateCalendars(); // Ensure calendars display updated dates
                    }
                    break;
                case 39: // Right Arrow moves the start date forward by one day.
                    var newStartDate = picker.startDate.clone().add(1, 'days');
                    if (newStartDate.isSameOrBefore(picker.endDate)) {
                        picker.setStartDate(newStartDate);
                        $(this).val(newStartDate.format('YYYY-MM-DD') + ' to ' + picker.endDate.format('YYYY-MM-DD'));
                        picker.updateCalendars();
                    }
                    break;
                case 38: // Up Arrow
                    // Move the start date back by one week
                    var newStartDate = picker.startDate.clone().subtract(1, 'weeks');
                    if (newStartDate.isSameOrBefore(picker.endDate)) {
                        picker.setStartDate(newStartDate);
                        $(this).val(newStartDate.format('YYYY-MM-DD') + ' to ' + picker.endDate.format('YYYY-MM-DD'));
                        picker.updateCalendars();
                    }
                    break;
                case 40: // Down Arrow
                    // Move the start date forward by one week
                    var newStartDate = picker.startDate.clone().add(1, 'weeks');
                    if (newStartDate.isSameOrBefore(picker.endDate)) {
                        picker.setStartDate(newStartDate);
                        $(this).val(newStartDate.format('YYYY-MM-DD') + ' to ' + picker.endDate.format('YYYY-MM-DD'));
                        picker.updateCalendars();
                    }
                    break;
                    
                case 13: // Enter to apply the selection and close the picker.
                    $(this).trigger('apply.daterangepicker', [picker]);
                    picker.hide();
                    break;
            }
        } else { // With Ctrl pressed, adjust the end date
            switch (e.keyCode) {
                case 37: // Ctrl + Left Arrow moves the end date back by one day.
                    var newEndDate = picker.endDate.clone().subtract(1, 'days');
                    if (newEndDate.isSameOrAfter(picker.startDate)) {
                        picker.setEndDate(newEndDate);
                        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' to ' + newEndDate.format('YYYY-MM-DD'));
                        picker.updateCalendars();
                    }
                    break;
                case 39: // Ctrl + Right Arrow moves the end date forward by one day.
                    var newEndDate = picker.endDate.clone().add(1, 'days');
                    if (newEndDate.isSameOrAfter(picker.startDate)) {
                        picker.setEndDate(newEndDate);
                        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' to ' + newEndDate.format('YYYY-MM-DD'));
                        picker.updateCalendars();
                    }
                    break;
                case 38: // Ctrl + Up Arrow moves the end date back by one week.
                    var newEndDate = picker.endDate.clone().subtract(1, 'weeks');
                    if (newEndDate.isSameOrAfter(picker.startDate)) {
                        picker.setEndDate(newEndDate);
                        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' to ' + newEndDate.format('YYYY-MM-DD'));
                        picker.updateCalendars();
                    }
                    break;
                case 40: // Ctrl + Down Arrow moves the end date forward by one week.
                    var newEndDate = picker.endDate.clone().add(1, 'weeks');
                    if (newEndDate.isSameOrAfter(picker.startDate)) {
                        picker.setEndDate(newEndDate);
                        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' to ' + newEndDate.format('YYYY-MM-DD'));
                        picker.updateCalendars();
                    }
                    break;
                case 13: // Ctrl + Enter to apply the currently selected range.
                    $(this).trigger('apply.daterangepicker', [picker]);
                    break;
            }
        }
    });
});