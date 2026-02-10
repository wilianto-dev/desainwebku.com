import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
    ArrowRightIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/outline';

export default function ServiceDetail({ service, relatedServices }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AppLayout title={service.title}>
            {/* Back Navigation */}
            <div className="bg-gray-50 py-4 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/layanan"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Kembali ke Layanan
                    </Link>
                </div>
            </div>

            {/* Service Hero */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 inline-block">
                                {service.category || 'Layanan Digital'}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
                            <p className="text-xl opacity-90 mb-8">{service.description}</p>
                            
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center space-x-2">
                                        <CurrencyDollarIcon className="h-5 w-5" />
                                        <span className="text-2xl font-bold">{formatPrice(service.price)}</span>
                                    </div>
                                    <p className="text-sm opacity-80 mt-1">Mulai dari</p>
                                </div>
                                
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="h-5 w-5" />
                                        <span className="text-2xl font-bold">{service.duration} Hari</span>
                                    </div>
                                    <p className="text-sm opacity-80 mt-1">Pengerjaan</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                            <h3 className="text-2xl font-bold mb-6">Pesan Layanan Ini</h3>
                            <p className="mb-6 opacity-90">
                                Siap memulai proyek Anda? Hubungi kami untuk konsultasi gratis.
                            </p>
                            <div className="space-y-4">
                                <Link
                                    href={`/pesanan/${service.id}`}
                                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center w-full"
                                >
                                    <ShoppingCartIcon className="h-6 w-6 mr-2" />
                                    Pesan Sekarang
                                </Link>
                                <Link
                                    href="/kontak"
                                    className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center w-full"
                                >
                                    Konsultasi Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Fitur Layanan
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.features && service.features.map((feature, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6">
                                <div className="flex items-start space-x-4">
                                    <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Fitur {index + 1}</h3>
                                        <p className="text-gray-600">{feature}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Process Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                        Proses Pengerjaan
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Konsultasi</h3>
                            <p className="text-gray-600">
                                Diskusi kebutuhan dan tujuan proyek
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Perencanaan</h3>
                            <p className="text-gray-600">
                                Pembuatan timeline dan spesifikasi teknis
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Pengembangan</h3>
                            <p className="text-gray-600">
                                Implementasi dan pengembangan solusi
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 font-bold text-xl">4</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Peluncuran</h3>
                            <p className="text-gray-600">
                                Testing, deployment, dan maintenance
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Services */}
            {relatedServices && relatedServices.length > 0 && (
                <div className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Layanan Terkait
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedServices.map((related) => (
                                <div key={related.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-bold text-gray-900">{related.title}</h3>
                                            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                {related.category || 'General'}
                                            </span>
                                        </div>
                                        
                                        <p className="text-gray-600 mb-4 line-clamp-3">{related.description}</p>
                                        
                                        <div className="flex items-center justify-between mt-6 pt-4 border-t">
                                            <div>
                                                <p className="text-2xl font-bold text-blue-600">
                                                    {formatPrice(related.price)}
                                                </p>
                                                <p className="text-gray-500 text-sm flex items-center">
                                                    <ClockIcon className="h-4 w-4 mr-1" />
                                                    {related.duration} hari
                                                </p>
                                            </div>
                                            <Link
                                                href={`/layanan/${related.slug}`}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                            >
                                                Detail
                                            </Link>
                                        </div>
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
                    <h2 className="text-3xl font-bold mb-6">Siap Memulai Proyek Anda?</h2>
                    <p className="text-xl mb-8">
                        Hubungi kami sekarang untuk mendapatkan penawaran terbaik
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/pesanan/${service.id}`}
                            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Pesan Sekarang
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
        </AppLayout>
    );
}