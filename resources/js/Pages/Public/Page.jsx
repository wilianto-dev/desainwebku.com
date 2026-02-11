import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  HomeIcon,
  ChevronRightIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CalendarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function Page({ page }) {
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
          home: '~',
          lastUpdated: 'LAST_MODIFIED',
          ctaTitle: 'NEED_ASSISTANCE?',
          ctaSub: 'Contact system administrator for detailed information',
          ctaButton: '$ INITIATE_CONTACT',
          servicesButton: '$ VIEW_SERVICES',
          guarantee: '✓ Response in 1 hour ✓ Direct developer ✓ No consultation fee',
        };
      case 'startup':
        return {
          home: 'Home',
          lastUpdated: 'Last updated',
          ctaTitle: 'Need More Help?',
          ctaSub: 'Contact us for detailed information about our services',
          ctaButton: 'Contact Us',
          servicesButton: 'View Services',
          guarantee: '✓ Fast response ✓ Direct communication ✓ No obligations',
        };
      case 'dark-corporate':
        return {
          home: 'HOME',
          lastUpdated: 'LAST UPDATED',
          ctaTitle: 'FURTHER ASSISTANCE?',
          ctaSub: 'Contact our corporate team for detailed solution information',
          ctaButton: 'CORPORATE CONTACT',
          servicesButton: 'VIEW SOLUTIONS',
          guarantee: '✓ 24h response ✓ Senior architect ✓ Strategic consultation',
        };
      default:
        return {};
    }
  };

  const themeContent = getThemeContent();

  // Format date based on theme
  const formatDate = (date) => {
    if (!date) return theme === 'cyber' ? 'PENDING' : 'Belum diperbarui';
    
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

  return (
    <AppLayout title={page.seo_title || page.title}>
      {/* Breadcrumb - Theme Specific */}
      <section
        className="sticky top-16 md:top-20 z-40 py-4 border-y transition-theme"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className={`flex items-center transition-colors ${
                theme === 'cyber'
                  ? 'font-mono hover:text-[var(--color-primary)]'
                  : theme === 'dark-corporate'
                    ? 'uppercase tracking-wider text-xs hover:text-[var(--color-primary)]'
                    : 'hover:text-[var(--color-primary)]'
              }`}
              style={{ color: 'var(--color-text-muted)' }}
            >
              <HomeIcon className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{themeContent.home}</span>
            </Link>
            
            <ChevronRightIcon 
              className="h-4 w-4" 
              style={{ color: 'var(--color-border)' }} 
            />
            
            <span
              className={`font-medium ${
                theme === 'cyber'
                  ? 'font-mono text-[var(--color-primary)]'
                  : theme === 'dark-corporate'
                    ? 'uppercase tracking-wider text-xs'
                    : ''
              }`}
              style={{ 
                color: theme === 'cyber' 
                  ? 'var(--color-primary)' 
                  : 'var(--color-text-primary)' 
              }}
            >
              {page.title}
            </span>
          </nav>
        </div>
      </section>

      {/* Page Hero - Theme Specific */}
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
          <div className="max-w-4xl mx-auto text-center">
            {/* Page Type Badge */}
            <div
              className="inline-flex items-center px-4 py-2 rounded-full border mb-6 animate-fade-in-up"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-bg-card)',
              }}
            >
              {theme === 'cyber' && <CommandLineIcon className="h-5 w-5 mr-2" />}
              {theme === 'startup' && <DocumentTextIcon className="h-5 w-5 mr-2" />}
              {theme === 'dark-corporate' && <ShieldCheckIcon className="h-5 w-5 mr-2" />}
              <span
                className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
              >
                {theme === 'cyber' && 'DOCUMENTATION'}
                {theme === 'startup' && 'Information Page'}
                {theme === 'dark-corporate' && 'CORPORATE DOCUMENT'}
              </span>
              {theme === 'cyber' && (
                <span
                  className="w-2 h-2 rounded-full ml-2 animate-pulse"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                ></span>
              )}
            </div>

            {/* Page Title */}
            <h1
              className={`font-bold mb-6 animate-fade-in-up animation-delay-200 ${
                theme === 'cyber'
                  ? 'font-mono text-4xl md:text-5xl lg:text-6xl'
                  : theme === 'dark-corporate'
                    ? 'uppercase tracking-wider text-4xl md:text-5xl lg:text-6xl'
                    : 'text-4xl md:text-5xl lg:text-6xl'
              }`}
              style={{ color: 'var(--color-text-primary)' }}
            >
              {page.title}
            </h1>

            {/* SEO Description */}
            {page.seo_description && (
              <p
                className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-400 ${
                  theme === 'cyber' ? 'font-mono opacity-80' : ''
                }`}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {page.seo_description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex items-center justify-center mt-8 animate-fade-in-up animation-delay-600">
              <div
                className="flex items-center space-x-2 px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border)',
                  borderWidth: '1px',
                }}
              >
                <CalendarIcon 
                  className="h-4 w-4" 
                  style={{ color: 'var(--color-primary)' }} 
                />
                <span
                  className={`text-xs ${
                    theme === 'cyber' 
                      ? 'font-mono' 
                      : theme === 'dark-corporate' 
                        ? 'uppercase tracking-wider' 
                        : ''
                  }`}
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {themeContent.lastUpdated}: {formatDate(page.updated_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Content - Theme Specific */}
      <section
        className="py-12 lg:py-16 transition-theme"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          borderTopWidth: '1px',
          borderTopColor: 'var(--color-border)',
          borderBottomWidth: '1px',
          borderBottomColor: 'var(--color-border)',
        }}
      >
        <div className="container-custom">
          <div 
            className="max-w-4xl mx-auto"
            style={{
              color: 'var(--color-text-secondary)',
            }}
          >
            {/* Content Container with Theme Styling */}
            <div
              className={`prose prose-lg max-w-none ${
                theme === 'cyber'
                  ? 'prose-invert'
                  : theme === 'dark-corporate'
                    ? 'prose-invert'
                    : ''
              }`}
              style={{
                '--prose-body': 'var(--color-text-secondary)',
                '--prose-headings': 'var(--color-text-primary)',
                '--prose-links': 'var(--color-primary)',
                '--prose-bold': 'var(--color-text-primary)',
                '--prose-counters': 'var(--color-text-muted)',
                '--prose-bullets': 'var(--color-primary)',
                '--prose-hr': 'var(--color-border)',
                '--prose-quotes': 'var(--color-text-secondary)',
                '--prose-quote-borders': 'var(--color-primary)',
                '--prose-captions': 'var(--color-text-muted)',
                '--prose-code': 'var(--color-primary)',
                '--prose-pre-code': 'var(--color-text-secondary)',
                '--prose-pre-bg': 'var(--color-bg-card)',
                '--prose-th-borders': 'var(--color-border)',
                '--prose-td-borders': 'var(--color-border)',
              }}
            >
              {/* Page Content with Theme-Specific Classes */}
              <div
                className={`leading-relaxed ${
                  theme === 'cyber' 
                    ? 'font-mono text-sm [&_h1]:font-mono [&_h2]:font-mono [&_h3]:font-mono [&_h4]:font-mono [&_h5]:font-mono [&_h6]:font-mono' 
                    : theme === 'dark-corporate'
                      ? '[&_h1]:uppercase [&_h1]:tracking-wider [&_h2]:uppercase [&_h2]:tracking-wider [&_h3]:uppercase [&_h3]:tracking-wider'
                      : ''
                }`}
                dangerouslySetInnerHTML={{ __html: page.content }}
                style={{
                  color: 'var(--color-text-secondary)',
                }}
              />
            </div>
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
                  {themeContent.ctaButton}
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/layanan"
                className="btn-secondary btn-lg group"
              >
                <span className="flex items-center">
                  {themeContent.servicesButton}
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