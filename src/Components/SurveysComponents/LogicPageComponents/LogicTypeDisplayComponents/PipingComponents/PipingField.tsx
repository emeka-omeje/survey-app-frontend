import React from "react";
import styles from "./piping.module.css";

export type PipingFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  inputClassName?: string;
};

const PipingField: React.FC<PipingFieldProps> = ({
  id,
  label,
  value,
  placeholder = "",
  onChange,
  inputClassName = "",
}) => {
  return (
    <div className={styles.pipingField}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={[styles.smallInput, inputClassName]
          .filter(Boolean)
          .join(" ")}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default PipingField;
