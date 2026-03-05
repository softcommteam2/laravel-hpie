<?php

namespace Database\Factories;

use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Page> */
class PageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(2),
            'title' => fake()->sentence(3),
            'content' => fake()->paragraphs(5, true),
            'meta_description' => fake()->sentence(10),
        ];
    }
}
