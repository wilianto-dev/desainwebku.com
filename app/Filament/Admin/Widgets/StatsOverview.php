<?php

namespace App\Filament\Admin\Widgets;

use App\Models\Order;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        
        $totalRevenue = Order::where('status', 'completed')->sum('total_price') ?? 0;
        $monthlyRevenue = Order::where('status', 'completed')
            ->whereMonth('completed_at', $currentMonth)
            ->whereYear('completed_at', $currentYear)
            ->sum('total_price') ?? 0;
            
        $pendingOrders = Order::where('status', 'pending')->count();
        $completedOrders = Order::where('status', 'completed')->count();
        
        $totalUsers = User::count();
        $newUsers = User::whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->count();
            
        $totalServices = Service::where('status', 'active')->count();
        $totalPortfolios = Portfolio::where('status', 'published')->count();

        return [
            Stat::make('Total Revenue', 'Rp ' . number_format($totalRevenue, 0, ',', '.'))
                ->description('Rp ' . number_format($monthlyRevenue, 0, ',', '.') . ' this month')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success'),
                
            Stat::make('Orders', $pendingOrders . ' pending')
                ->description($completedOrders . ' completed')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('warning'),
                
            Stat::make('Users', $totalUsers)
                ->description($newUsers . ' new this month')
                ->descriptionIcon('heroicon-m-users')
                ->color('info'),
                
            Stat::make('Services', $totalServices . ' active')
                ->description($totalPortfolios . ' portfolio items')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('primary'),
        ];
    }
}