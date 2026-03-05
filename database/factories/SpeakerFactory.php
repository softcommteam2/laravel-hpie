<?php

namespace Database\Factories;

use App\Models\Speaker;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Speaker> */
class SpeakerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'title' => fake()->jobTitle(),
            'bio' => fake()->paragraph(2),
            'event_date' => fake()->dateTimeBetween('+1 week', '+3 months'),
            'event_time' => fake()->time('H:i'),
            'event_link' => fake()->url(),
            'semester' => fake()->randomElement(['Spring 2026', 'Fall 2026']),
            'is_active' => true,
        ];
    }
}
