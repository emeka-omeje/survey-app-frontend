import React from "react";
import styles from "../logicTypeDisplay.module.css"; // parent folder css
import { MdAdd } from "react-icons/md";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";

const SkipBranchHeader: React.FC = () => {
  const { setIsDropDownCardOpen } = useAppStateMgtContext();

  return (
    <>
      <button
        onClick={() => setIsDropDownCardOpen(true)}
        className={styles.addSkipBranchLogicButton}
      >
        <MdAdd size={20} />
        Add Rules
      </button>
    </>
  );
};

export default SkipBranchHeader;
