import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  ArrowLeftIcon,
  CalendarIcon,
  ArrowRightIcon,
  ShareIcon,
  CodeBracketIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  CpuChipIcon,
  ServerIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
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

  // Safe parse for technologies
  const parseTechnologies = () => {
    if (!portfolio.technologies) return [];
    
    // If it's already an array, return it
    if (Array.isArray(portfolio.technologies)) {
      return portfolio.technologies;
    }
    
    // If it's a string, try to parse JSON
    if (typeof portfolio.technologies === 'string') {
      try {
        const parsed = JSON.parse(portfolio.technologies);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        // If parsing fails, split by comma as fallback
        return portfolio.technologies.split(',').map(t => t.trim());
      }
    }
    
    return [];
  };

  // Safe parse for results
  const parseResults = () => {
    if (!portfolio.results) return [];
    
    // If it's already an array, return it
    if (Array.isArray(portfolio.results)) {
      return portfolio.results;
    }
    
    // If it's a string, try to parse JSON
    if (typeof portfolio.results === 'string') {
      try {
        const parsed = JSON.parse(portfolio.results);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        // If parsing fails, split by new line or comma as fallback
        return portfolio.results.split('\n').map(r => r.trim()).filter(r => r);
      }
    }
    
    return [];
  };

  // Get technologies array
  const technologies = parseTechnologies();

  // Get results array
  const results = parseResults();

  // Debug di console (hapus setelah production)
  console.log('Portfolio data:', portfolio);
  console.log('Technologies:', technologies);
  console.log('Results:', results);

  // Get theme-specific content
  const getThemeContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          backText: '$ RETURN_TO_PORTFOLIO',
          published: 'RELEASE_DATE',
          completed: 'COMPLETION_DATE',
          service: 'SERVICE_CATEGORY',
          share: 'SHARE_PROJECT',
          consult: '$ INITIATE_CONSULTATION',
          technologies: 'TECH_STACK',
          results: 'OUTCOME',
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
          completed: 'Completed on',
          service: 'Service',
          share: 'Share this project',
          consult: 'Discuss Similar Project',
          technologies: 'Technology Stack',
          results: 'Results',
          related: 'More Projects',
          cta: 'Like What You See?',
          ctaSub: 'Let\'s build something great together',
          ctaButton: 'Free Consultation',
          servicesButton: 'View Services',
        };
      case 'dark-corporate':
        return {
          backText: 'PORTFOLIO',
          published: 'PUBLISHED',
          completed: 'COMPLETED',
          service: 'SOLUTION TYPE',
          share: 'SHARE CASE STUDY',
          consult: 'SCHEDULE STRATEGIC BRIEFING',
          technologies: 'ENTERPRISE STACK',
          results: 'ROI ANALYSIS',
          related: 'RELATED DEPLOYMENTS',
          cta: 'INTERESTED IN THIS SOLUTION?',
          ctaSub: 'Schedule a corporate briefing with our strategic team',
          ctaButton: 'CORPORATE BRIEFING',
          servicesButton: 'VIEW SOLUTIONS',
        };
      default:
        return {
          backText: 'Kembali ke Portofolio',
          published: 'Dipublikasikan',
          completed: 'Selesai',
          service: 'Layanan',
          share: 'Bagikan',
          consult: 'Diskusi Proyek Serupa',
          technologies: 'Teknologi',
          results: 'Hasil',
          related: 'Proyek Lainnya',
          cta: 'Tertarik dengan Proyek Ini?',
          ctaSub: 'Diskusikan kebutuhan Anda dengan kami',
          ctaButton: 'Konsultasi Gratis',
          servicesButton: 'Lihat Layanan',
        };
    }
  };

  const themeContent = getThemeContent();

  // Format date based on theme
  const formatDate = (date) => {
    if (!date) return theme === 'cyber' ? 'PENDING' : '-';
    
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format technology name based on theme
  const formatTechnology = (tech) => {
    if (!tech) return '';
    if (theme === 'cyber') {
      return tech.toUpperCase().replace(/\s/g, '_');
    }
    if (theme === 'dark-corporate') {
      return tech.toUpperCase();
    }
    return tech;
  };

  return (
    <AppLayout title={`${portfolio.title} - Desainwebku`}>
      <Head title={portfolio.title} />

      {/* Back Navigation */}
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
                  src={portfolio.image || 'https://via.placeholder.com/800x600?text=Project+Image'}
                  alt={portfolio.title}
                  className="w-full h-auto object-cover"
                />

                {/* Theme-specific overlay effects */}
                {theme === 'cyber' && (
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
                      {portfolio.service?.title?.toUpperCase().replace(/\s/g, '_') || 'PROJECT'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Portfolio Details */}
            <div className="animate-fade-in-up animation-delay-200">
              {/* Service Badge - Non-cyber themes */}
              {theme !== 'cyber' && portfolio.service && (
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
                    {portfolio.service.title}
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
                {portfolio.published_at && (
                  <div
                    className="flex items-center text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                    <span className={theme === 'cyber' ? 'font-mono text-xs' : ''}>
                      {themeContent.published}: {formatDate(portfolio.published_at)}
                    </span>
                  </div>
                )}

                {portfolio.completion_date && (
                  <div
                    className="flex items-center text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                    <span className={theme === 'cyber' ? 'font-mono text-xs' : ''}>
                      {themeContent.completed}: {formatDate(portfolio.completion_date)}
                    </span>
                  </div>
                )}

                {portfolio.service && theme === 'cyber' && (
                  <div
                    className="flex items-center text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <BuildingOfficeIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                    <span className="font-mono text-xs">
                      {themeContent.service}: <span style={{ color: 'var(--color-primary)' }}>
                        {portfolio.service.title.toUpperCase().replace(/\s/g, '_')}
                      </span>
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

      {/* Technologies & Results Section */}
      {(technologies.length > 0 || results.length > 0) && (
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Technologies */}
              {technologies.length > 0 && (
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
                      {themeContent.technologies}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
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
                        {formatTechnology(tech)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && (
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
                      {themeContent.results}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {results.map((result, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon
                          className="h-5 w-5 mr-3 flex-shrink-0"
                          style={{ color: 'var(--color-primary)' }}
                        />
                        <span
                          className={`text-sm leading-relaxed ${
                            theme === 'cyber' ? 'font-mono' : ''
                          }`}
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {result}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Portfolios */}
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
                      src={related.image || 'https://via.placeholder.com/800x600?text=Project+Image'}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
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

      {/* CTA Section */}
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