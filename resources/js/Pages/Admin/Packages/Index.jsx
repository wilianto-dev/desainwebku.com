import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EyeIcon,
    CubeIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    CheckIcon,
    XIcon,
} from '@heroicons/react/24/outline';

export default function Packages({ packages }) {
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const filteredPackages = packages.data.filter(pkg => {
        const matchesSearch = pkg.name.toLowerCase().includes(search.toLowerCase()) ||
                             pkg.description.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || pkg.status === selectedStatus;
        
        return matchesSearch && matchesStatus;
    });

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
            router.delete(route('admin.packages.destroy', id));
        }
    };

    const togglePopular = (pkg) => {
        router.post(route('admin.packages.popular', pkg.id), {
            is_popular: !pkg.is_popular,
        });
    };

    const toggleStatus = (pkg) => {
        router.post(route('admin.packages.status', pkg.id), {
            status: pkg.status === 'active' ? 'inactive' : 'active',
        });
    };

    return (
        <AuthenticatedLayout title="Kelola Paket">
            <Head title="Kelola Paket" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Paket</h1>
                    <p className="text-gray-600 mt-1">Kelola semua paket yang ditawarkan</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link
                        href={route('admin.packages.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Tambah Paket
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pencarian</label>
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari paket..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="inactive">Tidak Aktif</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Data</label>
                        <div className="px-4 py-2 bg-gray-100 rounded-lg">
                            <span className="font-medium">{filteredPackages.length} Paket</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.length === 0 ? (
                    <div className="col-span-3 text-center py-12">
                        <CubeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada paket ditemukan</h3>
                        <p className="text-gray-600">Coba gunakan kata kunci yang berbeda</p>
                    </div>
                ) : (
                    filteredPackages.map((pkg) => (
                        <div key={pkg.id} className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                            pkg.is_popular ? 'border-2 border-blue-500' : 'border'
                        }`}>
                            {pkg.is_popular && (
                                <div className="bg-blue-500 text-white px-4 py-2 text-center font-semibold">
                                    ★ Paket Populer
                                </div>
                            )}
                            
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        pkg.status === 'active' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {pkg.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3">{pkg.description}</p>
                                
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-2">Fitur:</h4>
                                    <ul className="space-y-1">
                                        {pkg.features?.slice(0, 3).map((feature, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                        {pkg.features && pkg.features.length > 3 && (
                                            <li className="text-sm text-gray-500">
                                                +{pkg.features.length - 3} fitur lainnya
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">
                                        {formatPrice(pkg.price)}
                                    </div>
                                    <p className="text-gray-500 text-sm">Satu kali pembayaran</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => toggleStatus(pkg)}
                                            className={`px-3 py-1 rounded text-xs font-semibold ${
                                                pkg.status === 'active'
                                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                            }`}
                                        >
                                            {pkg.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                                        </button>
                                        <button
                                            onClick={() => togglePopular(pkg)}
                                            className={`px-3 py-1 rounded text-xs font-semibold ${
                                                pkg.is_popular
                                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                            }`}
                                        >
                                            {pkg.is_popular ? 'Hapus Populer' : 'Jadikan Populer'}
                                        </button>
                                    </div>
                                    
                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('admin.packages.edit', pkg.id)}
                                            className="text-green-600 hover:text-green-700"
                                            title="Edit"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(pkg.id)}
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
            {packages.links && packages.links.length > 3 && (
                <div className="mt-6">
                    <nav className="flex items-center justify-between">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <Link
                                href={packages.prev_page_url}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                            <Link
                                href={packages.next_page_url}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </Link>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Menampilkan <span className="font-medium">{packages.from}</span> sampai{' '}
                                    <span className="font-medium">{packages.to}</span> dari{' '}
                                    <span className="font-medium">{packages.total}</span> hasil
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {packages.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                link.active
                                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                index === packages.links.length - 1 ? 'rounded-r-md' : ''
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