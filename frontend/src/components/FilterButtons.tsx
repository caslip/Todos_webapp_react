import React from 'react';
import { FilterType } from '../types/todo';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

/**
 * 筛选按钮组件
 */
const FilterButtons: React.FC<FilterButtonsProps> = ({ currentFilter, onFilterChange }) => {
  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: '全部' },
    { type: 'active', label: '未完成' },
    { type: 'completed', label: '已完成' },
  ];

  return (
    <div className="filter-container">
      {filters.map((filter) => (
        <button
          key={filter.type}
          className={`filter-button ${currentFilter === filter.type ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.type)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
