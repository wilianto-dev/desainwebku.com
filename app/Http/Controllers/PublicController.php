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
        ->latest()
        ->limit(6)
        ->get();

    $packages = Package::active()
        ->popular()
        ->latest()
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
                'description' => $service->description,
                'features' => $service->features, // Ini sudah array karena casting
                'price' => $service->price,
                'duration' => $service->duration,
                'is_featured' => $service->is_featured,
                'status' => $service->status,
                'category' => $service->category,
            ];
        }),
        'packages' => $packages->map(function ($package) {
            return [
                'id' => $package->id,
                'name' => $package->name,
                'description' => $package->description,
                'features' => $package->features, // Ini sudah array karena casting
                'price' => $package->price,
                'is_popular' => $package->is_popular,
            ];
        }),
        'portfolios' => $portfolios,
        'testimonials' => $testimonials,
        'siteSettings' => $siteSettings,
    ]);
}

    public function services()
    {
        $services = Service::active()
            ->latest()
            ->get();

        $packages = Package::active()
            ->latest()
            ->get();

        return Inertia::render('Public/Services', [
            'services' => $services,
            'packages' => $packages,
        ]);
    }

    public function serviceDetail(Service $service)
    {
        $relatedServices = Service::active()
            ->where('id', '!=', $service->id)
            ->where('category', $service->category)
            ->limit(3)
            ->get();

        return Inertia::render('Public/ServiceDetail', [
            'service' => $service->load('user'),
            'relatedServices' => $relatedServices,
        ]);
    }

    public function portfolio()
    {
        $portfolios = Portfolio::published()
            ->latest('published_at')
            ->get();

        $categories = Portfolio::published()
            ->distinct('category')
            ->pluck('category');

        return Inertia::render('Public/Portfolio', [
            'portfolios' => $portfolios,
            'categories' => $categories,
        ]);
    }

    public function portfolioDetail(Portfolio $portfolio)
    {
        $relatedPortfolios = Portfolio::published()
            ->where('id', '!=', $portfolio->id)
            ->where('category', $portfolio->category)
            ->limit(3)
            ->get();

        return Inertia::render('Public/PortfolioDetail', [
            'portfolio' => $portfolio->load('user'),
            'relatedPortfolios' => $relatedPortfolios,
        ]);
    }

    public function contact()
    {
        $contactInfo = [
            'email' => Setting::getValue('site_email', 'info@desainwebku.com'),
            'phone' => Setting::getValue('site_phone', '+6281234567890'),
            'address' => Setting::getValue('site_address', 'Jl. Contoh No. 123, Jakarta'),
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
            $recipientEmail = Setting::getValue('contact_form_email', 'contact@desainwebku.com');
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
}