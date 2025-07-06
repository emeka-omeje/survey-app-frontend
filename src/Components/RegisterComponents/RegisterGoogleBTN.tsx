import React from 'react';
import { FaGoogle } from "react-icons/fa";
// import DOMPurify from 'dompurify';

// import GoogleICon from '../../assets/svgs/google1.svg';
// import  GoogleIcon from '../../../../assets/svg-components/googleIcon';
import style from './register.module.css';

const RegisterGoogleBtn: React.FC = function () {
    // const sanitizedGoogleIcon = DOMPurify.sanitize(GoogleICon)

  return (
    <div className={style.register_google_container}>
      <FaGoogle style={{ fontSize: 24, color: "red"}} />
      <p className={style.register_google_p}>Sign up with Google</p>
    </div>
  );
};

export default RegisterGoogleBtn;