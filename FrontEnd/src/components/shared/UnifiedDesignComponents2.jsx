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

export const DetailHeader = ({ 
  title, 
  subtitle, 
  actions,
  className = ""
}) => {
  return (
    <div className={`detail-header bg-white p-4 md:p-6 rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {subtitle && (
            <p className="text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        {actions && (
          <div className="flex flex-wrap gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
export const DocumentCard = ({ 
  title,
  description,
  fileType,
  fileSize,
  uploadDate,
  icon,
  actions,
  className = "",
  onClick
}) => {
  // Default icon based on file type
  const renderIcon = () => {
    if (icon) return icon;
    
    const type = fileType?.toLowerCase() || '';
    const iconClass = "text-2xl text-blue-500";
    
    if (type.includes('pdf')) return <FilePdf className={iconClass} />;
    if (type.includes('word') || type.includes('doc')) return <FileWord className={iconClass} />;
    if (type.includes('excel') || type.includes('xls')) return <FileExcel className={iconClass} />;
    if (type.includes('image')) return <FileImage className={iconClass} />;
    
    return <File className={iconClass} />;
  };

  return (
    <div 
      className={`document-card bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 flex items-start gap-4 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="icon-container flex-shrink-0 mt-1">
        {renderIcon()}
      </div>
      
      <div className="content flex-grow min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
        
        {description && (
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        )}
        
        <div className="meta flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
          {fileType && <span>{fileType}</span>}
          {fileSize && <span>{formatFileSize(fileSize)}</span>}
          {uploadDate && <span>{new Date(uploadDate).toLocaleDateString()}</span>}
        </div>
      </div>
      
      {actions && (
        <div className="actions flex-shrink-0 flex gap-2" onClick={e => e.stopPropagation()}>
          {actions}
        </div>
      )}
    </div>
  );
};

// Helper function to format file sizes
function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

// Default file icons (add these above DocumentCard)
const File = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>;

const FilePdf = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#e53e3e">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>;

const FileWord = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#2b6cb0">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>;

const FileExcel = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#276749">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>;

const FileImage = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#805ad5">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>;


export const InfoCard = ({ 
  title,
  value,
  icon,
  unit,
  description,
  trend,
  trendValue,
  className = "",
  onClick
}) => {
  // Determine trend color and icon
  const getTrendInfo = () => {
    if (!trend) return null;
    
    const isPositive = trend === 'up' || trend === 'increase';
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    const icon = isPositive ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );

    return (
      <div className={`flex items-center gap-1 text-xs font-medium ${color}`}>
        {icon}
        {trendValue}
      </div>
    );
  };

  return (
    <div 
      className={`info-card bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
        </div>
        
        {icon && (
          <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mt-2 flex justify-between items-center">
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
        {getTrendInfo()}
      </div>
    </div>
  );
};
export const Timeline = ({ 
  items,
  className = "",
  lineColor = "bg-gray-200",
  iconColor = "bg-blue-500"
}) => {
  return (
    <div className={`timeline relative ${className}`}>
      {/* Vertical line */}
      <div 
        className={`absolute left-5 top-0 h-full w-0.5 transform translate-x-1/2 ${lineColor}`}
        aria-hidden="true"
      ></div>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start">
            {/* Timeline icon */}
            <div className="absolute left-5 transform -translate-x-1/2">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${iconColor} text-white`}>
                {item.icon || (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="ml-14 flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                {item.date && (
                  <time className="text-sm text-gray-500 whitespace-nowrap">
                    {item.date}
                  </time>
                )}
              </div>
              
              <div className="mt-1 text-gray-600">
                {item.description && (
                  <p className="text-base">{item.description}</p>
                )}
                
                {item.details && (
                  <p className="text-sm mt-1">{item.details}</p>
                )}
              </div>
              
              {item.meta && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.meta.map((meta, metaIndex) => (
                    <span 
                      key={metaIndex}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {meta}
                    </span>
                  ))}
                </div>
              )}
              
              {item.actions && (
                <div className="mt-3 flex gap-2">
                  {item.actions}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
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
 
