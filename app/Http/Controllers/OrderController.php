<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Service;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function createFromService(Service $service)
    {
        // Redirect to login if not authenticated
        if (!auth()->check()) {
            return redirect()->route('login')
                ->with('warning', 'Silakan login terlebih dahulu untuk memesan layanan.');
        }

        return Inertia::render('Order/Create', [
            'type' => 'service',
            'item' => [
                'id' => $service->id,
                'title' => $service->title,
                'price' => $service->price,
                'duration' => $service->duration,
                'description' => $service->description,
            ]
        ]);
    }

    public function createFromPackage(Package $package)
    {
        // Redirect to login if not authenticated
        if (!auth()->check()) {
            return redirect()->route('login')
                ->with('warning', 'Silakan login terlebih dahulu untuk memesan paket.');
        }

        return Inertia::render('Order/Create', [
            'type' => 'package',
            'item' => [
                'id' => $package->id,
                'name' => $package->name,
                'price' => $package->price,
                'description' => $package->description,
                'features' => $package->features,
            ]
        ]);
    }

    public function store(Request $request)
    {
        // Ensure user is authenticated
        if (!auth()->check()) {
            return redirect()->route('login')
                ->with('error', 'Anda harus login untuk melakukan pemesanan.');
        }

        $validated = $request->validate([
            'type' => 'required|in:service,package',
            'item_id' => 'required|integer',
            'notes' => 'nullable|string',
        ]);

        $order = new Order();
        $order->order_number = $order->generateOrderNumber();
        $order->status = 'pending';
        $order->notes = $validated['notes'];
        $order->user_id = auth()->id(); // User is always authenticated here
        
        if ($validated['type'] === 'service') {
            $service = Service::findOrFail($validated['item_id']);
            $order->service_id = $service->id;
            $order->total_price = $service->price;
        } else {
            $package = Package::findOrFail($validated['item_id']);
            $order->package_id = $package->id;
            $order->total_price = $package->price;
        }

        $order->save();

        return redirect()->route('order.show', $order->order_number)
            ->with('success', 'Pesanan berhasil dibuat!');
    }

    public function show($orderNumber)
    {
        // Ensure user is authenticated
        if (!auth()->check()) {
            return redirect()->route('login')
                ->with('error', 'Silakan login untuk melihat detail pesanan.');
        }

        $order = Order::where('order_number', $orderNumber)
            ->with(['service', 'package', 'user'])
            ->firstOrFail();

        // Ensure user can only view their own orders
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Anda tidak memiliki akses ke pesanan ini.');
        }

        return Inertia::render('Order/Show', [
            'order' => $order
        ]);
    }

    public function index()
    {
        // Ensure user is authenticated
        if (!auth()->check()) {
            return redirect()->route('login')
                ->with('error', 'Silakan login untuk melihat daftar pesanan.');
        }

        $orders = Order::where('user_id', auth()->id())
            ->with(['service', 'package'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Order/Index', [
            'orders' => $orders
        ]);
    }
}