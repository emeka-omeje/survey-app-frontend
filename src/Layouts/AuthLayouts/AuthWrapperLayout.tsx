import React from "react";
import style from "./authLayouts.module.css";
import { Outlet } from "react-router-dom";

const AuthWrapperLayout: React.FC<NonNullable<unknown>> = function () {
  return (
    <section className={style.frame_wrapper}>
        <Outlet/>
    </section>
  );
};

export default AuthWrapperLayout;