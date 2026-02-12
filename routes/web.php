<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\TestimonialController;

Route::get('/', [\App\Http\Controllers\PublicController::class, 'home'])->name('home');
Route::get('/layanan', [\App\Http\Controllers\PublicController::class, 'services'])->name('services');
Route::get('/layanan/{service:slug}', [\App\Http\Controllers\PublicController::class, 'serviceDetail'])->name('service.detail');
Route::get('/portofolio', [\App\Http\Controllers\PublicController::class, 'portfolio'])->name('portfolio');
Route::get('/portofolio/{portfolio:slug}', [\App\Http\Controllers\PublicController::class, 'portfolioDetail'])->name('portfolio.detail');
Route::get('/kontak', [\App\Http\Controllers\PublicController::class, 'contact'])->name('contact');
Route::post('/kontak', [\App\Http\Controllers\PublicController::class, 'contactSubmit'])->name('contact.submit');

// Order routes
Route::get('/pesanan/service/{service}', [OrderController::class, 'createFromService'])->name('order.service');
Route::get('/pesanan/package/{package}', [OrderController::class, 'createFromPackage'])->name('order.package');
Route::post('/pesanan', [OrderController::class, 'store'])->name('order.store');
Route::get('/pesanan/{orderNumber}', [OrderController::class, 'show'])->name('order.show');

Route::get('/halaman/{page:slug}', [\App\Http\Controllers\PublicController::class, 'page'])->name('page');



/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    // User orders
    Route::get('/pesanan', [\App\Http\Controllers\Admin\OrderController::class, 'userOrders'])->name('user.orders');
    Route::post('/pesanan/{service}', [\App\Http\Controllers\Admin\OrderController::class, 'storeUserOrder'])->name('orders.store');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'admin'])->name('dashboard');
    
    // Resource Controllers
    Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class);
    Route::resource('packages', \App\Http\Controllers\Admin\PackageController::class);
    Route::resource('orders', \App\Http\Controllers\Admin\OrderController::class);
    Route::resource('portfolios', \App\Http\Controllers\Admin\PortfolioController::class);
    Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class);
    Route::resource('pages', \App\Http\Controllers\Admin\PageController::class);
    
    // Additional routes for status updates
    Route::post('/services/{service}/status', [\App\Http\Controllers\Admin\ServiceController::class, 'updateStatus']);
    Route::post('/services/{service}/featured', [\App\Http\Controllers\Admin\ServiceController::class, 'updateFeatured']);
    Route::post('/packages/{package}/status', [\App\Http\Controllers\Admin\PackageController::class, 'updateStatus']);
    Route::post('/packages/{package}/popular', [\App\Http\Controllers\Admin\PackageController::class, 'updatePopular']);
    Route::post('/orders/{order}/status', [\App\Http\Controllers\Admin\OrderController::class, 'updateStatus']);
    Route::post('/portfolios/{portfolio}/status', [\App\Http\Controllers\Admin\PortfolioController::class, 'updateStatus']);
    Route::post('/testimonials/{testimonial}/status', [\App\Http\Controllers\Admin\TestimonialController::class, 'updateStatus']);
    Route::post('/pages/{page}/status', [\App\Http\Controllers\Admin\PageController::class, 'updateStatus']);
    
    // Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::put('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
    
    // Users Management
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::put('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('users.destroy');
});


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
