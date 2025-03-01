import { Extra } from "./Extras";

export interface MenuItemType {
    quantity: number;
    id: number;
    name: string;
    description: string;
    price: number;
    imageSrc: string;
    extras?: Extra[];
}
