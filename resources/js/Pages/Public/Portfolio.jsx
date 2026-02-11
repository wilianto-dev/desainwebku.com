import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  ArrowRightIcon,
  CalendarIcon,
  TagIcon,
  FunnelIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CodeBracketIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

export default function Portfolio({ portfolios, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
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

  // Filter portfolios
  const filteredPortfolios =
    portfolios?.filter((portfolio) => {
      const matchesCategory = selectedCategory === 'all' || portfolio.category === selectedCategory;
      const matchesSearch =
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (portfolio.tech && portfolio.tech.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesSearch;
    }) || [];

  // Get theme-specific hero content
  const getHeroContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          badge: 'DATABASE: PORTFOLIO',
          badgeIcon: CommandLineIcon,
          title: ['Karya', 'Terbaik'],
          description: 'Koleksi proyek pengembangan website dengan standar kualitas enterprise.',
          status: 'ACCESS_GRANTED',
        };
      case 'startup':
        return {
          badge: 'SUCCESS STORIES',
          badgeIcon: SparklesIcon,
          title: ['Featured', 'Work'],
          description: 'Showcasing our best digital solutions for innovative companies.',
          status: 'PROVEN',
        };
      case 'dark-corporate':
        return {
          badge: 'CASE STUDIES',
          badgeIcon: ShieldCheckIcon,
          title: ['Strategic', 'Deployments'],
          description: 'Enterprise-grade solutions delivered for forward-thinking organizations.',
          status: 'VERIFIED',
        };
      default:
        return {};
    }
  };

  const hero = getHeroContent();
  const BadgeIcon = hero.badgeIcon;

  // Get category display name
  const getCategoryName = (category) => {
    if (theme === 'cyber') {
      return category.toUpperCase().replace(' ', '_');
    }
    if (theme === 'dark-corporate') {
      return category.toUpperCase();
    }
    return category;
  };

  return (
    <AppLayout title="Portofolio - Desainwebku">
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
                  {portfolios?.length || 0}+
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {theme === 'cyber' && 'PROJECTS'}
                  {theme === 'startup' && 'Projects'}
                  {theme === 'dark-corporate' && 'DEPLOYMENTS'}
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {categories?.length || 0}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {theme === 'cyber' && 'CATEGORIES'}
                  {theme === 'startup' && 'Categories'}
                  {theme === 'dark-corporate' && 'SECTORS'}
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary)' }}
                >
                  100%
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {theme === 'cyber' && 'SUCCESS_RATE'}
                  {theme === 'startup' && 'Satisfaction'}
                  {theme === 'dark-corporate' && 'SUCCESS'}
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
                    ? '$ SEARCH_PROJECTS...'
                    : theme === 'dark-corporate'
                      ? 'SEARCH DEPLOYMENTS...'
                      : 'Cari portofolio...'
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

            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              {/* Category Filter - Desktop */}
              <div className="hidden lg:flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    theme === 'cyber' ? 'font-mono' : ''
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === 'all'
                        ? 'var(--color-primary)'
                        : 'var(--color-bg-card)',
                    color:
                      selectedCategory === 'all'
                        ? 'var(--color-bg-primary)'
                        : 'var(--color-text-secondary)',
                    borderWidth: '1px',
                    borderColor: selectedCategory === 'all'
                      ? 'var(--color-primary)'
                      : 'var(--color-border)',
                  }}
                >
                  {theme === 'cyber' && 'ALL'}
                  {theme === 'startup' && 'Semua'}
                  {theme === 'dark-corporate' && 'ALL'}
                </button>
                
                {categories?.slice(0, 3).map((category) => (
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
                    {getCategoryName(category)}
                  </button>
                ))}
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-theme lg:hidden"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border)',
                  borderWidth: '1px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Filter</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-300 ${
                    filterOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Reset Filter */}
              {(selectedCategory !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-theme"
                  style={{
                    color: 'var(--color-text-muted)',
                    borderColor: 'var(--color-border)',
                    borderWidth: '1px',
                  }}
                >
                  <XMarkIcon className="h-4 w-4" />
                  <span className="text-sm hidden sm:inline">
                    {theme === 'cyber' ? 'RESET' : 'Reset'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {filterOpen && (
            <div
              className="mt-4 p-4 rounded-lg border transition-theme lg:hidden animate-slide-up"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
              }}
            >
              <span
                className="text-xs font-medium uppercase tracking-wider block mb-3"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {theme === 'cyber' ? 'CATEGORIES' : 'Kategori'}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setFilterOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs transition-theme"
                  style={{
                    backgroundColor:
                      selectedCategory === 'all'
                        ? 'var(--color-primary)'
                        : 'var(--color-bg-secondary)',
                    color:
                      selectedCategory === 'all'
                        ? 'var(--color-bg-primary)'
                        : 'var(--color-text-secondary)',
                  }}
                >
                  {theme === 'cyber' ? 'ALL' : 'Semua'}
                </button>
                {categories?.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setFilterOpen(false);
                    }}
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

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {theme === 'cyber' && `$ FOUND ${filteredPortfolios.length} PROJECTS`}
              {theme === 'startup' && `Menampilkan ${filteredPortfolios.length} portofolio`}
              {theme === 'dark-corporate' && `${filteredPortfolios.length} DEPLOYMENTS FOUND`}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {filteredPortfolios.length === 0 ? (
            <div
              className="text-center py-20 rounded-2xl border transition-theme"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="mb-4" style={{ color: 'var(--color-text-muted)' }}>
                <TagIcon className="h-20 w-20 mx-auto" />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {theme === 'cyber' && 'NO PROJECTS FOUND'}
                {theme === 'startup' && 'Tidak ada portofolio ditemukan'}
                {theme === 'dark-corporate' && 'NO MATCHING DEPLOYMENTS'}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                {theme === 'cyber' && 'TRY ADJUSTING YOUR SEARCH PARAMETERS'}
                {theme === 'startup' && 'Coba gunakan kata kunci atau kategori yang berbeda'}
                {theme === 'dark-corporate' && 'ADJUST SEARCH CRITERIA'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="btn-primary"
              >
                {theme === 'cyber' && '$ RESET_FILTERS'}
                {theme === 'startup' && 'Reset Filter'}
                {theme === 'dark-corporate' && 'CLEAR PARAMETERS'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPortfolios.map((portfolio, index) => (
                <div
                  key={portfolio.id}
                  className={`group transition-all duration-500 animate-fade-in-up ${
                    theme === 'cyber'
                      ? 'card-cyber'
                      : theme === 'startup'
                        ? 'card-startup'
                        : 'card-corporate'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img
                      src={
                        portfolio.image ||
                        (theme === 'cyber'
                          ? 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                          : theme === 'dark-corporate'
                            ? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                            : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
                      }
                      alt={portfolio.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        theme === 'cyber'
                          ? 'bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100'
                          : theme === 'startup'
                            ? 'bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                            : 'bg-gradient-to-t from-[var(--color-bg-primary)]/90 via-[var(--color-bg-primary)]/50 to-transparent opacity-0 group-hover:opacity-100'
                      }`}
                    ></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                          theme === 'cyber'
                            ? 'border font-mono'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider'
                              : ''
                        }`}
                        style={{
                          backgroundColor: theme === 'startup' 
                            ? 'var(--color-primary)' 
                            : 'var(--color-bg-card)',
                          color: theme === 'startup' 
                            ? 'white' 
                            : 'var(--color-primary)',
                          borderColor: 'var(--color-primary)',
                          borderWidth: theme === 'cyber' ? '1px' : '0',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {getCategoryName(portfolio.category || 'Web Development')}
                      </span>
                    </div>

                    {/* Tech Badge - Cyber Theme */}
                    {theme === 'cyber' && portfolio.tech && (
                      <div className="absolute top-4 right-4">
                        <span
                          className="px-3 py-1.5 text-xs font-mono rounded-full border"
                          style={{
                            borderColor: 'var(--color-primary)',
                            color: 'var(--color-primary)',
                            backgroundColor: 'rgba(0,255,65,0.1)',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          {portfolio.tech}
                        </span>
                      </div>
                    )}

                    {/* View Project Indicator - Corporate Theme */}
                    {theme === 'dark-corporate' && (
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span
                          className="text-xs uppercase tracking-wider px-3 py-1.5"
                          style={{
                            borderLeft: `3px solid var(--color-primary)`,
                            color: 'var(--color-text-primary)',
                            backgroundColor: 'rgba(17,24,39,0.9)',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          VIEW CASE STUDY
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6">
                    {/* Title */}
                    <h3
                      className={`font-bold mb-2 ${
                        theme === 'cyber'
                          ? 'font-mono text-lg'
                          : theme === 'dark-corporate'
                            ? 'uppercase tracking-wider text-base'
                            : 'text-xl'
                      }`}
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {portfolio.title}
                    </h3>

                    {/* Date */}
                    <div className="flex items-center mb-3">
                      <CalendarIcon
                        className="h-4 w-4 mr-2"
                        style={{ color: 'var(--color-text-muted)' }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {portfolio.published_at
                          ? new Date(portfolio.published_at).toLocaleDateString(
                              theme === 'cyber' ? 'en-US' : 'id-ID',
                              {
                                year: 'numeric',
                                month: theme === 'cyber' ? 'short' : 'long',
                                day: 'numeric',
                              }
                            )
                          : theme === 'cyber'
                            ? 'PENDING_DEPLOYMENT'
                            : 'Belum dipublikasikan'}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm mb-4 line-clamp-2 leading-relaxed"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {portfolio.description}
                    </p>

                    {/* Tech Stack - Startup Theme */}
                    {theme === 'startup' && portfolio.tech && (
                      <div className="mb-4">
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: 'var(--color-bg-secondary)',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          {portfolio.tech}
                        </span>
                      </div>
                    )}

                    {/* Link */}
                    <Link
                      href={`/portofolio/${portfolio.slug}`}
                      className={`inline-flex items-center text-sm font-medium transition-all duration-300 group-hover:translate-x-1 ${
                        theme === 'cyber'
                          ? 'font-mono'
                          : theme === 'dark-corporate'
                            ? 'uppercase tracking-wider text-xs'
                            : ''
                      }`}
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {theme === 'cyber' && '$ ACCESS_PROJECT'}
                      {theme === 'startup' && 'Lihat Detail Proyek'}
                      {theme === 'dark-corporate' && 'VIEW CASE STUDY'}
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredPortfolios.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-theme"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                    borderWidth: '1px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {theme === 'cyber' ? 'PREV' : 'Previous'}
                </button>
                <button
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-theme"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-bg-primary)',
                  }}
                >
                  1
                </button>
                <button
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-theme"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                    borderWidth: '1px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  2
                </button>
                <button
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-theme"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                    borderWidth: '1px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  3
                </button>
                <button
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-theme"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                    borderWidth: '1px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {theme === 'cyber' ? 'NEXT' : 'Next'}
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Theme Specific */}
      <section
        className="py-20 relative overflow-hidden transition-theme"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderTopWidth: '1px',
          borderTopColor: 'var(--color-border)',
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
              {theme === 'cyber' && 'Siap '}
              {theme === 'startup' && 'Ready to '}
              {theme === 'dark-corporate' && 'Ready to '}
              <span className="text-gradient">
                {theme === 'cyber' && 'Memulai Proyek?'}
                {theme === 'startup' && 'Start Your Project?'}
                {theme === 'dark-corporate' && 'Deploy Your Strategy?'}
              </span>
            </h2>
            
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {theme === 'cyber' &&
                'Terinspirasi dari portofolio kami? Diskusikan kebutuhan Anda dan wujudkan solusi digital bersama.'}
              {theme === 'startup' &&
                'Inspired by our work? Let\'s discuss your project and create something great together.'}
              {theme === 'dark-corporate' &&
                'Inspired by our case studies? Schedule a strategic consultation with our enterprise team.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/layanan" className="btn-primary btn-lg group">
                <span className="flex items-center">
                  {theme === 'cyber' && 'Lihat Layanan'}
                  {theme === 'startup' && 'View Services'}
                  {theme === 'dark-corporate' && 'EXPLORE SOLUTIONS'}
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link href="/kontak" className="btn-secondary btn-lg group">
                <span className="flex items-center">
                  {theme === 'cyber' && 'Konsultasi Gratis'}
                  {theme === 'startup' && 'Free Consultation'}
                  {theme === 'dark-corporate' && 'CORPORATE BRIEFING'}
                </span>
              </Link>
            </div>

            <p className="text-sm mt-8" style={{ color: 'var(--color-text-muted)' }}>
              {theme === 'cyber' &&
                '✓ Response dalam 1 jam ✓ Langsung dengan developer ✓ Tanpa biaya konsultasi'}
              {theme === 'startup' &&
                '✓ Fast response ✓ Direct communication ✓ No obligations'}
              {theme === 'dark-corporate' &&
                '✓ 24h initial response ✓ Senior architect ✓ Strategic roadmap'}
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}