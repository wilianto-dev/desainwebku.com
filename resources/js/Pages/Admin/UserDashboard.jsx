import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  ShoppingCartIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  StarIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function UserDashboard({ 
  stats, 
  recentOrders, 
  recommendedServices,
  recentActivities 
}) {
  const { auth } = usePage().props;
  const [activeTab, setActiveTab] = useState('orders');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', 
        icon: ClockIcon, 
        label: 'Menunggu' 
      },
      'paid': { 
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', 
        icon: CheckCircleIcon, 
        label: 'Dibayar' 
      },
      'completed': { 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', 
        icon: CheckCircleIcon, 
        label: 'Selesai' 
      },
      'cancelled': { 
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', 
        icon: XCircleIcon, 
        label: 'Dibatalkan' 
      },
    };
    return statusMap[status] || { color: 'bg-gray-100 text-gray-800', icon: ClockIcon, label: status };
  };

  return (
    <AuthenticatedLayout title="Dashboard Saya">
      <Head title="Dashboard" />

      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Halo, {auth.user.name}! 👋
            </h1>
            <p className="text-blue-100 text-sm md:text-base">
              Selamat datang kembali di dashboard Anda.
            </p>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
            Jelajahi Layanan
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
              <ShoppingCartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats?.total_orders || 0}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Total Pesanan
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded-lg">
              <ClockIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Pending
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats?.pending_orders || 0}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Menunggu Konfirmasi
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Selesai
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats?.completed_orders || 0}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Pesanan Selesai
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
              <CurrencyDollarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(stats?.total_spent || 0)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Total Pengeluaran
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Pesanan Terbaru
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {recentOrders?.length || 0} pesanan terakhir
                  </p>
                </div>
                <Link 
                  href="/orders" 
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center"
                >
                  Lihat semua
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((order) => {
                  const StatusBadge = getStatusBadge(order.status);
                  return (
                    <div key={order.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              <ShoppingCartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {order.service?.title || order.package?.name || 'Layanan'}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                              {order.order_number} • {order.service?.user?.name || order.package?.user?.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(order.total_price)}
                          </p>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${StatusBadge.color}`}>
                              <StatusBadge.icon className="h-3 w-3 mr-1" />
                              {StatusBadge.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="px-6 py-12 text-center">
                  <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                    Belum Ada Pesanan
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Mulai pesan layanan pertama Anda sekarang!
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Jelajahi Layanan
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Aksi Cepat
            </h3>
            <div className="space-y-3">
              <Link
                href="/services"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                  <MagnifyingGlassIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Cari Layanan</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Temukan layanan terbaik</p>
                </div>
              </Link>

              <Link
                href="/profile"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
                  <UserCircleIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Edit Profil</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Perbarui informasi Anda</p>
                </div>
              </Link>

              <Link
                href="/orders"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors">
                  <ClockIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Lacak Pesanan</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Cek status pesanan</p>
                </div>
              </Link>
            </div>

            {/* Profile Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <img
                  src={auth.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}&background=3B82F6&color=fff&size=128`}
                  alt={auth.user.name}
                  className="h-12 w-12 rounded-full ring-2 ring-white dark:ring-gray-700"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {auth.user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {auth.user.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Member sejak {formatDate(auth.user.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Services */}
      {recommendedServices && recommendedServices.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Rekomendasi Layanan
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Berdasarkan aktivitas Anda
              </p>
            </div>
            <Link 
              href="/services" 
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
            >
              Lihat semua
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-2">
                    <WrenchScrewdriverIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center">
                    <StarIconSolid className="h-4 w-4 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-1">
                      {service.rating || '5.0'}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 truncate">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mulai dari</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(service.starting_price)}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {service.user?.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activities */}
      {recentActivities && recentActivities.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Aktivitas Terkini
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivities.map((activity, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === 'order' 
                        ? 'bg-blue-100 dark:bg-blue-900/20' 
                        : 'bg-green-100 dark:bg-green-900/20'
                    }`}>
                      {activity.type === 'order' ? (
                        <ShoppingCartIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(activity.created_at)}
                      </p>
                    </div>
                    {activity.status && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : activity.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {activity.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}