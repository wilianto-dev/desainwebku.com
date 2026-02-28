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
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ServerIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  UsersIcon,
  CpuChipIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { SiLaravel, SiReact, SiTailwindcss, SiInertia, SiMysql, SiDocker, SiVuedotjs, SiPhp } from 'react-icons/si';

export default function Register() {
  const [theme, setTheme] = useState('cyber');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  // FORM HOOK - MUST BE DECLARED BEFORE ANY useEffect THAT USES data
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

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

  // Rotate benefits for startup theme
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  // Typing effect for cyber theme - Now after data is defined
  useEffect(() => {
    if (theme === 'cyber') {
      const codeSnippet = `> const newUser = {
>>   name: "${data.name || 'username'}",
>>   email: "${data.email || 'user@example.com'}",
>>   password: "********",
>>   created_at: new Date(),
>>   status: "active"
>> };
> 
> // Validating credentials...
> if (validatePassword(password)) {
>>   // Creating secure hash...
>>   const hash = bcrypt.hashSync(password, 10);
>>   // Storing in database...
>>   db.users.insert(newUser);
>>   console.log("Account created successfully!");
> } else {
>>   console.log("Password too weak");
> }`;
      
      if (typingIndex < codeSnippet.length) {
        const timeout = setTimeout(() => {
          setTypingText((prev) => prev + codeSnippet[typingIndex]);
          setTypingIndex((prev) => prev + 1);
        }, 20);
        return () => clearTimeout(timeout);
      }
    } else {
      setTypingText('');
      setTypingIndex(0);
    }
  }, [typingIndex, theme, data.name, data.email]); // Now data is defined

  const submit = (e) => {
    e.preventDefault();
    post('/register', {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  // Benefits for startup theme
  const benefits = [
    { icon: RocketLaunchIcon, title: 'Fast Onboarding', desc: 'Get started in minutes' },
    { icon: ShieldCheckIcon, title: 'Secure Platform', desc: 'Enterprise-grade security' },
    { icon: UsersIcon, title: 'Community Access', desc: 'Join 10,000+ developers' },
    { icon: ChartBarIcon, title: 'Analytics', desc: 'Track your progress' },
    { icon: AcademicCapIcon, title: 'Learning Resources', desc: 'Tutorials & guides' },
    { icon: BriefcaseIcon, title: 'Job Opportunities', desc: 'Connect with employers' },
  ];

  // Tech stack for corporate theme
  const techStack = [
    { icon: SiLaravel, name: 'Laravel', color: '#FF2D20' },
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiInertia, name: 'Inertia', color: '#9553E9' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#38BDF8' },
    { icon: SiMysql, name: 'MySQL', color: '#00758F' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiVuedotjs, name: 'Vue.js', color: '#4FC08D' },
    { icon: SiPhp, name: 'PHP', color: '#777BB4' },
  ];

  // Stats for corporate theme
  const stats = [
    { value: '10,000+', label: 'Developers' },
    { value: '5,000+', label: 'Projects' },
    { value: '50+', label: 'Countries' },
    { value: '24/7', label: 'Support' },
  ];

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
        return {
          title: 'Register',
          subtitle: 'Create a new account',
          nameLabel: 'Name',
          emailLabel: 'Email',
          passwordLabel: 'Password',
          confirmLabel: 'Confirm Password',
          registerButton: 'Register',
          loginPrompt: 'Already have an account?',
          loginLink: 'Login',
          passwordStrength: 'Password strength',
          weak: 'Weak',
          fair: 'Fair',
          good: 'Good',
          strong: 'Strong',
          veryStrong: 'Very Strong',
        };
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Register Form */}
            <div className="max-w-md mx-auto lg:mx-0 w-full">
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
                        href="/login"
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
                        registration@desainwebku:~/system
                      </span>
                    </div>
                    <pre
                      className="whitespace-pre-wrap text-xs h-64 overflow-y-auto"
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

                  {/* Security Features */}
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
                        BIOMETRIC READY
                      </p>
                    </div>
                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 text-center">
                      <LockClosedIcon className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                      <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        2FA SUPPORT
                      </p>
                    </div>
                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] p-4 text-center">
                      <KeyIcon className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
                      <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        PASSWORD HASHING
                      </p>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        SYSTEM STATUS:
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'var(--color-primary)' }}>
                        ONLINE
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        DATABASE:
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'var(--color-primary)' }}>
                        CONNECTED
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        ENCRYPTION:
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'var(--color-primary)' }}>
                        ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Startup Theme */}
              {theme === 'startup' && (
                <div className="space-y-8">
                  {/* Benefits Carousel */}
                  <div className="relative h-72">
                    {benefits.map((benefit, index) => {
                      const Icon = benefit.icon;
                      const isActive = index === activeBenefit;
                      
                      return (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-500 transform ${
                            isActive
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 translate-x-8'
                          }`}
                        >
                          <div className="bg-white rounded-2xl shadow-xl p-8 text-center h-full flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                              <Icon className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              {benefit.title}
                            </h3>
                            <p className="text-gray-600">
                              {benefit.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Benefit Indicators */}
                  <div className="flex justify-center space-x-2">
                    {benefits.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveBenefit(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeBenefit
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
                      "The registration process was smooth and I was able to start building my project in minutes!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        AS
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-gray-900">Alex Smith</p>
                        <p className="text-sm text-gray-500">Full Stack Developer</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">10k+</p>
                      <p className="text-xs text-gray-500">Users</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">5min</p>
                      <p className="text-xs text-gray-500">Setup</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">24/7</p>
                      <p className="text-xs text-gray-500">Support</p>
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
                    <div className="grid grid-cols-4 gap-4">
                      {techStack.map((tech, index) => {
                        const Icon = tech.icon;
                        return (
                          <div key={index} className="text-center">
                            <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: tech.color }} />
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
                        Data Encryption
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

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        Compliance
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                        GDPR & CCPA
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
                        Uptime SLA
                      </span>
                      <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                        99.99%
                      </span>
                    </div>
                  </div>

                  {/* Enterprise Features */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center p-3 border border-[var(--color-border)]">
                      <CheckCircleIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        SSO Integration
                      </span>
                    </div>
                    <div className="flex items-center p-3 border border-[var(--color-border)]">
                      <CheckCircleIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Audit Logs
                      </span>
                    </div>
                    <div className="flex items-center p-3 border border-[var(--color-border)]">
                      <CheckCircleIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Role Based Access
                      </span>
                    </div>
                    <div className="flex items-center p-3 border border-[var(--color-border)]">
                      <CheckCircleIcon className="h-4 w-4 mr-2" style={{ color: 'var(--color-primary)' }} />
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        API Access
                      </span>
                    </div>
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