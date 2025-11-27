import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    navigate(`/blog?search=${encodeURIComponent(value)}`);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="search-bar"
      role="search"
    >
      <label htmlFor="search-input" className="visually-hidden">
        Rechercher un article
      </label>

      <input
        id="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Rechercher des articles..."
        className="search-input"
        autoComplete="off"
      />

      <button type="submit" className="search-button">
        Rechercher
      </button>
    </form>
  );
}
