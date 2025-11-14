

// faire une barre de recherche pour les articles du blog

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Rediriger vers la page de résultats de recherche avec la requête en paramètre
        navigate(`/blog?search=${encodeURIComponent(query)}`);
    }
    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}  
                placeholder="Rechercher des articles..."
                className="search-input"
            />  
            <button type="submit" className="search-button">Rechercher</button>
        </form>
    );
}
