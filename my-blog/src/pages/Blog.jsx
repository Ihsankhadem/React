import BlogCard from "../components/BlogCard.jsx";
import "../App.css";

const articles = [
  {
    id: 1,
    title: "Le Soleil : le cœur du Système solaire",
    excerpt:
      "Découvrez comment notre étoile nourrit la vie sur Terre et influence les planètes.",
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "La Lune et ses mystères",
    excerpt:
      "Crêtes, mers, éclipses : plongez dans les secrets du seul satellite naturel de la Terre.",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Les planètes géantes : Jupiter et Saturne",
    excerpt:
      "Explorez les titans gazeux et leurs fascinants systèmes d’anneaux et de lunes.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Mars : la planète rouge",
    excerpt:
      "Entre mythes et exploration, découvrez pourquoi Mars fascine tant les scientifiques.",
    image:
      "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Les comètes et les astéroïdes",
    excerpt:
      "Ces voyageurs glacés ou rocheux détiennent les secrets de la naissance du Système solaire.",
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "La Voie lactée et les galaxies voisines",
    excerpt:
      "Partez à la découverte de notre galaxie et de ses milliards d’étoiles.",
    image:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Les trous noirs : les mystères de l’espace-temps",
    excerpt:
      "Que se passe-t-il au-delà de l’horizon des événements ? Découvrez ces monstres cosmiques.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "L’exploration spatiale moderne",
    excerpt:
      "Des missions Artemis à SpaceX, suivez les nouvelles conquêtes de l’humanité dans l’espace.",
    image:
      "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Blog() {
  return (
    <section className="blog-container">
      {articles.map((article) => (
        <BlogCard key={article.id} {...article} />
      ))}
    </section>
  );
}
