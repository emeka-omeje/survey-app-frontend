import React from "react";
import styles from "./piping.module.css"; // Correct relative path

const PipingActionBTN: React.FC<{
  label: string;
    btnType: "primary" | "secondary";
  actionHandler: () => void;
//   setReceiverText: React.Dispatch<React.SetStateAction<string>>;
}> = ({ label, btnType, actionHandler }) => {
  return (
    <button
      className={
        btnType === "primary" ? styles.btnPrimary : styles.btnSecondary
      }
      onClick={actionHandler}
    >
      {label}
    </button>
  );
};

export default PipingActionBTN;
