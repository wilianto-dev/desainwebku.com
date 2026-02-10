import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Page({ page }) {
    return (
        <AppLayout title={page.seo_title || page.title}>
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm">
                        <a href="/" className="text-gray-600 hover:text-blue-600">
                            <HomeIcon className="h-4 w-4" />
                        </a>
                        <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">{page.title}</span>
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <div className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{page.title}</h1>
                        {page.seo_description && (
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {page.seo_description}
                            </p>
                        )}
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div 
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    </div>

                    {/* Last Updated */}
                    <div className="mt-12 pt-8 border-t text-center text-gray-500 text-sm">
                        <p>
                            Terakhir diperbarui: {new Date(page.updated_at).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Butuh Bantuan Lebih Lanjut?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Hubungi kami untuk informasi lebih detail tentang layanan kami
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/kontak"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Hubungi Kami
                        </a>
                        <a
                            href="/layanan"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Lihat Layanan
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}