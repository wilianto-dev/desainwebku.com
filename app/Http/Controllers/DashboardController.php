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
        } elseif ($user->hasRole('vendor')) {
            return $this->vendorDashboard();
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

    public function vendor()
    {
        if (!auth()->user()->hasRole('vendor')) {
            abort(403, 'Unauthorized action.');
        }

        return $this->vendorDashboard();
    }

    private function adminDashboard()
    {
        $user = auth()->user();
        
        // Statistik untuk admin
        $stats = [
            'total_users' => User::count(),
            'total_vendors' => User::role('vendor')->count(),
            'total_customers' => User::role('user')->count(),
            'total_orders' => Order::count(),
            'total_services' => Service::count(),
            'total_packages' => Package::count(),
            'total_portfolios' => Portfolio::count(),
            'total_testimonials' => Testimonial::count(),
            'total_revenue' => Order::where('status', 'paid')->sum('total_price'),
        ];

        // Pendapatan bulan ini
        $revenueThisMonth = Order::where('status', 'paid')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_price');

        // Pendapatan bulan lalu
        $revenueLastMonth = Order::where('status', 'paid')
            ->whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->sum('total_price');

        // Hitung persentase pertumbuhan
        $revenueGrowth = $revenueLastMonth > 0 
            ? round((($revenueThisMonth - $revenueLastMonth) / $revenueLastMonth) * 100, 1)
            : 0;

        // Pesanan terbaru
        $recentOrders = Order::with(['user', 'service', 'package'])
            ->latest()
            ->limit(10)
            ->get();

        // Grafik pesanan per bulan (tahun ini)
        $orderChart = Order::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('COUNT(*) as count'),
                DB::raw('SUM(CASE WHEN status = "paid" THEN total_price ELSE 0 END) as revenue')
            )
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Grafik pesanan per status
        $orderStatusChart = Order::select(
                DB::raw('status'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('status')
            ->get();

        // Top vendors berdasarkan jumlah order
        $topVendors = User::role('vendor')
            ->withCount(['services', 'orders as orders_count' => function($query) {
                $query->where('status', 'paid');
            }])
            ->withSum(['orders as revenue' => function($query) {
                $query->where('status', 'paid');
            }], 'total_price')
            ->orderBy('revenue', 'desc')
            ->limit(5)
            ->get();

        // Aktivitas terkini
        $recentActivities = collect()
            ->merge(
                Order::with('user')
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(function($order) {
                        return [
                            'type' => 'order',
                            'description' => "Pesanan baru #{$order->order_number} dari {$order->user->name}",
                            'created_at' => $order->created_at,
                            'status' => $order->status,
                        ];
                    })
            )
            ->merge(
                User::where('created_at', '>=', now()->subDays(7))
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(function($user) {
                        return [
                            'type' => 'user',
                            'description' => "Pengguna baru: {$user->name}",
                            'created_at' => $user->created_at,
                            'status' => $user->status,
                        ];
                    })
            )
            ->sortByDesc('created_at')
            ->take(10)
            ->values();

        // Get user with formatted roles
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'roles' => $user->roles->pluck('name')->map(function($role) {
                return ucfirst($role);
            })->toArray(),
            'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'revenueThisMonth' => $revenueThisMonth,
            'revenueGrowth' => $revenueGrowth,
            'recentOrders' => $recentOrders,
            'orderChart' => $orderChart,
            'orderStatusChart' => $orderStatusChart,
            'topVendors' => $topVendors,
            'recentActivities' => $recentActivities,
            'user' => $userData,
        ]);
    }

    private function vendorDashboard()
    {
        $user = auth()->user();
        
        // Statistik untuk vendor
        $stats = [
            'total_services' => Service::where('user_id', $user->id)->count(),
            'total_packages' => Package::where('user_id', $user->id)->count(),
            'total_portfolios' => Portfolio::where('user_id', $user->id)->count(),
            'total_orders' => Order::whereHas('service', function($query) use ($user) {
                    $query->where('user_id', $user->id);
                })->orWhereHas('package', function($query) use ($user) {
                    $query->where('user_id', $user->id);
                })->count(),
            'pending_orders' => Order::where(function($query) use ($user) {
                    $query->whereHas('service', function($q) use ($user) {
                        $q->where('user_id', $user->id);
                    })->orWhereHas('package', function($q) use ($user) {
                        $q->where('user_id', $user->id);
                    });
                })
                ->where('status', 'pending')
                ->count(),
            'completed_orders' => Order::where(function($query) use ($user) {
                    $query->whereHas('service', function($q) use ($user) {
                        $q->where('user_id', $user->id);
                    })->orWhereHas('package', function($q) use ($user) {
                        $q->where('user_id', $user->id);
                    });
                })
                ->where('status', 'completed')
                ->count(),
            'total_revenue' => Order::where(function($query) use ($user) {
                    $query->whereHas('service', function($q) use ($user) {
                        $q->where('user_id', $user->id);
                    })->orWhereHas('package', function($q) use ($user) {
                        $q->where('user_id', $user->id);
                    });
                })
                ->where('status', 'paid')
                ->sum('total_price'),
        ];

        // Pendapatan bulan ini
        $revenueThisMonth = Order::where(function($query) use ($user) {
                $query->whereHas('service', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->orWhereHas('package', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                });
            })
            ->where('status', 'paid')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_price');

        // Pendapatan bulan lalu
        $revenueLastMonth = Order::where(function($query) use ($user) {
                $query->whereHas('service', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->orWhereHas('package', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                });
            })
            ->where('status', 'paid')
            ->whereMonth('created_at', now()->subMonth()->month)
            ->whereYear('created_at', now()->subMonth()->year)
            ->sum('total_price');

        $revenueGrowth = $revenueLastMonth > 0 
            ? round((($revenueThisMonth - $revenueLastMonth) / $revenueLastMonth) * 100, 1)
            : 0;

        // Pesanan terbaru
        $recentOrders = Order::with(['user', 'service', 'package'])
            ->where(function($query) use ($user) {
                $query->whereHas('service', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->orWhereHas('package', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                });
            })
            ->latest()
            ->limit(10)
            ->get();

        // Grafik pendapatan per bulan
        $revenueChart = Order::select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total_price) as revenue'),
                DB::raw('COUNT(*) as orders_count')
            )
            ->where(function($query) use ($user) {
                $query->whereHas('service', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                })->orWhereHas('package', function($q) use ($user) {
                    $q->where('user_id', $user->id);
                });
            })
            ->where('status', 'paid')
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Layanan populer
        $popularServices = Service::where('user_id', $user->id)
            ->withCount(['orders' => function($query) {
                $query->where('status', 'paid');
            }])
            ->orderBy('orders_count', 'desc')
            ->limit(5)
            ->get();

        // User data
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'roles' => $user->roles->pluck('name')->map(function($role) {
                return ucfirst($role);
            })->toArray(),
            'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
        ];

        return Inertia::render('Vendor/Dashboard', [
            'stats' => $stats,
            'revenueThisMonth' => $revenueThisMonth,
            'revenueGrowth' => $revenueGrowth,
            'recentOrders' => $recentOrders,
            'revenueChart' => $revenueChart,
            'popularServices' => $popularServices,
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
            'total_spent' => $user->orders()->where('status', 'paid')->sum('total_price'),
        ];

        $recentOrders = $user->orders()
            ->with(['service', 'package', 'service.user', 'package.user'])
            ->latest()
            ->limit(5)
            ->get();

        // Rekomendasi layanan (berdasarkan pesanan sebelumnya)
        $previousOrderServices = $user->orders()
            ->where('status', 'completed')
            ->with('service.user')
            ->get()
            ->pluck('service.user_id')
            ->unique();

        $recommendedServices = Service::with('user')
            ->where('status', 'active')
            ->whereNotIn('user_id', $previousOrderServices)
            ->inRandomOrder()
            ->limit(4)
            ->get();

        // User data
        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'roles' => $user->roles->pluck('name')->map(function($role) {
                return ucfirst($role);
            })->toArray(),
            'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
        ];

        return Inertia::render('User/Dashboard', [
            'stats' => $userStats,
            'recentOrders' => $recentOrders,
            'recommendedServices' => $recommendedServices,
            'user' => $userData,
        ]);
    }
}