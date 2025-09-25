import React from "react";
import styles from "./scoring.module.css";

const ScoringHeaderBTN: React.FC<{
  handleClickFXN: () => void;
  title: string;
  label: string;
}> = ({ handleClickFXN, title, label }) => {

    const isSaveButton = label === "Save";

  return (
    <button
      className={isSaveButton ? styles.btnPrimary : styles.btnSecondary}
      onClick={handleClickFXN}
      title={title}
    >
      {label}
    </button>
  );
};

export default ScoringHeaderBTN;
