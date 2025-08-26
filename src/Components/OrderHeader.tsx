import React from "react";
import {
    Check,
    Clock,
    Truck,
    Home,
    MessageSquare,
    Phone,
    AlertCircle,
    FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type OrderHeaderProps = { orderId: string };

function OrderHeader({ orderId }: OrderHeaderProps) {
    const styles: { [k: string]: React.CSSProperties } = {
        header: {
            backgroundColor: "#0F766E", // teal-600
            color: "#ffffff",
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 12,
        },
        center: { textAlign: "center" as const, flex: 1, margin: "0 12px" },
        title: { margin: 0, fontSize: 18, fontWeight: 700 },
        subtitle: { margin: 0, fontSize: 13, opacity: 0.95 },
        icon: { flexShrink: 0 },
    };

    return (
        <header style={styles.header}>
            <div style={styles.icon}>
                <Check size={20} color="#ffffff" />
            </div>

            <div style={styles.center}>
                <h1 style={styles.title}>Pedido Confirmado</h1>
                <p style={styles.subtitle}>#{orderId}</p>
            </div>

            <div style={styles.icon}>
                <Clock size={20} color="#ffffff" />
            </div>
        </header>
    );
}

function OrderSummaryCard() {
    const styles: { [k: string]: React.CSSProperties } = {
        card: {
            backgroundColor: "#ffffff",
            borderRadius: 12,
            padding: 14,
            marginTop: 14,
            boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
            border: "1px solid #E6EEF8",
        },
        row: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        store: { fontSize: 15, fontWeight: 600, color: "#0F172A" },
        smallMuted: { fontSize: 13, color: "#6B7280" },
        blockTeal: {
            marginTop: 12,
            backgroundColor: "#ECFEFF", // teal-50-ish
            padding: 10,
            borderRadius: 8,
            color: "#065f46", // teal-600-ish
            fontWeight: 600,
            fontSize: 13,
        },
        stats: { display: "flex", gap: 12, marginTop: 12, fontSize: 13, color: "#374151" },
        statItem: { flex: 1 },
    };

    return (
        <div style={styles.card}>
            <div style={styles.row}>
                <h2 style={styles.store}>Librería Central</h2>
                <span style={styles.smallMuted}>Delivery</span>
            </div>

            <div style={styles.stats}>
                <div style={styles.statItem}>
                    <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>ETA</p>
                    <p style={{ margin: "6px 0 0", fontWeight: 700, color: "#0F172A" }}>En reparto 12:20</p>
                </div>

                <div style={styles.statItem}>
                    <p style={{ margin: 0, fontSize: 12, color: "#6B7280" }}>Total pagado</p>
                    <p style={{ margin: "6px 0 0", fontWeight: 700, color: "#0F172A" }}>€24.50</p>
                </div>
            </div>

            <div style={styles.blockTeal}>🚴 Llegará en 8 minutos</div>
        </div>
    );
}

function OrderStatusTimeline() {
    const steps = [
        { label: "Confirmado", time: "11:45", active: true },
        { label: "En preparación", time: "11:50", active: true },
        { label: "Listo para recoger", time: "12:05", active: true },
        { label: "En reparto", time: "12:12 - En camino", active: "progress" as const },
        { label: "Entregado", time: "Pendiente", active: false },
    ];

    const styles: { [k: string]: React.CSSProperties } = {
        container: { marginTop: 18 },
        title: { fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#0F172A" },
        list: { position: "relative", paddingLeft: 18, borderLeft: "2px solid #E6EEF8" },
        item: { position: "relative", marginBottom: 18, paddingLeft: 12 },
        dotBase: {
            position: "absolute",
            left: -28,
            top: 0,
            width: 18,
            height: 18,
            borderRadius: 9,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
        },
        label: { margin: 0, fontSize: 14, fontWeight: 600 },
        time: { margin: "6px 0 0", fontSize: 13 },
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Estado del pedido</h3>
            <ol style={styles.list}>
                {steps.map((step, i) => {
                    const isActive = step.active === true;
                    const isProgress = step.active === "progress";
                    const dotStyle: React.CSSProperties = {
                        ...styles.dotBase,
                        backgroundColor: isActive || isProgress ? "#0F766E" : "#E5E7EB",
                        color: isActive || isProgress ? "#fff" : "#9CA3AF",
                        boxShadow: isProgress ? "0 0 0 4px rgba(15,118,110,0.08)" : undefined,
                    };

                    return (
                        <li key={i} style={styles.item}>
                            <span style={dotStyle}>
                                <Check size={12} color={isActive || isProgress ? "#fff" : "#9CA3AF"} />
                            </span>

                            <h4
                                style={{
                                    ...styles.label,
                                    color: isProgress ? "#0F766E" : isActive ? "#0F172A" : "#9CA3AF",
                                }}
                            >
                                {step.label}
                            </h4>
                            <p
                                style={{
                                    ...styles.time,
                                    color: isProgress ? "#0f766e" : isActive ? "#6B7280" : "#9CA3AF",
                                }}
                            >
                                {step.time}
                            </p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

function OrderMap() {
    const styles: { [k: string]: React.CSSProperties } = {
        container: { marginTop: 18 },
        title: { fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#0F172A" },
        mapWrap: {
            position: "relative",
            height: 200,
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: "#F3F4F6",
        },
        img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
        pillLeft: {
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: "#ffffff",
            padding: "6px 10px",
            borderRadius: 10,
            boxShadow: "0 1px 6px rgba(15,23,42,0.06)",
            fontWeight: 600,
            fontSize: 13,
        },
        pillRight: {
            position: "absolute",
            bottom: 12,
            right: 12,
            backgroundColor: "#0F766E",
            color: "#ffffff",
            padding: "6px 10px",
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 13,
        },
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Ubicación en tiempo real</h3>
            <div style={styles.mapWrap}>
                <img src="https://placehold.co/352x192" alt="Mapa" style={styles.img} />
                <div style={styles.pillLeft}>🏍 Repartidor: 650m</div>
                <div style={styles.pillRight}>8 min</div>
            </div>
        </div>
    );
}

function OrderActions() {
    const styles: { [k: string]: React.CSSProperties } = {
        wrap: { display: "flex", gap: 12, marginTop: 18 },
        primary: {
            flex: 1,
            backgroundColor: "#0F766E",
            color: "#ffffff",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontWeight: 700,
            cursor: "pointer",
            border: "none",
        },
        secondary: {
            flex: 1,
            backgroundColor: "#F3F4F6",
            color: "#0F172A",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flexDirection: "column" as const,
            cursor: "pointer",
            border: "none",
        },
        secondaryText: { fontSize: 13, color: "#374151" },
    };

    return (
        <div style={styles.wrap}>
            <button style={styles.primary}>
                <MessageSquare size={16} />
                <span>Chat librería</span>
            </button>

            <button style={styles.secondary}>
                <Phone size={16} />
                <span style={styles.secondaryText}>Llamar repartidor</span>
            </button>
        </div>
    );
}

function OrderIssueCard() {
    const styles: { [k: string]: React.CSSProperties } = {
        card: {
            backgroundColor: "#FFF1F2",
            border: "1px solid #FECACA",
            borderRadius: 12,
            padding: 14,
            marginTop: 18,
        },
        titleRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 },
        title: { fontSize: 15, fontWeight: 700, color: "#7F1D1D", margin: 0 },
        text: { fontSize: 13, color: "#7F1D1D" },
        button: {
            width: "100%",
            marginTop: 12,
            backgroundColor: "#B91C1C",
            color: "#fff",
            padding: "10px 12px",
            borderRadius: 10,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.card}>
            <div style={styles.titleRow}>
                <AlertCircle size={16} color="#7F1D1D" />
                <h4 style={styles.title}>¿Algún problema?</h4>
            </div>

            <p style={styles.text}>
                Si hay retrasos, te enviaremos notificación y opción de reembolso parcial.
            </p>

            <button style={styles.button}>Reportar incidencia</button>
        </div>
    );
}

function OrderFooter() {
    const styles: { [k: string]: React.CSSProperties } = {
        wrap: { marginTop: 18, display: "flex", flexDirection: "column", gap: 10 },
        btnGray: {
            width: "100%",
            backgroundColor: "#F3F4F6",
            color: "#0F172A",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
        },
        btnBorder: {
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            border: "1px solid #E6EEF8",
            cursor: "pointer",
            fontWeight: 700,
        },
    };
    const navigate = useNavigate();

    return (
        <div style={styles.wrap}>
            <button style={styles.btnGray}>
                <FileText size={16} />
                Ver recibo
            </button>
            <button style={styles.btnGray}
                onClick={() => navigate("/")}
            >
                <FileText size={16} />
                Volver al Inicio
            </button>        </div>
    );
}

export default function OrderTrackingPage() {
    const styles: { [k: string]: React.CSSProperties } = {
        page: {
            minHeight: "100vh",
            backgroundColor: "#F8FAFC",
            display: "flex",
            justifyContent: "center",
            padding: 16,
            boxSizing: "border-box",
            fontFamily:
                "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            color: "#0F172A",
        },
        container: {
            width: "100%",
            maxWidth: 420,
            boxSizing: "border-box",
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <OrderHeader orderId="O-12345" />
                <OrderSummaryCard />
                <OrderStatusTimeline />
                <OrderMap />
                <OrderActions />
                <OrderIssueCard />
                <OrderFooter />
            </div>
        </div>
    );
}
