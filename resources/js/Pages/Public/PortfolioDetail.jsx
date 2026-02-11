import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  ArrowLeftIcon,
  CalendarIcon,
  TagIcon,
  UserCircleIcon,
  ArrowRightIcon,
  ShareIcon,
  CodeBracketIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';

export default function PortfolioDetail({ portfolio, relatedPortfolios }) {
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

  // Get theme-specific content
  const getThemeContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          backText: '$ RETURN_TO_PORTFOLIO',
          published: 'RELEASE_DATE',
          created: 'DEVELOPER',
          share: 'SHARE_PROJECT',
          consult: '$ INITIATE_CONSULTATION',
          challenge: 'CHALLENGE',
          solution: 'SOLUTION',
          technology: 'TECH_STACK',
          result: 'OUTCOME',
          related: 'RELATED_PROJECTS',
          cta: 'INITIATE_CONSULTATION',
          ctaSub: 'Ready to deploy similar solution?',
          ctaButton: '$ CONSULT_NOW',
          servicesButton: '$ VIEW_SERVICES',
        };
      case 'startup':
        return {
          backText: 'Back to Portfolio',
          published: 'Published on',
          created: 'Created by',
          share: 'Share this project',
          consult: 'Discuss Similar Project',
          challenge: 'Challenge',
          solution: 'Solution',
          technology: 'Technology Stack',
          result: 'Results',
          related: 'More Projects',
          cta: 'Like What You See?',
          ctaSub: 'Let\'s build something great together',
          ctaButton: 'Free Consultation',
          servicesButton: 'View Services',
        };
      case 'dark-corporate':
        return {
          backText: '← PORTFOLIO',
          published: 'DEPLOYMENT DATE',
          created: 'PROJECT LEAD',
          share: 'SHARE CASE STUDY',
          consult: 'SCHEDULE STRATEGIC BRIEFING',
          challenge: 'CHALLENGE',
          solution: 'SOLUTION',
          technology: 'ENTERPRISE STACK',
          result: 'ROI ANALYSIS',
          related: 'RELATED DEPLOYMENTS',
          cta: 'INTERESTED IN THIS SOLUTION?',
          ctaSub: 'Schedule a corporate briefing with our strategic team',
          ctaButton: 'CORPORATE BRIEFING',
          servicesButton: 'VIEW SOLUTIONS',
        };
      default:
        return {};
    }
  };

  const themeContent = getThemeContent();

  // Format date based on theme
  const formatDate = (date) => {
    if (!date) return theme === 'cyber' ? 'PENDING_RELEASE' : 'Belum dipublikasikan';
    
    if (theme === 'cyber') {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).toUpperCase().replace(/\s/g, '_');
    }
    
    if (theme === 'dark-corporate') {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).toUpperCase();
    }
    
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Mock project details - in real app these would come from the backend
  const projectDetails = {
    challenge: portfolio.challenge || 'Proyek ini menghadapi tantangan dalam membuat antarmuka yang user-friendly sekaligus memenuhi kebutuhan fungsional yang kompleks dari klien.',
    solution: portfolio.solution || 'Kami mengembangkan solusi dengan pendekatan agile, melakukan testing berulang, dan memastikan setiap fitur berfungsi optimal sebelum diluncurkan.',
    technologies: portfolio.technologies || ['React.js', 'Laravel', 'MySQL', 'REST API'],
    results: portfolio.results || 'Klien mengalami peningkatan signifikan dalam konversi dan engagement pengguna setelah implementasi solusi kami.',
    metrics: portfolio.metrics || {
      performance: '+40%',
      conversion: '+25%',
      engagement: '+60%',
    },
  };

  return (
    <AppLayout title={`${portfolio.title} - Desainwebku Portfolio`}>
      {/* Back Navigation - Theme Specific */}
      <section
        className="sticky top-16 md:top-20 z-40 py-4 border-y transition-theme"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link
              href="/portofolio"
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

            {/* Share Button - Desktop */}
            <button
              className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg transition-theme ${
                theme === 'cyber' ? 'font-mono text-sm border' : ''
              }`}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <ShareIcon className="h-4 w-4" />
              <span>{themeContent.share}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Hero */}
      <section className="py-12 lg:py-16 transition-theme">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Portfolio Image */}
            <div className="relative animate-fade-in-up">
              <div
                className={`relative overflow-hidden rounded-xl ${
                  theme === 'cyber'
                    ? 'border-2 border-[var(--color-border)] shadow-[var(--shadow-glow)]'
                    : theme === 'dark-corporate'
                      ? 'border border-[var(--color-border)]'
                      : 'shadow-lg'
                }`}
              >
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
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Theme-specific overlay effects */}
                {theme === 'cyber' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1.5 text-xs font-mono rounded-full border"
                        style={{
                          borderColor: 'var(--color-primary)',
                          color: 'var(--color-primary)',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {portfolio.category?.toUpperCase().replace(/\s/g, '_') || 'WEB_DEVELOPMENT'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Portfolio Details */}
            <div className="animate-fade-in-up animation-delay-200">
              {/* Category Badge - Non-cyber themes */}
              {theme !== 'cyber' && (
                <div className="mb-6">
                  <span
                    className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                      theme === 'dark-corporate'
                        ? 'uppercase tracking-wider text-xs border'
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
                    }}
                  >
                    {portfolio.category || 'Web Development'}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1
                className={`font-bold mb-6 ${
                  theme === 'cyber'
                    ? 'font-mono text-3xl md:text-4xl'
                    : theme === 'dark-corporate'
                      ? 'uppercase tracking-wider text-3xl md:text-4xl'
                      : 'text-3xl md:text-4xl lg:text-5xl'
                }`}
                style={{ color: 'var(--color-text-primary)' }}
              >
                {portfolio.title}
              </h1>

              {/* Metadata */}
              <div className="space-y-3 mb-8">
                <div
                  className="flex items-center text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                  <span className={theme === 'cyber' ? 'font-mono text-xs' : ''}>
                    {themeContent.published}: {formatDate(portfolio.published_at)}
                  </span>
                </div>

                {portfolio.user && (
                  <div
                    className="flex items-center text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <UserCircleIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                    <span className={theme === 'cyber' ? 'font-mono text-xs' : ''}>
                      {themeContent.created}:{' '}
                      <span style={{ color: 'var(--color-text-secondary)' }}>
                        {portfolio.user.name}
                      </span>
                    </span>
                  </div>
                )}

                {portfolio.tech && theme === 'cyber' && (
                  <div
                    className="flex items-center text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <CodeBracketIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                    <span className="font-mono text-xs">
                      PRIMARY_STACK: <span style={{ color: 'var(--color-primary)' }}>{portfolio.tech}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div
                className="prose max-w-none mb-8"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <p className={`text-base md:text-lg leading-relaxed ${
                  theme === 'cyber' ? 'font-mono text-sm' : ''
                }`}>
                  {portfolio.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <Link
                  href="/kontak"
                  className="btn-primary group flex-1"
                >
                  <span className="flex items-center justify-center">
                    {themeContent.consult}
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <button
                  className={`md:hidden flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-theme ${
                    theme === 'cyber' ? 'border font-mono text-sm' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <ShareIcon className="h-4 w-4" />
                  <span>{themeContent.share}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Section - Theme Specific */}
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
              {theme === 'cyber' && <CpuChipIcon className="h-5 w-5 mr-2" />}
              {theme === 'startup' && <DocumentTextIcon className="h-5 w-5 mr-2" />}
              {theme === 'dark-corporate' && <ServerIcon className="h-5 w-5 mr-2" />}
              <span
                className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
              >
                {theme === 'cyber' && 'PROJECT_SPECIFICATIONS'}
                {theme === 'startup' && 'Project Details'}
                {theme === 'dark-corporate' && 'CASE STUDY ANALYSIS'}
              </span>
            </div>
            <h2
              className={`text-2xl md:text-3xl font-bold ${
                theme === 'cyber' ? 'font-mono' : ''
              }`}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {theme === 'cyber' && 'DETAILED_ANALYSIS'}
              {theme === 'startup' && 'In-Depth Overview'}
              {theme === 'dark-corporate' && 'STRATEGIC BREAKDOWN'}
            </h2>
          </div>

          {/* Project Stats - Cyber Theme */}
          {theme === 'cyber' && projectDetails.metrics && (
            <div className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
              <div className="text-center p-4 border border-[var(--color-border)] bg-[var(--color-bg-card)]">
                <div className="text-2xl font-mono font-bold" style={{ color: 'var(--color-primary)' }}>
                  {projectDetails.metrics.performance}
                </div>
                <div className="text-xs font-mono mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  PERFORMANCE
                </div>
              </div>
              <div className="text-center p-4 border border-[var(--color-border)] bg-[var(--color-bg-card)]">
                <div className="text-2xl font-mono font-bold" style={{ color: 'var(--color-primary)' }}>
                  {projectDetails.metrics.conversion}
                </div>
                <div className="text-xs font-mono mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  CONVERSION
                </div>
              </div>
              <div className="text-center p-4 border border-[var(--color-border)] bg-[var(--color-bg-card)]">
                <div className="text-2xl font-mono font-bold" style={{ color: 'var(--color-primary)' }}>
                  {projectDetails.metrics.engagement}
                </div>
                <div className="text-xs font-mono mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  ENGAGEMENT
                </div>
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Challenge */}
            <div
              className={`p-6 lg:p-8 transition-theme ${
                theme === 'cyber'
                  ? 'card-cyber'
                  : theme === 'startup'
                    ? 'bg-white rounded-xl shadow-md'
                    : 'card-corporate'
              }`}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <span className="text-white font-bold">01</span>
                </div>
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
                  {themeContent.challenge}
                </h3>
              </div>
              <p
                className={`leading-relaxed ${
                  theme === 'cyber' ? 'font-mono text-sm' : 'text-gray-600'
                }`}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {projectDetails.challenge}
              </p>
            </div>

            {/* Solution */}
            <div
              className={`p-6 lg:p-8 transition-theme ${
                theme === 'cyber'
                  ? 'card-cyber'
                  : theme === 'startup'
                    ? 'bg-white rounded-xl shadow-md'
                    : 'card-corporate'
              }`}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <span className="text-white font-bold">02</span>
                </div>
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
                  {themeContent.solution}
                </h3>
              </div>
              <p
                className={`leading-relaxed ${
                  theme === 'cyber' ? 'font-mono text-sm' : 'text-gray-600'
                }`}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {projectDetails.solution}
              </p>
            </div>

            {/* Technologies */}
            <div
              className={`p-6 lg:p-8 transition-theme ${
                theme === 'cyber'
                  ? 'card-cyber'
                  : theme === 'startup'
                    ? 'bg-white rounded-xl shadow-md'
                    : 'card-corporate'
              }`}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <CodeBracketIcon className="h-5 w-5 text-white" />
                </div>
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
                  {themeContent.technology}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectDetails.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1.5 text-xs rounded ${
                      theme === 'cyber'
                        ? 'border font-mono'
                        : theme === 'dark-corporate'
                          ? 'uppercase tracking-wider border'
                          : 'bg-[var(--color-bg-secondary)]'
                    }`}
                    style={{
                      borderColor: 'var(--color-border)',
                      color: theme === 'cyber' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      backgroundColor: theme === 'startup' ? 'var(--color-bg-secondary)' : 'transparent',
                    }}
                  >
                    {theme === 'cyber' ? tech.toUpperCase().replace(/\s/g, '_') : tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div
              className={`p-6 lg:p-8 transition-theme ${
                theme === 'cyber'
                  ? 'card-cyber'
                  : theme === 'startup'
                    ? 'bg-white rounded-xl shadow-md'
                    : 'card-corporate'
              }`}
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <ChartBarIcon className="h-5 w-5 text-white" />
                </div>
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
                  {themeContent.result}
                </h3>
              </div>
              <p
                className={`leading-relaxed ${
                  theme === 'cyber' ? 'font-mono text-sm' : 'text-gray-600'
                }`}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {projectDetails.results}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Portfolios - Theme Specific */}
      {relatedPortfolios && relatedPortfolios.length > 0 && (
        <section className="py-16 lg:py-20 transition-theme">
          <div className="container-custom">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
              >
                {theme === 'cyber' && <GlobeAltIcon className="h-5 w-5 mr-2" />}
                {theme === 'startup' && <SparklesIcon className="h-5 w-5 mr-2" />}
                {theme === 'dark-corporate' && <ShieldCheckIcon className="h-5 w-5 mr-2" />}
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {themeContent.related}
                </span>
              </div>
              <h2
                className={`text-2xl md:text-3xl font-bold ${
                  theme === 'cyber' ? 'font-mono' : ''
                }`}
                style={{ color: 'var(--color-text-primary)' }}
              >
                {theme === 'cyber' && 'SIMILAR_PROJECTS'}
                {theme === 'startup' && 'You Might Also Like'}
                {theme === 'dark-corporate' && 'RELATED DEPLOYMENTS'}
              </h2>
            </div>

            {/* Related Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPortfolios.map((related, index) => (
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
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        related.image ||
                        (theme === 'cyber'
                          ? 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                          : theme === 'dark-corporate'
                            ? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                            : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
                      }
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                    {theme === 'cyber' && (
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-2 py-1 text-xs font-mono rounded-full border"
                          style={{
                            borderColor: 'var(--color-primary)',
                            color: 'var(--color-primary)',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                          }}
                        >
                          {related.category?.toUpperCase().replace(/\s/g, '_') || 'WEB'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
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
                      {related.title}
                    </h3>
                    <p
                      className="text-sm mb-4 line-clamp-2"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {related.description}
                    </p>
                    <Link
                      href={`/portofolio/${related.slug}`}
                      className={`inline-flex items-center text-sm font-medium transition-all duration-300 group-hover:translate-x-1 ${
                        theme === 'cyber'
                          ? 'font-mono'
                          : theme === 'dark-corporate'
                            ? 'uppercase tracking-wider text-xs'
                            : ''
                      }`}
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {theme === 'cyber' && '$ VIEW_PROJECT'}
                      {theme === 'startup' && 'View Project'}
                      {theme === 'dark-corporate' && 'VIEW CASE STUDY'}
                      <ArrowRightIcon className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
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
              <span className="text-gradient">{themeContent.cta}</span>
            </h2>
            
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {themeContent.ctaSub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontak" className="btn-primary btn-lg group">
                <span className="flex items-center">
                  {themeContent.ctaButton}
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link href="/layanan" className="btn-secondary btn-lg group">
                <span className="flex items-center">
                  {themeContent.servicesButton}
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