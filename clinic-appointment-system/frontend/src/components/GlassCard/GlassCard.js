import React from 'react';
import '../../styles/glassmorphism.css';

const GlassCard = ({ children, className = '', style = {} }) => {
  return (
    <div className={`glass-card-dark ${className}`} style={style}>
      {children}
    </div>
  );
};

export default GlassCard;
