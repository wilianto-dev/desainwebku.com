<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PortfolioRequest;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolios = Portfolio::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Portfolios/Index', [
            'portfolios' => $portfolios,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Portfolios/Create');
    }

    public function store(PortfolioRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['slug'] = Str::slug($data['title']);

        // Handle image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('portfolios', 'public');
        }

        // Set published_at if status is published
        if ($data['status'] === 'published') {
            $data['published_at'] = now();
        }

        Portfolio::create($data);

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio berhasil ditambahkan.');
    }

    public function show(Portfolio $portfolio)
    {
        return Inertia::render('Admin/Portfolios/Show', [
            'portfolio' => $portfolio->load('user'),
        ]);
    }

    public function edit(Portfolio $portfolio)
    {
        return Inertia::render('Admin/Portfolios/Edit', [
            'portfolio' => $portfolio,
        ]);
    }

    public function update(PortfolioRequest $request, Portfolio $portfolio)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($portfolio->image) {
                \Storage::disk('public')->delete($portfolio->image);
            }
            $data['image'] = $request->file('image')->store('portfolios', 'public');
        }

        // Update published_at if status changed to published
        if ($data['status'] === 'published' && !$portfolio->published_at) {
            $data['published_at'] = now();
        }

        $portfolio->update($data);

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio berhasil diperbarui.');
    }

    public function destroy(Portfolio $portfolio)
    {
        // Delete image if exists
        if ($portfolio->image) {
            \Storage::disk('public')->delete($portfolio->image);
        }

        $portfolio->delete();

        return redirect()->route('admin.portfolios.index')
            ->with('success', 'Portfolio berhasil dihapus.');
    }

    public function updateStatus(Request $request, Portfolio $portfolio)
    {
        $request->validate([
            'status' => 'required|in:draft,published',
        ]);

        $data = ['status' => $request->status];
        
        if ($request->status === 'published' && !$portfolio->published_at) {
            $data['published_at'] = now();
        }

        $portfolio->update($data);

        return back()->with('success', 'Status portfolio berhasil diperbarui.');
    }
}