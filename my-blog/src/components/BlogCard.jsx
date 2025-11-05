
import { Link } from "react-router-dom";

export default function BlogCard({ id, title, excerpt, image }) {
  return (
    <article className="blog-card">
      <img src={image} alt={title} className="blog-card-image" />
      <div className="blog-card-body">
        <h3 className="blog-card-title">{title}</h3>
        <p className="blog-card-excerpt">{excerpt}</p>
        <Link to={`/blog/${id}`} className="blog-card-link">
          Lire l’article →
        </Link>
      </div>
    </article>
  );
}



