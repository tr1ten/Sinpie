import { Accessor, createEffect, createMemo, createSignal, Match, onMount, Switch } from "solid-js";
import { useDimension } from "../../hooks/responsive";
import { API_ENDPOINT } from "../../utils/auth";
import { DesktopNavBar } from "./DesktopNavBar";
import MobNavBar from "./MobNavBar";

declare global {
  interface Window {
      user: Accessor<any>;
      refreshUser: () => void;
  }
}
export const NavBar = () => {
  const dimensions = useDimension();
  const [animeCats,setAnimeCats] = createSignal([]);
  const [itemCats,setItemCats] = createSignal([]);
  const isMobile = createMemo(()=>{
    return dimensions().width < 768;
  });
  onMount(async ()=>{
    const res = await fetch(API_ENDPOINT+"/animeCats").then((res)=>res.json());
    const {productCategories} = await fetch(API_ENDPOINT+"/productCats").then((res)=>res.json());
    setAnimeCats(res.animeCategories);
    setItemCats(productCategories);

  });

  const onLogout = ()=>{
      window.sessionStorage.removeItem('token');
      window.refreshUser();
  }
  return (
    <nav class="nav-bar">
      <Switch>
        <Match when={!isMobile()}>
          <DesktopNavBar animeCats={animeCats} isLogin={()=>Boolean(window.user())} itemCats={itemCats} onLogout={onLogout} user={window.user}></DesktopNavBar>
        </Match>
        <Match when={isMobile()}>
          <MobNavBar animeCats={animeCats} isLogin={()=>Boolean(window.user())} itemCats={itemCats} onLogout={onLogout} user={window.user}/>
        </Match>
      </Switch>
    </nav>
  );
};
