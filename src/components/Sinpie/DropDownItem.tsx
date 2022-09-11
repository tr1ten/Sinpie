import { JSX } from "solid-js";

type DropDownItemProps = {
  children: JSX.Element;
  prependIcon?: JSX.Element;
  appendIcon?: JSX.Element;
};
export function DropDownItem({
  children, prependIcon, appendIcon,
}: DropDownItemProps): JSX.Element {
  return (
    <div class="dropdown-item">
      {prependIcon && <span class="dropdown-item-icon">{prependIcon}</span>}
      {children}
      {appendIcon && <span class="dropdown-item-icon">{appendIcon}</span>}
    </div>
  );
}
