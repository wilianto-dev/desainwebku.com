<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Service;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'service', 'package'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function create()
    {
        $services = Service::active()->get();
        $packages = Package::active()->get();

        return Inertia::render('Admin/Orders/Create', [
            'services' => $services,
            'packages' => $packages,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'service_id' => 'nullable|required_without:package_id|exists:services,id',
            'package_id' => 'nullable|required_without:service_id|exists:packages,id',
            'total_price' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        // Generate order number
        $order = new Order($validated);
        $order->order_number = $order->generateOrderNumber();
        $order->save();

        return redirect()->route('admin.orders.index')
            ->with('success', 'Pesanan berhasil dibuat.');
    }

    public function show(Order $order)
    {
        $order->load(['user', 'service', 'package']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    public function edit(Order $order)
    {
        $services = Service::active()->get();
        $packages = Package::active()->get();

        $order->load(['user', 'service', 'package']);

        return Inertia::render('Admin/Orders/Edit', [
            'order' => $order,
            'services' => $services,
            'packages' => $packages,
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'service_id' => 'nullable|required_without:package_id|exists:services,id',
            'package_id' => 'nullable|required_without:service_id|exists:packages,id',
            'status' => 'required|in:pending,paid,completed,cancelled',
            'total_price' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        // Update paid_at if status changed to paid
        if ($request->status === 'paid' && $order->status !== 'paid') {
            $validated['paid_at'] = now();
        }

        $order->update($validated);

        return redirect()->route('admin.orders.index')
            ->with('success', 'Pesanan berhasil diperbarui.');
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('admin.orders.index')
            ->with('success', 'Pesanan berhasil dihapus.');
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,completed,cancelled',
        ]);

        $data = ['status' => $request->status];
        
        if ($request->status === 'paid' && !$order->paid_at) {
            $data['paid_at'] = now();
        }

        $order->update($data);

        return back()->with('success', 'Status pesanan berhasil diperbarui.');
    }

    // Method untuk user biasa
    public function userOrders(Request $request)
    {
        $orders = $request->user()->orders()
            ->with(['service', 'package'])
            ->latest()
            ->paginate(10);

        return Inertia::render('User/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function storeUserOrder(Request $request, Service $service = null, Package $package = null)
    {
        $validated = $request->validate([
            'notes' => 'nullable|string',
        ]);

        $order = new Order();
        $order->user_id = auth()->id();
        $order->order_number = $order->generateOrderNumber();
        
        if ($service) {
            $order->service_id = $service->id;
            $order->total_price = $service->price;
        } elseif ($package) {
            $order->package_id = $package->id;
            $order->total_price = $package->price;
        } else {
            return back()->with('error', 'Silakan pilih layanan atau paket.');
        }

        $order->notes = $validated['notes'] ?? null;
        $order->save();

        return redirect()->route('user.orders')
            ->with('success', 'Pesanan berhasil dibuat. Silakan lakukan pembayaran.');
    }
}