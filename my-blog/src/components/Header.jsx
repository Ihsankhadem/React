

import { Link } from "react-router-dom";


function Header() {
  const title = "Bienvenue sur mon blog 📰";

  return (
    <header className="header">
      <h1>{title}</h1>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/blog">Articles</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;

