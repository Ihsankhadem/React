// import React, { useEffect, useRef, useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import "../App.css";

// interface NasaArticle {
//   title: string;
//   explanation: string;
//   url: string;
//   date: string;
//   media_type: string;
// }

// export default function ContentArticle() {
//   const { id } = useParams(); // id ici correspond à l'index dans le tableau
//   const headingRef = useRef<HTMLHeadingElement | null>(null);
//   const location = useLocation();

//   const [article, setArticle] = useState<NasaArticle | null>(location.state?.article || null);
//   // const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
  
//   if (error)
//     return (
//       <p role="alert" aria-live="assertive" style={{ color: "red" }}>
//         {error}
//       </p>
//     );

//   if (!article) return <p>aucun articles</p>

//   return (
//     <article
//       aria-labelledby="article-title"
//       className="article-page max-w-3xl mx-auto text-center py-10"
//     >
//       <h1
//         id="article-title"
//         className="article-title"
//         tabIndex={-1}
//         ref={headingRef}
//       >
//         {article?.title}
//       </h1>

//       <img
//         src={article?.url}
//         alt={`Illustration de l’article : ${article?.title}`}
//         style={{
//           maxWidth: "500px",
//           width: "100%",
//           borderRadius: "12px",
//           margin: "1rem auto",
//         }}
//       />

//       <p aria-label="Contenu de l’article" className="article-contents">
//         {article?.explanation}
//       </p>

//       <Link
//         to="/blog"
//         aria-label="Retour à la liste des articles du blog"
//         className="article-back-link"
//       >
//         ← Retour au blog
//       </Link>
//     </article>
//   );
// }









import React, { useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "../App.css";

export default function ContentArticle() {
  const { id } = useParams();
  const location = useLocation();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const article = location.state?.article;

  if (!article) return <p>Aucun article trouvé.</p>;

  const image =
    article.source === "nasa" ? article.image : article.image;

  const content =
    article.source === "nasa" ? article.content : article.content;

  return (
    <article className="article-page max-w-3xl mx-auto text-center py-10">
      <h1 className="article-title" ref={headingRef}>
        {article.title}
      </h1>

      {image && (
        <img
          src={image}
          alt={article.title}
          className="article-image"
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "12px",
            margin: "1rem auto",
          }}
        />
      )}

      <p className="article-contents">{content}</p>

      <Link to="/blog" className="article-back-link">
        ← Retour au blog
      </Link>
    </article>
  );
}
