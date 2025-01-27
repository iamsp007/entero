@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Create Company</h1>
    <form action="{{ route('companies.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" name="name" id="name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" name="email" id="email" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <textarea name="address" id="address" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn btn-success">Create</button>
    </form>
</div>
@endsection
