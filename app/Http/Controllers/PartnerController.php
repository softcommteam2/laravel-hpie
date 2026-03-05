<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index()
    {
        $partners = Partner::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('public/partners', [
            'partners' => $partners,
        ]);
    }
}
