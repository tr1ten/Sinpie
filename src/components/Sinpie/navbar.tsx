import { AiFillFire } from "solid-icons/ai";
import { FaSolidChevronDown } from "solid-icons/fa";
import { FiUser } from "solid-icons/fi";
import { FiHeart } from "solid-icons/fi";
import { FiShoppingCart } from "solid-icons/fi";
import { Component, createSignal, JSX } from "solid-js";

type DropDownItemProps = {
  children: JSX.Element;
  prependIcon?: JSX.Element;
  appendIcon?: JSX.Element;
};
function DropDownItem({
  children,
  prependIcon,
  appendIcon,
}: DropDownItemProps): JSX.Element {
  return (
    <div class="dropdown-item">
      {prependIcon && <span class="dropdown-item-icon">{prependIcon}</span>}
      {children}
      {appendIcon && <span class="dropdown-item-icon">{appendIcon}</span>}
    </div>
  );
}
export type Props = {
  text: JSX.Element;
  icon?: JSX.Element;
  children?: JSX.Element | JSX.Element[];
};
const NavItem = ({ children, text, icon }: Props) => {
  const [open, setOpen] = createSignal(false);
  return (
    <div onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)} class="dropdown-nav">
      <li class="nav-item flex flex-row">
        <span class="item-text">{text} </span>
        <span>{icon}</span>
      </li>
      {open() && children && <section class="dropdown-container"> {children}</section>}
    </div>
  );
};

export const NavBar = () => {
  return (
    <nav class="nav-bar">
      <ul class="flex flex-row ">
        <NavItem
          text="Hot Picks"
          icon={<AiFillFire class="s-icon" fill="red" size="1rem" />}
        ></NavItem>
        <NavItem
          text="Types"
          icon={<FaSolidChevronDown class="s-icon" fill="red" size="1rem" />}
        >
          <DropDownItem>Tees</DropDownItem>
          <DropDownItem>Hoodies</DropDownItem>
          <DropDownItem>Shirts</DropDownItem>
        </NavItem>
        <NavItem
          text="Animes"
          icon={<FaSolidChevronDown class="s-icon" fill="red" size="1rem" />}
        >
          <DropDownItem>One Piece</DropDownItem>
          <DropDownItem>Naruto</DropDownItem>
          <DropDownItem>Bleach</DropDownItem>
          {/* Here comes my favorite */}
          <DropDownItem>Deathnote</DropDownItem>
        </NavItem>
      </ul>
      <img class="logo" src="assets/logo.png" alt="sinpie"></img>
      <ul class="flex flex-row ">
        <NavItem
          text={
            <a href="#">
              <FiUser class="s-icon"></FiUser>
            </a>
          }
        ></NavItem>
        <NavItem
          text={
            <a href="#">
              <FiHeart class="s-icon"></FiHeart>
            </a>
          }
        ></NavItem>
        <NavItem
          text={
            <a href="#">
              <FiShoppingCart class="s-icon"></FiShoppingCart>
            </a>
          }
        ></NavItem>
      </ul>
    </nav>
  );
};
