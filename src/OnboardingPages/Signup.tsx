import React, { useState, FormEvent } from "react";
import style from "./onboarding.module.css";
import RegisterPassword from "../Components/RegisterComponents/RegisterPassword";
import RegisterGoogleBtn from "../Components/RegisterComponents/RegisterGoogleBTN";
// import capitalizeFirstLetter from "../Middlewares/CapitalizeFirstLetter";
import EmailForm from "../Components/LoginComponents/EmailForm";
import NameInputs from "../Components/RegisterComponents/NameInput";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = function () {
  // const { currentUser } = useAuthVerifyUser();
  const navigate = useNavigate();

  // Define state variables
  const [userFirstName, setUserFirstName] = useState<string>("");
  const [userLastName, setUserLastName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  // const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log(auth?.currentUser)

  // Form submission handler
  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    try {
      console.log(userEmail, userPassword, userFirstName, userLastName)
      // const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      // const user = userCredential.user;
      // console.log(userCredential, user)
      // if (user) {
      //   await updateProfile(user, {
      //     displayName: `${capitalizeFirstLetter(
      //       userFirstName
      //     )} ${capitalizeFirstLetter(userLastName)}`,
      //   });
      //   const userRef = doc(firestoreDB, "users", user.uid);
      //   await setDoc(userRef, {
      //     userType: userSelectOption,
      //   });
      //   await sendEmailVerification(user, actionCodeSettings);
      //   navigate("/auth/account-verification");
      // }
      navigate("/dashboard")
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={style.register_form}
      onSubmit={handleSubmitForm}
      aria-labelledby="register-heading"
    >
      {/* Register form inputs */}
      <NameInputs setUserFirstName={setUserFirstName} setUserLastName={setUserLastName} />
      <EmailForm setUserEmail={setUserEmail} />
      <RegisterPassword setUserPassword={setUserPassword} />

      {/* Submit button */}
      <button
        data-testid="create_account"
        className={style.register_form_btn}
        type="submit"
        aria-label="Create Account"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Wait ..." : "Create an account"}
      </button>

      {/* Social media registration buttons */}
      <RegisterGoogleBtn />
      {/* <RegisterLinkedInBtn /> */}
    </form>
  );
};

export default RegisterForm;