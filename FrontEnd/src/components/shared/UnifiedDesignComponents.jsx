import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  PlusIcon,
  SearchIcon,
  WrenchIcon,
  TrashIcon,
  EyeIcon,
  XIcon,
  MailIcon,
  PhoneIcon,
  CheckIcon,
  ExclamationIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '../icons/SVGIcons';

// Theme constants
const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    light: '#F3F4F6',
    dark: '#1F2937'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px'
  }
};

/**
 * Unified Page Container Component
 * @param {ReactNode} children - Child components
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 */
export const PageContainer = ({ children, className, style }) => (
  <div 
    className={className}
    style={{ 
      padding: theme.spacing.large, 
      background: '#F9FAFB', 
      minHeight: '100vh',
      ...style 
    }}
  >
    {children}
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

/**
 * Unified Page Header Component
 * @param {string} title - Header title
 * @param {string} subtitle - Header subtitle
 * @param {object} actions - Additional header actions
 */
export const PageHeader = memo(({ title, subtitle, actions }) => (
  <div style={{ 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
    flexWrap: 'wrap',
    gap: theme.spacing.medium
  }}>
    <div>
      <h1 style={{ 
        margin: '0 0 8px 0', 
        fontSize: '28px', 
        fontWeight: '700', 
        color: theme.colors.dark 
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ 
          margin: 0, 
          color: '#6B7280', 
          fontSize: '16px' 
        }}>
          {subtitle}
        </p>
      )}
    </div>
    {actions && <div>{actions}</div>}
  </div>
));

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actions: PropTypes.node
};

/**
 * Unified Statistics Card Component
 * @param {string} title - Card title
 * @param {string|number} value - Display value
 * @param {ReactComponent} icon - Icon component
 * @param {string} color - Text color
 * @param {string} gradient - Background gradient for icon
 * @param {string} trend - Trend value (up/down)
 */
export const StatCard = memo(({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  gradient, 
  trend,
  trendValue 
}) => (
  <div style={{
    background: 'white',
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.large,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB',
    height: '100%'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <p style={{ 
          margin: '0 0 4px 0', 
          fontSize: '14px', 
          color: '#6B7280', 
          fontWeight: '500' 
        }}>
          {title}
        </p>
        <p style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: '700', 
          color: color || theme.colors.dark 
        }}>
          {value}
        </p>
        {trend && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: theme.spacing.small,
            color: trend === 'up' ? theme.colors.success : theme.colors.danger,
            fontSize: '12px'
          }}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </div>
        )}
      </div>
      <div style={{
        width: '48px',
        height: '48px',
        background: gradient || `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        borderRadius: theme.borderRadius.medium,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={24} color="white" />
      </div>
    </div>
  </div>
));

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string,
  gradient: PropTypes.string,
  trend: PropTypes.oneOf(['up', 'down']),
  trendValue: PropTypes.string
};

/**
 * Unified Statistics Grid Component
 * @param {ReactNode} children - Child components
 * @param {number} minWidth - Minimum width of each card
 */
export const StatsGrid = memo(({ children, minWidth = 250 }) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`, 
    gap: theme.spacing.medium, 
    marginBottom: theme.spacing.large 
  }}>
    {children}
  </div>
));

StatsGrid.propTypes = {
  children: PropTypes.node,
  minWidth: PropTypes.number
};

/**
 * Unified Controls Bar Component
 * @param {string} searchValue - Search input value
 * @param {function} onSearchChange - Search change handler
 * @param {function} onAddClick - Add button click handler
 * @param {string} addButtonText - Add button text
 * @param {string} searchPlaceholder - Search placeholder text
 * @param {ReactNode} additionalControls - Additional control components
 */
export const ControlsBar = memo(({ 
  searchValue, 
  onSearchChange, 
  onAddClick, 
  addButtonText, 
  searchPlaceholder,
  additionalControls 
}) => (
  <div style={{
    background: 'white',
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.large,
    marginBottom: theme.spacing.medium,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB'
  }}>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      gap: theme.spacing.medium,
      flexWrap: 'wrap'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: theme.spacing.medium, 
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: 1,
        minWidth: '250px'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <SearchIcon 
            size={20} 
            color="#6B7280" 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)' 
            }} 
          />
          <input
            type="text"
            placeholder={searchPlaceholder || "Search..."}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              border: '1px solid #D1D5DB',
              borderRadius: theme.borderRadius.medium,
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
            aria-label="Search"
          />
        </div>
        {additionalControls}
      </div>
      {onAddClick && (
        <button
          onClick={onAddClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.small,
            padding: '10px 20px',
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius.medium,
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <PlusIcon size={16} />
          {addButtonText || "Add Item"}
        </button>
      )}
    </div>
  </div>
));

ControlsBar.propTypes = {
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  onAddClick: PropTypes.func,
  addButtonText: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  additionalControls: PropTypes.node
};

/**
 * Unified Table Container Component
 * @param {ReactNode} children - Child components
 * @param {string} className - Additional CSS classes
 */
export const TableContainer = memo(({ children, className }) => (
  <div 
    className={className}
    style={{
      background: 'white',
      borderRadius: theme.borderRadius.large,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #E5E7EB',
      overflow: 'hidden'
    }}
  >
    <div style={{ overflowX: 'auto' }}>
      {children}
    </div>
  </div>
));

TableContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Unified Table Component
 * @param {array} headers - Table headers array
 * @param {ReactNode} children - Table rows
 * @param {boolean} striped - Striped rows
 * @param {boolean} hover - Hover effect on rows
 */
export const UnifiedTable = memo(({ headers, children, striped = true, hover = true }) => (
  <table style={{ 
    width: '100%', 
    borderCollapse: 'collapse',
    minWidth: '600px'
  }}>
    <thead>
      <tr style={{ background: '#F9FAFB' }}>
        {headers.map((header, index) => (
          <th 
            key={index} 
            style={{ 
              padding: '16px', 
              textAlign: 'left', 
              fontWeight: '600', 
              color: '#374151', 
              borderBottom: '1px solid #E5E7EB' 
            }}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {React.Children.map(children, (child, index) => {
        if (!child) return null;
        return React.cloneElement(child, {
          style: { 
            ...child.props.style,
            background: striped && index % 2 === 0 ? '#F9FAFB' : 'white',
            transition: hover ? 'background 0.2s' : 'none',
            ':hover': hover ? { background: '#F3F4F6' } : {}
          }
        });
      })}
    </tbody>
  </table>
));

UnifiedTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
  striped: PropTypes.bool,
  hover: PropTypes.bool
};

/**
 * Unified Action Buttons Component
 * @param {function} onEdit - Edit action handler
 * @param {function} onDelete - Delete action handler
 * @param {function} onView - View action handler
 * @param {string} editTitle - Edit button tooltip
 * @param {string} deleteTitle - Delete button tooltip
 * @param {string} viewTitle - View button tooltip
 * @param {string} size - Button size (sm, md, lg)
 */
export const ActionButtons = memo(({ 
  onEdit, 
  onDelete, 
  onView, 
  editTitle = "Edit", 
  deleteTitle = "Delete", 
  viewTitle = "View",
  size = 'md'
}) => {
  const sizes = {
    sm: { padding: '4px', iconSize: 14 },
    md: { padding: '6px', iconSize: 16 },
    lg: { padding: '8px', iconSize: 18 }
  };

  const { padding, iconSize } = sizes[size] || sizes.md;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: theme.spacing.small }}>
      {onView && (
        <button
          onClick={onView}
          style={{
            padding,
            background: '#EBF8FF',
            border: 'none',
            borderRadius: theme.borderRadius.small,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={viewTitle}
          aria-label={viewTitle}
        >
          <EyeIcon size={iconSize} color="#3B82F6" />
        </button>
      )}
      {onEdit && (
        <button
          onClick={onEdit}
          style={{
            padding,
            background: '#F3F4F6',
            border: 'none',
            borderRadius: theme.borderRadius.small,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={editTitle}
          aria-label={editTitle}
        >
          <WrenchIcon size={iconSize} color="#6B7280" />
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            padding,
            background: '#FEE2E2',
            border: 'none',
            borderRadius: theme.borderRadius.small,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={deleteTitle}
          aria-label={deleteTitle}
        >
          <TrashIcon size={iconSize} color="#EF4444" />
        </button>
      )}
    </div>
  );
});

ActionButtons.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  editTitle: PropTypes.string,
  deleteTitle: PropTypes.string,
  viewTitle: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

/**
 * Unified Status Badge Component
 * @param {string} status - Status text
 * @param {string} variant - Status variant (active, inactive, etc.)
 * @param {string} size - Badge size (sm, md, lg)
 */
export const StatusBadge = memo(({ status, variant, size = 'md' }) => {
  const getStatusStyle = () => {
    switch (variant?.toLowerCase()) {
      case 'active':
      case 'success':
      case 'completed':
        return { background: '#D1FAE5', color: '#065F46' };
      case 'inactive':
      case 'error':
      case 'cancelled':
        return { background: '#FEE2E2', color: '#991B1B' };
      case 'pending':
      case 'warning':
        return { background: '#FEF3C7', color: '#92400E' };
      case 'in progress':
      case 'info':
        return { background: '#DBEAFE', color: '#1E40AF' };
      default:
        return { background: '#F3F4F6', color: '#374151' };
    }
  };

  const sizes = {
    sm: { padding: '2px 8px', fontSize: '10px' },
    md: { padding: '4px 12px', fontSize: '12px' },
    lg: { padding: '6px 16px', fontSize: '14px' }
  };

  const statusStyle = getStatusStyle();
  const sizeStyle = sizes[size] || sizes.md;

  return (
    <span style={{
      padding: sizeStyle.padding,
      borderRadius: '20px',
      fontSize: sizeStyle.fontSize,
      fontWeight: '600',
      display: 'inline-block',
      ...statusStyle
    }}>
      {status}
    </span>
  );
});

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'active', 'inactive', 'pending', 'completed', 
    'in progress', 'cancelled', 'success', 'error', 
    'warning', 'info'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

/**
 * Unified Modal Component
 * @param {boolean} isOpen - Modal visibility
 * @param {function} onClose - Close handler
 * @param {string} title - Modal title
 * @param {ReactNode} children - Modal content
 * @param {string} width - Modal width
 * @param {string} size - Modal size (sm, md, lg, xl)
 */
export const UnifiedModal = memo(({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  width, 
  size,
  closeOnOverlayClick = true 
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: '400px',
    md: '500px',
    lg: '600px',
    xl: '800px'
  };

  const modalWidth = width || sizes[size] || sizes.md;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: theme.spacing.medium
      }}
      onClick={handleOverlayClick}
    >
      <div style={{
        background: 'white',
        borderRadius: theme.borderRadius.large,
        padding: theme.spacing.large,
        width: modalWidth,
        maxWidth: '90vw',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '20px', 
            fontWeight: '600',
            color: theme.colors.dark
          }}>
            {title}
          </h2>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              padding: theme.spacing.small,
              borderRadius: '50%',
              ':hover': {
                background: theme.colors.light
              }
            }}
            aria-label="Close modal"
          >
            <XIcon size={20} color={theme.colors.dark} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

UnifiedModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  width: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  closeOnOverlayClick: PropTypes.bool
};

/**
 * Unified Form Field Component
 * @param {string} label - Field label
 * @param {string} type - Input type (text, select, textarea, etc.)
 * @param {string|number} value - Field value
 * @param {function} onChange - Change handler
 * @param {boolean} required - Required field
 * @param {array} options - Options for select input
 * @param {string} placeholder - Input placeholder
 * @param {string} error - Error message
 * @param {string} id - Field ID
 */
export const FormField = memo(({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  required = false, 
  options = null, 
  placeholder = "", 
  error,
  id,
  ...props 
}) => {
  const inputId = id || `form-field-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div style={{ marginBottom: theme.spacing.medium }}>
      <label 
        htmlFor={inputId}
        style={{ 
          display: 'block', 
          marginBottom: theme.spacing.small, 
          fontWeight: '500',
          color: theme.colors.dark
        }}
      >
        {label} {required && <span style={{ color: theme.colors.danger }}>*</span>}
      </label>
      {type === 'select' ? (
        <select
          id={inputId}
          value={value}
          onChange={onChange}
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            border: `1px solid ${error ? theme.colors.danger : '#D1D5DB'}`, 
            borderRadius: theme.borderRadius.small,
            fontSize: '14px'
          }}
          required={required}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            border: `1px solid ${error ? theme.colors.danger : '#D1D5DB'}`, 
            borderRadius: theme.borderRadius.small, 
            minHeight: '80px',
            fontSize: '14px'
          }}
          required={required}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            border: `1px solid ${error ? theme.colors.danger : '#D1D5DB'}`, 
            borderRadius: theme.borderRadius.small,
            fontSize: '14px'
          }}
          required={required}
          {...props}
        />
      )}
      {error && (
        <p style={{ 
          margin: '4px 0 0 0', 
          color: theme.colors.danger, 
          fontSize: '12px' 
        }}>
          {error}
        </p>
      )}
    </div>
  );
});

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'select', 'textarea', 'date']),
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string
};

/**
 * Unified Form Buttons Component
 * @param {function} onCancel - Cancel handler
 * @param {function} onSubmit - Submit handler
 * @param {string} submitText - Submit button text
 * @param {string} cancelText - Cancel button text
 * @param {string} submitVariant - Submit button variant
 * @param {boolean} loading - Loading state
 */
export const FormButtons = memo(({ 
  onCancel, 
  onSubmit, 
  submitText = "Save", 
  cancelText = "Cancel", 
  submitVariant = "primary",
  loading = false,
  disabled = false
}) => {
  const buttonVariants = {
    primary: theme.colors.primary,
    success: theme.colors.success,
    danger: theme.colors.danger,
    warning: theme.colors.warning,
    info: theme.colors.info
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: theme.spacing.medium, 
      justifyContent: 'flex-end',
      marginTop: theme.spacing.large
    }}>
      <button
        type="button"
        onClick={onCancel}
        style={{
          padding: '8px 16px',
          border: `1px solid ${theme.colors.light}`,
          borderRadius: theme.borderRadius.small,
          background: 'white',
          cursor: 'pointer',
          color: theme.colors.dark,
          transition: 'all 0.2s',
          ':hover': {
            background: theme.colors.light
          }
        }}
        disabled={loading}
      >
        {cancelText}
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: theme.borderRadius.small,
          background: buttonVariants[submitVariant] || buttonVariants.primary,
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.2s',
          opacity: disabled ? 0.7 : 1,
          ':hover': {
            opacity: disabled ? 0.7 : 0.9
          }
        }}
        disabled={loading || disabled}
      >
        {loading ? 'Processing...' : submitText}
      </button>
    </div>
  );
});

FormButtons.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  submitVariant: PropTypes.oneOf(['primary', 'success', 'danger', 'warning', 'info']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};

/**
 * Unified Avatar Component
 * @param {ReactComponent} icon - Icon component
 * @param {string} name - Name for fallback
 * @param {string} gradient - Background gradient
 * @param {string} size - Avatar size (sm, md, lg)
 */
export const Avatar = memo(({ 
  icon: Icon, 
  name, 
  gradient = `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`, 
  size = 'md',
  src,
  ...props 
}) => {
  const sizes = {
    sm: { width: '32px', height: '32px', fontSize: '12px' },
    md: { width: '40px', height: '40px', fontSize: '14px' },
    lg: { width: '48px', height: '48px', fontSize: '16px' }
  };

  const sizeStyle = sizes[size] || sizes.md;

  return (
    <div 
      style={{
        width: sizeStyle.width,
        height: sizeStyle.height,
        background: src ? 'transparent' : gradient,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...props.style
      }}
      {...props}
    >
      {src ? (
        <img 
          src={src} 
          alt={name || ''} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      ) : Icon ? (
        <Icon size={parseInt(sizeStyle.width) / 2} color="white" />
      ) : (
        <span style={{ 
          color: 'white', 
          fontWeight: 'bold', 
          fontSize: sizeStyle.fontSize,
          textTransform: 'uppercase'
        }}>
          {name?.charAt(0) || 'A'}
        </span>
      )}
    </div>
  );
});

Avatar.propTypes = {
  icon: PropTypes.elementType,
  name: PropTypes.string,
  gradient: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  src: PropTypes.string
};

/**
 * Unified Contact Info Component
 * @param {string} email - Email address
 * @param {string} phone - Phone number
 * @param {ReactComponent} MailIcon - Mail icon component
 * @param {ReactComponent} PhoneIcon - Phone icon component
 * @param {string} size - Size of the component (sm, md, lg)
 */
export const ContactInfo = memo(({ 
  email, 
  phone, 
  MailIcon, 
  PhoneIcon,
  size = 'md'
}) => {
  const sizes = {
    sm: { fontSize: '12px', iconSize: 12 },
    md: { fontSize: '14px', iconSize: 14 },
    lg: { fontSize: '16px', iconSize: 16 }
  };

  const sizeStyle = sizes[size] || sizes.md;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {email && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MailIcon size={sizeStyle.iconSize} color="#6B7280" />
          <span style={{ 
            fontSize: sizeStyle.fontSize, 
            color: '#374151' 
          }}>
            {email}
          </span>
        </div>
      )}
      {phone && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <PhoneIcon size={sizeStyle.iconSize} color="#6B7280" />
          <span style={{ 
            fontSize: sizeStyle.fontSize, 
            color: '#374151' 
          }}>
            {phone}
          </span>
        </div>
      )}
    </div>
  );
});

ContactInfo.propTypes = {
  email: PropTypes.string,
  phone: PropTypes.string,
  MailIcon: PropTypes.elementType,
  PhoneIcon: PropTypes.elementType,
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

/**
 * Unified Toast Notification Component
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, warning, info)
 * @param {function} onClose - Close handler
 * @param {number} duration - Auto-close duration in ms
 */
export const Toast = memo(({ 
  message, 
  type = 'info', 
  onClose, 
  duration = 5000,
  position = 'bottom-right'
}) => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const toastStyles = {
    success: { background: '#D1FAE5', color: '#065F46', icon: CheckIcon },
    error: { background: '#FEE2E2', color: '#991B1B', icon: XIcon },
    warning: { background: '#FEF3C7', color: '#92400E', icon: ExclamationIcon },
    info: { background: '#DBEAFE', color: '#1E40AF', icon: ExclamationIcon }
  };

  const positionStyles = {
    'top-left': { top: theme.spacing.large, left: theme.spacing.large },
    'top-right': { top: theme.spacing.large, right: theme.spacing.large },
    'bottom-left': { bottom: theme.spacing.large, left: theme.spacing.large },
    'bottom-right': { bottom: theme.spacing.large, right: theme.spacing.large }
  };

  const { background, color, icon: Icon } = toastStyles[type] || toastStyles.info;
  const positionStyle = positionStyles[position] || positionStyles['bottom-right'];

  if (!visible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        padding: `${theme.spacing.medium} ${theme.spacing.large}`,
        background,
        color,
        borderRadius: theme.borderRadius.medium,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.small,
        zIndex: 1100,
        animation: 'fadeIn 0.3s ease-out',
        ...positionStyle
      }}
    >
      <Icon size={20} color={color} />
      <span>{message}</span>
      {onClose && (
        <button 
          onClick={onClose} 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            marginLeft: theme.spacing.small,
            color
          }}
          aria-label="Close toast"
        >
          <XIcon size={16} />
        </button>
      )}
    </div>
  );
});

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func,
  duration: PropTypes.number,
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right'])
};

/**
 * Unified Empty State Component
 * @param {ReactComponent} icon - Icon component
 * @param {string} title - Title text
 * @param {string} description - Description text
 * @param {ReactNode} action - Action button/component
 */
export const EmptyState = memo(({ 
  icon: Icon, 
  title, 
  description, 
  action 
}) => (
  <div style={{ 
    textAlign: 'center', 
    padding: theme.spacing.large,
    maxWidth: '400px',
    margin: '0 auto'
  }}>
    {Icon && (
      <div style={{ 
        marginBottom: theme.spacing.medium,
        color: '#9CA3AF'
      }}>
        <Icon size={48} />
      </div>
    )}
    <h3 style={{ 
      margin: `0 0 ${theme.spacing.small} 0`, 
      fontSize: '18px', 
      fontWeight: '600',
      color: theme.colors.dark
    }}>
      {title}
    </h3>
    <p style={{ 
      margin: `0 0 ${theme.spacing.medium} 0`, 
      color: '#6B7280', 
      fontSize: '14px' 
    }}>
      {description}
    </p>
    {action}
  </div>
));

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node
};

/**
 * Unified Loading Component
 * @param {string} size - Loading size (sm, md, lg)
 * @param {string} color - Loading color
 */
export const Loading = memo(({ 
  size = 'md', 
  color = theme.colors.primary 
}) => {
  const sizes = {
    sm: { width: '16px', height: '16px', borderWidth: '2px' },
    md: { width: '24px', height: '24px', borderWidth: '3px' },
    lg: { width: '32px', height: '32px', borderWidth: '4px' }
  };

  const sizeStyle = sizes[size] || sizes.md;

  return (
    <div style={{ 
      display: 'inline-block',
      width: sizeStyle.width,
      height: sizeStyle.height,
      border: `${sizeStyle.borderWidth} solid ${color}20`,
      borderTop: `${sizeStyle.borderWidth} solid ${color}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  );
});

Loading.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.string
};

export const UnifiedInput = ({ label, value, onChange, type = 'text', placeholder = '', required = false, id }) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor={inputId} style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          fontSize: '14px'
        }}
      />
    </div>
  );
};

export const PencilIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color}
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    <line x1="15" y1="5" x2="19" y2="9" />
  </svg>
);

export const UnifiedSelect = ({ label, value, onChange, options = [], placeholder = '', required = false, id }) => {
  const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor={selectId} style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          fontSize: '14px'
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt, i) => (
          <option key={i} value={opt.value ?? opt}>{opt.label ?? opt}</option>
        ))}
      </select>
    </div>
  );
};


export const UnifiedButton = ({ children, onClick, type = 'button', variant = 'primary', style = {} }) => {
  const colors = {
    primary: '#667eea',
    secondary: '#6B7280',
    success: '#10B981',
    danger: '#EF4444'
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: colors[variant] || colors.primary,
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        ...style
      }}
    >
      {children}
    </button>
  );
};
// 🔧 UnifiedDateRangePicker.jsx – تاريخ من إلى

export const UnifiedDateRangePicker = ({ label, from, to, onChange }) => {
  return (
    <div>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>{label}</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input 
          type="date" 
          value={from} 
          onChange={(e) => onChange({ from: e.target.value, to })} 
          style={{ flex: 1, padding: 6 }} 
        />
        <input 
          type="date" 
          value={to} 
          onChange={(e) => onChange({ from, to: e.target.value })} 
          style={{ flex: 1, padding: 6 }} 
        />
      </div>
    </div>
  );
};
// ✅ UnifiedTimeRangePicker inline component – no duplicate imports
export const UnifiedTimeRangePicker = ({ label, from, to, onChange }) => {
  return (
    <div>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>{label}</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="time"
          value={from}
          onChange={(e) => onChange({ from: e.target.value, to })}
          style={{ flex: 1, padding: 6 }}
        />
        <input
          type="time"
          value={to}
          onChange={(e) => onChange({ from, to: e.target.value })}
          style={{ flex: 1, padding: 6 }}
        />
      </div>
    </div>
  );
};

import { useState } from 'react';  // استيراد useState
//import { ChevronUpIcon, ChevronDownIcon } from './icons';
export const CollapsiblePanel = ({ 
  title, 
  children, 
  isOpen: initialOpen = false,
  className = '',
  headerClassName = '',
  contentClassName = '' 
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className={`collapsible-panel ${className}`}>
      <div 
        className={`panel-header ${headerClassName}`}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'background-color 0.2s'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{title}</h3>
        {isOpen ? (
          <ChevronUpIcon size={20} />
        ) : (
          <ChevronDownIcon size={20} />
        )}
      </div>
      
      {isOpen && (
        <div 
          className={`panel-content ${contentClassName}`}
          style={{
            padding: '16px',
            border: '1px solid #e2e8f0',
            borderTop: 'none',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
            backgroundColor: '#ffffff'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
export const ActionButton = ({ icon, onClick, tooltip }) => {
  return (
    <button 
      onClick={onClick}
      className="p-2 rounded hover:bg-gray-100"
      title={tooltip}
    >
      {icon}
    </button>
  );
};
// In UnifiedDesignComponents.jsx
export const StatsCard = ({ title, value, change }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
    <p className="text-sm text-green-500">{change}</p>
  </div>
);
// Add this to your UnifiedDesignComponents.jsx
export const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${disabled ? 'bg-gray-100' : 'bg-white'}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Global styles (can be added to your main CSS file)
const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;


// Add global styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = globalStyles;
  document.head.appendChild(styleElement);
}
 
