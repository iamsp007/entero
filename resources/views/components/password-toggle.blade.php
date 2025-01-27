@props([
    'toggle'
])

<span toggle="{{ $toggle }}" class="view-password toggle-password">
    <img src="{{ asset('admin/images/pass-show.svg') }}" class="pass-show d-none">
    <img src="{{ asset('admin/images/pass-hide.svg') }}" class="pass-hide d-block">
</span>

@once
    @push('js')
        <script type="module">
            import { showHidePassword } from "{{ asset('opration/common_function.js') }}";

            $("body").on('click',".pass-show",function () {
                var t = $(this);
                showHidePassword(t, 'd-block', 'd-none');
            });
            $("body").on('click',".pass-hide",function () {
                var t = $(this);
                showHidePassword(t, 'd-none', 'd-block');
            });

            $("body").on('click',".toggle-password",function () {
                var input = $($(this).attr("toggle"));
                if (input.attr("type") == "password") {
                    input.attr("type", "text");
                } else {
                    input.attr("type", "password");
                }
            });
        </script>
    @endpush
@endonce