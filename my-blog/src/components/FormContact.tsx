

import { useState, useRef, useEffect } from "react";

interface ContactData {
  name: string;
  email: string;
  message: string;
}

export default function FormContact() {
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    setTimeout(() => {
      if (!formData.email.includes("@")) {
        setError("Adresse email invalide.");
        setIsLoading(false);
        return;
      }

      setSuccess("Message envoyé avec succès !");
      setFormData({ name: "", email: "", message: "" });
      setIsLoading(false);
    }, 1000);
  }



  return (
      <form onSubmit={handleSubmit} aria-labelledby="contact-title" className="contact-form">

      {error && (
        <p
          ref={messageRef}
          role="alert"
          tabIndex={-1}
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #f5c6cb",
            margin: "10px 0",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          ref={messageRef}
          role="status"
          tabIndex={-1}
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #c3e6cb",
            margin: "10px 0",
            fontWeight: "bold",
          }}
        >
          {success}
        </p>
      )}


      <label>
        Nom :
        <input
          type="text"
          name="name"  
          value={formData.name}
          autoComplete="given-name"
          onChange={handleChange}
          required
        />
      </label>
  
      <label>
        Email :
        <input
          type="email"
          name="email"  
          value={formData.email}
          autoComplete="email"
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Message :
        <textarea
          value={formData.message}
          name="message"  
          onChange={handleChange}
          required
        />
      </label>

          <button type="submit" aria-disabled={isLoading} disabled={isLoading}>
            {isLoading ? "Envoi..." : "Envoyer"}
          </button>
      
    </form>
  );
}

