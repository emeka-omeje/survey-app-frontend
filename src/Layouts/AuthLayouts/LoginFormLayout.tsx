import React from 'react';
import TitleForm from '../../Components/LoginComponents/TitleForm';
import LoginForm from '../../OnboardingPages/Signin';
import style from "./authLayouts.module.css";

const LoginFormLayout:React.FC = function () {
  return (
    <section className={style.login_ui_wrapper}>
        <TitleForm title="Submit email to participate in a survey" />
        <LoginForm />
    </section>
  )
}

export default LoginFormLayout