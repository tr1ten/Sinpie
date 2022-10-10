import { Component, createEffect, onMount } from "solid-js";
import { Layout } from "./layout/layout";
import { Home } from "./pages/home";
import "./styles/index.scss";
import { Routes, Route } from "@solidjs/router"
import AuthPage from "./pages/auth";
import { ProductPage } from "./pages/product/[pid]";
import ProductCategoryPage from "./pages/product-category/[pcat]";
import CartPage from "./pages/cart";
import FavoritesPage from "./pages/user/favorites";
import { useUser } from "./hooks/auth";

const App: Component = () => {
  const [user,refreshUser] = useUser();
  refreshUser();
    window.user = user;
    window.refreshUser = refreshUser;
  return (
    <Layout>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/product/:pid" component={ProductPage} />
        <Route path="/product-category/:pcat" component={ProductCategoryPage} />
        <Route path="/cart" component={CartPage} /> 
        <Route path="/user/favorites" component={FavoritesPage} />
      </Routes>

    </Layout>
  );
};

export default App;
