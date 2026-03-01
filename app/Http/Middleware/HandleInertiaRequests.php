<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Setting;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => function () use ($request) {
                $user = $request->user();
                
                if (!$user) {
                    return [
                        'user' => null,
                    ];
                }
                
                // Load roles and permissions
                $user->load('roles');
                
                // Format roles to simple array of names
                $roles = $user->roles->pluck('name')->toArray();
                
                // Get all permissions
                $permissions = $user->getAllPermissions()->pluck('name')->toArray();
                
                // Determine user type for frontend
                $userType = 'customer';
                if ($user->hasRole('super-admin')) {
                    $userType = 'super-admin';
                } elseif ($user->hasRole('admin')) {
                    $userType = 'admin';
                }
                
                // Check specific role booleans for easy access in frontend
                $isSuperAdmin = $user->hasRole('super-admin');
                $isAdmin = $user->hasRole('admin');
                $isCustomer = $user->hasRole('customer');
                
                return [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'avatar' => $user->avatar,
                        'phone' => $user->phone,
                        'status' => $user->status,
                        'roles' => $roles,
                        'permissions' => $permissions,
                        'userType' => $userType,
                        'isSuperAdmin' => $isSuperAdmin,
                        'isAdmin' => $isAdmin,
                        'isCustomer' => $isCustomer,
                        'last_login_at' => $user->last_login_at?->diffForHumans(),
                    ],
                ];
            },
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
                'info' => fn () => $request->session()->get('info'),
            ],
            'appName' => config('app.name'),
            'siteSettings' => [
                'site_name' => Setting::getValue('site_name', 'Desainwebku'),
                'site_description' => Setting::getValue('site_description', 'Jasa Pembuatan Website Profesional'),
                'contact_email' => Setting::getValue('contact_email', 'info@desainwebku.com'),
                'contact_phone' => Setting::getValue('contact_phone', '+6281234567890'),
            ],
        ]);
    }
}