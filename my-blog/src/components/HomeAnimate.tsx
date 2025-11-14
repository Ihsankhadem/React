import { Link } from "react-router-dom";

export default function Home() {
  const faits = [
    "Une journée sur Vénus dure plus longtemps qu’une année sur Vénus.",
    "Sur Mars, le coucher de soleil est bleu.",
    "Il y a plus d’étoiles dans l’univers que de grains de sable sur Terre.",
    "Jupiter est si grande que toutes les autres planètes pourraient y tenir.",
  ];

  const articles = [
    { titre: "Les secrets des trous noirs", lien: "/blog/1" },
    { titre: "La vie sur Mars : mythe ou futur ?", lien: "/blog/2" },
    { titre: "Les constellations les plus connues", lien: "/blog/3" },
    { titre: "Voyager 1 : la sonde qui a quitté le système solaire", lien: "/blog/4" },
    { titre: "Le Big Bang expliqué simplement", lien: "/blog/5" },
  ];

  const temoignages = [
    { nom: "Léa", texte: "J’ai appris plein de choses sur le système solaire" },
    { nom: "Omar", texte: "Des articles clairs et passionnants" },
    { nom: "Clara", texte: "Les citations donnent vraiment envie de rêver" },
  ];

  const randomFact = faits[Math.floor(Math.random() * faits.length)];

  return (
    <section className="home-page">
      {/* Introduction */}

      {/* Contenu principal (2 bulles côte à côte) */}
      <div className="home-content">
        {/* Le saviez-vous */}
        <div className="home-fact">
          <h2>Le saviez-vous ?</h2>
          <p>{randomFact}</p>
        </div>

      <div className="home-hero">
        <Link to="/blog" className="home-link">
          Lire les articles
        </Link>
      </div>


        {/* Articles populaires avec scroll horizontal */}
        <div className="home-populaires">
          <h2>Articles populaires</h2>
          <div className="scroll-container">
            {articles.map((article, i) => (
              <div key={i} className="article-card">
                <Link to={article.lien}>{article.titre}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commentaires */}
      <div className="home-temoignages">
        <h2>💬 Top commentaires</h2>
        {temoignages.map((t, i) => (
          <div key={i} className="temoignage">
            <strong>{t.nom}</strong>
            <p>{t.texte}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
