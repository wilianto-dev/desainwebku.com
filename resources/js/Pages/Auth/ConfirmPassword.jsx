import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import {
  LockClosedIcon,
  ArrowRightIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  FingerPrintIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

export default function ConfirmPassword() {
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

  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.confirm'), {
      onFinish: () => reset('password'),
    });
  };

  // Get theme-specific content
  const getThemeContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          title: 'SECURITY_VERIFICATION',
          subtitle: 'Confirm your identity',
          passwordLabel: 'PASSWORD',
          description: 'This area requires elevated privileges. Please verify your credentials to continue.',
          button: '$ CONFIRM_IDENTITY',
        };
      case 'startup':
        return {
          title: 'Confirm Password',
          subtitle: 'Secure area access',
          passwordLabel: 'Password',
          description: 'This is a secure area of the application. Please confirm your password before continuing.',
          button: 'Confirm',
        };
      case 'dark-corporate':
        return {
          title: 'VERIFY IDENTITY',
          subtitle: 'Elevated privileges required',
          passwordLabel: 'PASSWORD',
          description: 'This operation requires additional security verification. Please authenticate to proceed.',
          button: 'AUTHENTICATE',
        };
      default:
        return {};
    }
  };

  const themeContent = getThemeContent();

  return (
    <AppLayout title="Confirm Password - Desainwebku">
      <Head title="Confirm Password" />

      {/* Hero Section with Theme Background */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center py-12 overflow-hidden transition-theme">
        {/* Theme-specific backgrounds */}
        {theme === 'cyber' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-primary)] via-black to-[var(--color-bg-primary)]"></div>
            <div className="grid-pattern absolute inset-0 opacity-20"></div>
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
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
            <div className="scanline"></div>
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
          <div className="max-w-md mx-auto">
            {/* Confirm Password Card */}
            <div
              className={`relative overflow-hidden transition-all duration-500 animate-fade-in-up ${
                theme === 'cyber'
                  ? 'card-cyber p-8'
                  : theme === 'startup'
                    ? 'bg-white rounded-xl shadow-lg p-8'
                    : 'card-corporate p-8'
              }`}
              style={{
                backgroundColor: theme === 'startup' ? 'white' : 'var(--color-bg-card)',
              }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  {theme === 'cyber' && <CommandLineIcon className="h-8 w-8 text-white" />}
                  {theme === 'startup' && <LockClosedIcon className="h-8 w-8 text-white" />}
                  {theme === 'dark-corporate' && <ShieldCheckIcon className="h-8 w-8 text-white" />}
                </div>

                {/* Title */}
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

                {/* Subtitle */}
                <p
                  className={`text-sm ${
                    theme === 'cyber' ? 'font-mono opacity-80' : ''
                  }`}
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {themeContent.subtitle}
                </p>
              </div>

              {/* Description */}
              <div
                className="mb-6 p-4 rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  borderColor: 'var(--color-border)',
                  borderWidth: '1px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <p className={theme === 'cyber' ? 'font-mono text-xs' : ''}>
                  {themeContent.description}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={submit} className="space-y-6">
                {/* Password Field */}
                <div>
                  <InputLabel
                    htmlFor="password"
                    value={themeContent.passwordLabel}
                    className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                  />
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon
                        className="h-5 w-5"
                        style={{ color: 'var(--color-text-muted)' }}
                      />
                    </div>
                    <TextInput
                      id="password"
                      type="password"
                      name="password"
                      value={data.password}
                      className="pl-10 block w-full"
                      isFocused={true}
                      onChange={(e) => setData('password', e.target.value)}
                      required
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                  <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <PrimaryButton
                    className="w-full justify-center py-3"
                    disabled={processing}
                  >
                    <span className="flex items-center justify-center">
                      {processing ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className={theme === 'cyber' ? 'font-mono' : ''}>
                            {theme === 'cyber' ? 'VERIFYING...' : 'Verifying...'}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className={theme === 'cyber' ? 'font-mono' : ''}>
                            {themeContent.button}
                          </span>
                          <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </span>
                  </PrimaryButton>
                </div>
              </form>

              {/* Cyber Theme Terminal Effect */}
              {theme === 'cyber' && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{
                    background: 'var(--gradient-primary)',
                    opacity: 0.3,
                  }}
                ></div>
              )}
            </div>

            {/* Security Badge - Corporate Theme */}
            {theme === 'dark-corporate' && (
              <div className="mt-6 text-center">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <FingerPrintIcon
                    className="h-4 w-4 mr-2"
                    style={{ color: 'var(--color-primary)' }}
                  />
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    BIOMETRIC AVAILABLE • 2FA SUPPORTED
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}