import { AiFillFire } from "solid-icons/ai";
import {
  createSlider,
  Slider,
  SliderButton,
  SliderProvider,
} from "solid-slider";
import {
  DisplayProducts,
  Product,
} from "../../components/Sinpie/display-products";
import "./style.css";
import Cascade1 from "../../../assets/cascade_1.jpg";
import Cascade2 from "../../../assets/cascade_2.jpg";
import Cascade3 from "../../../assets/cascade_3.jpg";
import ProductImg from "../../../assets/prod.jpg";
import autoplay from "solid-slider/plugins/autoplay";
import { Carousel, Corousel } from "solid-bootstrap";

const dummyProducts: Product[] = [
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: ProductImg,
    ratings: 4,
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: ProductImg,
    ratings: 4,
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: ProductImg,
    ratings: 4,
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: ProductImg,
    ratings: 4,
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: ProductImg,
    ratings: 4,
  },
  {
    id: 1,
    title: "Cool Hoodie",
    price: 69.9,
    description: "Cool hoodie",
    imgUrl: ProductImg,
    ratings: 4,
  },
];
export const Home = () => {
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
      <DisplayProducts products={dummyProducts} />
    </main>
  );
};
