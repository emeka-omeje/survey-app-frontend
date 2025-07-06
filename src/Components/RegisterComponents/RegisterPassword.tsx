import React, { useState, ChangeEvent } from "react";
import style from "./register.module.css";
// import DOMPurify from "dompurify";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

interface RegisterPasswordProps {
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterPassword: React.FC<RegisterPasswordProps> = ({
  setUserPassword,
}) => {
  // const sanitizedOpenEyeIcon = DOMPurify.sanitize(OpenEyeIcon);
  // const sanitizedCloseEyeIcon = DOMPurify.sanitize(CloseEyeIcon);

  const [pwdValue1, setPwdValue1] = useState<string>("");
  const [pwdValue2, setPwdValue2] = useState<string>("");
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [pwdError, setPwdError] = useState<string>("");

  // Function to handle changes in the first password input
  const handlePwdSetting1 = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPwdValue1(value);
  };

  // Function to handle changes in the second password input
  const handlePwdSetting2 = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPwdValue2(value);

    // Check if passwords match and set error message accordingly
    if (pwdValue1 !== value) {
      setPwdError("Passwords do not match!");
    } else {
      setPwdError("");
      setUserPassword(value);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = (prop: string) => {
    if(prop === "1") {
      setShowPassword1(!showPassword1);
    } else { setShowPassword2(!showPassword2); }
  };

  return (
    <>
      {/* Password input 1 */}
      <div className={style.register_pwd1_wrapper}>
        <label className={style.register_pwd1_label}>Password</label>
        <div className={style.register_pwd1_input_container}>
          <input
            data-testid="password"
            name="password"
            type={showPassword1 ? "text" : "password"}
            placeholder="Password"
            className={style.register_pwd1_input}
            value={pwdValue1}
            minLength={8} // minLength should be a number
            required
            onChange={handlePwdSetting1}
            // Accessibility attributes
            aria-label="Password"
            aria-required="true"
            aria-describedby={pwdError ? "password-error" : undefined}
          />
          {/* Toggle password visibility icon */}
          <div
            className={style.password_toggle_icon}
            onClick={() => togglePasswordVisibility("1")}
            role="button"
            tabIndex={0} // Add tabIndex for keyboard accessibility
            aria-label={showPassword1 ? "Hide password" : "Show password"}
          >
            {/* SVG icon for toggling password visibility */}
            {showPassword1 ? (
              <IoEyeOutline style={{ fontSize: 20}} />
            ) : (
              <IoEyeOffOutline style={{ fontSize: 20}} />
            )}
          </div>
        </div>
      </div>

      {/* Password input 2 */}
      <div className={style.register_pwd2_wrapper}>
        <label className={style.register_pwd2_label}>Confirm password</label>
        <div className={style.register_pwd2_input_container}>
          <input
            name="password"
            type={showPassword2 ? "text" : "password"}
            placeholder="Confirm"
            className={style.register_pwd2_input}
            value={pwdValue2}
            minLength={8} // minLength should be a number
            onChange={handlePwdSetting2}
            // Accessibility attributes
            aria-label="Confirm Password"
            aria-required="true"
            aria-describedby={pwdError ? "password-error" : undefined}
          />
          {/* Toggle password visibility icon */}
          <div
            className={style.password_toggle_icon}
            onClick={() => togglePasswordVisibility("2")}
            role="button"
            tabIndex={0} // Add tabIndex for keyboard accessibility
            aria-label={showPassword1 ? "Hide password" : "Show password"}
          >
            {/* SVG icon for toggling password visibility */}
            {showPassword1 ? (
              <IoEyeOutline style={{ fontSize: 20}} />
            ) : (
              <IoEyeOffOutline style={{ fontSize: 20}} />
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {pwdError && (
        <div id="password-error" className={style.error_message}>
          {pwdError}
        </div>
      )}
    </>
  );
};

export default RegisterPassword;