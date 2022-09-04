import { For } from "solid-js";
import { Product } from "./product";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  imgUrl: string;
  ratings: number;
};
type Props = {
  products: Product[];
};
export const DisplayProducts = ({ products }: Props) => {
  return (
    <section class="hot-container p-3">
      <For each={products}>{(product) => <Product product={product} />}</For>
    </section>
  );
};
