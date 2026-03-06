<?php

use App\Http\Controllers\ConnectController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PublicPageController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [PublicPageController::class, 'home'])->name('home');
Route::get('/about-certificate', [PublicPageController::class, 'aboutCertificate'])->name('about-certificate');
Route::get('/partners', [PartnerController::class, 'index'])->name('partners');

Route::get('/lessons', [LessonController::class, 'index'])->name('lessons.index');
Route::get('/lessons/{slug}', [LessonController::class, 'show'])->name('lessons.show');
Route::post('/lessons/{slug}/complete', [LessonController::class, 'complete'])->name('lessons.complete');

Route::get('/connect/one-on-one', [ConnectController::class, 'oneOnOne'])->name('connect.one-on-one');
Route::get('/connect/speakers', [ConnectController::class, 'speakers'])->name('connect.speakers');
Route::get('/connect/feedback', [ConnectController::class, 'feedbackForm'])->name('connect.feedback');
Route::post('/connect/feedback', [ConnectController::class, 'submitFeedback'])->name('connect.feedback.submit');
Route::get('/connect/apply', [ConnectController::class, 'applyForm'])->name('connect.apply');
Route::post('/connect/apply', [ConnectController::class, 'submitApplication'])->name('connect.apply.submit');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('admin')->group(function () {
        Route::inertia('dashboard', 'dashboard')->name('dashboard');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
