<?php

namespace Database\Factories;

use App\Models\CertificateApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<CertificateApplication> */
class CertificateApplicationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'institution' => fake()->company() . ' University',
            'program' => fake()->randomElement(['Education', 'Public Health', 'Social Work', 'Nursing']),
            'statement' => fake()->paragraphs(2, true),
            'status' => fake()->randomElement(['pending', 'reviewing', 'approved', 'denied']),
        ];
    }
}
