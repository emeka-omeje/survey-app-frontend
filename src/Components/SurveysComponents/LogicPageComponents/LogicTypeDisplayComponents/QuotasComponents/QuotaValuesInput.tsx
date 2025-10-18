import React from "react";
import styles from "./quotas.module.css";

type Props = {
  allowCustom: boolean;
  onAllowCustomChange: (v: boolean) => void;
  valuesText: string;
  onValuesTextChange: (v: string) => void;
  selectedOptions: string[];
  onToggleOption: (opt: string, checked: boolean) => void;
  attributeOptions?: Record<string, string[]>;
  attribute?: string;
};

const QuotaValuesInput: React.FC<Props> = ({
  allowCustom,
  onAllowCustomChange,
  valuesText,
  onValuesTextChange,
  selectedOptions,
  onToggleOption,
  attributeOptions,
  attribute,
}) => {
  return (
    <div className={styles.field_row}>
      <div className={styles.field_label}>Values:</div>
      <div className={styles.values_container}>
        <label className={styles.checkbox_wrapper}>
          <input
            type="checkbox"
            checked={allowCustom}
            onChange={(e) => onAllowCustomChange(e.target.checked)}
          />
          <span className={styles.checkbox_label}>Allow custom values</span>
        </label>

        {allowCustom ? (
          <input
            className={styles.field_input}
            placeholder="Comma separated values (e.g., USA, Canada)"
            value={valuesText}
            onChange={(e) => onValuesTextChange(e.target.value)}
          />
        ) : attributeOptions && attributeOptions[attribute ?? ""] ? (
          <div className={styles.options_list}>
            {attributeOptions[attribute ?? ""].map((opt) => (
              <label key={opt} className={styles.checkbox_wrapper}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(opt)}
                  onChange={(e) => onToggleOption(opt, e.target.checked)}
                />
                <span className={styles.checkbox_label}>{opt}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className={styles.small}>
            No options available for this attribute.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotaValuesInput;
