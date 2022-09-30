// this compoenent is the cart page

import { Link } from "@solidjs/router";
import { Col, Form, Row, Card, Button, Alert } from "solid-bootstrap";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import FallBack from "../../components/common/Fallback";
import CardCard from "../../components/Sinpie/CartCard";
import { useUser } from "../../hooks/auth";
import { Cart } from "../../types";
import { API_ENDPOINT } from "../../utils/auth";

const CartPage = () => {
    const [cart,setCart] = createSignal<Cart>(null);
    const [user,something] = useUser();
    onMount(()=>{
        document.title = "Cart | Sinpie";
    })
    createEffect(async () => {
        if(!user()) return;
        const res = await fetch(`${API_ENDPOINT}/cart`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => res.json());
        setCart(res.cart);
    })
    const signInCard = <section class="h-full w-full flex items-center justify-center p-5"><Card class="text-center">
        <Card.Body>
            <Card.Title class="p-2">Sign in to view your cart</Card.Title>
            <Card.Text class="p-2">
                You need to sign in to view your cart
            </Card.Text>
            <Link title="Auth" href="/auth" class="btn btn-primary">Sign in</Link>
        </Card.Body>
    </Card></section>;
    return (<Show when={cart()} fallback={signInCard}>
        <section class="p-3">
            <h1 class="text-xl"> Your Cart</h1>
            <CardCard mycart={cart()}/>
        </section>
            
    </Show>);
}
export default CartPage;