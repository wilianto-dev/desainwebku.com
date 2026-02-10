import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    PhotoIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    CalendarIcon,
    TagIcon,
    EyeSlashIcon,
    CheckIcon,
} from '@heroicons/react/24/outline';

export default function Portfolios({ portfolios }) {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    // Extract unique categories
    const categories = ['all', ...new Set(portfolios.data.map(p => p.category))];

    const filteredPortfolios = portfolios.data.filter(portfolio => {
        const matchesSearch = portfolio.title.toLowerCase().includes(search.toLowerCase()) ||
                             portfolio.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || portfolio.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || portfolio.status === selectedStatus;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus portofolio ini?')) {
            router.delete(route('admin.portfolios.destroy', id));
        }
    };

    const toggleStatus = (portfolio) => {
        router.post(route('admin.portfolios.status', portfolio.id), {
            status: portfolio.status === 'published' ? 'draft' : 'published',
        });
    };

    return (
        <AuthenticatedLayout title="Kelola Portofolio">
            <Head title="Kelola Portofolio" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Portofolio</h1>
                    <p className="text-gray-600 mt-1">Kelola semua karya portofolio</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link
                        href={route('admin.portfolios.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Tambah Portofolio
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pencarian</label>
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari portofolio..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'Semua Kategori' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="all">Semua Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Data</label>
                        <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <span className="font-medium">{filteredPortfolios.length} Portofolio</span>
                        </div>
                    </div>
                </div>
                
                {(search || selectedCategory !== 'all' || selectedStatus !== 'all') && (
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            Menampilkan {filteredPortfolios.length} dari {portfolios.total} hasil
                        </span>
                        <button
                            onClick={() => {
                                setSearch('');
                                setSelectedCategory('all');
                                setSelectedStatus('all');
                            }}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm"
                        >
                            <XMarkIcon className="h-4 w-4" />
                            <span>Reset Filter</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Portfolios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolios.length === 0 ? (
                    <div className="col-span-3 text-center py-12">
                        <PhotoIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada portofolio ditemukan</h3>
                        <p className="text-gray-600">Coba gunakan filter yang berbeda</p>
                    </div>
                ) : (
                    filteredPortfolios.map((portfolio) => (
                        <div key={portfolio.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={portfolio.image || 'https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Portfolio'}
                                    alt={portfolio.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                        portfolio.status === 'published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {portfolio.status === 'published' ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                        {portfolio.category}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{portfolio.title}</h3>
                                </div>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{portfolio.description}</p>
                                
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>
                                            {portfolio.published_at 
                                                ? new Date(portfolio.published_at).toLocaleDateString('id-ID')
                                                : 'Belum dipublikasikan'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <TagIcon className="h-4 w-4" />
                                        <span>{portfolio.category}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between border-t pt-4">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => toggleStatus(portfolio)}
                                            className={`px-3 py-1 rounded text-xs font-semibold ${
                                                portfolio.status === 'published'
                                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                            }`}
                                        >
                                            {portfolio.status === 'published' ? (
                                                <>
                                                    <EyeSlashIcon className="h-3 w-3 inline mr-1" />
                                                    Draft
                                                </>
                                            ) : (
                                                <>
                                                    <EyeIcon className="h-3 w-3 inline mr-1" />
                                                    Publish
                                                </>
                                            )}
                                        </button>
                                        <Link
                                            href={`/portofolio/${portfolio.slug}`}
                                            target="_blank"
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200"
                                        >
                                            <EyeIcon className="h-3 w-3 inline mr-1" />
                                            Preview
                                        </Link>
                                    </div>
                                    
                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('admin.portfolios.edit', portfolio.id)}
                                            className="text-green-600 hover:text-green-700"
                                            title="Edit"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(portfolio.id)}
                                            className="text-red-600 hover:text-red-700"
                                            title="Hapus"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {portfolios.links && portfolios.links.length > 3 && (
                <div className="mt-6">
                    <nav className="flex items-center justify-between">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <Link
                                href={portfolios.prev_page_url}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                            <Link
                                href={portfolios.next_page_url}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </Link>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Menampilkan <span className="font-medium">{portfolios.from}</span> sampai{' '}
                                    <span className="font-medium">{portfolios.to}</span> dari{' '}
                                    <span className="font-medium">{portfolios.total}</span> hasil
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {portfolios.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                link.active
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                index === portfolios.links.length - 1 ? 'rounded-r-md' : ''
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </AuthenticatedLayout>
    );
}