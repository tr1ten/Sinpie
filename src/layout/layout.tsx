import { Component, JSXElement } from "solid-js";
import { Footer } from "../components/Sinpie/Footer";
import { NavBar } from "../components/Sinpie/Navbar";

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
