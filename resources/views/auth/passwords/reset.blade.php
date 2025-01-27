@extends('auth.layouts.app')
@section('title') Reset Password @stop
@section('page-image')
    <img src="{{ asset('admin/images/reset-page-illustration.svg') }}" alt="Illustration"/>
@stop
@section('content')

    <form name="form_reset_password" method="POST" action="{{ route('password.update') }}" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="token" value="{{ $token }}">
        <div class="login-form">
            <h1>Reset Password</h1>
            <p>Please enter a new password</p>
            <div class="success-message" style="display: none;">
                <a class="success-message-close"><i class="fas fa-times"></i></a>
                <span class="success-html"></span>
            </div>

            <div class="error-message" style="display: none;">
                <a class="error-message-close"><i class="fas fa-times"></i></a>
                <span class="error-html">></span>
            </div>
            <div class="input-field-container">
                <input id="email" type="hidden" class="user-icon form-control @error('email') is-invalid @enderror" name="email" value="{{ $email ?? old('email') }}" placeholder="E-mail" autocomplete="email" autofocus>
            </div>
            <div class="input-field-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#1d345f" xmlns:v="https://vecta.io/nano"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-275.5-72c0-54.9 44.6-99.5 99.5-99.5s99.5 44.6 99.5 99.5v72.5h-199V152zm273.3 277.1c0 20.6-16.7 37.2-37.2 37.2H87.5c-20.6 0-37.2-16.7-37.2-37.2v-119c0-20.6 16.7-37.2 37.2-37.2h273.1c20.6 0 37.2 16.7 37.2 37.2v119h0zm-166-109.4h-8.9 0 2.2 0-8.9c-9.9 0-17.9 7.5-17.9 16.6v66.6c0 9.2 8 16.6 17.9 16.6h15.6c9.9 0 17.9-7.5 17.9-16.6v-66.6c0-9.2-8-16.6-17.9-16.6z"/></svg>
                <input id="password" type="password" class="password lock-icon form-control @error('password') is-invalid @enderror" name="password" placeholder="New password" autocomplete="new-password">

                <x-password-toggle toggle="#password"/>
            </div>
            <div class="input-field-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#1d345f" xmlns:v="https://vecta.io/nano"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-275.5-72c0-54.9 44.6-99.5 99.5-99.5s99.5 44.6 99.5 99.5v72.5h-199V152zm273.3 277.1c0 20.6-16.7 37.2-37.2 37.2H87.5c-20.6 0-37.2-16.7-37.2-37.2v-119c0-20.6 16.7-37.2 37.2-37.2h273.1c20.6 0 37.2 16.7 37.2 37.2v119h0zm-166-109.4h-8.9 0 2.2 0-8.9c-9.9 0-17.9 7.5-17.9 16.6v66.6c0 9.2 8 16.6 17.9 16.6h15.6c9.9 0 17.9-7.5 17.9-16.6v-66.6c0-9.2-8-16.6-17.9-16.6z"/></svg>
                <input id="password-confirm" type="password" class="password lock-icon form-control @error('password') is-invalid @enderror" name="password_confirmation" placeholder="Confirm new password" autocomplete="new-password">

                <x-password-toggle toggle="#password-confirm"/>
            </div>
            <div class="row">
                <span>
                    <a href="{{ route('login') }}"><u>Login as a diffrent user</u></a>
                </span>
            </div>

            <button type="submit"><i class="fa fa-save"></i> Reset Password</button>
        </div>
    </form>
@endsection

@push('js')
    <script type="module">
        import { loader, clearloader, notification, ajaxCall } from "{{ asset('opration/common_function.js') }}";

        jQuery(document).ready(function ($) {
            $("form[name='form_reset_password']").validate({
                rules: {
                    password: { required: true, minlength : 8 },
                    password_confirmation: { required: true, minlength : 8, equalTo : "#password" },
                },
                messages : {
                    password: {
                        required : "Please enter password."
                    },
                    password_confirmation: {
                        required : "Please enter confirm password.",
                        equalTo : "The password confirmation does not match."
                    },
                },
                submitHandler: function(form) {
                    loader();
                    $.ajax({
                        type: form.method,
                        url: form.action,
                        data: new FormData(form),
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            clearloader();

                            if(response.code == 200) {
                                window.location.href = '{{ route('home') }}';
                            } else {
                                notification.error(response.message);
                            }
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            clearloader();

                            if (xhr.status === 422) {
                                var errors = xhr.responseJSON.errors;

                                $.each(errors, function (field, messages) {
                                    var inputField = $('[name="' + field + '"]');
                                    inputField.closest('.grid-item').append('<label class="error">' + messages[0] + '</label>');
                                });
                            } else {
                                notification.error("Error: " + errorThrown);
                            }
                        }
                    });
                    return false;
                }
            });
        });
    </script>
@endpush
