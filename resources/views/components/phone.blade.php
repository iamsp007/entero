@props([
    'disabled',
    'disabledfield',
    'id',
    'readonly',
    'value',
    'name',
    'class',
    'disabled_field',
    'disabled_application' => '',
    'tabindex',
    
])

<input {{ $readonly ?? '' }} class="phone_format {{ $class ?? '' }}"  id="{{ $id ?? $name }}" name="{{ $name }}" maxlength="14" type="text" placeholder="(###) ###-####" autocomplete="off" value="{{ $value ?? '' }}" {{ $disabledfield ?? '' }} {{ $disabled ?? '' }} tabindex="{{ $tabindex ?? '' }}" data-rule-phoneUS="true"/>
 
@once
    @push('js')
        <script>
            $("body").on('keyup', '.phone_format', function (event) {
                $('.phone_format').inputmask("(999) 999-9999");
            });
        </script>
    @endpush
@endonce
