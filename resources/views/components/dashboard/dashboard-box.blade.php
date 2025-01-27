<div class="item section-box">
    <div>
        <div class="box-header">
            <span>{{ $boxTitle }}</span>
            <div class="flex-row">
                <form>
                    @csrf
                    <input type="hidden" class="chart" name="chart" value="{{ $chartType }}">
                    <input type="hidden" class="chart_slug" name="slug" value="weekly">
                    <input type="hidden" class="startDate" name="startDate" value="">
                    <input type="hidden" class="endDate" name="endDate" value="">
                    <button type="submit" class="btn btn-blue exportApplicantBtn" data-file-name="{{ $file_name ?? '' }}" data-url="{{ route('export-applicant-record') }}" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                </form>
                <a class="btn btn-blue daterangepicker-icon" data-url="{{ $daterangeUrl }}" title="Datepicker">
                    <i class="far fa-calendar-alt"></i>
                </a>
            </div>
        </div>

        <div class="filter-dropdown">
            <div class="show-date-range"></div>
        </div>
        <div id="{{ $chartId }}" class="chart-container"></div>
    </div>
    <div class="box-footer blue" data-url="{{ $footerUrl }}">
        <a class="chartOnClick active" data-period="weekly">
            <span class="d-block applicant_count {{ $class ?? ''}}">{{ $defaultCount ?? '' }}</span>
            <span class="d-block">Weekly</span>
        </a>
        <a class="chartOnClick" data-period="monthly">
            <span class="d-block applicant_count"></span>
            <span class="d-block">Monthly</span>
        </a>
        <a class="chartOnClick" data-period="yearly">
            <span class="d-block applicant_count"></span>
            <span class="d-block">Yearly</span>
        </a>
    </div>
</div>
