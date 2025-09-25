import React from "react";
import styles from "../logicTypeDisplay.module.css"; // Correct relative path
import SkipBranchHeader from "./SkipBranchHeader";
import ScoringHeader from "./ScoringHeader";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";

const LogicTypeHeader: React.FC = () => {
  const { logicNavBTNLabel } = useAppStateMgtContext();

  return (
    // <div className={styles.logicTypeHeader_wrapper}>
    <div className={styles.logicTypeHeader_header}>
      <h2>{`${logicNavBTNLabel}`} Logic</h2>
      {logicNavBTNLabel === "Skip/Branch" && <SkipBranchHeader />}
      {logicNavBTNLabel === "Scoring" && <ScoringHeader />}
    </div>
    // </div>
  );
};

export default LogicTypeHeader;
