import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editArticle, setEditArticle] = useState({
    title: "",
    excerpt: "",
    image: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const messageRef = useRef<HTMLParagraphElement | null>(null);

  // Focus automatique sur message succès/erreur
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, [error, success]);

  // Charger l’article
  useEffect(() => {
    if (!id) {
      setError("Aucun identifiant fourni.");
      return;
    }

    fetch(`http://localhost:3001/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article introuvable");
        return res.json();
      })
      .then((data) => setEditArticle(data))
      .catch(() => setError("Impossible de charger l'article"));
  }, [id]);

  // Mise à jour
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) {
      setError("Identifiant article manquant");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    fetch(`http://localhost:5000//articles/${id}`, {
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
      .catch((err: any) => setError(err.message || "Une erreur est survenue"))
      .finally(() => setIsLoading(false));
  }

  // Suppression de l'article
  function handleDelete() {
    if (!id) {
      setError("Identifiant article manquant");
      return;
    }

    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet article ? Cette action est définitive."
    );
    if (!confirmDelete) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    fetch(`http://localhost:3001/articles/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de supprimer l’article");
        setSuccess("Article supprimé !");
        setTimeout(() => navigate("/blog"), 1500);
      })
      .catch((err: any) => setError(err.message || "Erreur lors de la suppression"))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="contact-form">

<h2 id="form-title">Modifier l'article</h2>

  <label htmlFor="title" className="">Titre de l’article :</label>
        <input
          type="text"
          name="title"
          value={editArticle.title}
          onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })}
          placeholder="Titre"
          required
        />
  <label htmlFor="excerpt">Résumé :</label>
        <textarea
          name="excerpt"
          value={editArticle.excerpt}
          onChange={(e) => setEditArticle({ ...editArticle, excerpt: e.target.value })}
          placeholder="Résumé"
          required
        />
  <label htmlFor="image">Choisir votre image :</label>
        <input
          type="text"
          name="image"
          value={editArticle.image}
          onChange={(e) => setEditArticle({ ...editArticle, image: e.target.value })}
          placeholder="URL de l'image"
          required
        />
  <label htmlFor="content">Contenu de l’article :</label>
        <textarea
          name="content"
          value={editArticle.content}
          onChange={(e) => setEditArticle({ ...editArticle, content: e.target.value })}
          placeholder="Contenu"
          required
        />

        {/* Messages d'erreur et de succès */}
        {error && (
          <p
            ref={messageRef}
            role="alert"
            tabIndex={-1}
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "10px 15px",
              borderRadius: "8px",
              border: "1px solid #f5c6cb",
              margin: "10px 0",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        {success && (
          <p
            ref={messageRef}
            role="alert"
            tabIndex={-1}
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "10px 15px",
              borderRadius: "8px",
              border: "1px solid #c3e6cb",
              margin: "10px 0",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {success}
          </p>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Envoi..." : "Modifier"}
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isLoading}
          className="delete-btn"
        >
          {isLoading ? "Suppression..." : "Supprimer"}
        </button>
      </form>
    </>
  );
}
