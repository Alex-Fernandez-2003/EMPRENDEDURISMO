import React, { useState } from "react";

interface LibraryItem {
  id: string;
  name: string;
  image: string;
  distance: string;
  priceRange: string;
}

const dummyLibraries: LibraryItem[] = [
  {
    id: "1",
    name: "Librería Central",
    image: "logo.png",
    distance: "1.2 km",
    priceRange: "Bs 0.50–15",
  },
  {
    id: "2",
    name: "Copy Express",
    image: "logo2.png",
    distance: "2.5 km",
    priceRange: "Bs 0.40–12",
  },
];

const filtersList = [
  "Color",
  "B/N",
  "Entrega",
  "Recogida",
  "Menor precio",
  "Abierto ahora",
];
const sortOptions = ["Distancia", "Rating", "Precio"];

const SearchFiltersScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Distancia");
  const [mapView, setMapView] = useState(false);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Filtrado básico simulando búsqueda y filtros
  const filteredLibraries = dummyLibraries.filter((lib) =>
    lib.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col pb-24">
      {/* Barra de búsqueda */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Buscar librería, servicio o producto"
          className="w-full p-3 rounded-lg bg-gray-800 placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filtros tipo chips */}
      <div className="px-4 flex gap-2 overflow-x-auto py-2">
        {filtersList.map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1 rounded-full text-sm border ${
              activeFilters.includes(filter)
                ? "bg-teal-500 border-teal-500"
                : "bg-gray-800 border-gray-700"
            }`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Toggle Mapa / Lista */}
      <div className="px-4 flex justify-end py-2">
        <button
          className="px-3 py-1 bg-gray-800 rounded-lg"
          onClick={() => setMapView(!mapView)}
        >
          {mapView ? "Modo Lista" : "Modo Mapa"}
        </button>
      </div>

      {/* Lista de resultados */}
      <div className="flex-1 overflow-auto px-4 space-y-3">
        {filteredLibraries.length > 0 ? (
          filteredLibraries.map((lib) => (
            <div
              key={lib.id}
              className="flex items-center p-3 bg-gray-800 rounded-lg"
            >
              <img
                src={lib.image}
                alt={lib.name}
                className="w-16 h-16 rounded-lg mr-3"
              />
              <div className="flex-1">
                <div className="font-semibold">{lib.name}</div>
                <div className="text-sm text-gray-400">
                  {lib.distance} · {lib.priceRange}
                </div>
              </div>
              <button className="bg-orange-500 px-3 py-1 rounded-lg">
                Ver
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            <p>No se encontraron resultados.</p>
            <button className="mt-2 text-orange-500 underline">
              Sugerir nueva librería
            </button>
          </div>
        )}
      </div>

      {/* Sticky footer con sort */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 p-4 flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Filtra por servicio para encontrar impresión rápida y precio fijo.
        </span>
        <select
          className="bg-gray-800 text-white p-2 rounded-lg"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFiltersScreen;
