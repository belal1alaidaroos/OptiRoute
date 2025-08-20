import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = ({ 
  icon, 
  label, 
  variant = 'primary',
  onClick,
  disabled = false
}) => {
  const buttonClass = `btn btn-${variant} ${disabled ? 'disabled' : ''}`;
  
  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      <i className={`fas fa-${icon}`} /> {label}
    </button>
  );
};

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default ActionButton;