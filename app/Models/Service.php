<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'features',
        'price',
        'duration',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2',
        'is_featured' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Tambahkan method ini ke model Service
protected $appends = ['parsed_features'];

public function getParsedFeaturesAttribute()
{
    $features = $this->attributes['features'] ?? null;
    
    if (is_null($features)) {
        return [];
    }
    
    if (is_array($features)) {
        return $features;
    }
    
    if (is_string($features)) {
        try {
            $decoded = json_decode($features, true);
            return is_array($decoded) ? $decoded : [];
        } catch (\Exception $e) {
            return [];
        }
    }
    
    return [];
}



}