import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateArticle() {
  const { id } = useParams();
    const navigate = useNavigate();
  const [editArticle, setEditArticle] = useState({
    title: "",
    excerpt: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // --- Charger l’article -------------------------------------------------
  useEffect(() => {
    fetch(`http://localhost:3001/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setEditArticle(data))
      .catch(() => setError("Impossible de charger l'article"));
  }, [id]);


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    fetch(`http://localhost:3001/articles/${id}`, {
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
      .catch(() => setError("Une erreur est survenue"))
      .finally(() => setIsLoading(false));
    
  }


  return (
    <>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="title"
          value={editArticle.title}
            onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })}
          placeholder="Titre"
          required
        />

        <textarea
          name="excerpt"
          value={editArticle.excerpt}
          onChange={(e) =>
            setEditArticle({ ...editArticle, excerpt: e.target.value })
          }
          placeholder="Résumé"
          required
        />

        <input
          type="text"
          name="image"
          value={editArticle.image}
          onChange={(e) =>
            setEditArticle({ ...editArticle, image: e.target.value })
          }
          placeholder="URL de l'image"
          required
        />

        {/* Messages d'erreur et de succès */}
        {error && (
          <p
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
          {isLoading ? "Envoi..." : "Ajouter"}
        </button>
      </form>
    </>
  );
}
