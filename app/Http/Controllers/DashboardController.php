<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Service;
use App\Models\Package;
use App\Models\Order;
use App\Models\Portfolio;
use App\Models\Testimonial;
use App\Models\Page;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        if ($user->hasRole('admin')) {
            return $this->adminDashboard();
        }
        
        return $this->userDashboard();
    }

    public function admin()
    {
        if (!auth()->user()->hasRole('admin')) {
            abort(403, 'Unauthorized action.');
        }

        return $this->adminDashboard();
    }

    private function adminDashboard()
    {
        $user = auth()->user();
        
        // Statistik untuk admin
        $stats = [
            'total_users' => User::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::where('status', 'paid')->sum('total_price'),
            'total_services' => Service::count(),
            'total_packages' => Package::count(),
            'total_portfolios' => Portfolio::count(),
            'total_testimonials' => Testimonial::count(),
        ];

        // Pesanan terbaru
        $recentOrders = Order::with(['user', 'service', 'package'])
            ->latest()
            ->limit(5)
            ->get();

        // Pengguna terbaru
        $recentUsers = User::latest()
            ->limit(5)
            ->get()
            ->map(function($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'role' => $user->hasRole('admin') ? 'admin' : 'user',
                    'created_at' => $user->created_at,
                ];
            });

        // Grafik pesanan per bulan
        $orderChart = Order::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as count')
            )
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Grafik pengguna per bulan
        $userChart = User::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as count')
            )
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Konten populer
        $popularContent = [
            'services' => Service::with('user')
                ->withCount('orders')
                ->orderBy('orders_count', 'desc')
                ->limit(4)
                ->get()
        ];

        // User data
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'roles' => $user->roles->pluck('name')->toArray(),
            'total_users' => User::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'recentUsers' => $recentUsers,
            'orderChart' => $orderChart,
            'userChart' => $userChart,
            'popularContent' => $popularContent,
            'user' => $userData,
        ]);
    }

    private function userDashboard()
    {
        $user = auth()->user();
        
        // Statistik untuk user
        $stats = [
            'total_orders' => $user->orders()->count(),
            'pending_orders' => $user->orders()->where('status', 'pending')->count(),
            'paid_orders' => $user->orders()->where('status', 'paid')->count(),
            'completed_orders' => $user->orders()->where('status', 'completed')->count(),
            'total_spent' => $user->orders()->where('status', 'paid')->sum('total_price'),
        ];

        // Pesanan terbaru
        $recentOrders = $user->orders()
            ->with(['service', 'package', 'service.user', 'package.user'])
            ->latest()
            ->limit(5)
            ->get();

        // Rekomendasi layanan
        $recommendedServices = Service::with('user')
            ->where('status', 'active')
            ->inRandomOrder()
            ->limit(4)
            ->get()
            ->map(function($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'description' => $service->description,
                    'starting_price' => $service->starting_price,
                    'rating' => 5.0,
                    'user' => [
                        'name' => $service->user->name,
                    ],
                ];
            });

        // Aktivitas terkini
        $recentActivities = $user->orders()
            ->latest()
            ->limit(5)
            ->get()
           ->map(function ($order) {

    $title = $order->service?->title 
        ?? $order->package?->name 
        ?? 'Tanpa Judul';

    return [
        'type' => 'order',
        'description' => "Pesanan {$order->order_number} - {$title}",
        'created_at' => $order->created_at,
        'status' => $order->status,
    ];
});


        // User data
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'roles' => $user->roles->pluck('name')->toArray(),
            'created_at' => $user->created_at,
            'pending_orders' => $user->orders()->where('status', 'pending')->count(),
        ];

        return Inertia::render('User/Dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'recommendedServices' => $recommendedServices,
            'recentActivities' => $recentActivities,
            'user' => $userData,
        ]);
    }
}