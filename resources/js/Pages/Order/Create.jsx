import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {
  ShoppingCartIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function OrderCreate({ type, item }) {
  const [theme, setTheme] = useState('cyber');

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

  const { data, setData, post, processing, errors } = useForm({
    type: type,
    item_id: item.id,
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('order.store'));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getThemeContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          title: 'ORDER_INITIATION',
          subtitle: type === 'service' ? 'DEPLOY_SERVICE' : 'DEPLOY_PACKAGE',
          backLink: 'RETURN_TO_SERVICES',
          nameLabel: 'CUSTOMER_IDENTIFIER',
          emailLabel: 'CONTACT_EMAIL',
          phoneLabel: 'CONTACT_LINE',
          notesLabel: 'DEPLOYMENT_NOTES',
          button: '$ CONFIRM_ORDER',
          summaryTitle: 'ORDER_SUMMARY',
          total: 'TOTAL_COST',
        };
      case 'startup':
        return {
          title: 'Order Details',
          subtitle: type === 'service' ? 'Complete your service order' : 'Complete your package order',
          backLink: 'Back to Services',
          nameLabel: 'Full name',
          emailLabel: 'Email address',
          phoneLabel: 'Phone number',
          notesLabel: 'Additional notes',
          button: 'Place Order',
          summaryTitle: 'Order Summary',
          total: 'Total',
        };
      case 'dark-corporate':
        return {
          title: 'ORDER PROCESSING',
          subtitle: type === 'service' ? 'SERVICE DEPLOYMENT' : 'PACKAGE DEPLOYMENT',
          backLink: 'RETURN TO SERVICES',
          nameLabel: 'CONTACT PERSON',
          emailLabel: 'CORPORATE EMAIL',
          phoneLabel: 'DIRECT LINE',
          notesLabel: 'DEPLOYMENT SPECIFICATIONS',
          button: 'CONFIRM ORDER',
          summaryTitle: 'ORDER SUMMARY',
          total: 'TOTAL INVESTMENT',
        };
      default:
        return {};
    }
  };

  const themeContent = getThemeContent();

  return (
    <AppLayout title={`Order ${type === 'service' ? item.title : item.name}`}>
      <Head title="Order - Desainwebku" />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden transition-theme">
        {theme === 'cyber' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)] via-black to-[var(--color-bg-primary)]"></div>
            <div className="grid-pattern absolute inset-0 opacity-20"></div>
            <div className="scanline"></div>
          </>
        )}

        <div className="container-custom relative">
          {/* Back Link */}
          <Link
            href="/layanan"
            className={`inline-flex items-center mb-6 transition-all duration-300 group ${
              theme === 'cyber'
                ? 'font-mono text-sm hover:text-[var(--color-primary)]'
                : theme === 'dark-corporate'
                  ? 'text-xs uppercase tracking-wider hover:text-[var(--color-primary)]'
                  : 'text-sm hover:text-[var(--color-primary)]'
            }`}
            style={{ color: 'var(--color-text-muted)' }}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            {themeContent.backLink}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <div
                className={`relative overflow-hidden p-6 lg:p-8 ${
                  theme === 'cyber'
                    ? 'card-cyber'
                    : theme === 'startup'
                      ? 'bg-white rounded-xl shadow-lg'
                      : 'card-corporate'
                }`}
                style={{
                  backgroundColor: theme === 'startup' ? 'white' : 'var(--color-bg-card)',
                }}
              >
                <div className="text-center mb-8">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <ShoppingCartIcon className="h-8 w-8 text-white" />
                  </div>
                  <h2
                    className={`text-2xl font-bold mb-2 ${
                      theme === 'cyber'
                        ? 'font-mono'
                        : theme === 'dark-corporate'
                          ? 'uppercase tracking-wider'
                          : ''
                    }`}
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {themeContent.title}
                  </h2>
                  <p
                    className={`text-sm ${
                      theme === 'cyber' ? 'font-mono opacity-80' : ''
                    }`}
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {themeContent.subtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <InputLabel
                      htmlFor="customer_name"
                      value={themeContent.nameLabel}
                      className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                    />
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                      </div>
                      <TextInput
                        id="customer_name"
                        name="customer_name"
                        type="text"
                        value={data.customer_name}
                        onChange={(e) => setData('customer_name', e.target.value)}
                        className="pl-10 block w-full"
                        required
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                        }}
                      />
                    </div>
                    <InputError message={errors.customer_name} className="mt-2" />
                  </div>

                  {/* Email Field */}
                  <div>
                    <InputLabel
                      htmlFor="customer_email"
                      value={themeContent.emailLabel}
                      className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                    />
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                      </div>
                      <TextInput
                        id="customer_email"
                        name="customer_email"
                        type="email"
                        value={data.customer_email}
                        onChange={(e) => setData('customer_email', e.target.value)}
                        className="pl-10 block w-full"
                        required
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                        }}
                      />
                    </div>
                    <InputError message={errors.customer_email} className="mt-2" />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <InputLabel
                      htmlFor="customer_phone"
                      value={themeContent.phoneLabel}
                      className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                    />
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                      </div>
                      <TextInput
                        id="customer_phone"
                        name="customer_phone"
                        type="tel"
                        value={data.customer_phone}
                        onChange={(e) => setData('customer_phone', e.target.value)}
                        className="pl-10 block w-full"
                        required
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                        }}
                      />
                    </div>
                    <InputError message={errors.customer_phone} className="mt-2" />
                  </div>

                  {/* Notes Field */}
                  <div>
                    <InputLabel
                      htmlFor="notes"
                      value={themeContent.notesLabel}
                      className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                    />
                    <div className="relative mt-1">
                      <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                        <DocumentTextIcon className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                      </div>
                      <textarea
                        id="notes"
                        name="notes"
                        rows="4"
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                        className="pl-10 block w-full rounded-lg border px-4 py-2.5 text-sm transition-theme focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                        }}
                      ></textarea>
                    </div>
                    <InputError message={errors.notes} className="mt-2" />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                      <span className="flex items-center justify-center">
                        {processing ? (
                          <>
                            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className={theme === 'cyber' ? 'font-mono' : ''}>
                              {theme === 'cyber' ? 'PROCESSING...' : 'Processing...'}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className={theme === 'cyber' ? 'font-mono' : ''}>
                              {themeContent.button}
                            </span>
                          </>
                        )}
                      </span>
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className={`p-6 lg:p-8 ${
                  theme === 'cyber'
                    ? 'card-cyber'
                    : theme === 'startup'
                      ? 'bg-white rounded-xl shadow-lg'
                      : 'card-corporate'
                }`}
                style={{
                  backgroundColor: theme === 'startup' ? 'white' : 'var(--color-bg-card)',
                }}
              >
                <h3
                  className={`text-lg font-bold mb-6 ${
                    theme === 'cyber'
                      ? 'font-mono'
                      : theme === 'dark-corporate'
                        ? 'uppercase tracking-wider'
                        : ''
                  }`}
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {themeContent.summaryTitle}
                </h3>

                <div className="space-y-4">
                  <div className="pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {type === 'service' ? item.title : item.name}
                    </p>
                    <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                      {item.description}
                    </p>
                  </div>

                  {type === 'package' && item.features && (
                    <div className="pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                      <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                        {theme === 'cyber' ? 'INCLUDED_FEATURES:' : 'Features included:'}
                      </p>
                      <ul className="space-y-1">
                        {item.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-xs">
                            <CheckCircleIcon className="h-3 w-3 mr-2 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                            <span style={{ color: 'var(--color-text-muted)' }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {themeContent.total}:
                      </span>
                      <span
                        className="text-xl font-bold"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {theme === 'cyber' ? 'ONE_TIME_PAYMENT' : 'One-time payment'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}