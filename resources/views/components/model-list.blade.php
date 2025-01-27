@foreach($libraryVideos as $video)
    <label  class="video-item" data-id="{{ $video->id }}">
        {{-- <div class="checkbox">
            <input type="checkbox" id="video{{ $video->id }}" name="video_ids[]" value="{{ $video->id }}">
            <label for="video{{ $video->id }}"></label>
        </div> --}}
        <div class="checkbox">
            <input type="checkbox"id="video{{ $video->id }}"name="video_ids[]"value="{{ $video->id }}" {{ in_array($video->id, $associatedVideoIds) ? 'checked disabled' : '' }}>
            <label for="video{{ $video->id }}"></label>
        </div>        
            <figure>
                <i class="far fa-play-circle play-icon"></i>
                <img src="{{ asset('storage/' . $video->thumbnail_path) }}">
            </figure>
            <b class="video-title">{{ Str::limit($video->title, 21, '. . .') }}</b>
            <span class="video-desc">{{ Str::limit($video->description, 1000) }}</span>
            <div class="btns">
                <div>
                    @if(strlen($video->description) > 55)
                        <a href="#" class="read-more">Read more...</a>
                    @endif
                </div>
                <div>
                    <a class="preview video-preview" title="Preview" data-video-url="{{ asset('storage/' . $video->file_name) }}" href="#">
                        <i class="fas fa-play-circle"></i>
                    </a>
                    {{-- <a class="edit" title="Edit" href="{{ route('library.edit', $video->id) }}"><i class="fas fa-edit"></i></a>
                    <a href="javascript:void(0)" class="delete" title="Delete" data-id="{{ $video->id }}"><i class="far fa-trash-alt"></i></a> --}}
                </div>
            </div>                     
    </label >
@endforeach