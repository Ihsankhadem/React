import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface NewArticle {
  title: string;
  excerpt: string;
  image: string;
  content: string;
}

export default function FormArticles() {
  const [newArticle, setNewArticle] = useState<NewArticle>({
    title: "",
    excerpt: "",
    image: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (error || success) {
      messageRef.current?.focus();
    }
  }, [error, success]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setNewArticle(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:5000/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(newArticle),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      setSuccess("Article créé avec succès !");

      setNewArticle({
        title: "",
        excerpt: "",
        image: "",
        content: "",
      });

      setTimeout(() => {
        navigate("/blog");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="form-title"
      className="contact-form"
      autoComplete="off"
    >
      <h2 id="form-title">Créer un article</h2>

      {error && (
        <p ref={messageRef} role="alert" tabIndex={-1} className="error-msg">
          {error}
        </p>
      )}

      {success && (
        <p ref={messageRef} role="alert" tabIndex={-1} className="success-msg">
          {success}
        </p>
      )}

      {/* Titre */}
      <div className="form-row">
        <label htmlFor="title">Titre :</label>
        <input
          id="title"
          type="text"
          name="title"
          value={newArticle.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Résumé */}
      <div className="form-row">
        <label htmlFor="excerpt">Résumé :</label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={newArticle.excerpt}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* Image */}
      <div className="form-row">
        <label htmlFor="image">Image (URL) :</label>
        <input
          id="image"
          type="url"
          name="image"
          value={newArticle.image}
          onChange={handleChange}
          required
        />
      </div>

      {/* Contenu */}
      <div className="form-row">
        <label htmlFor="content">Contenu :</label>
        <textarea
          id="content"
          name="content"
          value={newArticle.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button type="submit" disabled={isLoading} aria-disabled={isLoading}>
        {isLoading ? "Envoi..." : "Ajouter"}
      </button>
    </form>
  );
}
