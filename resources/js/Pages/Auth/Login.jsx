import React, { useState, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  FingerPrintIcon,
  KeyIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ServerIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  UsersIcon,
  CheckCircleIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';
import { SiLaravel, SiReact, SiTailwindcss, SiInertia, SiMysql, SiDocker } from 'react-icons/si';

export default function Login({ status, canResetPassword }) {
  const [theme, setTheme] = useState('cyber');
  const [activeFeature, setActiveFeature] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

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

  // Rotate features for desktop display
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect for cyber theme
  useEffect(() => {
    if (theme === 'cyber') {
      const codeSnippet = '> access_granted = authenticate(user, pass);\n> if (access_granted) {\n>>   console.log("Welcome back!");\n>>   redirect("/dashboard");\n> } else {\n>>   console.log("Access denied");\n> }';
      
      if (typingIndex < codeSnippet.length) {
        const timeout = setTimeout(() => {
          setTypingText((prev) => prev + codeSnippet[typingIndex]);
          setTypingIndex((prev) => prev + 1);
        }, 30);
        return () => clearTimeout(timeout);
      }
    } else {
      setTypingText('');
      setTypingIndex(0);
    }
  }, [typingIndex, theme]);

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post('/login', {
      onFinish: () => reset('password'),
    });
  };

  // Features for startup theme
  const features = [
    { icon: RocketLaunchIcon, title: 'Fast Performance', desc: 'Lightning fast load times' },
    { icon: ShieldCheckIcon, title: 'Secure Platform', desc: 'Enterprise-grade security' },
    { icon: UsersIcon, title: 'User Friendly', desc: 'Intuitive interface' },
    { icon: ChartBarIcon, title: 'Analytics', desc: 'Track your progress' },
  ];

  // Tech stack for corporate theme
  const techStack = [
    { icon: SiLaravel, name: 'Laravel', color: '#FF2D20' },
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiInertia, name: 'Inertia', color: '#9553E9' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#38BDF8' },
    { icon: SiMysql, name: 'MySQL', color: '#00758F' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  ];

  // Stats for corporate theme
  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
    { value: '500+', label: 'Clients' },
    { value: '10+', label: 'Years' },
  ];

  // Get theme-specific content
  const getThemeContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          title: 'AUTHENTICATION_REQUIRED',
          subtitle: 'Enter credentials to access system',
          emailLabel: 'USER_EMAIL',
          passwordLabel: 'PASSWORD',
          rememberLabel: 'REMEMBER_TERMINAL',
          forgotPassword: 'RECOVER_ACCESS',
          loginButton: '$ LOGIN',
          registerPrompt: 'No account?',
          registerLink: 'CREATE_ONE',
          status: 'ACCESS_ATTEMPT',
        };
      case 'startup':
        return {
          title: 'Welcome Back',
          subtitle: 'Sign in to your account to continue',
          emailLabel: 'Email address',
          passwordLabel: 'Password',
          rememberLabel: 'Remember me',
          forgotPassword: 'Forgot your password?',
          loginButton: 'Sign in',
          registerPrompt: "Don't have an account?",
          registerLink: 'Sign up',
          status: 'Login Status',
        };
      case 'dark-corporate':
        return {
          title: 'CORPORATE ACCESS',
          subtitle: 'Secure authentication required',
          emailLabel: 'CORPORATE EMAIL',
          passwordLabel: 'PASSWORD',
          rememberLabel: 'REMEMBER DEVICE',
          forgotPassword: 'RESET CREDENTIALS',
          loginButton: 'AUTHENTICATE',
          registerPrompt: 'New user?',
          registerLink: 'REQUEST ACCESS',
          status: 'VERIFICATION REQUIRED',
        };
      default:
        return {
          title: 'Login',
          subtitle: 'Sign in to your account',
          emailLabel: 'Email',
          passwordLabel: 'Password',
          rememberLabel: 'Remember me',
          forgotPassword: 'Forgot password?',
          loginButton: 'Login',
          registerPrompt: "Don't have an account?",
          registerLink: 'Register',
          status: 'Status',
        };
    }
  };

  const themeContent = getThemeContent();

  return (
    <AppLayout title="Login - Desainwebku">
      <Head title="Log in" />

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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Login Form */}
            <div className="max-w-md mx-auto lg:mx-0 w-full">
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
                      {status}
                    </span>
                  </div>
                </div>
              )}

              {/* Login Card */}
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
                    {theme === 'startup' && <SparklesIcon className="h-8 w-8 text-white" />}
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
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                        }}
                      />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        style={{
                          color: 'var(--color-primary)',
                          borderColor: 'var(--color-border)',
                        }}
                      />
                      <span
                        className={`ml-2 text-sm ${
                          theme === 'cyber'
                            ? 'font-mono text-xs'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider text-xs'
                              : ''
                        }`}
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {themeContent.rememberLabel}
                      </span>
                    </label>

                    {canResetPassword && (
                      <Link
                        href="/forgot-password"
                        className={`text-sm transition-colors hover:text-[var(--color-primary)] ${
                          theme === 'cyber'
                            ? 'font-mono text-xs'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider text-xs'
                              : ''
                        }`}
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {themeContent.forgotPassword}
                      </Link>
                    )}
                  </div>

                  {/* Login Button */}
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
                            {theme === 'cyber' ? 'AUTHENTICATING...' : 'Processing...'}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className={theme === 'cyber' ? 'font-mono' : ''}>
                            {themeContent.loginButton}
                          </span>
                          <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </span>
                  </PrimaryButton>

                  {/* Register Link */}
                  <div
                    className="pt-4 text-center border-t"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <p
                      className="text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {themeContent.registerPrompt}{' '}
                      <Link
                        href="/register"
                        className={`font-medium transition-colors hover:text-[var(--color-primary)] ${
                          theme === 'cyber'
                            ? 'font-mono'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider'
                              : ''
                        }`}
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {themeContent.registerLink}
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
            </div>

            {/* Right Column - Visual Elements (Desktop Only) */}
            <div className="hidden lg:block animate-fade-in-up animation-delay-200">
              {/* Cyber Theme */}
              {theme === 'cyber' && (
                <div className="space-y-6">
                  {/* Terminal Window */}
                  <div
                    className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 font-mono text-sm"
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
                        authentication@desainwebku:~/system
                      </span>
                    </div>
                    <pre
                      className="whitespace-pre-wrap text-sm h-48 overflow-y-auto"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {typingText}
                      <span
                        className="border-r-2 animate-pulse ml-1"
                        style={{ borderColor: 'var(--color-primary)' }}
                      >
                        █
                      </span>
                    </pre>
                  </div>

                  {/* Security Badges */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 text-center">
                      <ShieldCheckIcon className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                      <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        ENCRYPTION: AES-256
                      </p>
                    </div>
                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 text-center">
                      <FingerPrintIcon className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                      <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        2FA AVAILABLE
                      </p>
                    </div>
                  </div>

                  {/* Matrix-like effect */}
                  <div className="relative h-32 overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
                    <p className="text-xs font-mono" style={{ color: 'var(--color-primary)' }}>
                      {`> System secure • Firewall active • 0 threats detected`}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] to-transparent"></div>
                  </div>
                </div>
              )}

              {/* Startup Theme */}
              {theme === 'startup' && (
                <div className="space-y-8">
                  {/* Feature Showcase */}
                  <div className="relative h-64">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      const isActive = index === activeFeature;
                      
                      return (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-500 transform ${
                            isActive
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 translate-x-8'
                          }`}
                        >
                          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                              <Icon className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600">
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Feature Indicators */}
                  <div className="flex justify-center space-x-2">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeFeature
                            ? 'w-8 bg-blue-600'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-4">
                      "The platform has transformed how we manage our business. Incredible experience!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        JD
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">CEO, TechStart Inc.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dark Corporate Theme */}
              {theme === 'dark-corporate' && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6 text-center hover:border-[var(--color-primary)] transition-colors"
                      >
                        <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                          {stat.value}
                        </p>
                        <p className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6">
                    <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                      ENTERPRISE TECHNOLOGY STACK
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {techStack.map((tech, index) => {
                        const Icon = tech.icon;
                        return (
                          <div key={index} className="text-center">
                            <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: tech.color }} />
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                              {tech.name}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Security Metrics */}
                  <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Security Compliance
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                        ISO 27001
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full w-full"
                        style={{ background: 'var(--gradient-primary)', width: '100%' }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Encryption
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                        AES-256-GCM
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full w-full"
                        style={{ background: 'var(--gradient-primary)', width: '100%' }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Data Centers
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                        3 Regions
                      </span>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div className="flex items-center justify-center space-x-4 p-4 border border-[var(--color-border)]">
                    <ShieldCheckIcon className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                      SOC2 Type II Certified
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}