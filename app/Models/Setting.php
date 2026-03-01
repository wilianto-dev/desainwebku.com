<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'type',
    ];

    protected $casts = [
        'value' => 'array',
    ];

    // Accessor untuk memudahkan form
    public function getValueAttribute($value)
    {
        // Untuk JSON type, kembalikan sebagai array
        if ($this->type === 'json') {
            $decoded = json_decode($value, true);
            return is_array($decoded) ? $decoded : $value;
        }
        return $value;
    }

    public static function getValue($key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        
        if (!$setting) {
            return $default;
        }

        $value = $setting->value;
        
        // Cast berdasarkan tipe
        switch ($setting->type) {
            case 'boolean':
                return filter_var($value, FILTER_VALIDATE_BOOLEAN);
            case 'number':
                return is_numeric($value) ? (float) $value : $default;
            case 'json':
                return is_array($value) ? $value : json_decode($value, true);
            default:
                return $value;
        }
    }

    public static function setValue($key, $value, $type = 'text')
    {
        // Untuk tipe boolean, konversi ke string 'true'/'false'
        if ($type === 'boolean') {
            $value = $value ? 'true' : 'false';
        }
        
        // Untuk tipe json, encode jika array
        if ($type === 'json' && is_array($value)) {
            $value = json_encode($value);
        }

        $setting = self::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'type' => $type]
        );
        
        return $setting;
    }
}