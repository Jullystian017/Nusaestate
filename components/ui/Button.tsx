import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-brand-blue text-white-pure hover:bg-brand-blue-hover shadow-soft hover:shadow-md h-12',
    outline: 'border border-border-line/60 bg-transparent text-text-dark hover:bg-surface-gray h-12',
    ghost: 'bg-transparent text-text-gray hover:text-text-dark hover:bg-surface-gray h-10 px-4',
    white: 'bg-white-pure text-brand-blue border border-border-line/50 hover:bg-gray-50 shadow-soft h-12',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={18} strokeWidth={2} />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
