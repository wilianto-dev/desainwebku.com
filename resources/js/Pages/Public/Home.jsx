import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  BoltIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  CpuChipIcon,
  CodeBracketIcon,
  ServerIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  ChartBarSquareIcon,
  FingerPrintIcon,
  CommandLineIcon,
  GlobeAltIcon,
  UsersIcon,
  TrophyIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  UserCircleIcon,
  Squares2X2Icon,
  EnvelopeIcon,
  MapPinIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  KeyIcon,
  VariableIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { SiLaravel, SiReact, SiTailwindcss, SiInertia, SiVuedotjs, SiMysql, SiPostgresql, SiDocker, SiAmazonwebservices } from 'react-icons/si';

export default function Home({ services, packages, portfolios, testimonials, siteSettings }) {
  const [terminalText, setTerminalText] = useState('');
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [theme, setTheme] = useState('cyber');

  // Get current theme from localStorage
  useEffect(() => {
    const currentTheme = localStorage.getItem('desainwebku-theme') || 'cyber';
    setTheme(currentTheme);

    // Listen for theme changes
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

  // Terminal typing effect (only for cyber theme)
  useEffect(() => {
    if (theme === 'cyber') {
      const fullText =
        '> npm run deploy-production\n$ Building production bundle...\n✓ Compilation successful\n✓ Security protocols activated\n✓ SEO optimized\n✓ All systems operational\n\n> Ready to launch your dream website?\n';

      if (terminalIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setTerminalText((prev) => prev + fullText[terminalIndex]);
          setTerminalIndex((prev) => prev + 1);
        }, 50);
        return () => clearTimeout(timeout);
      }
    } else {
      // Reset terminal text when switching themes
      setTerminalText('');
      setTerminalIndex(0);
    }
  }, [terminalIndex, theme]);

  // Helper function to parse features (already array from model casting)
  const parseFeatures = (features) => {
    if (!features) return [];
    return Array.isArray(features) ? features : [];
  };

  // Helper function to parse technologies (already array from model casting)
  const parseTechnologies = (technologies) => {
    if (!technologies) return [];
    return Array.isArray(technologies) ? technologies : [];
  };

  // Helper function to parse results (already array from model casting)
  const parseResults = (results) => {
    if (!results) return [];
    return Array.isArray(results) ? results : [];
  };

  // Format price in IDR
  const formatPrice = (price) => {
    if (!price) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get icon component based on service icon class
  const getServiceIcon = (iconClass) => {
    const iconMap = {
      'fas fa-code': CodeBracketIcon,
      'fas fa-mobile-alt': DevicePhoneMobileIcon,
      'fas fa-paint-brush': SparklesIcon,
      'fas fa-chart-line': ChartBarSquareIcon,
      'fas fa-cloud': ServerIcon,
      'fas fa-users-cog': UsersIcon,
      'fas fa-database': CpuChipIcon,
      'fas fa-shield-alt': ShieldCheckIcon,
      'fas fa-rocket': RocketLaunchIcon,
      'fas fa-cogs': WrenchScrewdriverIcon,
      'fas fa-building': BriefcaseIcon,
      'fas fa-shopping-cart': CurrencyDollarIcon,
      'fas fa-laptop-code': CodeBracketIcon,
      'fas fa-tools': WrenchScrewdriverIcon,
    };
    return iconMap[iconClass] || CodeBracketIcon;
  };

  // Theme-specific hero content
  const getHeroContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          badge: 'PROFESSIONAL FREELANCER',
          badgeIcon: BoltIcon,
          title: ['Website Profesional', 'Tanpa Ribet Birokrasi'],
          description:
            'Saya memberikan kualitas perusahaan dengan harga personal dan komunikasi langsung. Tidak ada tim, hanya saya dan Anda.',
          cta1: 'Lihat Layanan',
          cta2: 'Konsultasi Gratis',
          cta2Icon: ChatBubbleLeftRightIcon,
        };
      case 'startup':
        return {
          badge: 'MODERN SAAS SOLUTION',
          badgeIcon: SparklesIcon,
          title: ['Scale Your Business', 'With Expert Development'],
          description:
            'Enterprise-grade web solutions tailored for startups and growing companies. Clean code, fast delivery, measurable results.',
          cta1: 'View Services',
          cta2: 'Book Consultation',
          cta2Icon: ChatBubbleLeftRightIcon,
        };
      case 'dark-corporate':
        return {
          badge: 'STRATEGIC DIGITAL AUTHORITY',
          badgeIcon: ShieldCheckIcon,
          title: ['Build Digital', 'Dominance'],
          description:
            'Enterprise-ready web solutions for forward-thinking organizations. Corporate-level service, tactical execution, measurable ROI.',
          cta1: 'Deploy Strategy',
          cta2: 'Corporate Briefing',
          cta2Icon: BriefcaseIcon,
        };
      default:
        return {
          badge: 'PROFESSIONAL FREELANCER',
          badgeIcon: BoltIcon,
          title: ['Website Profesional', 'Tanpa Ribet Birokrasi'],
          description:
            'Saya memberikan kualitas perusahaan dengan harga personal dan komunikasi langsung. Tidak ada tim, hanya saya dan Anda.',
          cta1: 'Lihat Layanan',
          cta2: 'Konsultasi Gratis',
          cta2Icon: ChatBubbleLeftRightIcon,
        };
    }
  };

  const hero = getHeroContent();
  const techStack = [
    { icon: SiLaravel, color: '#FF2D20' },
    { icon: SiReact, color: '#61DAFB' },
    { icon: SiInertia, color: '#9553E9' },
    { icon: SiTailwindcss, color: '#38BDF8' },
  ];

  // Calculate stats from actual data
  const totalProjects = portfolios?.length || 0;
  const totalClients = portfolios?.reduce((acc, p) => {
    return p.service ? acc.add(p.service.id) : acc;
  }, new Set()).size || 0;
  const avgRating = testimonials?.reduce((acc, t) => acc + (t.rating || 0), 0) / (testimonials?.filter(t => t.rating).length || 1);
  const approvedTestimonials = testimonials?.filter(t => t.status === 'approved').length || 0;

  const BadgeIcon = hero.badgeIcon;
  const Cta2Icon = hero.cta2Icon;

  // Debug untuk melihat data (hapus setelah production)
  console.log('Services:', services);
  console.log('Packages:', packages);
  console.log('Portfolios:', portfolios);
  console.log('Testimonials:', testimonials);

  return (
    <AppLayout title={siteSettings?.site_name || "Desainwebku - Jasa Pembuatan Website Profesional"}>
      <Head title={siteSettings?.site_name || "Desainwebku"} />
      
      {/* Hero Section - Theme Specific */}
      <section className="relative min-h-[90vh] flex items-center section-lg overflow-hidden transition-theme">
        {/* Theme-specific hero backgrounds */}
        {theme === 'cyber' && (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)] via-black to-[var(--color-bg-primary)]"></div>
        )}

        {theme === 'startup' && (
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          </div>
        )}

        {theme === 'dark-corporate' && (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 70% 30%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(34,211,238,0.05) 0%, transparent 50%)',
              backgroundColor: 'var(--color-bg-primary)',
            }}
          ></div>
        )}

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div
                className="inline-flex items-center px-4 py-2 rounded-full border animate-fade-in-up"
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">{hero.title[0]}</span>
                <br />
                <span style={{ color: 'var(--color-text-primary)' }}>{hero.title[1]}</span>
              </h1>

              {/* Description */}
              <p
                className="text-lg md:text-xl leading-relaxed max-w-2xl"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/layanan" className="btn-primary group">
                  <span className="flex items-center">
                    {hero.cta1}
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link href="/kontak" className="btn-secondary group">
                  <span className="flex items-center">
                    <Cta2Icon className="mr-2 h-5 w-5" />
                    {hero.cta2}
                  </span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-3">
                  {techStack.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-lg"
                        style={{
                          borderColor: 'var(--color-bg-primary)',
                          background: 'var(--gradient-primary)',
                        }}
                      >
                        <Icon
                          className="w-7 h-7"
                          style={{
                            color: item.color,
                            filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.8))',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                    {totalClients}+
                  </span>{' '}
                  klien puas
                </span>
              </div>
            </div>

            {/* Right column - Theme specific */}
            <div className="relative lg:mt-0 mt-12">
              {theme === 'cyber' && (
                <div
                  className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 font-mono text-sm animate-fade-in-up animation-delay-200"
                  style={{ boxShadow: 'var(--shadow-glow)' }}
                >
                  <div
                    className="flex items-center space-x-2 mb-4 pb-2 border-b"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      developer@desainwebku:~/project
                    </span>
                  </div>
                  <pre
                    className="whitespace-pre-wrap text-sm"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {terminalText}
                    <span
                      className="border-r-2 animate-pulse ml-1"
                      style={{ borderColor: 'var(--color-primary)' }}
                    >
                      █
                    </span>
                  </pre>
                </div>
              )}

              {theme === 'startup' && services && services.length > 0 && (
                <div className="grid grid-cols-2 gap-6 items-stretch">
                  {services.filter(s => s.is_featured).slice(0, 4).map((service, index) => {
                    const IconComponent = getServiceIcon(service.icon);
                    return (
                      <div key={service.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-sm text-gray-600 flex-1">{service.short_description || service.title}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              {theme === 'dark-corporate' && (
                <div className="space-y-4 animate-fade-in-up animation-delay-200">
                  <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-8 transition-theme">
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="text-xs uppercase tracking-wider"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        Strategic Metrics
                      </span>
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--color-primary)' }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--color-secondary)' }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            Enterprise Readiness
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            100%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                          <div
                            className="h-full w-full"
                            style={{ background: 'var(--gradient-primary)', width: '100%' }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            Security Compliance
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            ISO 27001
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                          <div
                            className="h-full w-full"
                            style={{ background: 'var(--gradient-primary)', width: '100%' }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            Client Satisfaction
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            {avgRating ? avgRating.toFixed(1) : '0'}/5.0
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                          <div
                            className="h-full w-full"
                            style={{ background: 'var(--gradient-primary)', width: avgRating ? `${(avgRating / 5) * 100}%` : '0%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-5 text-center transition-theme hover:border-[var(--color-primary)]">
                      <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                        {totalProjects}+
                      </p>
                      <p
                        className="text-xs uppercase tracking-wider mt-1"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        Enterprise Clients
                      </p>
                    </div>
                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-5 text-center transition-theme hover:border-[var(--color-primary)]">
                      <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                        100%
                      </p>
                      <p
                        className="text-xs uppercase tracking-wider mt-1"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        Success Rate
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Theme Specific */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {theme === 'cyber' &&
              [
                { value: totalProjects + '+', label: 'Proyek Selesai', icon: ServerIcon, status: 'ACTIVE' },
                {
                  value: avgRating ? avgRating.toFixed(1) + '/5' : '0/5',
                  label: 'Kepuasan Klien',
                  icon: ShieldCheckIcon,
                  status: 'VERIFIED',
                },
                { value: approvedTestimonials + '+', label: 'Testimoni', icon: TrophyIcon, status: 'ONLINE' },
                { value: '24/7', label: 'Support', icon: ClockIcon, status: 'READY' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative bg-[var(--color-bg-card)] border border-[var(--color-border)] p-5 md:p-6 font-mono"
                  style={{ boxShadow: 'var(--shadow-glow)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <stat.icon
                      className="h-6 w-6 md:h-8 md:w-8"
                      style={{ color: 'var(--color-primary)' }}
                    />
                    <span className="text-xs" style={{ color: 'var(--color-primary)' }}>
                      {stat.status}
                    </span>
                  </div>
                  <div
                    className="text-xl md:text-3xl font-bold mb-1"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}

            {theme === 'startup' &&
              [
                { value: totalProjects + '+', label: 'Projects Completed' },
                { value: totalClients + '+', label: 'Happy Clients' },
                { value: avgRating ? avgRating.toFixed(1) + '/5' : '0/5', label: 'Client Satisfaction' },
                { value: '24/7', label: 'Support Available' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 md:p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}

            {theme === 'dark-corporate' &&
              [
                { value: totalProjects + '+', label: 'ENTERPRISE DEPLOYMENTS', metric: 'Production Ready' },
                { value: '100%', label: 'SUCCESS RATE', metric: 'Mission Critical' },
                { value: '24/7', label: 'STRATEGIC SUPPORT', metric: 'Corporate Level' },
                { value: '5+', label: 'YEARS EXPERIENCE', metric: 'Enterprise Grade' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-5 md:p-6"
                >
                  <div
                    className="text-xl md:text-3xl font-bold mb-1"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs uppercase tracking-wider mb-2"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {stat.label}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--color-accent)' }}>
                    {stat.metric}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      {services && services.length > 0 && (
        <section className="section">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
              >
                <Squares2X2Icon className="h-5 w-5 mr-2" />
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {theme === 'cyber' && 'AVAILABLE SERVICES'}
                  {theme === 'startup' && 'WHAT WE OFFER'}
                  {theme === 'dark-corporate' && 'SERVICE CATALOG'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {theme === 'cyber' && 'Layanan '}
                {theme === 'startup' && 'Our '}
                {theme === 'dark-corporate' && 'Corporate '}
                <span className="text-gradient">
                  {theme === 'cyber' && 'Profesional'}
                  {theme === 'startup' && 'Expertise'}
                  {theme === 'dark-corporate' && 'Solutions'}
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const IconComponent = getServiceIcon(service.icon);
                return (
                  <div
                    key={service.id}
                    className={`group relative transition-all duration-500 ${
                      theme === 'cyber'
                        ? 'card-cyber p-6'
                        : theme === 'startup'
                          ? 'bg-white rounded-xl p-6 shadow-md hover:shadow-xl'
                          : 'bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <IconComponent
                        className="h-10 w-10"
                        style={{ color: 'var(--color-primary)' }}
                      />
                      {service.is_featured && (
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            theme === 'cyber'
                              ? 'border border-[var(--color-primary)]'
                              : theme === 'startup'
                                ? 'bg-blue-100 text-blue-600'
                                : 'border border-[var(--color-primary)]'
                          }`}
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {theme === 'cyber' ? 'FEATURED' : 'Popular'}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`text-lg font-bold mb-3 ${
                        theme === 'cyber' ? 'font-mono' : ''
                      }`}
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {service.short_description || service.description?.substring(0, 120) + '...'}
                    </p>
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="inline-flex items-center text-sm font-medium"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {theme === 'cyber' && '$ VIEW_PACKAGES'}
                      {theme === 'startup' && 'View Packages'}
                      {theme === 'dark-corporate' && 'VIEW SOLUTIONS'}
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
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
        <section className="section bg-[var(--color-bg-secondary)]">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
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
                  {theme === 'cyber' && 'DATABASE: PROYEK'}
                  {theme === 'startup' && 'SUCCESS STORIES'}
                  {theme === 'dark-corporate' && 'CASE STUDIES'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {theme === 'cyber' && 'Proyek '}
                {theme === 'startup' && 'Featured '}
                {theme === 'dark-corporate' && 'Strategic '}
                <span className="text-gradient">
                  {theme === 'cyber' && 'Unggulan'}
                  {theme === 'startup' && 'Work'}
                  {theme === 'dark-corporate' && 'Deployments'}
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.slice(0, 6).map((portfolio, index) => {
                const technologies = parseTechnologies(portfolio.technologies);
                const results = parseResults(portfolio.results);

                return (
                  <div
                    key={portfolio.id}
                    className={`group relative overflow-hidden transition-all duration-500 ${
                      theme === 'cyber'
                        ? 'card-cyber'
                        : theme === 'startup'
                          ? 'card-startup'
                          : 'card-corporate'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-56 md:h-64 overflow-hidden">
                      <img
                        src={
                          portfolio.image ||
                          'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                        }
                        alt={portfolio.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          theme === 'cyber'
                            ? 'bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100'
                            : theme === 'startup'
                              ? 'bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                              : 'bg-gradient-to-t from-[var(--color-bg-primary)]/90 via-[var(--color-bg-primary)]/50 to-transparent opacity-0 group-hover:opacity-100'
                        }`}
                      ></div>

                      {theme === 'cyber' && technologies.length > 0 && (
                        <div className="absolute top-4 right-4">
                          <span
                            className="px-3 py-1 text-xs font-mono rounded-full border"
                            style={{
                              borderColor: 'var(--color-primary)',
                              color: 'var(--color-primary)',
                              backgroundColor: 'rgba(0,255,65,0.1)',
                            }}
                          >
                            {technologies[0]}
                          </span>
                        </div>
                      )}

                      {theme === 'dark-corporate' && (
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <span
                            className="text-xs uppercase tracking-wider px-3 py-1"
                            style={{
                              borderLeft: `3px solid var(--color-primary)`,
                              color: 'var(--color-text-primary)',
                              backgroundColor: 'rgba(17,24,39,0.9)',
                            }}
                          >
                            VIEW CASE STUDY
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 md:p-6">
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
                        className="text-sm mb-4 line-clamp-2 leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {portfolio.description}
                      </p>

                      {theme === 'startup' && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {technologies[0] || 'React.js'}
                          </span>
                          <Link
                            href={`/portofolio/${portfolio.slug}`}
                            className="inline-flex items-center text-sm font-medium hover:text-[var(--color-primary-dark)]"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            View Project
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      )}

                      {theme === 'cyber' && (
                        <Link
                          href={`/portofolio/${portfolio.slug}`}
                          className="inline-flex items-center text-sm font-mono hover:text-[var(--color-primary-light)]"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          $ ACCESS_PROJECT
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Link>
                      )}

                      {theme === 'dark-corporate' && results.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>
                            KEY RESULTS:
                          </p>
                          <p className="text-xs" style={{ color: 'var(--color-primary)' }}>
                            {results[0]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link href="/portofolio" className="btn-secondary">
                <span className="flex items-center">
                  {theme === 'cyber' && '$ VIEW_ALL_PROJECTS'}
                  {theme === 'startup' && 'View All Projects'}
                  {theme === 'dark-corporate' && 'VIEW ALL DEPLOYMENTS'}
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {packages && packages.length > 0 && (
        <section className="section">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
              >
                {theme === 'cyber' && <CurrencyDollarIcon className="h-5 w-5 mr-2" />}
                {theme === 'startup' && <PresentationChartLineIcon className="h-5 w-5 mr-2" />}
                {theme === 'dark-corporate' && <VariableIcon className="h-5 w-5 mr-2" />}
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {theme === 'cyber' && 'CONFIGURATION: PAKET'}
                  {theme === 'startup' && 'INVESTMENT PLANS'}
                  {theme === 'dark-corporate' && 'STRATEGIC PACKAGES'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {theme === 'cyber' && 'Investasi '}
                {theme === 'startup' && 'Transparent '}
                {theme === 'dark-corporate' && 'Corporate '}
                <span className="text-gradient">
                  {theme === 'cyber' && 'Terjangkau'}
                  {theme === 'startup' && 'Pricing'}
                  {theme === 'dark-corporate' && 'Investment'}
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {packages.slice(0, 3).map((pkg, index) => {
                const features = parseFeatures(pkg.features);

                return (
                  <div
                    key={pkg.id}
                    className={`group relative transition-all duration-500 ${
                      theme === 'cyber'
                        ? 'card-cyber p-6'
                        : theme === 'startup'
                          ? 'bg-white rounded-xl p-8 shadow-md hover:shadow-xl'
                          : 'bg-[var(--color-bg-card)] border border-[var(--color-border)] p-8'
                    } ${
                      pkg.is_popular
                        ? theme === 'startup'
                          ? 'border-2 border-blue-500 shadow-lg scale-105 lg:scale-105'
                          : theme === 'dark-corporate'
                            ? 'border-2 border-[var(--color-primary)]'
                            : 'border-2 border-[var(--color-primary)] shadow-[var(--shadow-glow)]'
                        : ''
                    }`}
                    style={
                      pkg.is_popular && theme === 'dark-corporate'
                        ? { borderColor: 'var(--color-primary)' }
                        : {}
                    }
                  >
                    {pkg.is_popular && (
                      <div
                        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                          theme === 'startup'
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1.5 rounded-full text-xs font-bold'
                            : theme === 'dark-corporate'
                              ? 'px-4 py-1.5 text-xs uppercase tracking-wider'
                              : 'px-4 py-1.5 bg-[var(--color-primary)] text-black text-xs font-mono rounded-full'
                        }`}
                        style={
                          theme === 'dark-corporate'
                            ? {
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-bg-primary)',
                                border: 'none',
                              }
                            : {}
                        }
                      >
                        {theme === 'cyber' && 'RECOMMENDED'}
                        {theme === 'startup' && 'MOST POPULAR'}
                        {theme === 'dark-corporate' && 'STRATEGIC CHOICE'}
                      </div>
                    )}

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
                        <span className="ml-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                          /proyek
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {pkg.short_description || pkg.description?.substring(0, 100) || 'Paket layanan profesional'}
                      </p>
                    </div>

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

                    {/* Jika features kosong, tampilkan placeholder */}
                    {features.length === 0 && (
                      <div className="space-y-3 mb-8">
                        <div className="flex items-start">
                          <CheckCircleIcon
                            className="h-5 w-5 mr-3 flex-shrink-0"
                            style={{ color: 'var(--color-primary)' }}
                          />
                          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Konsultasi gratis
                          </span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircleIcon
                            className="h-5 w-5 mr-3 flex-shrink-0"
                            style={{ color: 'var(--color-primary)' }}
                          />
                          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Desain responsif
                          </span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircleIcon
                            className="h-5 w-5 mr-3 flex-shrink-0"
                            style={{ color: 'var(--color-primary)' }}
                          />
                          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            SEO optimized
                          </span>
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/paket/${pkg.slug}`}
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                        pkg.is_popular
                          ? 'btn-primary'
                          : theme === 'startup'
                            ? 'border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                            : 'btn-secondary'
                      }`}
                    >
                      {theme === 'cyber' && '$ INITIATE_PROJECT'}
                      {theme === 'startup' && 'Start Project'}
                      {theme === 'dark-corporate' && 'DEPLOY STRATEGY'}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="section bg-[var(--color-bg-secondary)]">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
              >
                <UsersIcon className="h-5 w-5 mr-2" />
                <span
                  className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
                >
                  {theme === 'cyber' && 'USER FEEDBACK'}
                  {theme === 'startup' && 'CLIENT TESTIMONIALS'}
                  {theme === 'dark-corporate' && 'CORPORATE ENDORSEMENTS'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {theme === 'cyber' && 'Kata '}
                {theme === 'startup' && 'Trusted by '}
                {theme === 'dark-corporate' && 'Industry '}
                <span className="text-gradient">
                  {theme === 'cyber' && 'Mereka'}
                  {theme === 'startup' && 'Innovators'}
                  {theme === 'dark-corporate' && 'Leaders'}
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-300 animate-fade-in-up ${
                    theme === 'cyber'
                      ? 'card-cyber p-6'
                      : theme === 'startup'
                        ? 'bg-white rounded-xl p-6 shadow-md hover:shadow-lg'
                        : 'card-corporate p-6'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-5 w-5"
                        style={{
                          color:
                            i < (testimonial.rating || 5) ? 'var(--color-primary)' : 'var(--color-border)',
                          fill: i < (testimonial.rating || 5) ? 'var(--color-primary)' : 'none',
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-sm md:text-base italic mb-6 leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                    <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      {testimonial.name}
                    </p>
                    <p className="text-xs md:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {testimonial.company || (theme === 'cyber' ? 'USER' : 'Client')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Theme Specific */}
      <section
        className="section-lg relative overflow-hidden transition-theme"
        style={{
          background:
            theme === 'cyber'
              ? 'linear-gradient(to right, rgba(0,255,65,0.1), rgba(0,255,255,0.1))'
              : theme === 'startup'
                ? 'linear-gradient(to right, #2563eb10, #38bdf810)'
                : 'radial-gradient(circle at 30% 50%, rgba(59,130,246,0.15), rgba(34,211,238,0.05))',
        }}
      >
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full border mb-6 backdrop-blur-sm"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
            >
              {theme === 'cyber' && <FingerPrintIcon className="h-5 w-5 mr-2" />}
              {theme === 'startup' && <RocketLaunchIcon className="h-5 w-5 mr-2" />}
              {theme === 'dark-corporate' && <ShieldCheckIcon className="h-5 w-5 mr-2" />}
              <span
                className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
              >
                {theme === 'cyber' && 'ACCESS GRANTED'}
                {theme === 'startup' && 'READY TO BUILD YOUR WEBSITE?'}
                {theme === 'dark-corporate' && 'READY TO ESTABLISH DIGITAL AUTHORITY?'}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              {theme === 'cyber' && 'Ayo '}
              {theme === 'startup' && "Let's Build Something "}
              {theme === 'dark-corporate' && 'Secure Your '}
              <span className="text-gradient">
                {theme === 'cyber' && 'Diskusi Proyek'}
                {theme === 'startup' && 'Great Together'}
                {theme === 'dark-corporate' && 'Competitive Edge'}
              </span>
              {theme === 'cyber' && ' Anda!'}
            </h2>

            <p
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {theme === 'cyber' &&
                'Konsultasi gratis 30 menit. Ceritakan ide Anda, saya akan berikan solusi terbaik.'}
              {theme === 'startup' &&
                'Get a free 30-minute consultation. No obligations, just expert advice tailored to your needs.'}
              {theme === 'dark-corporate' &&
                'Schedule a strategic consultation with our corporate team. Transform your digital vision into reality.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontak" className="btn-primary btn-lg group">
                <span className="flex items-center">
                  {theme === 'cyber' && 'Jadwalkan Konsultasi'}
                  {theme === 'startup' && 'Schedule Consultation'}
                  {theme === 'dark-corporate' && 'Schedule Strategic Consultation'}
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href={`https://wa.me/${siteSettings?.phone?.replace(/\D/g, '') || '6281234567890'}`}
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
                'Tidak ada biaya konsultasi • Langsung dengan developer • Estimasi harga real-time'}
              {theme === 'startup' &&
                'Free consultation • No hidden fees • 14-day money-back guarantee'}
              {theme === 'dark-corporate' &&
                'Corporate level consultation • NDA available • Strategic roadmap included'}
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}