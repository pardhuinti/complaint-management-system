import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="btn btn-outline btn-sm"
      >
        <ChevronLeft size={16} />
        <span>Prev</span>
      </button>

      <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500', padding: '0 0.5rem' }}>
        Page {page} of {pages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="btn btn-outline btn-sm"
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
