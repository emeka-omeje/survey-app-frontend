import React from "react";
import styles from "./piping.module.css";
import { AvailableQuestionForPiping } from "../../../../../Utils/dataTypes";

type Props = {
  label?: string;
  options: AvailableQuestionForPiping[];
  value: string; // selected id
  onChange: (id: string) => void;
};

const SelectorComponent: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen((s) => !s);
  const handleSelect = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  const chosen = options.find((o) => o.id === value);

  return (
    <div className={styles.availableQuestionListDisplay}>
      {label && <div style={{ marginBottom: 6, fontWeight: 600 }}>{label}</div>}
      <button
        type="button"
        className={styles.availableQuestionListDisplay_btn}
        onClick={handleToggle}
        aria-expanded={open}
      >
        <span
          style={{
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {chosen
            ? `${chosen.qNumb}: ${chosen.text}`
            : "Select source question"}
        </span>
        <span aria-hidden style={{ marginLeft: 8 }}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          className={styles.availableQuestionListDisplay_wrapper}
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.id}
              className={styles.availableQuestionListDisplay_item}
              onClick={() => handleSelect(opt.id)}
              role="option"
              aria-selected={opt.id === value}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* <span style={{ fontWeight: 600 }}>{`${opt.qNumb}: ${opt.text}`}</span> */}
                <span
                  style={{ fontSize: 14, color: "var(--muted-text, #6b7280)" }}
                >
                  {opt.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectorComponent;
