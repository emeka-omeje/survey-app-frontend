import React, { useState, ChangeEvent } from "react";
import style from "./login.module.css";
import isEmailValid from "../../Middlewares/IsEmailValid";

interface LoginEmailProps {
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailForm: React.FC<LoginEmailProps> = ({ setUserEmail }) => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to handle changes in the email input
  const handleEmailSetting = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setEmailValue(value);
    if (!isEmailValid(value)) {
      setErrorMessage("Invalid email address");
    } else {
      setErrorMessage("");
    }

    setUserEmail(value);
  };

  return (
    <div className={style.login_email_wrapper}>
      {/* Email address label with aria attributes */}
      <label
        className={style.login_email_label}
        htmlFor="emailInput"
        aria-label="Email address"
      >
        Email address
      </label>

      {/* Email input field */}
      <input
        data-testid="email"
        id="emailInput"
        name="email"
        type="email"
        placeholder="example@yahoo.com"
        className={style.login_email_input}
        value={emailValue}
        onChange={handleEmailSetting}
        required
        // Accessibility attributes
        aria-required="true"
      />
      {errorMessage && (
        <div id="email-error" className={style.error_message}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default EmailForm;
