import { For } from "solid-js";
import { Product } from "./Product";

export type ProductCategory = {
  id: number;
  label: string;
  slug:string;
}

export type AnimeCategory = {
  id: number;
  label: string;
  slug:string;
}

export type Product = {
  id: number;
  shopUrl: string;
  label: string;
  price: number;
  description: string;
  image: string;
  ratings: number;
  productCategory: ProductCategory;
  isFav: boolean;
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
