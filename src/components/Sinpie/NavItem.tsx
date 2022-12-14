import { createSignal, JSX } from "solid-js";

export type Props = {
  text: JSX.Element;
  icon?: JSX.Element;
  children?: JSX.Element | JSX.Element[];
};
export const NavItem = ({ children, text, icon }: Props) => {
  const [open, setOpen] = createSignal(false);
  return (
    <div onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)} class="dropdown-nav">
      <li class="nav-item flex flex-row justify-between">
        <span class="item-text">{text} </span>
        <span>{icon}</span>
      </li>
      {children && <section classList={{"show":open()}} class="dropdown-container w-full "> {children}</section>}
    </div>
  );
};
