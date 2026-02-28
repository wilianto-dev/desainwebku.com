<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'status' => 'active',
            'phone' => '+6281234567890',
            'last_login_at' => now(),
        ]);
        $superAdmin->assignRole('super-admin');

        // Create Admin
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'status' => 'active',
            'phone' => '+6281234567891',
            'last_login_at' => now(),
        ]);
        $admin->assignRole('admin');

        // Create Customers
        $customers = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'phone' => '+6281234567892',
                'provider' => 'google',
                'provider_id' => 'google_12345',
                'avatar' => 'https://ui-avatars.com/api/?name=John+Doe&background=0D8F81&color=fff',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'phone' => '+6281234567893',
                'provider' => 'facebook',
                'provider_id' => 'fb_12345',
                'avatar' => 'https://ui-avatars.com/api/?name=Jane+Smith&background=0D8F81&color=fff',
            ],
            [
                'name' => 'Bob Johnson',
                'email' => 'bob@example.com',
                'phone' => '+6281234567894',
                'provider' => null,
                'provider_id' => null,
                'avatar' => 'https://ui-avatars.com/api/?name=Bob+Johnson&background=0D8F81&color=fff',
            ],
            [
                'name' => 'Alice Williams',
                'email' => 'alice@example.com',
                'phone' => '+6281234567895',
                'status' => 'inactive',
            ],
            [
                'name' => 'Charlie Brown',
                'email' => 'charlie@example.com',
                'phone' => '+6281234567896',
                'status' => 'banned',
            ],
        ];

        foreach ($customers as $customerData) {
            $customer = User::create(array_merge($customerData, [
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'last_login_at' => now()->subDays(rand(1, 30)),
            ]));
            $customer->assignRole('customer');
        }

        // Create additional 10 random customers using factory if available
        if (class_exists(\Database\Factories\UserFactory::class)) {
            User::factory()->count(10)->create()->each(function ($user) {
                $user->assignRole('customer');
            });
        }
    }
}