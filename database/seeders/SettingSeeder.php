<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General Settings
            [
                'key' => 'site_name',
                'value' => 'My Laravel Application',
                'type' => 'text',
            ],
            [
                'key' => 'site_description',
                'value' => 'A powerful web application built with Laravel',
                'type' => 'text',
            ],
            [
                'key' => 'site_keywords',
                'value' => 'laravel, php, web development, application',
                'type' => 'text',
            ],
            [
                'key' => 'site_logo',
                'value' => '/images/logo.png',
                'type' => 'text',
            ],
            [
                'key' => 'site_favicon',
                'value' => '/images/favicon.ico',
                'type' => 'text',
            ],
            [
                'key' => 'admin_email',
                'value' => 'admin@example.com',
                'type' => 'text',
            ],
            
            // Contact Information
            [
                'key' => 'contact_email',
                'value' => 'info@example.com',
                'type' => 'text',
            ],
            [
                'key' => 'contact_phone',
                'value' => '+62 123 4567 890',
                'type' => 'text',
            ],
            [
                'key' => 'contact_address',
                'value' => 'Jl. Contoh No. 123, Jakarta, Indonesia',
                'type' => 'text',
            ],
            
            // Social Media
            [
                'key' => 'social_media',
                'value' => json_encode([
                    'facebook' => 'https://facebook.com/example',
                    'twitter' => 'https://twitter.com/example',
                    'instagram' => 'https://instagram.com/example',
                    'linkedin' => 'https://linkedin.com/company/example',
                    'youtube' => 'https://youtube.com/example',
                ]),
                'type' => 'json',
            ],
            
            // SEO Settings
            [
                'key' => 'google_analytics_id',
                'value' => 'UA-12345678-1',
                'type' => 'text',
            ],
            [
                'key' => 'google_site_verification',
                'value' => 'abcdefghijklmnopqrstuvwxyz123456',
                'type' => 'text',
            ],
            
            // Feature Toggles
            [
                'key' => 'enable_registration',
                'value' => 'true',
                'type' => 'boolean',
            ],
            [
                'key' => 'enable_comments',
                'value' => 'true',
                'type' => 'boolean',
            ],
            [
                'key' => 'maintenance_mode',
                'value' => 'false',
                'type' => 'boolean',
            ],
            
            // Email Settings
            [
                'key' => 'mail_from_address',
                'value' => 'noreply@example.com',
                'type' => 'text',
            ],
            [
                'key' => 'mail_from_name',
                'value' => 'My Application',
                'type' => 'text',
            ],
            
            // Currency Settings
            [
                'key' => 'currency',
                'value' => 'IDR',
                'type' => 'text',
            ],
            [
                'key' => 'currency_symbol',
                'value' => 'Rp',
                'type' => 'text',
            ],
            
            // Pagination Settings
            [
                'key' => 'items_per_page',
                'value' => '15',
                'type' => 'number',
            ],
            
            // Date & Time Settings
            [
                'key' => 'timezone',
                'value' => 'Asia/Jakarta',
                'type' => 'text',
            ],
            [
                'key' => 'date_format',
                'value' => 'd M Y',
                'type' => 'text',
            ],
            
            // Application Settings
            [
                'key' => 'app_version',
                'value' => '1.0.0',
                'type' => 'text',
            ],
            [
                'key' => 'company_name',
                'value' => 'PT. Contoh Perusahaan',
                'type' => 'text',
            ],
            [
                'key' => 'company_legal_name',
                'value' => 'PT. Contoh Perusahaan Tbk',
                'type' => 'text',
            ],
            
            // API Settings
            [
                'key' => 'api_rate_limit',
                'value' => '60',
                'type' => 'number',
            ],
            
            // Cache Settings
            [
                'key' => 'cache_duration',
                'value' => '3600',
                'type' => 'number',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value'], 'type' => $setting['type']]
            );
        }
    }
}