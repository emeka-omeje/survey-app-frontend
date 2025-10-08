import React from "react";
import styles from "./piping.module.css";
import { AvailableQuestionForPiping } from "../../../../../Utils/dataTypes";

type PipingSidebarProps = {
  availableQuestions: AvailableQuestionForPiping[];
  insertTokenFor: (id: string) => void;
};

const PipingSidebar: React.FC<PipingSidebarProps> = ({
  availableQuestions,
  insertTokenFor,
}) => {
  return (
    <aside className={styles.piping_sidebar}>
      <label>Available source questions</label>
      <ul className={styles.sourceList}>
        {availableQuestions.map((aq: AvailableQuestionForPiping) => (
          <li key={aq.id} className={styles.sourceItem}>
            <button
              type="button"
              className={styles.insertBtn}
              onClick={() => insertTokenFor(aq.id)}
              title={`Insert token for ${aq.text}`}
            >
              Insert
            </button>
            <div className={styles.sourceMeta}>
              <strong className={styles.sourceLabel}>{aq.label}</strong>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default PipingSidebar;
