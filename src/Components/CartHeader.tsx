import React from "react";
import { X, Minus, Plus, Trash, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type CartItemProps = {
    name: string;
    details: string;
    price: string;
    qty: number;
    total: string;
};

function CartHeader({ itemCount }: { itemCount: number }) {
    const styles: { [k: string]: React.CSSProperties } = {
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
            borderBottom: "1px solid #E5E7EB",
            backgroundColor: "#fff",
            width: "100%",
            boxSizing: "border-box",
        },
        left: { display: "flex", alignItems: "center", gap: 12 },
        title: { fontSize: 18, fontWeight: 600, color: "#111827", margin: 0 },
        badge: {
            marginLeft: 8,
            padding: "4px 8px",
            borderRadius: 999,
            backgroundColor: "#F97316",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 28,
            height: 28,
        },
        closeBtn: {
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            borderRadius: 8,
        },
    };

    return (
        <header style={styles.header}>
            <div style={styles.left}>
                <ChevronLeft size={20} color="#4B5563" />
                <h1 style={styles.title}>Carrito</h1>
                <span style={styles.badge} aria-live="polite">
                    {itemCount}
                </span>
            </div>

            <button
                aria-label="Cerrar carrito"
                style={styles.closeBtn}
                onClick={() => console.log("Cerrar carrito")}
            >
                <X size={20} color="#4B5563" />
            </button>
        </header>
    );
}

function CartItem({ name, details, price, qty, total }: CartItemProps) {
    // Usamos grid para alinear preview | contenido | acciones de forma consistente.
    const styles: { [k: string]: React.CSSProperties } = {
        card: {
            backgroundColor: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: 16,
            display: "grid",
            gridTemplateColumns: "56px 1fr 140px",
            gap: 16,
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box",
        },
        preview: {
            width: 56,
            height: 56,
            borderRadius: 8,
            backgroundColor: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
        },
        content: { display: "flex", flexDirection: "column" as const },
        name: { fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 },
        details: { fontSize: 12, color: "#6B7280", margin: "6px 0 0" },

        // Columna derecha: alineada verticalmente (precio encima, acciones abajo)
        rightCol: {
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: "100%",
            gap: 8,
        },
        priceTop: { fontSize: 14, fontWeight: 600, color: "#111827" },
        qtyControls: { display: "flex", alignItems: "center", gap: 8, marginTop: 6 },
        qtyBtn: {
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid #E5E7EB",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
        },
        qty: { width: 32, textAlign: "center" as const, fontSize: 14, fontWeight: 600 },
        total: { fontSize: 14, fontWeight: 700, color: "#111827" },
        deleteBtn: {
            display: "inline-flex",
            alignItems: "center",
            fontSize: 13,
            color: "#EF4444",
            background: "none",
            border: "none",
            cursor: "pointer",
            gap: 8,
            padding: "6px 8px",
            borderRadius: 8,
        },
    };

    const handleDecrease = () => console.log("decrease", name);
    const handleIncrease = () => console.log("increase", name);
    const handleDelete = () => console.log("delete", name);

    return (
        <div style={styles.card}>
            <div style={styles.preview} aria-hidden>
                📄
            </div>

            <div style={styles.content}>
                <h3 style={styles.name}>{name}</h3>
                <p style={styles.details}>{details}</p>
            </div>

            <div style={styles.rightCol}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={styles.priceTop}>${price}</span>
                    <div style={styles.qtyControls} role="group" aria-label={`Cantidad de ${name}`}>
                        <button
                            aria-label={`Disminuir cantidad de ${name}`}
                            style={styles.qtyBtn}
                            onClick={handleDecrease}
                        >
                            <Minus size={14} color="#4B5563" />
                        </button>
                        <span style={styles.qty}>{qty}</span>
                        <button
                            aria-label={`Aumentar cantidad de ${name}`}
                            style={styles.qtyBtn}
                            onClick={handleIncrease}
                        >
                            <Plus size={14} color="#4B5563" />
                        </button>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={styles.total}>${total}</span>
                    <button
                        style={styles.deleteBtn}
                        onClick={handleDelete}
                        aria-label={`Eliminar ${name}`}
                        title="Eliminar"
                    >
                        <Trash size={14} />
                        <span style={{ fontSize: 13 }}>Eliminar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function CartSummary() {
    // Estilos más compactos: quitamos paddings excesivos que dejaban cajas vacías grandes.
    const styles: { [k: string]: React.CSSProperties } = {
        section: {
            backgroundColor: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
            boxSizing: "border-box",
        },
        title: { fontSize: 16, fontWeight: 600, margin: 0, marginBottom: 8 },
        optionLabel: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            color: "#111827",
            padding: "8px 4px",
        },
        radio: {
            width: 18,
            height: 18,
            margin: 0,
            // accentColor ayuda a que el radio tenga el color deseado independiente del CSS global
            accentColor: "#2563EB" as any,
        },
        small: { fontSize: 12, color: "#6B7280" },
        priceRow: {
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            color: "#4B5563",
            marginTop: 8,
        },
        priceValue: { color: "#111827" },
        totalRow: {
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
            borderTop: "1px solid #E5E7EB",
            paddingTop: 8,
            marginTop: 12,
            fontSize: 16,
        },
        note: { fontSize: 12, color: "#6B7280", marginTop: 8 },
        button: {
            width: "100%",
            padding: 12,
            backgroundColor: "#F97316",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            marginTop: 12,
            cursor: "pointer",
        },
        checkbox: {
            width: 18,
            height: 18,
            marginTop: 4,
            accentColor: "#111827" as any,
        },
    };
    const navigate = useNavigate();

    return (
        <div>
            <div style={styles.section}>
                <h2 style={styles.title}>Método de entrega</h2>
                <label style={styles.optionLabel}>
                    <input type="radio" name="delivery" defaultChecked style={styles.radio} />
                    <span>Recoger en tienda</span>
                </label>
                <label style={styles.optionLabel}>
                    <input type="radio" name="delivery" style={styles.radio} />
                    <span>Enviar por delivery</span>
                </label>
            </div>

            <div style={styles.section}>
                <h2 style={styles.title}>Tiempo de entrega</h2>
                <label style={styles.optionLabel}>
                    <input type="radio" name="time" defaultChecked style={styles.radio} />
                    <span>
                        Lo antes posible <span style={styles.small}>(60-90 min)</span>
                    </span>
                </label>
                <label style={styles.optionLabel}>
                    <input type="radio" name="time" style={styles.radio} />
                    <span>Programar</span>
                </label>
            </div>

            <div style={styles.section}>
                <label style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <input type="checkbox" style={styles.checkbox} />
                    <div>
                        <p style={{ fontSize: 14, margin: 0 }}>Pagar al recibir (efectivo/contraentrega)</p>
                        <p style={styles.small}>Pagos contra entrega pueden tener cargo extra.</p>
                    </div>
                </label>
            </div>

            <div style={{ ...styles.section, border: "none", paddingTop: 0 }}>
                <div style={styles.priceRow}>
                    <span>Subtotal</span>
                    <span style={styles.priceValue}>$33.00</span>
                </div>
                <div style={styles.priceRow}>
                    <span>Tarifa de servicio (5%)</span>
                    <span style={styles.priceValue}>$1.65</span>
                </div>
                <div style={styles.priceRow}>
                    <span>Delivery fee</span>
                    <span style={styles.priceValue}>$0.00</span>
                </div>
                <div style={styles.totalRow}>
                    <span>Total</span>
                    <span style={{ fontSize: 18, fontWeight: 800 }}>$34.65</span>
                </div>
                <p style={styles.note}>Precios incluyen IVA</p>
                <button
                    style={styles.button}
                    onClick={() => navigate("/payment-option")}
                >
                    Ir a pagar
                </button>
            </div>
        </div>
    );
}

export default function CartPage() {
    const styles: { [k: string]: React.CSSProperties } = {
        page: {
            minHeight: "100vh",
            backgroundColor: "#F9FAFB",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
            boxSizing: "border-box",
            fontFamily:
                "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            color: "#0F172A",
        },
        container: {
            width: "100%",
            maxWidth: 920,
            display: "flex",
            flexDirection: "column",
            gap: 12,
        },
        main: {
            display: "flex",
            flexDirection: "column",
            gap: 12,
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <CartHeader itemCount={3} />
                <main style={styles.main}>
                    <CartItem
                        name="Documento_Final.pdf"
                        details="50 pág · B/N · Carta · Anillado"
                        price="12.50"
                        qty={2}
                        total="25.00"
                    />
                    <CartItem
                        name="Presentacion.docx"
                        details="20 pág · Color · A4 · Simple"
                        price="8.00"
                        qty={1}
                        total="8.00"
                    />
                    <CartSummary />
                </main>
            </div>
        </div>
    );
}
