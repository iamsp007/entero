<div class="value">{{ $ssn }}</div>
@if (Auth::check() && authUser()->can('view-full-ssn')) 
<div class="tooltip-container">
    <i class="fa fa-info-circle"></i>
    <p class="tooltip-content">{{$decry}}</p>
</div>
@endif