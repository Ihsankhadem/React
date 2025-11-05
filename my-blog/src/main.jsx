
import "./App.css";
import './index.css'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import React, { StrictMode } from 'react'
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";



const rootdiv = document.getElementById("root");
const root = ReactDOM.createRoot(rootdiv);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <main className="bg-gray-900">
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="/blog" element={<Blog />} />
          <Route path="/article/:id" element={<Article />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  </React.StrictMode>
);
