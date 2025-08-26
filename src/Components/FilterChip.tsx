import React, { useState } from "react";
import { Search, Filter, Map, List, Star, MapPin } from "lucide-react";

const FilterChip = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${active ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
    >
        {label}
    </button>
);

const ViewToggle = ({ view, setView }) => (
    <div className="flex rounded-lg bg-gray-100 p-1">
        <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md ${view === "list" ? "bg-white shadow font-medium text-gray-900" : "text-gray-600"
                }`}
        >
            <List className="w-4 h-4" /> Lista
        </button>
        <button
            onClick={() => setView("map")}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded-md ${view === "map" ? "bg-white shadow font-medium text-gray-900" : "text-gray-600"
                }`}
        >
            <Map className="w-4 h-4" /> Mapa
        </button>
    </div>
);

const StoreCard = ({ name, category, distance, rating, priceTag, status, img }) => (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex gap-4">
        <img
            src={img}
            alt={name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
                    <p className="text-xs text-gray-600">{category}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {distance}
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {rating}
                    </div>
                </div>
                <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md">
                    Ver
                </button>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <span
                    className={`px-2 py-1 text-xs rounded ${priceTag.color === "green"
                        ? "bg-green-100 text-green-700"
                        : priceTag.color === "blue"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                >
                    {priceTag.label}
                </span>
                <span className="text-xs text-gray-500">{status}</span>
            </div>
        </div>
    </div>
);

export default function SearchResultsPage() {
    const [activeFilter, setActiveFilter] = useState("Color");
    const [view, setView] = useState("list");

    const filters = ["Color", "B/N", "Entrega", "Recogida", "Menor precio", "Abierto ahora"];

    const stores = [
        {
            name: "Copy Express",
            category: "Impresión • Papelería",
            distance: "0.3 km",
            rating: "4.8",
            priceTag: { label: "Desde €0.05", color: "green" },
            status: "• Abierto",
            img: "https://placehold.co/64x64",
        },
        {
            name: "PrintPoint 24h",
            category: "Impresión • Encuadernación",
            distance: "0.7 km",
            rating: "4.6",
            priceTag: { label: "Desde €0.08", color: "blue" },
            status: "• 24 horas",
            img: "https://placehold.co/64x64",
        },
        {
            name: "Copistería Digital",
            category: "Impresión • Diseño",
            distance: "1.2 km",
            rating: "4.9",
            priceTag: { label: "Desde €0.06", color: "orange" },
            status: "• Cierra 20:00",
            img: "https://placehold.co/64x64",
        },
    ];

    return (
        <div className="max-w-md mx-auto min-h-screen bg-gray-50">
            {/* Header de búsqueda */}
            <div className="bg-white border-b p-4">
                <div className="flex items-center gap-2">
                    <button className="p-2">
                        <Search className="w-5 h-5 text-gray-700" />
                    </button>
                    <input
                        type="text"
                        placeholder="Buscar librería, servicio o producto"
                        className="flex-1 p-2 rounded-lg bg-gray-50 text-sm text-gray-700 outline-none"
                    />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                    Filtra por servicio para encontrar impresión rápida y precio fijo.
                </p>
            </div>

            {/* Chips de filtros */}
            <div className="bg-white border-b p-3 flex gap-2 overflow-x-auto">
                {filters.map((f) => (
                    <FilterChip
                        key={f}
                        label={f}
                        active={activeFilter === f}
                        onClick={() => setActiveFilter(f)}
                    />
                ))}
            </div>

            {/* Barra de resultados */}
            <div className="bg-white border-b p-3 flex justify-between items-center">
                <p className="text-sm text-gray-600">24 resultados encontrados</p>
                <ViewToggle view={view} setView={setView} />
            </div>

            {/* Resultados */}
            <div className="p-4 space-y-3">
                {stores.map((store, i) => (
                    <StoreCard key={i} {...store} />
                ))}
            </div>
        </div>
    );
}
