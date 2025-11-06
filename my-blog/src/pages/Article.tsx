
import { useParams, Link } from "react-router-dom";

export default function Article() {
  const { id } = useParams();

  return (
    <article className="article-page max-w-3xl mx-auto text-center py-10">
      <h2 className="article-title">Article #{id}</h2>
      <p className="article-content text-gray-300 mb-8">
        (Ici tu pourras afficher le contenu complet de ton article sur l’espace)
      </p>
      <Link to="/blog" className="article-back-link">
        ← Retour au blog
      </Link>
    </article>
  );
}
