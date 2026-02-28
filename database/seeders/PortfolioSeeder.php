<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Portfolio;
use App\Models\Service;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $webService = Service::where('title', 'Web Development')->first();
        $mobileService = Service::where('title', 'Mobile App Development')->first();
        $designService = Service::where('title', 'UI/UX Design')->first();

        $portfolios = [
            [
                'service_id' => $webService?->id,
                'title' => 'E-Commerce Platform for Fashion Retailer',
                'description' => 'Developed a comprehensive e-commerce platform for a leading fashion retailer. The system handles thousands of products, processes secure payments, and provides real-time inventory management.',
                'image' => 'portfolios/ecommerce-fashion.jpg',
                'technologies' => json_encode(['Laravel', 'Vue.js', 'MySQL', 'Redis', 'Stripe']),
                'results' => json_encode([
                    '300% increase in online sales',
                    '50% faster page load times',
                    '99.9% uptime achieved',
                    'Integrated with 3 payment gateways',
                ]),
                'status' => 'published',
                'completion_date' => '2024-01-15',
                'published_at' => '2024-01-20',
            ],
            [
                'service_id' => $webService?->id,
                'title' => 'Corporate Website for Tech Company',
                'description' => 'Designed and built a modern corporate website for a B2B technology company. Features include multi-language support, blog system, and lead generation forms.',
                'image' => 'portfolios/corporate-tech.jpg',
                'technologies' => json_encode(['WordPress', 'Advanced Custom Fields', 'Sass', 'jQuery']),
                'results' => json_encode([
                    '150% increase in organic traffic',
                    '200+ leads generated in first month',
                    'Bilingual support (EN/ID)',
                ]),
                'status' => 'published',
                'completion_date' => '2023-11-10',
                'published_at' => '2023-11-15',
            ],
            [
                'service_id' => $mobileService?->id,
                'title' => 'Fitness Tracking Mobile App',
                'description' => 'Created a cross-platform fitness tracking app with workout plans, progress tracking, and social features. The app has been downloaded over 50,000 times.',
                'image' => 'portfolios/fitness-app.jpg',
                'technologies' => json_encode(['React Native', 'Node.js', 'MongoDB', 'Firebase']),
                'results' => json_encode([
                    '50,000+ downloads',
                    '4.8 star rating on app stores',
                    '30% monthly active user growth',
                ]),
                'status' => 'published',
                'completion_date' => '2023-09-20',
                'published_at' => '2023-09-25',
            ],
            [
                'service_id' => $mobileService?->id,
                'title' => 'Food Delivery App',
                'description' => 'Built a complete food delivery solution with real-time tracking, multiple restaurant integrations, and a sophisticated recommendation engine.',
                'image' => 'portfolios/food-delivery.jpg',
                'technologies' => json_encode(['Flutter', 'Laravel', 'PostgreSQL', 'WebSockets']),
                'results' => json_encode([
                    '10,000+ active users',
                    '500+ restaurant partners',
                    '15-minute average delivery time',
                ]),
                'status' => 'published',
                'completion_date' => '2023-12-05',
                'published_at' => '2023-12-10',
            ],
            [
                'service_id' => $designService?->id,
                'title' => 'Banking App Redesign',
                'description' => 'Complete UI/UX redesign of a mobile banking application, focusing on simplicity, accessibility, and user engagement.',
                'image' => 'portfolios/banking-app.jpg',
                'technologies' => json_encode(['Figma', 'Adobe XD', 'Sketch']),
                'results' => json_encode([
                    '40% reduction in user drop-off',
                    'Improved accessibility score to 98%',
                    'Winner of Best Banking App Design 2023',
                ]),
                'status' => 'published',
                'completion_date' => '2023-08-15',
                'published_at' => '2023-08-20',
            ],
            [
                'service_id' => null, // No service association
                'title' => 'Healthcare Portal Design',
                'description' => 'Designed an intuitive patient portal for a healthcare provider, making it easy for patients to schedule appointments and access medical records.',
                'image' => 'portfolios/healthcare-portal.jpg',
                'technologies' => json_encode(['Figma', 'UsabilityHub']),
                'results' => json_encode([
                    '95% user satisfaction score',
                    '60% increase in online appointment bookings',
                ]),
                'status' => 'draft',
                'completion_date' => '2024-02-01',
                'published_at' => null,
            ],
        ];

        foreach ($portfolios as $portfolio) {
            Portfolio::create([
                'service_id' => $portfolio['service_id'],
                'title' => $portfolio['title'],
                'slug' => Str::slug($portfolio['title']),
                'description' => $portfolio['description'],
                'image' => $portfolio['image'],
                'technologies' => $portfolio['technologies'],
                'results' => $portfolio['results'],
                'status' => $portfolio['status'],
                'completion_date' => $portfolio['completion_date'],
                'published_at' => $portfolio['published_at'],
            ]);
        }
    }
}