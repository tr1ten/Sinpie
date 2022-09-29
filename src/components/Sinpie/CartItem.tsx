// this component is used for single cart item

import { createEffect, createSignal, JSX } from "solid-js";
import { CartItem as CartItemType } from "../../types";
import { Link } from "@solidjs/router";
import { Button } from "solid-bootstrap";
import { API_ENDPOINT } from "../../utils/auth";
import { FaSolidTrashCan } from "solid-icons/fa";

interface CartItemProps {
    cartItem: CartItemType;
    onDelete: () => void;
    onQtyChange: (q: number) => void;
}

export default function CartItem(props: CartItemProps): JSX.Element {
    const [cartItem, setCartItem] = createSignal<CartItemType>(props.cartItem);
    const [quantity, setQuantity] = createSignal<number>(cartItem().quantity);
    const [totalPrice, setTotalPrice] = createSignal<number>(cartItem().price * quantity());
    createEffect(() => {
        setTotalPrice(cartItem().product.price * quantity());
    });
    
    const handleQuantityChange = (e) => {
        props.onQtyChange(e.target.value);
        setQuantity(e.target.value);
    };
    return (
        <div class="border border-gray-500 rounded p-2 m-2">
            <div class="flex justify-between">
                <div class="flex">
                    <img
                        src={cartItem().product.image}
                        alt={cartItem().product.label}
                        class="w-1/5 "
                    />
                    <div class="flex flex-col justify-between ml-2">
                        <Link href={`/product/${cartItem().product.id}`}>
                            <h1 class="text-xl">{cartItem().product.label}</h1>
                        </Link>
                        <h1 class="text-xl">₹{totalPrice}</h1>
                    </div>
                </div>
                <div class="flex flex-col justify-between">
                    <div class="flex">
                        <label class="text-xl mr-2">Quantity:</label>
                        <input

                            type="number"
                            value={quantity()}
                            onInput={handleQuantityChange}
                            class="border border-gray-500 rounded p-1"
                            min="1"
                            max="10"
                        />
                    </div>
                    <FaSolidTrashCan onClick={props.onDelete}>Delete</FaSolidTrashCan>
                </div>
            </div>
        </div>
    );
}