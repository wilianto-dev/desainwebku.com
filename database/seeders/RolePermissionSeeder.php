<?php
// database/seeders/RolePermissionSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Dashboard
            'view dashboard',
            
            // Services
            'manage services',
            'view services',
            
            // Packages
            'manage packages',
            'view packages',
            
            // Orders
            'manage orders',
            'view orders',
            
            // Portfolio
            'manage portfolio',
            'view portfolio',
            
            // Testimonials
            'manage testimonials',
            'view testimonials',
            
            // Pages
            'manage pages',
            'view pages',
            
            // Users
            'manage users',
            
            // Settings
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $editor = Role::create(['name' => 'editor']);
        $editor->givePermissionTo([
            'view dashboard',
            'manage services',
            'view services',
            'manage packages',
            'view packages',
            'view orders',
            'manage portfolio',
            'view portfolio',
            'manage testimonials',
            'view testimonials',
            'manage pages',
            'view pages',
        ]);

        $user = Role::create(['name' => 'user']);
        $user->givePermissionTo([
            'view services',
            'view packages',
            'view portfolio',
            'view testimonials',
            'view pages',
        ]);
    }
}