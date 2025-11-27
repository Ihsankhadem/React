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
  imgdetails?:string;
  liked?: boolean;
}

export default function BlogCard({ id, title, excerpt, image, imgdetails, liked = false }: BlogCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);


  return (
    
    <article
      className="blog-card"
      aria-labelledby={`blog-title-${id}`}
      aria-describedby={`blog-excerpt-${id}`}
    >

      <img
        src={image}
        alt={imgdetails ?? `Illustration pour l’article : ${title}`}
        className="blog-card-image"
      />

      <div className="blog-card-body">

        <h3 id={`blog-title-${id}`} className="blog-card-title">
          {title}
        </h3>

        <p id={`blog-excerpt-${id}`} className="blog-card-excerpt">
          {excerpt}
        </p>

        <Link to={`/blog/${id}`} className="blog-card-link">
          Lire l’article →
        </Link>

          <Link to={`/updatearticle/${id}`} aria-label={`Modifier l’article : ${title}`} className="edit-btn">
            Edit 
          </Link>


{/* 2. () => setIsLiked(prev => !prev) = setIsLiked est la fonction qui met à jour l’état isLiked (créé avec useState).
prev représente la valeur actuelle de isLiked. !prev inverse cette valeur  */}
        <div className="blog-card-like">
          <button
            className="like-button"
            onClick={() => setIsLiked(prev => !prev)}
            aria-pressed={isLiked}
            aria-label={isLiked ? "Vous aimez cet article" : "Aimer cet article"}
          >
            <span aria-hidden="true">
              {isLiked ? "❤️" : "🤍"}
            </span>
          </button>
        </div>

      </div>
    </article>
  );
}



