<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;
use App\Models\Service;
use Illuminate\Support\Str;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        $services = Service::all();

        foreach ($services as $service) {

            $packages = [];

            switch ($service->slug) {

                /*
                |--------------------------------------------------------------------------
                | WEBSITE COMPANY PROFILE
                |--------------------------------------------------------------------------
                */
                case 'website-company-profile':
                    $packages = [
                        [
                            'name' => 'Starter Company Profile',
                            'features' => [
                                'Hingga 5 halaman',
                                'Desain responsif',
                                'Form kontak & WhatsApp',
                                'SEO dasar',
                                'Support 1 bulan',
                            ],
                            'price' => 2500000,
                            'duration' => 14,
                            'is_popular' => false,
                        ],
                        [
                            'name' => 'Business Company Profile',
                            'features' => [
                                'Hingga 10 halaman',
                                'CMS admin panel',
                                'Optimasi SEO lanjutan',
                                'Integrasi Google Analytics',
                                'Support 3 bulan',
                            ],
                            'price' => 5000000,
                            'duration' => 30,
                            'is_popular' => true,
                        ],
                        [
                            'name' => 'Corporate Premium',
                            'features' => [
                                'Unlimited halaman',
                                'Custom design eksklusif',
                                'Multi bahasa',
                                'Optimasi performa & security',
                                'Support 6 bulan',
                            ],
                            'price' => 9000000,
                            'duration' => 45,
                            'is_popular' => false,
                        ],
                    ];
                    break;

                /*
                |--------------------------------------------------------------------------
                | WEBSITE E-COMMERCE
                |--------------------------------------------------------------------------
                */
                case 'website-e-commerce':
                    $packages = [
                        [
                            'name' => 'E-Commerce Basic',
                            'features' => [
                                'Hingga 50 produk',
                                'Keranjang belanja',
                                'Payment gateway',
                                'Dashboard admin',
                            ],
                            'price' => 6000000,
                            'duration' => 30,
                            'is_popular' => false,
                        ],
                        [
                            'name' => 'E-Commerce Professional',
                            'features' => [
                                'Unlimited produk',
                                'Integrasi ongkir otomatis',
                                'Diskon & voucher',
                                'Laporan penjualan',
                            ],
                            'price' => 10000000,
                            'duration' => 45,
                            'is_popular' => true,
                        ],
                        [
                            'name' => 'E-Commerce Enterprise',
                            'features' => [
                                'Multi vendor',
                                'Multi payment',
                                'Integrasi ERP',
                                'Optimasi performa tinggi',
                            ],
                            'price' => 18000000,
                            'duration' => 60,
                            'is_popular' => false,
                        ],
                    ];
                    break;

                /*
                |--------------------------------------------------------------------------
                | WEB APP / SISTEM INFORMASI
                |--------------------------------------------------------------------------
                */
                case 'web-app-sistem-informasi':
                    $packages = [
                        [
                            'name' => 'Sistem Informasi Basic',
                            'features' => [
                                'Modul standar',
                                'Multi user',
                                'Dashboard admin',
                            ],
                            'price' => 8000000,
                            'duration' => 45,
                            'is_popular' => false,
                        ],
                        [
                            'name' => 'Sistem Informasi Professional',
                            'features' => [
                                'Custom modul',
                                'Role & permission',
                                'Laporan lengkap',
                            ],
                            'price' => 15000000,
                            'duration' => 60,
                            'is_popular' => true,
                        ],
                        [
                            'name' => 'Sistem Enterprise Custom',
                            'features' => [
                                'Integrasi API',
                                'High security',
                                'Scalable architecture',
                            ],
                            'price' => 30000000,
                            'duration' => 90,
                            'is_popular' => false,
                        ],
                    ];
                    break;

                /*
                |--------------------------------------------------------------------------
                | APLIKASI MOBILE
                |--------------------------------------------------------------------------
                */
                case 'aplikasi-mobile-android-ios':
                    $packages = [
                        [
                            'name' => 'Mobile App Starter',
                            'features' => [
                                'Hingga 5 screen',
                                'Login & register',
                                'API integration',
                            ],
                            'price' => 12000000,
                            'duration' => 45,
                            'is_popular' => false,
                        ],
                        [
                            'name' => 'Mobile App Professional',
                            'features' => [
                                'Push notification',
                                'Admin panel',
                                'Analytics',
                            ],
                            'price' => 20000000,
                            'duration' => 60,
                            'is_popular' => true,
                        ],
                        [
                            'name' => 'Mobile App Enterprise',
                            'features' => [
                                'Custom feature kompleks',
                                'High performance',
                                'Maintenance 6 bulan',
                            ],
                            'price' => 40000000,
                            'duration' => 90,
                            'is_popular' => false,
                        ],
                    ];
                    break;

                /*
                |--------------------------------------------------------------------------
                | UI/UX
                |--------------------------------------------------------------------------
                */
                case 'desain-ui-ux-produk-digital':
                    $packages = [
                        [
                            'name' => 'UI Design Basic',
                            'features' => [
                                'Wireframe',
                                'Mockup high fidelity',
                                '2x revisi',
                            ],
                            'price' => 4000000,
                            'duration' => 14,
                            'is_popular' => false,
                        ],
                        [
                            'name' => 'UX Research & Design',
                            'features' => [
                                'User research',
                                'User journey',
                                'Prototype interaktif',
                            ],
                            'price' => 8000000,
                            'duration' => 21,
                            'is_popular' => true,
                        ],
                        [
                            'name' => 'Full Product Design',
                            'features' => [
                                'Design system',
                                'Usability testing',
                                'Developer handoff',
                            ],
                            'price' => 15000000,
                            'duration' => 30,
                            'is_popular' => false,
                        ],
                    ];
                    break;

                /*
                |--------------------------------------------------------------------------
                | MAINTENANCE
                |--------------------------------------------------------------------------
                */
                case 'maintenance-support':
                    $packages = [
                        [
                            'name' => 'Maintenance Basic',
                            'features' => [
                                'Backup mingguan',
                                'Update sistem',
                                'Monitoring server',
                            ],
                            'price' => 1000000,
                            'duration' => 30,
                            'is_popular' => false,
                        ],
                        [
                            'name' => 'Maintenance Professional',
                            'features' => [
                                'Backup harian',
                                'Optimasi performa',
                                'Security patch',
                            ],
                            'price' => 2500000,
                            'duration' => 30,
                            'is_popular' => true,
                        ],
                        [
                            'name' => 'Maintenance Enterprise',
                            'features' => [
                                'Monitoring 24/7',
                                'Priority support',
                                'Dedicated engineer',
                            ],
                            'price' => 5000000,
                            'duration' => 30,
                            'is_popular' => false,
                        ],
                    ];
                    break;
            }

            foreach ($packages as $index => $package) {
                Package::updateOrCreate(
                    ['slug' => Str::slug($package['name'] . '-' . $service->slug)],
                    [
                        'service_id' => $service->id,
                        'name' => $package['name'],
                        'short_description' => $package['name'],
                        'description' => 'Detail layanan untuk ' . $package['name'],
                        'features' => $package['features'],
                        'price' => $package['price'],
                        'duration' => $package['duration'],
                        'sort_order' => $index + 1,
                        'status' => 'active',
                        'is_popular' => $package['is_popular'],
                    ]
                );
            }
        }
    }
}