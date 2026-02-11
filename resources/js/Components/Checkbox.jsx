import React from 'react';

export default function Checkbox({ className = '', style, ...props }) {
  return (
    <input
      type="checkbox"
      className={
        'rounded border transition-theme focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-0 focus:ring-offset-transparent focus:border-transparent ' +
        className
      }
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-primary)',
        ...style,
      }}
      {...props}
    />
  );
}