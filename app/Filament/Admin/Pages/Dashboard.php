<?php

namespace App\Filament\Admin\Pages;

use App\Filament\Admin\Widgets\OrderStatusChart;
use App\Filament\Admin\Widgets\RecentOrders;
use App\Filament\Admin\Widgets\RecentTestimonials;
use App\Filament\Admin\Widgets\RevenueChart;
use App\Filament\Admin\Widgets\StatsOverview;
use App\Filament\Admin\Widgets\TopServices;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Support\Icons\Heroicon;

class Dashboard extends BaseDashboard
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedHome;
    
    protected static ?string $title = 'Dashboard';
    
    protected static ?int $navigationSort = -1;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('refresh')
                ->label('Refresh Data')
                ->icon('heroicon-m-arrow-path')
                ->color('gray')
                ->action('refreshWidgets'), // Method ini harus didefinisikan
        ];
    }

    /**
     * Method untuk me-refresh semua widget
     */
    public function refreshWidgets(): void
    {
        // Method ini akan dipanggil saat tombol refresh diklik
        // Widget akan otomatis me-refresh data mereka saat Livewire merender ulang
        
        // Opsional: Tambahkan notifikasi jika diperlukan
        // $this->notify('success', 'Data berhasil direfresh');
    }

    public function getWidgets(): array
    {
        return [
            StatsOverview::class,
            RevenueChart::class,
            OrderStatusChart::class,
            RecentOrders::class,
            TopServices::class,
            RecentTestimonials::class,
        ];
    }
}