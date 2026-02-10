import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    CheckCircleIcon,
    ArrowRightIcon,
    StarIcon,
    LightBulbIcon,
    ShieldCheckIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

export default function Home({ services, packages, portfolios, testimonials, siteSettings }) {
    
    // Helper function to parse features
    const parseFeatures = (features) => {
        if (!features) return [];
        try {
            if (Array.isArray(features)) return features;
            if (typeof features === 'string') {
                const parsed = JSON.parse(features);
                return Array.isArray(parsed) ? parsed : [];
            }
            return [];
        } catch (error) {
            console.error('Error parsing features:', error);
            return [];
        }
    };

    // Format price to IDR
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AppLayout title="Home">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            {siteSettings?.hero_title || 'Jasa Pembuatan Website Profesional'}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            {siteSettings?.hero_description || 'Kami membantu bisnis Anda hadir secara digital dengan website yang menarik, responsif, dan berperforma tinggi.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={siteSettings?.hero_button_link || '/layanan'}
                                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
                            >
                                {siteSettings?.hero_button_text || 'Lihat Layanan Kami'}
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/kontak"
                                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                            >
                                Konsultasi Gratis
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Layanan Kami</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Kami menyediakan berbagai layanan digital untuk membantu bisnis Anda berkembang
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services && services.map((service) => {
                            const features = parseFeatures(service.features);
                            
                            return (
                                <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                        {service.is_featured && (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                                    
                                    {features.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="font-semibold text-gray-900 mb-2">Fitur Utama:</h4>
                                            <ul className="space-y-2">
                                                {features.slice(0, 3).map((feature, index) => (
                                                    <li key={index} className="flex items-center text-gray-700">
                                                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                                        <span className="text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {formatPrice(service.price)}
                                            </p>
                                            <p className="text-gray-500 text-sm flex items-center">
                                                <ClockIcon className="h-4 w-4 mr-1" />
                                                {service.duration} hari pengerjaan
                                            </p>
                                        </div>
                                        <Link
                                            href={`/layanan/${service.slug}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/layanan"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg"
                        >
                            Lihat Semua Layanan
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih Kami?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Keunggulan yang membuat kami berbeda dari yang lain
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LightBulbIcon className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Kreatif & Inovatif</h3>
                            <p className="text-gray-600">
                                Desain yang kreatif dan solusi inovatif untuk kebutuhan bisnis Anda
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Terpercaya</h3>
                            <p className="text-gray-600">
                                Sudah dipercaya oleh ratusan klien dari berbagai bidang bisnis
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ClockIcon className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Tepat Waktu</h3>
                            <p className="text-gray-600">
                                Pengerjaan sesuai deadline dengan kualitas terjamin
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircleIcon className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Support 24/7</h3>
                            <p className="text-gray-600">
                                Layanan dukungan teknis yang siap membantu kapan saja
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Portfolio Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Portofolio Kami</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Hasil karya terbaik yang telah kami kerjakan untuk berbagai klien
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolios && portfolios.map((portfolio) => (
                            <div key={portfolio.id} className="group relative overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src={portfolio.image || 'https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Portfolio'}
                                    alt={portfolio.title}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div>
                                        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block">
                                            {portfolio.category || 'Web Development'}
                                        </span>
                                        <h3 className="text-white text-xl font-bold">{portfolio.title}</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-blue-600 font-semibold">{portfolio.category || 'Web Development'}</span>
                                        <span className="text-gray-500 text-sm">
                                            {portfolio.published_at 
                                                ? new Date(portfolio.published_at).toLocaleDateString('id-ID')
                                                : 'Belum dipublikasikan'}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{portfolio.title}</h3>
                                    <p className="text-gray-600 line-clamp-2">{portfolio.description}</p>
                                    <Link
                                        href={`/portofolio/${portfolio.slug}`}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4"
                                    >
                                        Lihat Detail
                                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/portofolio"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
                        >
                            Lihat Semua Portofolio
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Testimoni Klien</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Apa kata klien yang telah menggunakan layanan kami
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {testimonials && testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`h-5 w-5 ${
                                                i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 italic mb-6 line-clamp-4">"{testimonial.content}"</p>
                                <div className="border-t pt-4">
                                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                                    <p className="text-gray-600 text-sm">{testimonial.company || 'Klien'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Siap Meningkatkan Bisnis Anda?</h2>
                    <p className="text-xl mb-8">
                        Hubungi kami sekarang untuk konsultasi gratis dan mulai proyek Anda!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/kontak"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Hubungi Kami
                        </Link>
                        <Link
                            href="tel:+6281234567890"
                            className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Telepon: +62 812 3456 7890
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}