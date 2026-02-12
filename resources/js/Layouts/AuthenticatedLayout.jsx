import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';
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

  // Effect untuk dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Get user role dengan benar
  const getUserRole = () => {
    if (!user || !user.roles) return 'User';

    if (Array.isArray(user.roles)) {
      if (user.roles.length > 0) {
        if (typeof user.roles[0] === 'object' && user.roles[0]?.name) {
          return user.roles[0].name;
        } else if (typeof user.roles[0] === 'string') {
          return user.roles[0];
        }
      }
    }

    return 'User';
  };

  const userRole = getUserRole();
  const isAdmin = userRole === 'admin' || userRole === 'Admin';
  const isVendor = userRole === 'vendor' || userRole === 'Vendor';

  // Navigation items berdasarkan role
  const getNavigation = () => {
    if (isAdmin) {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, current: true },
        { name: 'Layanan', href: '/admin/services', icon: WrenchScrewdriverIcon },
        { name: 'Paket', href: '/admin/packages', icon: CubeIcon },
        { name: 'Pesanan', href: '/admin/orders', icon: ShoppingCartIcon },
        { name: 'Portofolio', href: '/admin/portfolios', icon: PhotoIcon },
        { name: 'Testimoni', href: '/admin/testimonials', icon: ChatBubbleLeftRightIcon },
        { name: 'Halaman', href: '/admin/pages', icon: DocumentTextIcon },
        { name: 'Pengguna', href: '/admin/users', icon: UsersIcon },
        { name: 'Pengaturan', href: '/admin/settings', icon: CogIcon },
      ];
    } else if (isVendor) {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, current: true },
        { name: 'Layanan', href: '/vendor/services', icon: WrenchScrewdriverIcon },
        { name: 'Paket', href: '/vendor/packages', icon: CubeIcon },
        { name: 'Pesanan', href: '/vendor/orders', icon: ShoppingCartIcon },
        { name: 'Portofolio', href: '/vendor/portfolios', icon: PhotoIcon },
        { name: 'Testimoni', href: '/vendor/testimonials', icon: ChatBubbleLeftRightIcon },
        { name: 'Pengaturan', href: '/vendor/settings', icon: CogIcon },
      ];
    } else {
      return [
        { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon, current: true },
        { name: 'Pesanan Saya', href: '/orders', icon: ShoppingCartIcon },
        { name: 'Jelajahi Layanan', href: '/services', icon: WrenchScrewdriverIcon },
        { name: 'Profil', href: '/profile', icon: UserCircleIcon },
      ];
    }
  };

  const navigation = getNavigation();

  // Notifikasi dummy
  const notifications = [
    { id: 1, title: 'Pesanan baru', message: 'Pesanan #ORD-001 telah dibuat', time: '5 menit lalu', read: false },
    { id: 2, title: 'Pembayaran diterima', message: 'Pembayaran untuk #ORD-002 berhasil', time: '1 jam lalu', read: false },
    { id: 3, title: 'Pesanan selesai', message: 'Pesanan #ORD-003 telah selesai', time: '3 jam lalu', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // User menu items berdasarkan role
  const getUserMenuItems = () => {
    const items = [
      { 
        name: 'Profile', 
        href: isAdmin ? '/admin/profile' : isVendor ? '/vendor/profile' : '/profile', 
        icon: UserCircleIcon 
      },
      { 
        name: 'Home', 
        href: '/', 
        icon: HomeIcon 
      },
    ];

    if (isAdmin) {
      items.push({ 
        name: 'Site Settings', 
        href: '/admin/settings', 
        icon: CogIcon 
      });
    }

    items.push({ 
      name: 'Logout', 
      href: '/logout', 
      method: 'post',
      icon: ArrowRightOnRectangleIcon,
      className: 'text-red-600 hover:bg-red-50'
    });

    return items;
  };

  const userMenuItems = getUserMenuItems();

  return (
    <>
      <Head title={title} />
      <Toaster position="top-right" toastOptions={{
        duration: 4000,
        style: {
          background: darkMode ? '#1F2937' : '#fff',
          color: darkMode ? '#fff' : '#1F2937',
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
      }} />

      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* Mobile sidebar */}
        <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? '' : 'hidden'}`}>
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
            <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DW</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">DesainWebku</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                  {item.name}
                </Link>
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
                  <span className="text-white font-bold text-sm">DW</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">DesainWebku</span>
              </Link>
            </div>
            <div className="flex-grow flex flex-col overflow-y-auto">
              <nav className="flex-1 px-3 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                    alt={user?.name}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[140px]">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {userRole}
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
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                  >
                    <BellIcon className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Notifikasi
                          </h3>
                          <button className="text-xs text-blue-600 hover:text-blue-700">
                            Tandai semua dibaca
                          </button>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                          >
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
                        ))}
                      </div>
                      <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          href={isAdmin ? '/admin/notifications' : isVendor ? '/vendor/notifications' : '/notifications'}
                          className="block w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2"
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
                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                      alt={user?.name}
                    />
                    <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 hidden md:block" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {user?.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                          Role: {userRole}
                        </p>
                      </div>
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          method={item.method}
                          as={item.method === 'post' ? 'button' : 'a'}
                          className={`flex items-center space-x-2 w-full px-4 py-2 text-sm ${
                            item.className || 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}