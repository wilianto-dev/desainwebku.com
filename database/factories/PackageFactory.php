<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class PackageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->words(2, true) . ' Package',
            'slug' => $this->faker->slug(),
            'description' => $this->faker->paragraphs(2, true),
            'features' => json_encode([
                $this->faker->sentence(),
                $this->faker->sentence(),
                $this->faker->sentence(),
                $this->faker->sentence(),
            ]),
            'price' => $this->faker->numberBetween(500000, 3000000),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'is_popular' => $this->faker->boolean(20),
        ];
    }
}