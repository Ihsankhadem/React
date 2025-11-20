import "../App.css";
import React, { useState } from "react";
import { BlogCardProps } from "./BlogCard.tsx";
import { useNavigate } from "react-router-dom";

export default function FormArticles() {
  const [newArticles, setNewArticles] = useState({
    title: "",
    excerpt: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);


    fetch("http://localhost:3001/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticles),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((data) => {
        console.log("Article créé :", data);
        setSuccess("Article créé avec succès !");

        // Reset du formulaire
        setNewArticles({ title: "", excerpt: "", image: "" });

        // Redirection vers /blog 
        setTimeout(() => {
          navigate("/blog");
        }, 1900);
      })


      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
    }

    return (
      <>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="title"
            value={newArticles.title}
            onChange={(e)=> setNewArticles({ ...newArticles, title: e.target.value })}
            placeholder="Titre"
            required
          />

          <textarea
            name="excerpt"
            value={newArticles.excerpt}
            onChange={(e) => setNewArticles({ ...newArticles, excerpt: e.target.value })}
            placeholder="Résumé"
            required
          />

          <input
            type="text"
            name="image"
            value={newArticles.image}
            onChange={(e) => setNewArticles({ ...newArticles, image: e.target.value })}
            placeholder="URL de l'image"
            required
          />

      {/* Messages d'erreur et de succès */}
{error && (
  <p style={{
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "1px solid #f5c6cb",
    margin: "10px 0",
    fontWeight: "bold",
    textAlign: "center",
  }}>
    {error}
  </p>
)}

{success && (
  <p style={{
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "1px solid #c3e6cb",
    margin: "10px 0",
    fontWeight: "bold",
    textAlign: "center",
  }}>
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
