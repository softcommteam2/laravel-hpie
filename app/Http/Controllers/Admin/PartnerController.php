<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/partners/index', [
            'partners' => Partner::orderBy('sort_order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/partners/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'website_url' => 'nullable|url|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'logo' => 'nullable|image|max:2048',
        ]);

        $data['slug'] = Str::slug($data['name']) . '-' . Str::random(4);

        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('images/partners', 'public');
        }

        unset($data['logo']);
        Partner::create($data);

        return redirect()->route('admin.partners.index');
    }

    public function edit(Partner $partner)
    {
        return Inertia::render('admin/partners/edit', [
            'partner' => $partner,
        ]);
    }

    public function update(Request $request, Partner $partner)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'website_url' => 'nullable|url|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('images/partners', 'public');
        }

        unset($data['logo']);
        $partner->update($data);

        return redirect()->route('admin.partners.index');
    }

    public function destroy(Partner $partner)
    {
        $partner->delete();

        return redirect()->route('admin.partners.index');
    }
}
