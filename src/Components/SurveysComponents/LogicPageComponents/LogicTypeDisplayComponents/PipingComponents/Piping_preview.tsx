import React from "react";
import styles from "./piping.module.css";

const PipingPreview: React.FC<{
  preview: string;
}> = ({ preview }) => {
  return (
    <div className={styles.previewCard}>
      <h3>Preview</h3>
      <div className={styles.previewText} aria-live="polite">
        {preview}
      </div>
    </div>
  );
};

export default PipingPreview;
