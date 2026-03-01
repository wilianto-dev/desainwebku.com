<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'completion_date' => 'date',
        'published_at' => 'datetime',
        'technologies' => 'array',
        'results' => 'array',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }
}