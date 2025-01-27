<div class="allicant-status">
    <div class="flex-row">
        <b>Step {{ $stepNo ?? '' }}</b>
        <div class="value">{{ $progress }}%</div>
    </div>
    <div class="progress-bar-container">
        <div class="progress-bar" style="width:{{ $progress }}%;"></div>
        <div class="progress-bar-path"></div>
    </div>
</div>