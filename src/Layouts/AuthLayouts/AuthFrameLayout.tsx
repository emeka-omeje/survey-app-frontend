import React from "react";
import style from "./authLayouts.module.css";
import AuthLinks from "../../Components/AuthLinks";
import { Outlet } from "react-router-dom";

const AuthFrameLayout: React.FC<NonNullable<unknown>> = function () {
  return (
      <div className={style.frame_inner_wrapper}>
        <AuthLinks />
        <Outlet/>
      </div>
  );
};

export default AuthFrameLayout;