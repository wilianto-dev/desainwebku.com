<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        
        foreach ($roles as $role) {
            if ($user->hasRole($role)) {
                return $next($request);
            }
        }

        // For API requests, return JSON
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Unauthorized. You do not have the required role.',
                'required_roles' => $roles,
                'user_roles' => $user->roles->pluck('name')->toArray(),
            ], 403);
        }

        // For Inertia, render a 403 page
        return Inertia::render('Errors/403', [
            'status' => 403,
            'message' => 'Anda tidak memiliki akses ke halaman ini.',
            'requiredRoles' => $roles,
            'userRoles' => $user->roles->pluck('name')->toArray(),
        ])->toResponse($request)->setStatusCode(403);
    }
}