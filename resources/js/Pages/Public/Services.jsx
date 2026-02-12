import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  CheckCircleIcon,
  FunnelIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  ArrowRightIcon,
  BoltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

export default function Services({ services, packages }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
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

  // Helper function to parse features
  const parseFeatures = (features) => {
    if (!features) return [];
    try {
      if (Array.isArray(features)) return features;
      if (typeof features === 'string') {
        const parsed = JSON.parse(features);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error('Error parsing features:', error);
      return [];
    }
  };

  // Format price to IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Extract unique categories from services
  const categories = ['all', ...new Set(services?.map((s) => s.category || 'Uncategorized') || [])];

  // Filter services
  const filteredServices =
    services?.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || (service.category || 'Uncategorized') === selectedCategory;
      const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    }) || [];

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
        return {};
    }
  };

  const hero = getHeroContent();
  const BadgeIcon = hero.badgeIcon;

  // Price range marks
  const priceMarks = [
    { value: 0, label: '0' },
    { value: 5000000, label: '5jt' },
    { value: 10000000, label: '10jt' },
  ];

  return (
    <AppLayout title="Layanan - Desainwebku">
      {/* Hero Section - Theme Specific */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden transition-theme">
        {/* Theme-specific hero backgrounds */}
        {theme === 'cyber' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)] via-black to-[var(--color-bg-primary)]"></div>
            <div className="grid-pattern absolute inset-0 opacity-20"></div>
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-[var(--color-primary)] font-mono text-xs opacity-10"
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
                  {theme === 'cyber' && 'SERVICES'}
                  {theme === 'startup' && 'Services'}
                  {theme === 'dark-corporate' && 'SOLUTIONS'}
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
                  {theme === 'cyber' && 'PACKAGES'}
                  {theme === 'startup' && 'Packages'}
                  {theme === 'dark-corporate' && 'STRATEGIES'}
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
                  {theme === 'cyber' && 'SUPPORT'}
                  {theme === 'startup' && 'Support'}
                  {theme === 'dark-corporate' && 'ASSISTANCE'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section - Theme Specific */}
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
                        : 'Search services...'
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg transition-theme focus:outline-none focus:ring-2"
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
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      theme === 'cyber' ? 'font-mono' : ''
                    }`}
                    style={{
                      backgroundColor:
                        selectedCategory === category
                          ? 'var(--color-primary)'
                          : 'var(--color-bg-card)',
                      color:
                        selectedCategory === category
                          ? 'var(--color-bg-primary)'
                          : 'var(--color-text-secondary)',
                      borderWidth: '1px',
                      borderColor: selectedCategory === category 
                        ? 'var(--color-primary)' 
                        : 'var(--color-border)',
                    }}
                  >
                    {category === 'all' 
                      ? theme === 'cyber' 
                        ? 'ALL' 
                        : theme === 'dark-corporate' 
                          ? 'ALL' 
                          : 'Semua'
                      : category}
                  </button>
                ))}
              </div>

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
              {(searchTerm || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 10000000) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange([0, 10000000]);
                  }}
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

          {/* Advanced Filter Panel */}
          {filterOpen && (
            <div
              className="mt-4 p-6 rounded-lg border transition-theme animate-slide-up"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="space-y-4">
                {/* Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {theme === 'cyber' ? 'PRICE RANGE (IDR)' : 'Rentang Harga'}
                    </span>
                    <span
                      className="text-sm px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                      style={{
                        accentColor: 'var(--color-primary)',
                      }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                      style={{
                        accentColor: 'var(--color-primary)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    {priceMarks.map((mark) => (
                      <span
                        key={mark.value}
                        className="text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {mark.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* All Categories */}
                {categories.length > 4 && (
                  <div>
                    <span
                      className="text-sm font-medium block mb-3"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {theme === 'cyber' ? 'ALL CATEGORIES' : 'Semua Kategori'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(4).map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className="px-3 py-1.5 rounded-lg text-xs transition-theme"
                          style={{
                            backgroundColor:
                              selectedCategory === category
                                ? 'var(--color-primary)'
                                : 'var(--color-bg-secondary)',
                            color:
                              selectedCategory === category
                                ? 'var(--color-bg-primary)'
                                : 'var(--color-text-secondary)',
                          }}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
                {theme === 'cyber' && 'NO SERVICES FOUND'}
                {theme === 'startup' && 'No Services Found'}
                {theme === 'dark-corporate' && 'NO MATCHING SOLUTIONS'}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                {theme === 'cyber' && 'TRY ADJUSTING YOUR SEARCH PARAMETERS'}
                {theme === 'startup' && 'Try adjusting your search or filters'}
                {theme === 'dark-corporate' && 'Adjust search criteria for results'}
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange([0, 10000000]);
                }}
                className="btn-primary"
              >
                {theme === 'cyber' && '$ RESET_FILTERS'}
                {theme === 'startup' && 'Reset Filters'}
                {theme === 'dark-corporate' && 'CLEAR PARAMETERS'}
              </button>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service, index) => {
                    const features = parseFeatures(service.features);
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
                            <h3
                              className={`font-bold ${
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
                                  backgroundColor: theme === 'startup' ? 'var(--color-primary)' : 'transparent',
                                  color: theme === 'startup' ? 'white' : 'var(--color-primary)',
                                  borderColor: 'var(--color-primary)',
                                }}
                              >
                                {theme === 'cyber' && 'FEATURED'}
                                {theme === 'startup' && 'Featured'}
                                {theme === 'dark-corporate' && 'STRATEGIC'}
                              </span>
                            )}
                          </div>

                          {/* Category Badge */}
                          <div className="mb-4">
                            <span
                              className="text-xs px-2 py-1 rounded"
                              style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-text-muted)',
                              }}
                            >
                              {service.category || (theme === 'cyber' ? 'UNCATEGORIZED' : 'Uncategorized')}
                            </span>
                          </div>

                          {/* Description */}
                          <p
                            className="text-sm mb-4 line-clamp-2 leading-relaxed"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            {service.description}
                          </p>

                          {/* Features */}
                          {features.length > 0 && (
                            <div className="mb-6 space-y-2">
                              {features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-start">
                                  <CheckCircleIcon
                                    className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5"
                                    style={{ color: 'var(--color-primary)' }}
                                  />
                                  <span
                                    className="text-xs"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                  >
                                    {feature}
                                  </span>
                                </div>
                              ))}
                              {features.length > 3 && (
                                <span
                                  className="text-xs"
                                  style={{ color: 'var(--color-primary)' }}
                                >
                                  +{features.length - 3} more features
                                </span>
                              )}
                            </div>
                          )}

                          {/* Price and Actions */}
                          <div
                            className="pt-4 border-t"
                            style={{ borderColor: 'var(--color-border)' }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p
                                  className="text-2xl font-bold"
                                  style={{ color: 'var(--color-primary)' }}
                                >
                                  {formatPrice(service.price)}
                                </p>
                                <p
                                  className="text-xs flex items-center mt-1"
                                  style={{ color: 'var(--color-text-muted)' }}
                                >
                                  <ClockIcon className="h-3 w-3 mr-1" />
                                  {service.duration} {theme === 'cyber' ? 'DAYS' : 'hari'}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Link
                                  href={`/layanan/${service.slug}`}
                                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    theme === 'cyber'
                                      ? 'border hover:border-[var(--color-primary)]'
                                      : theme === 'startup'
                                        ? 'text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10'
                                        : 'btn-secondary'
                                  }`}
                                  style={{
                                    backgroundColor: theme === 'startup' ? 'transparent' : undefined,
                                    borderColor: 'var(--color-border)',
                                  }}
                                >
                                  {theme === 'cyber' && '$ DETAILS'}
                                  {theme === 'startup' && 'Details'}
                                  {theme === 'dark-corporate' && 'ANALYZE'}
                                </Link>
                                <Link
                                  href={route('order.service', service.id)}
                                  className="btn-primary px-4 py-2 text-sm"
                                >
                                  {theme === 'cyber' && 'ORDER'}
                                  {theme === 'startup' && 'Order'}
                                  {theme === 'dark-corporate' && 'DEPLOY'}
                                </Link>
                              </div>
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
                    const features = parseFeatures(service.features);
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
                              <div className="flex items-start justify-between mb-2">
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
                                    className={`ml-4 px-3 py-1 text-xs rounded ${
                                      theme === 'cyber'
                                        ? 'font-mono border'
                                        : theme === 'dark-corporate'
                                          ? 'uppercase tracking-wider'
                                          : ''
                                    }`}
                                    style={{
                                      backgroundColor: theme === 'startup' ? 'var(--color-primary)' : 'transparent',
                                      color: theme === 'startup' ? 'white' : 'var(--color-primary)',
                                      borderColor: 'var(--color-primary)',
                                    }}
                                  >
                                    {theme === 'cyber' && 'FEATURED'}
                                    {theme === 'startup' && 'Featured'}
                                    {theme === 'dark-corporate' && 'STRATEGIC'}
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-2 mb-4">
                                <span
                                  className="text-xs px-3 py-1.5 rounded"
                                  style={{
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    color: 'var(--color-text-muted)',
                                  }}
                                >
                                  {service.category || (theme === 'cyber' ? 'UNCATEGORIZED' : 'Uncategorized')}
                                </span>
                                <span
                                  className="text-xs px-3 py-1.5 rounded flex items-center"
                                  style={{
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    color: 'var(--color-text-muted)',
                                  }}
                                >
                                  <ClockIcon className="h-3 w-3 mr-1" />
                                  {service.duration} {theme === 'cyber' ? 'DAYS' : 'hari'}
                                </span>
                              </div>

                              <p
                                className="text-sm mb-4 leading-relaxed max-w-3xl"
                                style={{ color: 'var(--color-text-secondary)' }}
                              >
                                {service.description}
                              </p>

                              {features.length > 0 && (
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                  {features.slice(0, 4).map((feature, idx) => (
                                    <div key={idx} className="flex items-center">
                                      <CheckCircleIcon
                                        className="h-4 w-4 mr-2 flex-shrink-0"
                                        style={{ color: 'var(--color-primary)' }}
                                      />
                                      <span
                                        className="text-xs"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                      >
                                        {feature}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Right Column - Price & Actions */}
                            <div className="lg:w-64 flex flex-row lg:flex-col items-center lg:items-stretch justify-between lg:justify-center gap-4 lg:gap-6">
                              <div className="text-center lg:text-left">
                                <p
                                  className="text-3xl font-bold"
                                  style={{ color: 'var(--color-primary)' }}
                                >
                                  {formatPrice(service.price)}
                                </p>
                                <p
                                  className="text-xs mt-1"
                                  style={{ color: 'var(--color-text-muted)' }}
                                >
                                  {theme === 'cyber' && 'ONE-TIME PAYMENT'}
                                  {theme === 'startup' && 'One-time payment'}
                                  {theme === 'dark-corporate' && 'SINGLE DEPLOYMENT'}
                                </p>
                              </div>
                              
                              <div className="flex flex-row lg:flex-col gap-2">
                                <Link
                                  href={`/layanan/${service.slug}`}
                                  className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 text-center ${
                                    theme === 'cyber'
                                      ? 'border hover:border-[var(--color-primary)]'
                                      : theme === 'startup'
                                        ? 'border border-gray-300 hover:border-[var(--color-primary)]'
                                        : 'btn-secondary'
                                  }`}
                                  style={{
                                    color: 'var(--color-text-secondary)',
                                    borderColor: 'var(--color-border)',
                                  }}
                                >
                                  {theme === 'cyber' && 'VIEW DETAILS'}
                                  {theme === 'startup' && 'Details'}
                                  {theme === 'dark-corporate' && 'SPECIFICATIONS'}
                                </Link>
                                <Link
                                 href={route('order.service', service.id)}
                                  className="btn-primary px-6 py-2.5 text-sm text-center"
                                >
                                  {theme === 'cyber' && 'INITIATE ORDER'}
                                  {theme === 'startup' && 'Order Now'}
                                  {theme === 'dark-corporate' && 'DEPLOY SOLUTION'}
                                </Link>
                              </div>
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

      {/* Packages Section - Theme Specific */}
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
                {theme === 'cyber' && 'PACKAGE CONFIGURATIONS'}
                {theme === 'startup' && 'COMPLETE SOLUTIONS'}
                {theme === 'dark-corporate' && 'STRATEGIC PACKAGES'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {theme === 'cyber' && 'Paket '}
              {theme === 'startup' && 'Ready-to-Deploy '}
              {theme === 'dark-corporate' && 'Enterprise '}
              <span className="text-gradient">
                {theme === 'cyber' && 'Lengkap'}
                {theme === 'startup' && 'Solutions'}
                {theme === 'dark-corporate' && 'Strategies'}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packages?.map((pkg, index) => {
              const features = parseFeatures(pkg.features);
              const isPopular = pkg.is_popular;

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
                    isPopular
                      ? theme === 'startup'
                        ? 'border-2 border-[var(--color-primary)] shadow-lg scale-105 lg:scale-110'
                        : theme === 'dark-corporate'
                          ? 'border-2 border-[var(--color-primary)]'
                          : 'border-2 border-[var(--color-primary)] shadow-[var(--shadow-glow)]'
                      : ''
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Popular Badge */}
                  {isPopular && (
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
                        /{theme === 'cyber' ? 'PROJECT' : 'proyek'}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features List */}
                  {features.length > 0 && (
                    <div className="space-y-3 mb-8">
                      {features.map((feature, idx) => (
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
                    href={`/pesanan/paket/${pkg.id}`}
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isPopular
                        ? 'btn-primary'
                        : theme === 'startup'
                          ? 'border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                          : 'btn-secondary'
                    }`}
                    style={{
                      backgroundColor:
                        isPopular && theme === 'startup' ? 'var(--color-primary)' : undefined,
                      color: isPopular && theme === 'startup' ? 'white' : undefined,
                    }}
                  >
                    {theme === 'cyber' && '$ DEPLOY_PACKAGE'}
                    {theme === 'startup' && 'Select Package'}
                    {theme === 'dark-corporate' && 'IMPLEMENT STRATEGY'}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Theme Specific */}
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
        {/* Theme-specific decorations */}
        {theme === 'cyber' && (
          <>
            <div className="grid-pattern absolute inset-0 opacity-10"></div>
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-[var(--color-primary)] font-mono text-xs opacity-10"
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

        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {theme === 'cyber' && 'Butuh Layanan '}
              {theme === 'startup' && 'Need a '}
              {theme === 'dark-corporate' && 'Require '}
              <span className="text-gradient">
                {theme === 'cyber' && 'Khusus?'}
                {theme === 'startup' && 'Custom Solution?'}
                {theme === 'dark-corporate' && 'Tailored Strategy?'}
              </span>
            </h2>
            
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {theme === 'cyber' &&
                'Konsultasikan kebutuhan spesifik Anda. Saya siap mendengarkan dan memberikan solusi terbaik.'}
              {theme === 'startup' &&
                'Tell us about your specific requirements. We\'ll create a custom solution just for you.'}
              {theme === 'dark-corporate' &&
                'Discuss your enterprise requirements with our strategic team. Custom solutions for unique challenges.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontak" className="btn-primary btn-lg group">
                <span className="flex items-center">
                  {theme === 'cyber' && 'Konsultasi Gratis'}
                  {theme === 'startup' && 'Free Consultation'}
                  {theme === 'dark-corporate' && 'Strategic Consultation'}
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="https://wa.me/6281234567890"
                target="_blank"
                className="btn-secondary btn-lg group"
              >
                <span className="flex items-center">
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  {theme === 'cyber' && 'WhatsApp Sekarang'}
                  {theme === 'startup' && 'Message on WhatsApp'}
                  {theme === 'dark-corporate' && 'Corporate Contact'}
                </span>
              </Link>
            </div>

            <p className="text-sm mt-8" style={{ color: 'var(--color-text-muted)' }}>
              {theme === 'cyber' &&
                '✓ Konsultasi tanpa biaya ✓ Langsung dengan developer ✓ Response dalam 1 jam'}
              {theme === 'startup' &&
                '✓ Free 30-min consultation ✓ No obligations ✓ Fast response'}
              {theme === 'dark-corporate' &&
                '✓ Strategic analysis ✓ NDA available ✓ 24h initial response'}
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}