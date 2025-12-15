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
    <form
      onSubmit={handleSubmit}
      aria-labelledby="contact-title"
      className="contact-form"
      autoComplete="off"
    >
      <h2 id="contact-title">Contactez-nous</h2>

      {/* Message d'erreur */}
      {error && (
        <p
          ref={messageRef}
          role="alert"
          tabIndex={-1}
          className="error-msg"
        >
          {error}
        </p>
      )}

      {/* Message succès */}
      {success && (
        <p
          ref={messageRef}
          role="status"
          tabIndex={-1}
          className="success-msg"
        >
          {success}
        </p>
      )}

      {/* Nom */}
      <div className="form-row">
        <label htmlFor="name">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="given-name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div className="form-row">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Message */}
      <div className="form-row">
        <label htmlFor="message">Message :</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* Bouton */}
      <button className="form-buttons" type="submit" disabled={isLoading} aria-disabled={isLoading}>
        {isLoading ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
