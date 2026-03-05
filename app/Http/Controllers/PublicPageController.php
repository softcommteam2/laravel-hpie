<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    public function home()
    {
        $page = Page::where('slug', 'home')->firstOrFail();

        return Inertia::render('public/home', [
            'page' => $page,
        ]);
    }

    public function aboutCertificate()
    {
        $page = Page::where('slug', 'about-certificate')->firstOrFail();

        return Inertia::render('public/about-certificate', [
            'page' => $page,
        ]);
    }
}
