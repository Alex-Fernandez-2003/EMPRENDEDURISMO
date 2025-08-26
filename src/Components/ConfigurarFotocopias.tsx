import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ToggleSwitch({
    checked: initial = false,
    onChange,
}: {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}) {
    const [checked, setChecked] = useState<boolean>(initial);
    const handleToggle = () => {
        const next = !checked;
        setChecked(next);
        onChange?.(next);
    };

    const styles: { [k: string]: React.CSSProperties } = {
        wrapper: { display: "inline-flex", alignItems: "center", cursor: "pointer" },
        track: {
            width: 44,
            height: 26,
            borderRadius: 999,
            backgroundColor: checked ? "#2563EB" : "#E5E7EB",
            position: "relative",
            transition: "background-color .18s ease",
        },
        thumb: {
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: "#fff",
            position: "absolute",
            top: 4,
            left: checked ? 22 : 4,
            transition: "left .18s ease",
            boxShadow: "0 1px 3px rgba(2,6,23,0.2)",
        },
        input: { display: "none" },
    };

    return (
        <div style={styles.wrapper} onClick={handleToggle} role="switch" aria-checked={checked}>
            <div style={styles.track}>
                <div style={styles.thumb} />
            </div>
            <input style={styles.input} readOnly aria-hidden value={checked ? "on" : "off"} />
        </div>
    );
}

export default function ConfigurarFotocopias({ onClose }: { onClose?: () => void }) {
    const [copies, setCopies] = useState<number>(1);
    const [isDouble, setIsDouble] = useState<boolean>(false);

    const incr = () => setCopies((c) => Math.max(1, c + 1));
    const decr = () => setCopies((c) => Math.max(1, c - 1));

    const styles: { [k: string]: React.CSSProperties } = {
        overlay: {
            minHeight: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: 24,
            boxSizing: "border-box",
            fontFamily:
                "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        },
        dialog: {
            width: "100%",
            maxWidth: 448,
            backgroundColor: "#fff",
            borderRadius: "24px 24px 8px 8px",
            boxShadow: "0 12px 30px rgba(2,6,23,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        },

        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #E6E7EB",
        },
        heading: { margin: 0, fontSize: 18, fontWeight: 700, color: "#0F172A" },
        closeBtn: {
            width: 36,
            height: 36,
            borderRadius: 999,
            backgroundColor: "#F3F4F6",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 16,
        },

        section: { padding: 16, borderBottom: "1px solid #F1F5F9" },

        uploadBox: {
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            border: "2px dashed #D1D5DB",
            borderRadius: 12,
            padding: 24,
            backgroundColor: "#F8FAFC",
            textAlign: "center" as const,
        },

        previewRow: { display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6 },
        thumb: {
            width: 64,
            height: 84,
            backgroundColor: "#E5E7EB",
            borderRadius: 8,
            border: "2px solid transparent",
            flexShrink: 0,
        },
        thumbWarning: { borderColor: "#FCA5A5" },

        optionTitle: { margin: "0 0 8px 0", fontSize: 14, fontWeight: 700, color: "#0F172A" },
        smallMuted: { fontSize: 13, color: "#6B7280", marginTop: 6 },

        qtyControls: { display: "flex", alignItems: "center", gap: 8 },
        qtyBtn: {
            width: 40,
            height: 40,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            border: "1px solid #E6E7EB",
            background: "#fff",
            cursor: "pointer",
            fontSize: 20,
        },
        qtyDisplay: {
            minWidth: 56,
            height: 40,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            border: "1px solid #E6E7EB",
            background: "#fff",
            fontWeight: 700,
        },

        /* fixes for radio rows */
        radioBox: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            border: "1px solid #E6E7EB",
            borderRadius: 10,
            padding: "8px 12px",
            cursor: "pointer",
            minHeight: 44,
            boxSizing: "border-box",
            backgroundColor: "#fff", // explicit to avoid inheritance
        },
        radioLabel: {
            display: "flex",
            alignItems: "center",
            gap: 12,
        },
        radioInput: {
            width: 18,
            height: 18,
            margin: 0,
            padding: 0,
            display: "inline-block",
            verticalAlign: "middle",
            accentColor: "#2563EB" as any,
            WebkitAppearance: "radio" as any,
            appearance: "radio" as any,
            boxSizing: "border-box",
        },

        /* explicit span styles to override global/leftover rules */
        spanText: { color: "#0F172A", fontSize: 14 }, // primary text inside spans
        spanMuted: { color: "#6B7280", fontSize: 13 }, // muted small text
        spanAccent: { color: "#EA580C", fontSize: 14, fontWeight: 600 }, // + price badge
        pill: {
            display: "inline-block",
            background: "#ECFDF5",
            color: "#065F46",
            padding: "4px 8px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
        },

        footer: {
            borderTop: "1px solid #E6E7EB",
            padding: 16,
            background: "#fff",
            boxSizing: "border-box",
        },
        footerTotals: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 },
        footerLine: { display: "flex", justifyContent: "space-between", color: "#4B5563", fontSize: 14 },
        footerTotalLine: { display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800 },
        addButton: {
            width: "100%",
            padding: "12px 14px",
            backgroundColor: "#F97316",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 15,
        },
    };

    const handleClose = () => {
        if (onClose) onClose();
        else console.log("Cerrar modal (onClose no provisto)");
    };
    const navigate = useNavigate();

    return (
        <div style={styles.overlay} role="dialog" aria-modal="true" aria-label="Configurar fotocopias">
            <div style={styles.dialog}>
                <header style={styles.header}>
                    <h1 style={styles.heading}>Configurar Fotocopias</h1>
                    <button style={styles.closeBtn} onClick={handleClose} aria-label="Cerrar">
                        ✖
                    </button>
                </header>

                <section style={styles.section}>
                    <h2 style={styles.optionTitle}>Subir archivo</h2>

                    <div style={styles.uploadBox}>
                        <div style={{ fontSize: 36, color: "#9CA3AF" }}>📄</div>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0F172A" }}>Arrastra tu archivo aquí</p>
                        <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>PDF, JPG — máximo 20 MB</p>
                        <button style={{ marginTop: 12, padding: "8px 12px", borderRadius: 10, backgroundColor: "#2563EB", color: "#fff", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                            Seleccionar archivo
                        </button>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <h2 style={styles.optionTitle}>Vista previa</h2>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 999, background: "#FEF3F2", color: "#7F1D1D", fontSize: 13 }}>
                            ⚠️ DPI bajo
                        </span>
                    </div>

                    <div style={styles.previewRow}>
                        <div style={{ ...styles.thumb, ...styles.thumbWarning }} />
                        <div style={styles.thumb} />
                        <div style={styles.thumb} />
                    </div>
                </section>

                <section style={{ ...styles.section, paddingBottom: 12, flex: 1, overflowY: "auto" }}>
                    <div style={{ marginBottom: 12 }}>
                        <h3 style={styles.optionTitle}>Cantidad de copias</h3>
                        <div style={styles.qtyControls}>
                            <button style={styles.qtyBtn} onClick={decr} aria-label="Disminuir">−</button>
                            <div style={styles.qtyDisplay}>{copies}</div>
                            <button style={styles.qtyBtn} onClick={incr} aria-label="Aumentar">＋</button>
                        </div>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <h3 style={styles.optionTitle}>Color</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <label style={styles.radioBox}>
                                <div style={styles.radioLabel}>
                                    <input type="radio" name="color" defaultChecked style={styles.radioInput} />
                                    <span style={styles.spanText}>Blanco y Negro</span>
                                </div>
                            </label>

                            <label style={styles.radioBox}>
                                <div style={styles.radioLabel}>
                                    <input type="radio" name="color" style={styles.radioInput} />
                                    <span style={styles.spanText}>Color</span>
                                </div>
                                <span style={styles.spanAccent}>+Bs 2.50</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <h3 style={styles.optionTitle}>Tamaño</h3>
                        <div style={styles.radioBox}>
                            <span style={styles.spanText}>Carta</span>
                            <span style={styles.spanMuted}>▼</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <h3 style={styles.optionTitle}>Papel</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <label style={styles.radioBox}>
                                <div style={styles.radioLabel}>
                                    <input type="radio" name="papel" defaultChecked style={styles.radioInput} />
                                    <span style={styles.spanText}>80gsm (estándar)</span>
                                </div>
                            </label>

                            <label style={styles.radioBox}>
                                <div style={styles.radioLabel}>
                                    <input type="radio" name="papel" style={styles.radioInput} />
                                    <span style={styles.spanText}>120gsm (premium)</span>
                                </div>
                                <span style={styles.spanAccent}>+Bs 1.50</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={styles.spanText}>Impresión a doble cara</span>
                        <ToggleSwitch checked={isDouble} onChange={(v) => setIsDouble(v)} />
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <h3 style={styles.optionTitle}>Encuadernado</h3>
                        <div style={styles.radioBox}>
                            <span style={styles.spanText}>Sin encuadernar</span>
                            <span style={styles.spanMuted}>▼</span>
                        </div>
                    </div>
                </section>

                <footer style={styles.footer}>
                    <div style={styles.footerTotals}>
                        <div style={styles.footerLine}>
                            <span style={styles.spanMuted}>Subtotal (3 copias)</span>
                            <span style={styles.spanText}>Bs 7.50</span>
                        </div>
                        <div style={styles.footerLine}>
                            <span style={styles.spanMuted}>Tarifa de servicio</span>
                            <span style={styles.spanText}>Bs 2.00</span>
                        </div>
                        <div style={styles.footerTotalLine}>
                            <span style={styles.spanText}>Total</span>
                            <span style={styles.spanText}>Bs 9.50</span>
                        </div>
                    </div>

                    <button style={styles.addButton}
                        onClick={() => navigate("/libreria/1")}
                    >
                        Añadir al carrito
                    </button>
                </footer>
            </div>
        </div>
    );
}
