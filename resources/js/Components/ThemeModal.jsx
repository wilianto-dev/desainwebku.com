import React, { useState, useEffect } from 'react';
import {
  XMarkIcon,
  CheckCircleIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function ThemeModal({ isOpen, onClose, onSelectTheme, currentTheme }) {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'cyber');

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const themes = [
    {
      id: 'cyber',
      name: 'cyber',
      icon: ComputerDesktopIcon,
      description:
        'Matrix-inspired theme with terminal aesthetics, green accents, and cyberpunk vibes.',
      preview: {
        primary: '#00ff41',
        secondary: '#00cccc',
        bg: '#0a0a0a',
        text: '#e5e5e5',
      },
      features: ['Terminal typing effects', 'Matrix scanlines', 'Glitch animations', 'Mono font'],
    },
    {
      id: 'startup',
      name: 'startup',
      icon: PaintBrushIcon,
      description:
        'Clean, modern, and professional theme perfect for tech startups and SaaS companies.',
      preview: {
        primary: '#2563eb',
        secondary: '#38bdf8',
        bg: '#f8fafc',
        text: '#0f172a',
      },
      features: ['Clean gradients', 'Smooth animations', 'Rounded cards', 'Modern typography'],
    },
    {
      id: 'dark-corporate',
      name: 'corporate',
      icon: ShieldCheckIcon,
      description: 'Dark, premium theme with blue accents, designed for enterprise and corporate.',
      preview: {
        primary: '#3b82f6',
        secondary: '#6366f1',
        bg: '#0b0f19',
        text: '#ffffff',
      },
      features: ['Premium dark mode', 'Elegant transitions', 'Subtle glows', 'corporate styling'],
    },
  ];

  const handleSelectTheme = (themeId) => {
    setSelectedTheme(themeId);
  };

  const handleApplyTheme = () => {
    onSelectTheme(selectedTheme);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg transition-colors hover:bg-[var(--color-bg-secondary)]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">🎨 Pilih Tema Favorit Anda</h2>
          <p className="modal-subtitle">
            Sesuaikan tampilan website dengan preferensi Anda. Tema dapat diganti kapan saja melalui
            dropdown di navbar.
          </p>
        </div>

        {/* Theme selection grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {themes.map((theme) => {
            const ThemeIcon = theme.icon;
            const isSelected = selectedTheme === theme.id;

            return (
              <div
                key={theme.id}
                className={`theme-preview-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectTheme(theme.id)}
                style={{
                  backgroundColor: theme.preview.bg,
                  borderColor: isSelected ? theme.preview.primary : 'var(--color-border)',
                }}
              >
                {/* Preview header */}
                <div className="theme-preview-header">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${theme.preview.primary} 0%, ${theme.preview.secondary} 100%)`,
                    }}
                  >
                    <ThemeIcon className="h-5 w-5 text-white" />
                  </div>
                  {isSelected && (
                    <div className="theme-preview-badge">
                      <CheckCircleIcon className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Preview content */}
                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    color: theme.preview.text,
                    fontFamily:
                      theme.id === 'cyber'
                        ? 'JetBrains Mono, monospace'
                        : theme.id === 'startup'
                          ? 'Inter, sans-serif'
                          : 'Figtree, sans-serif',
                  }}
                >
                  {theme.name}
                </h3>

                <p
                  className="text-sm mb-4"
                  style={{
                    color:
                      theme.id === 'startup'
                        ? '#334155'
                        : theme.id === 'dark-corporate'
                          ? '#e5e7eb'
                          : '#a0a0a0',
                  }}
                >
                  {theme.description}
                </p>

                {/* Preview elements */}
                <div className="space-y-2 mb-4">
                  <div
                    className="h-2 rounded-full w-3/4"
                    style={{
                      background: `linear-gradient(135deg, ${theme.preview.primary} 0%, ${theme.preview.secondary} 100%)`,
                    }}
                  ></div>
                  <div
                    className="h-2 rounded-full w-1/2"
                    style={{ backgroundColor: 'var(--color-border)' }}
                  ></div>
                  <div className="flex space-x-2">
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: theme.preview.primary,
                        color:
                          theme.id === 'startup'
                            ? 'white'
                            : theme.id === 'dark-corporate'
                              ? '#0b0f19'
                              : 'black',
                      }}
                    >
                      Button
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded border"
                      style={{ borderColor: theme.preview.primary }}
                    >
                      Outline
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-1.5">
                  {theme.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-xs"
                      style={{ color: theme.id === 'startup' ? '#64748b' : '#9ca3af' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mr-2"
                        style={{ backgroundColor: theme.preview.primary }}
                      ></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div
          className="flex flex-col sm:flex-row justify-end items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <button onClick={onClose} className="btn-secondary w-full sm:w-auto">
            Nanti Saja
          </button>
          <button onClick={handleApplyTheme} className="btn-primary w-full sm:w-auto">
            <span className="flex items-center justify-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Terapkan Tema {themes.find((t) => t.id === selectedTheme)?.name}
            </span>
          </button>
        </div>

        {/* Footer note */}
        <p className="text-xs mt-4 text-center" style={{ color: 'var(--color-text-muted)' }}>
          Pilihan Anda akan disimpan dan tidak akan muncul lagi pada kunjungan berikutnya. Anda
          dapat mengganti tema kapan saja melalui menu dropdown di pojok kanan atas.
        </p>
      </div>
    </div>
  );
}
