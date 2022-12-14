// this component is used to render the all product in the product category page

import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { ButtonGroup, Dropdown, DropdownButton } from "solid-bootstrap";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { JSX } from "solid-js/web/types/jsx";
import FallBack from "../../components/common/Fallback";
import {
    DisplayProducts,
  Product,
  ProductCategory,
} from "../../components/Sinpie/DisplayProducts";
import Loading from "../../components/Sinpie/Loading";
import { API_ENDPOINT } from "../../utils/auth";

export default function ProductCategoryPage(): JSX.Element {
  const params = useParams();
  console.log("loading page");
  const [query,setQuery] = useSearchParams();
  const [isPcat, setIsPcat] = createSignal(true);
  const [catString, setCatString] = createSignal("");
  const [products, setProducts] = createSignal<Product[]>([]);
  const [productCategory, setProductCategory] = createSignal<ProductCategory>(null);  
  createEffect(() => {
    setIsPcat(Boolean(params.pcat));
  });
  // onMount doesn't work if state is changing
  createEffect(() => {
    if(isPcat()) setCatString(`pcat=${params.pcat}`);
    else setCatString(`acat=${params.acat}`);
  });
  createEffect(() => {
    const price = `sortBy=price-${query.price}`;
    fetch(`${API_ENDPOINT}/products/?${catString()}${query.price ? '&'+price : ''}`)
      .then((res) => res.json())
      .then(({ products }) => setProducts(products));
  });
  createEffect(() => {
    let pcat;
    if(isPcat()){
      pcat= products()[0]?.productCategory;
    }
    else{ 
      pcat= products()[0]?.animeCategory;

    }
    if(pcat) {document.title = pcat.label;} 
    setProductCategory(pcat);

  });
  const onSortby = (key) => {
    switch (key) {
      case 'price-high':
        setQuery({price:'high'})
        
        break;
      case 'price-low':
        setQuery({price:'low'})
        break    
      default:
        break;
    }
    fetch(`${API_ENDPOINT}/products/?pcat=${params.pcat}&sortBy=${key}`)
      .then((res) => res.json())
      .then(({ products }) => setProducts(products));
  }
  const filterBy = (key) => {
    fetch(`${API_ENDPOINT}/products/?pcat=${params.pcat}&filterBy=${key}`)
      .then((res) => res.json())
      .then(({ products }) => setProducts(products));
  }
  return (
    <Show when={Boolean(productCategory())} fallback={Loading}>
      <div class="m-4">
        <h1 class="text-center text-2xl">{productCategory().label}</h1>
        <div class="m-4 p-2 flex justify-around items-center bg-gray-500 rounded">
          <DropdownButton onSelect={filterBy} variant="filter" as={ButtonGroup} id="Filter By" title="Filter By">
            <Dropdown.Item eventKey="hot_deals">Hot Deals</Dropdown.Item>
            <Dropdown.Item eventKey="latest_added">Latest Added</Dropdown.Item>
            <Dropdown.Item eventKey="ending_soon" >
              Ending Soon
            </Dropdown.Item>
          </DropdownButton>
          {/* Same for sortby */}
          <DropdownButton onSelect={onSortby} as={ButtonGroup} variant="filter" id="SortBy" title="Sort By">
            <Dropdown.Item eventKey="price-low">Price: Low to High</Dropdown.Item>
            <Dropdown.Item eventKey="price-high">Price: High to Low</Dropdown.Item>
            <Dropdown.Item eventKey="rating-high">Rating: High to Low</Dropdown.Item>
          </DropdownButton>
        </div>
        <DisplayProducts products={products()} />
      </div>
    </Show>
  );
}
