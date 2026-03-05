<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/contacts/index', [
            'contacts' => Contact::orderBy('sort_order')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/contacts/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'calendly_url' => 'nullable|url|max:500',
            'email' => 'nullable|email|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('images/contacts', 'public');
        }

        unset($data['photo']);
        Contact::create($data);

        return redirect()->route('admin.contacts.index');
    }

    public function edit(Contact $contact)
    {
        return Inertia::render('admin/contacts/edit', [
            'contact' => $contact,
        ]);
    }

    public function update(Request $request, Contact $contact)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'calendly_url' => 'nullable|url|max:500',
            'email' => 'nullable|email|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('images/contacts', 'public');
        }

        unset($data['photo']);
        $contact->update($data);

        return redirect()->route('admin.contacts.index');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index');
    }
}
