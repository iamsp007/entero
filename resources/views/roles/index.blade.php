@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Roles</h1>
    <a href="{{ route('roles.create') }}" class="btn btn-primary mb-3">Add Role</a>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($roles as $role)
            <tr>
                <td>{{ $role->name }}</td>
                <td>
                    <a href="{{ route('roles.edit', $role) }}" class="btn btn-warning btn-sm">Edit</a>
                    <form action="{{ route('roles.destroy', $role) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    {{ $roles->links() }}
</div>
@endsection
