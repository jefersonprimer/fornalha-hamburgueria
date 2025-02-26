// hooks/useSearch.ts
import { useState } from "react";
import menuData from "../../../../data/menuData.json";

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    
    if (!query) {
      setFilteredItems([]);
      return;
    }
    
    const result = Object.values(menuData)
      .flat()
      .filter((item: any) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

    setFilteredItems(result);
  };

  return { searchTerm, filteredItems, handleSearch };
}
