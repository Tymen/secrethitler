@extends('layouts.app')

@section('content')
{{--    @php--}}
{{--        $end = \Carbon\Carbon::now()->addSeconds(10);--}}

{{--        dump(\Carbon\Carbon::now()->toTimeString());--}}
{{--        while(true) {--}}
{{--            dump($end->timestamp - \Carbon\Carbon::now()->timestamp);--}}
{{--            if ($end->timestamp <= \Carbon\Carbon::now()->timestamp) {--}}
{{--                break;--}}
{{--            }--}}
{{--            sleep(1);--}}
{{--        }--}}
{{--    @endphp--}}

    <div id="index"
         @if(session('message'))
            data-message="{{ session('message') }}"
         @else
            data-message="{{ false }}"
         @endif>
    </div>

@endsection
