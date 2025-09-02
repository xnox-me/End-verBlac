import React from 'react';

const Logo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src="https://i.imgur.com/gkfyyWy.png" 
        alt="DODODEX Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;