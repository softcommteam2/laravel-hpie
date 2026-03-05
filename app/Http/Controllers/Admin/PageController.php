<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/pages/index', [
            'pages' => Page::orderBy('slug')->get(),
        ]);
    }

    public function edit(Page $page)
    {
        return Inertia::render('admin/pages/edit', [
            'page' => $page,
        ]);
    }

    public function update(Request $request, Page $page)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'meta_description' => 'nullable|string|max:500',
        ]);

        $page->update($data);

        return redirect()->route('admin.pages.index');
    }
}
