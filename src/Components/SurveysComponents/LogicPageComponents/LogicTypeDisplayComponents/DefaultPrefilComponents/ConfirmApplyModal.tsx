import React from "react";
import styles from "./defaultPrefil.module.css";

type Props = {
  open: boolean;
  questionLabel?: string;
  questionNumber?: string | number;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmApplyModal: React.FC<Props> = ({
  open,
  questionLabel,
  questionNumber,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className={styles.modal_overlay} role="dialog" aria-modal="true">
      <div className={styles.modal_content}>
        <div className={styles.modal_body}>
          <p>
            Apply this default setting for{" "}
            <strong>
              {questionNumber
                ? `Question ${questionNumber}`
                : questionLabel ?? "the question"}
            </strong>
            ?
          </p>
        </div>
        <div className={styles.modal_actions}>
          <button className={styles.btn_secondary} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.btn_primary} onClick={onConfirm}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmApplyModal;
