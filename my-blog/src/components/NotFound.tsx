
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      role="main"
      aria-labelledby="error-title"
      className="not-found-container"
    >
      <h1 id="error-title" className="contact-title">
        ERREUR 404
      </h1>

      <p className="contact-title">
        AU REVOIR
      </p>

      <Link
        to="/blog"
        aria-label="Retour à la liste des articles du blog"
        className="article-back-link"
      >
        ← Retour au blog
      </Link>
    </main>
  );
}

