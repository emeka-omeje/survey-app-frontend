import React from "react";
import style from "./login.module.css";

type TitleProps = {
  title: string;
};

const LoginTitle: React.FC<TitleProps> = ({ title }) => {
  return <header className={style.login_title}>{title}</header>;
};

export default LoginTitle;
