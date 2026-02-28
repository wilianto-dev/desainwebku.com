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
        $this->command->info('Membuat roles dan permissions...');
        
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);

        // Define permissions
        $permissions = [
            'view users', 'create users', 'edit users', 'delete users',
            'view services', 'create services', 'edit services', 'delete services',
            'view packages', 'create packages', 'edit packages', 'delete packages',
            'view orders', 'create orders', 'edit orders', 'delete orders',
            'view portfolios', 'create portfolios', 'edit portfolios', 'delete portfolios',
            'view testimonials', 'create testimonials', 'edit testimonials', 'delete testimonials',
            'view pages', 'create pages', 'edit pages', 'delete pages',
            'view settings', 'edit settings',
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

        // ============ USERS ============
        $this->command->info('Membuat pengguna...');

        // Admin users
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@desainwebku.com',
            'password' => Hash::make('password123'),
            'phone' => '+6281234567890',
            'status' => 'active',
            'email_verified_at' => now(),
            'avatar' => 'https://ui-avatars.com/api/?name=Admin&background=0D8F81&color=fff&size=128',
        ]);
        $admin->assignRole('admin');

        // Regular users (15 users)
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
                'avatar' => "https://ui-avatars.com/api/?name=" . urlencode($userData[0]) . "&background=F59E0B&color=fff&size=128",
            ]);
            $user->assignRole('user');
            $users[] = $user;
        }

        // ============ SERVICES ============
        $this->command->info('Membuat layanan...');
        
        // 🌐 Website Company Profile
        $companyProfileServices = [
            [
                'title' => 'Jasa Pembuatan Website Company Profile Profesional',
                'description' => 'Layanan pembuatan website company profile profesional untuk perusahaan, UMKM, dan instansi. Desain modern, responsif, dan siap meningkatkan branding bisnis Anda.',
                'features' => [
                    'Desain eksklusif & modern sesuai branding perusahaan',
                    'Halaman: Beranda, Tentang, Layanan, Portofolio, Kontak',
                    'Formulir kontak dengan validasi dan notifikasi email',
                    'Integrasi Google Maps untuk lokasi kantor',
                    'Galeri foto & video produk/layanan',
                    'CMS (Content Management System) untuk update konten',
                    'Optimasi SEO dasar untuk pencarian Google',
                    'SSL Certificate untuk keamanan website',
                    'Tampilan mobile responsive di semua device',
                    'Integrasi dengan media sosial perusahaan',
                    'Statistik pengunjung dengan Google Analytics',
                    'Backup database secara berkala'
                ],
                'price' => 3500000,
                'duration' => 14,
                'category' => 'Website Company Profile'
            ],
            [
                'title' => 'Jasa Pembuatan Website Corporate & Startup',
                'description' => 'Website korporat dengan tampilan profesional untuk perusahaan besar dan startup yang ingin membangun brand image kuat di dunia digital.',
                'features' => [
                    'Desain corporate elegan dan berkelas',
                    'Company profile lengkap dengan struktur organisasi',
                    'Halaman tim & struktur organisasi interaktif',
                    'Informasi karir & lowongan pekerjaan',
                    'Halaman investor relations untuk perusahaan publik',
                    'Press release & berita perusahaan',
                    'Newsletter subscription untuk marketing',
                    'Multilingual (Indonesia-Inggris) untuk pasar global',
                    'FAQ interaktif untuk customer service',
                    'Testimonial slider dari klien',
                    'Client showcase dengan studi kasus',
                    'Certificate & award display'
                ],
                'price' => 5500000,
                'duration' => 21,
                'category' => 'Website Company Profile'
            ],
            [
                'title' => 'Jasa Pembuatan Website Personal Branding',
                'description' => 'Website portofolio personal untuk profesional, freelancer, artis, atau public figure yang ingin membangun personal brand.',
                'features' => [
                    'Desain personal & unik mencerminkan karakter',
                    'Biodata & CV online yang bisa di-download',
                    'Portofolio proyek dengan filter kategori',
                    'Testimonial klien untuk meningkatkan kredibilitas',
                    'Blog pribadi untuk berbagi pemikiran',
                    'Kontak & booking jadwal konsultasi',
                    'Integrasi dengan semua sosial media',
                    'Galeri foto & video karya',
                    'Download CV/Portfolio dalam format PDF',
                    'Client area login untuk klien'
                ],
                'price' => 2800000,
                'duration' => 10,
                'category' => 'Website Company Profile'
            ],
            [
                'title' => 'Jasa Pembuatan Website Sekolah & Instansi Pendidikan',
                'description' => 'Website untuk institusi pendidikan dengan fitur informasi akademik, pengumuman, PPDB online, dan profil sekolah lengkap.',
                'features' => [
                    'Profil sekolah lengkap dengan sejarah dan visi-misi',
                    'Berita & pengumuman terkini',
                    'Galeri kegiatan dan prestasi siswa',
                    'Pendaftaran online (PPDB) terintegrasi',
                    'Data guru & staff pengajar',
                    'Kurikulum & program unggulan',
                    'E-learning integration untuk pembelajaran online',
                    'Perpustakaan digital',
                    'Alumni tracker dan jejaring alumni',
                    'Kalender akademik interaktif',
                    'Informasi PPDB lengkap',
                    'Download area untuk materi pembelajaran'
                ],
                'price' => 4200000,
                'duration' => 18,
                'category' => 'Website Company Profile'
            ],
            [
                'title' => 'Jasa Pembuatan Landing Page Produk & Campaign',
                'description' => 'Landing page khusus untuk campaign marketing atau peluncuran produk dengan fokus konversi tinggi dan desain yang memikat.',
                'features' => [
                    'Desain fokus konversi (conversion-focused)',
                    'Copywriting profesional untuk meningkatkan penjualan',
                    'Call-to-action strategis di setiap section',
                    'Form leads generation terintegrasi CRM',
                    'Integrasi dengan email marketing (Mailchimp)',
                    'Countdown timer untuk promo terbatas',
                    'Video background untuk engagement',
                    'A/B testing ready untuk optimasi',
                    'Analytics tracking untuk monitoring',
                    'Social proof section dengan testimonial',
                    'Guarantee badge untuk meningkatkan kepercayaan',
                    'FAQ accordion yang interaktif'
                ],
                'price' => 2200000,
                'duration' => 7,
                'category' => 'Website Company Profile'
            ]
        ];

        // 🛒 Website E-commerce
        $ecommerceServices = [
            [
                'title' => 'Jasa Pembuatan Toko Online Profesional',
                'description' => 'Layanan pembuatan toko online profesional dengan sistem manajemen produk, keranjang belanja, dan pembayaran terintegrasi untuk memulai bisnis digital.',
                'features' => [
                    'Manajemen produk unlimited dengan gambar',
                    'Kategori & subkategori produk',
                    'Sistem keranjang belanja yang user-friendly',
                    'Checkout multi-step yang mudah',
                    'Payment gateway (Midtrans/Xendit)',
                    'Manajemen stok & inventory real-time',
                    'Sistem tracking order untuk customer',
                    'Invoice otomatis setelah pembayaran',
                    'Notifikasi email & WhatsApp',
                    'Dashboard admin untuk manajemen toko',
                    'Laporan penjualan lengkap',
                    'Manajemen diskon dan promo'
                ],
                'price' => 7500000,
                'duration' => 30,
                'category' => 'Website E-commerce'
            ],
            [
                'title' => 'Jasa Pembuatan Marketplace Multi Vendor',
                'description' => 'Platform marketplace dengan banyak penjual, sistem komisi otomatis, dan manajemen vendor terpisah untuk model bisnis seperti Tokopedia atau Shopee.',
                'features' => [
                    'Multi vendor registration dengan verifikasi',
                    'Vendor dashboard khusus untuk setiap penjual',
                    'Sistem komisi otomatis per transaksi',
                    'Manajemen produk per vendor',
                    'Withdraw saldo vendor otomatis',
                    'Review & rating vendor dan produk',
                    'Chat vendor-pembeli terintegrasi',
                    'Admin approval system untuk produk baru',
                    'Sistem dispute resolution',
                    'Rekonsiliasi pembayaran otomatis',
                    'Vendor performance report',
                    'Multi-level commission untuk afiliasi'
                ],
                'price' => 15000000,
                'duration' => 45,
                'category' => 'Website E-commerce'
            ],
            [
                'title' => 'Jasa Integrasi Payment Gateway & Checkout',
                'description' => 'Integrasi sistem pembayaran lengkap untuk toko online dengan berbagai metode pembayaran untuk memudahkan transaksi pelanggan.',
                'features' => [
                    'Multi payment gateway dalam satu platform',
                    'Transfer bank (BCA, Mandiri, BRI, BNI)',
                    'E-wallet (OVO, GoPay, DANA, LinkAja)',
                    'Pembayaran dengan credit card',
                    'COD (Cash on Delivery) dengan verifikasi',
                    'Virtual account untuk semua bank',
                    'QRIS payment untuk pembayaran non-tunai',
                    'Pembayaran via Indomaret/Alfamart',
                    'Payment status tracking real-time',
                    'Auto reconciliation dengan sistem',
                    'Refund system otomatis',
                    'Payment history untuk customer'
                ],
                'price' => 3800000,
                'duration' => 14,
                'category' => 'Website E-commerce'
            ],
            [
                'title' => 'Jasa Pembuatan Sistem Diskon & Voucher',
                'description' => 'Sistem promo dan voucher lengkap untuk meningkatkan penjualan dan loyalitas pelanggan toko online Anda.',
                'features' => [
                    'Voucher code generator dengan format custom',
                    'Diskon persentase & nominal fleksibel',
                    'Promo Buy X get Y untuk bundling',
                    'Minimal pembelian untuk setiap promo',
                    'Free shipping voucher untuk ongkir gratis',
                    'Flash sale timer dengan countdown',
                    'Diskon member tier berdasarkan level',
                    'Bundle produk dengan harga spesial',
                    'Cashback system ke dalam wallet',
                    'Referral program untuk pelanggan',
                    'Birthday voucher otomatis',
                    'Voucher usage limit per user'
                ],
                'price' => 2800000,
                'duration' => 10,
                'category' => 'Website E-commerce'
            ],
            [
                'title' => 'Jasa Integrasi Ongkir & Tracking',
                'description' => 'Integrasi dengan layanan pengiriman untuk kalkulasi ongkir otomatis dan tracking pengiriman real-time untuk toko online.',
                'features' => [
                    'RajaOngkir integration untuk semua kurir',
                    'Multi kurir (JNE, TIKI, POS, J&T, SiCepat, AnterAja)',
                    'Auto tracking number dari sistem kurir',
                    'Status pengiriman real-time untuk customer',
                    'Estimasi biaya otomatis berdasarkan berat/lokasi',
                    'Cetak label resi langsung dari sistem',
                    'COD area management berdasarkan lokasi',
                    'Ongkir promo untuk wilayah tertentu',
                    'Weight-based shipping calculation',
                    'Location-based shipping dengan zone',
                    'Integration with warehouse system',
                    'Shipping report untuk analisis'
                ],
                'price' => 3200000,
                'duration' => 12,
                'category' => 'Website E-commerce'
            ]
        ];

        // 💻 Web Application
        $webAppServices = [
            [
                'title' => 'Jasa Pembuatan Sistem Informasi Manajemen (SIM)',
                'description' => 'Pengembangan sistem informasi manajemen terintegrasi untuk mengelola data dan proses bisnis perusahaan secara digital.',
                'features' => [
                    'Dashboard analitik dengan visualisasi data',
                    'Manajemen data terpusat dalam satu database',
                    'Multi-level user access dengan hak akses',
                    'Workflow approval untuk setiap proses',
                    'Report generator dengan berbagai format',
                    'Export data (Excel, PDF, CSV)',
                    'Data visualization dengan chart interaktif',
                    'Audit trail untuk semua aktivitas',
                    'Notification system via email & in-app',
                    'Document management dengan upload file',
                    'Task assignment ke tim',
                    'Calendar integration untuk jadwal'
                ],
                'price' => 12500000,
                'duration' => 40,
                'category' => 'Web Application'
            ],
            [
                'title' => 'Jasa Pembuatan Sistem HRIS & Payroll',
                'description' => 'Sistem manajemen sumber daya manusia lengkap dengan penggajian otomatis, manajemen cuti, dan absensi online.',
                'features' => [
                    'Database karyawan dengan data lengkap',
                    'Attendance & leave management online',
                    'Payroll calculation otomatis',
                    'BPJS & tax calculation (PPh 21)',
                    'Salary slip digital via email',
                    'Performance appraisal system',
                    'Recruitment system dengan tracking',
                    'Training management untuk karyawan',
                    'Loan & reimbursement management',
                    'Overtime calculation otomatis',
                    'Annual leave balance tracking',
                    'Employee self-service portal'
                ],
                'price' => 18500000,
                'duration' => 50,
                'category' => 'Web Application'
            ],
            [
                'title' => 'Jasa Pembuatan Sistem Inventory & Gudang',
                'description' => 'Sistem manajemen inventory dan gudang dengan tracking stok real-time, barcode scanner, dan manajemen supplier.',
                'features' => [
                    'Manajemen produk dengan varian',
                    'Stock in/out tracking real-time',
                    'Multiple warehouse management',
                    'Barcode scanner support untuk opname',
                    'Minimum stock alert via notifikasi',
                    'Stock opname dengan sistem',
                    'Purchase order ke supplier',
                    'Goods receipt dengan verifikasi',
                    'Inventory valuation (FIFO, average)',
                    'Supplier management dengan rating',
                    'Batch & expiry tracking',
                    'Inventory report lengkap'
                ],
                'price' => 11000000,
                'duration' => 35,
                'category' => 'Web Application'
            ],
            [
                'title' => 'Jasa Pembuatan Sistem CRM & ERP',
                'description' => 'Sistem manajemen hubungan pelanggan dan perencanaan sumber daya perusahaan untuk meningkatkan efisiensi bisnis.',
                'features' => [
                    'Customer database dengan history',
                    'Lead management dari berbagai sumber',
                    'Sales pipeline tracking',
                    'Interaction history dengan customer',
                    'Task & activity tracking untuk tim',
                    'Email integration untuk komunikasi',
                    'Quote & invoice management',
                    'Contract management dengan reminder',
                    'Customer support ticket system',
                    'Analytics & forecasting penjualan',
                    'Integration with accounting software',
                    'Mobile access untuk tim sales'
                ],
                'price' => 22000000,
                'duration' => 60,
                'category' => 'Web Application'
            ],
            [
                'title' => 'Jasa Pembuatan Dashboard Monitoring & Reporting',
                'description' => 'Dashboard interaktif untuk monitoring KPI dan laporan bisnis real-time dengan visualisasi data yang menarik.',
                'features' => [
                    'Custom dashboard sesuai kebutuhan',
                    'Real-time data update',
                    'Interactive charts (bar, line, pie)',
                    'Data filtering & drill-down',
                    'Scheduled report via email',
                    'Export multiple format (PDF, Excel)',
                    'User-specific views berdasarkan role',
                    'Alert & notification untuk KPI',
                    'Data comparison dengan periode',
                    'Trend analysis untuk prediksi',
                    'KPI tracking dengan target',
                    'Mobile responsive untuk akses di HP'
                ],
                'price' => 9500000,
                'duration' => 30,
                'category' => 'Web Application'
            ],
            [
                'title' => 'Jasa Pembuatan Custom Web App',
                'description' => 'Pengembangan aplikasi web kustom sesuai kebutuhan spesifik bisnis Anda dengan teknologi terkini.',
                'features' => [
                    'Analisis kebutuhan dan konsultasi',
                    'Database design sesuai kebutuhan',
                    'UI/UX custom design untuk pengalaman terbaik',
                    'Backend development dengan framework modern',
                    'API integration dengan sistem lain',
                    'Third-party integration (WhatsApp, Email)',
                    'Security implementation terbaik',
                    'Scalability planning untuk pertumbuhan',
                    'Performance optimization',
                    'Dokumentasi lengkap',
                    'User training untuk tim',
                    'Maintenance support berkelanjutan'
                ],
                'price' => 25000000,
                'duration' => 70,
                'category' => 'Web Application'
            ]
        ];

        // 🚀 Optimasi SEO
        $seoServices = [
            [
                'title' => 'Jasa Audit SEO Website Profesional',
                'description' => 'Analisis menyeluruh kondisi SEO website Anda dengan rekomendasi perbaikan untuk meningkatkan peringkat di Google.',
                'features' => [
                    'Technical SEO audit mendalam',
                    'On-page analysis untuk setiap halaman',
                    'Off-page evaluation backlink',
                    'Competitor analysis 3 kompetitor',
                    'Keyword ranking check di Google',
                    'Backlink profile audit',
                    'Site speed analysis dengan tools',
                    'Mobile friendly test',
                    'Content quality review',
                    'Broken links check',
                    'Duplicate content check',
                    'Detailed report & recommendation'
                ],
                'price' => 1800000,
                'duration' => 5,
                'category' => 'Optimasi SEO'
            ],
            [
                'title' => 'Jasa On-Page & Technical SEO',
                'description' => 'Optimasi faktor on-page dan teknis untuk meningkatkan peringkat website di mesin pencari Google.',
                'features' => [
                    'Meta tags optimization (title, description)',
                    'Header structure (H1, H2, H3)',
                    'URL structure optimization',
                    'Internal linking strategy',
                    'Image alt text optimization',
                    'XML sitemap creation',
                    'Robots.txt optimization',
                    'Canonical tags implementation',
                    '404 error fixing',
                    'Redirect implementation (301)',
                    'Schema markup dasar',
                    'Site structure improvement'
                ],
                'price' => 2500000,
                'duration' => 10,
                'category' => 'Optimasi SEO'
            ],
            [
                'title' => 'Jasa Optimasi Kecepatan Website',
                'description' => 'Peningkatan kecepatan loading website untuk user experience lebih baik dan ranking yang lebih tinggi di Google.',
                'features' => [
                    'PageSpeed Insights analysis',
                    'Image optimization tanpa reduce quality',
                    'Minify CSS/JS files',
                    'Browser caching implementation',
                    'Gzip compression',
                    'CDN integration dengan Cloudflare',
                    'Database optimization',
                    'Lazy loading implementation',
                    'Server response time improvement',
                    'Render-blocking resources removal',
                    'Core Web Vitals optimization',
                    'Performance report'
                ],
                'price' => 2200000,
                'duration' => 7,
                'category' => 'Optimasi SEO'
            ],
            [
                'title' => 'Jasa Optimasi Core Web Vitals',
                'description' => 'Fokus optimasi pada metrik Core Web Vitals untuk memenuhi standar Google dan meningkatkan user experience.',
                'features' => [
                    'LCP (Largest Contentful Paint) optimization',
                    'FID (First Input Delay) improvement',
                    'CLS (Cumulative Layout Shift) fix',
                    'TTFB optimization untuk server',
                    'First Contentful Paint',
                    'Time to Interactive',
                    'Speed Index improvement',
                    'Total Blocking Time reduction',
                    'Mobile optimization khusus',
                    'Desktop optimization',
                    'Real user monitoring',
                    'Vital score improvement'
                ],
                'price' => 2800000,
                'duration' => 8,
                'category' => 'Optimasi SEO'
            ],
            [
                'title' => 'Jasa Implementasi Structured Data & Schema Markup',
                'description' => 'Implementasi schema markup untuk rich snippets di hasil pencarian Google agar website tampil lebih menarik.',
                'features' => [
                    'Organization schema untuk perusahaan',
                    'Local business schema untuk bisnis lokal',
                    'Product schema untuk e-commerce',
                    'Article schema untuk blog/berita',
                    'FAQ schema untuk halaman FAQ',
                    'Review schema untuk testimonial',
                    'Event schema untuk acara',
                    'Recipe schema untuk makanan',
                    'Breadcrumb schema untuk navigasi',
                    'Video schema untuk konten video',
                    'Testing & validation dengan Google',
                    'Rich result monitoring'
                ],
                'price' => 2000000,
                'duration' => 5,
                'category' => 'Optimasi SEO'
            ],
            [
                'title' => 'Jasa SEO Maintenance Bulanan',
                'description' => 'Perawatan SEO rutin bulanan untuk menjaga dan meningkatkan peringkat website di mesin pencari.',
                'features' => [
                    'Monthly ranking report',
                    'Keyword position tracking',
                    'Content update dan optimasi',
                    'Backlink monitoring',
                    'Competitor tracking',
                    'Traffic analysis',
                    'Technical health check',
                    'Broken link fixing',
                    'Performance monitoring',
                    'Monthly strategy session via Zoom',
                    'Priority support',
                    'Emergency fixes'
                ],
                'price' => 1500000,
                'duration' => 30,
                'category' => 'Optimasi SEO'
            ]
        ];

        // Combine all services
        $allServices = array_merge(
            $companyProfileServices,
            $ecommerceServices,
            $webAppServices,
            $seoServices
        );

        foreach ($allServices as $serviceData) {
            Service::create([
                'user_id' => $admin->id,
                'title' => $serviceData['title'],
                'slug' => Str::slug($serviceData['title'] . '-' . Str::random(6)),
                'description' => $serviceData['description'],
                'features' => $serviceData['features'],
                'price' => $serviceData['price'],
                'duration' => $serviceData['duration'],
                'category' => $serviceData['category'],
                'status' => 'active',
                'is_featured' => in_array($serviceData['title'], [
                    'Jasa Pembuatan Website Company Profile Profesional',
                    'Jasa Pembuatan Toko Online Profesional',
                    'Jasa Pembuatan Sistem Informasi Manajemen (SIM)',
                    'Jasa Audit SEO Website Profesional'
                ]),
            ]);
        }

        // ============ PACKAGES ============
        $this->command->info('Membuat paket layanan...');

        // 🌐 Paket Website Company Profile
        $companyPackages = [
            [
                'name' => 'Paket Basic Company Profile',
                'category' => 'Website Company Profile',
                'description' => 'Paket dasar untuk memulai website company profile dengan fitur-fitur esensial dan harga terjangkau.',
                'features' => [
                    '5 Halaman Website',
                    'Responsive Design untuk semua device',
                    'Form Kontak dengan validasi',
                    'Basic SEO untuk pencarian Google',
                    '1x Revisi Desain',
                    'Gratis Domain .com (1 tahun)',
                    'Hosting 2GB SSD',
                    'SSL Certificate gratis',
                    'Integrasi Google Maps',
                    'Support Email 3x24 jam'
                ],
                'price' => 2500000,
                'is_popular' => false
            ],
            [
                'name' => 'Paket Professional Company Profile',
                'category' => 'Website Company Profile',
                'description' => 'Paket lengkap dengan fitur lebih advanced untuk tampilan website lebih profesional dan menarik.',
                'features' => [
                    'Unlimited Halaman',
                    'CMS Admin Panel untuk update konten',
                    'Blog / Artikel untuk konten marketing',
                    'Advanced SEO dengan keyword',
                    'Optimasi Kecepatan Website',
                    '3x Revisi Desain',
                    'Gratis Domain .com (1 tahun)',
                    'Hosting 5GB SSD',
                    'SSL Certificate',
                    'Integrasi Google Maps',
                    'Integrasi Media Sosial',
                    'Gallery Foto & Video',
                    'Newsletter Subscription',
                    'Priority Support 24 jam'
                ],
                'price' => 4500000,
                'is_popular' => true
            ],
            [
                'name' => 'Paket Premium Company Profile',
                'category' => 'Website Company Profile',
                'description' => 'Paket premium dengan desain custom dan fitur lengkap untuk perusahaan besar yang ingin tampil eksklusif.',
                'features' => [
                    'Custom UI/UX sesuai brand',
                    'Multi Bahasa (Indonesia-Inggris)',
                    'Integrasi WhatsApp Business',
                    'Optimasi Core Web Vitals',
                    'Support & Maintenance 3 Bulan',
                    'Unlimited Revisi Desain',
                    'Gratis Domain .com (2 tahun)',
                    'Hosting 10GB SSD',
                    'SSL Premium dengan warranty',
                    'CDN Integration',
                    'Backup Harian otomatis',
                    'Analitik Lanjutan',
                    'Form Booking & Appointment',
                    'FAQ Interaktif',
                    'Dedicated Support'
                ],
                'price' => 7500000,
                'is_popular' => false
            ]
        ];

        // 🛒 Paket Website E-Commerce
        $ecommercePackages = [
            [
                'name' => 'Paket Starter Store',
                'category' => 'Website E-commerce',
                'description' => 'Paket awal untuk memulai toko online dengan fitur dasar dan mudah digunakan.',
                'features' => [
                    'Manajemen Produk (50 produk)',
                    'Keranjang & Checkout sederhana',
                    'Payment Gateway (Midtrans)',
                    'Dashboard Admin',
                    'Manajemen Kategori',
                    'Tracking Order',
                    'Invoice Otomatis',
                    'Notifikasi Email',
                    'SSL Certificate',
                    'Hosting 3GB SSD'
                ],
                'price' => 5500000,
                'is_popular' => false
            ],
            [
                'name' => 'Paket Business Store',
                'category' => 'Website E-commerce',
                'description' => 'Paket bisnis dengan fitur lengkap untuk toko online yang sedang berkembang.',
                'features' => [
                    'Manajemen Produk Unlimited',
                    'Diskon & Voucher',
                    'Laporan Penjualan',
                    'SEO Produk untuk Google',
                    'Integrasi Ongkir (RajaOngkir)',
                    'Multi Payment Gateway',
                    'Manajemen Stok',
                    'Review Produk',
                    'Wishlist',
                    'Produk Terkait',
                    'Email Marketing',
                    'Hosting 10GB SSD',
                    'Domain .com (1 tahun)',
                    'Priority Support'
                ],
                'price' => 9500000,
                'is_popular' => true
            ],
            [
                'name' => 'Paket Enterprise Marketplace',
                'category' => 'Website E-commerce',
                'description' => 'Paket enterprise untuk marketplace dengan multi vendor dan fitur canggih.',
                'features' => [
                    'Multi Vendor',
                    'Sistem Komisi',
                    'Membership',
                    'Integrasi API Eksternal',
                    'Maintenance Prioritas',
                    'Vendor Dashboard',
                    'Withdraw System',
                    'Chat Vendor-Pembeli',
                    'Dispute Resolution',
                    'Advanced Report',
                    'Dedicated Server',
                    'Daily Backup',
                    '24/7 Monitoring',
                    'Unlimited Produk',
                    'Custom Feature'
                ],
                'price' => 18500000,
                'is_popular' => false
            ]
        ];

        // 💻 Paket Web Application
        $webAppPackages = [
            [
                'name' => 'Paket Basic System',
                'category' => 'Web Application',
                'description' => 'Paket dasar untuk pengembangan aplikasi web dengan fitur utama sesuai kebutuhan.',
                'features' => [
                    'Fitur Utama Sesuai Kebutuhan',
                    'User Login & Role (3 roles)',
                    'Dashboard Admin',
                    'Database Design',
                    'Input & Output Data',
                    'Search & Filter',
                    'Export Data (Excel)',
                    'Basic Reporting',
                    'Hosting Setup',
                    'Documentation'
                ],
                'price' => 12500000,
                'is_popular' => false
            ],
            [
                'name' => 'Paket Business System',
                'category' => 'Web Application',
                'description' => 'Paket bisnis dengan workflow dan integrasi untuk kebutuhan perusahaan berkembang.',
                'features' => [
                    'Workflow & Approval',
                    'Reporting & Export Data (Excel, PDF)',
                    'Integrasi API',
                    'Multi-level User Roles',
                    'Advanced Dashboard',
                    'Data Visualization',
                    'Notification System',
                    'Audit Trail',
                    'Backup System',
                    'Security Enhancement',
                    'Performance Optimization',
                    'User Training (2 sesi)'
                ],
                'price' => 22500000,
                'is_popular' => true
            ],
            [
                'name' => 'Paket Enterprise System',
                'category' => 'Web Application',
                'description' => 'Paket enterprise dengan pengembangan custom dan keamanan tinggi untuk perusahaan besar.',
                'features' => [
                    'Custom Full Development',
                    'High Security & Optimization',
                    'Deployment VPS / Cloud',
                    'Support & Maintenance (6 bulan)',
                    'Load Balancing',
                    'Advanced Encryption',
                    'Multi-language Support',
                    'Third-party Integration',
                    'Scalability Planning',
                    'Penetration Testing',
                    'SLA Guarantee',
                    'Dedicated Team',
                    'Source Code Ownership',
                    'White-label Option',
                    '24/7 Support'
                ],
                'price' => 45000000,
                'is_popular' => false
            ]
        ];

        // 🚀 Paket Optimasi SEO
        $seoPackages = [
            [
                'name' => 'Paket SEO Basic',
                'category' => 'Optimasi SEO',
                'description' => 'Paket dasar untuk optimasi SEO on-page website dengan fitur essential.',
                'features' => [
                    'Audit On-Page',
                    'Optimasi Meta Tag',
                    'Sitemap & Robots.txt',
                    'Google Analytics Setup',
                    'Google Search Console',
                    'Keyword Research (10 keywords)',
                    'Monthly Report',
                    'Basic Recommendation'
                ],
                'price' => 1500000,
                'is_popular' => false
            ],
            [
                'name' => 'Paket SEO Growth',
                'category' => 'Optimasi SEO',
                'description' => 'Paket growth dengan optimasi konten dan kecepatan untuk meningkatkan traffic.',
                'features' => [
                    'Keyword Research (20 keywords)',
                    'Optimasi Konten (5 halaman)',
                    'Internal Linking',
                    'Optimasi Speed',
                    'Backlink Analysis',
                    'Competitor Analysis',
                    'Local SEO',
                    'Mobile Optimization',
                    'Monthly Report',
                    'Content Strategy'
                ],
                'price' => 2800000,
                'is_popular' => true
            ],
            [
                'name' => 'Paket SEO Premium',
                'category' => 'Optimasi SEO',
                'description' => 'Paket premium dengan optimasi teknis mendalam untuk hasil maksimal.',
                'features' => [
                    'Technical SEO Mendalam',
                    'Schema Markup',
                    'Core Web Vitals Improvement',
                    'Monitoring & Reporting Bulanan',
                    'Keyword Research (50 keywords)',
                    'Optimasi Konten (15 halaman)',
                    'Link Building (5 backlink)',
                    'Content Creation',
                    'Google News Approval',
                    'Rich Snippet Implementation',
                    'E-commerce SEO',
                    'Video SEO',
                    'Priority Support',
                    'Weekly Report',
                    'Strategy Consultation'
                ],
                'price' => 5000000,
                'is_popular' => false
            ]
        ];

        // Combine all packages
        $allPackages = array_merge(
            $companyPackages,
            $ecommercePackages,
            $webAppPackages,
            $seoPackages
        );

        foreach ($allPackages as $packageData) {
            Package::create([
                'user_id' => $admin->id,
                'name' => $packageData['name'],
                'slug' => Str::slug($packageData['name']),
                'category' => $packageData['category'],
                'description' => $packageData['description'],
                'features' => $packageData['features'],
                'price' => $packageData['price'],
                'status' => 'active',
                'is_popular' => $packageData['is_popular'],
            ]);
        }

        // ============ PORTFOLIO ============
        $this->command->info('Membuat portofolio...');

        // 🌐 Website Company Profile Portfolio
        $companyPortfolio = [
            [
                'title' => 'Website Corporate Modern PT Maju Jaya Konstruksi',
                'description' => 'Website company profile modern untuk perusahaan kontraktor dengan desain elegan dan profesional. Menampilkan portofolio proyek, sertifikasi, dan klien.',
                'category' => 'Website Company Profile',
                'image' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format',
                'completion_date' => '2024-01-15',
                'technologies' => ['Laravel', 'Tailwind CSS', 'MySQL']
            ],
            [
                'title' => 'Website Startup Digital TechInnovate Indonesia',
                'description' => 'Landing page modern untuk startup teknologi dengan fokus pada konversi dan user experience. Dilengkapi dengan fitur booking demo dan newsletter.',
                'category' => 'Website Company Profile',
                'image' => 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format',
                'completion_date' => '2024-02-20',
                'technologies' => ['React', 'Next.js', 'Tailwind']
            ],
            [
                'title' => 'Website Sekolah & Pendidikan SMA Negeri 1 Jakarta',
                'description' => 'Website sekolah dengan sistem informasi akademik, PPDB online, dan e-learning untuk siswa dan guru.',
                'category' => 'Website Company Profile',
                'image' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format',
                'completion_date' => '2023-11-10',
                'technologies' => ['Laravel', 'Bootstrap', 'MySQL']
            ],
            [
                'title' => 'Landing Page Produk Teknologi SmartHome Indonesia',
                'description' => 'Landing page untuk peluncuran produk smart home dengan animasi interaktif, video product demo, dan form pre-order.',
                'category' => 'Website Company Profile',
                'image' => 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format',
                'completion_date' => '2024-03-05',
                'technologies' => ['Vue.js', 'GSAP', 'Tailwind']
            ],
            [
                'title' => 'Website Yayasan Non-Profit Yayasan Peduli Sesama',
                'description' => 'Website untuk yayasan sosial dengan fitur donasi online, campaign galang dana, dan laporan transparansi.',
                'category' => 'Website Company Profile',
                'image' => 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format',
                'completion_date' => '2023-12-18',
                'technologies' => ['WordPress', 'WooCommerce', 'PHP']
            ]
        ];

        // 🛒 Website E-commerce Portfolio
        $ecommercePortfolio = [
            [
                'title' => 'Toko Online Fashion StyleHub Indonesia',
                'description' => 'E-commerce fashion dengan katalog produk lengkap, fitur filter ukuran dan warna, serta integrasi pembayaran dan pengiriman.',
                'category' => 'Website E-commerce',
                'image' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format',
                'completion_date' => '2024-01-30',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'Midtrans']
            ],
            [
                'title' => 'Marketplace Produk Digital Digital Mall Indonesia',
                'description' => 'Marketplace untuk produk digital seperti template, software, dan desain dengan sistem multi vendor dan komisi otomatis.',
                'category' => 'Website E-commerce',
                'image' => 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format',
                'completion_date' => '2023-10-25',
                'technologies' => ['Laravel', 'React', 'MySQL', 'Xendit']
            ],
            [
                'title' => 'Sistem Penjualan Retail Toko Berkah',
                'description' => 'Sistem POS dan e-commerce terintegrasi untuk toko retail dengan manajemen stok real-time dan laporan penjualan.',
                'category' => 'Website E-commerce',
                'image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format',
                'completion_date' => '2024-02-14',
                'technologies' => ['Laravel', 'Livewire', 'MySQL', 'RajaOngkir']
            ],
            [
                'title' => 'Platform Membership FitLife Club',
                'description' => 'Platform membership untuk gym dengan sistem subscription, booking kelas, dan pembayaran recurring.',
                'category' => 'Website E-commerce',
                'image' => 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format',
                'completion_date' => '2023-09-12',
                'technologies' => ['Laravel', 'Alpine.js', 'MySQL', 'Stripe']
            ],
            [
                'title' => 'Toko Online Furniture Rumah Indah',
                'description' => 'E-commerce furniture dengan fitur 3D preview, custom produk, dan kalkulator ongkir berdasarkan dimensi.',
                'category' => 'Website E-commerce',
                'image' => 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format',
                'completion_date' => '2024-03-20',
                'technologies' => ['Laravel', 'Three.js', 'MySQL', 'Midtrans']
            ]
        ];

        // 💻 Web Application Portfolio
        $webAppPortfolio = [
            [
                'title' => 'Sistem Informasi Manajemen Perusahaan PT Global Teknologi',
                'description' => 'SIM terintegrasi untuk manajemen proyek, keuangan, dan HRD dalam satu platform untuk perusahaan teknologi.',
                'category' => 'Web Application',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format',
                'completion_date' => '2023-08-30',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'Redis']
            ],
            [
                'title' => 'Sistem HRIS & Payroll HR Pro Indonesia',
                'description' => 'Sistem HRIS lengkap dengan manajemen karyawan, absensi fingerprint, penggajian otomatis, dan slip online.',
                'category' => 'Web Application',
                'image' => 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&auto=format',
                'completion_date' => '2023-11-22',
                'technologies' => ['Laravel', 'React', 'MySQL', 'Redis']
            ],
            [
                'title' => 'Sistem Inventory & Gudang LogiTrack Indonesia',
                'description' => 'Sistem manajemen gudang dengan barcode scanner, tracking stok real-time, dan forecasting untuk logistik.',
                'category' => 'Web Application',
                'image' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format',
                'completion_date' => '2024-01-08',
                'technologies' => ['Laravel', 'Alpine.js', 'MySQL', 'Barcode API']
            ],
            [
                'title' => 'Portal Berita dengan CMS BeritaKita Media',
                'description' => 'Portal berita dengan CMS lengkap, manajemen iklan, dan analitik real-time untuk media online.',
                'category' => 'Web Application',
                'image' => 'https://images.unsplash.com/photo-1504711434967-e33886168f5c?w=800&auto=format',
                'completion_date' => '2023-12-05',
                'technologies' => ['Laravel', 'Livewire', 'MySQL', 'Elasticsearch']
            ],
            [
                'title' => 'Dashboard Monitoring Internal DataVision Corp',
                'description' => 'Dashboard interaktif untuk monitoring KPI perusahaan dengan visualisasi data real-time dan analitik.',
                'category' => 'Web Application',
                'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
                'completion_date' => '2024-02-28',
                'technologies' => ['Laravel', 'Chart.js', 'MySQL', 'WebSocket']
            ],
            [
                'title' => 'Sistem Manajemen Klinik SehatQ',
                'description' => 'Sistem informasi klinik dengan pendaftaran online, rekam medis digital, dan manajemen antrian.',
                'category' => 'Web Application',
                'image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format',
                'completion_date' => '2023-10-17',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL', 'Midtrans']
            ]
        ];

        // 🚀 Optimasi SEO Portfolio
        $seoPortfolio = [
            [
                'title' => 'Optimasi SEO Website Corporate PT Maju Jaya',
                'description' => 'Proyek optimasi SEO untuk website corporate yang berhasil meningkatkan traffic organik 200% dalam 3 bulan.',
                'category' => 'Optimasi SEO',
                'image' => 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format',
                'completion_date' => '2023-09-30',
                'results' => 'Traffic naik 200%, Keyword ranking top 10 untuk 15 keyword'
            ],
            [
                'title' => 'Optimasi SEO Portal Berita NewsPortal Indonesia',
                'description' => 'SEO untuk portal berita dengan fokus pada kecepatan dan struktur konten untuk Google News.',
                'category' => 'Optimasi SEO',
                'image' => 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format',
                'completion_date' => '2024-01-25',
                'results' => 'Disetujui Google News, Traffic meningkat 150%'
            ],
            [
                'title' => 'Optimasi SEO Toko Online FashionShop',
                'description' => 'Optimasi SEO untuk e-commerce fashion dengan fokus pada optimasi produk dan schema markup.',
                'category' => 'Optimasi SEO',
                'image' => 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format',
                'completion_date' => '2023-11-15',
                'results' => 'Penjualan organik naik 85%, Page load time turun 60%'
            ],
            [
                'title' => 'Migrasi Website & Recovery Ranking TechBlog',
                'description' => 'Migrasi website dengan pemulihan ranking setelah penalti algoritma Google.',
                'category' => 'Optimasi SEO',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format',
                'completion_date' => '2023-12-20',
                'results' => 'Recovery ranking 95%, Traffic kembali normal dalam 2 bulan'
            ],
            [
                'title' => 'Local SEO untuk Restoran Kuliner Nusantara',
                'description' => 'Optimasi local SEO untuk restoran dengan target pencarian lokal dan Google My Business.',
                'category' => 'Optimasi SEO',
                'image' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format',
                'completion_date' => '2024-02-10',
                'results' => 'Peringkat 1 di Google Maps, Kunjungan fisik naik 120%'
            ],
            [
                'title' => 'Technical SEO untuk Marketplace IndoMarket',
                'description' => 'Audit dan perbaikan technical SEO untuk marketplace dengan jutaan produk.',
                'category' => 'Optimasi SEO',
                'image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format',
                'completion_date' => '2023-08-25',
                'results' => 'Crawl budget optimal, Index rate naik 300%'
            ]
        ];

        // Combine all portfolio
        $allPortfolio = array_merge(
            $companyPortfolio,
            $ecommercePortfolio,
            $webAppPortfolio,
            $seoPortfolio
        );

        foreach ($allPortfolio as $portfolioData) {
            Portfolio::create([
                'user_id' => $admin->id,
                'title' => $portfolioData['title'],
                'slug' => Str::slug($portfolioData['title']),
                'description' => $portfolioData['description'],
                'category' => $portfolioData['category'],
                'image' => $portfolioData['image'],
                'technologies' => $portfolioData['technologies'] ?? null,
                'results' => $portfolioData['results'] ?? null,
                'status' => 'published',
                'published_at' => now(),
            ]);
        }

        // ============ SUMMARY ============
        $this->command->info('');
        $this->command->info('====================================');
        $this->command->info('SEEDER DATABASE SELESAI!');
        $this->command->info('====================================');
        $this->command->info('');
        $this->command->info('Total Pengguna: ' . User::count());
        $this->command->info('Total Layanan: ' . Service::count());
        $this->command->info('Total Paket: ' . Package::count());
        $this->command->info('Total Portofolio: ' . Portfolio::count());
        $this->command->info('');
        $this->command->info('Akun Login:');
        $this->command->info('  Admin: admin@desainwebku.com / password123');
        $this->command->info('  User: budi@example.com / password123');
        $this->command->info('');
        $this->command->info('====================================');
    }
}