import type { Component } from "solid-js";
import { Layout } from "./layout/layout";
import { Home } from "./pages/home";
import "./styles/index.scss";

const App: Component = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default App;
