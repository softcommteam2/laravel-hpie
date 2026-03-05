<?php

namespace Database\Seeders;

use App\Models\CertificateApplication;
use App\Models\Contact;
use App\Models\Feedback;
use App\Models\Lesson;
use App\Models\LessonTranslation;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Speaker;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@hpie.org',
        ]);

        Partner::factory(6)->create();

        $lessons = Lesson::factory(8)->create();
        foreach ($lessons as $lesson) {
            LessonTranslation::factory()->create([
                'lesson_id' => $lesson->id,
                'locale' => 'es',
            ]);
            LessonTranslation::factory()->create([
                'lesson_id' => $lesson->id,
                'locale' => 'fr',
            ]);
        }

        Contact::factory(4)->create();
        Speaker::factory(6)->create();
        Feedback::factory(10)->create();
        CertificateApplication::factory(5)->create();

        Page::create([
            'slug' => 'home',
            'title' => 'Welcome to HPIE International',
            'content' => 'HPIE International is dedicated to providing high-quality health professions education to communities around the world. Our mission is to bridge the gap between healthcare education and underserved populations through innovative lessons, partnerships, and community engagement.',
            'meta_description' => 'HPIE International - Health Professions Interprofessional Education',
        ]);

        Page::create([
            'slug' => 'about-certificate',
            'title' => 'About the HPIE Certificate',
            'content' => 'The HPIE Certificate Program recognizes individuals who have completed our comprehensive health professions education curriculum. To earn your certificate, complete all available lessons and submit your application for review. Our team will verify your completion status and process your certificate.',
            'meta_description' => 'Learn about the HPIE Certificate Program and how to earn your certificate.',
        ]);
    }
}
