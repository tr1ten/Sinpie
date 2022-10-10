import { useLocation } from "@solidjs/router";
import { createEffect, createMemo, createSignal, onMount } from "solid-js";
import { API_ENDPOINT } from "../utils/auth";

// this is solid js hook
export function useUser() {
  const [getUser, setUser] = createSignal(null);
  const refreshUser = () => {
    console.log("fetching user info...");
    const token = sessionStorage.getItem("token");
    if (!token) return setUser(null);
    fetch(API_ENDPOINT + "/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  }
  createEffect(()=>window.user = getUser);
  return [getUser,refreshUser];
}
