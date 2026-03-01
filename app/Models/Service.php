<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'description',
        'icon',
        'sort_order',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function packages()
    {
        return $this->hasMany(Package::class);
    }

        public function orders()
    {
        return $this->hasManyThrough(Order::class, Package::class);
    }

    public function portfolios()
    {
        return $this->hasMany(Portfolio::class);
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}