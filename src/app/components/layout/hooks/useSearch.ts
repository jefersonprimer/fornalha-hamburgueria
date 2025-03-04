import { useState } from "react";
import { MenuItemType } from "@/types/MenuItemType";
import { MenuData } from "@/types/menuTypes";
import menuData from "../../../../data/menuData.json";

// Tipando menuData com a interface MenuData
const typedMenuData: MenuData = menuData;

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);

    if (!query) {
      setFilteredItems([]);
      return;
    }

    const result = Object.values(typedMenuData)
      .flat()
      .filter((item: MenuItemType) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

    setFilteredItems(result);
  };

  return { searchTerm, filteredItems, handleSearch };
}
