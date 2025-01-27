<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $roles = Role::paginate(10); // Paginate roles
    return view('roles.index', compact('roles'));
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    return view('roles.create');
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|unique:roles,name|max:255',
    ]);

    Role::create(['name' => $request->name]);

    return redirect()->route('roles.index')->with('success', 'Role created successfully!');
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
{
    return view('roles.edit', compact('role'));
}


    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Role $role)
{
    $request->validate([
        'name' => 'required|unique:roles,name,' . $role->id . '|max:255',
    ]);

    $role->update(['name' => $request->name]);

    return redirect()->route('roles.index')->with('success', 'Role updated successfully!');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
{
    $role->delete();
    return redirect()->route('roles.index')->with('success', 'Role deleted successfully!');
}

}
