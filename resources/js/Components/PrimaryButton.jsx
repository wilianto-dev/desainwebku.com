import React from 'react';

export default function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        'btn-primary inline-flex items-center px-4 py-2 border border-transparent font-semibold text-xs uppercase tracking-widest transition-theme disabled:opacity-50 ' +
        className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}