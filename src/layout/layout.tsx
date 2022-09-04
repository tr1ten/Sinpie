import { Component, JSXElement } from "solid-js";
import { Footer } from "../components/Sinpie/footer";
import { NavBar } from "../components/Sinpie/navbar";

type LayoutProps = {
  children: JSXElement;
};
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
