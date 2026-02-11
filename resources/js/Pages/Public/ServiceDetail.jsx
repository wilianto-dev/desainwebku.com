import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  ArrowRightIcon,
  ShoppingCartIcon,
  BoltIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  CpuChipIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  ServerIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

export default function ServiceDetail({ service, relatedServices }) {
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

  // Parse features if string
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

  const features = parseFeatures(service.features);

  // Format price based on theme
  const formatPrice = (price) => {
    if (theme === 'cyber') {
      return `IDR ${new Intl.NumberFormat('en-US').format(price)}`;
    }
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
          priceLabel: 'INITIAL_INVESTMENT',
          durationLabel: 'DEPLOYMENT_TIME',
          orderButton: '$ DEPLOY_SERVICE',
          consultButton: '$ INITIATE_CONSULTATION',
          featuresTitle: 'SERVICE_SPECIFICATIONS',
          processTitle: 'DEPLOYMENT_SEQUENCE',
          relatedTitle: 'RELATED_SERVICES',
          ctaTitle: 'READY_TO_DEPLOY?',
          ctaSub: 'Initialize your project deployment sequence',
          ctaButton: '$ EXECUTE_DEPLOYMENT',
          ctaConsult: '$ CONSULT_ENGINEER',
          guarantee: '✓ 1h response ✓ Direct engineer ✓ No consultation fee',
        };
      case 'startup':
        return {
          backText: 'Back to Services',
          category: 'Service',
          priceLabel: 'Starting from',
          durationLabel: 'Delivery time',
          orderButton: 'Order Now',
          consultButton: 'Free Consultation',
          featuresTitle: 'What\'s Included',
          processTitle: 'How It Works',
          relatedTitle: 'Related Services',
          ctaTitle: 'Ready to Start?',
          ctaSub: 'Get your project started today with our expert team',
          ctaButton: 'Order Now',
          ctaConsult: 'Free Consultation',
          guarantee: '✓ Fast response ✓ Direct communication ✓ No obligations',
        };
      case 'dark-corporate':
        return {
          backText: '← SERVICES',
          category: 'SOLUTION CATEGORY',
          priceLabel: 'INITIAL INVESTMENT',
          durationLabel: 'DEPLOYMENT TIMELINE',
          orderButton: 'DEPLOY SOLUTION',
          consultButton: 'STRATEGIC BRIEFING',
          featuresTitle: 'SOLUTION SPECIFICATIONS',
          processTitle: 'IMPLEMENTATION PROTOCOL',
          relatedTitle: 'RELATED SOLUTIONS',
          ctaTitle: 'READY FOR DEPLOYMENT?',
          ctaSub: 'Schedule a strategic consultation with our enterprise team',
          ctaButton: 'DEPLOY NOW',
          ctaConsult: 'CORPORATE BRIEFING',
          guarantee: '✓ 24h response ✓ Senior architect ✓ Strategic roadmap',
        };
      default:
        return {};
    }
  };

  const themeContent = getThemeContent();

  // Process steps based on theme
  const processSteps = [
    {
      icon: theme === 'cyber' ? CommandLineIcon : ChatBubbleLeftRightIcon,
      title: theme === 'cyber' ? 'CONSULTATION' : theme === 'dark-corporate' ? 'ANALYSIS' : 'Konsultasi',
      desc: theme === 'cyber' 
        ? 'Requirements gathering and system analysis' 
        : theme === 'dark-corporate'
          ? 'Strategic requirements analysis & scope definition'
          : 'Diskusi kebutuhan dan tujuan proyek',
    },
    {
      icon: theme === 'cyber' ? DocumentTextIcon : WrenchScrewdriverIcon,
      title: theme === 'cyber' ? 'PLANNING' : theme === 'dark-corporate' ? 'ARCHITECTURE' : 'Perencanaan',
      desc: theme === 'cyber'
        ? 'System architecture and deployment timeline'
        : theme === 'dark-corporate'
          ? 'Enterprise architecture & technical specifications'
          : 'Pembuatan timeline dan spesifikasi teknis',
    },
    {
      icon: theme === 'cyber' ? CodeBracketIcon : RocketLaunchIcon,
      title: theme === 'cyber' ? 'DEVELOPMENT' : theme === 'dark-corporate' ? 'EXECUTION' : 'Pengembangan',
      desc: theme === 'cyber'
        ? 'Code implementation and system integration'
        : theme === 'dark-corporate'
          ? 'Agile development with continuous integration'
          : 'Implementasi dan pengembangan solusi',
    },
    {
      icon: theme === 'cyber' ? RocketLaunchIcon : DevicePhoneMobileIcon,
      title: theme === 'cyber' ? 'DEPLOYMENT' : theme === 'dark-corporate' ? 'DELIVERY' : 'Peluncuran',
      desc: theme === 'cyber'
        ? 'Testing, deployment, and post-launch support'
        : theme === 'dark-corporate'
          ? 'Quality assurance, deployment, and maintenance'
          : 'Testing, deployment, dan maintenance',
    },
  ];

  return (
    <AppLayout title={`${service.title} - Desainwebku Services`}>
      {/* Back Navigation - Theme Specific */}
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

      {/* Service Hero - Theme Specific */}
      <section className="relative py-12 lg:py-16 overflow-hidden transition-theme">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Service Info */}
            <div className="animate-fade-in-up">
              {/* Category Badge */}
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full border mb-6 ${
                  theme === 'cyber' ? 'font-mono' : ''
                }`}
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'var(--color-bg-card)',
                }}
              >
                {theme === 'cyber' && <CpuChipIcon className="h-4 w-4 mr-2" />}
                {theme === 'startup' && <SparklesIcon className="h-4 w-4 mr-2" />}
                {theme === 'dark-corporate' && <ShieldCheckIcon className="h-4 w-4 mr-2" />}
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {themeContent.category}: {service.category || (theme === 'cyber' ? 'DIGITAL_SERVICE' : 'Layanan Digital')}
                </span>
                {theme === 'cyber' && (
                  <span
                    className="w-2 h-2 rounded-full ml-2 animate-pulse"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  ></span>
                )}
              </div>

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

              {/* Description */}
              <p
                className={`text-base md:text-lg leading-relaxed mb-8 ${
                  theme === 'cyber' ? 'font-mono text-sm opacity-90' : ''
                }`}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {service.description}
              </p>

              {/* Stats Cards */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div
                  className={`flex-1 min-w-[200px] p-5 rounded-lg border transition-theme ${
                    theme === 'cyber'
                      ? 'border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-glow)]'
                      : theme === 'startup'
                        ? 'bg-white shadow-md'
                        : 'border-[var(--color-border)] bg-[var(--color-bg-card)]'
                  }`}
                  style={{
                    backgroundColor: theme === 'startup' ? 'white' : 'var(--color-bg-card)',
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <CurrencyDollarIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p
                        className="text-xs mb-1"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {themeContent.priceLabel}
                      </p>
                      <p
                        className="text-xl md:text-2xl font-bold"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {formatPrice(service.price)}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex-1 min-w-[200px] p-5 rounded-lg border transition-theme ${
                    theme === 'cyber'
                      ? 'border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-glow)]'
                      : theme === 'startup'
                        ? 'bg-white shadow-md'
                        : 'border-[var(--color-border)] bg-[var(--color-bg-card)]'
                  }`}
                  style={{
                    backgroundColor: theme === 'startup' ? 'white' : 'var(--color-bg-card)',
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <ClockIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p
                        className="text-xs mb-1"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {themeContent.durationLabel}
                      </p>
                      <p
                        className="text-xl md:text-2xl font-bold"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {service.duration} {theme === 'cyber' ? 'DAYS' : theme === 'dark-corporate' ? 'DAYS' : 'Hari'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Card */}
            <div className="animate-fade-in-up animation-delay-200">
              <div
                className={`p-6 lg:p-8 rounded-xl border transition-theme ${
                  theme === 'cyber'
                    ? 'card-cyber'
                    : theme === 'startup'
                      ? 'bg-white shadow-lg'
                      : 'card-corporate'
                }`}
                style={{
                  backgroundColor: theme === 'startup' ? 'white' : 'var(--color-bg-card)',
                }}
              >
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <ShoppingCartIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3
                      className={`font-bold ${
                        theme === 'cyber'
                          ? 'font-mono text-lg'
                          : theme === 'dark-corporate'
                            ? 'uppercase tracking-wider'
                            : 'text-xl'
                      }`}
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {theme === 'cyber' ? 'DEPLOY_SERVICE' : 'Pesan Layanan'}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {theme === 'cyber' && 'Initialize deployment sequence'}
                      {theme === 'startup' && 'Ready to start your project?'}
                      {theme === 'dark-corporate' && 'Enterprise deployment ready'}
                    </p>
                  </div>
                </div>

                {/* Features Preview */}
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
                      <p
                        className="text-xs mt-2"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        +{features.length - 3} more features
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href={`/pesanan/${service.id}`}
                    className="btn-primary w-full group"
                  >
                    <span className="flex items-center justify-center">
                      {themeContent.orderButton}
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    href="/kontak"
                    className="btn-secondary w-full group"
                  >
                    <span className="flex items-center justify-center">
                      {themeContent.consultButton}
                    </span>
                  </Link>
                </div>

                {/* Guarantee Text */}
                <p
                  className="text-xs text-center mt-4"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {themeContent.guarantee}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Theme Specific */}
      {features.length > 0 && (
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
                {theme === 'cyber' && <CodeBracketIcon className="h-5 w-5 mr-2" />}
                {theme === 'startup' && <SparklesIcon className="h-5 w-5 mr-2" />}
                {theme === 'dark-corporate' && <ServerIcon className="h-5 w-5 mr-2" />}
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {themeContent.featuresTitle}
                </span>
              </div>
              <h2
                className={`text-2xl md:text-3xl font-bold ${
                  theme === 'cyber' ? 'font-mono' : ''
                }`}
                style={{ color: 'var(--color-text-primary)' }}
              >
                {theme === 'cyber' && 'INCLUDED_COMPONENTS'}
                {theme === 'startup' && 'Everything You Get'}
                {theme === 'dark-corporate' && 'SOLUTION COMPONENTS'}
              </h2>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 transition-all duration-500 animate-fade-in-up ${
                    theme === 'cyber'
                      ? 'card-cyber'
                      : theme === 'startup'
                        ? 'bg-white rounded-xl shadow-md hover:shadow-lg'
                        : 'card-corporate'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <CheckCircleIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3
                        className={`font-bold mb-2 ${
                          theme === 'cyber'
                            ? 'font-mono text-base'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider text-sm'
                              : 'text-lg'
                        }`}
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {theme === 'cyber' 
                          ? `FEATURE_${(index + 1).toString().padStart(2, '0')}`
                          : `Fitur ${index + 1}`}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          theme === 'cyber' ? 'font-mono opacity-80' : ''
                        }`}
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {feature}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section - Theme Specific */}
      <section className="py-16 lg:py-20 transition-theme">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
            >
              {theme === 'cyber' && <CommandLineIcon className="h-5 w-5 mr-2" />}
              {theme === 'startup' && <RocketLaunchIcon className="h-5 w-5 mr-2" />}
              {theme === 'dark-corporate' && <DocumentTextIcon className="h-5 w-5 mr-2" />}
              <span
                className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
              >
                {themeContent.processTitle}
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-bold ${
                theme === 'cyber' ? 'font-mono' : ''
              }`}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {theme === 'cyber' && 'DEPLOYMENT_PIPELINE'}
              {theme === 'startup' && 'Simple 4-Step Process'}
              {theme === 'dark-corporate' && 'IMPLEMENTATION PROTOCOL'}
            </h2>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={index}
                  className={`relative text-center p-6 transition-all duration-500 animate-fade-in-up ${
                    theme === 'cyber'
                      ? 'card-cyber'
                      : theme === 'startup'
                        ? 'bg-white rounded-xl shadow-md'
                        : 'card-corporate'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Step Number */}
                  <div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: theme === 'cyber' ? 'black' : 'white',
                    }}
                  >
                    {theme === 'cyber' ? `STEP_${index + 1}` : `Step ${index + 1}`}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 mt-2"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <StepIcon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold mb-2 ${
                      theme === 'cyber'
                        ? 'font-mono text-base'
                        : theme === 'dark-corporate'
                          ? 'uppercase tracking-wider text-sm'
                          : 'text-lg'
                    }`}
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed ${
                      theme === 'cyber' ? 'font-mono opacity-80' : ''
                    }`}
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {step.desc}
                  </p>

                  {/* Connector Line - Desktop */}
                  {index < processSteps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5"
                      style={{
                        backgroundColor: 'var(--color-border)',
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Services - Theme Specific */}
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
                {theme === 'cyber' && 'SIMILAR_SERVICES'}
                {theme === 'startup' && 'You Might Also Like'}
                {theme === 'dark-corporate' && 'COMPLEMENTARY SOLUTIONS'}
              </h2>
            </div>

            {/* Related Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((related, index) => {
                const relatedFeatures = parseFeatures(related.features);
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
                          {related.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            theme === 'cyber'
                              ? 'border font-mono'
                              : theme === 'dark-corporate'
                                ? 'uppercase tracking-wider border'
                                : 'bg-[var(--color-bg-secondary)]'
                          }`}
                          style={{
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-primary)',
                          }}
                        >
                          {related.category || (theme === 'cyber' ? 'SERVICE' : 'Layanan')}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className="text-sm mb-4 line-clamp-2 leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {related.description}
                      </p>

                      {/* Features Preview */}
                      {relatedFeatures.length > 0 && (
                        <div className="mb-4 space-y-1">
                          {relatedFeatures.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-start text-xs">
                              <CheckCircleIcon
                                className="h-3 w-3 mr-1 flex-shrink-0 mt-0.5"
                                style={{ color: 'var(--color-primary)' }}
                              />
                              <span style={{ color: 'var(--color-text-muted)' }}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Price and Action */}
                      <div
                        className="flex items-center justify-between mt-4 pt-4 border-t"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <div>
                          <p
                            className="text-lg font-bold"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            {formatPrice(related.price)}
                          </p>
                          <p
                            className="text-xs flex items-center mt-1"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {related.duration} {theme === 'cyber' ? 'DAYS' : 'hari'}
                          </p>
                        </div>
                        <Link
                          href={`/layanan/${related.slug}`}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                            theme === 'cyber'
                              ? 'border hover:border-[var(--color-primary)]'
                              : theme === 'startup'
                                ? 'text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10'
                                : 'btn-secondary'
                          }`}
                          style={{
                            borderColor: 'var(--color-border)',
                          }}
                        >
                          {theme === 'cyber' && '$ DETAILS'}
                          {theme === 'startup' && 'Details'}
                          {theme === 'dark-corporate' && 'ANALYZE'}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                href="/layanan"
                className={`inline-flex items-center font-medium transition-all duration-300 group ${
                  theme === 'cyber'
                    ? 'font-mono text-sm hover:text-[var(--color-primary)]'
                    : theme === 'dark-corporate'
                      ? 'text-xs uppercase tracking-wider hover:text-[var(--color-primary)]'
                      : 'text-sm hover:text-[var(--color-primary)]'
                }`}
                style={{ color: 'var(--color-primary)' }}
              >
                {theme === 'cyber' && '$ VIEW_ALL_SERVICES'}
                {theme === 'startup' && 'View All Services'}
                {theme === 'dark-corporate' && 'EXPLORE ALL SOLUTIONS'}
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

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
                href={`/pesanan/${service.id}`}
                className="btn-primary btn-lg group"
              >
                <span className="flex items-center">
                  {themeContent.ctaButton}
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/kontak"
                className="btn-secondary btn-lg group"
              >
                <span className="flex items-center">
                  {themeContent.ctaConsult}
                </span>
              </Link>
            </div>

            <p className="text-sm mt-8" style={{ color: 'var(--color-text-muted)' }}>
              {themeContent.guarantee}
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}