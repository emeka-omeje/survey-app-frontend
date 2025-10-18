import React from "react";
import styles from "./defaultPrefil.module.css";
import type { DefaultPrefilButtonProps } from "../../../../../Utils/dataTypes";

const DefaultPrefilButton: React.FC<DefaultPrefilButtonProps> = ({
  buttonLabel,
  onClick,
  variant,
  type,
  ariaLabel,
  disabled,
  className,
  style,
}) => {
  const base =
    variant === "primary" ? styles.btn_primary : styles.btn_secondary;
  const cls = [base, className].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={cls}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {buttonLabel}
    </button>
  );
};

export default DefaultPrefilButton;
