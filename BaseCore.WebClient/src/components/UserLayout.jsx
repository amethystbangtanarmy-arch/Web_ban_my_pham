import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const UserLayout = ({children}) => {
  const location = useLocation();

  useEffect(() => {
    if (window.initLiquorTemplate) {
      setTimeout(() => {
        window.initLiquorTemplate();
      }, 100);
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="layout-public">
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

