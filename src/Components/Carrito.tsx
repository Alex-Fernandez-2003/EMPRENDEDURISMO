import React, { useState } from "react";

// Tipo de item en carrito
interface CartItem {
  id: number;
  name: string;
  config: string;
  pricePerUnit: number;
  quantity: number;
  thumbnail?: string;
}

// Carrito completo
const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Fotocopias",
    config: "50 pág · B/N · Carta · Anillado",
    pricePerUnit: 0.5,
    quantity: 10,
    thumbnail: "thumbnail1.png",
  },
  {
    id: 2,
    name: "Impresión Color",
    config: "20 pág · Color · A4",
    pricePerUnit: 1.0,
    quantity: 5,
    thumbnail: "thumbnail2.png",
  },
];

const CartScreen: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [deliveryOption, setDeliveryOption] = useState<"store" | "delivery">(
    "store"
  );
  const [address, setAddress] = useState("");
  const [etaOption, setEtaOption] = useState<"asap" | "schedule">("asap");
  const [payOnDelivery, setPayOnDelivery] = useState(false);

  const updateQuantity = (id: number, newQty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.pricePerUnit * item.quantity,
    0
  );
  const serviceFee = subtotal * 0.05;
  const deliveryFee = deliveryOption === "delivery" ? 2.5 : 0;
  const total = subtotal + serviceFee + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
        <div className="text-6xl mb-4">🛒</div>
        <div className="text-center text-gray-300">
          Tu carrito está vacío. Agrega fotocopias desde las librerías.
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 text-white pb-32">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">Carrito</h2>
        <div>{cart.length} items</div>
      </div>

      {/* Lista de items */}
      <div className="p-4 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center bg-gray-800 p-3 rounded-lg"
          >
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-300">{item.config}</div>
              <div className="text-sm text-gray-300">
                Bs {item.pricePerUnit.toFixed(2)} / unidad
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {/* Stepper */}
              <div className="flex items-center gap-1">
                <button
                  className="bg-gray-700 px-2 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="w-12 text-center bg-gray-800 rounded"
                />
                <button
                  className="bg-gray-700 px-2 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="text-sm font-semibold">
                Bs {(item.pricePerUnit * item.quantity).toFixed(2)}
              </div>
              <button
                className="text-red-500 text-xs"
                onClick={() => removeItem(item.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery & Payment Options */}
      <div className="p-4 space-y-4 bg-gray-800">
        <div>
          <div className="font-semibold mb-1">Entrega</div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="delivery"
                checked={deliveryOption === "store"}
                onChange={() => setDeliveryOption("store")}
              />
              Recoger en tienda
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="delivery"
                checked={deliveryOption === "delivery"}
                onChange={() => setDeliveryOption("delivery")}
              />
              Enviar por delivery
            </label>
          </div>
          {deliveryOption === "delivery" && (
            <div className="mt-2 flex flex-col gap-2">
              <input
                type="text"
                placeholder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-2 rounded bg-gray-700"
              />
              <button className="bg-teal-500 text-white p-2 rounded">
                Usar mi ubicación
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="font-semibold mb-1">Tiempo de entrega</div>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={etaOption === "asap"}
              onChange={() => setEtaOption("asap")}
            />
            Lo antes posible (ETA 60–90 min)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={etaOption === "schedule"}
              onChange={() => setEtaOption("schedule")}
            />
            Programar
          </label>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={payOnDelivery}
            onChange={(e) => setPayOnDelivery(e.target.checked)}
          />
          Pagar al recibir (efectivo/contraentrega)
        </label>
        {payOnDelivery && (
          <p className="text-xs text-gray-400">
            Pagos contra entrega pueden tener cargo extra.
          </p>
        )}
      </div>

      {/* Panel resumen sticky */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-900 border-t border-gray-700 flex flex-col gap-2">
        <div className="flex justify-between text-gray-200">
          <span>Subtotal</span>
          <span>Bs {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-200">
          <span>Tarifa CopyGo (5%)</span>
          <span>Bs {serviceFee.toFixed(2)}</span>
        </div>
        {deliveryOption === "delivery" && (
          <div className="flex justify-between text-gray-200">
            <span>Delivery</span>
            <span>Bs {deliveryFee.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-white text-lg">
          <span>Total</span>
          <span>Bs {total.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-400">Precios incluyen IVA</p>
        <button className="bg-orange-500 text-white py-3 rounded-lg text-lg w-full mt-2">
          Ir a pagar
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
