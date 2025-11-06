import { BrowserRouter,Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.js";
import Contact from "./pages/Contact.jsx";
import Article from "./pages/Article.js";
import "./App.css";
import BlogCard from "./components/BlogCard.jsx";
import "./App.css";
import './index.css'


const App = () => {
  return (
    <div>
    
    {/* <Header /> */}
    <Home />
    <Blog />
   </div>
  );
}

export default App;


// const Contact = () => {
//   return (
//     <div>
//       <Contact />
//    </div>
//   );
// }

// export default Contact;
