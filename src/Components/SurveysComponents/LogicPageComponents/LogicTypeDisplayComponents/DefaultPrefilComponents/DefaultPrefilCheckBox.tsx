import React from "react";
import styles from "./defaultPrefil.module.css";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
};

const DefaultPrefilCheckBox: React.FC<Props> = ({
  checked,
  onChange,
  label = "Editable",
  ariaLabel,
  disabled,
  className,
}) => {
  return (
    <label
      className={[styles.row_toggleLabel, className].filter(Boolean).join(" ")}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel}
        disabled={disabled}
      />
      {label}
    </label>
  );
};

export default DefaultPrefilCheckBox;
