import React from 'react';

const SearchBar = ({ searchTerm, handleSearch }) => (
  <input
    type="text"
    className="form-control"
    placeholder="Search..."
    value={searchTerm}
    onChange={handleSearch}
    style={{
      backgroundColor: "hsl(var(--background))",
      display: "flex",
      justifyContent: "center",
      borderRadius: "1rem",
      marginBottom: '10px'
    }}
  />
);

export default SearchBar;
