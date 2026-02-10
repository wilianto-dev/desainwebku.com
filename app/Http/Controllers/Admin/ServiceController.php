<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('user')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Services/Index', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Services/Create');
    }

    public function store(ServiceRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['slug'] = Str::slug($data['title']);

        // Handle features array
        if ($request->has('features')) {
            $data['features'] = json_encode(array_filter($data['features']));
        }

        Service::create($data);

        return redirect()->route('admin.services.index')
            ->with('success', 'Layanan berhasil ditambahkan.');
    }

    public function show(Service $service)
    {
        return Inertia::render('Admin/Services/Show', [
            'service' => $service->load('user', 'orders'),
        ]);
    }

    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Edit', [
            'service' => $service,
        ]);
    }

    public function update(ServiceRequest $request, Service $service)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);

        // Handle features array
        if ($request->has('features')) {
            $data['features'] = json_encode(array_filter($data['features']));
        }

        $service->update($data);

        return redirect()->route('admin.services.index')
            ->with('success', 'Layanan berhasil diperbarui.');
    }

    public function destroy(Service $service)
    {
        // Check if service has orders
        if ($service->orders()->count() > 0) {
            return back()->with('error', 'Tidak dapat menghapus layanan yang memiliki pesanan.');
        }

        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Layanan berhasil dihapus.');
    }

    public function updateStatus(Request $request, Service $service)
    {
        $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        $service->update(['status' => $request->status]);

        return back()->with('success', 'Status layanan berhasil diperbarui.');
    }

    public function updateFeatured(Request $request, Service $service)
    {
        $request->validate([
            'is_featured' => 'required|boolean',
        ]);

        $service->update(['is_featured' => $request->is_featured]);

        return back()->with('success', 'Status featured berhasil diperbarui.');
    }
}