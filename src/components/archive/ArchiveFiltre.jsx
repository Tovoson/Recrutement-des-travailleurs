import React from 'react';

const ArchiveFilter = ({ onFilterChange }) => {
  return (
    <div className="filter-options">
      <label>Filtrer par :</label>
      <select onChange={onFilterChange}>
        <option value="all">Tous</option>
        <option value="category1">Catégorie 1</option>
        <option value="category2">Catégorie 2</option>
      </select>
    </div>
  );
};

export default ArchiveFilter;
