// this component is used to render the all product in the product category page

import { useNavigate, useParams } from "@solidjs/router";
import { ButtonGroup, Dropdown, DropdownButton } from "solid-bootstrap";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { JSX } from "solid-js/web/types/jsx";
import FallBack from "../../components/common/Fallback";
import {
    DisplayProducts,
  Product,
  ProductCategory,
} from "../../components/Sinpie/display-products";
import { API_ENDPOINT } from "../../utils/auth";

export default function ProductCategoryPage(): JSX.Element {
  const params = useParams();
  const [products, setProducts] = createSignal<Product[]>([]);
  const [productCategory, setProductCategory] = createSignal<ProductCategory>(null);
  // onMount doesn't work if state is changing
  createEffect(() => {
    fetch(`${API_ENDPOINT}/products/?pcat=${params.pcat}`)
      .then((res) => res.json())
      .then(({ products }) => setProducts(products));
  });
  createEffect(() => {
    setProductCategory(products()[0]?.productCategory);
  });
  const navigate = useNavigate();
  return (
    <Show when={Boolean(productCategory())} fallback={FallBack}>
      <div class="m-4">
        <h1 class="text-center text-2xl">{productCategory().label}</h1>
        <div class="m-4 p-2 flex justify-around items-center bg-gray-500 rounded">
          <DropdownButton variant="filter" as={ButtonGroup} id="Filter By" title="Filter By">
            <Dropdown.Item eventKey="1">Hot Deals</Dropdown.Item>
            <Dropdown.Item eventKey="2">Latest Added</Dropdown.Item>
            <Dropdown.Item eventKey="3" >
              Ending Soon
            </Dropdown.Item>
          </DropdownButton>
          {/* Same for sortby */}
          <DropdownButton as={ButtonGroup} variant="filter" id="SortBy" title="Sort By">
            <Dropdown.Item eventKey="1">Price: Low to High</Dropdown.Item>
            <Dropdown.Item eventKey="2">Price: High to Low</Dropdown.Item>
            <Dropdown.Item eventKey="3">Rating: High to Low</Dropdown.Item>
          </DropdownButton>
        </div>
        <DisplayProducts products={products()} />
      </div>
    </Show>
  );
}
