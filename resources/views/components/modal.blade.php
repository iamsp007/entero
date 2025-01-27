<div class="modal fade modal-wrapper" id="modal" tabindex="-1" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                @if (!empty($title))
                    <div class="popup-title">
                        {{ $title }}
                    </div>
                @endif

                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
                    <x-svg.modal-close/>
                </button>
            </div>

            <div class="modal-body">
                {!! $slot !!}
            </div>
        </div>
    </div>
</div>
