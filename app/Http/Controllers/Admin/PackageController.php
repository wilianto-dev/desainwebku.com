<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PackageRequest;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    public function index()
    {
        $packages = Package::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Packages/Index', [
            'packages' => $packages,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Packages/Create');
    }

    public function store(PackageRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['slug'] = Str::slug($data['name']);

        // Handle features array
        if ($request->has('features')) {
            $data['features'] = json_encode(array_filter($data['features']));
        }

        Package::create($data);

        return redirect()->route('admin.packages.index')
            ->with('success', 'Paket berhasil ditambahkan.');
    }

    public function show(Package $package)
    {
        return Inertia::render('Admin/Packages/Show', [
            'package' => $package->load('user', 'orders'),
        ]);
    }

    public function edit(Package $package)
    {
        return Inertia::render('Admin/Packages/Edit', [
            'package' => $package,
        ]);
    }

    public function update(PackageRequest $request, Package $package)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['name']);

        // Handle features array
        if ($request->has('features')) {
            $data['features'] = json_encode(array_filter($data['features']));
        }

        $package->update($data);

        return redirect()->route('admin.packages.index')
            ->with('success', 'Paket berhasil diperbarui.');
    }

    public function destroy(Package $package)
    {
        // Check if package has orders
        if ($package->orders()->count() > 0) {
            return back()->with('error', 'Tidak dapat menghapus paket yang memiliki pesanan.');
        }

        $package->delete();

        return redirect()->route('admin.packages.index')
            ->with('success', 'Paket berhasil dihapus.');
    }

    public function updateStatus(Request $request, Package $package)
    {
        $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        $package->update(['status' => $request->status]);

        return back()->with('success', 'Status paket berhasil diperbarui.');
    }

    public function updatePopular(Request $request, Package $package)
    {
        $request->validate([
            'is_popular' => 'required|boolean',
        ]);

        $package->update(['is_popular' => $request->is_popular]);

        return back()->with('success', 'Status popular berhasil diperbarui.');
    }
}