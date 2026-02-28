<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_id',
        'name',
        'slug',
        'short_description',
        'description',
        'features',
        'price',
        'duration',
        'sort_order',
        'status',
        'is_popular',
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2',
        'is_popular' => 'boolean',
        'duration' => 'integer',
        'sort_order' => 'integer',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopePopular($query)
    {
        return $query->where('is_popular', true);
    }
}