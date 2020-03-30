@extends('layouts.app')

@section('content')

    <div id="index"
         @if(session('message'))
            data-message="{{ session('message') }}"
         @else
            data-message="{{ false }}"
         @endif>
    </div>

@endsection
