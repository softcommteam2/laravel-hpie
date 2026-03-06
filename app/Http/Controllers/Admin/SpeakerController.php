<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Speaker;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class SpeakerController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/speakers/index', [
            'speakers' => Speaker::orderBy('event_date')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/speakers/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'event_date' => 'nullable|date_format:Y-m-d',
            'event_time' => 'nullable|string|max:10',
            'event_link' => 'nullable|url|max:500',
            'semester' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data['event_date'] = $request->filled('event_date')
            ? Carbon::parse($request->string('event_date'))->toDateString()
            : null;

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('images/speakers', 'public');
        }

        unset($data['photo']);
        Speaker::create($data);

        return redirect()->route('admin.speakers.index');
    }

    public function edit(Speaker $speaker)
    {
        return Inertia::render('admin/speakers/edit', [
            'speaker' => $speaker,
        ]);
    }

    public function update(Request $request, Speaker $speaker)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'event_date' => 'nullable|date_format:Y-m-d',
            'event_time' => 'nullable|string|max:10',
            'event_link' => 'nullable|url|max:500',
            'semester' => 'nullable|string|max:50',
            'is_active' => 'boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data['event_date'] = $request->filled('event_date')
            ? Carbon::parse($request->string('event_date'))->toDateString()
            : null;

        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('images/speakers', 'public');
        }

        unset($data['photo']);
        $speaker->update($data);

        return redirect()->route('admin.speakers.index');
    }

    public function destroy(Speaker $speaker)
    {
        $speaker->delete();

        return redirect()->route('admin.speakers.index');
    }
}
