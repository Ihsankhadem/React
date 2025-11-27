import { FC, useState } from "react";
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
    {
      titre: "Voyager 1 : la sonde qui a quitté le système solaire",
      lien: "/blog/4",
    },
  ];

  const questions: string[] = [
    "Si tu pouvais visiter une planète, laquelle choisirais-tu et pourquoi ?",
    "Penses-tu qu’une civilisation extraterrestre existe quelque part dans l’univers ?",
    "Selon toi, quelle planète pourrait accueillir la vie dans le futur ?",
    "Si on colonisait Mars demain, irais-tu vivre là-bas ?",
    "Quel phénomène spatial te fascine le plus ?",
    "Que penses-tu qu’il y ait à l’intérieur d’un trou noir ?",
    "Si tu pouvais renommer une constellation, comment l'appellerais-tu ?",
    "Selon toi, à quoi ressemblerait un coucher de soleil sur une autre planète ?",
    "Que ferais-tu si tu pouvais passer une journée en apesanteur ?",
    "Quelle est, selon toi, la plus grande menace pour la Terre venant de l’espace ?",
    "Si tu pouvais rencontrer un astronaute célèbre, ce serait qui ?",
    "Penses-tu que l’humanité atteindra un jour une autre galaxie ?",
    "Si tu pouvais observer un événement cosmique sans danger, lequel serais-tu prêt à voir ?",
    "Si tu pouvais choisir un endroit dans l’univers pour construire une base spatiale, où serait-ce ?",
    "Préférerais-tu voyager dans le passé de l’univers ou dans son futur ?",
    "Crois-tu que les étoiles influencent notre destin ?",
    "Si tu pouvais nommer une planète, comment l’appellerais-tu ?",
    "Que ressens-tu en regardant le ciel la nuit ?",
    "Quel est le mystère spatial que tu rêves de voir résolu ?",
    "Si tu pouvais piloter un vaisseau spatial, où irais-tu en premier ?",
    "Penses-tu que l’univers a une fin ou qu’il est infini ?",
    "Que ferait-on si une météorite massive se dirigeait vers la Terre ?",
    "Si tu pouvais envoyer un message dans l’espace, que dirais-tu ?",
    "Qu’est-ce qui te surprend le plus dans la façon dont l’univers fonctionne ?",
    "Selon toi, qu’y a-t-il au-delà de l’univers observable ?",
  ];

  const [comments, setComments] = useState<string>("");
  const [randomQuestions, setRandomQuestions] = useState<string>(
  questions[Math.floor(Math.random() * questions.length)]
);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const choice = questions[Math.floor(Math.random() * questions.length)];
    setRandomQuestions(choice);
  }

  return (
    <>
      {/* Section introduction */}
      <section className="home-intro">
        <h2>Bienvenue dans l’univers fascinant</h2>

        <p>
          Plonge au cœur du cosmos et découvre les mystères qui entourent notre univers :
          étoiles géantes, planètes intrigantes, galaxies lointaines et phénomènes
          encore inexplicables. Chaque article est une porte ouverte vers l’inconnu.
        </p>

        <p>
          Que tu sois passionné d’astronomie, amateur de science-fiction ou simple
          curieux, tu trouveras ici des découvertes étonnantes, des récits inspirants
          et des questions qui bousculent notre vision du monde.
        </p>

        <p>
          Observe, explore, questionne : l’univers évolue sans cesse, et nous aussi.
          Partage ton avis, tes théories et laisse ton imagination voyager au-delà
          des frontières de notre planète.
        </p>

        <p className="home-intro-highlight">
          Alors prépare-toi à lever les yeux vers les étoiles... l’aventure commence maintenant ✨
        </p>
      </section>

      {/* Bloc vidéo + question */}
      <div className="sun-video-container">
        <section className="sun-question-block">
          <div
            className="sun-question"
            aria-live="polite"
          >
            {randomQuestions}
          </div>

          <form onSubmit={handleSubmit} className="sun-form">


            <input
              id="comment-input"
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Et toi, qu'en penses-tu ?"
              className="sun-input"
            />

            <button type="submit" className="button-envoie">
              Envoie
            </button>
          </form>
        </section>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/G6A72ufn3l4?autoplay=1&mute=1"
          title="Vidéo du soleil en haute définition"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Section articles */}
      <div className="home-page">
        <section className="home-content">
          <Link to="/blog" className="home-link">
            Explorer le blog
          </Link>

          <h2 className="popular-articles-title">Articles Populaires :</h2>

          <div className="home-articles-grid">
            {articles.map((article, index) => (
              <div key={index} className="home-article-card">
                <h3>{article.titre}</h3>
                <Link to={article.lien} className="home-article-link">
                  Lire l'article →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;



