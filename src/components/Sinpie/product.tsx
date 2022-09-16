import { Product as ProductType } from "./display-products";
import { createSignal, onMount } from "solid-js";
import { AiOutlineHeart, AiFillHeart } from "solid-icons/ai";
import { API_ENDPOINT, getToken } from "../../utils/auth";
import { useUser } from "../../hooks/auth";
type Props = {
  product: ProductType;
};

export const Product = ({ product }: Props) => {
  const [isFav, isFavSetter] = createSignal(false);
  const [user,refreshUser] = useUser();
  onMount(() => {
    try{
      fetch(API_ENDPOINT+`/${product.id}/favorite`,{
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
         
      }).then((res) => res.json()).then((data) => isFavSetter(data.favorite));
    }
    catch(e){
      console.log("error ",e);
    }
  })
  function toggleFav() {
    if(!user()){return isFavSetter(!isFav());}
    fetch(API_ENDPOINT+`/${product.id}/favorite`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
    }).then(res=>res.json()).then((data)=>isFavSetter(data.favorite));
  }
  return (
    <div class="product">
      <div class="prod-img">
        <button onClick={toggleFav}>
          {!isFav() ? (
            <AiOutlineHeart class="s-icon product-fav" size="1rem" />
          ) : (
            <AiFillHeart class="s-icon product-fav" fill="red" size="1rem" />
          )}
        </button>
        <img src={product.image} alt={product.label} />
      </div>
      <div class="product-info">
        <p>{product.label}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
};
