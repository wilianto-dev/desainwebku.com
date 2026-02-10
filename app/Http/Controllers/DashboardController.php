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
        // Statistik untuk admin
        $stats = [
            'total_users' => User::count(),
            'total_orders' => Order::count(),
            'total_services' => Service::count(),
            'total_packages' => Package::count(),
            'total_portfolios' => Portfolio::count(),
            'total_testimonials' => Testimonial::count(),
            'total_pages' => Page::count(),
        ];

        // Pendapatan bulan ini
        $revenueThisMonth = Order::where('status', 'paid')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_price');

        // Pesanan terbaru
        $recentOrders = Order::with(['user', 'service', 'package'])
            ->latest()
            ->limit(10)
            ->get();

        // Grafik pesanan per bulan
        $orderChart = Order::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as count')
            )
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

             // Get user with formatted roles
    $user = auth()->user();
    $userData = [
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'roles' => $user->roles->pluck('name')->toArray(),
    ];
    

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'revenueThisMonth' => $revenueThisMonth,
            'recentOrders' => $recentOrders,
            'orderChart' => $orderChart,
            'user' => $userData,
        ]);
    }

    private function userDashboard()
    {
        $user = auth()->user();
        
        $userStats = [
            'total_orders' => $user->orders()->count(),
            'pending_orders' => $user->orders()->where('status', 'pending')->count(),
            'paid_orders' => $user->orders()->where('status', 'paid')->count(),
            'completed_orders' => $user->orders()->where('status', 'completed')->count(),
        ];

        $recentOrders = $user->orders()
            ->with(['service', 'package'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('User/Dashboard', [
            'stats' => $userStats,
            'recentOrders' => $recentOrders,
        ]);
    }
}