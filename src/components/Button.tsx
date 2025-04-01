import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
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
    small: 'text-xs px-4 py-1.5',
    medium: 'text-sm px-5 py-2',
    large: 'text-base px-6 py-2.5',
  };
  
  const variantStyles = {
    primary: 'bg-apple-accent text-black hover:bg-white',
    secondary: 'bg-apple-darkgray text-white hover:bg-black',
    outline: 'bg-transparent text-apple-accent border border-apple-accent hover:bg-apple-accent/10',
  };
  
  // Base styles with asymmetric border radius
  const baseStyles = `font-light rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm transition-all duration-300 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  
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
        {/* Decorative element for asymmetry */}
        {variant === 'primary' && (
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-apple-secondary rounded-full"></span>
        )}
      </span>
    </button>
  );
};

export default Button;
