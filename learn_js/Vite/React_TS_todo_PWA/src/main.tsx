import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// サービスワーカーを登録
import { registerSW } from "virtual:pwa-register";

import { App } from "./App";
// import "./index.css"; →→ css部分はMUIを使用するので削除


createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <App />
  </StrictMode>
);

registerSW();

