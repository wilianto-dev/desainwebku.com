<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'provider',
        'provider_id',
        'avatar',
        'phone',
        'status',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'last_login_at' => 'datetime',
    ];

    // Relasi
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    // Scope untuk status
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    public function scopeBanned($query)
    {
        return $query->where('status', 'banned');
    }

    // Helper methods
    public function isActive()
    {
        return $this->status === 'active';
    }

    public function isBanned()
    {
        return $this->status === 'banned';
    }

    public function updateLastLogin()
    {
        $this->update(['last_login_at' => now()]);
    }

    // Accessor untuk avatar
    public function getAvatarAttribute($value)
    {
        if ($value) {
            return $value;
        }
        
        // Default avatar dari UI Avatars
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&background=0D8F81&color=fff';
    }
}