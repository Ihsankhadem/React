
import "../App.css";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

export interface Article {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  source: "nasa" | "local";
}

export default function Blog() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = 10;
  const api_key = import.meta.env.VITE_NASA_API_KEY;

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [nasaRes, localRes] = await Promise.all([
        fetch(`https://api.nasa.gov/planetary/apod?count=50&api_key=${api_key}`),
        fetch("http://localhost:5000/articles")
      ]);

      const nasaData = await nasaRes.json();
      const localData = await localRes.json();

      const localMapped = localData.map((a: any) => ({
        id: a.id,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        image: a.image,
        source: "local" as const
      }));

      const nasaMapped = nasaData.map((a: any, index: number) => ({
        id: `nasa-${a.date || index}`,
        title: a.title,
        excerpt: a.explanation.substring(0, 150) + "...",
        content: a.explanation,
        image: a.url,
        source: "nasa" as const
      }));

      setArticles([...localMapped, ...nasaMapped]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);



  // → Filtrage
  const filteredArticles = useMemo(() => {
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery) ||
        a.excerpt.toLowerCase().includes(searchQuery)
    );
  }, [articles, searchQuery]);

  // → Pagination
  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) return <p>Chargement...</p>;

  return (
    <>
      <header className="align-search-add">
        <button className="add-article-btn" onClick={() => navigate("/addarticle")}>
          + Ajouter un article
        </button>
        <SearchBar />
      </header>

      <section className="blog-container">
        {paginatedArticles.length > 0 ? (
          paginatedArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))
        ) : (
          <p>Aucun article trouvé</p>
        )}
      </section>

      {totalPages > 1 && (
        <nav className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
