import { Alert } from "solid-bootstrap";
import { createSignal, onMount, createEffect, Show, For } from "solid-js";
import FallBack from "../../../components/common/Fallback";
import { DisplayProducts, Product } from "../../../components/Sinpie/DisplayProducts";
import { HorizontalScroll } from "../../../components/UI/HorizontalScroll";
import { useUser } from "../../../hooks/auth";
import { API_ENDPOINT } from "../../../utils/auth";

// this will display all user favorites
export default function FavoritesPage() {
    const [user, something] = useUser();
    const [favorites, setFavorites] = createSignal<Product[]>([]);
    const [loading,setLoading] = createSignal(true);
    onMount(() => {
        document.title = "Favorites | Sinpie";
    });
    createEffect(async () => {
        if (!user()) return;
        const res = await fetch(`${API_ENDPOINT}/user/favorites`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        }).then((res) => res.json());
        if (res.error) {
        return;
        }
        setFavorites(res.favorites);
        setLoading(false);
    });
    const EmptyFavPlaceholder = <section class="h-full w-full flex items-center justify-center p-5">
        <Alert variant="info">
            <Alert.Heading>Empty Favorites</Alert.Heading>
            <p>
                You have no favorites yet. You can add products to your favorites by clicking the heart icon on the product page.
            </p>
        </Alert>
    </section>;


    return (
        <section class="p-3">
        <h1 class="text-xl"> Your Favorites</h1>
        <Show when={!loading()} fallback={<FallBack />}>

            {favorites().length==0 ? EmptyFavPlaceholder : <DisplayProducts products={favorites()} />}
        </Show>
        </section>
    );
}