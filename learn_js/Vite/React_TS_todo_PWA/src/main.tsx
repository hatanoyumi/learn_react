import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
// import "./index.css"; →→ css部分はMUIを使用するので削除

const root = createRoot(document.getElementById("root") as Element);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

