import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  UsersIcon,
  ShoppingCartIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard({ 
  stats, 
  revenueThisMonth, 
  revenueGrowth,
  recentOrders, 
  orderChart, 
  orderStatusChart,
  topVendors,
  recentActivities 
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Statistik utama dengan ikon yang lebih baik
  const mainStatCards = [
    { 
      name: 'Total Pengguna', 
      value: stats.total_users, 
      icon: UsersIcon, 
      color: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Total Pesanan',
      value: stats.total_orders,
      icon: ShoppingCartIcon,
      color: 'from-green-500 to-green-600',
      lightColor: 'bg-green-100',
      iconColor: 'text-green-600',
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Pendapatan',
      value: formatCurrency(stats.total_revenue),
      icon: CurrencyDollarIcon,
      color: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      change: `${revenueGrowth > 0 ? '+' : ''}${revenueGrowth}%`,
      changeType: revenueGrowth >= 0 ? 'increase' : 'decrease'
    },
    {
      name: 'Vendor Aktif',
      value: stats.total_vendors,
      icon: UserGroupIcon,
      color: 'from-orange-500 to-orange-600',
      lightColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      change: '+5%',
      changeType: 'increase'
    },
  ];

  const secondaryStatCards = [
    { name: 'Layanan', value: stats.total_services, icon: WrenchScrewdriverIcon, color: 'bg-yellow-500' },
    { name: 'Paket', value: stats.total_packages, icon: CubeIcon, color: 'bg-purple-500' },
    { name: 'Portofolio', value: stats.total_portfolios, icon: PhotoIcon, color: 'bg-pink-500' },
    { name: 'Testimoni', value: stats.total_testimonials, icon: ChatBubbleLeftRightIcon, color: 'bg-indigo-500' },
  ];

  // Data untuk grafik pesanan
  const orderChartData = {
    labels: orderChart.map(item => {
      const date = new Date();
      date.setMonth(item.month - 1);
      return date.toLocaleDateString('id-ID', { month: 'short' });
    }),
    datasets: [
      {
        label: 'Jumlah Pesanan',
        data: orderChart.map(item => item.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
      },
      {
        label: 'Pendapatan (Juta)',
        data: orderChart.map(item => (item.revenue / 1000000).toFixed(2)),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  };

  const orderChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.dataset.label.includes('Pendapatan')) {
              label += formatCurrency(context.raw * 1000000);
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
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        title: {
          display: true,
          text: 'Jumlah Pesanan',
        },
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Pendapatan (Juta)',
        },
        ticks: {
          callback: function(value) {
            return 'Rp' + value + 'Jt';
          },
        },
      },
    },
  };

  // Data untuk grafik status pesanan
  const orderStatusData = {
    labels: orderStatusChart.map(item => {
      const statusMap = {
        'pending': 'Pending',
        'paid': 'Dibayar',
        'completed': 'Selesai',
        'cancelled': 'Dibatalkan'
      };
      return statusMap[item.status] || item.status;
    }),
    datasets: [
      {
        data: orderStatusChart.map(item => item.count),
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const orderStatusOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
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
    <AuthenticatedLayout title="Dashboard Admin">
      <Head title="Dashboard Admin" />

      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Selamat Datang, {auth.user.name}!</h1>
            <p className="text-blue-100">
              Berikut adalah ringkasan aktivitas platform Anda hari ini.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <CalendarIcon className="h-5 w-5 text-blue-200" />
            <span className="text-blue-100">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainStatCards.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.lightColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.changeType === 'increase' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistik Konten</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {secondaryStatCards.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-3">
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">{stat.name}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pendapatan Bulan Ini</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(revenueThisMonth)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2">
              <ArrowTrendingUpIcon className={`h-5 w-5 ${
                revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'
              }`} />
              <span className={`text-sm font-medium ${
                revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {revenueGrowth > 0 ? '+' : ''}{revenueGrowth}%
              </span>
            </div>
            <span className="text-sm text-gray-600">dari bulan lalu</span>
          </div>
          <div className="mt-4">
            <Link 
              href="/admin/orders" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              Lihat detail pesanan
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Status Pesanan</h3>
          <div className="h-48">
            {orderStatusChart && orderStatusChart.length > 0 ? (
              <Doughnut data={orderStatusData} options={orderStatusOptions} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Belum ada data pesanan</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Vendors */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Top Vendors</h3>
            <Link href="/admin/users?role=vendor" className="text-xs text-blue-600 hover:text-blue-700">
              Lihat semua
            </Link>
          </div>
          <div className="space-y-4">
            {topVendors && topVendors.length > 0 ? (
              topVendors.map((vendor, index) => (
                <div key={vendor.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500 w-5">#{index + 1}</span>
                    <div className="flex-shrink-0">
                      <img
                        src={vendor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.name)}&background=random`}
                        alt={vendor.name}
                        className="h-8 w-8 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                      <p className="text-xs text-gray-600">{vendor.orders_count || 0} pesanan</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(vendor.revenue || 0)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">Belum ada data vendor</p>
            )}
          </div>
        </div>
      </div>

      {/* Order Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Grafik Pesanan & Pendapatan</h3>
            <p className="text-sm text-gray-600 mt-1">Tahun {new Date().getFullYear()}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                selectedPeriod === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setSelectedPeriod('quarter')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                selectedPeriod === 'quarter'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Kuartal
            </button>
          </div>
        </div>
        <div className="h-80">
          {orderChart && orderChart.length > 0 ? (
            <Line data={orderChartData} options={orderChartOptions} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Belum ada data untuk ditampilkan</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
              <Link href="/admin/orders" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
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
                          <Link href={`/admin/orders/${order.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                            {order.order_number}
                          </Link>
                          <p className="text-xs text-gray-600">
                            {order.user?.name || 'N/A'} • {order.service?.title || order.package?.name || 'N/A'}
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

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terkini</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities && recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        activity.type === 'order' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {activity.type === 'order' ? (
                          <ShoppingCartIcon className="h-4 w-4 text-blue-600" />
                        ) : (
                          <UsersIcon className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(activity.created_at)}
                      </p>
                    </div>
                    {activity.status && (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === 'active' || activity.status === 'paid' || activity.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : activity.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Belum ada aktivitas</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions - Hanya untuk Admin */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/services/create"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <WrenchScrewdriverIcon className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Tambah Layanan</span>
              <span className="text-xs text-gray-600 mt-1">Buat layanan baru</span>
            </div>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <ShoppingCartIcon className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Kelola Pesanan</span>
              <span className="text-xs text-gray-600 mt-1">Lihat & proses pesanan</span>
            </div>
          </Link>

          <Link
            href="/admin/users"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <UsersIcon className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Kelola Pengguna</span>
              <span className="text-xs text-gray-600 mt-1">Atur user & vendor</span>
            </div>
          </Link>

          <Link
            href="/admin/reports"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 p-3 rounded-full mb-3">
                <ChartBarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Laporan</span>
              <span className="text-xs text-gray-600 mt-1">Lihat analitik lengkap</span>
            </div>
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}