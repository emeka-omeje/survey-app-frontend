import React from "react";
import styles from "./quotas.module.css";

type Props = {
  value: string;
  onChange: (v: string) => void;
  availableAttributes: string[];
  label?: string;
};

const QuotaAttributeSelector: React.FC<Props> = ({
  value,
  onChange,
  availableAttributes,
  label = "Attribute:",
}) => {
  return (
    <div className={styles.field_row}>
      <div className={styles.field_label}>{label}</div>
      <select
        className={styles.field_select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">— select —</option>
        {availableAttributes.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuotaAttributeSelector;
