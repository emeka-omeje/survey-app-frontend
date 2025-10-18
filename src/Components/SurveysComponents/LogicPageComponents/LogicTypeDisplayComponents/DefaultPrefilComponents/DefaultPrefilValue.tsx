import React from "react";
import styles from "./defaultPrefil.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
};

const DefaultPrefilValue: React.FC<Props> = ({
  value,
  onChange,
  placeholder = "Default value",
  ariaLabel,
  disabled = false,
  className,
}) => {
  return (
    <input
      className={[styles.row_input, styles.value_input, className]
        .filter(Boolean)
        .join(" ")}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      disabled={disabled}
    />
  );
};

export default DefaultPrefilValue;
