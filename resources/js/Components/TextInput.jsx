// Components/TextInput.jsx
import React from 'react';

export default function TextInput({
  type = 'text',
  className = '',
  isFocused = false,
  style,
  ...props
}) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      className={
        'rounded-lg border px-4 py-2.5 text-sm transition-theme focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ' +
        className
      }
      ref={inputRef}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-primary)',
        ...style,
      }}
    />
  );
}

// Components/InputLabel.jsx


// Components/Checkbox.jsx


// Components/PrimaryButton.jsx
