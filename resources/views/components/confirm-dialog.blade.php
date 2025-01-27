@props(['options' => []])


<button onclick="showSweetAlertConfirm({{ json_encode($options) }})">{{ $slot }}</button>
{{-- Usage: <x-confirm-dialog :options="['title' => 'Custom Title']">Text</x-confirm-dialog> --}}

@once
    @push('styles')
        <link href="{{ asset('admin/css/sweetalert2.min.css') }}" rel="stylesheet" />
    @endpush
@endonce

@once
    @push('js')
        <script type="text/javascript" src="{{ asset('admin/js/sweetalert2.all.min.js') }}"></script>
        <script>
            function showSweetAlertConfirm(options = {}) {
                Swal.fire({
                    title: options.title || 'Are you sure?',
                    text: options.text || "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#035c96',
                    cancelButtonColor: '#ff7612',
                    confirmButtonText: options.confirmButtonText || 'Yes'
                }).then((result) => {
                    if (result.isConfirmed) {
                        options.onConfirmed && options.onConfirmed();
                    } else {
                        options.onCancelled && options.onCancelled();
                    }
                });
            }
        </script>
    @endpush
@endonce