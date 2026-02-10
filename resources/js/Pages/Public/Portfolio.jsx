import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowRightIcon,
    CalendarIcon,
    TagIcon,
    FunnelIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Portfolio({ portfolios, categories }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter portfolios
    const filteredPortfolios = portfolios?.filter(portfolio => {
        const matchesCategory = selectedCategory === 'all' || portfolio.category === selectedCategory;
        const matchesSearch = portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             portfolio.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesCategory && matchesSearch;
    }) || [];

    return (
        <AppLayout title="Portofolio">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Portofolio Kami</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Kumpulan karya terbaik kami dalam membantu berbagai bisnis berkembang secara digital
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white py-8 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Cari portofolio..."
                                className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Semua Kategori
                            </button>
                            {categories && categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {(selectedCategory !== 'all' || searchTerm) && (
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                                Menampilkan {filteredPortfolios.length} hasil
                            </span>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSearchTerm('');
                                }}
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm"
                            >
                                <XMarkIcon className="h-4 w-4" />
                                <span>Reset Filter</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Portfolio Grid */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredPortfolios.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <TagIcon className="h-16 w-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada portofolio ditemukan</h3>
                            <p className="text-gray-600">Coba gunakan kata kunci atau kategori yang berbeda</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPortfolios.map((portfolio) => (
                                    <div key={portfolio.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={portfolio.image || 'https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Portfolio'}
                                                alt={portfolio.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                    {portfolio.category || 'Web Development'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-xl font-bold text-gray-900">{portfolio.title}</h3>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-4 line-clamp-3">{portfolio.description}</p>
                                            
                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                <div className="flex items-center space-x-2">
                                                    <CalendarIcon className="h-4 w-4" />
                                                    <span>
                                                        {portfolio.published_at 
                                                            ? new Date(portfolio.published_at).toLocaleDateString('id-ID')
                                                            : 'Belum dipublikasikan'}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/portofolio/${portfolio.slug}`}
                                                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Lihat Detail Proyek
                                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination (optional) */}
                            <div className="mt-12 text-center">
                                <nav className="inline-flex rounded-md shadow">
                                    <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        Previous
                                    </button>
                                    <button className="px-3 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                                        1
                                    </button>
                                    <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        2
                                    </button>
                                    <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        3
                                    </button>
                                    <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Siap Membuat Proyek Digital Anda?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Lihat portofolio kami dan mulai percakapan tentang proyek Anda
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/layanan"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Lihat Layanan Kami
                        </Link>
                        <Link
                            href="/kontak"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Konsultasi Gratis
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
