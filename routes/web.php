<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\TestimonialController;
use Illuminate\Support\Facades\Auth;

// Public Routes
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/layanan', [PublicController::class, 'services'])->name('services');
Route::get('/layanan/{service:slug}', [PublicController::class, 'serviceDetail'])->name('service.detail');
Route::get('/portofolio', [PublicController::class, 'portfolio'])->name('portfolio');
Route::get('/portofolio/{portfolio:slug}', [PublicController::class, 'portfolioDetail'])->name('portfolio.detail');

// Routes untuk Package (PAKET)
Route::get('/paket', [PublicController::class, 'packages'])->name('packages');
Route::get('/paket/{package:slug}', [PublicController::class, 'packageDetail'])->name('package.detail');

Route::get('/kontak', [PublicController::class, 'contact'])->name('contact');
Route::post('/kontak', [PublicController::class, 'contactSubmit'])->name('contact.submit');

// Order routes
Route::get('/pesanan/service/{service}', [OrderController::class, 'createFromService'])->name('order.service');
Route::get('/pesanan/package/{package}', [OrderController::class, 'createFromPackage'])->name('order.package');
Route::post('/pesanan', [OrderController::class, 'store'])->name('order.store');
Route::get('/pesanan/{orderNumber}', [OrderController::class, 'show'])->name('order.show');

Route::get('/halaman/{page:slug}', [PublicController::class, 'page'])->name('page');

// Breeze Authentication Routes (already included in auth.php)
require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Dashboard Redirect based on Role
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();
        
        if ($user->hasRole('super-admin') || $user->hasRole('admin')) {
            return redirect('/admin');
        }
        
        if ($user->hasRole('customer')) {
            return redirect('/customer');
        }
        
        // Default fallback ke dashboard Breeze
        return inertia('Dashboard');
    })->name('dashboard');
    
    // User orders - accessible by all authenticated users
    Route::get('/pesanan-saya', [App\Http\Controllers\OrderController::class, 'userOrders'])->name('user.orders');
    Route::post('/pesanan/{service}', [App\Http\Controllers\OrderController::class, 'storeUserOrder'])->name('orders.store');
});

/*
|--------------------------------------------------------------------------
| Profile Routes (Breeze)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Hapus atau koment bagian route yang tidak diperlukan
// Route::middleware(['auth', 'verified', 'role:super-admin,admin'])->prefix('admin')->name('admin.')->group(function () {
//     // admin panel
// });

// Route::middleware(['auth', 'verified', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
//     // customer panel
// });