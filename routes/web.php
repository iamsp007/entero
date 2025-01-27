<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Landing\IndexController;

Route::get('/home', function () {
    return view('dashboard');
})->name('home');

Auth::routes();

Route::resource('users', UserController::class)->middleware('auth');
Route::resource('companies', CompanyController::class)->middleware('auth');
Route::resource('roles', RoleController::class)->middleware('auth');
Route::post('logout', [\App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');

//Route::middleware(['auth', 'role:super-admin'])->group(function () {
//    Route::resource('companies', CompanyController::class);
    Route::get('/users/assign-company-admin', [UserController::class, 'showAssignCompanyAdminForm'])->name('users.showAssignCompanyAdminForm');
    Route::post('/users/assign-company-admin', [UserController::class, 'assignCompanyAdmin'])->name('users.assignCompanyAdmin');
//});

Route::middleware(['auth', 'role:company-admin'])->group(function () {
    Route::get('/users/add', [UserController::class, 'showAddUserForm'])->name('users.showAddUserForm');
    Route::post('/users/add', [UserController::class, 'addUser'])->name('users.addUser');
});

Route::middleware(['auth', 'role:super-admin|company-admin'])->group(function () {
    Route::resource('users', UserController::class);
});

Route::middleware(['auth', 'role:super-admin'])->group(function () {
    Route::resource('roles', RoleController::class);
});
Route::get('/', [IndexController::class, 'index'])->name('landing-page');
