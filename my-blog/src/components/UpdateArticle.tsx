import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Article {
  id?: number;
  title: string;
  excerpt: string;
  image: string;
  content: string;
}

export default function UpdateArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [editArticle, setEditArticle] = useState<Article>({
    title: "",
    excerpt: "",
    image: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const messageRef = useRef<HTMLParagraphElement | null>(null);

  // Focus auto sur messages
  useEffect(() => {
    if (error || success) {
      messageRef.current?.focus();
    }
  }, [error, success]);

  // Charger l’article
  useEffect(() => {
    if (!id) {
      setError("Aucun identifiant fourni.");
      return;
    }

    fetch(`http://localhost:5000/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article introuvable");
        return res.json();
      })
      .then((data) => setEditArticle(data))
      .catch(() => setError("Impossible de charger l'article"));
  }, [id]);

  // Soumission formulaire
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) {
      setError("Identifiant manquant");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    fetch(`http://localhost:5000/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editArticle),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then(() => {
        setSuccess("Article mis à jour avec succès !");
        setTimeout(() => navigate("/blog"), 1500);
      })
      .catch((err: any) =>
        setError(err.message || "Une erreur est survenue")
      )
      .finally(() => setIsLoading(false));
  }

  // Suppression
  function handleDelete() {
    if (!id) {
      setError("Identifiant manquant");
      return;
    }

    if (!window.confirm("Voulez-vous vraiment supprimer cet article ?")) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);
console.log(editArticle)

fetch(`http://localhost:5000/articles/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de supprimer l'article");
        setSuccess("Article supprimé !");
        setTimeout(() => navigate("/blog"), 1500);
      })
      .catch((err) =>
        setError(err.message || "Erreur lors de la suppression")
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" aria-labelledby="update-title">
      <h2 id="update-title">Modifier l’article</h2>

      {/* Messages */}
      {error && (
        <p ref={messageRef} className="error-msg" role="alert" tabIndex={-1}>
          {error}
        </p>
      )}

      {success && (
        <p ref={messageRef} className="success-msg" role="alert" tabIndex={-1}>
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
          value={editArticle.title}
          onChange={(e) =>
            setEditArticle({ ...editArticle, title: e.target.value })
          }
          required
        />
      </div>

      {/* Résumé */}
      <div className="form-row">
        <label htmlFor="excerpt">Résumé :</label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={editArticle.excerpt}
          onChange={(e) =>
            setEditArticle({ ...editArticle, excerpt: e.target.value })
          }
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
          value={editArticle.image}
          onChange={(e) =>
            setEditArticle({ ...editArticle, image: e.target.value })
          }
          required
        />
      </div>

      {/* Contenu */}
      <div className="form-row">
        <label htmlFor="content">Contenu :</label>
        <textarea
          id="content"
          name="content"
          value={editArticle.content}
          onChange={(e) =>
            setEditArticle({ ...editArticle, content: e.target.value })
          }
          required
        ></textarea>
      </div>

      {/* Boutons */}
      <div className="form-buttons">
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Envoi..." : "Modifier"}
        </button>

        <button className="delete-btn" type="button" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? "Suppression..." : "Supprimer"}
        </button>
      </div>

    </form>
  );
}
