@props([
    'disabledfield',
    'disabled',
    'class',
    'name',
    'value',
    'readonly',
    'placeholder',
    'attribute' => '',    
])
 
<div class="grid-input">
    @if (isset($readonly))
        <span>{{$value}}</span>
        <i><label style="color: orange;">You don’t have permission to view or edit SSN.</label></i>
    @else
        <input name="{{ $name ?? '' }}" class="ssn_format {{ $class ?? '' }}" maxlength="11" value="{{ $value ?? '' }}" type="text" data-placeholder="(###-##-####)" placeholder="{{ $placeholder ?? '' }}" {{ $disabledfield ?? '' }} {{ $disabled ?? '' }} {{$readonly ?? ''}} />
    @endif   
</div>
 
@once
    @push('js')
        <script>
            $("body").on('keyup','.ssn_format',function () {
                var val = this.value.replace(/\D/g, '');
                var newVal = '';
                var sizes = [3, 2, 4];
                var maxSize = 10;
 
                for (var i in sizes) {
                    if (val.length > sizes[i]) {
                        newVal += val.substr(0, sizes[i]) + '-';
                        val = val.substr(sizes[i]);
                    } else {
                        break;
                    }
                }
 
                newVal += val;
                this.value = newVal;
            });
        </script>
    @endpush
@endonce
 

