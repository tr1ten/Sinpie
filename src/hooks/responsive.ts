import { createEffect, createSignal, onMount } from "solid-js";

export function useDimension(){
    const [getDimension, setDimension] = createSignal({width:0,height:0});
    const onResize = () => {
        setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
        });
    };
    onMount(() => {
        window.addEventListener("resize", onResize);
        onResize();
    })
    return getDimension;
}