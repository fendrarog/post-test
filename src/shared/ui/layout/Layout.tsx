import React from "react";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  return (
    <>
      <header></header>
      <main><Outlet /></main>
      <footer></footer>
    </>
  );
};

export default Layout;
