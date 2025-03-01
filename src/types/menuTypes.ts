import { MenuItemType } from "./MenuItemType"

export type MenuData = {
  porcoes: MenuItemType[];
  lanches: MenuItemType[];
  cervejas: MenuItemType[];
  sucos: MenuItemType[];
  refrigerantes: MenuItemType[];
  energetico: MenuItemType[];
  whisky: MenuItemType[];
  vodka: MenuItemType[];
  vinhos: MenuItemType[];
  guloseimas: MenuItemType[];
  refeicoes: MenuItemType[];
  [key: string]: MenuItemType[]; 
};
