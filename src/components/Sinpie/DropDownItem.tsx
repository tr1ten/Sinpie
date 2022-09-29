import { useNavigate } from "@solidjs/router";
import { createMemo, JSX } from "solid-js";

type DropDownItemProps = {
  children: JSX.Element;
  prependIcon?: JSX.Element;
  appendIcon?: JSX.Element;
  href?: string;
};
export function DropDownItem({
  children, prependIcon, appendIcon,...props
}: DropDownItemProps): JSX.Element {
  const navigate = useNavigate();
  const onClickHandler = () => {
    if(props.href){
      navigate(props.href);
    }
  }
  return (
    <div class="dropdown-item" onClick={onClickHandler}>
      {prependIcon && <span class="dropdown-item-icon">{prependIcon}</span>}
      {children}
      {appendIcon && <span class="dropdown-item-icon">{appendIcon}</span>}
    </div>
  );
}
