import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BoltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  ShoppingCartIcon,
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';

export default function ServiceDetail({ service, packages, portfolios, relatedServices }) {
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

  const ServiceIcon = getServiceIcon(service.icon);

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get theme-specific content
  const getThemeContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          backText: '$ RETURN_TO_SERVICES',
          category: 'SERVICE_CATEGORY',
          packagesTitle: 'AVAILABLE_PACKAGES',
          portfolioTitle: 'RELATED_PROJECTS',
          relatedTitle: 'RELATED_SERVICES',
          orderButton: '$ SELECT_PACKAGE',
          consultButton: '$ CONSULT_ENGINEER',
          ctaTitle: 'READY_TO_DEPLOY?',
          ctaSub: 'Choose a package that fits your needs',
        };
      case 'startup':
        return {
          backText: 'Back to Services',
          category: 'Service',
          packagesTitle: 'Available Packages',
          portfolioTitle: 'Related Projects',
          relatedTitle: 'Related Services',
          orderButton: 'Select Package',
          consultButton: 'Free Consultation',
          ctaTitle: 'Ready to Start?',
          ctaSub: 'Choose a package that fits your needs',
        };
      case 'dark-corporate':
        return {
          backText: '← SERVICES',
          category: 'SOLUTION CATEGORY',
          packagesTitle: 'STRATEGIC PACKAGES',
          portfolioTitle: 'CASE STUDIES',
          relatedTitle: 'COMPLEMENTARY SOLUTIONS',
          orderButton: 'SELECT STRATEGY',
          consultButton: 'CORPORATE BRIEFING',
          ctaTitle: 'READY FOR DEPLOYMENT?',
          ctaSub: 'Select a strategic package for your enterprise',
        };
      default:
        return {
          backText: 'Kembali ke Layanan',
          category: 'Layanan',
          packagesTitle: 'Paket Tersedia',
          portfolioTitle: 'Portofolio Terkait',
          relatedTitle: 'Layanan Lainnya',
          orderButton: 'Pilih Paket',
          consultButton: 'Konsultasi',
          ctaTitle: 'Siap Memulai?',
          ctaSub: 'Pilih paket yang sesuai dengan kebutuhan Anda',
        };
    }
  };

  const themeContent = getThemeContent();

  return (
    <AppLayout title={`${service.title} - Desainwebku`}>
      <Head title={service.title} />

      {/* Back Navigation */}
      <section
        className="sticky top-16 md:top-20 z-40 py-4 border-y transition-theme"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="container-custom">
          <Link
            href="/layanan"
            className={`inline-flex items-center transition-all duration-300 group ${
              theme === 'cyber'
                ? 'font-mono text-sm hover:text-[var(--color-primary)]'
                : theme === 'dark-corporate'
                  ? 'text-xs uppercase tracking-wider hover:text-[var(--color-primary)]'
                  : 'text-sm hover:text-[var(--color-primary)]'
            }`}
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            {themeContent.backText}
          </Link>
        </div>
      </section>

      {/* Service Hero */}
      <section className="relative py-12 lg:py-16 overflow-hidden transition-theme">
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
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <ServiceIcon className="h-10 w-10 text-white" />
            </div>

            {/* Featured Badge */}
            {service.is_featured && (
              <div
                className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'var(--color-bg-card)',
                }}
              >
                <BoltIcon className="h-5 w-5 mr-2" />
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {theme === 'cyber' ? 'FEATURED SERVICE' : 'Layanan Unggulan'}
                </span>
              </div>
            )}

            {/* Title */}
            <h1
              className={`font-bold mb-6 ${
                theme === 'cyber'
                  ? 'font-mono text-3xl md:text-4xl lg:text-5xl'
                  : theme === 'dark-corporate'
                    ? 'uppercase tracking-wider text-3xl md:text-4xl lg:text-5xl'
                    : 'text-3xl md:text-4xl lg:text-5xl'
              }`}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {service.title}
            </h1>

            {/* Short Description */}
            {service.short_description && (
              <p
                className={`text-lg md:text-xl leading-relaxed mb-6 max-w-2xl mx-auto ${
                  theme === 'cyber' ? 'font-mono text-sm opacity-90' : ''
                }`}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {service.short_description}
              </p>
            )}

            {/* Full Description */}
            <p
              className={`text-base leading-relaxed mb-8 max-w-3xl mx-auto ${
                theme === 'cyber' ? 'font-mono text-sm opacity-80' : ''
              }`}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {service.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {packages?.length || 0}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Paket Tersedia
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {portfolios?.length || 0}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Proyek Selesai
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      {packages && packages.length > 0 && (
        <section
          className="py-16 lg:py-20 transition-theme"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderTopWidth: '1px',
            borderTopColor: 'var(--color-border)',
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--color-border)',
          }}
        >
          <div className="container-custom">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
              >
                {theme === 'cyber' && <CommandLineIcon className="h-5 w-5 mr-2" />}
                {theme === 'startup' && <SparklesIcon className="h-5 w-5 mr-2" />}
                {theme === 'dark-corporate' && <ShieldCheckIcon className="h-5 w-5 mr-2" />}
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {themeContent.packagesTitle}
                </span>
              </div>
              <h2
                className={`text-2xl md:text-3xl font-bold ${
                  theme === 'cyber' ? 'font-mono' : ''
                }`}
                style={{ color: 'var(--color-text-primary)' }}
              >
                Pilih Paket Sesuai Kebutuhan
              </h2>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {packages.map((pkg, index) => {
                const features = pkg.features || [];

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
                      {pkg.duration && (
                        <p
                          className="text-xs mt-2"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          Estimasi pengerjaan: {pkg.duration} hari
                        </p>
                      )}
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
                      href={`/paket/${pkg.slug}`}
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                        pkg.is_popular
                          ? 'btn-primary'
                          : theme === 'startup'
                            ? 'border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                            : 'btn-secondary'
                      }`}
                    >
                      {theme === 'cyber' ? '$ SELECT_PACKAGE' : 'Pilih Paket'}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section */}
      {portfolios && portfolios.length > 0 && (
        <section className="py-16 lg:py-20 transition-theme">
          <div className="container-custom">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
              >
                {theme === 'cyber' && <CodeBracketIcon className="h-5 w-5 mr-2" />}
                {theme === 'startup' && <BriefcaseIcon className="h-5 w-5 mr-2" />}
                {theme === 'dark-corporate' && <DocumentTextIcon className="h-5 w-5 mr-2" />}
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {themeContent.portfolioTitle}
                </span>
              </div>
              <h2
                className={`text-2xl md:text-3xl font-bold ${
                  theme === 'cyber' ? 'font-mono' : ''
                }`}
                style={{ color: 'var(--color-text-primary)' }}
              >
                Proyek yang Telah Kami Kerjakan
              </h2>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio, index) => (
                <div
                  key={portfolio.id}
                  className={`group transition-all duration-500 animate-fade-in-up ${
                    theme === 'cyber'
                      ? 'card-cyber'
                      : theme === 'startup'
                        ? 'bg-white rounded-xl shadow-md overflow-hidden'
                        : 'card-corporate'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={portfolio.image || 'https://via.placeholder.com/400x300'}
                      alt={portfolio.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
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
                    <p
                      className="text-sm mb-4 line-clamp-2"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {portfolio.description}
                    </p>
                    <Link
                      href={`/portofolio/${portfolio.slug}`}
                      className={`inline-flex items-center text-sm font-medium transition-all duration-300 group ${
                        theme === 'cyber'
                          ? 'font-mono hover:text-[var(--color-primary)]'
                          : 'hover:text-[var(--color-primary)]'
                      }`}
                      style={{ color: 'var(--color-primary)' }}
                    >
                      Lihat Detail
                      <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section
          className="py-16 lg:py-20 transition-theme"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderTopWidth: '1px',
            borderTopColor: 'var(--color-border)',
          }}
        >
          <div className="container-custom">
            {/* Section Header */}
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
                  {themeContent.relatedTitle}
                </span>
              </div>
              <h2
                className={`text-2xl md:text-3xl font-bold ${
                  theme === 'cyber' ? 'font-mono' : ''
                }`}
                style={{ color: 'var(--color-text-primary)' }}
              >
                Layanan Lainnya
              </h2>
            </div>

            {/* Related Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related, index) => {
                const RelatedIcon = getServiceIcon(related.icon);
                return (
                  <div
                    key={related.id}
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
                      <div className="flex items-start mb-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                          style={{ background: 'var(--gradient-primary)' }}
                        >
                          <RelatedIcon className="h-5 w-5 text-white" />
                        </div>
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
                          {related.title}
                        </h3>
                      </div>

                      <p
                        className="text-sm mb-4 line-clamp-2"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {related.short_description || related.description}
                      </p>

                      <Link
                        href={`/layanan/${related.slug}`}
                        className={`inline-flex items-center text-sm font-medium transition-all duration-300 group ${
                          theme === 'cyber'
                            ? 'font-mono hover:text-[var(--color-primary)]'
                            : 'hover:text-[var(--color-primary)]'
                        }`}
                        style={{ color: 'var(--color-primary)' }}
                      >
                        Lihat Layanan
                        <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
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
              <span className="text-gradient">{themeContent.ctaTitle}</span>
            </h2>
            
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {themeContent.ctaSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontak"
                className="btn-primary btn-lg group"
              >
                <span className="flex items-center">
                  {themeContent.consultButton}
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