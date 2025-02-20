import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import MainRoutes from "./Routes/MainRoutes/MainRoutes";
import { AuthProvider } from "./Providers/AuthProvider/AuthProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MainRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);
