import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowRightIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  KeyIcon,
  CheckCircleIcon,
  FingerPrintIcon,
} from '@heroicons/react/24/outline';

export default function Register() {
  const [theme, setTheme] = useState('cyber');
  const [passwordStrength, setPasswordStrength] = useState(0);

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
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (data.password.length > 0) {
      if (data.password.length >= 8) strength += 25;
      if (data.password.match(/[a-z]/)) strength += 25;
      if (data.password.match(/[A-Z]/)) strength += 25;
      if (data.password.match(/[0-9]/)) strength += 25;
      if (data.password.match(/[^a-zA-Z0-9]/)) strength += 25;
    }
    setPasswordStrength(Math.min(strength, 100));
  }, [data.password]);

  // Get theme-specific content
  const getThemeContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          title: 'CREATE_ACCOUNT',
          subtitle: 'Initialize new user profile',
          nameLabel: 'USERNAME',
          emailLabel: 'EMAIL_ADDRESS',
          passwordLabel: 'PASSWORD',
          confirmLabel: 'CONFIRM_PASSWORD',
          registerButton: '$ CREATE_ACCOUNT',
          loginPrompt: 'Existing user?',
          loginLink: 'LOGIN',
          passwordStrength: 'PASSWORD_STRENGTH',
          weak: 'WEAK',
          fair: 'FAIR',
          good: 'GOOD',
          strong: 'STRONG',
          veryStrong: 'VERY_STRONG',
        };
      case 'startup':
        return {
          title: 'Create Account',
          subtitle: 'Get started with your free account',
          nameLabel: 'Full name',
          emailLabel: 'Email address',
          passwordLabel: 'Password',
          confirmLabel: 'Confirm password',
          registerButton: 'Sign up',
          loginPrompt: 'Already have an account?',
          loginLink: 'Sign in',
          passwordStrength: 'Password strength',
          weak: 'Weak',
          fair: 'Fair',
          good: 'Good',
          strong: 'Strong',
          veryStrong: 'Very strong',
        };
      case 'dark-corporate':
        return {
          title: 'REGISTER ACCOUNT',
          subtitle: 'Enterprise registration portal',
          nameLabel: 'FULL NAME',
          emailLabel: 'CORPORATE EMAIL',
          passwordLabel: 'PASSWORD',
          confirmLabel: 'CONFIRM PASSWORD',
          registerButton: 'REGISTER',
          loginPrompt: 'Already registered?',
          loginLink: 'SIGN IN',
          passwordStrength: 'SECURITY LEVEL',
          weak: 'LOW',
          fair: 'MODERATE',
          good: 'ACCEPTABLE',
          strong: 'HIGH',
          veryStrong: 'MAXIMUM',
        };
      default:
        return {};
    }
  };

  const themeContent = getThemeContent();

  // Get password strength color
  const getStrengthColor = () => {
    if (passwordStrength < 25) return '#ef4444';
    if (passwordStrength < 50) return '#f59e0b';
    if (passwordStrength < 75) return '#3b82f6';
    if (passwordStrength < 100) return '#10b981';
    return '#10b981';
  };

  // Get password strength text
  const getStrengthText = () => {
    if (passwordStrength < 25) return themeContent.weak;
    if (passwordStrength < 50) return themeContent.fair;
    if (passwordStrength < 75) return themeContent.good;
    if (passwordStrength < 100) return themeContent.strong;
    return themeContent.veryStrong;
  };

  return (
    <AppLayout title="Register - Desainwebku">
      <Head title="Register" />

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
            {/* Register Card */}
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
                  {theme === 'startup' && <UserPlusIcon className="h-8 w-8 text-white" />}
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

              {/* Form */}
              <form onSubmit={submit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <InputLabel
                    htmlFor="name"
                    value={themeContent.nameLabel}
                    className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                  />
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon
                        className="h-5 w-5"
                        style={{ color: 'var(--color-text-muted)' }}
                      />
                    </div>
                    <TextInput
                      id="name"
                      name="name"
                      value={data.name}
                      className="pl-10 block w-full"
                      autoComplete="name"
                      isFocused={true}
                      onChange={(e) => setData('name', e.target.value)}
                      required
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                  <InputError message={errors.name} className="mt-2" />
                </div>

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
                      autoComplete="username"
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
                      autoComplete="new-password"
                      onChange={(e) => setData('password', e.target.value)}
                      required
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {data.password.length > 0 && (
                    <div className="mt-3 space-y-2 animate-fade-in-up">
                      <div className="flex items-center justify-between">
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
                          {themeContent.passwordStrength}:
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            theme === 'cyber' ? 'font-mono' : ''
                          }`}
                          style={{ color: getStrengthColor() }}
                        >
                          {getStrengthText()}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300 rounded-full"
                          style={{
                            width: `${passwordStrength}%`,
                            background: `linear-gradient(90deg, ${getStrengthColor()}, ${getStrengthColor()}dd)`,
                          }}
                        ></div>
                      </div>
                      
                      {/* Password Requirements - Cyber Theme */}
                      {theme === 'cyber' && passwordStrength < 100 && (
                        <div className="mt-2 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                          <p className="text-xs font-mono mb-2" style={{ color: 'var(--color-text-muted)' }}>
                            REQUIREMENTS:
                          </p>
                          <ul className="space-y-1">
                            <li className="flex items-center text-xs font-mono">
                              <span style={{ color: data.password.length >= 8 ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                                {data.password.length >= 8 ? '✓' : '○'} MIN_8_CHARS
                              </span>
                            </li>
                            <li className="flex items-center text-xs font-mono">
                              <span style={{ color: data.password.match(/[a-z]/) ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                                {data.password.match(/[a-z]/) ? '✓' : '○'} LOWERCASE
                              </span>
                            </li>
                            <li className="flex items-center text-xs font-mono">
                              <span style={{ color: data.password.match(/[A-Z]/) ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                                {data.password.match(/[A-Z]/) ? '✓' : '○'} UPPERCASE
                              </span>
                            </li>
                            <li className="flex items-center text-xs font-mono">
                              <span style={{ color: data.password.match(/[0-9]/) ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                                {data.password.match(/[0-9]/) ? '✓' : '○'} NUMBER
                              </span>
                            </li>
                            <li className="flex items-center text-xs font-mono">
                              <span style={{ color: data.password.match(/[^a-zA-Z0-9]/) ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                                {data.password.match(/[^a-zA-Z0-9]/) ? '✓' : '○'} SPECIAL_CHAR
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <InputLabel
                    htmlFor="password_confirmation"
                    value={themeContent.confirmLabel}
                    className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                  />
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyIcon
                        className="h-5 w-5"
                        style={{ color: 'var(--color-text-muted)' }}
                      />
                    </div>
                    <TextInput
                      id="password_confirmation"
                      type="password"
                      name="password_confirmation"
                      value={data.password_confirmation}
                      className="pl-10 block w-full"
                      autoComplete="new-password"
                      onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                      }
                      required
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                  
                  {/* Password Match Indicator */}
                  {data.password && data.password_confirmation && (
                    <div className="mt-2 flex items-center">
                      {data.password === data.password_confirmation ? (
                        <>
                          <CheckCircleIcon
                            className="h-4 w-4 mr-1"
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
                            style={{ color: 'var(--color-primary)' }}
                          >
                            {theme === 'cyber' ? 'PASSWORDS_MATCH' : 'Passwords match'}
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            className="text-xs"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            {theme === 'cyber' ? 'PASSWORDS_DO_NOT_MATCH' : 'Passwords do not match'}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                  
                  <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Register Button */}
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
                            {theme === 'cyber' ? 'CREATING_ACCOUNT...' : 'Processing...'}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className={theme === 'cyber' ? 'font-mono' : ''}>
                            {themeContent.registerButton}
                          </span>
                          <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </span>
                  </PrimaryButton>
                </div>

                {/* Login Link */}
                <div
                  className="pt-4 text-center border-t"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {themeContent.loginPrompt}{' '}
                    <Link
                      href={route('login')}
                      className={`font-medium transition-colors hover:text-[var(--color-primary)] ${
                        theme === 'cyber'
                          ? 'font-mono'
                          : theme === 'dark-corporate'
                            ? 'uppercase tracking-wider'
                            : ''
                      }`}
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {themeContent.loginLink}
                      {theme === 'cyber' && ' >'}
                    </Link>
                  </p>
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
                    ENTERPRISE GRADE • SECURE REGISTRATION
                  </span>
                </div>
              </div>
            )}

            {/* Terms Badge - Startup Theme */}
            {theme === 'startup' && (
              <div className="mt-6 text-center">
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="hover:text-[var(--color-primary)] transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="hover:text-[var(--color-primary)] transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}