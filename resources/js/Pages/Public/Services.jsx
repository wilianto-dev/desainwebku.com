import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  CheckCircleIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  BoltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  ListBulletIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ShoppingCartIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  PaintBrushIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';

export default function Services({ services, packages }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [theme, setTheme] = useState('cyber');

  // Get current theme from localStorage
  useEffect(() => {
    const currentTheme = localStorage.getItem('desainwebku-theme') || 'cyber';
    setTheme(currentTheme);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Filter services
  const filteredServices = services?.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.short_description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  }) || [];

  // Get icon component based on service icon class
  const getServiceIcon = (iconClass) => {
    const iconMap = {
      'fas fa-building': BriefcaseIcon,
      'fas fa-shopping-cart': ShoppingCartIcon,
      'fas fa-laptop-code': CodeBracketIcon,
      'fas fa-mobile-alt': DevicePhoneMobileIcon,
      'fas fa-paint-brush': PaintBrushIcon,
      'fas fa-tools': WrenchScrewdriverIcon,
      'fas fa-code': CodeBracketIcon,
      'fas fa-server': ServerIcon,
    };
    return iconMap[iconClass] || CodeBracketIcon;
  };

  // Get theme-specific hero content
  const getHeroContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          badge: 'SYSTEM: SERVICES',
          badgeIcon: CommandLineIcon,
          title: ['Layanan', 'Professional'],
          description: 'Akses ke berbagai solusi pengembangan website dengan standar enterprise.',
          status: 'OPERATIONAL',
        };
      case 'startup':
        return {
          badge: 'SERVICES CATALOG',
          badgeIcon: SparklesIcon,
          title: ['Digital', 'Solutions'],
          description: 'Comprehensive web development services tailored for modern businesses.',
          status: 'READY',
        };
      case 'dark-corporate':
        return {
          badge: 'ENTERPRISE SERVICES',
          badgeIcon: ShieldCheckIcon,
          title: ['Strategic', 'Solutions'],
          description: 'Corporate-grade development services for forward-thinking organizations.',
          status: 'ACTIVE',
        };
      default:
        return {
          badge: 'LAYANAN KAMI',
          badgeIcon: BoltIcon,
          title: ['Layanan', 'Professional'],
          description: 'Solusi pengembangan website untuk bisnis Anda.',
          status: 'ACTIVE',
        };
    }
  };

  const hero = getHeroContent();
  const BadgeIcon = hero.badgeIcon;

  return (
    <AppLayout title="Layanan - Desainwebku">
      <Head title="Layanan" />

      {/* Hero Section - Theme Specific */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden transition-theme">
        {/* Theme-specific hero backgrounds */}
        {theme === 'cyber' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)] via-black to-[var(--color-bg-primary)]"></div>
            <div className="grid-pattern absolute inset-0 opacity-20"></div>
          </>
        )}

        {theme === 'startup' && (
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl"></div>
          </div>
        )}

        {theme === 'dark-corporate' && (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 70% 30%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(34,211,238,0.05) 0%, transparent 50%)',
            }}
          ></div>
        )}

        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center px-4 py-2 rounded-full border mb-6 animate-fade-in-up"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-bg-card)',
              }}
            >
              <BadgeIcon className="h-5 w-5 mr-2" />
              <span
                className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
              >
                {hero.badge}
              </span>
              {theme === 'cyber' && (
                <span
                  className="w-2 h-2 rounded-full ml-2 animate-pulse"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                ></span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-200">
              <span className="text-gradient">{hero.title[0]}</span>
              <br />
              <span style={{ color: 'var(--color-text-primary)' }}>{hero.title[1]}</span>
            </h1>

            {/* Description */}
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-400"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {hero.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mt-8 animate-fade-in-up animation-delay-600">
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {services?.length || 0}+
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {theme === 'cyber' ? 'SERVICES' : theme === 'dark-corporate' ? 'SOLUTIONS' : 'Layanan'}
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {packages?.length || 0}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {theme === 'cyber' ? 'PACKAGES' : theme === 'dark-corporate' ? 'STRATEGIES' : 'Paket'}
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary)' }}
                >
                  24/7
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {theme === 'cyber' ? 'SUPPORT' : theme === 'dark-corporate' ? 'ASSISTANCE' : 'Support'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section
        className="sticky top-16 md:top-20 z-40 py-4 border-y transition-theme"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search and View Toggle */}
            <div className="flex items-center gap-3">
              {/* Search Input */}
              <div className="relative flex-grow lg:flex-grow-0 lg:w-80">
                <MagnifyingGlassIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                  style={{ color: 'var(--color-text-muted)' }}
                />
                <input
                  type="text"
                  placeholder={
                    theme === 'cyber'
                      ? '$ SEARCH_SERVICES...'
                      : theme === 'dark-corporate'
                        ? 'SEARCH SOLUTIONS...'
                        : 'Cari layanan...'
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg transition-theme focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-primary)',
                    borderWidth: '1px',
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* View Toggle - Desktop */}
              <div className="hidden md:flex items-center space-x-1 p-1 rounded-lg border transition-theme"
                style={{ 
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className="p-2 rounded-md transition-theme"
                  style={{
                    backgroundColor: viewMode === 'grid' ? 'var(--color-primary)' : 'transparent',
                    color: viewMode === 'grid' 
                      ? 'var(--color-bg-primary)' 
                      : 'var(--color-text-muted)',
                  }}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className="p-2 rounded-md transition-theme"
                  style={{
                    backgroundColor: viewMode === 'list' ? 'var(--color-primary)' : 'transparent',
                    color: viewMode === 'list' 
                      ? 'var(--color-bg-primary)' 
                      : 'var(--color-text-muted)',
                  }}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Filter Button */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-theme"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border)',
                  borderWidth: '1px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                <span className="text-sm font-medium hidden sm:inline">Filter</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-300 ${
                    filterOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Reset Filter */}
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-theme"
                  style={{
                    color: 'var(--color-text-muted)',
                    borderColor: 'var(--color-border)',
                    borderWidth: '1px',
                  }}
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span className="text-sm hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-6">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-lg font-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {theme === 'cyber' && `$ FOUND ${filteredServices.length} SERVICES`}
                {theme === 'startup' && `${filteredServices.length} Services Available`}
                {theme === 'dark-corporate' && `${filteredServices.length} SOLUTIONS DEPLOYABLE`}
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {theme === 'cyber' && 'READY FOR IMMEDIATE DEPLOYMENT'}
                {theme === 'startup' && 'Ready to start your project'}
                {theme === 'dark-corporate' && 'Corporate-grade solutions'}
              </p>
            </div>
            
            {/* Mobile View Toggle */}
            <div className="md:hidden flex items-center space-x-1 p-1 rounded-lg border transition-theme"
              style={{ 
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)'
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                className="p-2 rounded-md transition-theme"
                style={{
                  backgroundColor: viewMode === 'grid' ? 'var(--color-primary)' : 'transparent',
                  color: viewMode === 'grid' 
                    ? 'var(--color-bg-primary)' 
                    : 'var(--color-text-muted)',
                }}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className="p-2 rounded-md transition-theme"
                style={{
                  backgroundColor: viewMode === 'list' ? 'var(--color-primary)' : 'transparent',
                  color: viewMode === 'list' 
                    ? 'var(--color-bg-primary)' 
                    : 'var(--color-text-muted)',
                }}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid/List View */}
      <section className="pb-20">
        <div className="container-custom">
          {filteredServices.length === 0 ? (
            <div
              className="text-center py-20 rounded-2xl border transition-theme"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="mb-4" style={{ color: 'var(--color-text-muted)' }}>
                <MagnifyingGlassIcon className="h-20 w-20 mx-auto" />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {theme === 'cyber' ? 'NO SERVICES FOUND' : theme === 'dark-corporate' ? 'NO MATCHING SOLUTIONS' : 'Layanan Tidak Ditemukan'}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                {theme === 'cyber' ? 'TRY ADJUSTING YOUR SEARCH PARAMETERS' : 'Coba ubah kata kunci pencarian'}
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn-primary"
              >
                {theme === 'cyber' ? '$ RESET_FILTERS' : theme === 'dark-corporate' ? 'CLEAR PARAMETERS' : 'Reset Pencarian'}
              </button>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service, index) => {
                    const IconComponent = getServiceIcon(service.icon);
                    return (
                      <div
                        key={service.id}
                        className={`group transition-all duration-500 animate-fade-in-up ${
                          theme === 'cyber'
                            ? 'card-cyber'
                            : theme === 'startup'
                              ? 'card-startup'
                              : 'card-corporate'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div
                              className="w-12 h-12 rounded-lg flex items-center justify-center"
                              style={{ background: 'var(--gradient-primary)' }}
                            >
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            {service.is_featured && (
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  theme === 'cyber'
                                    ? 'font-mono border'
                                    : theme === 'dark-corporate'
                                      ? 'uppercase tracking-wider'
                                      : ''
                                }`}
                                style={{
                                  color: 'var(--color-primary)',
                                  borderColor: 'var(--color-primary)',
                                }}
                              >
                                {theme === 'cyber' ? 'FEATURED' : 'Featured'}
                              </span>
                            )}
                          </div>

                          <h3
                            className={`font-bold mb-3 ${
                              theme === 'cyber'
                                ? 'font-mono text-lg'
                                : theme === 'dark-corporate'
                                  ? 'uppercase tracking-wider text-base'
                                  : 'text-xl'
                            }`}
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {service.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="text-sm mb-4 line-clamp-3 leading-relaxed"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            {service.short_description || service.description}
                          </p>

                          {/* Packages Count */}
                          <div className="mb-4">
                            <span
                              className="text-xs px-2 py-1 rounded"
                              style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-text-muted)',
                              }}
                            >
                              {packages?.filter(p => p.service?.id === service.id).length || 0} Paket Tersedia
                            </span>
                          </div>

                          {/* Action */}
                          <div
                            className="pt-4 border-t"
                            style={{ borderColor: 'var(--color-border)' }}
                          >
                            <div className="flex items-center justify-between">
                              <Link
                                href={`/layanan/${service.slug}`}
                                className={`inline-flex items-center text-sm font-medium transition-all duration-300 group ${
                                  theme === 'cyber'
                                    ? 'font-mono hover:text-[var(--color-primary)]'
                                    : theme === 'dark-corporate'
                                      ? 'uppercase tracking-wider text-xs hover:text-[var(--color-primary)]'
                                      : 'hover:text-[var(--color-primary)]'
                                }`}
                                style={{ color: 'var(--color-primary)' }}
                              >
                                {theme === 'cyber' && '$ VIEW_PACKAGES'}
                                {theme === 'startup' && 'View Packages'}
                                {theme === 'dark-corporate' && 'VIEW SOLUTIONS'}
                                <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="space-y-4">
                  {filteredServices.map((service, index) => {
                    const IconComponent = getServiceIcon(service.icon);
                    const servicePackages = packages?.filter(p => p.service?.id === service.id) || [];
                    
                    return (
                      <div
                        key={service.id}
                        className={`group transition-all duration-500 animate-fade-in-up ${
                          theme === 'cyber'
                            ? 'card-cyber'
                            : theme === 'startup'
                              ? 'card-startup'
                              : 'card-corporate'
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            {/* Left Column - Main Info */}
                            <div className="flex-1">
                              <div className="flex items-start mb-4">
                                <div
                                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                                  style={{ background: 'var(--gradient-primary)' }}
                                >
                                  <IconComponent className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h3
                                    className={`font-bold ${
                                      theme === 'cyber'
                                        ? 'font-mono text-xl'
                                        : theme === 'dark-corporate'
                                          ? 'uppercase tracking-wider text-lg'
                                          : 'text-2xl'
                                    }`}
                                    style={{ color: 'var(--color-text-primary)' }}
                                  >
                                    {service.title}
                                  </h3>
                                  {service.is_featured && (
                                    <span
                                      className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${
                                        theme === 'cyber'
                                          ? 'font-mono border'
                                          : ''
                                      }`}
                                      style={{
                                        color: 'var(--color-primary)',
                                        borderColor: 'var(--color-primary)',
                                      }}
                                    >
                                      {theme === 'cyber' ? 'FEATURED' : 'Featured'}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <p
                                className="text-sm mb-4 leading-relaxed max-w-3xl"
                                style={{ color: 'var(--color-text-secondary)' }}
                              >
                                {service.description}
                              </p>

                              {/* Packages Preview */}
                              {servicePackages.length > 0 && (
                                <div className="mt-4">
                                  <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                    Paket tersedia:
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {servicePackages.slice(0, 3).map(pkg => (
                                      <span
                                        key={pkg.id}
                                        className="text-xs px-2 py-1 rounded"
                                        style={{
                                          backgroundColor: 'var(--color-bg-secondary)',
                                          color: 'var(--color-text-secondary)',
                                        }}
                                      >
                                        {pkg.name}
                                      </span>
                                    ))}
                                    {servicePackages.length > 3 && (
                                      <span
                                        className="text-xs px-2 py-1 rounded"
                                        style={{
                                          backgroundColor: 'var(--color-bg-secondary)',
                                          color: 'var(--color-primary)',
                                        }}
                                      >
                                        +{servicePackages.length - 3} lainnya
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Right Column - Action */}
                            <div className="lg:w-48 flex flex-col items-stretch justify-center gap-3">
                              <Link
                                href={`/layanan/${service.slug}`}
                                className="btn-primary text-center"
                              >
                                {theme === 'cyber' ? 'VIEW PACKAGES' : 'Lihat Paket'}
                              </Link>
                              <Link
                                href="/kontak"
                                className="btn-secondary text-center"
                              >
                                Konsultasi
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Packages Section */}
      {packages && packages.length > 0 && (
        <section
          className="py-20 border-t transition-theme"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
              >
                {theme === 'cyber' && <BoltIcon className="h-5 w-5 mr-2" />}
                {theme === 'startup' && <SparklesIcon className="h-5 w-5 mr-2" />}
                {theme === 'dark-corporate' && <ShieldCheckIcon className="h-5 w-5 mr-2" />}
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {theme === 'cyber' ? 'POPULAR PACKAGES' : theme === 'dark-corporate' ? 'STRATEGIC PACKAGES' : 'Paket Populer'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Pilih Paket <span className="text-gradient">Sesuai Kebutuhan</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {packages.slice(0, 3).map((pkg, index) => {
                const features = pkg.features || [];
                
                const formatPrice = (price) => {
                  return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(price);
                };

                return (
                  <div
                    key={pkg.id}
                    className={`group relative transition-all duration-500 animate-fade-in-up ${
                      theme === 'cyber'
                        ? 'card-cyber p-6'
                        : theme === 'startup'
                          ? 'bg-white rounded-xl p-8 shadow-md hover:shadow-xl'
                          : 'card-corporate p-8'
                    } ${
                      pkg.is_popular
                        ? theme === 'startup'
                          ? 'border-2 border-[var(--color-primary)] shadow-lg scale-105 lg:scale-105'
                          : theme === 'dark-corporate'
                            ? 'border-2 border-[var(--color-primary)]'
                            : 'border-2 border-[var(--color-primary)] shadow-[var(--shadow-glow)]'
                        : ''
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {pkg.is_popular && (
                      <div
                        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap ${
                          theme === 'startup'
                            ? 'bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-full text-xs font-bold'
                            : theme === 'dark-corporate'
                              ? 'px-4 py-1.5 text-xs uppercase tracking-wider'
                              : 'px-4 py-1.5 bg-[var(--color-primary)] text-black text-xs font-mono rounded-full'
                        }`}
                        style={
                          theme === 'dark-corporate'
                            ? {
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-bg-primary)',
                              }
                            : {}
                        }
                      >
                        {theme === 'cyber' && 'RECOMMENDED'}
                        {theme === 'startup' && 'MOST POPULAR'}
                        {theme === 'dark-corporate' && 'STRATEGIC CHOICE'}
                      </div>
                    )}

                    {/* Package Header */}
                    <div className="text-center mb-6">
                      <h3
                        className={`text-xl md:text-2xl font-bold mb-3 ${
                          theme === 'cyber'
                            ? 'font-mono'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider'
                              : ''
                        }`}
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {pkg.name}
                      </h3>
                      <div className="flex items-center justify-center mb-3">
                        <span
                          className="text-3xl md:text-4xl font-bold"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {formatPrice(pkg.price)}
                        </span>
                        <span
                          className="ml-2 text-sm"
                          style={{ color: 'var(--color-text-muted)' }}
                        >
                          /proyek
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {pkg.short_description || pkg.description}
                      </p>
                      {pkg.service && (
                        <p
                          className="text-xs mt-2"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {pkg.service.title}
                        </p>
                      )}
                    </div>

                    {/* Features List */}
                    {features.length > 0 && (
                      <div className="space-y-3 mb-8">
                        {features.slice(0, 5).map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircleIcon
                              className="h-5 w-5 mr-3 flex-shrink-0"
                              style={{ color: 'var(--color-primary)' }}
                            />
                            <span
                              className="text-sm leading-relaxed"
                              style={{ color: 'var(--color-text-secondary)' }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link
                      href={`/paket/${pkg.slug}`}
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                        pkg.is_popular
                          ? 'btn-primary'
                          : theme === 'startup'
                            ? 'border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                            : 'btn-secondary'
                      }`}
                    >
                      {theme === 'cyber' ? '$ VIEW_PACKAGE' : 'Lihat Paket'}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="py-20 relative overflow-hidden transition-theme"
        style={{
          background: theme === 'cyber'
            ? 'linear-gradient(to right, rgba(0,255,65,0.1), rgba(0,255,255,0.1))'
            : theme === 'startup'
              ? 'linear-gradient(to right, var(--color-primary)10, var(--color-accent)10)'
              : 'radial-gradient(circle at 30% 50%, rgba(59,130,246,0.15), rgba(34,211,238,0.05))',
        }}
      >
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Butuh Layanan <span className="text-gradient">Khusus?</span>
            </h2>
            
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Konsultasikan kebutuhan spesifik Anda. Kami siap mendengarkan dan memberikan solusi terbaik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontak" className="btn-primary btn-lg group">
                <span className="flex items-center">
                  Konsultasi Gratis
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}