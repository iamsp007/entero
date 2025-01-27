@props([
    'id',
    'name',
    'content' => '',
    'class' => '',
])

<textarea {{ $attributes->merge(['class' => 'ckeditor form-control ' . $class]) }} id="{{ $id }}" name="{{ $name }}">{!! $content !!}</textarea>

@once
    @push('js')
        <script src="{{asset('opration/ckeditor/ckeditor.js')}}"></script>
        <script>
            $(document).ready(function () {
                if (CKEDITOR.instances['{{ $id }}']) {
                    CKEDITOR.instances['{{ $id }}'].destroy();
                }
                CKEDITOR.replace('{{ $id }}', {
                    extraAllowedContent: '*(*)',
                });
            });
        </script>
    @endpush
@endonce
