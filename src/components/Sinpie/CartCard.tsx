// this display all cart items in card

import { Link, useLocation, useNavigate, useRouteData, useSearchParams } from "@solidjs/router";
import { Col, Form, Row, Card, Button, Alert } from "solid-bootstrap";
import { createEffect, createSignal, For, Show } from "solid-js";
import FallBack from "../../components/common/Fallback";
import { Cart, CartItem as CartItemType } from "../../types";
import { API_ENDPOINT } from "../../utils/auth";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";


const CartCard = (props: {mycart: Cart,onOrder:()=>void}) => {
    const [cart,setCart] = createSignal<Cart>(props.mycart);
    const [total,setTotal] = createSignal(0);
    const [loading,setLoading] = createSignal(false);

    createEffect(() => {
        let sum = 0;
        cart().cartItems.forEach(item => {
            sum += item.price * item.quantity;
        });
        setTotal(sum);
    })
    const changeQuantity = async (item:CartItemType,q:number) => {
        try{

            const res = await fetch(`${API_ENDPOINT}/cart/update`, {
                method: "POST",
                body:JSON.stringify({
                    pid: item.product.id,
                    qty: q
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }).then((res) => res.json()).then(()=>{
                const newCart = JSON.parse(JSON.stringify(cart()));
                newCart.cartItems.forEach((cartItem)=>{
                    if(cartItem.product.id === item.product.id) cartItem.quantity = q;
                });
                setCart(newCart);
            });
        }
        catch(err){
            console.log("error while updating item count!",err);
        }
    }
    const handleDelete = async (item:CartItemType) => {
        await changeQuantity(item,0);
        setCart({...cart(),cartItems:cart().cartItems.filter((i) => i.product.id !== item.product.id)});
    }
    const handleOrder = async () => {
        setLoading(true);
        const res = await fetch(`${API_ENDPOINT}/order`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        if(res.ok){
            // set each cart item quantity to 0
            const tempCart = JSON.parse(JSON.stringify(cart()));
            tempCart.cartItems = [];
            setCart(tempCart);
            props.onOrder();

        }
        setLoading(false);
    }
    return <Show when={cart().cartItems.length>0} fallback={EmptyCart}>
        <For each={cart().cartItems}>
        {(item) => <CartItem onQtyChange={(q)=>changeQuantity(item,q)} onDelete={()=>handleDelete(item)} cartItem={item} />}
    </For>
    <div class="flex justify-between p-2 mt-2 border border-solid">
        <h1 class="text-xl">Total: {total()}</h1>
        <Button disabled={loading()} onClick={handleOrder} class="ctbn bg-green-500 hover:bg-green-500 btn btn-none text-white">Checkout</Button>
    </div>

    </Show>
}
export default CartCard;