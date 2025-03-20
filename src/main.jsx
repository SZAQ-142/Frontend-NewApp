import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import "./styles/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <App />
    </Routes>
  </Router>
);
