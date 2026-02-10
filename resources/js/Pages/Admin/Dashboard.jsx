import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    UserGroupIcon,
    ShoppingCartIcon,
    WrenchScrewdriverIcon,
    CubeIcon,
    PhotoIcon,
    ChatBubbleLeftRightIcon,
    DocumentTextIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ stats, revenueThisMonth, recentOrders, orderChart }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const statCards = [
        { name: 'Total Pengguna', value: stats.total_users, icon: UserGroupIcon, color: 'bg-blue-500' },
        { name: 'Total Pesanan', value: stats.total_orders, icon: ShoppingCartIcon, color: 'bg-green-500' },
        { name: 'Layanan', value: stats.total_services, icon: WrenchScrewdriverIcon, color: 'bg-yellow-500' },
        { name: 'Paket', value: stats.total_packages, icon: CubeIcon, color: 'bg-purple-500' },
        { name: 'Portofolio', value: stats.total_portfolios, icon: PhotoIcon, color: 'bg-pink-500' },
        { name: 'Testimoni', value: stats.total_testimonials, icon: ChatBubbleLeftRightIcon, color: 'bg-indigo-500' },
    ];

    return (
        <AuthenticatedLayout title="Dashboard Admin">
            <Head title="Dashboard Admin" />

            {/* Stats Grid */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistik</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {statCards.map((stat) => (
                        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Revenue & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Pendapatan Bulan Ini</h3>
                        <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-gray-900">{formatCurrency(revenueThisMonth || 0)}</p>
                        <div className="flex items-center justify-center mt-4 text-green-600">
                            <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
                            <span className="text-sm font-medium">+12.5% dari bulan lalu</span>
                        </div>
                    </div>
                </div>

                {/* Order Chart Summary */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Statistik Pesanan</h3>
                    <div className="space-y-4">
                        {orderChart && orderChart.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Bulan {item.month}</span>
                                <div className="flex items-center">
                                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full" 
                                            style={{ width: `${Math.min(item.count * 10, 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{item.count} pesanan</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Pesanan Terbaru</h2>
                    <Link href="/admin/orders" className="text-blue-600 hover:text-blue-700 font-medium">
                        Lihat semua →
                    </Link>
                </div>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No. Pesanan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Layanan/Paket
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentOrders && recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">{order.order_number}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{order.user?.name || 'N/A'}</div>
                                            <div className="text-sm text-gray-500">{order.user?.email || ''}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {order.service?.title || order.package?.name || 'N/A'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {order.service ? 'Layanan' : 'Paket'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">
                                                {formatCurrency(order.total_price)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                order.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {order.status === 'paid' ? 'Dibayar' :
                                                 order.status === 'pending' ? 'Pending' :
                                                 order.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Aksi Cepat</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link
                        href="/admin/services/create"
                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <WrenchScrewdriverIcon className="h-8 w-8 text-blue-500" />
                            <span className="text-sm font-medium text-gray-600">Tambah Layanan</span>
                        </div>
                    </Link>
                    
                    <Link
                        href="/admin/orders/create"
                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <ShoppingCartIcon className="h-8 w-8 text-green-500" />
                            <span className="text-sm font-medium text-gray-600">Buat Pesanan</span>
                        </div>
                    </Link>
                    
                    <Link
                        href="/admin/portfolios/create"
                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <PhotoIcon className="h-8 w-8 text-purple-500" />
                            <span className="text-sm font-medium text-gray-600">Tambah Portofolio</span>
                        </div>
                    </Link>
                    
                    <Link
                        href="/admin/users"
                        className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <UserGroupIcon className="h-8 w-8 text-red-500" />
                            <span className="text-sm font-medium text-gray-600">Kelola Pengguna</span>
                        </div>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}