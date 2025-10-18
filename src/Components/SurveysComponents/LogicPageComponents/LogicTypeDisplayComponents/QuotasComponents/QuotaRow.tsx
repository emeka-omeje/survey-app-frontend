import React from "react";
import styles from "./quotas.module.css";
import type { QuotaRowProps } from "../../../../../Utils/dataTypes";

const QuotaRow: React.FC<QuotaRowProps> = ({ quota, onEdit, onDelete }) => {
  const pct = Math.min(
    100,
    Math.round((quota.count / Math.max(1, quota.limit)) * 100)
  );
  return (
    <div
      className={styles.quota_card}
      role="listitem"
      tabIndex={0}
      aria-label={`Quota ${quota.name}`}
    >
      <div className={styles.quota_meta}>
        <div className={styles.quota_rowTop}>
          <div>
            <div className={styles.quota_name}>{quota.name}</div>
            <div className={styles.quota_attr}>
              {quota.attribute} · {quota.values.join(", ")}
            </div>
          </div>
        </div>

        <div className={styles.quota_stats}>
          <div className={styles.progress_wrapper} aria-hidden>
            <div
              className={styles.progress_fill}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className={styles.small}>
            {quota.count}/{quota.limit} ({pct}%)
          </div>
        </div>
      </div>

      <div className={styles.quota_actions}>
        <button
          className={styles.btn}
          onClick={() => onEdit(quota)}
          aria-label={`Edit ${quota.name}`}
        >
          Edit
        </button>
        <button
          className={styles.btn}
          onClick={() => onDelete(quota.id)}
          aria-label={`Delete ${quota.name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuotaRow;
