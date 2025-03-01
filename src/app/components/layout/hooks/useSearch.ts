import { MenuItemType } from "@/types/MenuItemType";
import { MenuData } from "@/types/menuTypes";
import menuData from "../../../../data/menuData.json";
import { useState, useEffect } from "react";

// Tipando menuData com a interface MenuData
const typedMenuData: MenuData = menuData;

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems([]);
      return;
    }

    const result = Object.values(typedMenuData)
      .flat()
      .filter((item: MenuItemType) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

    setFilteredItems(result);
  }, [searchTerm]); // useEffect agora é chamado quando `searchTerm` mudar

  return { searchTerm, filteredItems, handleSearch };
}
