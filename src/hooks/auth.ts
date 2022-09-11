import { useLocation } from "@solidjs/router";
import { createMemo, createSignal } from "solid-js";

// this is solid js hook
export function useUser() {
    const [getUser,setUser] = createSignal(null);
    return getUser();
}
