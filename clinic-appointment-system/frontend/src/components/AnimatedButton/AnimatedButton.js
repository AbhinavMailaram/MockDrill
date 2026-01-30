import React from 'react';
import '../../styles/animations.css';
import '../../styles/glassmorphism.css';

const AnimatedButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false,
  variant = 'primary' 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700';
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return 'glass-button';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getVariantClass()} hover-lift ${className}`}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
