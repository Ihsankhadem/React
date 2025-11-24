import "../App.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteArticle() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  function handleDelete() {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    fetch(`http://localhost:3001/articles/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de supprimer l’article");
        }

        setSuccess("Article supprimé !");
        setTimeout(() => navigate("/blog"), 1500);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Erreur lors de la suppression");
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
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

      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "Suppression..." : "Supprimer"}
      </button>
    </>
  );
}
