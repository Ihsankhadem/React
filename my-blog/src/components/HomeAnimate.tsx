
import { FC } from "react";
import { Link } from "react-router-dom";

type Article = {
  titre: string;
  lien: string;
};

const Home: FC = () => {
  const articles: Article[] = [
    { titre: "Les secrets des trous noirs", lien: "/blog/1" },
    { titre: "La vie sur Mars : mythe ou futur ?", lien: "/blog/2" },
    { titre: "Les constellations les plus connues", lien: "/blog/3" },
    { titre: "Voyager 1 : la sonde qui a quitté le système solaire", lien: "/blog/4" },
  ];

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <Link to="/blog" className="home-link">
          Explorer le blog
        </Link>
      </section>

      <section className="home-content">
        {articles.map((article, index) => (
          <div key={index} className="home-article-card">
            <h3>{article.titre}</h3>
            <Link to={article.lien} className="home-article-link">
              Lire l'article →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
