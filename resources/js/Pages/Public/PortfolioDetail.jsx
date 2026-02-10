import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CalendarIcon,
    TagIcon,
    UserCircleIcon,
    ArrowRightIcon,
    ShareIcon,
} from '@heroicons/react/24/outline';

export default function PortfolioDetail({ portfolio, relatedPortfolios }) {
    return (
        <AppLayout title={portfolio.title}>
            {/* Back Navigation */}
            <div className="bg-gray-50 py-4 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/portofolio"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Kembali ke Portofolio
                    </Link>
                </div>
            </div>

            {/* Portfolio Hero */}
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Portfolio Image */}
                        <div>
                            <img
                                src={portfolio.image || 'https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Portfolio'}
                                alt={portfolio.title}
                                className="w-full rounded-xl shadow-lg"
                            />
                        </div>

                        {/* Portfolio Details */}
                        <div>
                            <div className="mb-6">
                                <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full">
                                    {portfolio.category || 'Web Development'}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{portfolio.title}</h1>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <CalendarIcon className="h-5 w-5" />
                                    <span>
                                        Dipublikasikan: {portfolio.published_at 
                                            ? new Date(portfolio.published_at).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                            : 'Belum dipublikasikan'}
                                    </span>
                                </div>
                                
                                {portfolio.user && (
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <UserCircleIcon className="h-5 w-5" />
                                        <span>Dibuat oleh: {portfolio.user.name}</span>
                                    </div>
                                )}
                            </div>

                            <div className="prose max-w-none text-gray-700">
                                <p className="text-lg leading-relaxed">{portfolio.description}</p>
                            </div>

                            {/* Share Buttons */}
                            <div className="mt-8 pt-8 border-t">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bagikan proyek ini</h3>
                                <div className="flex space-x-4">
                                    <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                                        <ShareIcon className="h-5 w-5" />
                                    </button>
                                    <Link
                                        href="/kontak"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                                    >
                                        Konsultasi Proyek Serupa
                                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Details Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Detail Proyek</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tantangan</h3>
                                <p className="text-gray-700">
                                    Proyek ini menghadapi tantangan dalam membuat antarmuka yang user-friendly 
                                    sekaligus memenuhi kebutuhan fungsional yang kompleks dari klien.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Solusi</h3>
                                <p className="text-gray-700">
                                    Kami mengembangkan solusi dengan pendekatan agile, melakukan testing berulang, 
                                    dan memastikan setiap fitur berfungsi optimal sebelum diluncurkan.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Teknologi</h3>
                                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                    <li>React.js / Vue.js</li>
                                    <li>Laravel / Node.js</li>
                                    <li>MySQL / MongoDB</li>
                                    <li>REST API / GraphQL</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hasil</h3>
                                <p className="text-gray-700">
                                    Klien mengalami peningkatan signifikan dalam konversi dan engagement pengguna 
                                    setelah implementasi solusi kami.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Portfolios */}
            {relatedPortfolios && relatedPortfolios.length > 0 && (
                <div className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Proyek Lainnya
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPortfolios.map((related) => (
                                <div key={related.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <img
                                        src={related.image || 'https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Portfolio'}
                                        alt={related.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                {related.category || 'Web Development'}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{related.title}</h3>
                                        <p className="text-gray-600 line-clamp-2 mb-4">{related.description}</p>
                                        <Link
                                            href={`/portofolio/${related.slug}`}
                                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Lihat Detail
                                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Tertarik Dengan Proyek Kami?</h2>
                    <p className="text-xl mb-8">
                        Diskusikan ide proyek Anda dengan tim ahli kami
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/kontak"
                            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Konsultasi Gratis
                        </Link>
                        <Link
                            href="/layanan"
                            className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Lihat Layanan
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}