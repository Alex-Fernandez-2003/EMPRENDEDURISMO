import React, { useState } from "react";
import { CreditCard, QrCode, Wallet, Truck, Banknote, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PaymentOptionProps = {
    value: string;
    selected: string;
    onChange: (v: string) => void;
    icon: React.ReactNode;
    title: string;
    description: string;
};

function PaymentOption({ value, selected, onChange, icon, title, description }: PaymentOptionProps) {
    const isSelected = selected === value;

    const styles: { [k: string]: React.CSSProperties } = {
        label: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 16,
            borderRadius: 12,
            border: `1px solid ${isSelected ? "#2563EB" : "#E5E7EB"}`,
            backgroundColor: isSelected ? "#EFF6FF" : "#FFFFFF",
            cursor: "pointer",
            transition: "box-shadow .15s, border-color .15s, background-color .15s",
            boxShadow: isSelected ? "0 2px 8px rgba(37,99,235,0.08)" : "none",
        },
        input: {
            // visually hidden but accessible
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
            width: 0,
            height: 0,
        },
        iconWrap: {
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "#F8FAFC",
            flexShrink: 0,
        },
        text: { display: "flex", flexDirection: "column" as const },
        title: { fontSize: 14, fontWeight: 600, color: "#0F172A", margin: 0 },
        desc: { fontSize: 12, color: "#6B7280", marginTop: 4 },
    };

    return (
        <label style={styles.label}>
            <input
                style={styles.input}
                type="radio"
                name="payment"
                value={value}
                checked={isSelected}
                onChange={() => onChange(value)}
            />
            <div style={styles.iconWrap} aria-hidden>
                {icon}
            </div>
            <div style={styles.text}>
                <p style={styles.title}>{title}</p>
                <p style={styles.desc}>{description}</p>
            </div>
        </label>
    );
}

export default function CheckoutPage() {
    const [selected, setSelected] = useState<string>("card");

    const styles: { [k: string]: React.CSSProperties } = {
        page: {
            minHeight: "100vh",
            backgroundColor: "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            color: "#0F172A",
        },
        header: {
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E6EEF8",
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        container: {
            width: "100%",
            maxWidth: 920,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: "16px",
            boxSizing: "border-box",
            flex: 1,
        },
        orderCard: {
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            border: "1px solid #E5E7EB",
            padding: 16,
        },
        orderTitle: { fontSize: 14, fontWeight: 600, margin: 0 },
        orderSubtitle: { fontSize: 12, color: "#6B7280", marginTop: 6 },
        priceRow: {
            marginTop: 12,
            display: "flex",
            flexDirection: "column" as const,
            gap: 8,
            fontSize: 14,
            color: "#374151",
        },
        priceLine: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        totalLine: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E5E7EB",
            paddingTop: 12,
            marginTop: 12,
        },
        methodsArea: { flex: 1, overflowY: "auto", padding: "0 4px 12px 4px" },
        methodsTitle: { fontSize: 16, fontWeight: 600, margin: "12px 0" },
        methodsList: { display: "flex", flexDirection: "column" as const, gap: 10 },
        secureBox: {
            backgroundColor: "#EFF6FF",
            borderRadius: 10,
            padding: 12,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            margin: "12px 0",
        },
        payArea: { padding: 16 },
        payButton: {
            width: "100%",
            padding: "12px 16px",
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
        },
        smallTextCenter: { textAlign: "center" as const, fontSize: 12, color: "#6B7280", marginTop: 8 },
        placeholder: { width: 24, height: 24 }, // placeholder element in header
    };
    const navigate = useNavigate();

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div style={{ width: 36 }}>
                    <button
                        aria-label="Volver"
                        onClick={() => navigate("/cart-header")}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#374151" }}
                    >
                        ←
                    </button>
                </div>

                <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Pagar pedido</h1>

                <div style={styles.placeholder} />
            </div>

            <div style={styles.container}>
                {/* Resumen del pedido */}
                <div style={styles.orderCard}>
                    <h2 style={styles.orderTitle}>Resumen del pedido</h2>
                    <p style={styles.orderSubtitle}>Librería Central • 2 libros</p>

                    <div style={styles.priceRow}>
                        <div style={{ ...styles.priceLine, color: "#4B5563" }}>
                            <span>Subtotal</span>
                            <span style={{ fontWeight: 600 }}>Bs 85.00</span>
                        </div>
                        <div style={{ ...styles.priceLine, color: "#4B5563" }}>
                            <span>Envío</span>
                            <span style={{ fontWeight: 600 }}>Bs 15.00</span>
                        </div>

                        <div style={styles.totalLine}>
                            <span style={{ fontSize: 16, fontWeight: 700 }}>Total</span>
                            <span style={{ fontSize: 18, fontWeight: 800 }}>Bs 100.00</span>
                        </div>
                    </div>
                </div>

                {/* Métodos de pago */}
                <div style={styles.methodsArea}>
                    <h2 style={styles.methodsTitle}>Método de pago</h2>

                    <div style={styles.methodsList}>
                        <PaymentOption
                            value="card"
                            selected={selected}
                            onChange={setSelected}
                            icon={<CreditCard size={18} color="#1D4ED8" />}
                            title="Tarjeta de crédito/débito"
                            description="Visa, Mastercard"
                        />
                        <PaymentOption
                            value="qr"
                            selected={selected}
                            onChange={setSelected}
                            icon={<QrCode size={18} color="#059669" />}
                            title="Pago por QR"
                            description="Escanea y paga desde tu app bancaria"
                        />
                        <PaymentOption
                            value="wallet"
                            selected={selected}
                            onChange={setSelected}
                            icon={<Wallet size={18} color="#7C3AED" />}
                            title="Saldo CopyGo"
                            description="Saldo disponible: Bs 45.00"
                        />
                        <PaymentOption
                            value="cash"
                            selected={selected}
                            onChange={setSelected}
                            icon={<Truck size={18} color="#EA580C" />}
                            title="Contra entrega"
                            description="Efectivo + comisión Bs 5.00"
                        />
                        <PaymentOption
                            value="bank"
                            selected={selected}
                            onChange={setSelected}
                            icon={<Banknote size={18} color="#4F46E5" />}
                            title="Transferencia bancaria"
                            description="Banco Nacional - Cuenta: 1234567890"
                        />
                    </div>
                </div>

                {/* Pago seguro */}
                <div style={styles.secureBox}>
                    <div style={{ flexShrink: 0 }}>
                        <Shield size={18} color="#1D4ED8" />
                    </div>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: "#0B3A6B" }}>Pago seguro</p>
                        <p style={{ fontSize: 13, marginTop: 6, color: "#164E63", maxWidth: 560 }}>
                            Tus datos son procesados por CopyGo y no almacenados sin tu permiso.
                        </p>
                    </div>
                </div>

                {/* Botón pagar */}
                <div style={styles.payArea}>
                    <button
                        style={styles.payButton}
                        onClick={() => navigate("/order-header")}
                    >
                        Pagar Bs 100.00
                    </button>

                    <p style={styles.smallTextCenter}>
                        Al continuar aceptas nuestros{" "}
                        <a href="#" style={{ color: "#2563EB", textDecoration: "none" }}>
                            términos de reembolso
                        </a>{" "}
                        y{" "}
                        <a href="#" style={{ color: "#2563EB", textDecoration: "none" }}>
                            políticas de privacidad
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
