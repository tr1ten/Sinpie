import { For } from "solid-js";
import { Product } from "./product";

export type Product = {
  id: number;
  label: string;
  price: number;
  description: string;
  image: string;
  ratings: number;
};
type Props = {
  products: Product[];
};
export const DisplayProducts = (props: Props) => {
  return (
    <section class="hot-container p-3">
      <For each={props.products}>{(product) => <Product product={product} />}</For>
    </section>
  );
};
