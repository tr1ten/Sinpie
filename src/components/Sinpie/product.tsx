import { Product as ProductType } from "./display-products";
import { createSignal } from "solid-js";
import { AiOutlineHeart, AiFillHeart } from "solid-icons/ai";
type Props = {
  product: ProductType;
};

export const Product = ({ product }: Props) => {
  const [isFav, isFavSetter] = createSignal(false);
  function toggleFav() {
    isFavSetter(!isFav());
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
        <img src={product.imgUrl} alt={product.title} />
      </div>
      <div class="product-info">
        <p>{product.title}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
};
