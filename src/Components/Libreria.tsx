import React, { type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Componente Libreria (sin Tailwind).
 * - Todos los estilos están aquí en el mismo archivo (objetos JS).
 * - Visual / meramente demostrativo.
 */

export default function Libreria() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<
    "productos" | "servicios" | "opiniones"
  >("productos");

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#F3F4F6",
      color: "#111827",
      fontFamily:
        "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    },

    /* HEADER */
    header: {
      position: "relative",
      width: "100%",
      height: 220,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      overflow: "hidden",
      backgroundColor: "#111827",
      flexShrink: 0,
    },
    headerImage: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.65,
      display: "block",
    },
    headerControls: {
      position: "absolute",
      top: 16,
      right: 16,
      display: "flex",
      gap: 8,
      zIndex: 2,
    },
    circleButton: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.18)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    },

    headerInfo: {
      position: "absolute",
      bottom: 16,
      left: 16,
      color: "#fff",
      zIndex: 2,
    },
    title: {
      margin: 0,
      fontSize: "clamp(18px, 3.2vw, 24px)",
      lineHeight: 1.05,
      fontWeight: 700,
      textShadow: "0 1px 4px rgba(0,0,0,0.6)",
    },
    metaRow: {
      marginTop: 8,
      display: "flex",
      gap: 16,
      alignItems: "center",
      fontSize: 14,
    },

    /* NAV TABS */
    nav: {
      display: "flex",
      borderBottom: "1px solid #E6E7EB",
      background: "#fff",
      flexShrink: 0,
    },
    navButton: {
      flex: 1,
      padding: "12px 10px",
      fontSize: 15,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      textAlign: "center" as const,
    },
    navButtonActive: {
      color: "#2563EB",
      borderBottom: "3px solid #2563EB",
      fontWeight: 600,
    },

    /* CONTENT */
    contentWrap: {
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      flex: 1,
      overflow: "hidden",
    },

    highlightedCard: {
      background: "#EFF6FF",
      border: "1px solid #BFDBFE",
      borderRadius: 12,
      padding: 14,
      cursor: "pointer",
      outline: "none",
    },
    highlightedTitle: {
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      color: "#0F172A",
    },
    highlightedDesc: {
      margin: "6px 0 8px",
      color: "#6B7280",
      fontSize: 14,
    },
    pill: {
      display: "inline-block",
      background: "#ECFDF5",
      color: "#065F46",
      padding: "4px 8px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
    },

    /* Lista productos (scrollable) */
    productsList: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginTop: 4,
      overflowY: "auto",
      paddingRight: 8,
      paddingBottom: 24,
    },
    productCard: {
      background: "#FFFFFF",
      border: "1px solid #E6E7EB",
      borderRadius: 12,
      padding: 12,
      boxShadow: "0 1px 4px rgba(2,6,23,0.04)",
      cursor: "pointer",
      outline: "none",
    },
    productTitle: {
      margin: 0,
      fontSize: 15,
      fontWeight: 600,
      color: "#0F172A",
    },
    productDesc: {
      margin: "8px 0",
      color: "#6B7280",
      fontSize: 13,
    },
    productFooter: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 6,
    },
    priceBold: {
      fontWeight: 700,
      fontSize: 16,
      color: "#0F172A",
    },
    tiny: {
      fontSize: 12,
      color: "#6B7280",
    },

    /* FOOTER / CARRITO */
    footer: {
      background: "#fff",
      borderTop: "1px solid #E6E7EB",
      padding: 12,
      flexShrink: 0,
    },
    footerInner: {
      background: "#2563EB",
      color: "#fff",
      borderRadius: 12,
      padding: "10px 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    footerButton: {
      background: "transparent",
      border: "none",
      color: "#fff",
      fontWeight: 700,
      fontSize: 16,
      cursor: "pointer",
    },
    badge: {
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      padding: "6px 8px",
      borderRadius: 999,
      fontWeight: 700,
    },

    // small utility
    muted: {
      color: "#6B7280",
    },
  };

  // Handler para ir al carrito (mantengo /cart-header si lo usas)
  const goToCart = () => {
    navigate("/cart-header");
  };

  // Nuevo handler: ir a la pantalla de configuración de fotocopias
  const goToConfigFotocopias = () => {
    navigate("/config-fotocopias");
  };

  // keyboard accessibility helper for clickable divs
  const handleKeyNav =
    (fn: () => void) =>
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fn();
        }
      };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <img src="/libreria.jpg" alt="Librería" style={styles.headerImage} />

        <div style={styles.headerControls}>
          <button style={styles.circleButton} aria-label="Favoritos">
            ❤️
          </button>
          <button style={styles.circleButton} aria-label="Compartir">
            🔗
          </button>
          <button style={styles.circleButton} aria-label="Más">
            ⋮
          </button>
        </div>

        <div style={styles.headerInfo}>
          <h1 style={styles.title}>Librería Central</h1>
          <div style={styles.metaRow}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <strong style={{ color: "#FFB703" }}>★</strong> <span>4.7</span>
            </span>
            <span>⏱ 45 min</span>
            <span>📍 1.2 km</span>
          </div>
        </div>
      </header>

      {/* NAV TABS */}
      <nav style={styles.nav}>
        <button
          style={{
            ...styles.navButton,
            ...(activeTab === "productos" ? styles.navButtonActive : { color: "#6B7280" }),
          }}
          onClick={() => setActiveTab("productos")}
        >
          Productos
        </button>
        <button
          style={{
            ...styles.navButton,
            ...(activeTab === "servicios" ? styles.navButtonActive : { color: "#6B7280" }),
          }}
          onClick={() => setActiveTab("servicios")}
        >
          Servicios
        </button>
        <button
          style={{
            ...styles.navButton,
            ...(activeTab === "opiniones" ? styles.navButtonActive : { color: "#6B7280" }),
          }}
          onClick={() => setActiveTab("opiniones")}
        >
          Opiniones
        </button>
      </nav>

      {/* CONTENT */}
      <div style={styles.contentWrap}>
        {/* PRODUCTO DESTACADO — ahora navegable */}
        <section
          style={styles.highlightedCard}
          role="button"
          tabIndex={0}
          onClick={goToConfigFotocopias}
          onKeyDown={handleKeyNav(goToConfigFotocopias)}
          aria-label="Configurar fotocopias"
          title="Configurar fotocopias"
        >
          <h2 style={styles.highlightedTitle}>Fotocopias / Impresiones</h2>
          <p style={styles.highlightedDesc}>
            Servicio de fotocopiado e impresión de documentos
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={styles.pill}>Precio fijo</span>
            <div style={{ ...styles.priceBold, marginLeft: 6 }}>Bs 0.50</div>
            <div style={styles.tiny}>por página</div>
          </div>

          <p style={{ ...styles.tiny, marginTop: 8 }}>
            Precio por unidad. Pedido mínimo 1 pág.
          </p>
        </section>

        {/* LISTA DE PRODUCTOS (scrollable) */}
        <section style={styles.productsList} aria-live="polite">
          {/* Ejemplo de productos; ahora cada article también navega a config-fotocopias */}
          <article
            style={styles.productCard}
            role="button"
            tabIndex={0}
            onClick={goToConfigFotocopias}
            onKeyDown={handleKeyNav(goToConfigFotocopias)}
            title="Configurar Impresión a color"
          >
            <h3 style={styles.productTitle}>Impresión a color</h3>
            <p style={styles.productDesc}>Impresión de documentos en color de alta calidad</p>
            <div style={styles.productFooter}>
              <span style={styles.pill}>Precio fijo</span>
              <div style={{ marginLeft: 6, ...styles.priceBold }}>Bs 2.00</div>
              <div style={styles.tiny}>por página</div>
            </div>
            <p style={{ ...styles.tiny, marginTop: 8 }}>
              Precio por unidad. Pedido mínimo 1 pág.
            </p>
          </article>

          <article
            style={styles.productCard}
            role="button"
            tabIndex={0}
            onClick={goToConfigFotocopias}
            onKeyDown={handleKeyNav(goToConfigFotocopias)}
            title="Configurar Escaneo de documentos"
          >
            <h3 style={styles.productTitle}>Escaneo de documentos</h3>
            <p style={styles.productDesc}>Digitalización de documentos físicos</p>
            <div style={styles.productFooter}>
              <span style={styles.pill}>Precio fijo</span>
              <div style={{ marginLeft: 6, ...styles.priceBold }}>Bs 1.50</div>
              <div style={styles.tiny}>por página</div>
            </div>
            <p style={{ ...styles.tiny, marginTop: 8 }}>
              Precio por unidad. Pedido mínimo 1 pág.
            </p>
          </article>

          <article
            style={styles.productCard}
            role="button"
            tabIndex={0}
            onClick={() => console.log("Cerrar carrito")}
            onKeyDown={handleKeyNav(goToConfigFotocopias)}
            title="Configurar Encuadernado simple"
          >
            <h3 style={styles.productTitle}>Encuadernado simple</h3>
            <p style={styles.productDesc}>Encuadernado básico con espiral plástico</p>
            <div style={styles.productFooter}>
              <span style={styles.pill}>Precio fijo</span>
              <div style={{ marginLeft: 6, ...styles.priceBold }}>Bs 5.00</div>
              <div style={styles.tiny}>por unidad</div>
            </div>
            <p style={{ ...styles.tiny, marginTop: 8 }}>
              Precio por unidad. Pedido mínimo 1 unidad.
            </p>
          </article>

          <article
            style={styles.productCard}
            role="button"
            tabIndex={0}
            onClick={() => console.log("Cerrar carrito")}
            onKeyDown={handleKeyNav(goToConfigFotocopias)}
            title="Configurar Plastificado"
          >
            <h3 style={styles.productTitle}>Plastificado</h3>
            <p style={styles.productDesc}>Plastificado de documentos tamaño carta</p>
            <div style={styles.productFooter}>
              <span style={styles.pill}>Precio fijo</span>
              <div style={{ marginLeft: 6, ...styles.priceBold }}>Bs 3.00</div>
              <div style={styles.tiny}>por página</div>
            </div>
            <p style={{ ...styles.tiny, marginTop: 8 }}>
              Precio por unidad. Pedido mínimo 1 pág.
            </p>
          </article>
        </section>
      </div>

      {/* FOOTER / CARRITO */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <button
            style={styles.footerButton}
            onClick={goToCart}
            aria-label="Ir al carrito"
          >
            Ir al carrito
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={styles.badge}>3</span>
            <span style={{ fontWeight: 700 }}>Bs 15.50</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
