
import "./App.css";
import './index.css'
import ReactDOM from "react-dom/client";
import App from './App.js'
import React, { StrictMode } from 'react'
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Article from "./pages/Article.tsx";
import Blog from "./pages/Blog.tsx";
import Contact from "./pages/Contact.tsx";



const rootdiv = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(rootdiv)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <main className="bg-gray-900">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  </React.StrictMode>
);
