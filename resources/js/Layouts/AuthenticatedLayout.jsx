import React, { useState } from 'react';
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
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ children, title = 'Dashboard' }) {
  const { auth } = usePage().props;
  const { user } = auth || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Fix: Get role names properly
  const getUserRole = () => {
    if (!user || !user.roles) return 'User';

    // If roles is an array of objects (from Spatie)
    if (Array.isArray(user.roles) && user.roles.length > 0) {
      // Check if it's an array of objects or strings
      if (typeof user.roles[0] === 'object' && user.roles[0].name) {
        return user.roles[0].name;
      } else if (typeof user.roles[0] === 'string') {
        return user.roles[0];
      }
    }

    return 'User';
  };

  const isAdmin = () => {
    const role = getUserRole();
    return role === 'admin' || role === 'Admin';
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    ...(isAdmin()
      ? [
          { name: 'Layanan', href: '/admin/services', icon: WrenchScrewdriverIcon },
          { name: 'Paket', href: '/admin/packages', icon: CubeIcon },
          { name: 'Pesanan', href: '/admin/orders', icon: ShoppingCartIcon },
          { name: 'Portofolio', href: '/admin/portfolios', icon: PhotoIcon },
          { name: 'Testimoni', href: '/admin/testimonials', icon: ChatBubbleLeftRightIcon },
          { name: 'Halaman', href: '/admin/pages', icon: DocumentTextIcon },
          { name: 'Pengguna', href: '/admin/users', icon: UsersIcon },
          { name: 'Pengaturan', href: '/admin/settings', icon: CogIcon },
        ]
      : [
          { name: 'Pesanan Saya', href: '/pesanan', icon: ShoppingCartIcon },
          { name: 'Profil', href: '/profile', icon: UserCircleIcon },
        ]),
  ];

  return (
    <>
      <Head title={title} />
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gray-100">
        {/* Mobile sidebar */}
        <div className={`md:hidden fixed inset-0 z-40 ${sidebarOpen ? '' : 'hidden'}`}>
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="h-16 flex items-center justify-between px-4 border-b">
              <span className="text-xl font-bold text-gray-900">Dashboard</span>
              <button onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5">
            <div className="flex items-center px-4 mb-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DW</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
              </Link>
            </div>
            <div className="flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{getUserRole()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col">
          <header className="sticky top-0 z-10 bg-white shadow-sm">
            <div className="flex items-center justify-between h-16 px-4">
              <button
                type="button"
                className="md:hidden px-4 text-gray-500 focus:outline-none"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              <div className="flex-1">
                <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <UserCircleIcon className="h-8 w-8 text-gray-500" />
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border z-50">
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <UserCircleIcon className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <HomeIcon className="h-5 w-5" />
                        <span>Home</span>
                      </Link>
                      <div className="border-t my-1"></div>
                      <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        <span>Logout</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
