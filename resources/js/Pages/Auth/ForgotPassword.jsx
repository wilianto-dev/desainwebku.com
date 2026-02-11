import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel'; 
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
  EnvelopeIcon,
  ArrowRightIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  KeyIcon,
  FingerPrintIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

export default function ForgotPassword({ status }) {
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

  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  // Get theme-specific content
  const getThemeContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          title: 'RECOVER_ACCESS',
          subtitle: 'Enter your email to receive recovery link',
          emailLabel: 'REGISTERED_EMAIL',
          description: 'Forgot your password credential? Initiate recovery sequence. System will transmit a secure reset link to your registered email address.',
          button: '$ SEND_RECOVERY_LINK',
          backToLogin: 'RETURN_TO_LOGIN',
          success: 'RECOVERY_LINK_SENT',
        };
      case 'startup':
        return {
          title: 'Forgot Password?',
          subtitle: 'No worries, we\'ll help you reset it',
          emailLabel: 'Email address',
          description: 'Enter your email address and we\'ll send you a link to reset your password.',
          button: 'Send Reset Link',
          backToLogin: 'Back to login',
          success: 'Reset link sent! Check your email.',
        };
      case 'dark-corporate':
        return {
          title: 'RECOVER CREDENTIALS',
          subtitle: 'Enterprise password recovery',
          emailLabel: 'CORPORATE EMAIL',
          description: 'Submit your registered corporate email to receive a secure password reset token. This process is SOC2 compliant.',
          button: 'REQUEST RESET',
          backToLogin: 'RETURN TO LOGIN',
          success: 'VERIFICATION EMAIL DISPATCHED',
        };
      default:
        return {};
    }
  };

  const themeContent = getThemeContent();

  return (
    <AppLayout title="Forgot Password - Desainwebku">
      <Head title="Forgot Password" />

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
            {/* Back to Login Link */}
            <Link
              href={route('login')}
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
              {themeContent.backToLogin}
            </Link>

            {/* Status Message */}
            {status && (
              <div
                className="mb-6 p-4 rounded-lg border animate-fade-in-up"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                }}
              >
                <div className="flex items-center">
                  {theme === 'cyber' && <FingerPrintIcon className="h-5 w-5 mr-2" />}
                  {theme === 'dark-corporate' && <ShieldCheckIcon className="h-5 w-5 mr-2" />}
                  {theme === 'startup' && <SparklesIcon className="h-5 w-5 mr-2" />}
                  <span className={`text-sm font-medium ${theme === 'cyber' ? 'font-mono' : ''}`}>
                    {themeContent.success}
                  </span>
                </div>
              </div>
            )}

            {/* Forgot Password Card */}
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
                  {theme === 'cyber' && <KeyIcon className="h-8 w-8 text-white" />}
                  {theme === 'startup' && <EnvelopeIcon className="h-8 w-8 text-white" />}
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
                {/* Email Field */}
                <div>
                  <InputLabel
                    htmlFor="email"
                    value={themeContent.emailLabel}
                    className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                  />
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon
                        className="h-5 w-5"
                        style={{ color: 'var(--color-text-muted)' }}
                      />
                    </div>
                    <TextInput
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      className="pl-10 block w-full"
                      isFocused={true}
                      onChange={(e) => setData('email', e.target.value)}
                      required
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                  <InputError message={errors.email} className="mt-2" />
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
                            {theme === 'cyber' ? 'SENDING...' : 'Sending...'}
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
                    SSL SECURED • ENCRYPTED CHANNEL
                  </span>
                </div>
              </div>
            )}

            {/* Help Text - Startup Theme */}
            {theme === 'startup' && (
              <div className="mt-6 text-center">
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  The reset link will expire in 60 minutes for security reasons.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}