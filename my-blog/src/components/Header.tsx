import logoBu from "../assets/logo-bu.png";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const title = "Le Blog de l'Univers";
  const location = useLocation();

  return (
    <header className="header">
      
      <a href="#main-content" className="visually-hidden">
        Aller au contenu principal
      </a>
      {/* Logo */}
      <img
        src={logoBu}
        alt="Logo du Blog de l'Univers"
        className="logo"
      />

      {/* Titre */}
      <h1 id="site-title">{title}</h1>

      {/*Ce label informe les lecteurs d’écran de la fonction du bloc navigation.*/}
      <nav aria-label="Navigation principale">
        <Link
          to="/"
          aria-current={location.pathname === "/" ? "page" : undefined}
        >
          Home
        </Link>
      {/* Le lien correspondant à la page affichée est annoncé comme actif. */}
        <Link
          to="/blog"
          aria-current={location.pathname.startsWith("/blog") ? "page" : undefined}
        >
          Articles
        </Link>

        <Link
          to="/contact"
          aria-current={location.pathname === "/contact" ? "page" : undefined}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
