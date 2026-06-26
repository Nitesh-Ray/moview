import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <h1>Day 18 – Full Project: Movie Search App (API, Debounce, Routing, Favourites)</h1>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
