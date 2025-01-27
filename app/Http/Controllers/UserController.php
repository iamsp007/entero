<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles')->paginate(10); // Include roles for display
        return view('users.index', compact('users'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    $roles = Role::all(); // Get all available roles
    return view('users.create', compact('roles'));
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:8|confirmed',
        'role' => 'required|exists:roles,name', // Ensure the role exists
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password),
    ]);

    $user->assignRole($request->role); // Assign role to user

    return redirect()->route('users.index')->with('success', 'User created successfully!');
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
    public function edit(User $user)
{
    $roles = Role::all(); // Get all roles
    return view('users.edit', compact('user', 'roles'));
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'role' => 'required|exists:roles,name',
    ]);

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
    ]);

    $user->syncRoles([$request->role]); // Sync roles to ensure only one role is assigned

    return redirect()->route('users.index')->with('success', 'User updated successfully!');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully!');
    }
    public function assignCompanyAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'company_id' => 'required|exists:companies,id',
        ]);

        // Create the user and assign as company admin
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'company_id' => $request->company_id,
        ]);

        $user->assignRole('company-admin');

        return redirect()->back()->with('success', 'Company Admin assigned successfully!');
    }
    public function showAssignCompanyAdminForm()
    {
        $companies = Company::all();
        return view('users.assignCompanyAdmin', compact('companies'));
    }
    
    public function addUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|exists:roles,name',
        ]);

        // Create the user and associate them with the company
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'company_id' => auth()->user()->company_id,
        ]);

        // Assign the specified role
        $user->assignRole($request->role);

        return redirect()->back()->with('success', 'User added successfully!');
    }
    
    public function showAddUserForm()
    {
        $roles = Role::where('name', '!=', 'super-admin')->get();
        return view('users.addUser', compact('roles'));
    }




}
