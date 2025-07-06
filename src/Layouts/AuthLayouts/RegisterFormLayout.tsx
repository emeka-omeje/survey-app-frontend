import React from 'react';
import style from "./authLayouts.module.css";
import LoginTitle from '../../Components/LoginComponents/TitleForm';
import RegisterForm from '../../OnboardingPages/Signup';

const RegisterFormLayout: React.FC = function () {
  return (
    <section className={style.login_ui_wrapper}>
      {/* Register Title - Had to reuse the login title component */}
      <LoginTitle title='Create account to participate in a survey' />
      {/* Register Form */}
      <RegisterForm />
    </section>
  );
};

export default RegisterFormLayout;