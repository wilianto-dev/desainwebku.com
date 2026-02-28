<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Website Company Profile',
                'short_description' => 'Website profesional untuk branding perusahaan',
                'description' => 'Pembuatan website company profile modern, responsif, dan SEO-friendly untuk meningkatkan kredibilitas bisnis Anda.',
                'icon' => 'fas fa-building',
            ],
            [
                'title' => 'Website E-Commerce',
                'short_description' => 'Toko online dengan sistem pembayaran lengkap',
                'description' => 'Pengembangan website toko online dengan fitur keranjang belanja, payment gateway, dan manajemen produk.',
                'icon' => 'fas fa-shopping-cart',
            ],
            [
                'title' => 'Web App / Sistem Informasi',
                'short_description' => 'Aplikasi berbasis web sesuai kebutuhan bisnis',
                'description' => 'Pembuatan sistem informasi custom seperti ERP, CRM, HRIS, sistem sekolah, dan lainnya.',
                'icon' => 'fas fa-laptop-code',
            ],
            [
                'title' => 'Aplikasi Mobile Android & iOS',
                'short_description' => 'Aplikasi mobile native dan cross-platform',
                'description' => 'Pengembangan aplikasi mobile dengan performa tinggi menggunakan Flutter atau React Native.',
                'icon' => 'fas fa-mobile-alt',
            ],
            [
                'title' => 'Desain UI/UX Produk Digital',
                'short_description' => 'Desain tampilan modern dan user-friendly',
                'description' => 'Layanan desain antarmuka dan pengalaman pengguna untuk website dan aplikasi mobile.',
                'icon' => 'fas fa-paint-brush',
            ],
            [
                'title' => 'Maintenance & Support',
                'short_description' => 'Perawatan dan pengelolaan website/aplikasi',
                'description' => 'Layanan maintenance rutin, update sistem, backup data, dan optimasi performa.',
                'icon' => 'fas fa-tools',
            ],
        ];

        foreach ($services as $index => $service) {
            Service::updateOrCreate(
                ['slug' => Str::slug($service['title'])],
                [
                    'title' => $service['title'],
                    'short_description' => $service['short_description'],
                    'description' => $service['description'],
                    'icon' => $service['icon'],
                    'sort_order' => $index + 1,
                    'status' => 'active',
                    'is_featured' => true,
                ]
            );
        }
    }
}