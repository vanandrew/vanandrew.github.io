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
    primary: 'apple-button-primary',
    secondary: 'apple-button-secondary',
    outline: 'apple-button bg-transparent text-apple-blue border border-apple-blue hover:bg-apple-blue/10',
  };
  
  const buttonStyles = `${sizeStyles[size]} ${variantStyles[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
