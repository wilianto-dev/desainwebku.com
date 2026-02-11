import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  CommandLineIcon,
  SparklesIcon,
  ShieldCheckIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function Contact() {
  const [theme, setTheme] = useState('cyber');
  
  // Use Inertia form handling
  const { data, setData, post, processing, errors, wasSuccessful } = useForm({
    name: '',
    email: '',
    message: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('contact.submit'));
  };

  // Get theme-specific content
  const getThemeContent = () => {
    switch (theme) {
      case 'cyber':
        return {
          title: 'CONTACT_TERMINAL',
          subtitle: 'Establish secure communication channel',
          nameLabel: 'YOUR_IDENTIFIER',
          emailLabel: 'CONTACT_EMAIL',
          messageLabel: 'TRANSMISSION_CONTENT',
          button: '$ SEND_TRANSMISSION',
          success: 'MESSAGE_TRANSMITTED',
          successDesc: 'Your transmission has been sent. Response time: < 1 hour',
          contactInfo: 'CONTACT_CHANNELS',
          phone: 'SECURE_LINE',
          email: 'DATA_STREAM',
          address: 'PHYSICAL_LOCATION',
          hours: 'OPERATIONAL_HOURS',
          weekday: 'MON-FRI: 09:00 - 18:00',
          weekend: 'SAT-SUN: EMERGENCY_ONLY',
        };
      case 'startup':
        return {
          title: 'Get in Touch',
          subtitle: "We'd love to hear from you",
          nameLabel: 'Your name',
          emailLabel: 'Email address',
          messageLabel: 'Your message',
          button: 'Send Message',
          success: 'Message sent!',
          successDesc: "Thank you for contacting us. We'll get back to you within 24 hours.",
          contactInfo: 'Contact Information',
          phone: 'Phone',
          email: 'Email',
          address: 'Office',
          hours: 'Business Hours',
          weekday: 'Monday - Friday: 9:00 AM - 6:00 PM',
          weekend: 'Saturday - Sunday: Closed',
        };
      case 'dark-corporate':
        return {
          title: 'CORPORATE CONTACT',
          subtitle: 'Enterprise communication portal',
          nameLabel: 'FULL NAME',
          emailLabel: 'CORPORATE EMAIL',
          messageLabel: 'INQUIRY DETAILS',
          button: 'SUBMIT INQUIRY',
          success: 'INQUIRY RECEIVED',
          successDesc: 'Your corporate inquiry has been logged. Priority response within 24 hours.',
          contactInfo: 'CORPORATE HEADQUARTERS',
          phone: 'DIRECT LINE',
          email: 'EXECUTIVE EMAIL',
          address: 'PRINCIPAL OFFICE',
          hours: 'BUSINESS HOURS',
          weekday: 'MON-FRI: 09:00 - 18:00 GMT+7',
          weekend: 'SAT-SUN: EXECUTIVE EMERGENCY',
        };
      default:
        return {};
    }
  };

  const themeContent = getThemeContent();

  return (
    <AppLayout title="Contact - Desainwebku">
      <Head title="Contact" />

      {/* Hero Section - Theme Specific */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden transition-theme">
        {/* Theme-specific backgrounds */}
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
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center px-4 py-2 rounded-full border mb-6 animate-fade-in-up"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-bg-card)',
              }}
            >
              {theme === 'cyber' && <CommandLineIcon className="h-5 w-5 mr-2" />}
              {theme === 'startup' && <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />}
              {theme === 'dark-corporate' && <ShieldCheckIcon className="h-5 w-5 mr-2" />}
              <span
                className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
              >
                {themeContent.title}
              </span>
              {theme === 'cyber' && (
                <span
                  className="w-2 h-2 rounded-full ml-2 animate-pulse"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                ></span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-200">
              <span className="text-gradient">{themeContent.subtitle}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
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
                <h3
                  className={`text-xl font-bold mb-6 ${
                    theme === 'cyber'
                      ? 'font-mono'
                      : theme === 'dark-corporate'
                        ? 'uppercase tracking-wider'
                        : ''
                  }`}
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {theme === 'cyber' ? 'NEW_TRANSMISSION' : 'Send Message'}
                </h3>

                {wasSuccessful ? (
                  <div className="text-center py-8">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <CheckCircleIcon className="h-8 w-8 text-white" />
                    </div>
                    <h4
                      className={`text-lg font-bold mb-2 ${
                        theme === 'cyber' ? 'font-mono' : ''
                      }`}
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {themeContent.success}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {themeContent.successDesc}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <InputLabel
                        htmlFor="name"
                        value={themeContent.nameLabel}
                        className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                      />
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <TextInput
                          id="name"
                          name="name"
                          type="text"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          className="pl-10 block w-full"
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
                          <EnvelopeIcon className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
                        </div>
                        <TextInput
                          id="email"
                          name="email"
                          type="email"
                          value={data.email}
                          onChange={(e) => setData('email', e.target.value)}
                          className="pl-10 block w-full"
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

                    {/* Message Field */}
                    <div>
                      <InputLabel
                        htmlFor="message"
                        value={themeContent.messageLabel}
                        className={theme === 'cyber' ? 'font-mono text-xs' : theme === 'dark-corporate' ? 'uppercase tracking-wider text-xs' : ''}
                      />
                      <div className="relative mt-1">
                        <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                          <svg className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          value={data.message}
                          onChange={(e) => setData('message', e.target.value)}
                          className="pl-10 block w-full rounded-lg border px-4 py-2.5 text-sm transition-theme focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                          required
                          style={{
                            backgroundColor: 'var(--color-bg-primary)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-primary)',
                          }}
                        ></textarea>
                      </div>
                      <InputError message={errors.message} className="mt-2" />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
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
                              <PaperAirplaneIcon className="ml-2 h-5 w-5 rotate-45" />
                            </>
                          )}
                        </span>
                      </PrimaryButton>
                    </div>
                  </form>
                )}

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

            {/* Contact Information */}
            <div className="animate-fade-in-up animation-delay-200">
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
                  className={`text-xl font-bold mb-6 ${
                    theme === 'cyber'
                      ? 'font-mono'
                      : theme === 'dark-corporate'
                        ? 'uppercase tracking-wider'
                        : ''
                  }`}
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {themeContent.contactInfo}
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <PhoneIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme === 'cyber'
                            ? 'font-mono'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider'
                              : ''
                        }`}
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {themeContent.phone}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        +62 812-3456-7890
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <EnvelopeIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme === 'cyber'
                            ? 'font-mono'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider'
                              : ''
                        }`}
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {themeContent.email}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        hello@desainwebku.com
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <MapPinIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme === 'cyber'
                            ? 'font-mono'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider'
                              : ''
                        }`}
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {themeContent.address}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        Jakarta, Indonesia
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <ClockIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme === 'cyber'
                            ? 'font-mono'
                            : theme === 'dark-corporate'
                              ? 'uppercase tracking-wider'
                              : ''
                        }`}
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {themeContent.hours}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                        {themeContent.weekday}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {themeContent.weekend}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links Placeholder */}
                <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <p
                    className={`text-sm font-medium mb-3 ${
                      theme === 'cyber'
                        ? 'font-mono'
                        : theme === 'dark-corporate'
                          ? 'uppercase tracking-wider'
                          : ''
                    }`}
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {theme === 'cyber' ? 'SOCIAL_CHANNELS' : 'Follow Us'}
                  </p>
                  <div className="flex space-x-4">
                    {['G', 'L', 'T', 'F'].map((social, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: 'var(--color-bg-secondary)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        <span className={`text-sm font-bold ${theme === 'cyber' ? 'font-mono' : ''}`}>
                          {social}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Optional */}
      <section
        className="py-12 transition-theme"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderTopWidth: '1px',
          borderTopColor: 'var(--color-border)',
        }}
      >
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full border mb-6"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
            >
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span
                className={`text-sm font-medium ${theme === 'dark-corporate' ? 'uppercase tracking-wider' : ''}`}
              >
                {theme === 'cyber' ? 'PHYSICAL_LOCATION' : 'Our Location'}
              </span>
            </div>
            <div
              className="h-64 rounded-xl overflow-hidden border"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {theme === 'cyber'
                    ? 'MAP_INTERFACE_LOADING...'
                    : 'Interactive map will be displayed here'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}