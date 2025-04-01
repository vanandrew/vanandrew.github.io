import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
}) => {
  const baseStyles = 'px-6 py-3 rounded-md font-medium transition-colors duration-200';
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'bg-transparent hover:bg-white hover:text-gray-900 text-white border-2 border-white',
  };
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
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
