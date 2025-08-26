// src/index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css"; // estilos globales

import App from "./App";

// Screens / páginas (visual demos)
import Libreria from "./Components/Libreria";
import ConfigurarFotocopias from "./Components/ConfigurarFotocopias";
import CartHeader from "./Components/CartHeader";
import PaymentOption from "./Components/PaymentOption";
import OrderHeader from "./Components/OrderHeader";
import FilterChip from "./Components/FilterChip";

// Si ya tienes pantallas complejas (mantén si las necesitas)
// ... si tienes otras pantallas reales (CartScreen, CheckoutScreen) puedes importarlas aquí

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App principal */}
        <Route path="/" element={<App />} />

        {/* Rutas demo / visuales que pediste */}
        <Route path="/libreria/:id" element={<Libreria />} />
        <Route path="/config-fotocopias" element={<ConfigurarFotocopias />} />

        {/* Componentes visuales accesibles por ruta para demo */}
        <Route path="/cart-header" element={<CartHeader />} />
        <Route path="/payment-option" element={<PaymentOption />} />
        <Route path="/order-header" element={<OrderHeader />} />
        <Route path="/filter-chip" element={<FilterChip />} />

        {/* Mantén o añade aquí tus otras rutas reales si existen */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
