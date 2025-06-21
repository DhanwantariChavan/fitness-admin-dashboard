import React from 'react';
import './Card.css';

const Card = ({ 
  title, 
  children, 
  className = '', 
  onClick,
  icon,
  value,
  subtitle 
}) => {
  return (
    <div 
      className={`card ${className} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      {title && (
        <div className="card-header">
          {icon && <span className="card-icon">{icon}</span>}
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      
      <div className="card-content">
        {value && <div className="card-value">{value}</div>}
        {subtitle && <div className="card-subtitle">{subtitle}</div>}
        {children}
      </div>
    </div>
  );
};

export default Card;