import logoBu from "../assets/logo-bu.png";
import { Link } from "react-router-dom";


function Header() {
  const title = "Le Blog de l'Univers";
  type Title = {title: string};

  return (
    <header className="header">
      <img src={logoBu} alt="Logo de l'univers" className="logo" />
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

