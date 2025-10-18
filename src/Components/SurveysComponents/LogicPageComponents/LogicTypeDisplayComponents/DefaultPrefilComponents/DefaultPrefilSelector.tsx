import React from "react";
import styles from "./defaultPrefil.module.css";

type SourceOption = {
  value: string;
  label: string;
};

type Props = {
  sourceValue: string;
  onSourceChange: (value: string) => void;
  //   value: string;
  //   onValueChange: (value: string) => void;
  sourceOptions?: SourceOption[];
  //   placeholder?: string;
  disabled?: boolean;
  ariaLabelSource?: string;
  //   ariaLabelValue?: string;
  className?: string;
};

const DefaultPrefilSelector: React.FC<Props> = ({
  sourceValue,
  onSourceChange,
  //   value,
  //   onValueChange,
  sourceOptions = [
    { value: "static", label: "Static value" },
    { value: "url", label: "From URL" },
    { value: "crm", label: "From CRM" },
  ],
  //   placeholder = 'Default value',
  disabled = false,
  ariaLabelSource,
  //   ariaLabelValue = 'Default value input',
  //   className,
}) => {
  return (
    // <div className={[styles.selector_wrapper, className].filter(Boolean).join(' ')}>
    <label className={styles.selector_sourceLabel}>
      <select
        aria-label={ariaLabelSource}
        className={styles.row_select}
        value={sourceValue}
        onChange={(e) => onSourceChange(e.target.value)}
        disabled={disabled}
      >
        {sourceOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
    // </div>
  );
};

export default DefaultPrefilSelector;
