import React from 'react';

export default function InputLabel({
  value,
  className = '',
  children,
  ...props
}) {
  return (
    <label
      {...props}
      className={`block text-sm font-medium mb-1 transition-theme ${className}`}
      style={{ color: 'var(--color-text-secondary)' }}
    >
      {value || children}
    </label>
  );
}