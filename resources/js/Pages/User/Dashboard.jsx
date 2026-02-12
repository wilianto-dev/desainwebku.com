import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  ShoppingCartIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  StarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function UserDashboard({ stats, recentOrders, recommendedServices }) {
  const { auth } = usePage().props;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const statCards = [
    {
      name: 'Total Pesanan',
      value: stats.total_orders,
      icon: ShoppingCartIcon,
      color: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      name: 'Menunggu',
      value: stats.pending_orders,
      icon: ClockIcon,
      color: 'from-yellow-500 to-yellow-600',
      lightColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      name: 'Selesai',
      value: stats.completed_orders,
      icon: CheckCircleIcon,
      color: 'from-green-500 to-green-600',
      lightColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      name: 'Total Belanja',
      value: formatCurrency(stats.total_spent),
      icon: CurrencyDollarIcon,
      color: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Menunggu' },
      'paid': { color: 'bg-green-100 text-green-800', label: 'Dibayar' },
      'completed': { color: 'bg-blue-100 text-blue-800', label: 'Selesai' },
      'cancelled': { color: 'bg-red-100 text-red-800', label: 'Dibatalkan' },
    };
    return statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status };
  };

  return (
    <AuthenticatedLayout title="Dashboard Saya">
      <Head title="Dashboard Saya" />

      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Halo, {auth.user.name}!</h1>
            <p className="text-indigo-100">
              Selamat datang kembali di dashboard Anda.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden md:flex items-center space-x-2 bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition"
          >
            <WrenchScrewdriverIcon className="h-5 w-5" />
            <span>Jelajahi Layanan</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.lightColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
              <p className="text-sm text-gray-600 mt-1">
                Status terbaru dari pesanan Anda
              </p>
            </div>
            <Link href="/orders" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Lihat semua pesanan →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentOrders && recentOrders.length > 0 ? (
            recentOrders.map((order) => {
              const statusBadge = getStatusBadge(order.status);
              return (
                <div key={order.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <Link href={`/orders/${order.id}`} className="text-sm font-medium text-gray-900 hover:text-indigo-600">
                          {order.order_number}
                        </Link>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {order.service?.title || order.package?.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Vendor: {order.service?.user?.name || order.package?.user?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(order.total_price)}
                      </p>
                      <div className="mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-8 text-center">
              <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Belum ada pesanan</p>
              <Link
                href="/services"
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Mulai pesan layanan
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Services */}
      {recommendedServices && recommendedServices.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Rekomendasi Layanan</h3>
              <p className="text-sm text-gray-600 mt-1">
                Layanan yang mungkin Anda butuhkan
              </p>
            </div>
            <Link href="/services" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Lihat semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <WrenchScrewdriverIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {service.user?.name}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
                    {service.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Mulai dari</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(service.price)}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {service.duration} hari
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}