import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  ShoppingCartIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CogIcon,
  UsersIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  BellIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  FolderIcon,
  NewspaperIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';
import { useRemember } from '@inertiajs/react';

export default function AuthenticatedLayout({ children, title = 'Dashboard' }) {
  const { auth, flash } = usePage().props;
  const { user } = auth || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [darkMode, setDarkMode] = useRemember(false, 'dark-mode');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Effect untuk dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Effect untuk flash messages
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
    if (flash?.warning) {
      toast(flash.warning, {
        icon: '⚠️',
        style: {
          background: darkMode ? '#1F2937' : '#FEF3C7',
          color: darkMode ? '#fff' : '#92400E',
        },
      });
    }
  }, [flash, darkMode]);

  const isAdmin = user?.roles?.includes('admin');

  // Navigation items berdasarkan role
  const getNavigation = () => {
    const baseNav = [
      { 
        name: 'Dashboard', 
        href: '/dashboard', 
        icon: ChartBarIcon,
        description: 'Ringkasan aktivitas'
      },
    ];

    if (isAdmin) {
      return [
        ...baseNav,
        { 
          name: 'Manajemen Users', 
          href: '/admin/users', 
          icon: UsersIcon,
          description: 'Kelola pengguna',
          badge: user?.total_users
        },
        { 
          name: 'Manajemen Konten', 
          href: '/admin/content', 
          icon: DocumentTextIcon,
          description: 'Kelola konten',
          children: [
            { name: 'Layanan', href: '/admin/services', icon: WrenchScrewdriverIcon },
            { name: 'Paket', href: '/admin/packages', icon: CubeIcon },
            { name: 'Portofolio', href: '/admin/portfolios', icon: PhotoIcon },
          ]
        },
        { 
          name: 'Pesanan', 
          href: '/admin/orders', 
          icon: ShoppingCartIcon,
          description: 'Kelola pesanan',
          badge: user?.pending_orders
        },
        { 
          name: 'Testimoni', 
          href: '/admin/testimonials', 
          icon: ChatBubbleLeftRightIcon,
          description: 'Kelola testimoni'
        },
        { 
          name: 'Halaman', 
          href: '/admin/pages', 
          icon: NewspaperIcon,
          description: 'Kelola halaman'
        },
        { 
          name: 'Pengaturan', 
          href: '/admin/settings', 
          icon: CogIcon,
          description: 'Pengaturan sistem'
        },
      ];
    } else {
      return [
        ...baseNav,
        { 
          name: 'Jelajahi Layanan', 
          href: '/services', 
          icon: WrenchScrewdriverIcon,
          description: 'Temukan layanan terbaik'
        },
        { 
          name: 'Pesanan Saya', 
          href: '/orders', 
          icon: ShoppingCartIcon,
          description: 'Lihat riwayat pesanan',
          badge: user?.pending_orders
        },
        { 
          name: 'Profil Saya', 
          href: '/profile', 
          icon: UserCircleIcon,
          description: 'Atur profil Anda'
        },
      ];
    }
  };

  const navigation = getNavigation();

  // Notifikasi dummy
  const notifications = [
    { 
      id: 1, 
      title: 'Pesanan baru', 
      message: 'Pesanan #ORD-001 membutuhkan konfirmasi', 
      time: '5 menit lalu', 
      read: false,
      type: 'order',
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Pembayaran diterima', 
      message: 'Pembayaran untuk #ORD-002 berhasil dikonfirmasi', 
      time: '1 jam lalu', 
      read: false,
      type: 'payment',
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'Pengguna baru', 
      message: '3 pengguna baru mendaftar hari ini', 
      time: '3 jam lalu', 
      read: true,
      type: 'user',
      priority: 'low'
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // User menu items
  const getUserMenuItems = () => {
    return [
      { 
        name: 'Profil Saya', 
        href: '/profile', 
        icon: UserCircleIcon 
      },
      { 
        name: 'Beranda', 
        href: '/', 
        icon: HomeIcon 
      },
      { 
        name: 'Keluar', 
        href: '/logout', 
        method: 'post',
        icon: ArrowRightOnRectangleIcon,
        className: 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
      },
    ];
  };

  const userMenuItems = getUserMenuItems();

  const handleLogout = (e) => {
    e.preventDefault();
    router.post('/logout');
  };

  return (
    <>
      <Head title={title} />
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#1F2937' : '#fff',
            color: darkMode ? '#fff' : '#1F2937',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* Mobile sidebar */}
        <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? '' : 'hidden'}`}>
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform">
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CMS</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">AdminCMS</span>
              </Link>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <nav className="mt-5 px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                  {item.children && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <child.icon className="mr-3 h-4 w-4" />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CMS</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">AdminCMS</span>
              </Link>
            </div>
            
            <div className="flex-grow flex flex-col overflow-y-auto">
              <nav className="flex-1 px-3 py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                    {item.children && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <child.icon className="mr-3 h-4 w-4" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            
            {/* User info - desktop */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-700"
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=2563eb&color=fff`}
                    alt={user?.name}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[140px]">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isAdmin ? 'Administrator' : 'Member'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              {/* Left section */}
              <div className="flex items-center">
                <button
                  type="button"
                  className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
                
                {/* Page title - mobile */}
                <h1 className="lg:hidden ml-2 text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {title}
                </h1>
              </div>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-md mx-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-shadow"
                  />
                </div>
              </div>

              {/* Right section */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Mobile search button */}
                <button
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors"
                    aria-label="Notifications"
                  >
                    <BellIcon className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications dropdown */}
                  {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Notifikasi
                          </h3>
                          <button className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                            Tandai semua dibaca
                          </button>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 cursor-pointer transition-colors ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                                notification.priority === 'high' ? 'bg-red-500' :
                                notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                              }`} />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          href="/notifications"
                          className="block w-full text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 py-2 transition-colors"
                        >
                          Lihat semua notifikasi
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="User menu"
                  >
                    <img
                      className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-700"
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=2563eb&color=fff`}
                      alt={user?.name}
                    />
                    <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 hidden md:block" />
                  </button>

                  {/* User menu dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                          {user?.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {isAdmin ? 'Administrator' : 'Member'}
                        </p>
                      </div>
                      {userMenuItems.map((item) => (
                        item.name === 'Keluar' ? (
                          <button
                            key={item.name}
                            onClick={handleLogout}
                            className={`flex items-center space-x-2 w-full px-4 py-2 text-sm ${item.className}`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </button>
                        ) : (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile search bar */}
            {mobileSearchOpen && (
              <div className="md:hidden p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    autoFocus
                  />
                </div>
              </div>
            )}
          </header>

          {/* Page Content */}
          <main className="flex-1">
            <div className="py-6 lg:py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page title - desktop */}
                <h1 className="hidden lg:block text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {title}
                </h1>
                
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}