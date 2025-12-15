// | Élément              | Rôle                                                       |
// | -------------------- | ---------------------------------------------------------- |
// | `Link`               | Crée un lien interne dans ton app (sans recharger la page) |
// | `to={`/blog/${id}`}` | Génère une URL dynamique selon l’article                   |
// | `useParams()`        | Récupère les valeurs de l’URL actuelle (ici `id`)          |
// | `Article`            | Affiche le contenu de la page selon l’ID récupéré          |


// BlogCard = les aperçus de tes articles.
// Article = la “page de détail” d’un article.
// Link + useParams() = le pont entre les deux

// blog-card.tsx

// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { NasaArticle } from "../pages/Blog";

// export interface BlogCardProps {
//   id: number ;
//   title: string;
//   excerpt: string;
//   image: string;
//   imgdetails?:string;
//   liked?: boolean;
// }

// // export default function BlogCard({ id, title, excerpt, image, imgdetails, liked = false }: BlogCardProps) {
// export default function BlogCard({ article }: { article: NasaArticle }) {
//   const [isLiked, setIsLiked] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const handleDetails = () => {
//     navigate(`/blog/${article.date}`, {state: { article: article }});
//   }

//   return (
    
//     <article
//       className="blog-card"
//       aria-labelledby={`blog-title-${article.date}`}
//       aria-describedby={`blog-excerpt-${article.date}`}
//     >

//       <img
//         src={article.url || "/placeholder.png"}
//         alt={article.title ?? `Illustration pour l’article : ${article.title}`}
//         className="blog-card-image"
//       />

//       <div className="blog-card-body">

//         <h3 id={`blog-title-${article.date}`} className="blog-card-title">
//           {article.title}
//         </h3>

//         <p id={`blog-excerpt-${article.date}`} className="blog-card-excerpt">
//           {article.explanation.substring(0, 150)}
//         </p>

//         <button onClick={handleDetails} className="blog-card-link"
//         >Lire l'article</button>
//         {/* <Link to={`/blog/${article.date}`} className="blog-card-link">
//           Lire l’article →
//         </Link> */}

//           <Link to={`/updatearticle/${article.date}`} aria-label={`Modifier l’article : ${article.title}`} className="edit-btn">
//             Edit 
//           </Link>


// {/* 2. () => setIsLiked(prev => !prev) = setIsLiked est la fonction qui met à jour l’état isLiked (créé avec useState).
// prev représente la valeur actuelle de isLiked. !prev inverse cette valeur  */}
//         <div className="blog-card-like">
//           <button
//             className="like-button"
//             onClick={() => setIsLiked(prev => !prev)}
//             aria-pressed={isLiked}
//             aria-label={isLiked ? "Vous aimez cet article" : "Aimer cet article"}
//           >
//             <span aria-hidden="true">
//               {isLiked ? "❤️" : "🤍"}
//             </span>
//           </button>
//         </div>

//       </div>
//     </article>
//   );
// }





import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Article } from "../pages/Blog";

export default function BlogCard({ article }: { article: Article }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/blog/${article.id}`, { state: { article } });
  };

  return (
    <article className="blog-card">
      <img
        src={article.image || "/placeholder.png"}
        alt={article.title}
        className="blog-card-image"
      />

      <div className="blog-card-body">
        <h3 className="blog-card-title">{article.title}</h3>

        <p className="blog-card-excerpt">{article.excerpt}</p>

        <button onClick={handleDetails}  className="blog-card-link">
          Lire l'article
        </button>

        {article.source === "local" && (
          <Link
            to={`/updatearticle/${article.id}`}
            className="edit-btn"
          >
            Edit
          </Link>
        )}

        <div className="blog-card-like">
          <button
            className="like-button"
            onClick={() => setIsLiked((prev) => !prev)}
            aria-pressed={isLiked}
            aria-label={isLiked ? "Vous aimez cet article" : "Aimer cet article"}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </article>
  );
}

