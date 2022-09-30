import { useParams } from "@solidjs/router";
import { Accessor, createEffect, createSignal, JSX, onMount, Show } from "solid-js";
import { DisplayProducts, Product } from "../../components/Sinpie/DisplayProducts";
import { API_ENDPOINT } from "../../utils/auth";
import { Button, Card, Image } from "solid-bootstrap";
import Rating from "../../components/Sinpie/Rating";
import { FaSolidCartShopping, FaSolidForward } from "solid-icons/fa";
import Price from "../../components/Sinpie/Price";
import { HorizontalScroll } from "../../components/UI/HorizontalScroll";
import { Product as ProductC} from "../../components/Sinpie/Product";
import { CommentSection } from "../../components/Sinpie/CommentSection";
import { TiTick } from 'solid-icons/ti'
import { useUser } from "../../hooks/auth";

export function ProductPage(): JSX.Element {
    const params = useParams();
    const [product, setProduct] = createSignal<Product>(null);
    const [similarProducts, setSimilarProducts] = createSignal<Product[]>([]);
    createEffect(()=>{
        fetch(`${API_ENDPOINT}/product/${params.pid}`)
        .then(res=>res.json())
        .then(({product})=>setProduct(product));
    })
    createEffect(()=>{
        if(!product()) return;
        fetch(`${API_ENDPOINT}/products/?pcat=${product().productCategory.slug}`)
        .then(res=>res.json())
        .then(({products})=>setSimilarProducts(products));
    })
    // temperary rating random 1 to 5
    const rating = Math.random() * 5;
    // temperary shop url
    const shopUrl = "https://comicsense.in";
    return <Show when={product()} fallback={<h1>Loading product...</h1>}>
        <main>
        <section class="flex flex-col md:flex-row w-full p-4 items-center md:items-start">
            <Card class="w-1/2">
            <Image src={product().image} class="w-1/2 m-auto" />
            </Card>
            <div class="m-6 flex flex-col">
                <h1 class="text-xl">{product().label}</h1>
                <a href={shopUrl} class="text-blue-400 font-medium underline">comic sense</a>
                <Rating rating={rating} />
                {ActionCard(product)}
                <p class="font-bold underline text-blue-400"> </p>
                <h2 class="text-lg">About this item</h2>
                <p>{product().description}</p>

            </div>
        </section>
        <section class="p-2">
            <h1 class="text-2xl text-center">Similar Products</h1>
            <div class="horizontal-scroll-wrapper">
            <Show when={similarProducts()}>
                <HorizontalScroll children={similarProducts().map((p)=><ProductC fullWidth product={p}/>)} /> 
            </Show>
            </div>
        </section>
        <CommentSection />

    </main>
    </Show>;
}
function ActionCard(product:Accessor<Product>) {
    const [quantity, setQuantity] = createSignal<number>(0);
    const [disabled, setDisabled] = createSignal<boolean>(false);
    const [user,refreshUser] = useUser();
    createEffect(()=>{
        if(quantity() > 0) setDisabled(true);
        else setDisabled(false);
    })
    createEffect(()=>{
        fetch(`${API_ENDPOINT}/cart/${product().id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res=>res.json()).then(({quantity})=>setQuantity(quantity));
    })
    // redirect user when click on buy now button
    const buyNow = () => {
        window.location.href = product().shopUrl;
    }
    const addToCart = () => {
        if(!user()) window.location.href = '/auth';
        // add to cart
        fetch(`${API_ENDPOINT}/cart/add`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body:JSON.stringify({
                pid: product().id,
                qty: 1
            })
        }).then(()=>setQuantity(quantity()+1));
    }
    return <Card class="mt-3 mb-3">
        <Card.Body class="flex flex-col">
            <Price price={product().price} />
            <Button
            disabled={disabled()}
            variant="none"
            onClick={addToCart}
            class="bg-orange-600 hover:bg-orange-600 cbtn">
                <span>Add{disabled() && "ed"} to cart
                    {
                        disabled()  ? <TiTick class="ico" />
                    :   <FaSolidCartShopping class="ico" />
                    }
                </span>     
            </Button>
            <Button variant="none" onClick={buyNow} class="cbtn hover:bg-yellow-600 bg-yellow-600 mt-2">
                <span>Buy now
                    <FaSolidForward class="ico" />
                </span>
            </Button>
        </Card.Body>
    </Card>;
}

