import React, { FormEvent, useState } from 'react';
import style from './onboarding.module.css';
import EmailForm from '../Components/LoginComponents/EmailForm';
import PasswordForm from '../Components/LoginComponents/PasswordForm';
import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../../Firebase-Tools/firebase';
// import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = function () {
  const navigate = useNavigate()

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isLogginIn, setIsLogginIn] = useState<boolean>(false)

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setIsLogginIn(true)
    try {
      console.log(userEmail, userPassword)
      // const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword)
      // // .then((userCredential)=>{
      //   const user = userCredential.user
      //   if(user){
      //     navigate("/feeds")
      //   }
        // console.log("logged in..")
        // userCredential &&  
        // //  : navigate("/auth/sign/login")
        navigate("/dashboard")
      } catch (error) {
      console.error(error)
  }
    // }).catch((error)=>{
    // });
  }


  return (
    <form role='form' className={style.login_form} onSubmit={handleSubmitForm}>
      <EmailForm setUserEmail={setUserEmail} />
      <PasswordForm setUserPassword={setUserPassword} />
      <button className={style.login_form_btn} type="submit">
        {isLogginIn ? "Verifying email ..." : "Send me a verification code"}
      </button>
    </form>
  );
};

export default LoginForm;