import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

interface ArticleData {
  title: string;
  excerpt: string;
  image: string;
  content: string;
  imgdetails?: string;
}

export default function ContentArticle() {

  const { id } = useParams();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const [contentArticle, setContentArticle] = useState<ArticleData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/articles?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.length) throw new Error("Article introuvable");
        setContentArticle(data[0]); 
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <p role="status" aria-live="polite">
        Chargement...
      </p>
    );
  }

  if (error) {
    return (
      <p role="alert" aria-live="assertive" style={{ color: "red" }}>
        {error}
      </p>
    );
  }

  if (!contentArticle) {
    return null;
  }

  return (
    <article aria-labelledby="article-title" className="article-page max-w-3xl mx-auto text-center py-10">
      
      <h1
        id="article-title"
        className="article-title"
        tabIndex={-1}
        ref={headingRef}
      >
        {contentArticle.title}
      </h1>

      <img 
        src={contentArticle.image} 
        alt={contentArticle.imgdetails ?? `Illustration associée à l’article : ${contentArticle.title}`}
        style={{maxWidth:"500px", width:"100%", borderRadius:"12px", margin:"1rem auto"}}
      />

      <p aria-label="Contenu de l’article" className="article-contents">
        {contentArticle.content}
      </p>

      <Link
        to="/blog"
        aria-label="Retour à la liste des articles du blog"
        className="article-back-link"
      >
        ← Retour au blog
      </Link>
    </article>
  );
}
