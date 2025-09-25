import React from "react";
import styles from "./scoring.module.css";
import { EachScoringPointControlProps } from "../../../../../Utils/dataTypes";

const EachScoringPointControl: React.FC<EachScoringPointControlProps> = ({
  sectionId,
  questionId,
  assignedPoint,
  onPointChange,
}) => {
  const value = assignedPoint ?? 0;

  return (
    <div className={styles.questionControls}>
      <label className={styles.pointsLabel}>Points</label>
      <input
        type="number"
        min={0}
        className={styles.pointsInput}
        value={value}
        onChange={(e) =>
          onPointChange(sectionId, questionId, Number(e.target.value))
        }
        aria-label={`Points for question ${questionId}`}
      />
    </div>
  );
};

export default EachScoringPointControl;
