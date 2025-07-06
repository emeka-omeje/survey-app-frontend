import React from "react";
import style from "./homeAppLayout.module.css";
import HomeAsideLayout from "./HomeAsideLayout";
import HomeNavLayout from "./HomeNavLayout";
import { Outlet } from "react-router-dom";

const HomeAppLayout: React.FC = function () {

  return (
    <main className={style.app_layout_main}>
      {/* Sidebar navigation layout */}
      <HomeAsideLayout />

      {/* Outlet for rendering child routes */}
      <section className={style.app_layout_outlet_wrapper}>
        {/* Top navigation layout */}
        <HomeNavLayout />
        <div className={style.app_layout_outlet_container}>
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default HomeAppLayout;
