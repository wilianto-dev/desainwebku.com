<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['active', 'inactive', 'banned'];
        $providers = ['google', 'facebook', 'github', null];

        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => fake()->boolean(80) ? now() : null,
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'provider' => fake()->randomElement($providers),
            'provider_id' => function (array $attributes) {
                return $attributes['provider'] ? fake()->uuid() : null;
            },
            'avatar' => function (array $attributes) {
                if ($attributes['provider']) {
                    return fake()->imageUrl(200, 200, 'people', true, 'avatar');
                }
                return 'https://ui-avatars.com/api/?name=' . urlencode(fake()->name()) . '&background=0D8F81&color=fff';
            },
            'phone' => fake()->boolean(70) ? fake()->phoneNumber() : null,
            'status' => fake()->randomElement($statuses),
            'last_login_at' => fake()->boolean(60) ? fake()->dateTimeBetween('-30 days', 'now') : null,
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => function (array $attributes) {
                return fake()->dateTimeBetween($attributes['created_at'], 'now');
            },
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the user is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the user is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }

    /**
     * Indicate that the user is banned.
     */
    public function banned(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'banned',
        ]);
    }

    /**
     * Indicate that the user has a specific provider.
     */
    public function withProvider(string $provider): static
    {
        return $this->state(fn (array $attributes) => [
            'provider' => $provider,
            'provider_id' => fake()->uuid(),
        ]);
    }

    /**
     * Configure the model to be a super admin.
     */
    public function asSuperAdmin(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('super-admin');
        });
    }

    /**
     * Configure the model to be an admin.
     */
    public function asAdmin(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('admin');
        });
    }

    /**
     * Configure the model to be a customer.
     */
    public function asCustomer(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole('customer');
        });
    }
}