import { useCart } from "../../context/CartContext";
import { MenuItemType } from "@/types/MenuItemType";
import { useState } from "react";
import SelectedItemModal from "../../components/SelectedItemModal";

export default function Carrinho() {
  const { cart, updateCart, removeFromCart } = useCart();
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  const reduzirOuRemoverItem = (id: number) => {
    removeFromCart(id);
  };
  

  const toggleItemDetails = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const handleEditItem = (item: MenuItemType) => {
    const itemCopy: MenuItemType = {
      ...item,
      extras: item.extras ? JSON.parse(JSON.stringify(item.extras)) : []
    };
    setSelectedItem(itemCopy);
    setIsModalOpen(true);
  };

  const handleSaveItem = (updatedItem: MenuItemType) => {
    updateCart(updatedItem.id, updatedItem.quantity, updatedItem.extras || []);
    setIsModalOpen(false);
  };

  const calculateItemTotal = (item: MenuItemType) => {
    const totalExtrasPrice = item.extras?.reduce(
      (acc, extra) => acc + extra.price * (extra.quantity || 1),
      0
    ) || 0;
    return (item.price + totalExtrasPrice) * item.quantity;
  };

  return (
    <div>
      <ul className="space-y-2">
        {cart.map((item: MenuItemType) => {
          const totalPrice = calculateItemTotal(item);

          return (
            <li
              key={item.id}
              className="flex flex-col justify-between items-start border p-2 rounded-md bg-gray-100"
            >
              <div className="flex justify-between items-center w-full">
                <span>{item.name} ({item.quantity}x)</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center w-full">
                <button onClick={() => reduzirOuRemoverItem(Number(item.id))}>Remover</button>
                <button onClick={() => toggleItemDetails(String(item.id))}>
                  {openItemId === String(item.id) ? "Esconder detalhes" : "Mostrar detalhes"}
                </button>

                <button onClick={() => handleEditItem(item)} className="text-blue-500">
                  Editar
                </button>
              </div>
              {openItemId === String(item.id) && item.extras && item.extras.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold">Extras:</h3>
                  <ul className="space-y-1">
                    {item.extras.map((extra) => (
                      <li key={extra.id} className="flex justify-between items-center">
                        <span>{extra.name}</span>
                        <span>
                          {extra.quantity} x R$ {extra.price.toFixed(2)} = R$ {((extra.price || 0) * (extra.quantity || 1)).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {isModalOpen && selectedItem && (
        <SelectedItemModal
          selectedItem={selectedItem}
          quantity={selectedItem.quantity}
          setQuantity={(quantity) => setSelectedItem({ ...selectedItem, quantity })}
          selectedExtras={selectedItem.extras || []}
          setSelectedExtras={(extras) => setSelectedItem({ ...selectedItem, extras })}
          closeModal={() => setIsModalOpen(false)}
          onSave={handleSaveItem}
          isEditing={true} handleQuantityChange={function (): void {
            throw new Error("Function not implemented.");
          } } handleAddToCart={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )}
    </div>
  );
}
