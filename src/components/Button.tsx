import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[#2EA7E0] hover:bg-[#2596c9] text-white shadow-lg shadow-[#2EA7E0]/30 hover:shadow-xl hover:shadow-[#2EA7E0]/40',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-md hover:shadow-lg',
    outline: 'border-2 border-[#2EA7E0] text-[#2EA7E0] hover:bg-[#2EA7E0] hover:text-white shadow-md hover:shadow-lg',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm h-[36px]',
    md: 'px-6 py-3 text-base h-[44px]',
    lg: 'px-8 py-4 text-lg h-[60px]',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
