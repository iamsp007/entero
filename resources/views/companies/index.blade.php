@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Companies</h1>
    <a href="{{ route('companies.create') }}" class="btn btn-primary mb-3">Add Company</a>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($companies as $company)
            <tr>
                <td>{{ $company->name }}</td>
                <td>{{ $company->email }}</td>
                <td>{{ $company->address }}</td>
                <td>
                    <a href="{{ route('companies.edit', $company) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ route('companies.destroy', $company) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    {{ $companies->links() }}
</div>
@endsection
