import { Component, createResource } from "solid-js";
import { Layout } from "./layout/layout";
import { Home } from "./pages/home";
import "./styles/index.scss";
import { Routes, Route } from "@solidjs/router"
import AuthPage from "./pages/auth";

const App: Component = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/auth" component={AuthPage} />
      </Routes>

    </Layout>
  );
};

export default App;
