import React from "react";
import { NavLink } from "react-router-dom";
import style from "./components.module.css";

const AuthLinks: React.FC = function () {
  return (
      <div className={style.auth_link_container}>
        <NavLink
          to={"/register"}
          style={({ isActive }) => ({
            borderBottom: isActive ? `4px solid var(--purple-color)` : "none",
            color: isActive ? `var(--purple-color)` : `var(--primary-black)`,
            transition: `all 200ms ease-in-out`,
          })}
          className={style.auth_link_register}
        >
          REGISTER
        </NavLink>
        <NavLink
          to={"/login"}
          style={({ isActive }) => ({
            borderBottom: isActive ? `4px solid var(--purple-color)` : "none",
            color: isActive ? `var(--purple-color)` : `var(--primary-black)`,
            transition: `all 200ms ease-in-out`,
          })}
          className={style.auth_link_login}
        >
          LOG IN
        </NavLink>
      </div>
  );
};

export default AuthLinks;