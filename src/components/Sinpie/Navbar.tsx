import { Link } from "@solidjs/router";
import { AiFillFire } from "solid-icons/ai";
import { FaSolidChevronDown } from "solid-icons/fa";
import { FiUser } from "solid-icons/fi";
import { FiHeart } from "solid-icons/fi";
import { FiShoppingCart } from "solid-icons/fi";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import Logo from "../../../assets/logo.png";
import { useUser } from "../../hooks/auth";
import { API_ENDPOINT } from "../../utils/auth";
import { DropDownItem } from "./DropDownItem";
import { NavItem } from "./NavItem";

declare global {
  interface Window {
      refreshUser:()=>void;
  }
}

export const NavBar = () => {
  const [user,refreshUser] = useUser();
  const [animeCats,setAnimeCats] = createSignal([]);
  const [itemCats,setItemCats] = createSignal([]);
  onMount(async ()=>{
    window.refreshUser = refreshUser;
    const res = await fetch(API_ENDPOINT+"/animeCats").then((res)=>res.json());
    const {productCategories} = await fetch(API_ENDPOINT+"/productCats").then((res)=>res.json());
    setAnimeCats(res.animeCategories);
    setItemCats(productCategories);

  });
  const onLogout = ()=>{
      window.sessionStorage.removeItem('token');
      window.refreshUser();
  }
  return (
    <nav class="nav-bar">
      <ul class="flex flex-row ">
        <NavItem
          text={<Link title="Hot Picks" href="/">Hot Picks</Link>}
          icon={<AiFillFire class="s-icon" fill="red" size="1rem" />}
        ></NavItem>
        <NavItem
          text="Types"
          icon={<FaSolidChevronDown class="s-icon" fill="red" size="1rem" />}
        >
          <For each={itemCats()}>
            {(cat) => <DropDownItem href={"/product-category/"+cat.slug}>{cat.label}</DropDownItem>}
          </For>
        </NavItem>
        <NavItem
          text="Animes"
          icon={<FaSolidChevronDown class="s-icon" fill="red" size="1rem" />}
        >
          <For each={animeCats()}>
            {(cat) => <DropDownItem>{cat.label}</DropDownItem>}
          </For>
        </NavItem>
      </ul>
      <img class="logo" src={Logo} alt="sinpie"></img>
      <ul class="flex flex-row ">
        <NavItem
          text={  
            <>
            <Show when={Boolean(user())}>
                <a href="/">
                <span class="p-1" onClick={onLogout}>Logout</span> 
                  &nbsp;
                <FiUser class="s-icon"></FiUser>
              </a>
            </Show>
            <Show when={!Boolean(user())}>
              <Link href="/auth">Sign In </Link>
            </Show>
            </>
          }
        ></NavItem>
        <NavItem
          text={
            <Link href="/user/favorites">
              <FiHeart class="s-icon"></FiHeart>
            </Link>
          }
        ></NavItem>
        <NavItem
          text={
            <Link href="/cart">
              <FiShoppingCart class="s-icon"></FiShoppingCart>
            </Link>
          }
        ></NavItem>
      </ul>
    </nav>
  );
};
