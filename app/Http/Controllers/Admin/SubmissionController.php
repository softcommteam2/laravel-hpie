<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CertificateApplication;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmissionController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/submissions/index', [
            'feedbacks' => Feedback::latest()->get(),
            'applications' => CertificateApplication::latest()->get(),
        ]);
    }

    public function showFeedback(Feedback $feedback)
    {
        return Inertia::render('admin/submissions/feedback-show', [
            'feedback' => $feedback,
        ]);
    }

    public function markFeedbackRead(Feedback $feedback)
    {
        $feedback->update(['is_read' => true]);

        return back();
    }

    public function showApplication(CertificateApplication $application)
    {
        return Inertia::render('admin/submissions/application-show', [
            'application' => $application,
        ]);
    }

    public function updateApplication(Request $request, CertificateApplication $application)
    {
        $data = $request->validate([
            'status' => 'required|in:pending,reviewing,approved,denied',
            'admin_notes' => 'nullable|string|max:5000',
        ]);

        $application->update($data);

        return redirect()->route('admin.submissions.index');
    }
}
