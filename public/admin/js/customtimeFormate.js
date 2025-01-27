function isValid1to12HourTime(value) {
    return /^(0?[0-9]|1[0-2]):([0-5]\d)$/.test(value);
}

function isValid12to24HourTime(value) {
    return /^(1[3-9]|2[0-3]):([0-5]\d)$/.test(value);
}

function convertTo24HourFormat(value) {
    if (!value || !isValid12to24HourTime(value)) {
        alert('Please enter a valid time in 24-hour format (e.g., 23:59)');
        return '';
    }
    const [hours, minutes] = value.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = (hours % 12) || 12;
    return `${String(adjustedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

function convertTo12HourFormat(value, pattern) {
    if (!value || !isValid1to12HourTime(value)) {
        alert('Please enter a valid time in 12-hour format (e.g., 12:00 PM)');
        return '';
    }
    
    const [hours, minutes] = value.split(':').map(Number);
    const period = pattern || (hours === 0 ? 'AM' : (hours >= 12 ? 'PM' : 'AM'));
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

$(document).on('input', '.schedule_start_time, .schedule_end_time, .visit_start_time, .visit_end_time', function() {
    let value = $(this).val().replace(/\D/g, '');
    if (value.length > 2) value = `${value.slice(0, 2)}:${value.slice(2, 4)}`;

    const periodPattern = /(AM|PM)$/i;
    const match = $(this).val().match(periodPattern);
    const patter2 = match ? match[0].toUpperCase() : '';

    if (value.length === 5) {
        if (isValid12to24HourTime(value)) {
            $(this).val(convertTo24HourFormat(value));
            console.log('12 to 24' + $(this).val(convertTo24HourFormat(value)));
        } else if (isValid1to12HourTime(value)) {
            $(this).val(convertTo12HourFormat(value, patter2));
            console.log('1 to 12' + $(this).val(convertTo12HourFormat(value, patter2)));
        } else {
            $(this).val(''); // Clear invalid input
        }
    } else {
        $(this).val(value); // Set the formatted value back to the input
    }
});

// Prevent default behavior for backspace in the main time input
$(document).on('keydown', '.schedule_start_time, .schedule_end_time, .visit_start_time, .visit_end_time', function(event) {
    if (event.key === "Backspace") {
        event.preventDefault(); // Prevent default backspace behavior
        let input = $(this);
        let currentValue = input.val();
        let cursorPosition = input.prop('selectionStart'); // Get the current cursor position
        
        // If there's something to remove before the cursor
        if (cursorPosition > 0) {
            let newValue = currentValue.slice(0, cursorPosition - 1) + currentValue.slice(cursorPosition);
            input.val(newValue);

            // Set the new cursor position (one character back from the original position)
            input.prop('selectionStart', cursorPosition - 1);
            input.prop('selectionEnd', cursorPosition - 1);
        }
    }
    function clearVisitTimes() {
        $(this).closest('tr').find('.visit_start_time, .visit_end_time').val(''); // Clear visit times
        $(this).closest('tr').find('.copy_time').prop('checked', false); // Uncheck the checkbox
        
    }
    $(document).on('input', '.schedule_start_time, .schedule_end_time', clearVisitTimes);
});