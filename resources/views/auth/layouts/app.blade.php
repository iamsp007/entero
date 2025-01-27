<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('landing/images/apple-touch-icon.png') }}"/>
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('landing/images/favicon-32x32.png') }}"/>
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('landing/images/favicon-16x16.png') }}"/>
        <link rel="shortcut icon" href="{{ asset('landing/images/favicon.ico') }}" type="image/x-icon">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>@yield('title') | Entero</title>
        <link href="{{ asset('admin/css/fontawesome.min.css') }}" rel="stylesheet" />
        <link href="{{ asset('admin/css/login.css') }}" rel="stylesheet" />
        <script src="{{ asset('admin/js/lottie-player.js') }}"></script>
        @stack('styles')
    </head>
    <body>
         <!-- Loader -->
         <div class="loader">
            <!-- <img src="{{ asset('admin/images/480px-Loader.gif') }}"/> -->
            <lottie-player src="{{ asset('admin/lottiefiles/loader-image.json') }}" background="transparent"  speed="1" loop  autoplay></lottie-player>
        </div>
        <div class="login">
            <div class="login-box">
                <img src="{{ asset('admin/images/logo.png') }}" alt="Logo" class="logo" />

                <div class="flex-container">
                    <div class="illustration-container">
                        @yield('page-image')
                    </div>

                    <div class="form-container">
                        @yield('content')
                    </div>
                </div>
            </div>

            <footer>©<span id="year"></span> — Reforma Technologies PVT LTD - You Don't Need to Hire a Manager Anymore.</footer>
        </div>

        <script type="text/javascript" src="{{ asset('admin/js/jquery.min.js') }}"></script>
        <script src="{{ asset('opration/jquery.validate.js') }}"></script>
        <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
        {{-- <script type="module" src="{{ asset('opration/store.js') }}"></script> --}}
        <script type="text/javascript">
            var dt = new Date();
            document.getElementById("year").innerHTML = dt.getFullYear();
        </script>

        {{-- <script type="text/javascript">
            var csrfToken = $('[name="csrf_token"]').attr('content');

            setInterval(refreshToken, 3600000); // 1 hour

            function refreshToken(){
                $.get('refresh-csrf').done(function(data){
                    csrfToken = data; // the new token
                });
            }

            setInterval(refreshToken, 3600000); // 1 hour
        </script> --}}
        @stack('js')
    </body>
</html>
