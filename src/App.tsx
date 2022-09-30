import { Component, createResource } from "solid-js";
import { Layout } from "./layout/layout";
import { Home } from "./pages/home";
import "./styles/index.scss";
import { Routes, Route } from "@solidjs/router"
import AuthPage from "./pages/auth";
import { ProductPage } from "./pages/product/[pid]";
import ProductCategoryPage from "./pages/product-category/[pcat]";
import CartPage from "./pages/cart";
import FavoritesPage from "./pages/user/favorites";

const App: Component = () => {
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
