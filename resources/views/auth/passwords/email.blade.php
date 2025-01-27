@extends('auth.layouts.app')
@section('title') Forgot Password @stop
@section('page-image')
    <img src="{{ asset('admin/images/forgot-page-illustration.svg') }}" alt="Illustration"/>
@stop
@section('content')
    <form name="form_forgot_password_email" method="POST" action="{{ route('password.email') }}" enctype="multipart/form-data">
        @csrf
        <div class="login-form">
            <h1>Forgot Password</h1>
            <p>To receive a link to reset your password, Please enter your email address.</p>
            <div class="success-message" style="display: none;">
                <a class="success-message-close"><i class="fas fa-times"></i></a>
                <span class="success-html"></span>
            </div>

            <div class="error-message" style="display: none;">
                <a class="error-message-close"><i class="fas fa-times"></i></a>
                <span class="error-html">></span>
            </div>
            <div class="input-field-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" xmlns:v="https://vecta.io/nano"><path d="M313.6 304c-28.7 0-42.5 16-89.6 16s-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" fill="#1d345f"/></svg>

                <input id="email" placeholder="Please enter email" type="email" class="user-icon form-control @error('email') is-invalid @enderror" name="email" value="" autocomplete="email" />

            </div>

            <button type="submit" class="submit-btn"><i class="fa fa-save"></i> Send Link</button>

            <div class="row" style="text-align: right;">
                <span>
                    <a href="{{ route('login') }}"><u>⇐ Go back to Login</u></a>
                </span>
            </div>
        </div>
    </form>
@endsection

@push('js')
    <script type="module">
        import { loader, clearloader, notification, ajaxCall } from "{{ asset('opration/common_function.js') }}";

        jQuery(document).ready(function ($) {
            $("form[name='form_forgot_password_email']").validate({
                rules: {
                    email :{
                        required: true,
                        email: true
                    },
                },
                messages : {
                    email: {
                        required : "Please enter email.",
                        email : "Please enter valid email."
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
                                notification.success(response.message);
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
