<?php

use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\LessonController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\SpeakerController;
use App\Http\Controllers\Admin\SubmissionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('partners', PartnerController::class);
    Route::resource('lessons', LessonController::class);
    Route::resource('contacts', ContactController::class);
    Route::resource('speakers', SpeakerController::class);

    Route::get('pages', [PageController::class, 'index'])->name('pages.index');
    Route::get('pages/{page}/edit', [PageController::class, 'edit'])->name('pages.edit');
    Route::put('pages/{page}', [PageController::class, 'update'])->name('pages.update');

    Route::get('submissions', [SubmissionController::class, 'index'])->name('submissions.index');
    Route::get('submissions/feedbacks/{feedback}', [SubmissionController::class, 'showFeedback'])->name('submissions.feedback');
    Route::patch('submissions/feedbacks/{feedback}/read', [SubmissionController::class, 'markFeedbackRead'])->name('submissions.feedback.read');
    Route::get('submissions/applications/{application}', [SubmissionController::class, 'showApplication'])->name('submissions.application');
    Route::patch('submissions/applications/{application}', [SubmissionController::class, 'updateApplication'])->name('submissions.application.update');
});
