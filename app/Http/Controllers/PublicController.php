<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;
use App\Models\Package;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Portfolio;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

class PublicController extends Controller
{
    public function home()
    {
        $services = Service::active()
            ->featured()
            ->orderBy('sort_order')
            ->limit(6)
            ->get();

        $packages = Package::active()
            ->popular()
            ->orderBy('sort_order')
            ->limit(3)
            ->get();

        $portfolios = Portfolio::published()
            ->latest('published_at')
            ->limit(6)
            ->get();

        $testimonials = Testimonial::approved()
            ->latest()
            ->limit(4)
            ->get();

        $siteSettings = [
            'hero_title' => Setting::getValue('homepage_hero_title', 'Jasa Pembuatan Website Profesional'),
            'hero_description' => Setting::getValue('homepage_hero_description', 'Kami membantu bisnis Anda hadir secara digital dengan website yang menarik, responsif, dan berperforma tinggi.'),
            'hero_button_text' => Setting::getValue('homepage_hero_button_text', 'Lihat Layanan Kami'),
            'hero_button_link' => Setting::getValue('homepage_hero_button_link', '/layanan'),
        ];

        return Inertia::render('Public/Home', [
            'services' => $services->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'slug' => $service->slug,
                    'short_description' => $service->short_description,
                    'description' => $service->description,
                    'icon' => $service->icon,
                    'is_featured' => $service->is_featured,
                ];
            }),
            'packages' => $packages->map(function ($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->name,
                    'slug' => $package->slug,
                    'short_description' => $package->short_description,
                    'description' => $package->description,
                    'features' => $package->features,
                    'price' => $package->price,
                    'duration' => $package->duration,
                    'is_popular' => $package->is_popular,
                ];
            }),
            'portfolios' => $portfolios->map(function ($portfolio) {
                return [
                    'id' => $portfolio->id,
                    'title' => $portfolio->title,
                    'slug' => $portfolio->slug,
                    'description' => $portfolio->description,
                    'image' => $portfolio->image,
                    'technologies' => $portfolio->technologies,
                    'completion_date' => $portfolio->completion_date,
                ];
            }),
            'testimonials' => $testimonials->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'name' => $testimonial->name,
                    'company' => $testimonial->company,
                    'rating' => $testimonial->rating,
                    'content' => $testimonial->content,
                ];
            }),
            'siteSettings' => $siteSettings,
        ]);
    }

    public function services()
    {
        $services = Service::active()
            ->orderBy('sort_order')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'slug' => $service->slug,
                    'short_description' => $service->short_description,
                    'description' => $service->description,
                    'icon' => $service->icon,
                    'is_featured' => $service->is_featured,
                ];
            });

        $packages = Package::active()
            ->with('service')
            ->orderBy('sort_order')
            ->get()
            ->map(function ($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->name,
                    'slug' => $package->slug,
                    'short_description' => $package->short_description,
                    'description' => $package->description,
                    'features' => $package->features,
                    'price' => $package->price,
                    'duration' => $package->duration,
                    'is_popular' => $package->is_popular,
                    'service' => $package->service ? [
                        'id' => $package->service->id,
                        'title' => $package->service->title,
                        'slug' => $package->service->slug,
                    ] : null,
                ];
            });

        return Inertia::render('Public/Services', [
            'services' => $services,
            'packages' => $packages,
        ]);
    }

    public function serviceDetail(Service $service)
    {
        // Ensure service is active
        if ($service->status !== 'active') {
            abort(404);
        }

        $packages = Package::active()
            ->where('service_id', $service->id)
            ->orderBy('sort_order')
            ->get()
            ->map(function ($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->name,
                    'slug' => $package->slug,
                    'short_description' => $package->short_description,
                    'description' => $package->description,
                    'features' => $package->features,
                    'price' => $package->price,
                    'duration' => $package->duration,
                    'is_popular' => $package->is_popular,
                ];
            });

        $portfolios = Portfolio::published()
            ->where('service_id', $service->id)
            ->latest('published_at')
            ->limit(3)
            ->get()
            ->map(function ($portfolio) {
                return [
                    'id' => $portfolio->id,
                    'title' => $portfolio->title,
                    'slug' => $portfolio->slug,
                    'image' => $portfolio->image,
                ];
            });

        $relatedServices = Service::active()
            ->where('id', '!=', $service->id)
            ->orderBy('sort_order')
            ->limit(3)
            ->get()
            ->map(function ($relatedService) {
                return [
                    'id' => $relatedService->id,
                    'title' => $relatedService->title,
                    'slug' => $relatedService->slug,
                    'short_description' => $relatedService->short_description,
                    'icon' => $relatedService->icon,
                ];
            });

        return Inertia::render('Public/ServiceDetail', [
            'service' => [
                'id' => $service->id,
                'title' => $service->title,
                'slug' => $service->slug,
                'short_description' => $service->short_description,
                'description' => $service->description,
                'icon' => $service->icon,
                'is_featured' => $service->is_featured,
            ],
            'packages' => $packages,
            'portfolios' => $portfolios,
            'relatedServices' => $relatedServices,
        ]);
    }

    public function portfolio()
    {
        $portfolios = Portfolio::published()
            ->with('service')
            ->latest('published_at')
            ->get()
            ->map(function ($portfolio) {
                return [
                    'id' => $portfolio->id,
                    'title' => $portfolio->title,
                    'slug' => $portfolio->slug,
                    'description' => $portfolio->description,
                    'image' => $portfolio->image,
                    'technologies' => $portfolio->technologies,
                    'completion_date' => $portfolio->completion_date,
                    'service' => $portfolio->service ? [
                        'id' => $portfolio->service->id,
                        'title' => $portfolio->service->title,
                        'slug' => $portfolio->service->slug,
                    ] : null,
                ];
            });

        // Get unique technologies from all portfolios
        $allTechnologies = [];
        foreach ($portfolios as $portfolio) {
            if (!empty($portfolio['technologies']) && is_array($portfolio['technologies'])) {
                $allTechnologies = array_merge($allTechnologies, $portfolio['technologies']);
            }
        }
        $technologies = array_values(array_unique($allTechnologies));

        return Inertia::render('Public/Portfolio', [
            'portfolios' => $portfolios,
            'technologies' => $technologies,
        ]);
    }

    public function portfolioDetail(Portfolio $portfolio)
    {
        if ($portfolio->status !== 'published') {
            abort(404);
        }

        $portfolio->load('service');

        $relatedPortfolios = Portfolio::published()
            ->where('id', '!=', $portfolio->id)
            ->when($portfolio->service_id, function ($query) use ($portfolio) {
                return $query->where('service_id', $portfolio->service_id);
            })
            ->latest('published_at')
            ->limit(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'image' => $item->image,
                ];
            });

        return Inertia::render('Public/PortfolioDetail', [
            'portfolio' => [
                'id' => $portfolio->id,
                'title' => $portfolio->title,
                'slug' => $portfolio->slug,
                'description' => $portfolio->description,
                'image' => $portfolio->image,
                'technologies' => $portfolio->technologies,
                'results' => $portfolio->results,
                'completion_date' => $portfolio->completion_date,
                'published_at' => $portfolio->published_at,
                'service' => $portfolio->service ? [
                    'id' => $portfolio->service->id,
                    'title' => $portfolio->service->title,
                    'slug' => $portfolio->service->slug,
                ] : null,
            ],
            'relatedPortfolios' => $relatedPortfolios,
        ]);
    }

    public function contact()
    {
        $contactInfo = [
            'email' => Setting::getValue('contact_email', 'info@desainwebku.com'),
            'phone' => Setting::getValue('contact_phone', '+6281234567890'),
            'address' => Setting::getValue('contact_address', 'Jl. Contoh No. 123, Jakarta'),
            'social_media' => Setting::getValue('social_media', [
                'facebook' => '#',
                'twitter' => '#',
                'instagram' => '#',
                'linkedin' => '#',
            ]),
        ];

        return Inertia::render('Public/Contact', [
            'contactInfo' => $contactInfo,
        ]);
    }

    public function contactSubmit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        try {
            // Kirim email
            $recipientEmail = Setting::getValue('contact_email', 'contact@desainwebku.com');
            Mail::to($recipientEmail)->send(new ContactFormMail($validated));

            return back()->with('success', 'Pesan Anda berhasil dikirim. Kami akan menghubungi Anda segera.');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
        }
    }

    public function page(Page $page)
    {
        if ($page->status !== 'published') {
            abort(404);
        }

        return Inertia::render('Public/Page', [
            'page' => $page,
        ]);
    }

     /**
     * Display all packages
     */
    public function packages()
    {
        $packages = Package::active()
            ->with('service')
            ->orderBy('sort_order')
            ->get()
            ->map(function ($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->name,
                    'slug' => $package->slug,
                    'short_description' => $package->short_description,
                    'description' => $package->description,
                    'features' => $package->features,
                    'price' => $package->price,
                    'duration' => $package->duration,
                    'is_popular' => $package->is_popular,
                    'service' => $package->service ? [
                        'id' => $package->service->id,
                        'title' => $package->service->title,
                        'slug' => $package->service->slug,
                    ] : null,
                ];
            });

        return Inertia::render('Public/Packages', [
            'packages' => $packages,
        ]);
    }

    /**
     * Display package detail
     */
    public function packageDetail(Package $package)
    {
        // Ensure package is active
        if ($package->status !== 'active') {
            abort(404);
        }

        $package->load('service');

        // Get related packages from same service
        $relatedPackages = Package::active()
            ->where('id', '!=', $package->id)
            ->when($package->service_id, function ($query) use ($package) {
                return $query->where('service_id', $package->service_id);
            })
            ->orderBy('sort_order')
            ->limit(3)
            ->get()
            ->map(function ($relatedPackage) {
                return [
                    'id' => $relatedPackage->id,
                    'name' => $relatedPackage->name,
                    'slug' => $relatedPackage->slug,
                    'short_description' => $relatedPackage->short_description,
                    'price' => $relatedPackage->price,
                    'is_popular' => $relatedPackage->is_popular,
                ];
            });

        return Inertia::render('Public/PackageDetail', [
            'package' => [
                'id' => $package->id,
                'name' => $package->name,
                'slug' => $package->slug,
                'short_description' => $package->short_description,
                'description' => $package->description,
                'features' => $package->features,
                'price' => $package->price,
                'duration' => $package->duration,
                'is_popular' => $package->is_popular,
                'service' => $package->service ? [
                    'id' => $package->service->id,
                    'title' => $package->service->title,
                    'slug' => $package->service->slug,
                ] : null,
            ],
            'relatedPackages' => $relatedPackages,
        ]);
    }
}