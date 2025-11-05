import Coeur from "../assets/coeur.png";

const ArticleThumbnail = () => {
  return (
    <div className="article-thumbnail">
      <h1>Salut</h1>
      <img src={Coeur} className="article-thumbnail-image" alt="" />
      <p style={{ color: 'black' }}>"
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        
      </p>
    </div>
  );
};

export default ArticleThumbnail;

// import Coeur from "../assets/coeur.png";


// const ArticleThumbnail = ({ title, content, image }) => {
//   return (
//     <div className="article-thumbnail">
//       <h3>{title}</h3>
//       <img src={image || Coeur} alt={title} />
//       <p>{content}</p>
//     </div>
//   );
// };

// export default ArticleThumbnail;
