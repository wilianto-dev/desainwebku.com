<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->groupBy('type');

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $settings = $request->except('_method', '_token');

        foreach ($settings as $key => $value) {
            $setting = Setting::where('key', $key)->first();
            
            if ($setting) {
                // Handle different types
                $type = $setting->type;
                
                if ($type === 'json' && is_array($value)) {
                    $value = json_encode($value);
                } elseif ($type === 'boolean') {
                    $value = (bool) $value;
                } elseif ($type === 'number') {
                    $value = (float) $value;
                }

                $setting->update(['value' => $value]);
            }
        }

        return back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}