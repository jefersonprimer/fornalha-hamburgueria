// hooks/useSearch.ts
import { useState } from "react";
import menuData from "../../../../data/menuData.json";

// Definição do tipo para os itens do menu
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);

    if (!query) {
      setFilteredItems([]);
      return;
    }

    const result = Object.values(menuData)
      .flat()
      .filter((item: MenuItem) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

    setFilteredItems(result);
  };

  return { searchTerm, filteredItems, handleSearch };
}
