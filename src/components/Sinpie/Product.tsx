import { Product as ProductType } from "./DisplayProducts";
import { createEffect, createSignal, onMount } from "solid-js";
import { AiOutlineHeart, AiFillHeart } from "solid-icons/ai";
import { API_ENDPOINT, getToken } from "../../utils/auth";
import { useUser } from "../../hooks/auth";
import { useNavigate } from "@solidjs/router";
type Props = {
  product: ProductType;
  fullWidth?: boolean;
};

export const Product = ({ product, fullWidth=false }: Props) => {
  const [isFav, isFavSetter] = createSignal(false);
  const [user, refreshUser] = useUser();
  onMount(() => {
    try {
      fetch(API_ENDPOINT + `/${product.id}/favorite`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      })
        .then((res) => res.json())
        .then((data) => isFavSetter(data.favorite));
    } catch (e) {
      console.log("error ", e);
    }
  });
  function toggleFav() {
    isFavSetter(!isFav());
    if (!user()) {
      return;
    }
    fetch(API_ENDPOINT + `/${product.id}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((res) => res.json())
  }
  const navigate = useNavigate();
  return (
    <div
      class="product"
      classList={{ "min-w-full": fullWidth }}
    >
      <div class="prod-img">
        <button onClick={toggleFav}>
          {!isFav() ? (
            <AiOutlineHeart class="s-icon product-fav" size="1rem" />
          ) : (
            <AiFillHeart class="s-icon product-fav" fill="red" size="1rem" />
          )}
        </button>
        <img
      onClick={() => navigate("/product/" + product.id)} 
        src={product.image} alt={product.label} />
      </div>
      <div
      onClick={() => navigate("/product/" + product.id)}

       class="product-info">
        <p>{product.label}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
};
