<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class ServiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(3),
            'slug' => $this->faker->slug(),
            'description' => $this->faker->paragraphs(3, true),
            'features' => json_encode([
                $this->faker->sentence(),
                $this->faker->sentence(),
                $this->faker->sentence(),
            ]),
            'price' => $this->faker->numberBetween(1000000, 5000000),
            'duration' => $this->faker->numberBetween(7, 30),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'is_featured' => $this->faker->boolean(30),
        ];
    }
}