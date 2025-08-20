import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/SVGIcons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5; // Maximum number of visible page buttons
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust if we're at the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      justifyContent: 'center'
    }}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        style={{
          padding: '8px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          background: '#FFF',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <ChevronLeftIcon size={16} />
        <span>Previous</span>
      </button>

      {/* First Page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            style={{
              padding: '8px 12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              background: '#FFF',
              cursor: 'pointer'
            }}
          >
            1
          </button>
          {startPage > 2 && <span style={{ padding: '8px' }}>...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            padding: '8px 12px',
            border: `1px solid ${currentPage === page ? '#3B82F6' : '#D1D5DB'}`,
            borderRadius: '6px',
            background: currentPage === page ? '#EFF6FF' : '#FFF',
            color: currentPage === page ? '#3B82F6' : '#4B5563',
            fontWeight: currentPage === page ? '600' : '400',
            cursor: 'pointer'
          }}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span style={{ padding: '8px' }}>...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            style={{
              padding: '8px 12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              background: '#FFF',
              cursor: 'pointer'
            }}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 12px',
          border: '1px solid #D1D5DB',
          borderRadius: '6px',
          background: '#FFF',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <span>Next</span>
        <ChevronRightIcon size={16} />
      </button>
    </div>
  );
};

export default Pagination;