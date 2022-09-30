// this compoenent is the cart page

import { Link, useLocation, useNavigate, useRouteData, useSearchParams } from "@solidjs/router";
import { Col, Form, Row, Card, Button, Alert } from "solid-bootstrap";
import { createEffect, createSignal, Show } from "solid-js";
import FallBack from "../../components/common/Fallback";
import CardCard from "../../components/Sinpie/CartCard";
import { useUser } from "../../hooks/auth";
import { Cart } from "../../types";
import { API_ENDPOINT } from "../../utils/auth";

const CartPage = () => {
    const [cart,setCart] = createSignal<Cart>(null);
    const [user,something] = useUser();
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
        console.log(res.cart);
    })
    const signInCard = <Card class="text-center">
        <Card.Body>
            <Card.Title class="p-2">Sign in to view your cart</Card.Title>
            <Card.Text class="p-2">
                You need to sign in to view your cart
            </Card.Text>
            <Link href="/auth" class="btn btn-primary">Sign in</Link>
        </Card.Body>
    </Card>
    return (<Show when={cart()} fallback={signInCard}>
        <section class="p-3">
            <h1 class="text-xl"> Your Cart</h1>
            <CardCard mycart={cart()}/>
        </section>
            
    </Show>);
}
export default CartPage;