

import { useState } from "react";

export interface FormContactProps {
onSubmit: (data: {name: string; email: string; message: string}) => void;
};


 
function FormContact ({onSubmit}: FormContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

   function RegisterFormContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({name, email, message});
   }
  
  
  return (
    <form onSubmit ={RegisterFormContact}>
    
      <label>
        Nom :
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
  
      <label>
        Email :
        <input
          type="email"
          value={email}
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