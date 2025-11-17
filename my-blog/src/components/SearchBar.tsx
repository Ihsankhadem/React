
import React, { useState } from 'react';
// useNavigate sert à naviguer programmétiquement
import { useNavigate } from 'react-router-dom';


export default function SearchBar() {
    const [query, setQuery] = useState('');
//navigate : fonction qui permet de rediriger l’utilisateur vers une autre page.
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
    // Empêche le rechargement de la page lors de la soumission du formulaire
        e.preventDefault();
    // (encodeURIComponent sert à transformer les espaces et caractères spéciaux en une version valide pour l’URL).
    // navigate(...) : redirige vers /blog en ajoutant un paramètre de recherche dans l’URL.
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
