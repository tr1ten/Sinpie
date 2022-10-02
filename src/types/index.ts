import { Product } from "../components/Sinpie/DisplayProducts";

export type AuthForm = {
    email: string;
    password: string;
    name?: string;  
}

export type CartItem = {
    productId: string;
    product: Product;
    quantity: number;    
    price : number;
}
export type Cart = {
    id: number;
    cartItems: CartItem[];
    total: number;
}

export type NavProps = {
    itemCats: () => Array<{ label: string; slug: string; }>;
    animeCats: () => Array<{ label: string; slug: string; }>;
    isLogin: () => boolean;
    user: () => any;
    onLogout: () => void;
  };