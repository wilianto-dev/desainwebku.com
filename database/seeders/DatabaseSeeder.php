<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Service;
use App\Models\Package;
use App\Models\Portfolio;
use App\Models\Testimonial;
use App\Models\Page;
use App\Models\Order;
use App\Models\Setting;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ============ ROLES & PERMISSIONS ============
        $this->command->info('Creating roles and permissions...');
        
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
        $vendorRole = Role::firstOrCreate(['name' => 'vendor', 'guard_name' => 'web']);

        // Define permissions
        $permissions = [
            // User permissions
            'view users', 'create users', 'edit users', 'delete users',
            // Service permissions
            'view services', 'create services', 'edit services', 'delete services',
            // Package permissions
            'view packages', 'create packages', 'edit packages', 'delete packages',
            // Order permissions
            'view orders', 'create orders', 'edit orders', 'delete orders', 'process orders',
            // Portfolio permissions
            'view portfolios', 'create portfolios', 'edit portfolios', 'delete portfolios',
            // Testimonial permissions
            'view testimonials', 'create testimonials', 'edit testimonials', 'delete testimonials', 'approve testimonials',
            // Page permissions
            'view pages', 'create pages', 'edit pages', 'delete pages',
            // Setting permissions
            'view settings', 'edit settings',
            // Dashboard permissions
            'access dashboard', 'view reports',
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        }

        // Assign permissions to roles
        $adminRole->givePermissionTo(Permission::all());
        
        $userRole->givePermissionTo([
            'view services', 'view packages', 'view portfolios',
            'create orders', 'view orders', 'create testimonials',
            'view pages', 'access dashboard'
        ]);
        
        $vendorRole->givePermissionTo([
            'view services', 'create services', 'edit services', 'delete services',
            'view packages', 'create packages', 'edit packages', 'delete packages',
            'view portfolios', 'create portfolios', 'edit portfolios', 'delete portfolios',
            'view orders', 'process orders',
            'view testimonials',
            'view pages',
            'access dashboard', 'view reports'
        ]);

        // ============ USERS ============
        $this->command->info('Creating users...');

        // Admin users
        $admin = User::create([
            'name' => 'Super Administrator',
            'email' => 'admin@desainwebku.com',
            'password' => Hash::make('password123'),
            'phone' => '+6281234567890',
            'status' => 'active',
            'email_verified_at' => now(),
            'last_login_at' => now(),
            'avatar' => 'https://ui-avatars.com/api/?name=Super+Admin&background=0D8F81&color=fff&size=128',
        ]);
        $admin->assignRole('admin');

        $admin2 = User::create([
            'name' => 'Content Manager',
            'email' => 'content@desainwebku.com',
            'password' => Hash::make('password123'),
            'phone' => '+6281234567891',
            'status' => 'active',
            'email_verified_at' => now(),
            'last_login_at' => now(),
            'avatar' => 'https://ui-avatars.com/api/?name=Content+Manager&background=3B82F6&color=fff&size=128',
        ]);
        $admin2->assignRole('admin');

        // Vendor users
        $vendors = [];
        $vendorNames = [
            ['WebStudio Indonesia', 'info@webstudio.id', '+6282112345678'],
            ['Digital Creative House', 'hello@dch.co.id', '+6282134567890'],
            ['CodeCraft Solutions', 'contact@codecraft.dev', '+6282156789012'],
            ['Pixel Perfect Design', 'studio@pixelperfect.id', '+6282178901234'],
            ['DevOps Indonesia', 'hello@devops.id', '+6282190123456'],
        ];

        foreach ($vendorNames as $index => $vendorData) {
            $vendor = User::create([
                'name' => $vendorData[0],
                'email' => $vendorData[1],
                'password' => Hash::make('password123'),
                'phone' => $vendorData[2],
                'status' => 'active',
                'email_verified_at' => now(),
                'last_login_at' => now()->subDays(rand(0, 30)),
                'avatar' => "https://ui-avatars.com/api/?name=" . urlencode($vendorData[0]) . "&background=10B981&color=fff&size=128",
                'provider' => $index % 2 == 0 ? null : 'google',
                'provider_id' => $index % 2 == 0 ? null : Str::random(20),
            ]);
            $vendor->assignRole('vendor');
            $vendors[] = $vendor;
        }

        // Regular users
        $users = [];
        $userNames = [
            ['Budi Santoso', 'budi@example.com', '+6283112345678'],
            ['Siti Rahayu', 'siti@example.com', '+6283134567890'],
            ['Ahmad Hidayat', 'ahmad@example.com', '+6283156789012'],
            ['Dewi Lestari', 'dewi@example.com', '+6283178901234'],
            ['Rudi Hermawan', 'rudi@example.com', '+6283190123456'],
            ['Anisa Putri', 'anisa@example.com', '+6283212345678'],
            ['Hendra Wijaya', 'hendra@example.com', '+6283234567890'],
            ['Rina Wulandari', 'rina@example.com', '+6283256789012'],
            ['Eko Prasetyo', 'eko@example.com', '+6283278901234'],
            ['Maya Indah', 'maya@example.com', '+6283290123456'],
            ['Doni Saputra', 'doni@example.com', '+6283312345678'],
            ['Lina Susanti', 'lina@example.com', '+6283334567890'],
            ['Agus Setiawan', 'agus@example.com', '+6283356789012'],
            ['Nina Nurhayati', 'nina@example.com', '+6283378901234'],
            ['Joko Widodo', 'joko@example.com', '+6283390123456'],
        ];

        foreach ($userNames as $userData) {
            $user = User::create([
                'name' => $userData[0],
                'email' => $userData[1],
                'password' => Hash::make('password123'),
                'phone' => $userData[2],
                'status' => rand(0, 10) > 1 ? 'active' : 'inactive',
                'email_verified_at' => rand(0, 10) > 1 ? now()->subDays(rand(0, 60)) : null,
                'last_login_at' => now()->subDays(rand(0, 14)),
                'avatar' => "https://ui-avatars.com/api/?name=" . urlencode($userData[0]) . "&background=F59E0B&color=fff&size=128",
            ]);
            $user->assignRole('user');
            $users[] = $user;
        }

        // ============ SERVICES ============
        $this->command->info('Creating services...');
        
        $serviceCategories = [
            'Website Development' => [
                'title' => 'Website Company Profile',
                'description' => 'Website profesional untuk memperkenalkan perusahaan, visi misi, produk, dan layanan Anda.',
                'features' => [
                    'Desain responsif (mobile friendly)',
                    'CMS untuk manajemen konten',
                    'Halaman tentang kami, layanan, kontak',
                    'Formulir kontak dengan validasi',
                    'Integrasi Google Maps',
                    'Optimasi SEO dasar',
                    'SSL Certificate',
                    'Backup dan keamanan',
                    'Gratis domain .com selama 1 tahun',
                    'Pelatihan pengelolaan website',
                    'Gratis 3 bulan maintenance',
                    'Support 24/7 via email',
                    'Revisi desain 2x',
                    'Integrasi dengan media sosial',
                    'Analitik pengunjung'
                ],
                'price' => 3500000,
                'duration' => 14,
            ],
            'Website Development' => [
                'title' => 'Website E-commerce',
                'description' => 'Solusi toko online lengkap dengan sistem pembayaran, manajemen produk, dan laporan penjualan.',
                'features' => [
                    'Manajemen produk & kategori',
                    'Sistem keranjang belanja',
                    'Integrasi payment gateway (Midtrans/Xendit)',
                    'Sistem tracking order',
                    'Manajemen stok produk',
                    'Kupon diskon dan promo',
                    'Sistem review produk',
                    'Multi-level kategori produk',
                    'Filter dan pencarian produk',
                    'Rekonsiliasi pembayaran otomatis',
                    'Laporan penjualan',
                    'Integrasi dengan ekspedisi (RajaOngkir)',
                    'Akun pelanggan',
                    'Email notifikasi otomatis',
                    'WhatsApp notifikasi',
                    'Sistem wishlist',
                    'Produk terkait dan rekomendasi',
                    'Optimasi kecepatan loading',
                    'Sistem dropshipper',
                    'Multi-currency support'
                ],
                'price' => 7500000,
                'duration' => 30,
            ],
            'Mobile App Development' => [
                'title' => 'Aplikasi Mobile Android/iOS',
                'description' => 'Aplikasi mobile native atau hybrid sesuai kebutuhan bisnis Anda.',
                'features' => [
                    'Desain UI/UX modern',
                    'Develop dengan Flutter/React Native',
                    'Integrasi REST API',
                    'Push notification',
                    'Login dengan email & social media',
                    'Offline mode',
                    'Sinkronisasi data real-time',
                    'Manajemen profil pengguna',
                    'Upload foto/dokumen',
                    'Maps & lokasi',
                    'QR Code scanner',
                    'Chat in-app',
                    'Analitik penggunaan',
                    'Crash reporting',
                    'Update via App Store/Play Store',
                    'Backup data',
                    'Keamanan enkripsi',
                    'Multi-language support',
                    'Dark mode',
                    'Fingerprint authentication'
                ],
                'price' => 12000000,
                'duration' => 45,
            ],
            'UI/UX Design' => [
                'title' => 'UI/UX Design & Prototyping',
                'description' => 'Jasa desain antarmuka dan pengalaman pengguna untuk aplikasi web dan mobile.',
                'features' => [
                    'User research & personas',
                    'Information architecture',
                    'Wireframing (low & high fidelity)',
                    'Visual design dengan Figma',
                    'Interactive prototype',
                    'User flow diagram',
                    'Design system',
                    'Responsive design',
                    'Usability testing',
                    'Mood board & style guide',
                    'Icon & illustration design',
                    'Micro-interactions',
                    'Accessibility audit',
                    'Component library',
                    'Handoff ke developer',
                    'Revisi desain 3x',
                    'Presentasi desain',
                    'Training tim internal',
                    'Asset export lengkap',
                    'Design documentation'
                ],
                'price' => 5000000,
                'duration' => 21,
            ],
            'Digital Marketing' => [
                'title' => 'SEO & Digital Marketing',
                'description' => 'Optimasi website untuk mesin pencari dan strategi pemasaran digital.',
                'features' => [
                    'Audit SEO teknis',
                    'Riset keyword kompetitor',
                    'Optimasi on-page SEO',
                    'Content strategy',
                    'Link building berkualitas',
                    'Google Analytics setup',
                    'Google Search Console',
                    'Google My Business',
                    'Local SEO',
                    'Speed optimization',
                    'Mobile optimization',
                    'Structured data markup',
                    'XML sitemap',
                    'Meta tags optimization',
                    'Image optimization',
                    'Social media integration',
                    'Monthly report',
                    'Competitor analysis',
                    'Backlink monitoring',
                    'Keyword ranking tracking'
                ],
                'price' => 3000000,
                'duration' => 30,
            ],
            'Maintenance' => [
                'title' => 'Website Maintenance & Support',
                'description' => 'Layanan perawatan dan pemeliharaan website secara berkala.',
                'features' => [
                    'Update CMS dan plugin',
                    'Backup database mingguan',
                    'Monitoring uptime 24/7',
                    'Security scan & patching',
                    'Malware removal',
                    'Update konten bulanan',
                    'Optimasi database',
                    'Caching optimization',
                    'Email support',
                    'Emergency support',
                    'Performance report',
                    'Traffic analysis',
                    'SSL renewal monitoring',
                    'Domain renewal monitoring',
                    'Technical consultation',
                    'Revisi minor 2x',
                    'Add-on fitur kecil',
                    'CDN integration',
                    'WAF protection',
                    'DDoS mitigation'
                ],
                'price' => 500000,
                'duration' => 30,
            ],
        ];

        $serviceCounter = 0;
        $allServices = [];
        
        // Create services for vendors
        foreach ($vendors as $vendor) {
            foreach (array_slice($serviceCategories, 0, rand(3, 6)) as $category => $service) {
                for ($i = 0; $i < rand(1, 3); $i++) {
                    $suffix = $i > 0 ? ' ' . ['Premium', 'Pro', 'Enterprise', 'Basic'][$i] : '';
                    $features = $service['features'];
                    
                    // Randomize features (take subset for variety)
                    shuffle($features);
                    $featureCount = rand(8, count($features));
                    
                    $createdService = Service::create([
                        'user_id' => $vendor->id,
                        'title' => $service['title'] . $suffix,
                        'slug' => Str::slug($service['title'] . $suffix . '-' . Str::random(4)),
                        'description' => $service['description'] . ' ' . fake()->paragraphs(2, true),
                        'features' => array_slice($features, 0, $featureCount),
                        'price' => $service['price'] * (0.8 + ($i * 0.4)),
                        'duration' => $service['duration'] * (1 + ($i * 0.3)),
                        'status' => rand(0, 10) > 2 ? 'active' : 'inactive',
                        'is_featured' => rand(0, 10) > 7,
                    ]);
                    $allServices[] = $createdService;
                    $serviceCounter++;
                }
            }
        }

        $this->command->info("Created {$serviceCounter} services");

        // ============ PACKAGES ============
        $this->command->info('Creating packages...');
        
        $packageCategories = [
            'Basic' => [
                'name' => 'Basic Package',
                'description' => 'Paket dasar untuk memulai kehadiran online dengan fitur-fitur esensial.',
                'features' => [
                    'Website company profile',
                    'Domain .com gratis 1 tahun',
                    'Hosting 2GB',
                    'SSL Certificate',
                    '5 halaman website',
                    'Form kontak',
                    'Integrasi media sosial',
                    'Responsive design',
                    'Support email',
                    'Backup bulanan',
                    'Gratis 1 email business',
                    'Google Maps',
                    'Optimasi SEO dasar',
                    '1x revisi desain',
                    'Gratis maintenance 1 bulan',
                    'Photo slider',
                    'Gallery produk 10 item',
                    'Statistik pengunjung',
                    'Mobile friendly',
                    'Loading cepat'
                ],
                'price' => 2500000,
            ],
            'Professional' => [
                'name' => 'Professional Package',
                'description' => 'Paket lengkap untuk bisnis yang ingin tampil profesional dengan fitur lebih advanced.',
                'features' => [
                    'Website company profile/e-commerce',
                    'Domain .com gratis 1 tahun',
                    'Hosting 5GB',
                    'SSL Certificate',
                    'Unlimited pages',
                    'Sistem manajemen konten',
                    'Form kontak & newsletter',
                    'Integrasi payment gateway',
                    'Manajemen produk',
                    'Sistem order',
                    'Analitik website',
                    'Backup mingguan',
                    '5 email business',
                    'SEO advanced',
                    'Integrasi API',
                    'Multilingual support',
                    '3x revisi desain',
                    'Gratis maintenance 3 bulan',
                    'Priority support',
                    'Optimasi kecepatan',
                    'CDN integration',
                    'Blog system',
                    'Event kalender',
                    'Membership area',
                    'Social login'
                ],
                'price' => 5500000,
            ],
            'Enterprise' => [
                'name' => 'Enterprise Package',
                'description' => 'Solusi premium untuk perusahaan besar dengan fitur komprehensif dan prioritas support.',
                'features' => [
                    'Website/aplikasi custom',
                    'Domain .com gratis 3 tahun',
                    'Hosting unlimited',
                    'SSL Certificate premium',
                    'Unlimited pages & features',
                    'CRM integration',
                    'ERP integration',
                    'Mobile app (Android/iOS)',
                    'Advanced security',
                    'Load balancing',
                    'Daily backup',
                    'Unlimited email business',
                    'SEO master',
                    'Marketing automation',
                    'Advanced analytics',
                    'Unlimited revisions',
                    'Gratis maintenance 12 bulan',
                    'Dedicated support 24/7',
                    'SLA guarantee',
                    'Training tim internal',
                    'Custom feature development',
                    'Third-party integrations',
                    'Performance optimization',
                    'Security audit',
                    'Scalability planning',
                    'White-label solution',
                    'Source code ownership',
                    'Dedicated server',
                    '24/7 monitoring',
                    'Disaster recovery'
                ],
                'price' => 15000000,
            ],
        ];

        $packageCounter = 0;
        $allPackages = [];
        
        foreach ($vendors as $vendor) {
            foreach ($packageCategories as $category => $package) {
                $createdPackage = Package::create([
                    'user_id' => $vendor->id,
                    'name' => $package['name'] . ' - ' . $vendor->name,
                    'slug' => Str::slug($package['name'] . '-' . $vendor->name . '-' . Str::random(4)),
                    'description' => $package['description'],
                    'features' => $package['features'],
                    'price' => $package['price'],
                    'status' => 'active',
                    'is_popular' => $category === 'Professional',
                ]);
                $allPackages[] = $createdPackage;
                $packageCounter++;
            }
        }
        
        $this->command->info("Created {$packageCounter} packages");

        // ============ PORTFOLIOS ============
        $this->command->info('Creating portfolios...');
        
        $portfolioProjects = [
            // Category: Website
            [
                'category' => 'Website',
                'projects' => [
                    [
                        'title' => 'E-commerce Fashion',
                        'description' => 'Website e-commerce untuk brand fashion lokal dengan fitur lengkap termasuk payment gateway, tracking order, dan manajemen inventori.',
                        'image' => 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format',
                    ],
                    [
                        'title' => 'Portal Berita Online',
                        'description' => 'Portal berita dengan sistem manajemen konten, kategori berita, komentar, dan integrasi media sosial.',
                        'image' => 'https://images.unsplash.com/photo-1504711434967-e33886168f5c?w=800&auto=format',
                    ],
                    [
                        'title' => 'Company Profile Perusahaan Konstruksi',
                        'description' => 'Website perusahaan konstruksi dengan galeri proyek, sertifikasi, dan formulir konsultasi.',
                        'image' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format',
                    ],
                    [
                        'title' => 'Platform Belajar Online',
                        'description' => 'LMS (Learning Management System) dengan video course, quiz, sertifikat, dan sistem membership.',
                        'image' => 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format',
                    ],
                    [
                        'title' => 'Sistem Informasi Desa',
                        'description' => 'Website desa dengan informasi publik, pengaduan masyarakat, dan layanan administrasi online.',
                        'image' => 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format',
                    ],
                ]
            ],
            // Category: Mobile App
            [
                'category' => 'Mobile App',
                'projects' => [
                    [
                        'title' => 'Aplikasi Laundry Online',
                        'description' => 'Aplikasi mobile untuk pemesanan laundry dengan fitur tracking, pembayaran, dan rating.',
                        'image' => 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&auto=format',
                    ],
                    [
                        'title' => 'Aplikasi Kesehatan',
                        'description' => 'Aplikasi konsultasi dokter online dengan video call, chat, dan pembelian obat.',
                        'image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format',
                    ],
                    [
                        'title' => 'Aplikasi Reservasi Restoran',
                        'description' => 'Aplikasi booking meja restoran dengan menu digital dan review pengguna.',
                        'image' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format',
                    ],
                    [
                        'title' => 'Aplikasi Transportasi',
                        'description' => 'Aplikasi pemesanan transportasi dengan GPS tracking, estimasi biaya, dan multi-payment.',
                        'image' => 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format',
                    ],
                    [
                        'title' => 'Aplikasi Event Organizer',
                        'description' => 'Aplikasi manajemen event dengan ticketing, absensi, dan live streaming.',
                        'image' => 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format',
                    ],
                ]
            ],
            // Category: UI/UX Design
            [
                'category' => 'UI/UX Design',
                'projects' => [
                    [
                        'title' => 'Redesign Aplikasi Banking',
                        'description' => 'Redesign UI/UX aplikasi mobile banking dengan fokus pada kemudahan penggunaan dan keamanan.',
                        'image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format',
                    ],
                    [
                        'title' => 'UI Design Dashboard Analitik',
                        'description' => 'Desain dashboard untuk analitik data dengan visualisasi interaktif dan filter real-time.',
                        'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
                    ],
                    [
                        'title' => 'UX Research Aplikasi Edukasi',
                        'description' => 'Riset pengguna, wireframing, dan usability testing untuk aplikasi belajar anak.',
                        'image' => 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format',
                    ],
                    [
                        'title' => 'Design System E-commerce',
                        'description' => 'Pembuatan design system lengkap untuk platform e-commerce dengan komponen reusable.',
                        'image' => 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format',
                    ],
                    [
                        'title' => 'Mobile App Travel',
                        'description' => 'UI/UX design untuk aplikasi pemesanan tiket pesawat dan hotel.',
                        'image' => 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format',
                    ],
                ]
            ],
            // Category: Branding
            [
                'category' => 'Branding',
                'projects' => [
                    [
                        'title' => 'Brand Identity F&B',
                        'description' => 'Perancangan brand identity lengkap untuk restoran termasuk logo, packaging, dan media promosi.',
                        'image' => 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format',
                    ],
                    [
                        'title' => 'Rebranding Perusahaan Teknologi',
                        'description' => 'Rebranding perusahaan IT dengan visual identity modern dan aplikatif.',
                        'image' => 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&auto=format',
                    ],
                    [
                        'title' => 'Logo & Brand Guide',
                        'description' => 'Pembuatan logo dan brand guidelines untuk startup properti.',
                        'image' => 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&auto=format',
                    ],
                    [
                        'title' => 'Kemasan Produk',
                        'description' => 'Desain kemasan produk UMKM dengan konsep modern dan ramah lingkungan.',
                        'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format',
                    ],
                    [
                        'title' => 'Social Media Kit',
                        'description' => 'Pembuatan template konten media sosial yang konsisten dengan brand.',
                        'image' => 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format',
                    ],
                ]
            ],
        ];

        $portfolioCounter = 0;
        foreach ($vendors as $vendor) {
            foreach ($portfolioProjects as $categoryGroup) {
                foreach ($categoryGroup['projects'] as $project) {
                    Portfolio::create([
                        'user_id' => $vendor->id,
                        'title' => $project['title'] . ' - ' . $vendor->name,
                        'slug' => Str::slug($project['title'] . '-' . $vendor->name . '-' . Str::random(6)),
                        'description' => $project['description'],
                        'category' => $categoryGroup['category'],
                        'image' => $project['image'],
                        'status' => 'published',
                        'published_at' => now()->subDays(rand(0, 180)),
                    ]);
                    $portfolioCounter++;
                }
            }
        }
        
        $this->command->info("Created {$portfolioCounter} portfolio items");

        // ============ TESTIMONIALS ============
        $this->command->info('Creating testimonials...');
        
        $testimonialTexts = [
            'Sangat puas dengan hasil kerja tim. Website yang dibuat sesuai dengan brief dan lebih dari ekspektasi. Proses komunikasi juga lancar.',
            'Pelayanan cepat dan profesional. Website kami selesai lebih cepat dari deadline. Tim support sangat responsif.',
            'Harga kompetitif dengan kualitas premium. Desain modern dan user-friendly. Sangat direkomendasikan!',
            'Mereka sangat memahami kebutuhan bisnis kami. Solusi yang diberikan tepat sasaran dan meningkatkan penjualan online kami.',
            'Proses kolaborasi yang menyenangkan. Mereka terbuka dengan masukan dan selalu memberikan saran terbaik.',
            'Hasil redesign website perusahaan kami sangat memuaskan. Banyak klien baru yang memberikan komentar positif.',
            'Aplikasi mobile yang dibuat sangat stabil dan cepat. Fitur-fitur berjalan dengan sempurna.',
            'Tim support sangat membantu dalam proses maintenance. Setiap masalah selalu ditangani dengan cepat.',
            'Pelayanan after sales yang luar biasa. Mereka tidak hanya selesai di project, tapi juga membantu kami berkembang.',
            'UI/UX design yang dibuat sangat intuitif. Pengguna aplikasi kami memberikan rating tinggi di Play Store.',
            'Kerjasama yang baik, komunikatif, dan hasil kerja memuaskan. Akan menggunakan jasa mereka lagi untuk project selanjutnya.',
            'Salah satu keputusan terbaik memilih vendor ini. Profesional, tepat waktu, dan hasilnya berkualitas.',
        ];

        $testimonialCounter = 0;
        
        // Testimonials from users for vendors
        foreach ($vendors as $vendor) {
            // Get random users to give testimonials
            $reviewers = collect($users)->random(min(rand(5, 10), count($users)));
            
            foreach ($reviewers as $reviewer) {
                Testimonial::create([
                    'user_id' => $reviewer->id,
                    'name' => $reviewer->name,
                    'company' => fake()->company(),
                    'rating' => rand(4, 5),
                    'content' => $testimonialTexts[array_rand($testimonialTexts)],
                    'status' => rand(0, 10) > 1 ? 'approved' : 'pending',
                ]);
                $testimonialCounter++;
            }
        }
        
        $this->command->info("Created {$testimonialCounter} testimonials");

        // ============ PAGES ============
        $this->command->info('Creating pages...');
        
        $pages = [
            [
                'title' => 'Tentang Kami',
                'slug' => 'tentang-kami',
                'content' => '<h1 class="text-4xl font-bold mb-6">Tentang DesainWebku</h1>
                <p class="text-lg mb-4">DesainWebku adalah platform jasa pembuatan website profesional yang menghubungkan klien dengan vendor terbaik di Indonesia. Sejak berdiri tahun 2020, kami telah membantu lebih dari 500 bisnis untuk hadir secara digital.</p>
                
                <h2 class="text-2xl font-bold mt-8 mb-4">Visi Kami</h2>
                <p class="mb-4">Menjadi platform jasa digital terdepan di Indonesia yang memberdayakan UMKM dan perusahaan untuk berkembang melalui solusi teknologi yang inovatif dan terjangkau.</p>
                
                <h2 class="text-2xl font-bold mt-8 mb-4">Misi Kami</h2>
                <ul class="list-disc pl-6 mb-6 space-y-2">
                    <li>Menyediakan akses mudah bagi bisnis untuk mendapatkan layanan digital berkualitas</li>
                    <li>Memberdayakan vendor lokal dengan ekosistem yang mendukung pertumbuhan bisnis mereka</li>
                    <li>Menjaga standar kualitas tinggi melalui kurasi vendor dan review transparan</li>
                    <li>Terus berinovasi dalam teknologi dan layanan untuk memenuhi kebutuhan klien</li>
                    <li>Membangun komunitas digital yang saling mendukung dan berkembang bersama</li>
                </ul>
                
                <h2 class="text-2xl font-bold mt-8 mb-4">Nilai-Nilai Kami</h2>
                <div class="grid md:grid-cols-2 gap-6 mt-4">
                    <div class="bg-gray-50 p-5 rounded-lg">
                        <h3 class="font-bold text-xl mb-2">Integritas</h3>
                        <p>Kami menjunjung tinggi kejujuran dan transparansi dalam setiap interaksi dengan klien maupun vendor.</p>
                    </div>
                    <div class="bg-gray-50 p-5 rounded-lg">
                        <h3 class="font-bold text-xl mb-2">Kualitas</h3>
                        <p>Kami tidak pernah kompromi dengan kualitas. Setiap proyek harus memenuhi standar tertinggi.</p>
                    </div>
                    <div class="bg-gray-50 p-5 rounded-lg">
                        <h3 class="font-bold text-xl mb-2">Inovasi</h3>
                        <p>Kami selalu mencari cara baru dan lebih baik untuk menyelesaikan masalah klien.</p>
                    </div>
                    <div class="bg-gray-50 p-5 rounded-lg">
                        <h3 class="font-bold text-xl mb-2">Kolaborasi</h3>
                        <p>Kami percaya bahwa hasil terbaik lahir dari kerjasama yang erat dengan klien dan vendor.</p>
                    </div>
                </div>
                
                <h2 class="text-2xl font-bold mt-8 mb-4">Tim Kami</h2>
                <p class="mb-4">Kami memiliki tim yang terdiri dari para ahli di bidang web development, UI/UX design, digital marketing, dan project management. Setiap anggota tim berkomitmen untuk memberikan pelayanan terbaik bagi klien.</p>
                
                <div class="bg-blue-50 p-6 rounded-lg mt-6">
                    <h3 class="font-bold text-xl mb-3">Siap Memulai Proyek Anda?</h3>
                    <p class="mb-4">Konsultasikan kebutuhan website Anda dengan tim kami secara gratis. Kami siap membantu mewujudkan visi digital Anda.</p>
                    <a href="/kontak" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Hubungi Kami</a>
                </div>',
                'seo_title' => 'Tentang DesainWebku - Jasa Pembuatan Website Profesional',
                'seo_description' => 'Kenali lebih dekat DesainWebku, platform jasa pembuatan website terpercaya dengan vendor berkualitas. Visi, misi, dan nilai-nilai kami.',
                'status' => 'published',
            ],
            [
                'title' => 'Cara Kerja',
                'slug' => 'cara-kerja',
                'content' => '<h1 class="text-4xl font-bold mb-6">Bagaimana Cara Kerja DesainWebku?</h1>
                <p class="text-lg mb-8">Kami membuat proses pembuatan website menjadi mudah dan transparan. Berikut adalah alur kerja kami:</p>
                
                <div class="space-y-8">
                    <div class="flex flex-col md:flex-row gap-6 items-start">
                        <div class="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">1</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Konsultasi Kebutuhan</h3>
                            <p class="text-gray-600">Hubungi kami melalui form kontak atau WhatsApp untuk konsultasi gratis. Ceritakan kebutuhan website Anda, anggaran, dan timeline yang diinginkan.</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-6 items-start">
                        <div class="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">2</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Pilih Paket & Vendor</h3>
                            <p class="text-gray-600">Pilih paket layanan yang sesuai atau request custom. Kami akan merekomendasikan vendor terbaik yang sesuai dengan kebutuhan dan budget Anda.</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-6 items-start">
                        <div class="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">3</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Proses Desain & Development</h3>
                            <p class="text-gray-600">Vendor akan mulai mengerjakan proyek sesuai dengan brief. Anda dapat memantau progress melalui dashboard dan memberikan feedback secara real-time.</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-6 items-start">
                        <div class="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">4</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Review & Revisi</h3>
                            <p class="text-gray-600">Setelah prototype atau website siap, Anda dapat melakukan review dan meminta revisi sesuai kesepakatan. Kami menjamin kepuasan Anda.</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-6 items-start">
                        <div class="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">5</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Deploy & Go Live</h3>
                            <p class="text-gray-600">Website siap diluncurkan! Kami akan membantu proses deployment, setup domain, hosting, dan memastikan semuanya berjalan lancar.</p>
                        </div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row gap-6 items-start">
                        <div class="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">6</div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Maintenance & Support</h3>
                            <p class="text-gray-600">Layanan kami tidak berhenti setelah website live. Kami menyediakan paket maintenance dan support berkelanjutan untuk menjaga website Anda tetap prima.</p>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-6 rounded-lg mt-10">
                    <h3 class="text-xl font-bold mb-4">Keunggulan Bekerja dengan Kami</h3>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div class="p-4">
                            <div class="text-blue-600 font-bold text-2xl mb-2">500+</div>
                            <div class="font-semibold">Proyek Selesai</div>
                            <p class="text-sm text-gray-600">Telah dipercaya lebih dari 500 klien</p>
                        </div>
                        <div class="p-4">
                            <div class="text-blue-600 font-bold text-2xl mb-2">50+</div>
                            <div class="font-semibold">Vendor Terkurasi</div>
                            <p class="text-sm text-gray-600">Vendor berkualitas dengan portofolio terbaik</p>
                        </div>
                        <div class="p-4">
                            <div class="text-blue-600 font-bold text-2xl mb-2">98%</div>
                            <div class="font-semibold">Kepuasan Klien</div>
                            <p class="text-sm text-gray-600">Rating kepuasan klien dari review</p>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-10">
                    <a href="/kontak" class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">Konsultasi Gratis Sekarang</a>
                </div>',
                'seo_title' => 'Cara Kerja DesainWebku - Proses Mudah Pembuatan Website',
                'seo_description' => 'Pelajari alur kerja DesainWebku dalam pembuatan website profesional. Mulai dari konsultasi, desain, development, hingga maintenance.',
                'status' => 'published',
            ],
            [
                'title' => 'Kebijakan Privasi',
                'slug' => 'kebijakan-privasi',
                'content' => '<h1 class="text-3xl font-bold mb-6">Kebijakan Privasi</h1>
                <p class="mb-4">Terakhir diperbarui: ' . now()->format('d F Y') . '</p>
                
                <p class="mb-6">DesainWebku ("kami", "kita", atau "milik kami") berkomitmen untuk melindungi privasi Anda. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi pribadi Anda ketika Anda menggunakan website dan layanan kami.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">1. Informasi yang Kami Kumpulkan</h2>
                <p class="mb-4">Kami dapat mengumpulkan informasi berikut:</p>
                <ul class="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Informasi pribadi:</strong> Nama, alamat email, nomor telepon, alamat.</li>
                    <li><strong>Informasi akun:</strong> Username, password, foto profil.</li>
                    <li><strong>Informasi pembayaran:</strong> Detail kartu kredit, informasi rekening bank (diproses oleh payment gateway terpercaya).</li>
                    <li><strong>Informasi teknis:</strong> Alamat IP, tipe browser, waktu akses, halaman yang dikunjungi.</li>
                    <li><strong>Informasi proyek:</strong> Brief, file, komunikasi terkait proyek.</li>
                </ul>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">2. Penggunaan Informasi</h2>
                <p class="mb-4">Kami menggunakan informasi yang dikumpulkan untuk:</p>
                <ul class="list-disc pl-6 mb-4 space-y-2">
                    <li>Menyediakan, memelihara, dan meningkatkan layanan kami</li>
                    <li>Memproses transaksi dan mengirimkan informasi terkait</li>
                    <li>Berkomunikasi dengan Anda tentang update, promo, dan informasi layanan</li>
                    <li>Personalisasi pengalaman Anda</li>
                    <li>Mendeteksi dan mencegah penipuan serta penyalahgunaan</li>
                    <li>Mematuhi kewajiban hukum</li>
                </ul>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">3. Pengungkapan Informasi</h2>
                <p class="mb-4">Kami dapat membagikan informasi Anda dalam situasi berikut:</p>
                <ul class="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Dengan vendor:</strong> Informasi proyek dibagikan dengan vendor yang mengerjakan proyek Anda.</li>
                    <li><strong>Penyedia layanan:</strong> Pihak ketiga yang membantu operasional kami (hosting, payment gateway, analytics).</li>
                    <li><strong>Kepatuhan hukum:</strong> Jika diwajibkan oleh hukum atau peraturan yang berlaku.</li>
                    <li><strong>Persetujuan:</strong> Dengan persetujuan eksplisit dari Anda.</li>
                </ul>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">4. Keamanan Data</h2>
                <p class="mb-4">Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran. Namun, tidak ada metode transmisi melalui internet atau metode penyimpanan elektronik yang 100% aman.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">5. Hak Anda</h2>
                <p class="mb-4">Anda memiliki hak untuk:</p>
                <ul class="list-disc pl-6 mb-4 space-y-2">
                    <li>Mengakses informasi pribadi yang kami simpan</li>
                    <li>Memperbaiki informasi yang tidak akurat</li>
                    <li>Menghapus informasi pribadi Anda</li>
                    <li>Membatasi pemrosesan data</li>
                    <li>Keberatan terhadap pemrosesan data</li>
                    <li>Portabilitas data</li>
                </ul>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">6. Cookie</h2>
                <p class="mb-4">Kami menggunakan cookie untuk meningkatkan pengalaman browsing Anda. Cookie adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur browser Anda untuk menolak cookie, namun beberapa fitur website mungkin tidak berfungsi dengan baik.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">7. Perubahan Kebijakan Privasi</h2>
                <p class="mb-4">Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diumumkan melalui website kami dan berlaku segera setelah dipublikasikan.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">8. Hubungi Kami</h2>
                <p class="mb-4">Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:</p>
                <p class="mb-2">Email: privacy@desainwebku.com</p>
                <p class="mb-6">Telepon: +6281234567890</p>',
                'seo_title' => 'Kebijakan Privasi - DesainWebku',
                'seo_description' => 'Kebijakan privasi DesainWebku tentang pengumpulan, penggunaan, dan perlindungan data pribadi pengguna.',
                'status' => 'published',
            ],
            [
                'title' => 'Syarat dan Ketentuan',
                'slug' => 'syarat-ketentuan',
                'content' => '<h1 class="text-3xl font-bold mb-6">Syarat dan Ketentuan Layanan</h1>
                <p class="mb-4">Terakhir diperbarui: ' . now()->format('d F Y') . '</p>
                
                <p class="mb-6">Dengan mengakses atau menggunakan website dan layanan DesainWebku, Anda menyetujui untuk terikat oleh syarat dan ketentuan berikut. Jika Anda tidak menyetujui bagian manapun dari syarat ini, Anda tidak diperbolehkan menggunakan layanan kami.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">1. Definisi</h2>
                <ul class="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Platform:</strong> Website DesainWebku dan semua layanan yang terkait.</li>
                    <li><strong>Pengguna:</strong> Individu atau entitas yang mengakses platform.</li>
                    <li><strong>Klien:</strong> Pengguna yang memesan layanan melalui platform.</li>
                    <li><strong>Vendor:</strong> Penyedia jasa yang terdaftar di platform.</li>
                    <li><strong>Layanan:</strong> Jasa yang ditawarkan oleh vendor melalui platform.</li>
                    <li><strong>Proyek:</strong> Pekerjaan spesifik yang disepakati antara klien dan vendor.</li>
                </ul>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">2. Akun Pengguna</h2>
                <p class="mb-2">2.1 Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun dan password Anda.</p>
                <p class="mb-2">2.2 Anda bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda.</p>
                <p class="mb-2">2.3 Anda setuju untuk memberikan informasi yang akurat, lengkap, dan terkini.</p>
                <p class="mb-4">2.4 Kami berhak menangguhkan atau menghentikan akun yang melanggar ketentuan ini.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">3. Layanan dan Proyek</h2>
                <p class="mb-2">3.1 Vendor bertanggung jawab penuh atas kualitas dan penyelesaian proyek sesuai kesepakatan.</p>
                <p class="mb-2">3.2 Klien setuju untuk memberikan brief yang jelas dan feedback tepat waktu.</p>
                <p class="mb-2">3.3 Perubahan lingkup proyek di luar kesepakatan awal dapat dikenakan biaya tambahan.</p>
                <p class="mb-4">3.4 Timeline proyek dimulai setelah pembayaran diterima dan brief disetujui.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">4. Pembayaran</h2>
                <p class="mb-2">4.1 Harga layanan tercantum dalam Rupiah (IDR) belum termasuk pajak.</p>
                <p class="mb-2">4.2 Pembayaran dilakukan di muka sesuai kesepakatan (biasanya 50% di awal, 50% setelah selesai).</p>
                <p class="mb-2">4.3 Kami menggunakan payment gateway pihak ketiga yang terpercaya untuk memproses pembayaran.</p>
                <p class="mb-4">4.4 Refund diproses sesuai kebijakan refund yang terpisah.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">5. Hak Kekayaan Intelektual</h2>
                <p class="mb-2">5.1 Seluruh hak kekayaan intelektual atas desain dan source code menjadi milik klien setelah pelunasan pembayaran.</p>
                <p class="mb-2">5.2 Vendor berhak mencantumkan proyek dalam portofolio mereka, kecuali ada perjanjian kerahasiaan.</p>
                <p class="mb-4">5.3 Klien tidak diperbolehkan menjual kembali source code atau desain kepada pihak ketiga.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">6. Batasan Tanggung Jawab</h2>
                <p class="mb-2">6.1 Platform bertindak sebagai perantara dan tidak bertanggung jawab atas sengketa antara klien dan vendor.</p>
                <p class="mb-2">6.2 Kami tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan layanan.</p>
                <p class="mb-4">6.3 Total tanggung jawab kami tidak melebihi nilai transaksi yang disengketakan.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">7. Penghentian Layanan</h2>
                <p class="mb-4">Kami berhak menghentikan atau menangguhkan akses ke layanan kami segera, tanpa pemberitahuan terlebih dahulu, jika Anda melanggar Syarat dan Ketentuan ini.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">8. Perubahan Syarat</h2>
                <p class="mb-4">Kami dapat memodifikasi syarat dan ketentuan ini setiap saat. Perubahan akan efektif segera setelah dipublikasikan di platform. Penggunaan berkelanjutan atas layanan kami setelah perubahan merupakan penerimaan Anda terhadap syarat yang baru.</p>
                
                <h2 class="text-2xl font-bold mt-6 mb-4">9. Hukum yang Berlaku</h2>
                <p class="mb-4">Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.</p>
                
                <div class="bg-yellow-50 p-5 rounded-lg mt-8">
                    <p class="font-semibold">Dengan menggunakan layanan DesainWebku, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh Syarat dan Ketentuan ini.</p>
                </div>',
                'seo_title' => 'Syarat dan Ketentuan - DesainWebku',
                'seo_description' => 'Syarat dan ketentuan penggunaan layanan DesainWebku. Baca sebelum menggunakan layanan kami.',
                'status' => 'published',
            ],
            [
                'title' => 'FAQ',
                'slug' => 'faq',
                'content' => '<h1 class="text-3xl font-bold mb-6">Pertanyaan yang Sering Diajukan (FAQ)</h1>
                
                <div class="space-y-6">
                    <div class="border-b pb-6">
                        <h3 class="text-xl font-bold mb-3">Umum</h3>
                        <div class="space-y-4">
                            <div>
                                <p class="font-semibold">Apa itu DesainWebku?</p>
                                <p class="text-gray-700">DesainWebku adalah platform yang menghubungkan klien dengan vendor jasa pembuatan website, aplikasi, dan layanan digital lainnya. Kami memfasilitasi proses dari konsultasi, pengerjaan, hingga serah terima proyek.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Bagaimana cara memesan layanan?</p>
                                <p class="text-gray-700">Anda dapat memesan layanan dengan memilih paket yang tersedia atau request custom melalui form konsultasi. Setelah itu, tim kami akan menghubungi Anda untuk mendiskusikan kebutuhan lebih lanjut.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Apakah ada konsultasi gratis?</p>
                                <p class="text-gray-700">Ya, kami menyediakan konsultasi gratis untuk setiap calon klien. Konsultasi dapat dilakukan via chat, telepon, atau video call.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-b pb-6">
                        <h3 class="text-xl font-bold mb-3">Pembayaran</h3>
                        <div class="space-y-4">
                            <div>
                                <p class="font-semibold">Metode pembayaran apa saja yang tersedia?</p>
                                <p class="text-gray-700">Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BRI, BNI), kartu kredit, e-wallet (OVO, GoPay, Dana), dan Alfamart/Indomaret.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Bagaimana sistem pembayarannya?</p>
                                <p class="text-gray-700">Untuk proyek website, umumnya menggunakan sistem DP 50% di awal dan pelunasan 50% setelah proyek selesai. Untuk proyek besar, dapat diatur termin pembayaran sesuai kesepakatan.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Apakah ada garansi uang kembali?</p>
                                <p class="text-gray-700">Ya, kami menyediakan garansi uang kembali jika vendor tidak memulai pengerjaan dalam waktu yang disepakati atau proyek tidak selesai sesuai kesepakatan. Syarat dan ketentuan berlaku.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-b pb-6">
                        <h3 class="text-xl font-bold mb-3">Proses Pengerjaan</h3>
                        <div class="space-y-4">
                            <div>
                                <p class="font-semibold">Berapa lama waktu pengerjaan website?</p>
                                <p class="text-gray-700">Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Website company profile biasanya 1-2 minggu, e-commerce 3-4 minggu, dan aplikasi mobile 4-8 minggu.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Bagaimana cara memantau progress proyek?</p>
                                <p class="text-gray-700">Anda dapat memantau progress proyek melalui dashboard klien. Kami juga mengadakan meeting rutin untuk memastikan proyek sesuai dengan keinginan Anda.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Berapa kali revisi yang didapatkan?</p>
                                <p class="text-gray-700">Jumlah revisi tergantung paket yang dipilih. Basic: 2x revisi, Professional: 3x revisi, Enterprise: unlimited revisi. Revisi tambahan dapat dikenakan biaya.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-b pb-6">
                        <h3 class="text-xl font-bold mb-3">Teknis</h3>
                        <div class="space-y-4">
                            <div>
                                <p class="font-semibold">Teknologi apa yang digunakan?</p>
                                <p class="text-gray-700">Kami menggunakan teknologi modern seperti Laravel, React, Vue.js, Flutter, dan WordPress. Teknologi spesifik dapat disesuaikan dengan kebutuhan proyek.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Apakah website akan responsif?</p>
                                <p class="text-gray-700">Ya, semua website yang kami buat responsif dan dapat diakses dengan optimal dari desktop, tablet, maupun smartphone.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Apakah saya bisa mengelola konten sendiri?</p>
                                <p class="text-gray-700">Ya, kami menyediakan Content Management System (CMS) yang mudah digunakan. Kami juga memberikan pelatihan singkat untuk tim Anda.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Apakah domain dan hosting sudah termasuk?</p>
                                <p class="text-gray-700">Untuk paket tertentu, domain dan hosting sudah termasuk untuk periode tertentu. Silakan cek detail masing-masing paket.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-b pb-6">
                        <h3 class="text-xl font-bold mb-3">Purna Jual</h3>
                        <div class="space-y-4">
                            <div>
                                <p class="font-semibold">Apakah ada layanan maintenance?</p>
                                <p class="text-gray-700">Ya, kami menyediakan paket maintenance bulanan/tahunan untuk memastikan website Anda tetap aman, update, dan berkinerja optimal.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Berapa biaya maintenance?</p>
                                <p class="text-gray-700">Biaya maintenance mulai dari Rp500.000/bulan tergantung tingkat layanan yang dibutuhkan.</p>
                            </div>
                            <div>
                                <p class="font-semibold">Bagaimana jika ada masalah setelah website live?</p>
                                <p class="text-gray-700">Kami menyediakan support 24/7 untuk masalah kritis. Untuk masalah non-kritis, respon dalam 1x24 jam.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-blue-50 p-6 rounded-lg mt-8">
                    <h3 class="text-xl font-bold mb-3">Tidak menemukan jawaban yang Anda cari?</h3>
                    <p class="mb-4">Hubungi tim support kami melalui:</p>
                    <div class="flex flex-col md:flex-row gap-4">
                        <a href="/kontak" class="bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition">Hubungi Kami</a>
                        <a href="https://wa.me/6281234567890" class="bg-green-600 text-white px-6 py-3 rounded-lg text-center hover:bg-green-700 transition">WhatsApp</a>
                    </div>
                </div>',
                'seo_title' => 'FAQ - Pertanyaan yang Sering Diajukan | DesainWebku',
                'seo_description' => 'Temukan jawaban atas pertanyaan umum tentang layanan DesainWebku, proses pengerjaan, pembayaran, dan dukungan teknis.',
                'status' => 'published',
            ],
            [
                'title' => 'Kontak Kami',
                'slug' => 'kontak',
                'content' => '<h1 class="text-3xl font-bold mb-6">Hubungi Kami</h1>
                
                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <p class="text-lg mb-6">Kami siap membantu Anda! Silakan hubungi tim kami untuk konsultasi gratis atau pertanyaan seputar layanan.</p>
                        
                        <div class="space-y-5">
                            <div class="flex items-start gap-4">
                                <div class="bg-blue-100 p-3 rounded-lg">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-semibold">Alamat</p>
                                    <p class="text-gray-600">Jl. Teknologi No. 123, Jakarta Selatan<br>DKI Jakarta, Indonesia 12345</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4">
                                <div class="bg-blue-100 p-3 rounded-lg">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-semibold">Email</p>
                                    <p class="text-gray-600">info@desainwebku.com</p>
                                    <p class="text-gray-600">support@desainwebku.com</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4">
                                <div class="bg-blue-100 p-3 rounded-lg">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-semibold">Telepon / WhatsApp</p>
                                    <p class="text-gray-600">+6281234567890</p>
                                    <p class="text-gray-600">+6281234567891</p>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-4">
                                <div class="bg-blue-100 p-3 rounded-lg">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-semibold">Jam Operasional</p>
                                    <p class="text-gray-600">Senin - Jumat: 09:00 - 18:00</p>
                                    <p class="text-gray-600">Sabtu: 09:00 - 15:00</p>
                                    <p class="text-gray-600">Minggu & Hari Libur: Tutup</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-8">
                            <p class="font-semibold mb-3">Ikuti Kami</p>
                            <div class="flex gap-3">
                                <a href="#" class="bg-gray-800 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/></svg>
                                </a>
                                <a href="#" class="bg-gray-800 text-white p-3 rounded-lg hover:bg-pink-600 transition">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.08 3.647c-2.993 0-3.661.014-4.713.069-1.016.052-1.742.208-2.226.346-.637.18-1.07.395-1.54.865-.47.47-.685.903-.865 1.54-.138.484-.294 1.21-.346 2.226-.055 1.052-.069 1.72-.069 4.713v.08c0 2.993.014 3.661.069 4.713.052 1.016.208 1.742.346 2.226.18.637.395 1.07.865 1.54.47.47.903.685 1.54.865.484.138 1.21.294 2.226.346 1.052.055 1.72.069 4.713.069h.08c2.993 0 3.661-.014 4.713-.069 1.016-.052 1.742-.208 2.226-.346.637-.18 1.07-.395 1.54-.865.47-.47.685-.903.865-1.54.138-.484.294-1.21.346-2.226.055-1.052.069-1.72.069-4.713v-.08c0-2.993-.014-3.661-.069-4.713-.052-1.016-.208-1.742-.346-2.226-.18-.637-.395-1.07-.865-1.54-.47-.47-.903-.685-1.54-.865-.484-.138-1.21-.294-2.226-.346-1.052-.055-1.72-.069-4.713-.069h-.08zM12 8.185a3.815 3.815 0 100 7.63 3.815 3.815 0 000-7.63zm0 1.452a2.363 2.363 0 110 4.726 2.363 2.363 0 010-4.726zm4.615-1.707a.915.915 0 11-1.83 0 .915.915 0 011.83 0z"/></svg>
                                </a>
                                <a href="#" class="bg-gray-800 text-white p-3 rounded-lg hover:bg-blue-400 transition">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                                </a>
                                <a href="#" class="bg-gray-800 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="text-xl font-bold mb-4">Kirim Pesan</h3>
                        <form>
                            <div class="mb-4">
                                <label class="block text-gray-700 mb-2">Nama Lengkap</label>
                                <input type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 mb-2">Email</label>
                                <input type="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 mb-2">No. Telepon</label>
                                <input type="tel" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 mb-2">Subjek</label>
                                <input type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 mb-2">Pesan</label>
                                <textarea rows="4" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
                            </div>
                            <button type="submit" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Kirim Pesan</button>
                        </form>
                    </div>
                </div>
                
                <div class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Lokasi Kami</h3>
                    <div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                        <div class="text-center">
                            <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                            </svg>
                            <p class="text-gray-600">Google Maps Integration</p>
                            <p class="text-sm text-gray-500">Jl. Teknologi No. 123, Jakarta Selatan</p>
                        </div>
                    </div>
                </div>',
                'seo_title' => 'Kontak Kami - DesainWebku',
                'seo_description' => 'Hubungi tim DesainWebku untuk konsultasi gratis dan informasi layanan pembuatan website profesional.',
                'status' => 'published',
            ],
        ];

        foreach ($pages as $page) {
            Page::updateOrCreate(
                ['slug' => $page['slug']],
                [
                    'user_id' => $admin->id,
                    'title' => $page['title'],
                    'content' => $page['content'],
                    'status' => $page['status'],
                    'seo_title' => $page['seo_title'],
                    'seo_description' => $page['seo_description'],
                ]
            );
        }

        $this->command->info('Pages created successfully');

        // ============ ORDERS ============
       // ============ ORDERS ============
// ============ ORDERS ============
$this->command->info('Creating orders...');

// Only use status values that exist in your migration
$orderStatuses = ['pending', 'paid', 'completed', 'cancelled'];
$orderCounter = 0;

// Convert to collections first
$allServicesCollection = collect($allServices);
$allPackagesCollection = collect($allPackages);

foreach ($users as $user) {
    // Each user has 1-3 orders
    $numOrders = rand(1, 3);
    
    for ($i = 0; $i < $numOrders; $i++) {
        $vendor = $vendors[array_rand($vendors)];
        
        // Filter services and packages by vendor
        $vendorServices = $allServicesCollection->where('user_id', $vendor->id);
        $vendorPackages = $allPackagesCollection->where('user_id', $vendor->id);
        
        // Skip if no services or packages
        if ($vendorServices->isEmpty() || $vendorPackages->isEmpty()) {
            continue;
        }
        
        $service = $vendorServices->random();
        $package = $vendorPackages->random();
        
        $status = $orderStatuses[array_rand($orderStatuses)];
        $createdAt = now()->subDays(rand(1, 60));
        
        // Calculate paid_at only for paid/completed status
        $paidAt = null;
        if (in_array($status, ['paid', 'completed'])) {
            $paidAt = $createdAt->copy()->addDays(rand(1, 3));
        }
        
        $order = Order::create([
            'user_id' => $user->id,
            'service_id' => $service->id,
            'package_id' => $package->id,
            'order_number' => 'ORD-' . date('Ymd', $createdAt->timestamp) . '-' . strtoupper(Str::random(6)),
            'status' => $status,
            'total_price' => $service->price + $package->price,
            'notes' => rand(0, 1) ? fake()->sentence() : null,
            'paid_at' => $paidAt,
            'created_at' => $createdAt,
            'updated_at' => $createdAt->copy()->addDays(rand(1, 10)),
        ]);
        
        $orderCounter++;
    }
}

$this->command->info("Created {$orderCounter} orders");

        // ============ SETTINGS ============
        $this->command->info('Creating settings...');
        
        $settings = [
            // General Settings
            ['key' => 'site_name', 'value' => 'DesainWebku', 'type' => 'text'],
            ['key' => 'site_description', 'value' => 'Platform Jasa Pembuatan Website, Aplikasi, dan Desain Digital No. 1 di Indonesia', 'type' => 'textarea'],
            ['key' => 'site_keywords', 'value' => 'jasa pembuatan website, jasa web developer, desain web murah, buat website profesional, jasa aplikasi mobile', 'type' => 'text'],
            ['key' => 'site_logo', 'value' => '/storage/settings/logo.png', 'type' => 'image'],
            ['key' => 'site_favicon', 'value' => '/storage/settings/favicon.ico', 'type' => 'image'],
            
            // Contact Information
            ['key' => 'contact_email', 'value' => 'info@desainwebku.com', 'type' => 'email'],
            ['key' => 'contact_phone', 'value' => '+6281234567890', 'type' => 'text'],
            ['key' => 'contact_whatsapp', 'value' => '6281234567890', 'type' => 'text'],
            ['key' => 'contact_address', 'value' => 'Jl. Teknologi No. 123, Jakarta Selatan, DKI Jakarta 12345', 'type' => 'textarea'],
            ['key' => 'contact_map', 'value' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56247127243!2d106.778997!3d-6.229386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945f34d85%3A0xbb1e7e2e5b5b5b5b!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>', 'type' => 'html'],
            
            // Social Media
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/desainwebku', 'type' => 'url'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/desainwebku', 'type' => 'url'],
            ['key' => 'social_twitter', 'value' => 'https://twitter.com/desainwebku', 'type' => 'url'],
            ['key' => 'social_linkedin', 'value' => 'https://linkedin.com/company/desainwebku', 'type' => 'url'],
            ['key' => 'social_youtube', 'value' => 'https://youtube.com/c/desainwebku', 'type' => 'url'],
            ['key' => 'social_tiktok', 'value' => 'https://tiktok.com/@desainwebku', 'type' => 'url'],
            
            // Homepage Settings
            ['key' => 'homepage_hero_title', 'value' => 'Wujudkan Website Impian Anda Bersama DesainWebku', 'type' => 'text'],
            ['key' => 'homepage_hero_subtitle', 'value' => 'Platform jasa pembuatan website, aplikasi, dan desain digital dengan vendor terkurasi dan kualitas terjamin', 'type' => 'textarea'],
            ['key' => 'homepage_hero_button_text', 'value' => 'Lihat Layanan Kami', 'type' => 'text'],
            ['key' => 'homepage_hero_button_link', 'value' => '/services', 'type' => 'text'],
            ['key' => 'homepage_hero_secondary_button_text', 'value' => 'Konsultasi Gratis', 'type' => 'text'],
            ['key' => 'homepage_hero_secondary_button_link', 'value' => '/contact', 'type' => 'text'],
            ['key' => 'homepage_hero_image', 'value' => '/storage/settings/hero-image.jpg', 'type' => 'image'],
            
            ['key' => 'homepage_features_title', 'value' => 'Mengapa Memilih DesainWebku?', 'type' => 'text'],
            ['key' => 'homepage_features_subtitle', 'value' => 'Kami memberikan solusi digital terbaik untuk bisnis Anda', 'type' => 'text'],
            
            ['key' => 'homepage_services_title', 'value' => 'Layanan Kami', 'type' => 'text'],
            ['key' => 'homepage_services_subtitle', 'value' => 'Pilih layanan yang sesuai dengan kebutuhan bisnis Anda', 'type' => 'text'],
            
            ['key' => 'homepage_portfolio_title', 'value' => 'Portofolio', 'type' => 'text'],
            ['key' => 'homepage_portfolio_subtitle', 'value' => 'Lihat beberapa proyek terbaik yang telah kami kerjakan', 'type' => 'text'],
            
            ['key' => 'homepage_testimonials_title', 'value' => 'Apa Kata Klien Kami?', 'type' => 'text'],
            ['key' => 'homepage_testimonials_subtitle', 'value' => 'Kepercayaan klien adalah motivasi kami untuk terus berkarya', 'type' => 'text'],
            
            ['key' => 'homepage_cta_title', 'value' => 'Siap Memulai Proyek Anda?', 'type' => 'text'],
            ['key' => 'homepage_cta_subtitle', 'value' => 'Konsultasikan kebutuhan website Anda dengan tim kami secara gratis', 'type' => 'text'],
            ['key' => 'homepage_cta_button_text', 'value' => 'Hubungi Kami Sekarang', 'type' => 'text'],
            ['key' => 'homepage_cta_button_link', 'value' => '/contact', 'type' => 'text'],
            
            // SEO Settings
            ['key' => 'meta_robots', 'value' => 'index, follow', 'type' => 'text'],
            ['key' => 'meta_author', 'value' => 'DesainWebku', 'type' => 'text'],
            ['key' => 'meta_google_verification', 'value' => '', 'type' => 'text'],
            ['key' => 'meta_bing_verification', 'value' => '', 'type' => 'text'],
            ['key' => 'meta_yandex_verification', 'value' => '', 'type' => 'text'],
            
            // Analytics Settings
            ['key' => 'google_analytics_id', 'value' => 'UA-XXXXXXXXX-X', 'type' => 'text'],
            ['key' => 'google_tag_manager_id', 'value' => 'GTM-XXXXXX', 'type' => 'text'],
            ['key' => 'facebook_pixel_id', 'value' => '123456789012345', 'type' => 'text'],
            
            // Payment Settings
            ['key' => 'payment_bank_name', 'value' => json_encode([
                ['name' => 'Bank Central Asia (BCA)', 'account_number' => '1234567890', 'account_name' => 'PT DesainWebku Indonesia'],
                ['name' => 'Bank Mandiri', 'account_number' => '0987654321', 'account_name' => 'PT DesainWebku Indonesia'],
                ['name' => 'Bank Negara Indonesia (BNI)', 'account_number' => '5556667778', 'account_name' => 'PT DesainWebku Indonesia'],
                ['name' => 'Bank Rakyat Indonesia (BRI)', 'account_number' => '9998887776', 'account_name' => 'PT DesainWebku Indonesia'],
            ]), 'type' => 'json'],
            ['key' => 'payment_e_wallet', 'value' => json_encode([
                ['name' => 'OVO', 'account_number' => '081234567890', 'account_name' => 'DesainWebku'],
                ['name' => 'GoPay', 'account_number' => '081234567891', 'account_name' => 'DesainWebku'],
                ['key' => 'DANA', 'account_number' => '081234567892', 'account_name' => 'DesainWebku'],
                ['key' => 'LinkAja', 'account_number' => '081234567893', 'account_name' => 'DesainWebku'],
            ]), 'type' => 'json'],
            ['key' => 'payment_midtrans', 'value' => json_encode([
                'merchant_id' => 'M123456',
                'client_key' => 'SB-Mid-client-xxxxxxxxxxxx',
                'server_key' => 'SB-Mid-server-xxxxxxxxxxxx',
                'is_production' => false,
            ]), 'type' => 'json'],
            
            // Email Settings
            ['key' => 'mail_driver', 'value' => 'smtp', 'type' => 'text'],
            ['key' => 'mail_host', 'value' => 'smtp.gmail.com', 'type' => 'text'],
            ['key' => 'mail_port', 'value' => '587', 'type' => 'text'],
            ['key' => 'mail_username', 'value' => 'noreply@desainwebku.com', 'type' => 'text'],
            ['key' => 'mail_password', 'value' => 'encrypted_password', 'type' => 'text'],
            ['key' => 'mail_encryption', 'value' => 'tls', 'type' => 'text'],
            ['key' => 'mail_from_address', 'value' => 'noreply@desainwebku.com', 'type' => 'email'],
            ['key' => 'mail_from_name', 'value' => 'DesainWebku', 'type' => 'text'],
            
            // Maintenance Mode
            ['key' => 'maintenance_mode', 'value' => 'false', 'type' => 'boolean'],
            ['key' => 'maintenance_message', 'value' => 'Website sedang dalam pemeliharaan. Silakan kembali lagi nanti.', 'type' => 'textarea'],
            
            // Footer Settings
            ['key' => 'footer_copyright', 'value' => '© ' . date('Y') . ' DesainWebku. All rights reserved.', 'type' => 'text'],
            ['key' => 'footer_description', 'value' => 'Platform jasa pembuatan website, aplikasi, dan desain digital terpercaya di Indonesia.', 'type' => 'textarea'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                [
                    'value' => $setting['value'],
                    'type' => $setting['type']
                ]
            );
        }

        $this->command->info('Settings created successfully');

        // ============ SUMMARY ============
        $this->command->info('');
        $this->command->info('====================================');
        $this->command->info('DATABASE SEEDING COMPLETED!');
        $this->command->info('====================================');
        $this->command->info('');
        $this->command->info('Users:');
        $this->command->info('  - Admin: ' . User::role('admin')->count() . ' users');
        $this->command->info('  - Vendor: ' . User::role('vendor')->count() . ' users');
        $this->command->info('  - User: ' . User::role('user')->count() . ' users');
        $this->command->info('  - Total: ' . User::count() . ' users');
        $this->command->info('');
        $this->command->info('Content:');
        $this->command->info('  - Services: ' . Service::count());
        $this->command->info('  - Packages: ' . Package::count());
        $this->command->info('  - Portfolios: ' . Portfolio::count());
        $this->command->info('  - Testimonials: ' . Testimonial::count());
        $this->command->info('  - Orders: ' . Order::count());
        $this->command->info('  - Pages: ' . Page::count());
        $this->command->info('  - Settings: ' . Setting::count());
        $this->command->info('');
        $this->command->info('Login Credentials:');
        $this->command->info('  - Admin: admin@desainwebku.com / password123');
        $this->command->info('  - Vendor: info@webstudio.id / password123 (and others)');
        $this->command->info('  - User: budi@example.com / password123 (and others)');
        $this->command->info('');
        $this->command->info('====================================');
    }
}