<ul class="group-listing">
    @foreach ($topics as $topic)
        <li>
            {{-- <a class="title" title="{{ $topic->name }}" href="{{ route('video.index', ['topic_id' => $topic->id]) }}"> --}}
                <a class="title" title="{{ $topic->name }}" href="{{ route('traininguser.index', ['topic_id' => $topic->id]) }}">
              {{-- <a class="title" href="{{ route('video.index', $topic->id) }}"> --}}
                {{ strlen($topic->name) > 25 ? substr($topic->name, 0, 25) . '...' : $topic->name }}
            </a>
            <div class="group-details">
                <ul>
                    {{-- <li><b>Start :</b> {{ $topic->active_date ? \Carbon\Carbon::parse($topic->active_date)->format('M d, Y') : 'N/A' }}</li>
                    <li><b>Cut Off :</b> {{ $topic->cut_off_date ? \Carbon\Carbon::parse($topic->cut_off_date)->format('M d, Y') : 'N/A' }}</li> --}}
                    <li><b>Start&nbsp;&nbsp;<i class="far fa-calendar-check"></i> &nbsp;&nbsp;:</b>{{ $topic->active_date ? \Carbon\Carbon::parse($topic->active_date)->format('m/d/Y') : 'N/A' }}</li>
                    <li><b>Cut Off&nbsp;&nbsp;<i class="far fa-calendar-times"></i> &nbsp;&nbsp;:</b> {{ $topic->cut_off_date ? \Carbon\Carbon::parse($topic->cut_off_date)->format('m/d/Y') : 'N/A' }}</li>
                    {{-- <li><b>Videos :</b> {{ $topic->videos->count() ?? 0 }}</li>
                    <li><b>Members :</b> {{ $topic->users->count() ?? 0 }}</li> --}}
                    <li class="merge-2cols"><b>Category&nbsp;&nbsp;:</b> {{ $topic->category->name ?? 'No Category' }}</li>
                    <li class="merge-2cols">
                        <b>Status :</b>
                        @can('training-edit-topic-status')
                            <select class="class-status" data-id="{{ $topic->id }}">
                                @if($topic->status == 'EXPIRED')
                                    <option value="EXPIRED" selected>Expired</option>
                                @else
                                    <option value="ACTIVE" {{ $topic->status == 'ACTIVE' ? 'selected' : '' }}>Active</option>
                                    <option value="IN ACTIVE" {{ $topic->status == 'IN ACTIVE' ? 'selected' : '' }}>In-Active</option>
                                    <option value="HOLD" {{ $topic->status == 'HOLD' ? 'selected' : '' }}>Hold</option>
                                @endif
                            </select>
                        @else
                            <span>{{ ucfirst($topic->status) }}</span>
                        @endcan                            
                    </li>
                </ul>
            </div>
            <hr/>
            <div class="footer">
                {{-- <div class="allicant-status">
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width:40.00%;"></div>
                        <div class="progress-bar-path"></div>
                    </div>
                    <div class="value">40.00%</div>
                </div> --}}
                <div class="allicant-status">
                    <div class="progress-bar-container">
                        <div class="progress-bar" title="{{ $topic->progress }}% Complete" style="width:{{ $topic->progress }}%;"></div>
                        <div class="progress-bar-path"></div>
                    </div>
                    
                    {{-- <div title="Topic Progress" class="value">{{ $topic->progress }}%</div> --}}
                </div>
                <div>
                    <i title="Hours" class="fas fa-hourglass-half"></i> : 
                    @if(isset($topic_durations[$topic->id]))
                        {{ $topic_durations[$topic->id] }}
                    @else
                        00:00
                    @endif
                    {{-- {{ dd($topic->total_duration) }} --}}
                </div>
                <div>
                    <i title="Videos" class="fas fa-video"></i> : {{ $topic->videos->count() ?? 0 }}
                </div>
                <div>
                    <i title="Users" class="fas fa-user"></i> : {{ $topic->users->count() ?? 0 }}
                </div>
                <div class="btns">
                    @can('training-edit-topic')
                        <a class="edit-group" title="Edit" onclick="createorupdateTopic(this)" data-id="{{ $topic->id }}">
                            <i class="fas fa-edit"></i>
                        </a>
                    @endcan
                    @can('training-delete-topic')
                        <a href="javascript:void(0);" onclick="deleteTopic(this)" class="delete-group" title="Delete" data-id="{{ $topic->id }}">
                            <i class="fas fa-trash-alt"></i>
                        </a>
                    @endcan
                </div>
            </div>
            
        </li>
    @endforeach
</ul>