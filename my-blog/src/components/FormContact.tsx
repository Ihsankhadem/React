

import { useState } from "react";
 
function FormContact () {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

   function RegisterFormContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Empêche le rechargement de la page par la nagigater lors de la soumission du formulaire
    console.log({name, email, message});
   }
  
  
  return (
    <form onSubmit={RegisterFormContact}>
    
      <label>
        Nom :
        <input
          type="text"
          value={name}
          autoComplete="given-name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
  
      <label>
        Email :
        <input
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Message :
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      <button type="submit">Envoyer</button>
      
    </form>
  );
}

export default FormContact;