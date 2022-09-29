import { Product } from "../components/Sinpie/display-products";

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