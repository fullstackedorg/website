import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root") || document.createElement("div");
if (!rootElement.id) {
    rootElement.id = "root";
    document.body.append(rootElement);
}

createRoot(rootElement).render(<App />);