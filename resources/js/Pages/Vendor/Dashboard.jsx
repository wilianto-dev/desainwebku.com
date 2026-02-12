import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  WrenchScrewdriverIcon,
  CubeIcon,
  PhotoIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusCircleIcon,
  ChartBarIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function VendorDashboard({ 
  stats, 
  revenueThisMonth, 
  revenueGrowth,
  recentOrders, 
  revenueChart,
  popularServices 
}) {
  const { auth } = usePage().props;
  const [selectedPeriod, setSelectedPeriod] = useState('month');

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
      name: 'Pendapatan',
      value: formatCurrency(stats.total_revenue),
      icon: CurrencyDollarIcon,
      color: 'from-green-500 to-green-600',
      lightColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      name: 'Pesanan Pending',
      value: stats.pending_orders,
      icon: ClockIcon,
      color: 'from-yellow-500 to-yellow-600',
      lightColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      name: 'Layanan Aktif',
      value: stats.total_services,
      icon: WrenchScrewdriverIcon,
      color: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  // Data untuk grafik pendapatan
  const revenueChartData = {
    labels: revenueChart.map(item => {
      const date = new Date();
      date.setMonth(item.month - 1);
      return date.toLocaleDateString('id-ID', { month: 'short' });
    }),
    datasets: [
      {
        label: 'Pendapatan',
        data: revenueChart.map(item => item.revenue),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        tension: 0.4,
      },
      {
        label: 'Jumlah Pesanan',
        data: revenueChart.map(item => item.orders_count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.dataset.label === 'Pendapatan') {
              label += formatCurrency(context.raw);
            } else {
              label += context.raw;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          },
        },
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'Pending' },
      'paid': { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Dibayar' },
      'completed': { color: 'bg-blue-100 text-blue-800', icon: CheckCircleIcon, label: 'Selesai' },
      'cancelled': { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Dibatalkan' },
    };
    return statusMap[status] || { color: 'bg-gray-100 text-gray-800', icon: ExclamationTriangleIcon, label: status };
  };

  return (
    <AuthenticatedLayout title="Dashboard Vendor">
      <Head title="Dashboard Vendor" />

      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang, {auth.user.name}!</h1>
            <p className="text-purple-100">
              Kelola layanan, pesanan, dan portofolio Anda di sini.
            </p>
          </div>
          <Link
            href="/vendor/services/create"
            className="hidden md:flex items-center space-x-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition"
          >
            <PlusCircleIcon className="h-5 w-5" />
            <span>Tambah Layanan</span>
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

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <CubeIcon className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Total Paket</p>
              <p className="text-lg font-bold text-gray-900">{stats.total_packages}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-pink-100 p-2 rounded-lg">
              <PhotoIcon className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Portofolio</p>
              <p className="text-lg font-bold text-gray-900">{stats.total_portfolios}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Selesai</p>
              <p className="text-lg font-bold text-gray-900">{stats.completed_orders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <StarIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Rating</p>
              <p className="text-lg font-bold text-gray-900">4.8/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Pendapatan & Pesanan</h3>
            <p className="text-sm text-gray-600 mt-1">
              Pendapatan bulan ini: {formatCurrency(revenueThisMonth)}
              <span className={`ml-2 text-sm ${
                revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {revenueGrowth > 0 ? '+' : ''}{revenueGrowth}%
              </span>
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                selectedPeriod === 'month'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                selectedPeriod === 'year'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tahunan
            </button>
          </div>
        </div>
        <div className="h-80">
          {revenueChart && revenueChart.length > 0 ? (
            <Line data={revenueChartData} options={revenueChartOptions} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Belum ada data pendapatan</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders & Popular Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
              <Link href="/vendor/orders" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Lihat semua →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders && recentOrders.length > 0 ? (
              recentOrders.map((order) => {
                const StatusBadge = getStatusBadge(order.status);
                return (
                  <div key={order.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <ShoppingCartIcon className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div>
                          <Link href={`/vendor/orders/${order.id}`} className="text-sm font-medium text-gray-900 hover:text-purple-600">
                            {order.order_number}
                          </Link>
                          <p className="text-xs text-gray-600">
                            {order.user?.name} • {order.service?.title || order.package?.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
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
              <div className="px-6 py-8 text-center">
                <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Belum ada pesanan</p>
              </div>
            )}
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Layanan Populer</h3>
              <Link href="/vendor/services" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Kelola layanan →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {popularServices && popularServices.length > 0 ? (
              popularServices.map((service, index) => (
                <div key={service.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500 w-6">#{index + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{service.title}</p>
                        <p className="text-xs text-gray-600">{service.orders_count || 0} pesanan</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(service.price)}
                      </p>
                      <span className="text-xs text-gray-500">
                        {service.duration} hari
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <WrenchScrewdriverIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Belum ada layanan</p>
                <Link
                  href="/vendor/services/create"
                  className="inline-flex items-center mt-3 text-sm text-purple-600 hover:text-purple-700"
                >
                  <PlusCircleIcon className="h-4 w-4 mr-1" />
                  Tambah layanan pertama
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/vendor/services/create"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-105"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-3">
              <WrenchScrewdriverIcon className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Tambah Layanan</span>
            <span className="text-xs text-gray-600 mt-1">Buat layanan baru</span>
          </div>
        </Link>

        <Link
          href="/vendor/packages/create"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-105"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-3 rounded-full mb-3">
              <CubeIcon className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Tambah Paket</span>
            <span className="text-xs text-gray-600 mt-1">Buat paket layanan</span>
          </div>
        </Link>

        <Link
          href="/vendor/portfolios/create"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-105"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-pink-100 p-3 rounded-full mb-3">
              <PhotoIcon className="h-6 w-6 text-pink-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Tambah Portofolio</span>
            <span className="text-xs text-gray-600 mt-1">Upload project</span>
          </div>
        </Link>

        <Link
          href="/vendor/orders"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-105"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <ShoppingCartIcon className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Proses Pesanan</span>
            <span className="text-xs text-gray-600 mt-1">Lihat pesanan masuk</span>
          </div>
        </Link>
      </div>
    </AuthenticatedLayout>
  );
}