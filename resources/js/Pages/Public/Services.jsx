import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    CheckCircleIcon,
    StarIcon,
    FunnelIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
    ClockIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function Services({ services, packages }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 10000000]);

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

    // Extract unique categories from services
    const categories = ['all', ...new Set(services?.map(s => s.category || 'Uncategorized') || [])];

    // Filter services
    const filteredServices = services?.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || (service.category || 'Uncategorized') === selectedCategory;
        const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
        
        return matchesSearch && matchesCategory && matchesPrice;
    }) || [];

    return (
        <AppLayout title="Layanan">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Layanan Kami</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Pilih layanan terbaik untuk kebutuhan digital bisnis Anda
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white py-8 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex items-center space-x-4 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari layanan..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="md:hidden p-2 border rounded-lg">
                                <FunnelIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category === 'all' ? 'Semua' : category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Rentang Harga:</span>
                            <span className="text-sm font-semibold">
                                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <input
                                type="range"
                                min="0"
                                max="10000000"
                                step="100000"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                className="w-full"
                            />
                            <input
                                type="range"
                                min="0"
                                max="10000000"
                                step="100000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {filteredServices.length} Layanan Ditemukan
                        </h2>
                        {(searchTerm || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 10000000) && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                    setPriceRange([0, 10000000]);
                                }}
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            >
                                <XMarkIcon className="h-4 w-4" />
                                <span>Reset Filter</span>
                            </button>
                        )}
                    </div>

                    {filteredServices.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada layanan ditemukan</h3>
                            <p className="text-gray-600">Coba gunakan kata kunci atau filter yang berbeda</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredServices.map((service) => {
                                const features = parseFeatures(service.features);
                                
                                return (
                                    <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                        {service.is_featured && (
                                            <div className="bg-yellow-500 text-white px-4 py-1 text-center text-sm font-semibold">
                                                ★ Featured Service
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                    {service.category || 'General'}
                                                </span>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                                            
                                            {features.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="font-semibold text-gray-900 mb-2">Fitur Utama:</h4>
                                                    <ul className="space-y-1">
                                                        {features.slice(0, 3).map((feature, index) => (
                                                            <li key={index} className="flex items-center text-gray-700">
                                                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                                <span className="text-sm">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mt-6 pt-4 border-t">
                                                <div>
                                                    <p className="text-2xl font-bold text-blue-600">
                                                        {formatPrice(service.price)}
                                                    </p>
                                                    <p className="text-gray-500 text-sm flex items-center">
                                                        <ClockIcon className="h-4 w-4 mr-1" />
                                                        {service.duration} hari pengerjaan
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/layanan/${service.slug}`}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                                    >
                                                        Detail
                                                    </Link>
                                                    <Link
                                                        href={`/pesanan/${service.id}`}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                                    >
                                                        Pesan
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Packages Section */}
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Paket Layanan</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Pilihan paket lengkap untuk berbagai kebutuhan bisnis Anda
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages?.map((pkg) => {
                            const features = parseFeatures(pkg.features);
                            
                            return (
                                <div key={pkg.id} className={`rounded-xl shadow-lg overflow-hidden ${
                                    pkg.is_popular ? 'border-2 border-blue-500 transform scale-105' : 'border'
                                }`}>
                                    {pkg.is_popular && (
                                        <div className="bg-blue-500 text-white px-4 py-2 text-center font-semibold">
                                            ★ Paket Populer
                                        </div>
                                    )}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                        <p className="text-gray-600 mb-6">{pkg.description}</p>
                                        
                                        <div className="mb-6">
                                            <div className="text-4xl font-bold text-blue-600 mb-2">
                                                {formatPrice(pkg.price)}
                                            </div>
                                            <p className="text-gray-500">Satu kali pembayaran</p>
                                        </div>

                                        {features.length > 0 && (
                                            <div className="space-y-3 mb-8">
                                                {features.map((feature, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <Link
                                            href={`/pesanan/paket/${pkg.id}`}
                                            className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                                                pkg.is_popular
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                            }`}
                                        >
                                            Pilih Paket
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Butuh Layanan Khusus?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Hubungi kami untuk konsultasi kebutuhan khusus bisnis Anda
                    </p>
                    <Link
                        href="/kontak"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
                    >
                        Konsultasi Gratis
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}