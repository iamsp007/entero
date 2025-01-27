<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Permissions
        Permission::create(['name' => 'manage users']);
        Permission::create(['name' => 'manage companies']);
        Permission::create(['name' => 'assign roles']);

        // Roles
        $superAdmin = Role::create(['name' => 'super-admin']);
        $companyAdmin = Role::create(['name' => 'company-admin']);

        $superAdmin->givePermissionTo(Permission::all());
    }
}
