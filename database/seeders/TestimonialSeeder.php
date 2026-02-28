<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;
use App\Models\Service;
use App\Models\User;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $webService = Service::where('title', 'Web Development')->first();
        $mobileService = Service::where('title', 'Mobile App Development')->first();
        $designService = Service::where('title', 'UI/UX Design')->first();
        $marketingService = Service::where('title', 'Digital Marketing')->first();

        $testimonials = [
            [
                'service_id' => $webService?->id,
                'name' => 'Michael Chen',
                'company' => 'TechStart Inc.',
                'rating' => 5,
                'content' => 'The team delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise are outstanding. Highly recommended!',
                'status' => 'approved',
            ],
            [
                'service_id' => $webService?->id,
                'name' => 'Sarah Johnson',
                'company' => 'Creative Agency',
                'rating' => 5,
                'content' => 'Working with this team was a pleasure. They understood our requirements perfectly and delivered a beautiful, fast-loading website that our clients love.',
                'status' => 'approved',
            ],
            [
                'service_id' => $mobileService?->id,
                'name' => 'David Williams',
                'company' => 'FitLife App',
                'rating' => 5,
                'content' => 'They built our fitness app from scratch and the result is amazing. The app is intuitive, fast, and our users are giving great feedback. Will definitely work with them again.',
                'status' => 'approved',
            ],
            [
                'service_id' => $mobileService?->id,
                'name' => 'Emily Rodriguez',
                'company' => 'Foodie Express',
                'rating' => 4,
                'content' => 'Great communication throughout the project. They were responsive to our feedback and delivered a solid food delivery app. A few minor bugs at launch but they fixed them quickly.',
                'status' => 'approved',
            ],
            [
                'service_id' => $designService?->id,
                'name' => 'Robert Kim',
                'company' => 'FinTech Solutions',
                'rating' => 5,
                'content' => 'The UI/UX design they created for our banking app is simply stunning. They conducted thorough user research and delivered a design that our users find intuitive and engaging.',
                'status' => 'approved',
            ],
            [
                'service_id' => $designService?->id,
                'name' => 'Lisa Thompson',
                'company' => 'HealthCare Plus',
                'rating' => 5,
                'content' => 'Outstanding design work! They created a patient portal that is both beautiful and easy to use. Our patients love the new design and we\'ve seen increased engagement.',
                'status' => 'approved',
            ],
            [
                'service_id' => $marketingService?->id,
                'name' => 'James Wilson',
                'company' => 'Growth Marketing',
                'rating' => 4,
                'content' => 'Their SEO services have helped us achieve first-page rankings for our target keywords. Our organic traffic has increased significantly. Very professional team.',
                'status' => 'approved',
            ],
            [
                'service_id' => null,
                'name' => 'Anonymous',
                'company' => null,
                'rating' => 3,
                'content' => 'Good service overall but communication could be improved. They delivered what we asked for but took longer than expected.',
                'status' => 'pending',
            ],
            [
                'service_id' => $webService?->id,
                'name' => 'Thomas Anderson',
                'company' => 'Matrix Corp',
                'rating' => 1,
                'content' => 'Very disappointed with the service. The website they built had multiple issues and support was slow to respond.',
                'status' => 'rejected',
            ],
            [
                'service_id' => $mobileService?->id,
                'name' => 'Jennifer Lee',
                'company' => 'StartUp Hub',
                'rating' => 5,
                'content' => 'Best decision we made was hiring this team. They turned our idea into a fully functional app in just 3 months. Exceptional work!',
                'status' => 'approved',
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}