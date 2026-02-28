<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Testimonial extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_id',
        'name',
        'company',
        'rating',
        'content',
        'status',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}