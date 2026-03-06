<?php

namespace App\Http\Controllers;

use App\Http\Requests\CertificateApplicationRequest;
use App\Http\Requests\FeedbackRequest;
use App\Models\CertificateApplication;
use App\Models\Contact;
use App\Models\Feedback;
use App\Models\Lesson;
use App\Models\LessonCompletion;
use App\Models\Speaker;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ConnectController extends Controller
{
    public function oneOnOne()
    {
        $contacts = Contact::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('public/connect/one-on-one', [
            'contacts' => $contacts,
        ]);
    }

    public function speakers(Request $request)
    {
        $currentSemester = $request->input('semester', 'all');

        $query = Speaker::where('is_active', true)->orderBy('event_date');

        if ($currentSemester !== 'all') {
            $query->where('semester', $currentSemester);
        }

        $semesters = Speaker::where('is_active', true)
            ->whereNotNull('semester')
            ->distinct()
            ->pluck('semester')
            ->sort()
            ->values()
            ->all();

        return Inertia::render('public/connect/speakers', [
            'speakers' => $query->get(),
            'semesters' => $semesters,
            'currentSemester' => $currentSemester,
        ]);
    }

    public function feedbackForm()
    {
        return Inertia::render('public/connect/feedback');
    }

    public function submitFeedback(FeedbackRequest $request)
    {
        Feedback::create($request->validated());

        return back();
    }

    public function applyForm(Request $request)
    {
        $totalLessons = Lesson::where('is_published', true)->count();
        $rawEmail = $request->input('email', $request->session()->get('lesson_completion_email', ''));
        $progressEmail = Str::lower(trim((string) $rawEmail));
        $completedLessons = 0;

        if ($progressEmail !== '' && filter_var($progressEmail, FILTER_VALIDATE_EMAIL)) {
            $completedLessons = LessonCompletion::where('email', $progressEmail)
                ->whereHas('lesson', fn ($q) => $q->where('is_published', true))
                ->count();
        }

        return Inertia::render('public/connect/apply', [
            'totalLessons' => $totalLessons,
            'completedLessons' => $completedLessons,
            'progressEmail' => $progressEmail,
        ]);
    }

    public function submitApplication(CertificateApplicationRequest $request)
    {
        CertificateApplication::create($request->validated());

        return back();
    }
}
