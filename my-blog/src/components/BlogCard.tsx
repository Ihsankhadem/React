// | Élément              | Rôle                                                       |
// | -------------------- | ---------------------------------------------------------- |
// | `Link`               | Crée un lien interne dans ton app (sans recharger la page) |
// | `to={`/blog/${id}`}` | Génère une URL dynamique selon l’article                   |
// | `useParams()`        | Récupère les valeurs de l’URL actuelle (ici `id`)          |
// | `Article`            | Affiche le contenu de la page selon l’ID récupéré          |


// BlogCard = les aperçus de tes articles.
// Article = la “page de détail” d’un article.
// Link + useParams() = le pont entre les deux


import { Link } from "react-router-dom";
import { useState } from "react";

export interface BlogCardProps {
  id: number ;
  title: string;
  excerpt: string;
  image: string;
  liked?: boolean;
}

export default function BlogCard({ id, title, excerpt, image, liked = false }: BlogCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  return (
    <article className="blog-card">
      <img src={image} alt={title} className="blog-card-image" />
      <div className="blog-card-body">
        <h3 className="blog-card-title">{title}</h3>
        <p className="blog-card-excerpt">{excerpt}</p>
        
        <Link to={`/blog/${id}`} className="blog-card-link">
          Lire l’article →
        </Link>

          <Link to={`/updatearticle/${id}`} className="edit-btn">
            Edit
          </Link>



        <div className="blog-card-like">
          <button
            className="like-button"
            onClick={() => setIsLiked(prev => !prev)}
            aria-label={isLiked ? "Vous aimez cet article" : "Aimer cet article"}
          >
            {isLiked ? "❤️" : "🤍"} 
          </button>
        </div>

      </div>
    </article>
  );
}



