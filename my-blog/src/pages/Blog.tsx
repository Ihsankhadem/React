

import BlogCard from "../components/BlogCard.tsx";
import "../App.css";
import SearchBar from "../components/SearchBar.tsx";
import { useLocation } from "react-router-dom";
import {useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";
  const [articles, setArticles] = useState<any[]>([]);


useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Erreur lors du chargement des articles :", error));        
}, []);


   const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery) ||
      article.excerpt.toLowerCase().includes(searchQuery)
  );
 
// Filtre les articles selon le texte tapé
return (
  <>
    <div className="align-search-add">

      <Link to="/addarticle" className="add-article-btn">
        Ajouter un article
      </Link>

      <div className="search-wrapper">
        <SearchBar />
      </div>

    </div>

    <section className="blog-container">
      {filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <BlogCard key={article.id} {...article} />
        ))
      ) : (
        <p className="no-results">Aucun article ne correspond à ta recherche</p>
      )}
    </section>
  </>
);
}
