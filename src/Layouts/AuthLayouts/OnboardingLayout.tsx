import React from 'react';
import { Outlet } from 'react-router-dom';
import style from "./authLayouts.module.css";
import Landing from '../../OnboardingPages/Landing';


const OnboardingLayout: React.FC = function () {

  return (
    <main className={style.auth_layout_wrapper}>
      <Landing />
      <Outlet />
    </main>
  )
}

export default OnboardingLayout