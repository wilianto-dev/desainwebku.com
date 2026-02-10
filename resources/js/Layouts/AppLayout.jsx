import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    WrenchScrewdriverIcon,
    BriefcaseIcon,
    PhoneIcon,
    UserCircleIcon,
    Squares2X2Icon,
    ArrowRightOnRectangleIcon,
    ArrowLeftOnRectangleIcon,
    UserPlusIcon,
    ChevronDownIcon,
    EnvelopeIcon,
    MapPinIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function AppLayout({ children, title = 'DesainWebku' }) {
    const { auth, flash } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user } = auth || {};
    

    // Handle flash messages dengan optional chaining
    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.warning) {
            toast(flash.warning, { icon: '⚠️' });
        }
        if (flash?.info) {
            toast(flash.info, { icon: 'ℹ️' });
        }
    }, [flash]);

    const navigation = [
        { name: 'Beranda', href: '/', icon: HomeIcon },
        { name: 'Layanan', href: '/layanan', icon: WrenchScrewdriverIcon },
        { name: 'Portofolio', href: '/portofolio', icon: BriefcaseIcon },
        { name: 'Kontak', href: '/kontak', icon: PhoneIcon },
    ];

    return (
        <>
            <Head title={title} />
            <Toaster position="top-right" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header/Navigation */}
                <header className="bg-white shadow-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">DW</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900 hidden md:block">DesainWebku</span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex md:items-center md:space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </nav>

                            {/* User Menu / Auth Buttons */}
                            <div className="flex items-center space-x-4">
                                {user ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <UserCircleIcon className="h-8 w-8 text-gray-500" />
                                            <div className="hidden md:block text-left">
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500 capitalize">
                                                    {user.roles && user.roles.length > 0 ? user.roles[0] : 'User'}
                                                </p>
                                            </div>
                                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                        </button>

                                        {userMenuOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border z-50">
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    <Squares2X2Icon className="h-5 w-5" />
                                                    <span>Dashboard</span>
                                                </Link>
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                >
                                                    <UserCircleIcon className="h-5 w-5" />
                                                    <span>Profile</span>
                                                </Link>
                                                {user.roles && user.roles.includes('admin') && (
                                                    <Link
                                                        href="/admin/dashboard"
                                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                    >
                                                        <ChartBarIcon className="h-5 w-5" />
                                                        <span>Admin Panel</span>
                                                    </Link>
                                                )}
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
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href="/login"
                                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                                        >
                                            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                                            <span className="hidden md:inline">Login</span>
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                        >
                                            <UserPlusIcon className="h-5 w-5" />
                                            <span className="hidden md:inline">Daftar</span>
                                            <span className="md:hidden">Register</span>
                                        </Link>
                                    </div>
                                )}

                                {/* Mobile menu button */}
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                                >
                                    {mobileMenuOpen ? (
                                        <XMarkIcon className="h-6 w-6 text-gray-600" />
                                    ) : (
                                        <Bars3Icon className="h-6 w-6 text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-white border-t">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-grow">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 text-white mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">DW</span>
                                    </div>
                                    <span className="text-xl font-bold">DesainWebku</span>
                                </div>
                                <p className="text-gray-300 text-sm">
                                    Jasa pembuatan website profesional untuk bisnis Anda.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Layanan</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li><Link href="/layanan" className="hover:text-white">Web Development</Link></li>
                                    <li><Link href="/layanan" className="hover:text-white">Mobile App</Link></li>
                                    <li><Link href="/layanan" className="hover:text-white">UI/UX Design</Link></li>
                                    <li><Link href="/layanan" className="hover:text-white">SEO Optimization</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Perusahaan</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li><Link href="/tentang-kami" className="hover:text-white">Tentang Kami</Link></li>
                                    <li><Link href="/portofolio" className="hover:text-white">Portofolio</Link></li>
                                    <li><Link href="/kontak" className="hover:text-white">Kontak</Link></li>
                                    <li><Link href="/karir" className="hover:text-white">Karir</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
                                <div className="space-y-3 text-gray-300">
                                    <p className="flex items-center space-x-2">
                                        <PhoneIcon className="h-5 w-5" />
                                        <span>+62 812 3456 7890</span>
                                    </p>
                                    <p className="flex items-center space-x-2">
                                        <EnvelopeIcon className="h-5 w-5" />
                                        <span>info@desainwebku.com</span>
                                    </p>
                                    <p className="flex items-center space-x-2">
                                        <MapPinIcon className="h-5 w-5" />
                                        <span>Jakarta, Indonesia</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                            <p>&copy; {new Date().getFullYear()} DesainWebku. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}