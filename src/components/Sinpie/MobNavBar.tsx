// Navbar shown on mobile devices

import { Link } from "@solidjs/router";
import { AiFillFire } from "solid-icons/ai";
import { FaSolidChevronDown } from "solid-icons/fa";
import { FiHeart, FiMenu, FiShoppingCart, FiUser } from "solid-icons/fi";
import { createSignal, For, Show } from "solid-js";
import Logo from "../../../assets/logo.png";
import { NavProps } from "../../types";
import { DropDownItem } from "./DropDownItem";
import { NavItem } from "./NavItem";
function ImCross(props) {
  return (
    <span {...props}>
      <svg
        fill="currentColor"
        stroke-width="0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        style="overflow: visible;"
      >
        <path
          fill="currentColor"
          d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 000-.707L13.561.146a.499.499 0 00-.707 0L8 5 3.146.146a.5.5 0 00-.707 0L.146 2.439a.499.499 0 000 .707L5 8 .146 12.854a.5.5 0 000 .707l2.293 2.293a.499.499 0 00.707 0L8 11l4.854 4.854a.5.5 0 00.707 0l2.293-2.293a.499.499 0 000-.707z"
        ></path>
      </svg>
    </span>
  );
}

type Props = NavProps & { show: boolean; onClose: () => void };
function MenuOverlay(props: Props) {
  return (
    <div
      onClick={props.onClose}
      classList={{ "show": props.show }}
      class="menu-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
    >
      <section class="menu-bar flex flex-col bg-white h-full">
        <div class="w-full flex justify-end bg-white">
          <ImCross class="ico p-4 cursor-pointer" onClick={props.onClose} />{" "}
        </div>
        <div class="flex flex-col justify-center items-center p-3">
          <ul class="flex flex-col justify-center">
            <NavItem
              text={
                <Link title="Hot Picks" href="/">
                  Hot Picks
                </Link>
              }
              icon={<AiFillFire class="s-icon" fill="red" size="1rem" />}
            ></NavItem>
            <NavItem
              text="Types"
              icon={
                <FaSolidChevronDown class="s-icon" fill="red" size="1rem" />
              }
            >
              <For each={props.itemCats()}>
                {(cat) => (
                  <DropDownItem href={"/product-category/" + cat.slug}>
                    {cat.label}
                  </DropDownItem>
                )}
              </For>
            </NavItem>
            <NavItem
              text="Animes"
              icon={
                <FaSolidChevronDown class="s-icon" fill="red" size="1rem" />
              }
            >
              <For each={props.animeCats()}>
                {(cat) => <DropDownItem>{cat.label}</DropDownItem>}
              </For>
            </NavItem>
          </ul>
          <ul class="flex flex-col justify-center">
            <NavItem
            icon={<FiUser class="s-icon"  />}
              text={
                <>
                  <Show when={props.isLogin}>
                    <a href="/">
                      <span class="p-1" onClick={props.onLogout}>
                        Logout
                      </span>
                      &nbsp;
                    </a>
                  </Show>
                  <Show when={!props.isLogin}>
                    <Link href="/auth">Sign In </Link>
                  </Show>
                </>
              }
            ></NavItem>
            <NavItem
              icon={<FiHeart class="s-icon" />}
              text={
                <Link href="/user/favorites">
                  Favorites
                </Link>
              }
            ></NavItem>
            <NavItem
            icon={<FiShoppingCart class="s-icon"></FiShoppingCart>}
              text={
                <Link href="/cart">
                  Cart
                </Link>
              }
            ></NavItem>
          </ul>
        </div>
      </section>
    </div>
  );
}
export default function MobNavBar(props: NavProps) {
  // one burger icon and sinpie logo
  const [show, setShow] = createSignal(false);
  const toggle = () => setShow(!show());
  const close = () => setShow(false);
  return (
    <>
      <MenuOverlay onClose={close} show={show()} {...props}></MenuOverlay>
      <ul class="w-full flex flex-row">
        <NavItem
          text=""
          icon={<FiMenu onClick={toggle} class=" text-xl" fill="black" />}
        />
        <div class="w-full">
          <img class="logo m-auto w-max" src={Logo} alt="sinpie"></img>
        </div>
      </ul>
    </>
  );
}
