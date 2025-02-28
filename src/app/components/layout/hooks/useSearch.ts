import { useState, useEffect } from "react";
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
  
  // Debounced version of searchTerm
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the delay as needed (e.g., 300ms)

    return () => clearTimeout(timer); // Cleanup the previous timeout
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredItems([]);
      return;
    }

    const result = Object.values(menuData)
      .flat()
      .filter((item: MenuItem) =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );

    setFilteredItems(result);
  }, [debouncedSearchTerm]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return { searchTerm, filteredItems, handleSearch };
}
