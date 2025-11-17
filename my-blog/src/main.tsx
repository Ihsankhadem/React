import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/Header.tsx";
import Blog from "./pages/Blog.tsx";
import Article from "./pages/Article.tsx";
import Contact from "./pages/Contact.tsx";
import SearchBar from "./components/SearchBar.tsx";
import "./index.css";
import "./App.css";
import NotFound from "./components/NotFound.tsx";

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
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  </React.StrictMode>
);
