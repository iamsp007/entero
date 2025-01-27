@foreach($videos as $video)
    <div class="video-item" data-id="{{ $video->id }}">
        <span class="counter"></span>
            {{-- <figure>
                <div class="videoloader" style="{{ $video->thumbnail_path ? 'display:none;' : '' }}"><span></span></div>
                <img class="video-thumbnail" src="{{ $video->thumbnail_path ? asset('storage/' . $video->thumbnail_path) : '' }}" style="{{ $video->thumbnail_path ? '' : 'display:none;' }}">
                <i class="far fa-play-circle play-icon" style="display:none;"></i>
            </figure> --}}
            <figure>
                <div class="videoloader" style="{{ $video->thumbnail_path ? 'display:none;' : '' }}"><span></span></div>
                <img class="video-thumbnail" 
                     src="{{ $video->thumbnail_path ? asset('storage/' . $video->thumbnail_path) : '' }}"
                     data-default-thumbnail="{{ asset('storage/thumbnails/no-thumbnail.jpg') }}"
                     style="{{ $video->thumbnail_path ? '' : 'display:none;' }}">
                {{-- <i class="far fa-play-circle play-icon" style="display:none;" title="Play Video"></i> --}}
                <i class="fas fa-sync-alt regenerate-icon" data-video-id="{{ $video->id }}"  title="Re-Generate Thumbnail" style="display:none;"></i>
            </figure>
            <b class="video-title">{{ Str::limit($video->title, 21, '. . .') }}</b>
            <span class="video-desc">{{ Str::limit($video->description, 1000) }}</span>
            <div class="btns">
                <div>
                    @if(strlen($video->description) > 25)
                        <a href="#" class="read-more">Read more...</a>
                    @endif
                </div>
                <div class="right-btns">
                    <a class="preview video-preview" title="Preview" data-video-url="{{ asset('storage/' . $video->file_name) }}" href="#">
                        <i class="fas fa-play-circle"></i>
                    </a>
                    @can('training-edit-library')
                        <a class="edit" title="Edit" href="{{ route('library.edit', $video->id) }}"><i class="fas fa-edit"></i></a>
                    @endcan
                    @can('training-delete-library')
                        <a href="javascript:void(0)" class="delete" title="Delete" data-id="{{ $video->id }}"><i class="far fa-trash-alt"></i></a>
                    @endcan
                </div>
            </div>
    </div>
@endforeach