@extends('layouts.guest')

@section('title') Restricted @stop

@section('content')
    <div class="popup" data-popup="timesheet-link-no-longer-active-popup" style="display: block;">
        <div class="popup-flex">
            <div class="popup-inner timesheet-link-no-longer-active">
                <div class="company-logo">
                @isset ($company_logo)
                    <img src="{{ $company_logo }}">
                @else
                    <img src="{{ asset('email-template/Gimbal-New-Logo.png') }}">
                @endif
                </div>
                <div class="message">
                    <img src="{{ asset('timesheet/images/tick.svg') }}" class="tick" />

                    @isset ($message)
                        {!! $message !!}
                    @else
                        This electronic compliance link is no longer active. If this compliance has not been completed, you will receive a new link shortly.<br />Thank You.
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection

@push('styles')
    <link type="text/css" href="{{ asset('admin/css/timesheet.css') }}" rel="stylesheet" />
@endpush
