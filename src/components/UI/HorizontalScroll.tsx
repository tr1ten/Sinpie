import { For, JSX } from "solid-js";

// this component display items in horizontal scroll
export function HorizontalScroll(props:{children:JSX.Element[]}){
    return <div class="horizontal-scroll-container border-b-2">
        <For each={props.children}>
        {(child)=><div class="horizontal-scroll-item">{child}</div>}
    </For>
    </div>
}