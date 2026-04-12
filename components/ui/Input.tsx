import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 flex flex-col">
        <label className="text-xs font-medium text-text-gray uppercase tracking-widest pl-1">
          {label}
        </label>
        <div className="relative group">
          {Icon && (
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-text-gray/50 group-focus-within:text-brand-blue'}`}>
              <Icon size={18} strokeWidth={1.5} />
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full py-3 ${Icon ? 'pl-11' : 'pl-4'} pr-4 
              bg-white border text-sm font-medium text-text-dark rounded-xl
              transition-all duration-300 outline-none
              ${error 
                ? 'border-red-200 focus:border-red-400 focus:ring-4 focus:ring-red-50' 
                : 'border-border-line/60 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5'}
              placeholder:text-text-gray/30
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[11px] text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
