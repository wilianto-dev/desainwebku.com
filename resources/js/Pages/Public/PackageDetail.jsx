import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BoltIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export default function PackageDetail({ package: pkg, relatedPackages }) {
  const [theme, setTheme] = React.useState('cyber');

  React.useEffect(() => {
    const currentTheme = localStorage.getItem('desainwebku-theme') || 'cyber';
    setTheme(currentTheme);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const formatPrice = (price) => {
    if (!price) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AppLayout title={`${pkg.name} - Desainwebku`}>
      <Head title={pkg.name} />

      {/* Hero Section */}
      <section className="relative py-20 section-lg overflow-hidden">
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            {pkg.is_popular && (
              <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                <BoltIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  {theme === 'cyber' ? 'RECOMMENDED PACKAGE' : 'Paket Terpopuler'}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">{pkg.name}</span>
            </h1>

            <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              {pkg.short_description || pkg.description}
            </p>

            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-6 w-6 mr-2" style={{ color: 'var(--color-primary)' }} />
                <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {formatPrice(pkg.price)}
                </span>
                <span className="ml-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>/proyek</span>
              </div>

              {pkg.duration && (
                <div className="flex items-center">
                  <ClockIcon className="h-6 w-6 mr-2" style={{ color: 'var(--color-primary)' }} />
                  <span className="text-lg" style={{ color: 'var(--color-text-primary)' }}>
                    {pkg.duration} hari
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/pesanan/package/${pkg.id}`} className="btn-primary btn-lg group">
                <span className="flex items-center">
                  {theme === 'cyber' ? '$ ORDER_NOW' : 'Pesan Sekarang'}
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link href="/kontak" className="btn-secondary btn-lg group">
                <span className="flex items-center">
                  <ChatBubbleLeftRightIcon className="mr-2 h-5 w-5" />
                  {theme === 'cyber' ? 'CONSULT' : 'Konsultasi'}
                </span>
              </Link>
            </div>

            {pkg.service && (
              <div className="mt-8">
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Layanan: {' '}
                  <Link 
                    href={`/layanan/${pkg.service.slug}`}
                    className="hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {pkg.service.title}
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
              >
                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">
                  {theme === 'cyber' ? 'PACKAGE_FEATURES' : 'Fitur Paket'}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Apa yang Anda <span className="text-gradient">Dapatkan?</span>
              </h2>

              <div className="space-y-4">
                {pkg.features && pkg.features.length > 0 ? (
                  pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircleIcon
                        className="h-6 w-6 mr-3 flex-shrink-0"
                        style={{ color: 'var(--color-primary)' }}
                      />
                      <span className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                        {feature}
                      </span>
                    </div>
                  ))
                ) : (
                  // Default features jika kosong
                  [
                    'Konsultasi gratis',
                    'Desain responsif',
                    'SEO optimized',
                    'Integrasi media sosial',
                    'Form kontak & WhatsApp',
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircleIcon
                        className="h-6 w-6 mr-3 flex-shrink-0"
                        style={{ color: 'var(--color-primary)' }}
                      />
                      <span className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                        {feature}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className={`${theme === 'cyber' ? 'card-cyber' : 'card-corporate'} p-8`}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Detail Paket
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Nama Paket</span>
                  <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{pkg.name}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Harga</span>
                  <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{formatPrice(pkg.price)}</span>
                </div>
                
                {pkg.duration && (
                  <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Durasi Pengerjaan</span>
                    <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{pkg.duration} hari</span>
                  </div>
                )}
                
                {pkg.service && (
                  <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Kategori</span>
                    <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{pkg.service.title}</span>
                  </div>
                )}
                
                <div className="flex justify-between py-2">
                  <span style={{ color: 'var(--color-text-muted)' }}>Status</span>
                  <span className="font-bold" style={{ color: pkg.is_popular ? 'var(--color-primary)' : 'var(--color-text-primary)' }}>
                    {pkg.is_popular ? (theme === 'cyber' ? 'RECOMMENDED' : 'Popular') : 'Active'}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Link href={`/pesanan/package/${pkg.id}`} className="btn-primary w-full py-3 text-center block">
                  {theme === 'cyber' ? '$ ORDER_NOW' : 'Pesan Sekarang'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages && relatedPackages.length > 0 && (
        <section className="section">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">
              Paket <span className="text-gradient">Lainnya</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPackages.map((relatedPkg) => (
                <div
                  key={relatedPkg.id}
                  className={`${
                    theme === 'cyber' ? 'card-cyber' : 'card-corporate'
                  } p-6 hover:scale-105 transition-transform duration-300`}
                >
                  {relatedPkg.is_popular && (
                    <div className="text-xs mb-2" style={{ color: 'var(--color-primary)' }}>
                      {theme === 'cyber' ? '★ POPULAR' : '★ Popular'}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    {relatedPkg.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    {relatedPkg.short_description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                      {formatPrice(relatedPkg.price)}
                    </span>
                    <Link
                      href={`/paket/${relatedPkg.slug}`}
                      className="inline-flex items-center text-sm hover:underline"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      Lihat Detail
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section bg-[var(--color-bg-secondary)]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Siap Memulai Proyek <span className="text-gradient">Anda?</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              Konsultasikan kebutuhan Anda dengan kami. Gratis!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/pesanan/package/${pkg.id}`} className="btn-primary px-8 py-3">
                Pesan Sekarang
              </Link>
              <Link href="/kontak" className="btn-secondary px-8 py-3">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}