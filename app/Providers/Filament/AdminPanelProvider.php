<?php

namespace App\Providers\Filament;

use App\Filament\Admin\Widgets\OrderStatusChart;
use App\Filament\Admin\Widgets\RecentOrders;
use App\Filament\Admin\Widgets\RecentTestimonials;
use App\Filament\Admin\Widgets\RevenueChart;
use App\Filament\Admin\Widgets\StatsOverview;
use App\Filament\Admin\Widgets\TopServices;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            // Hapus atau koment baris login() - ini akan menonaktifkan halaman login Filament
            // ->login()
            ->colors([
                'primary' => Color::Amber,
            ])
            ->discoverResources(in: app_path('Filament/Admin/Resources'), for: 'App\\Filament\\Admin\\Resources')
            ->discoverPages(in: app_path('Filament/Admin/Pages'), for: 'App\\Filament\\Admin\\Pages')
            ->discoverWidgets(in: app_path('Filament/Admin/Widgets'), for: 'App\\Filament\\Admin\\Widgets')
            ->widgets([Widgets\AccountWidget::class, Widgets\FilamentInfoWidget::class])
            ->middleware([EncryptCookies::class, AddQueuedCookiesToResponse::class, StartSession::class, AuthenticateSession::class, ShareErrorsFromSession::class, VerifyCsrfToken::class, SubstituteBindings::class, DisableBladeIconComponents::class, DispatchServingFilamentEvent::class])
            ->authMiddleware([Authenticate::class, 'role:super-admin,admin'])
            ->authGuard('web')
            ->brandName('Desainwebku Admin')
            ->favicon(asset('favicon.ico'))
            ->navigationGroups(['User Management', 'Service Management', 'Order Management', 'Content Management', 'Settings'])

            ->widgets([StatsOverview::class, RevenueChart::class, OrderStatusChart::class, RecentOrders::class, TopServices::class, RecentTestimonials::class]);
    }
}
