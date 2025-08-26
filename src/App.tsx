// src/App.tsx
import React, { useState } from "react";
import MapView from "./Components/MapView";
import { useNavigate } from "react-router-dom";

// TopBar
const TopBar: React.FC<{ onSearch: (value: string) => void }> = ({ onSearch }) => {
  return (
    <div style={styles.topBar}>
      {/* Logo desde public/imagen.png */}
      <img src="/LOGO.png" alt="Logo" style={styles.topLogo} />
      <div style={styles.menuIcon}>☰</div>
      <input
        type="text"
        placeholder="Buscar librería o dirección"
        style={styles.searchInput}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div style={styles.profileIcon}>👤 </div>
    </div>
  );
};

// BottomSheet (reemplaza la versión anterior)
const BottomSheet: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const navigate = useNavigate();

  // handler genérico que navega a la librería y (opcional) cierra el bottom (no necesario si la ruta reemplaza App)
  const goToLibrary = (id: string) => {
    // navega a la ruta visual de librería
    navigate(`/libreria/${id}`);
  };

  // helper para accesibilidad (Enter / Space)
  const handleKeyPress =
    (id: string) =>
      (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if ("key" in (e as any)) {
          const key = (e as any).key;
          if (key !== "Enter" && key !== " ") return;
        }
        goToLibrary(id);
      };

  return (
    <div
      style={{
        ...styles.bottomSheet,
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div
        style={styles.libraryCard}
        role="button"
        tabIndex={0}
        onClick={() => goToLibrary("1")}
        onKeyDown={handleKeyPress("1")}
        aria-label="Abrir Librería 1"
      >
        <img src="/logoLibreria.png" alt="Logo" style={styles.logo} />
        <div style={styles.libraryInfo}>
          <div style={{ fontWeight: 600 }}>Librería 1</div>
          <div style={{ color: "#9CA3AF", fontSize: 13 }}>2 km - Listo en 10 min - $15 - ★4.6</div>
        </div>
      </div>

      <div
        style={styles.libraryCard}
        role="button"
        tabIndex={0}
        onClick={() => goToLibrary("2")}
        onKeyDown={handleKeyPress("2")}
        aria-label="Abrir Librería 2"
      >
        <img src="/logoLibreria.png" alt="Logo" style={styles.logo} />
        <div style={styles.libraryInfo}>
          <div style={{ fontWeight: 600 }}>Librería 2</div>
          <div style={{ color: "#9CA3AF", fontSize: 13 }}>3 km - Listo en 15 min - $20 - ★4.8</div>
        </div>
      </div>
    </div>
  );
};

// InfoBanner
const InfoBanner: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div style={styles.infoBanner} onClick={onClick}>
      Ingresar dirección
    </div>
  );
};

// App principal
const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);

  return (
    <div style={styles.container}>
      <TopBar onSearch={setSearchValue} />
      <InfoBanner onClick={() => alert("Abrir dirección")} />

      {/* Usamos MapView importado desde components */}
      <MapView />

      <BottomSheet isVisible={bottomSheetVisible} />

      <div style={styles.locationButton} onClick={() => alert("Ubicación actual")}>
        📍
      </div>
    </div>
  );
};

// Estilos responsivos (se mantienen igual)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#000000",
    minHeight: "90vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', sans-serif",
    color: "#FFFFFF",
  },
  topBar: {
    height: "3.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    backgroundColor: "rgba(15, 139, 141, 0.8)",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 10,
    flexWrap: "wrap",
  },
  topLogo: {
    width: "2rem",
    height: "2rem",
    marginRight: "0.5rem",
    borderRadius: "0.25rem",
    objectFit: "cover",
  },
  menuIcon: {
    cursor: "pointer",
    color: "#FFFFFF",
    fontSize: "1.5rem",
    marginRight: "0.5rem",
  },
  searchInput: {
    flex: 1,
    margin: "0 0.5rem",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    border: "none",
    fontSize: "1rem",
    backgroundColor: "#2B2E33",
    color: "#FFFFFF",
    minWidth: "150px",
  },
  profileIcon: {
    cursor: "pointer",
    color: "#FFFFFF",
    fontSize: "1.5rem",
  },
  // Si estás usando MapView con iframe o imagen, el contenedor real del mapa lo maneja MapView
  mapContainer: {
    flex: 1,
    position: "relative",
    marginTop: "3.5rem",
    backgroundColor: "#1E1E1E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mapPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: "1.2rem",
    textAlign: "center",
    padding: "1rem",
  },
  pin: {
    width: "1.5rem",
    height: "1.5rem",
    backgroundColor: "#FF9F1C",
    borderRadius: "50%",
    border: "2px solid #FFFFFF",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  },
  bottomSheet: {
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
    padding: "1rem",
    position: "fixed",
    bottom: 0,
    width: "100%",
    maxHeight: "70vh",
    overflowY: "auto",
    zIndex: 20,
  },
  libraryCard: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem",
    margin: "0.5rem 0",
    backgroundColor: "#2B2E33",
    borderRadius: "0.5rem",
    cursor: "pointer",
    transition: "transform 0.2s",
    flexWrap: "wrap",
  },
  libraryInfo: {
    marginLeft: "0.75rem",
    color: "#FFFFFF",
    fontSize: "0.9rem",
  },
  logo: {
    width: "3rem",
    height: "3rem",
    borderRadius: "0.5rem",
    objectFit: "cover",
  },
  infoBanner: {
    backgroundColor: "#FF9F1C",
    padding: "0.75rem",
    textAlign: "center",
    color: "#FFFFFF",
    position: "fixed",
    top: "3.5rem",
    width: "100%",
    cursor: "pointer",
    zIndex: 15,
    fontSize: "1rem",
  },
  locationButton: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    width: "3.5rem",
    height: "3.5rem",
    backgroundColor: "#17BEBB",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    color: "#FFFFFF",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
};

export default App;
