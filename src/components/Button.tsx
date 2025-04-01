import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
};

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  size = 'medium',
}) => {
  const sizeStyles = {
    small: 'text-sm px-4 py-1.5',
    medium: 'text-base px-5 py-2',
    large: 'text-lg px-6 py-2.5',
  };
  
  const variantStyles = {
    primary: 'bg-mono-black text-mono-white hover:bg-mono-darkgray',
    secondary: 'bg-mono-white text-mono-black border border-mono-black hover:bg-mono-offwhite',
    text: 'bg-transparent text-mono-black hover:underline',
  };
  
  // Base styles with minimal design
  const baseStyles = `font-light transition-all duration-300 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        <span className="relative">
          {children}
        </span>
      </Link>
    );
  }
  
  return (
    <button className={baseStyles} onClick={onClick}>
      <span className="relative">
        {children}
      </span>
    </button>
  );
};

export default Button;
