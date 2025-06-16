import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { ShopProvider } from "./context/ShopContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <ShopProvider>
      <App />
    </ShopProvider>
  </ThemeProvider>
);
