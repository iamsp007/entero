@extends('auth.layouts.app')
@section('title') Login @stop
@section('page-image')
    <img src="{{ asset('admin/images/login-page-illustration.svg') }}" alt="Illustration"/>
@stop
@section('content')

    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="login-form">
            <h1>LOGIN</h1>
            <p>Hello! Let's get started</p>
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

                <input id="email" type="email" class="user-icon form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" autocomplete="email" placeholder="Please enter email"/>
            </div>
            <div class="input-field-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#1d345f" xmlns:v="https://vecta.io/nano"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-275.5-72c0-54.9 44.6-99.5 99.5-99.5s99.5 44.6 99.5 99.5v72.5h-199V152zm273.3 277.1c0 20.6-16.7 37.2-37.2 37.2H87.5c-20.6 0-37.2-16.7-37.2-37.2v-119c0-20.6 16.7-37.2 37.2-37.2h273.1c20.6 0 37.2 16.7 37.2 37.2v119h0zm-166-109.4h-8.9 0 2.2 0-8.9c-9.9 0-17.9 7.5-17.9 16.6v66.6c0 9.2 8 16.6 17.9 16.6h15.6c9.9 0 17.9-7.5 17.9-16.6v-66.6c0-9.2-8-16.6-17.9-16.6z"/></svg>

                <input id="password" type="password" class="lock-icon form-control @error('password') is-invalid @enderror" name="password" autocomplete="current-password" placeholder="Please enter password">
                <x-password-toggle toggle="#password"/>
            </div>
            <div class="row">
                <input type="hidden" id="otp" name="otp" value="">  
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                <label class="form-check-label" for="remember">
                    {{ __('Remember Me') }}
                </label>
            </div>
            <button type="submit" class="submit-btn"><i class="fa fa-save"></i> Log In</button>
            <div class="row"  style="text-align: right;">
                <span>
                    <a href="{{ route('password.request') }}"><u>Forgot password ?</u></a>
                </span>
            </div>
        </div>
    </form>
@endsection