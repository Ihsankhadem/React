import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/Header.tsx";
import Blog from "./pages/Blog.tsx";
import Article from "./components/ContentArticle.tsx";
import Contact from "./pages/Contact.tsx";
import SearchBar from "./components/SearchBar.tsx";
import "./index.css";
import "./App.css";
import NotFound from "./components/NotFound.tsx";
import AddArticles from "./pages/AddArticles.tsx";
import UpdateArticlePage from "./pages/UpdateArticlePage.tsx";
import DeleteArticlePage from "./pages/DeleteArticlePage.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <main className="bg-gray-900 min-h-screen text-white">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Article />} /> 
          <Route path="/addarticle" element={<AddArticles/>} />
          <Route path="/updatearticle/:id" element={<UpdateArticlePage />} />
          <Route path="/deletearticle/:id" element={<DeleteArticlePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contentarticle/:id" element={<Article />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  </React.StrictMode>
);
