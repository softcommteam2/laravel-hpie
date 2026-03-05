<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\LessonTranslation;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<LessonTranslation> */
class LessonTranslationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'lesson_id' => Lesson::factory(),
            'locale' => 'es',
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(3),
            'activity_content' => fake()->paragraphs(3, true),
        ];
    }
}
