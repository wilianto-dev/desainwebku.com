import React, { useState, useEffect } from 'react';
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
  CpuChipIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ServerIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  FingerPrintIcon,
  LockClosedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  ChartBarSquareIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  SwatchIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import ThemeModal from '@/Components/ThemeModal';

export default function AppLayout({ children, title = 'Desainwebku' }) {
  const { auth, flash } = usePage().props;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('cyber');
  const [showThemeModal, setShowThemeModal] = useState(false);
  const { user } = auth || {};

  // Initialize theme from localStorage and check first visit
  useEffect(() => {
    const savedTheme = localStorage.getItem('desainwebku-theme');
    const hasVisited = localStorage.getItem('desainwebku-has-visited');

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      setTheme('cyber');
      document.documentElement.setAttribute('data-theme', 'cyber');
    }

    // Show modal for first-time visitors
    if (!hasVisited) {
      setShowThemeModal(true);
      localStorage.setItem('desainwebku-has-visited', 'true');
    }
  }, []);

  // Handle theme change
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('desainwebku-theme', newTheme);
    setThemeDropdownOpen(false);

    // Show success toast
    toast.success(`Tema ${getThemeName(newTheme)} diterapkan`, {
      icon: '🎨',
      duration: 2000,
    });
  };

  // Get theme display name
  const getThemeName = (themeValue) => {
    switch (themeValue) {
      case 'cyber':
        return 'cyber';
      case 'startup':
        return 'startup';
      case 'dark-corporate':
        return 'corporate';
      default:
        return themeValue;
    }
  };

  // Get theme icon
  const getThemeIcon = (themeValue) => {
    switch (themeValue) {
      case 'cyber':
        return ComputerDesktopIcon;
      case 'startup':
        return PaintBrushIcon;
      case 'dark-corporate':
        return ShieldCheckIcon;
      default:
        return SwatchIcon;
    }
  };

  // Handle flash messages
  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
    if (flash?.warning) toast(flash.warning, { icon: '⚠️' });
    if (flash?.info) toast(flash.info, { icon: 'ℹ️' });
  }, [flash]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setThemeDropdownOpen(false);
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const navigation = [
    { name: 'Beranda', href: '/', icon: HomeIcon },
    { name: 'Layanan', href: '/layanan', icon: CpuChipIcon },
    { name: 'Portofolio', href: '/portofolio', icon: CodeBracketIcon },
    { name: 'Kontak', href: '/kontak', icon: ChatBubbleLeftRightIcon },
  ];

  // Theme-based navbar styling
  const getNavbarClasses = () => {
    const base = 'fixed w-full z-50 transition-theme';
    const scrolledClass = scrolled ? ' backdrop-blur-lg border-b' : ' bg-transparent';

    switch (theme) {
      case 'cyber':
        return `${base}${scrolledClass} ${scrolled ? 'bg-black/90 border-[var(--color-border)]' : ''}`;
      case 'startup':
        return `${base}${scrolledClass} ${scrolled ? 'bg-white/90 border-[var(--color-border)]' : ''}`;
      case 'dark-corporate':
        return `${base}${scrolledClass} ${scrolled ? 'bg-[var(--color-bg-secondary)]/90 border-[var(--color-border)]' : ''}`;
      default:
        return `${base}${scrolledClass}`;
    }
  };

  const getLogoClasses = () => {
    switch (theme) {
      case 'cyber':
        return 'text-[var(--color-primary)] font-mono';
      case 'startup':
        return 'text-[var(--color-primary)]';
      case 'dark-corporate':
        return 'text-white uppercase tracking-wider font-bold';
      default:
        return 'text-white';
    }
  };

  const ThemeIcon = getThemeIcon(theme);

  return (
    <>
      <Head title={title} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-bg-card)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius-md)',
            fontSize: '0.875rem',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-primary)',
              secondary: 'var(--color-bg-card)',
            },
          },
        }}
      />

      {/* Theme Selection Modal for First-Time Visitors */}
      <ThemeModal
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        onSelectTheme={changeTheme}
        currentTheme={theme}
      />

      <div
        className="min-h-screen transition-theme flex flex-col"
        style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
      >
        {/* Theme-specific background elements */}
        {theme === 'cyber' && (
          <>
            <div className="scanline"></div>
            <div className="grid-pattern fixed inset-0 pointer-events-none"></div>
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-[var(--color-primary)] font-mono text-xs opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `flicker ${Math.random() * 3 + 2}s infinite`,
                  }}
                >
                  {Math.random() > 0.5 ? '0' : '1'}
                </div>
              ))}
            </div>
          </>
        )}

        {theme === 'dark-corporate' && (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 50%)',
              opacity: 0.5,
            }}
          ></div>
        )}

        {/* Header/Navigation */}
        <header className={getNavbarClasses()}>
          <div className="container-custom">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-theme"
                      style={{
                        background: 'var(--gradient-primary)',
                        boxShadow: theme === 'cyber' ? 'var(--shadow-glow)' : 'none',
                      }}
                    >
                      <CommandLineIcon className="h-6 w-6 text-white" />
                    </div>
                    {theme === 'cyber' && (
                      <div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"
                        style={{ background: 'var(--gradient-primary)' }}
                      ></div>
                    )}
                  </div>
                  <div className="relative">
                    <span className={`text-xl font-bold transition-theme ${getLogoClasses()}`}>
                      Desainwebku
                    </span>
                    {theme === 'cyber' && (
                      <span
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      ></span>
                    )}
                    {theme === 'dark-corporate' && (
                      <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[var(--color-primary)]"></div>
                    )}
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex md:items-center md:space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative group px-4 py-2 rounded-lg transition-theme"
                    style={{
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                      <span className="group-hover:text-[var(--color-text-primary)] transition-theme">
                        {item.name}
                      </span>
                    </div>
                    {theme === 'startup' && (
                      <div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-3/4 transition-all duration-300"
                        style={{ background: 'var(--color-primary)' }}
                      ></div>
                    )}
                    {theme === 'dark-corporate' && (
                      <div className="absolute inset-0 border border-transparent group-hover:border-[var(--color-border-hover)] rounded-lg transition-all duration-300"></div>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Right section: Theme Dropdown + User Menu */}
              <div className="flex items-center space-x-3">
                {/* Theme Dropdown */}
                <div className="hidden md:block theme-dropdown">
                  <button
                    onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                    className="theme-dropdown-button"
                  >
                    <ThemeIcon className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-sm font-medium">{getThemeName(theme)}</span>
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-300 ${themeDropdownOpen ? 'rotate-180' : ''}`}
                      style={{ color: 'var(--color-text-secondary)' }}
                    />
                  </button>

                  {themeDropdownOpen && (
                    <div className="theme-dropdown-menu">
                      <div
                        className="px-4 py-2 border-b"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <p
                          className="text-xs font-medium uppercase tracking-wider"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          Pilih Tema
                        </p>
                      </div>

                      {/* cyber Theme Option */}
                      <button
                        onClick={() => changeTheme('cyber')}
                        className={`theme-option-item ${theme === 'cyber' ? 'active' : ''}`}
                      >
                        <div
                          className="theme-preview"
                          style={{
                            background: 'linear-gradient(135deg, #00ff41 0%, #00cccc 100%)',
                            boxShadow: theme === 'cyber' ? '0 0 10px rgba(0,255,65,0.5)' : 'none',
                          }}
                        ></div>
                        <div className="theme-info">
                          <p className="theme-name">Cyber</p>
                          <p className="theme-desc">Matrix-inspired, terminal aesthetic</p>
                        </div>
                        {theme === 'cyber' && (
                          <CheckCircleIcon
                            className="h-5 w-5 ml-2 flex-shrink-0"
                            style={{ color: 'var(--color-primary)' }}
                          />
                        )}
                      </button>

                      {/* startup Theme Option */}
                      <button
                        onClick={() => changeTheme('startup')}
                        className={`theme-option-item ${theme === 'startup' ? 'active' : ''}`}
                      >
                        <div
                          className="theme-preview"
                          style={{
                            background: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
                            boxShadow:
                              theme === 'startup' ? '0 0 10px rgba(37,99,235,0.3)' : 'none',
                          }}
                        ></div>
                        <div className="theme-info">
                          <p className="theme-name">startup</p>
                          <p className="theme-desc">Clean, modern, professional</p>
                        </div>
                        {theme === 'startup' && (
                          <CheckCircleIcon
                            className="h-5 w-5 ml-2 flex-shrink-0"
                            style={{ color: 'var(--color-primary)' }}
                          />
                        )}
                      </button>

                      {/* corporate Theme Option */}
                      <button
                        onClick={() => changeTheme('dark-corporate')}
                        className={`theme-option-item ${theme === 'dark-corporate' ? 'active' : ''}`}
                      >
                        <div
                          className="theme-preview"
                          style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                            boxShadow:
                              theme === 'dark-corporate' ? '0 0 10px rgba(59,130,246,0.5)' : 'none',
                          }}
                        ></div>
                        <div className="theme-info">
                          <p className="theme-name">corporate</p>
                          <p className="theme-desc">Dark, premium, enterprise</p>
                        </div>
                        {theme === 'dark-corporate' && (
                          <CheckCircleIcon
                            className="h-5 w-5 ml-2 flex-shrink-0"
                            style={{ color: 'var(--color-primary)' }}
                          />
                        )}
                      </button>

                      <div
                        className="px-4 py-2 border-t mt-2"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          Tema tersimpan otomatis
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu / Auth Buttons */}
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-3 p-2 rounded-lg transition-theme hover:bg-[var(--color-bg-card)]"
                    >
                      <div className="relative">
                        <div
                          className="w-10 h-10 rounded-full p-0.5"
                          style={{ background: 'var(--gradient-primary)' }}
                        >
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'var(--color-bg-card)' }}
                          >
                            <UserCircleIcon
                              className="h-6 w-6"
                              style={{ color: 'var(--color-primary)' }}
                            />
                          </div>
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--color-bg-card)]"></div>
                      </div>
                      <div className="hidden lg:block text-left">
                        <p
                          className="text-sm font-medium"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {user.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-primary)' }}>
                          {user.roles && user.roles.length > 0 ? user.roles[0] : 'User'}
                        </p>
                      </div>
                      <ChevronDownIcon
                        className={`h-5 w-5 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`}
                        style={{ color: 'var(--color-text-secondary)' }}
                      />
                    </button>

                    {userMenuOpen && (
                      <div
                        className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl py-2 z-50 transition-theme"
                        style={{
                          backgroundColor: 'var(--color-bg-card)',
                          borderColor: 'var(--color-border)',
                          borderWidth: '1px',
                        }}
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 text-sm transition-theme hover:bg-[var(--color-bg-secondary)]"
                          style={{ color: 'var(--color-text-secondary)' }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                          >
                            <Squares2X2Icon
                              className="h-5 w-5"
                              style={{ color: 'var(--color-primary)' }}
                            />
                          </div>
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 px-4 py-3 text-sm transition-theme hover:bg-[var(--color-bg-secondary)]"
                          style={{ color: 'var(--color-text-secondary)' }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                          >
                            <UserCircleIcon
                              className="h-5 w-5"
                              style={{ color: 'var(--color-primary)' }}
                            />
                          </div>
                          <span>Profil</span>
                        </Link>
                        {user.roles && user.roles.includes('admin') && (
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center space-x-3 px-4 py-3 text-sm transition-theme hover:bg-[var(--color-bg-secondary)]"
                            style={{ color: 'var(--color-text-secondary)' }}
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                            >
                              <ChartBarSquareIcon
                                className="h-5 w-5"
                                style={{ color: 'var(--color-primary)' }}
                              />
                            </div>
                            <span>Panel Admin</span>
                          </Link>
                        )}
                        <div
                          className="border-t my-2"
                          style={{ borderColor: 'var(--color-border)' }}
                        ></div>
                        <Link
                          href="/logout"
                          method="post"
                          as="button"
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-400 transition-theme hover:bg-[var(--color-bg-secondary)]"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                          >
                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                          </div>
                          <span>Keluar</span>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/login"
                      className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                      <span>Log In</span>
                    </Link>
                    <Link href="/register" className="btn-primary btn-sm">
                      <span className="flex items-center space-x-2">
                        <UserPlusIcon className="h-5 w-5" />
                        <span>Register</span>
                      </span>
                    </Link>
                  </div>
                )}

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg transition-colors hover:bg-[var(--color-bg-card)]"
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" style={{ color: 'var(--color-text-primary)' }} />
                  ) : (
                    <Bars3Icon className="h-6 w-6" style={{ color: 'var(--color-text-primary)' }} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden border-t transition-theme"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="container-custom py-4 space-y-1">
                {/* Mobile Theme Switcher - Simplified */}
                <div
                  className="mb-6 p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                >
                  <p
                    className="text-xs font-medium uppercase tracking-wider mb-3"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Pilih Tema
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        changeTheme('cyber');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex-1 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                        theme === 'cyber' ? 'active' : ''
                      }`}
                      style={
                        theme === 'cyber'
                          ? {
                              backgroundColor: 'var(--color-primary)',
                              color: 'var(--color-bg-primary)',
                            }
                          : {
                              color: 'var(--color-text-secondary)',
                            }
                      }
                    >
                      cyber
                    </button>
                    <button
                      onClick={() => {
                        changeTheme('startup');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex-1 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                        theme === 'startup' ? 'active' : ''
                      }`}
                      style={
                        theme === 'startup'
                          ? {
                              backgroundColor: 'var(--color-primary)',
                              color: 'var(--color-bg-primary)',
                            }
                          : {
                              color: 'var(--color-text-secondary)',
                            }
                      }
                    >
                      startup
                    </button>
                    <button
                      onClick={() => {
                        changeTheme('dark-corporate');
                        setMobileMenuOpen(false);
                      }}
                      className={`flex-1 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                        theme === 'dark-corporate' ? 'active' : ''
                      }`}
                      style={
                        theme === 'dark-corporate'
                          ? {
                              backgroundColor: 'var(--color-primary)',
                              color: 'var(--color-bg-primary)',
                            }
                          : {
                              color: 'var(--color-text-secondary)',
                            }
                      }
                    >
                      corporate
                    </button>
                  </div>
                </div>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:bg-[var(--color-bg-secondary)]"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                    >
                      <item.icon className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                {!user && (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 hover:bg-[var(--color-bg-secondary)]"
                      style={{ color: 'var(--color-text-secondary)' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                      >
                        <ArrowLeftOnRectangleIcon
                          className="h-5 w-5"
                          style={{ color: 'var(--color-primary)' }}
                        />
                      </div>
                      <span className="font-medium">Log In</span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300"
                      style={{
                        background: 'var(--gradient-primary)',
                        color: 'white',
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="p-2 rounded-lg bg-white/20">
                        <UserPlusIcon className="h-5 w-5" />
                      </div>
                      <span className="font-medium">Register</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-grow pt-16 md:pt-20">{children}</main>

        {/* Footer */}
        <footer
          className="relative border-t mt-auto transition-theme"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="container-custom py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <CommandLineIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-xl font-bold ${getLogoClasses()}`}>Desainwebku</span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {theme === 'cyber' &&
                    'Developer independen spesialis pembuatan website profesional. Kualitas enterprise, harga personal, komunikasi langsung tanpa birokrasi.'}
                  {theme === 'startup' &&
                    'Jasa pembuatan website profesional oleh developer independen. Hasil berkualitas perusahaan dengan harga personal dan proses cepat.'}
                  {theme === 'dark-corporate' &&
                    'Strategic digital solutions for forward-thinking enterprises. Expert development, corporate service, measurable results.'}
                </p>
                <div className="flex space-x-4">{/* Social links could go here */}</div>
              </div>

              {/* Services Column */}
              <div>
                <h3
                  className="text-lg font-semibold mb-6 flex items-center"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <CpuChipIcon className="h-5 w-5 mr-2" style={{ color: 'var(--color-primary)' }} />
                  Layanan
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/layanan"
                      className="text-sm transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Website Company Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/layanan"
                      className="text-sm transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Website E-commerce
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/layanan"
                      className="text-sm transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Web Application
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/layanan"
                      className="text-sm transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Optimasi SEO
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Information Column */}
              <div>
                <h3
                  className="text-lg font-semibold mb-6 flex items-center"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <CodeBracketIcon
                    className="h-5 w-5 mr-2"
                    style={{ color: 'var(--color-primary)' }}
                  />
                  Informasi
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/tentang"
                      className="text-sm transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Tentang Saya
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portofolio"
                      className="text-sm transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Portofolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Blog & Tips
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-sm transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h3
                  className="text-lg font-semibold mb-6 flex items-center"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <ChatBubbleLeftRightIcon
                    className="h-5 w-5 mr-2"
                    style={{ color: 'var(--color-primary)' }}
                  />
                  Hubungi Saya
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <PhoneIcon
                      className="h-5 w-5 mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--color-primary)' }}
                    />
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      +62 812-3456-7890
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <EnvelopeIcon
                      className="h-5 w-5 mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--color-primary)' }}
                    />
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      hello@desainwebku.com
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPinIcon
                      className="h-5 w-5 mt-0.5 flex-shrink-0"
                      style={{ color: 'var(--color-primary)' }}
                    />
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      Jakarta, Indonesia
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t mt-12 pt-8" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm mb-4 md:mb-0" style={{ color: 'var(--color-text-muted)' }}>
                  &copy; {new Date().getFullYear()} Desainwebku.
                  {theme === 'cyber' && ' All systems operational.'}
                  {theme === 'startup' && ' All rights reserved.'}
                  {theme === 'dark-corporate' && ' Strategic digital solutions.'}
                </p>
                <div className="flex items-center space-x-6">
                  <Link
                    href="/privacy"
                    className="text-xs hover:text-[var(--color-primary)] transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Kebijakan Privasi
                  </Link>
                  <Link
                    href="/terms"
                    className="text-xs hover:text-[var(--color-primary)] transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Syarat & Ketentuan
                  </Link>
                  {theme === 'cyber' && (
                    <span
                      className="flex items-center text-xs"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <span
                        className="w-2 h-2 rounded-full mr-2 animate-pulse"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      ></span>
                      Siap Menerima Proyek
                    </span>
                  )}
                  {theme === 'dark-corporate' && (
                    <span
                      className="text-xs uppercase tracking-wider"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      TRUSTED ENTERPRISE PARTNER
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
