import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    ArrowLeftIcon,
    PencilIcon,
    CalendarIcon,
    TagIcon,
    UserCircleIcon,
    EyeIcon,
    EyeSlashIcon,
    LinkIcon,
} from '@heroicons/react/24/outline';

export default function ShowPortfolio({ portfolio }) {
    return (
        <AuthenticatedLayout title="Detail Portofolio">
            <Head title="Detail Portofolio" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Detail Portofolio</h1>
                    <p className="text-gray-600 mt-1">Detail informasi portofolio</p>
                </div>
                <div className="flex space-x-3">
                    <Link
                        href={route('admin.portfolios.edit', portfolio.id)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PencilIcon className="h-5 w-5 mr-2" />
                        Edit
                    </Link>
                    <Link
                        href={route('admin.portfolios.index')}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Kembali
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Image */}
                    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                        <img
                            src={portfolio.image || 'https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Portfolio'}
                            alt={portfolio.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{portfolio.title}</h2>
                        
                        <div className="prose max-w-none text-gray-700 mb-6">
                            <p className="whitespace-pre-line">{portfolio.description}</p>
                        </div>

                        {/* SEO Info */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">SEO Title:</span>
                                    <p className="text-gray-900">{portfolio.seo_title || 'Tidak diisi'}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-500">SEO Description:</span>
                                    <p className="text-gray-900">{portfolio.seo_description || 'Tidak diisi'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Status Publikasi</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    portfolio.status === 'published'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {portfolio.status === 'published' ? 'Published' : 'Draft'}
                                </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">URL Slug</span>
                                <span className="text-sm font-medium text-gray-900">{portfolio.slug}</span>
                            </div>
                            
                            <div>
                                <Link
                                    href={`/portofolio/${portfolio.slug}`}
                                    target="_blank"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <LinkIcon className="h-4 w-4 mr-1" />
                                    Lihat di Website
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <TagIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                    <span className="text-sm text-gray-600">Kategori</span>
                                    <p className="font-medium text-gray-900">{portfolio.category}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                    <span className="text-sm text-gray-600">Dibuat</span>
                                    <p className="font-medium text-gray-900">
                                        {new Date(portfolio.created_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                    <span className="text-sm text-gray-600">Diperbarui</span>
                                    <p className="font-medium text-gray-900">
                                        {new Date(portfolio.updated_at).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                            
                            {portfolio.published_at && (
                                <div className="flex items-center space-x-2">
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <span className="text-sm text-gray-600">Dipublikasikan</span>
                                        <p className="font-medium text-gray-900">
                                            {new Date(portfolio.published_at).toLocaleDateString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            {portfolio.user && (
                                <div className="flex items-center space-x-2">
                                    <UserCircleIcon className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <span className="text-sm text-gray-600">Dibuat oleh</span>
                                        <p className="font-medium text-gray-900">{portfolio.user.name}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                        <div className="space-y-3">
                            <Link
                                href={route('admin.portfolios.edit', portfolio.id)}
                                className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50"
                            >
                                Edit Portofolio
                            </Link>
                            <Link
                                href={`/portofolio/${portfolio.slug}`}
                                target="_blank"
                                className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50"
                            >
                                Preview di Website
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}