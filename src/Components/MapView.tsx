// src/Components/MapView.tsx
import React from "react";

interface Props {
    iframeSrc?: string;
    heightCalc?: string;
}

const MapView: React.FC<Props> = ({
    iframeSrc = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2206.7146958255867!2d-64.74108956616047!3d-21.537588140624145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sbo!4v1756243085666!5m2!1ses-419!2sbo",
    heightCalc = "calc(100vh - 7.5rem)",
}) => {
    const containerStyle: React.CSSProperties = {
        width: "100%",                 // importante: usar 100% del contenedor
        maxWidth: "100%",              // evita que un elemento hijo cree overflow
        height: heightCalc,
        marginTop: "3.5rem",
        backgroundColor: "#1E1E1E",
        overflow: "hidden",
        position: "relative",
        display: "block",
    };

    const iframeStyle: React.CSSProperties = {
        width: "100vw",     // usar 100vw evita gaps creados por scrollbars en contenedores
        maxWidth: "100%",
        height: "100%",
        border: 0,
        display: "block",   // evita whitespace debajo del iframe
        transform: "translateX(0)", // por si acaso
    };

    return (
        <div style={containerStyle}>
            <iframe
                title="Mapa demostrativo"
                src={iframeSrc}
                style={iframeStyle}
                loading="lazy"
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
};

export default MapView;
