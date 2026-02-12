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
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  CogIcon,
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
import { Line, Doughnut } from 'react-chartjs-2';

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
  recentOrders, 
  recentUsers,
  orderChart, 
  userChart,
  popularContent 
}) {
  const { auth } = usePage().props;
  const [dateRange, setDateRange] = useState('month');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number || 0);
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

  // Statistik utama
  const statCards = [
    { 
      name: 'Total Pengguna', 
      value: formatNumber(stats?.total_users), 
      icon: UsersIcon, 
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      link: '/admin/users',
      change: '+12% dari bulan lalu'
    },
    {
      name: 'Total Pesanan',
      value: formatNumber(stats?.total_orders),
      icon: ShoppingCartIcon,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      link: '/admin/orders',
      change: '+8% dari bulan lalu'
    },
    {
      name: 'Total Pendapatan',
      value: formatCurrency(stats?.total_revenue),
      icon: CurrencyDollarIcon,
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      link: '/admin/reports',
      change: '+15% dari bulan lalu'
    },
    {
      name: 'Total Konten',
      value: formatNumber((stats?.total_services || 0) + (stats?.total_packages || 0) + (stats?.total_portfolios || 0)),
      icon: DocumentTextIcon,
      color: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      link: '/admin/content',
      change: '+5 konten baru'
    },
  ];

  // Statistik konten
  const contentStats = [
    { name: 'Layanan', value: formatNumber(stats?.total_services), icon: WrenchScrewdriverIcon, color: 'blue', href: '/admin/services' },
    { name: 'Paket', value: formatNumber(stats?.total_packages), icon: CubeIcon, color: 'indigo', href: '/admin/packages' },
    { name: 'Portofolio', value: formatNumber(stats?.total_portfolios), icon: PhotoIcon, color: 'pink', href: '/admin/portfolios' },
    { name: 'Testimoni', value: formatNumber(stats?.total_testimonials), icon: ChatBubbleLeftRightIcon, color: 'purple', href: '/admin/testimonials' },
  ];

  // Data untuk grafik pesanan
  const orderChartData = {
    labels: orderChart?.map(item => {
      const date = new Date();
      date.setMonth(item.month - 1);
      return date.toLocaleDateString('id-ID', { month: 'short' });
    }) || [],
    datasets: [
      {
        label: 'Jumlah Pesanan',
        data: orderChart?.map(item => item.count) || [],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  // Data untuk grafik pengguna
  const userChartData = {
    labels: userChart?.map(item => {
      const date = new Date();
      date.setMonth(item.month - 1);
      return date.toLocaleDateString('id-ID', { month: 'short' });
    }) || [],
    datasets: [
      {
        label: 'Pengguna Baru',
        data: userChart?.map(item => item.count) || [],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#8B5CF6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', 
        icon: ClockIcon, 
        label: 'Pending' 
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
    return statusMap[status] || { 
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400', 
      icon: ExclamationTriangleIcon, 
      label: status 
    };
  };

  return (
    <AuthenticatedLayout title="Dashboard Admin">
      <Head title="Dashboard Admin" />

      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Selamat Datang, {auth.user.name}!
            </h1>
            <p className="text-blue-100 text-sm md:text-base">
              Kelola platform CMS Anda dengan mudah melalui dashboard ini.
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <CalendarIcon className="h-5 w-5 text-blue-200" />
            <span className="text-sm text-blue-100">
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

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.link}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Content Stats */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Statistik Konten
          </h2>
          <Link 
            href="/admin/content" 
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            Kelola Konten
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contentStats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-3">
                <div className={`bg-${stat.color}-100 dark:bg-${stat.color}-900/20 p-2 rounded-lg`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Order Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Grafik Pesanan
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Tahun {new Date().getFullYear()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setDateRange('month')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  dateRange === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setDateRange('year')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  dateRange === 'year'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Tahunan
              </button>
            </div>
          </div>
          <div className="h-64">
            {orderChart && orderChart.length > 0 ? (
              <Line data={orderChartData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Belum ada data pesanan</p>
              </div>
            )}
          </div>
        </div>

        {/* User Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pertumbuhan Pengguna
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Tahun {new Date().getFullYear()}
              </p>
            </div>
            <Link 
              href="/admin/users" 
              className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Lihat semua
            </Link>
          </div>
          <div className="h-64">
            {userChart && userChart.length > 0 ? (
              <Line data={userChartData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Belum ada data pengguna</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
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
                href="/admin/orders" 
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
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <ShoppingCartIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <Link 
                            href={`/admin/orders/${order.id}`} 
                            className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate block"
                          >
                            {order.order_number}
                          </Link>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {order.user?.name || 'N/A'} • {order.service?.title || order.package?.name || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
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
              <div className="px-6 py-8 text-center">
                <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">Belum ada pesanan</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pengguna Baru
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {recentUsers?.length || 0} pengguna terbaru
                </p>
              </div>
              <Link 
                href="/admin/users" 
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
            {recentUsers && recentUsers.length > 0 ? (
              recentUsers.map((user) => (
                <div key={user.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=fff`}
                          alt={user.name}
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {user.role}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">Belum ada pengguna baru</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Content */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Konten Populer
          </h2>
          <Link 
            href="/admin/content" 
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
          >
            Kelola konten
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularContent?.services?.map((service) => (
            <Link
              key={service.id}
              href={`/admin/services/${service.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                    <WrenchScrewdriverIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
                      {service.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {service.orders_count || 0} pesanan
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  {service.rating || '5.0'} ★
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Aksi Cepat
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/services/create"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-[1.02] group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full mb-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                <PlusCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Tambah Layanan</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Buat layanan baru</span>
            </div>
          </Link>

          <Link
            href="/admin/users/create"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-[1.02] group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full mb-3 group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors">
                <UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Tambah User</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Buat pengguna baru</span>
            </div>
          </Link>

          <Link
            href="/admin/reports"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-[1.02] group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full mb-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
                <ChartBarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Laporan</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lihat analitik lengkap</span>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:scale-[1.02] group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full mb-3 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/40 transition-colors">
                <CogIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Pengaturan</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Konfigurasi sistem</span>
            </div>
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}