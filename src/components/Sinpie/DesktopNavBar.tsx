import { Link } from "@solidjs/router";
import { AiFillFire } from "solid-icons/ai";
import { FaSolidChevronDown } from "solid-icons/fa";
import { FiUser } from "solid-icons/fi";
import { FiHeart } from "solid-icons/fi";
import { FiShoppingCart } from "solid-icons/fi";
import { For, JSX, Show } from "solid-js";
import Logo from "../../../assets/logo.png";
import { NavProps } from "../../types";
import { DropDownItem } from "./DropDownItem";
import { NavItem } from "./NavItem";


export const DesktopNavBar = (props: NavProps): JSX.Element => {
  return <>
    <ul class="flex flex-row ">
      <NavItem
        text={<Link title="Hot Picks" href="/">Hot Picks</Link>}
        icon={<AiFillFire class="s-icon" fill="red" size="1rem" />}
      ></NavItem>
      <NavItem
        text="Types"
        icon={<FaSolidChevronDown class="s-icon" fill="red" size="1rem" />}
      >
        <For each={props.itemCats()}>
          {(cat) => <DropDownItem href={"/product-category/" + cat.slug}>{cat.label}</DropDownItem>}
        </For>
      </NavItem>
      <NavItem
        text="Animes"
        icon={<FaSolidChevronDown class="s-icon" fill="red" size="1rem" />}
      >
        <For each={props.animeCats()}>
          {(cat) => <DropDownItem>{cat.label}</DropDownItem>}
        </For>
      </NavItem>
    </ul>
    <img class="logo" src={Logo} alt="sinpie"></img>
    <ul class="flex flex-row ">
      <NavItem
        text={<>
          <Show when={Boolean(props.user())}>
            <a href="/">
              <span class="p-1" onClick={props.onLogout}>Logout</span>
              &nbsp;
              <FiUser class="s-icon"></FiUser>
            </a>
          </Show>
          <Show when={!Boolean(props.user())}>
            <Link href="/auth">Sign In </Link>
          </Show>
        </>}
      ></NavItem>
      <NavItem
        text={<Link href="/user/favorites">
          <FiHeart class="s-icon"></FiHeart>
        </Link>}
      ></NavItem>
      <NavItem
        text={<Link href="/cart">
          <FiShoppingCart class="s-icon"></FiShoppingCart>
        </Link>}
      ></NavItem>
    </ul>
  </>;
};
