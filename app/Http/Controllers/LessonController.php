<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonCompletion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index(Request $request)
    {
        $query = Lesson::where('is_published', true);

        if ($subject = $request->input('subject')) {
            $query->where('subject', $subject);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ilike', "%{$search}%")
                    ->orWhere('description', 'ilike', "%{$search}%")
                    ->orWhere('author_name', 'ilike', "%{$search}%");
            });
        }

        $sort = $request->input('sort', 'featured');
        match ($sort) {
            'trending' => $query->orderByDesc('view_count'),
            'newest' => $query->orderByDesc('created_at'),
            'most_views' => $query->orderByDesc('view_count'),
            default => $query->orderBy('sort_order'),
        };

        return Inertia::render('public/lessons/index', [
            'lessons' => $query->paginate(12)->withQueryString(),
            'search' => $search ?? '',
            'subject' => $subject ?? '',
            'sort' => $sort,
        ]);
    }

    public function show(string $slug)
    {
        $lesson = Lesson::where('slug', $slug)
            ->where('is_published', true)
            ->with('translations')
            ->firstOrFail();

        $lesson->increment('view_count');

        return Inertia::render('public/lessons/show', [
            'lesson' => $lesson,
            'isCompleted' => false,
        ]);
    }

    public function complete(Request $request, string $slug)
    {
        $request->validate(['email' => 'required|email']);

        $lesson = Lesson::where('slug', $slug)->firstOrFail();

        LessonCompletion::firstOrCreate(
            ['email' => $request->email, 'lesson_id' => $lesson->id],
            ['completed_at' => now()]
        );

        return back();
    }
}
