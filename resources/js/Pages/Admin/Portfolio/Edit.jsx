import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    ArrowLeftIcon,
    PhotoIcon,
    CloudArrowUpIcon,
    XMarkIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function EditPortfolio({ portfolio }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        title: portfolio.title || '',
        description: portfolio.description || '',
        category: portfolio.category || '',
        image: null,
        status: portfolio.status || 'draft',
        seo_title: portfolio.seo_title || '',
        seo_description: portfolio.seo_description || '',
    });

    const [imagePreview, setImagePreview] = useState(portfolio.image);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });
        formData.append('_method', 'PUT');

        post(route('admin.portfolios.update', portfolio.id), {
            forceFormData: true,
        });
    };

    const categories = [
        'Website',
        'Mobile App',
        'UI/UX Design',
        'Branding',
        'E-commerce',
        'Web App',
        'Dashboard',
        'Landing Page',
    ];

    return (
        <AuthenticatedLayout title="Edit Portofolio">
            <Head title="Edit Portofolio" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Portofolio</h1>
                    <p className="text-gray-600 mt-1">Edit informasi portofolio</p>
                </div>
                <div className="flex space-x-3">
                    <Link
                        href={`/portofolio/${portfolio.slug}`}
                        target="_blank"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PhotoIcon className="h-5 w-5 mr-2" />
                        Preview
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

            {/* Form */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Judul Portofolio *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Contoh: Website E-commerce Toko Baju"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi *
                            </label>
                            <textarea
                                id="description"
                                rows="6"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Deskripsikan proyek secara detail..."
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Category & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Kategori *
                                </label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.category ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gambar Utama
                            </label>
                            
                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-2">
                                        <label htmlFor="image" className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                                            Upload gambar baru
                                        </label>
                                        {' '}atau drag & drop
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        PNG, JPG, GIF up to 2MB
                                    </p>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                            )}
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                                    {errors.image}
                                </p>
                            )}
                            <p className="text-sm text-gray-500 mt-2">
                                Kosongkan jika tidak ingin mengubah gambar
                            </p>
                        </div>

                        {/* SEO Fields */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="seo_title" className="block text-sm font-medium text-gray-700 mb-1">
                                        SEO Title
                                    </label>
                                    <input
                                        type="text"
                                        id="seo_title"
                                        value={data.seo_title}
                                        onChange={e => setData('seo_title', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Judul untuk SEO (optional)"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="seo_description" className="block text-sm font-medium text-gray-700 mb-1">
                                        SEO Description
                                    </label>
                                    <textarea
                                        id="seo_description"
                                        rows="3"
                                        value={data.seo_description}
                                        onChange={e => setData('seo_description', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Deskripsi untuk SEO (optional)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-4 py-2 border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Menyimpan...' : 'Update Portofolio'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}