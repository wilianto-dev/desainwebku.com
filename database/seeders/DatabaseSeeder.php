<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Service;
use App\Models\Package;
use App\Models\Portfolio;
use App\Models\Testimonial;
use App\Models\Page;
use App\Models\Setting;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $adminRole = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);

        $userRole = Role::firstOrCreate([
            'name' => 'user',
            'guard_name' => 'web',
        ]);

        // Create permissions
        $permissions = [
            'view services', 'create services', 'edit services', 'delete services',
            'view packages', 'create packages', 'edit packages', 'delete packages',
            'view orders', 'create orders', 'edit orders', 'delete orders',
            'view portfolios', 'create portfolios', 'edit portfolios', 'delete portfolios',
            'view testimonials', 'create testimonials', 'edit testimonials', 'delete testimonials',
            'view pages', 'create pages', 'edit pages', 'delete pages',
            'view users', 'create users', 'edit users', 'delete users',
            'view settings', 'edit settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        }

        // Assign all permissions to admin
        $adminRole->givePermissionTo(Permission::all());

        // Create admin user
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@desainwebku.com',
            'password' => bcrypt('password123'),
            'status' => 'active',
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');

        // Create regular user
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password123'),
            'status' => 'active',
            'email_verified_at' => now(),
        ]);
        $user->assignRole('user');

        // Create services
        Service::factory()->count(5)->create(['user_id' => $admin->id]);

        // Create packages
        Package::factory()->count(3)->create(['user_id' => $admin->id]);

        // Create portfolio items
        $categories = ['Website', 'Mobile App', 'UI/UX Design', 'Branding'];
        
        $portfolioDescriptions = [
            'Website' => 'Sebuah website perusahaan dengan desain modern dan responsif. Dilengkapi dengan fitur CMS untuk manajemen konten yang mudah.',
            'Mobile App' => 'Aplikasi mobile untuk platform iOS dan Android dengan antarmuka yang user-friendly dan performa optimal.',
            'UI/UX Design' => 'Desain antarmuka pengguna yang intuitif dengan pengalaman pengguna yang optimal untuk aplikasi web dan mobile.',
            'Branding' => 'Pembuatan identitas merek lengkap termasuk logo, warna, tipografi, dan panduan gaya merek.',
        ];
        
        foreach ($categories as $category) {
            $slug = Str::slug("Sample {$category} Project");
            
            Portfolio::create([
                'user_id' => $admin->id,
                'title' => "Sample {$category} Project",
                'slug' => $slug,
                'description' => $portfolioDescriptions[$category] ?? 'Deskripsi proyek contoh.',
                'category' => $category,
                'image' => 'https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=' . urlencode($category),
                'status' => 'published',
                'published_at' => now(),
            ]);
        }

        // Create testimonials
        Testimonial::create([
            'user_id' => $user->id,
            'name' => 'John Doe',
            'company' => 'Tech Solutions Inc.',
            'rating' => 5,
            'content' => 'Pelayanan sangat memuaskan! Website yang dibuat sesuai dengan kebutuhan bisnis kami.',
            'status' => 'approved',
        ]);

        // Create more testimonials
        $testimonials = [
            [
                'name' => 'Sarah Johnson',
                'company' => 'Creative Agency',
                'rating' => 5,
                'content' => 'Tim desain sangat profesional dan memahami kebutuhan klien dengan baik.',
                'status' => 'approved',
            ],
            [
                'name' => 'Michael Chen',
                'company' => 'StartupXYZ',
                'rating' => 4,
                'content' => 'Aplikasi mobile yang dibuat membantu bisnis kami berkembang pesat.',
                'status' => 'approved',
            ],
            [
                'name' => 'Lisa Wang',
                'company' => 'E-commerce Store',
                'rating' => 5,
                'content' => 'Website e-commerce yang dibuat sangat user-friendly dan meningkatkan konversi penjualan.',
                'status' => 'approved',
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }

        // Create pages
        $pages = [
            [
                'title' => 'Tentang Kami',
                'slug' => 'tentang-kami',
                'content' => '<h2>Tentang DesainWebku</h2>
                <p>DesainWebku adalah perusahaan jasa pembuatan website profesional yang telah berpengalaman sejak 2020. Kami berkomitmen untuk memberikan solusi digital terbaik bagi bisnis Anda.</p>
                <p>Tim kami terdiri dari para ahli dalam bidang web development, UI/UX design, dan digital marketing yang siap membantu mewujudkan visi digital Anda.</p>
                <h3>Visi</h3>
                <p>Menjadi partner terpercaya dalam transformasi digital bisnis di Indonesia.</p>
                <h3>Misi</h3>
                <ul>
                    <li>Menyediakan solusi website berkualitas tinggi</li>
                    <li>Memberikan pelayanan terbaik kepada klien</li>
                    <li>Terus berinovasi dalam teknologi web</li>
                    <li>Membantu UMKM go digital</li>
                </ul>',
                'seo_description' => 'Tentang perusahaan DesainWebku - Jasa pembuatan website profesional',
            ],
            [
                'title' => 'Kebijakan Privasi',
                'slug' => 'kebijakan-privasi',
                'content' => '<h2>Kebijakan Privasi</h2>
                <p>Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda berikan.</p>
                <h3>Informasi yang Kami Kumpulkan</h3>
                <p>Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, email, dan informasi kontak lainnya saat Anda menggunakan layanan kami.</p>
                <h3>Penggunaan Informasi</h3>
                <p>Informasi yang kami kumpulkan digunakan untuk:</p>
                <ul>
                    <li>Menyediakan dan memperbaiki layanan kami</li>
                    <li>Berkomunikasi dengan Anda</li>
                    <li>Mengirimkan informasi penting tentang layanan</li>
                </ul>',
                'seo_description' => 'Kebijakan privasi penggunaan website dan layanan DesainWebku',
            ],
            [
                'title' => 'Syarat dan Ketentuan',
                'slug' => 'syarat-ketentuan',
                'content' => '<h2>Syarat dan Ketentuan Layanan</h2>
                <p>Dengan menggunakan layanan DesainWebku, Anda menyetujui syarat dan ketentuan berikut:</p>
                <h3>Penggunaan Layanan</h3>
                <p>Anda setuju untuk menggunakan layanan kami sesuai dengan hukum yang berlaku dan tidak untuk tujuan ilegal.</p>
                <h3>Hak Kekayaan Intelektual</h3>
                <p>Semua konten dan materi di website ini dilindungi hak cipta.</p>
                <h3>Perubahan Syarat</h3>
                <p>Kami berhak mengubah syarat dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya.</p>',
                'seo_description' => 'Syarat dan ketentuan penggunaan layanan DesainWebku',
            ],
            [
                'title' => 'FAQ',
                'slug' => 'faq',
                'content' => '<h2>Pertanyaan yang Sering Diajukan</h2>
                <h3>Berapa lama pembuatan website?</h3>
                <p>Waktu pembuatan bervariasi tergantung kompleksitas website, biasanya 1-4 minggu.</p>
                <h3>Apakah website responsif?</h3>
                <p>Ya, semua website yang kami buat responsif dan dapat diakses dari berbagai perangkat.</p>
                <h3>Apakah ada biaya maintenance?</h3>
                <p>Kami menawarkan paket maintenance dengan biaya terjangkau untuk perawatan berkala.</p>
                <h3>Bagaimana cara memulai proyek?</h3>
                <p>Hubungi kami melalui halaman kontak untuk konsultasi gratis terlebih dahulu.</p>',
                'seo_description' => 'Pertanyaan yang sering diajukan tentang jasa pembuatan website',
            ],
        ];

        foreach ($pages as $page) {
            Page::create([
                'user_id' => $admin->id,
                'title' => $page['title'],
                'slug' => $page['slug'],
                'content' => $page['content'],
                'status' => 'published',
                'seo_title' => $page['title'],
                'seo_description' => $page['seo_description'] ?? '',
            ]);
        }

        // Create settings
        $settings = [
            ['key' => 'site_name', 'value' => 'DesainWebku', 'type' => 'text'],
            ['key' => 'site_description', 'value' => 'Jasa Pembuatan Website Profesional', 'type' => 'text'],
            ['key' => 'site_email', 'value' => 'info@desainwebku.com', 'type' => 'text'],
            ['key' => 'site_phone', 'value' => '+6281234567890', 'type' => 'text'],
            ['key' => 'site_address', 'value' => 'Jl. Contoh No. 123, Jakarta', 'type' => 'text'],
            ['key' => 'site_logo', 'value' => '/images/logo.png', 'type' => 'text'],
            ['key' => 'site_favicon', 'value' => '/images/favicon.ico', 'type' => 'text'],
            ['key' => 'social_media', 'value' => json_encode([
                'facebook' => 'https://facebook.com/desainwebku',
                'instagram' => 'https://instagram.com/desainwebku',
                'twitter' => 'https://twitter.com/desainwebku',
                'linkedin' => 'https://linkedin.com/company/desainwebku',
                'youtube' => 'https://youtube.com/c/desainwebku',
            ]), 'type' => 'json'],
            ['key' => 'homepage_hero_title', 'value' => 'Jasa Pembuatan Website Profesional', 'type' => 'text'],
            ['key' => 'homepage_hero_description', 'value' => 'Kami membantu bisnis Anda hadir secara digital dengan website yang menarik, responsif, dan berperforma tinggi.', 'type' => 'text'],
            ['key' => 'homepage_hero_button_text', 'value' => 'Lihat Layanan Kami', 'type' => 'text'],
            ['key' => 'homepage_hero_button_link', 'value' => '/layanan', 'type' => 'text'],
            ['key' => 'contact_form_email', 'value' => 'contact@desainwebku.com', 'type' => 'text'],
            ['key' => 'google_analytics_id', 'value' => '', 'type' => 'text'],
            ['key' => 'meta_keywords', 'value' => 'jasa pembuatan website, web developer, web design, pembuatan website murah', 'type' => 'text'],
            ['key' => 'copyright_text', 'value' => '© ' . date('Y') . ' DesainWebku. All rights reserved.', 'type' => 'text'],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value'], 'type' => $setting['type']]
            );
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info('Admin login: admin@desainwebku.com / password123');
        $this->command->info('User login: john@example.com / password123');
    }
}