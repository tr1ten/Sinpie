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
import Loading from "../../components/Sinpie/Loading";

export function ProductPage(): JSX.Element {
    const params = useParams();
    const [product, setProduct] = createSignal<Product>(null);
    const [similarProducts, setSimilarProducts] = createSignal<Product[]>([]);
    createEffect(()=>{
        fetch(`${API_ENDPOINT}/product/${params.pid}`)
        .then(res=>res.json())
        .then(({product})=>setProduct(product));
    },params)
    createEffect(()=>{
        if(!product()) return;
        document.title = product().label;
        fetch(`${API_ENDPOINT}/products/?pcat=${product().productCategory.slug}`)
        .then(res=>res.json())
        .then(({products})=>setSimilarProducts(products));
    },product)
    // temperary rating random 1 to 5
    // temperary shop url
    const shopUrl = "https://comicsense.in";
    return <Show when={product()} fallback={Loading}>
        <main>
        <section class="flex flex-col md:flex-row w-full p-4 items-center md:items-start">
            <Card class="w-1/2">
            <Image src={product().image} class="w-1/2 m-auto" />
            </Card>
            <div class="m-6 flex flex-col">
                <h1 class="text-xl">{product().label}</h1>
                <a href={shopUrl} class="text-blue-400 font-medium underline">comic sense</a>
                <Rating rating={product()?.rating || Math.floor(Math.random() * 5) + 1} />
                {ActionCard(product)}
                <p class="font-bold underline text-blue-400"> </p>
                <h2 class="text-lg">About this item</h2>
                <p>{decodeURI(product().description)}</p>

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
    const [loading, setLoading] = createSignal<boolean>(false);
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
        if(!window.user()) window.location.href = '/auth';
        // add to cart
        setLoading(true);
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
        }).then(()=>setQuantity(quantity()+1) && setLoading(false));
    }
    return <Card class="mt-3 mb-3 ">
        <Card.Body class="flex flex-col gap-2">
            <Price price={product().price} />
            {/* Show  info*/}
            <div
            class="text-sm"
            >
            <p class="text-gray-500">Inclusive of all taxes</p>
            <p class="text-gray-500">FREE delivery: <span class="text-black">Sunday, 
            {new Date().getDate() + 1} {new Date().toLocaleString('default', { month: 'long' })}
             </span></p>
            <p class="text-green-600">In Stock.</p>
            </div>
            <Button  onClick={buyNow}
            class="border-none hover:bg-red-500 bg-red-600 text-white"
            >
                Buy now
            </Button>
            <Button
            disabled={loading() || disabled()}
            variant="none"
            onClick={addToCart}
            class=" border-1 border-gray-500 ">
                <span>Add{disabled() && "ed"} to cart
                    {
                        disabled()  && <TiTick class="ico" />
                    }
                </span>     
            </Button>
        </Card.Body>
    </Card>;
}

