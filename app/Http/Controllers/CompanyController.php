<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use Spatie\Permission\Models\Role;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::with('users')->paginate(10);
        return view('companies.index', compact('companies'));
    }

    public function create()
    {
        return view('companies.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:companies,email',
            'address' => 'required|string|max:255',
        ]);

        $company = Company::create($request->all());

        return redirect()->route('companies.index')->with('success', 'Company created successfully!');
    }

    public function show(Company $company)
    {
        $users = $company->users; // Fetch users associated with the company
        return view('companies.show', compact('company', 'users'));
    }

    public function edit(Company $company)
    {
        return view('companies.edit', compact('company'));
    }

    public function update(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:companies,email,' . $company->id,
            'address' => 'required|string|max:255',
        ]);

        $company->update($request->all());

        return redirect()->route('companies.index')->with('success', 'Company updated successfully!');
    }

    public function destroy(Company $company)
    {
        $company->delete();
        return redirect()->route('companies.index')->with('success', 'Company deleted successfully!');
    }
}
