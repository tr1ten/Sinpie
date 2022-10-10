import { AiFillFire } from "solid-icons/ai";
import {
  DisplayProducts,
} from "../../components/Sinpie/DisplayProducts";
import "./style.css";
import Cascade1 from "../../../assets/cascade_1.jpg";
import Cascade2 from "../../../assets/cascade_2.jpg";
import Cascade3 from "../../../assets/cascade_3.jpg";
import { Carousel } from "solid-bootstrap";
import { createSignal, onMount, Show } from "solid-js";
import { API_ENDPOINT } from "../../utils/auth";
import Loading from "../../components/Sinpie/Loading";

export const Home = () => {
  const [products,setProducts] = createSignal([]);
  onMount(()=>{
    document.title = "Sinpie";
    fetch(API_ENDPOINT + '/products')
    .then(res=>res.json())
    .then(data=>{
      setProducts(data.products);
    })
  });
  return (
    <main>
      <Carousel controls={false}>
        <Carousel.Item>
          <img src={Cascade1} alt="cascade-1" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={Cascade2} alt="cascade-2" />
        </Carousel.Item>
        <Carousel.Item>
        <img src={Cascade3} alt="cascade-3" />
        </Carousel.Item>
      </Carousel>
      <div class="hot-div">
        <div class="m-auto">
          <h1 class="hot-txt">
            <span class="t-hot"> Hot</span> Picks{" "}
          </h1>
          <AiFillFire class="hot s-icon" />
        </div>
      </div>
      <Show when={products()?.length>0} fallback={Loading}>
      <DisplayProducts products={products()} />
      </Show>
    </main>
  );
};
