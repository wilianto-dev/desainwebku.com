<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Portfolio extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_id',
        'title',
        'slug',
        'description',
        'image',
        'technologies',
        'results',
        'status',
        'completion_date',
        'published_at',
    ];

    protected $casts = [
        'technologies' => 'array',
        'results' => 'array',
        'completion_date' => 'date',
        'published_at' => 'datetime',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                    ->whereNotNull('published_at');
    }
}