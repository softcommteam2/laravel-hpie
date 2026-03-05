<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/lessons/index', [
            'lessons' => Lesson::orderBy('sort_order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/lessons/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_type' => 'required|in:youtube,vimeo,upload',
            'video_url' => 'nullable|url|max:500',
            'author_name' => 'nullable|string|max:255',
            'author_bio' => 'nullable|string',
            'activity_content' => 'nullable|string',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
            'thumbnail' => 'nullable|image|max:2048',
            'video_file' => 'nullable|file|mimetypes:video/mp4,video/webm,video/ogg',
            'author_photo' => 'nullable|image|max:2048',
            'translations' => 'nullable|array',
            'translations.*.locale' => 'required|string|max:10',
            'translations.*.title' => 'required|string|max:255',
            'translations.*.description' => 'nullable|string',
            'translations.*.activity_content' => 'nullable|string',
        ]);

        $data['slug'] = Str::slug($data['title']) . '-' . Str::random(4);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail_path'] = $request->file('thumbnail')->store('images/lessons', 'public');
        }
        if ($request->hasFile('video_file')) {
            $data['video_path'] = $request->file('video_file')->store('videos/lessons', 'public');
        }
        if ($request->hasFile('author_photo')) {
            $data['author_photo_path'] = $request->file('author_photo')->store('images/lessons/authors', 'public');
        }

        $translations = $data['translations'] ?? [];
        unset($data['thumbnail'], $data['video_file'], $data['author_photo'], $data['translations']);

        $lesson = Lesson::create($data);

        foreach ($translations as $translation) {
            $lesson->translations()->create($translation);
        }

        return redirect()->route('admin.lessons.index');
    }

    public function edit(Lesson $lesson)
    {
        return Inertia::render('admin/lessons/edit', [
            'lesson' => $lesson->load('translations'),
        ]);
    }

    public function update(Request $request, Lesson $lesson)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_type' => 'required|in:youtube,vimeo,upload',
            'video_url' => 'nullable|url|max:500',
            'author_name' => 'nullable|string|max:255',
            'author_bio' => 'nullable|string',
            'activity_content' => 'nullable|string',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
            'thumbnail' => 'nullable|image|max:2048',
            'video_file' => 'nullable|file|mimetypes:video/mp4,video/webm,video/ogg|max:102400',
            'author_photo' => 'nullable|image|max:2048',
            'translations' => 'nullable|array',
            'translations.*.locale' => 'required|string|max:10',
            'translations.*.title' => 'required|string|max:255',
            'translations.*.description' => 'nullable|string',
            'translations.*.activity_content' => 'nullable|string',
        ]);

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail_path'] = $request->file('thumbnail')->store('images/lessons', 'public');
        }
        if ($request->hasFile('video_file')) {
            $data['video_path'] = $request->file('video_file')->store('videos/lessons', 'public');
        }
        if ($request->hasFile('author_photo')) {
            $data['author_photo_path'] = $request->file('author_photo')->store('images/lessons/authors', 'public');
        }

        $translations = $data['translations'] ?? [];
        unset($data['thumbnail'], $data['video_file'], $data['author_photo'], $data['translations']);

        $lesson->update($data);

        // Sync translations
        $lesson->translations()->delete();
        foreach ($translations as $translation) {
            $lesson->translations()->create($translation);
        }

        return redirect()->route('admin.lessons.index');
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return redirect()->route('admin.lessons.index');
    }
}
