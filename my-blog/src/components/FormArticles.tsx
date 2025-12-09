import "../App.css";
import React, { useEffect, useRef, useState } from "react";
import { BlogCardProps } from "./BlogCard.tsx";
import { useNavigate } from "react-router-dom";

export default function FormArticles() {
  const [newArticles, setNewArticles] = useState({
    title: "",
    excerpt: "",
    image: "",
    content:"",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState<string | null>(null);

  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const navigate = useNavigate();

    useEffect(() => {
    if (error || success) {
      messageRef.current?.focus();
    }
  }, [error, success]);
  
  
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setNewArticles(prev => ({ ...prev, [name]: value }));
  }


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);


    fetch("http://localhost:5000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
  // SECURITY: prevent CSRF if backend accepts it
        "X-Requested-With": "XMLHttpRequest"
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
        setNewArticles({ title: "", excerpt: "", image: "" , content: ""});

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
          <form onSubmit={handleSubmit} aria-labelledby="form-title" className="contact-form" autoComplete="off">
             <h2 id="form-title">Ajouter un nouvel article</h2>

        <label htmlFor="title" className="">Titre de l’article :</label>
          <input
            type="text"
            name="title"
            value={newArticles.title}
            onChange={handleChange}
            placeholder="Titre"
            required
          />
        
        <label htmlFor="excerpt">Résumé :</label>
          <textarea
            name="excerpt"
            value={newArticles.excerpt}
            onChange={handleChange}
            placeholder="Résumé"
            required
          />
        <label htmlFor="image">Choisir votre image :</label>
          <input
            type="text"
            name="image"
            value={newArticles.image}
            inputMode="url"
            onChange={handleChange}
            placeholder="https://exemple.com/image.webp"
            required
          />
        <label htmlFor="content">Contenu de l’article :</label>
          <textarea
            name="content"
            value={newArticles.content}
            onChange={handleChange}
            placeholder="Contenue de l'article"
            required
          />

      {/* Messages d'erreur et de succès */}
{error && (
  <p ref={messageRef} role="alert" tabIndex={-1} 
  style={{
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
  <p ref={messageRef} role="alert" tabIndex={-1} 
  style={{
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


          <button type="submit" aria-disabled={isLoading} disabled={isLoading}>
            {isLoading ? "Envoi..." : "Ajouter"}
          </button>
        </form>
      </>
    );

}
