import { AiFillFire } from "solid-icons/ai";
import { createSlider, Slider, SliderButton, SliderProvider } from "solid-slider";
import { DisplayProducts, Product } from "../../components/Sinpie/display-products";
import './style.css';
import autoplay from "solid-slider/plugins/autoplay";

const dummyProducts:Product[] = [
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: "assets/prod.jpg",
    ratings: 4
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: "assets/prod.jpg",
    ratings: 4
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: "assets/prod.jpg",
    ratings: 4
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: "assets/prod.jpg",
    ratings: 4
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: "assets/prod.jpg",
    ratings: 4
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: "assets/prod.jpg",
    ratings: 4
  }
];
export const Home = () => {
    return (
        <main>
        <Slider options={{ loop: true }} plugins={[autoplay(3000, {})]}>
            <img src="assets/cascade_1.jpg" alt='cascade-1' />
            <img src="assets/cascade_2.jpg" alt='cascade-2' />
              <img src="assets/cascade_3.jpg" alt='cascade-3' />

        </Slider>
        <div class="hot-div">
          <div class="m-auto">
          <h1 class="hot-txt" ><span class="t-hot" > Hot</span> Picks  </h1>
          <AiFillFire class="hot s-icon" />
          </div>
        </div>
        <DisplayProducts products={dummyProducts} />
        </main>
      );
}
