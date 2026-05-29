import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import { ConfigProvider } from "antd";

import "antd/dist/reset.css";

import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 10,
          fontFamily: "Inter, sans-serif"
        }
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
);