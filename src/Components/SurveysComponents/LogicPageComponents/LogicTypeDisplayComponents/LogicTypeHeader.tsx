import React from "react";
import styles from "./logicTypeDisplay.module.css"; // Assuming you have a CSS module for styles
import { MdAdd } from "react-icons/md";
import { useAppStateMgtContext } from "../../../../Utils/AppContext";

const LogicTypeHeader: React.FC = () => {
  const { logicNavBTNLabel, setIsDropDownCardOpen } = useAppStateMgtContext();
  return (
    // <div className={styles.logicTypeHeader_wrapper}>
    <div className={styles.logicTypeHeader_header}>
      <h2>{`${logicNavBTNLabel}`} Logic</h2>
      {logicNavBTNLabel === "Skip/Branch" && (
        <button onClick={()=>setIsDropDownCardOpen(true)} className={styles.addSkipBranchLogicButton}>
          <MdAdd size={20} />
          Add Rules
        </button>
      )}
    </div>
    // </div>
  );
};

export default LogicTypeHeader;
