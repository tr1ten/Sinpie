// this compoenent is the cart page

import { Link } from "@solidjs/router";
import { Col, Form, Row, Card, Button, Alert } from "solid-bootstrap";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import FallBack from "../../components/common/Fallback";
import { SingInCard } from "../../components/common/SingInCard";
import CardCard from "../../components/Sinpie/CartCard";
import Loading from "../../components/Sinpie/Loading";
import { useUser } from "../../hooks/auth";
import { Cart } from "../../types";
import { API_ENDPOINT } from "../../utils/auth";

const CartPage = () => {
    const [cart,setCart] = createSignal<Cart>(null);
    const [user,something] = useUser();
    const [orderPlaced,setOrderPlaced] = createSignal(false);
    const [loading,setLoading] = createSignal(false);

    createEffect(()=>{
        if(orderPlaced()){
            setTimeout(()=>{
                setOrderPlaced(false);
            },10000);
        }
    })
    function handleOrder(){
        setOrderPlaced(true);
    }
    onMount(()=>{
        document.title = "Cart | Sinpie";
    })
    createEffect(async () => {
        if(!user()) return;
        setLoading(true);
        const res = await fetch(`${API_ENDPOINT}/cart`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => res.json());
        setLoading(false);
        setCart(res.cart);
    })
    return (<Show when={!loading()} fallback={Loading}>
        <Show when={cart()} fallback={<SingInCard title="Cart" />}>
        <section class="p-3">
            <h1 class="text-xl"> Your Cart</h1>
            <CardCard onOrder={handleOrder} mycart={cart()}/>
            <Show when={orderPlaced()}>
            <Alert class="m-2" variant="success">
            <Alert.Heading>Order Placed!</Alert.Heading>
            <p>
                Aww yeah, Thanks for placing this dummy order. Now check your email for the suprise.
            </p>
            </Alert>
            </Show>
        </section>
            
    </Show>
    </Show>);
}
export default CartPage;