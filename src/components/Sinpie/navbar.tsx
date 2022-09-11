import { Link } from "@solidjs/router";
import { AiFillFire } from "solid-icons/ai";
import { FaSolidChevronDown } from "solid-icons/fa";
import { FiUser } from "solid-icons/fi";
import { FiHeart } from "solid-icons/fi";
import { FiShoppingCart } from "solid-icons/fi";
import Logo from "../../../assets/logo.png";
import { useUser } from "../../hooks/auth";
import { DropDownItem } from "./DropDownItem";
import { NavItem } from "./NavItem";

export const NavBar = () => {
  const user = useUser();
  return (
    <nav class="nav-bar">
      <ul class="flex flex-row ">
        <NavItem
          text={<Link href="/">Hot Picks</Link>}
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
      <img class="logo" src={Logo} alt="sinpie"></img>
      <ul class="flex flex-row ">
        <NavItem
          text={
            user ? <a href="#">
              <FiUser class="s-icon"></FiUser>
            </a> : 
            <Link href="/auth">
              Sign In
            </Link>
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
