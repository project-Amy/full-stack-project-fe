import "@ant-design/v5-patch-for-react-19";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App as AntdApp } from "antd";
import "./index.css";
import App from "./App.tsx";
import CustomQueryClientProvider from "./api/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntdApp>
      <CustomQueryClientProvider>
        <App />
      </CustomQueryClientProvider>
    </AntdApp>
  </StrictMode>,
);
