// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";

// const container = document.getElementById("root");

// if (container) {
//   createRoot(container).render(
//     <StrictMode>
//       <App />
//     </StrictMode>
//   );
// }

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
