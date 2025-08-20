<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'manage users', 'manage inventory', 'view reports', 'configure settings',
            'update production', 'view orders', 'place orders'
        ];
        foreach ($permissions as $p) {
            Permission::firstOrCreate(['name' => $p, 'guard_name' => 'web']);
        }

        $admin = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $staff = Role::firstOrCreate(['name' => 'Staff', 'guard_name' => 'web']);
        $customer = Role::firstOrCreate(['name' => 'Customer', 'guard_name' => 'web']);

        $admin->syncPermissions($permissions);
        $staff->syncPermissions(['manage inventory','update production','view orders','view reports']);
        $customer->syncPermissions(['place orders']);
    }
}

