<?php

namespace Database\Factories;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<Lesson> */
class LessonFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(4);

        return [
            'slug' => Str::slug($title) . '-' . fake()->unique()->randomNumber(4),
            'title' => $title,
            'description' => fake()->paragraph(3),
            'video_type' => 'youtube',
            'video_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'author_name' => fake()->name(),
            'author_bio' => fake()->paragraph(),
            'activity_content' => fake()->paragraphs(3, true),
            'is_published' => true,
            'sort_order' => fake()->numberBetween(0, 20),
        ];
    }
}
