import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { getMovies } from "./services/movieService.js";

getMovies()
  .then((resultado) => console.log(resultado))
  .catch((erro) => console.log(erro));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
