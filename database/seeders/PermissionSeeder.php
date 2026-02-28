<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User permissions
            'view users',
            'create users',
            'edit users',
            'delete users',
            
            // Service permissions
            'view services',
            'create services',
            'edit services',
            'delete services',
            
            // Package permissions
            'view packages',
            'create packages',
            'edit packages',
            'delete packages',
            
            // Order permissions
            'view orders',
            'create orders',
            'edit orders',
            'delete orders',
            'update order status',
            
            // Portfolio permissions
            'view portfolios',
            'create portfolios',
            'edit portfolios',
            'delete portfolios',
            
            // Testimonial permissions
            'view testimonials',
            'create testimonials',
            'edit testimonials',
            'delete testimonials',
            'approve testimonials',
            
            // Settings permissions
            'view settings',
            'edit settings',
            
            // Activity log permissions
            'view activity logs',
            
            // Role permissions
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles
        $superAdminRole = Role::create(['name' => 'super-admin', 'guard_name' => 'web']);
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'web']);
        $customerRole = Role::create(['name' => 'customer', 'guard_name' => 'web']);

        // Assign all permissions to super-admin
        $superAdminRole->givePermissionTo(Permission::all());

        // Assign permissions to admin
        $adminPermissions = [
            'view users',
            'view services', 'create services', 'edit services', 'delete services',
            'view packages', 'create packages', 'edit packages', 'delete packages',
            'view orders', 'edit orders', 'update order status',
            'view portfolios', 'create portfolios', 'edit portfolios', 'delete portfolios',
            'view testimonials', 'edit testimonials', 'approve testimonials',
            'view settings', 'edit settings',
            'view activity logs',
        ];
        $adminRole->givePermissionTo($adminPermissions);

        // Assign permissions to customer
        $customerPermissions = [
            'create orders',
            'view orders',
        ];
        $customerRole->givePermissionTo($customerPermissions);

        // Assign roles to users (assuming user IDs 1, 2, 3 exist)
        // This will be handled in UserSeeder
    }
}