@extends('layouts.app')
@section('content')

    <div id="index">

    </div>

    @if(Auth::guest())
        <p>You are <strong>not</strong> logged in</p>
    @else
        <p>You are logged in</p>
    @endif

@endsection
