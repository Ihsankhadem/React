import "../App.css";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteArticle() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, [error, success]);

  function handleDelete() {
    if (!id) {
      setError("Identifiant d’article manquant.");
      return;
    }

    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet article ? Cette action est définitive."
    );
    if (!confirmDelete) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    fetch(`http://localhost:5000/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Impossible de supprimer l’article");
        setSuccess("Article supprimé !");
        setTimeout(() => navigate("/blog"), 1500);
      })
      .catch((err: any) => {
        console.error(err);
        setError(err.message || "Erreur lors de la suppression");
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="delete-article-container">
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


      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="delete-btn"
      >
        {isLoading ? "Suppression..." : "Supprimer"}
      </button>
    </div>
  );
}
