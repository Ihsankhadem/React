import BlogCard from "../components/BlogCard.tsx";
import "../App.css";
import SearchBar from "../components/SearchBar.tsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Blog() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const [articles, setArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des articles :", error)
      );
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery) ||
      article.excerpt.toLowerCase().includes(searchQuery)
  );

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <>
      <header className="align-search-add">
        <Link to="/addarticle" className="add-article-btn" aria-label="Ajouter un nouvel article">
          Ajouter un article
        </Link>

        <div className="search-wrapper">
          <SearchBar />
        </div>
      </header>

      <main>
        <h1 className="visually-hidden">Liste des articles</h1>

        <section
          className="blog-container"
          aria-label="Liste des articles filtrés"
        >
          {filteredArticles.length > 0 ? (
            paginatedArticles.map((article) => (
              <BlogCard key={article.id} {...article} />
            ))
          ) : (
            <p className="no-results" role="status">
              Aucun article ne correspond à ta recherche
            </p>
          )}
        </section>

        {/* Pagination accessible */}
        {totalPages > 1 && (
          <nav
            className="pagination"
            aria-label="Pagination des articles"
          >

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (

                    <button
                      onClick={() => setCurrentPage(page)}
                      className={page === currentPage ? "active" : ""}
                      aria-current={page === currentPage ? "page" : undefined}
                      aria-label={`Page ${page}`}
                    >
                      {page}
                    </button>
                )
              )}
          </nav>
        )}
      </main>
    </>
  );
}
