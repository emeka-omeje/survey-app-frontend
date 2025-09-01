import React from "react";
import styles from "./skip_branch.module.css"; // Assuming you have a CSS module for styles
import AddRuleModal from "./AddRuleModal";
// import { useAppStateMgtContext } from "../../../../../Utils/AppContext";

const SkipBranchLogic: React.FC = () => {
  // const { isDropDownCardOpen } = useAppStateMgtContext();
  return (
    <div className={styles.skipBranchLogic_wrapper}>
      <AddRuleModal />
      {/* {isDropDownCardOpen && <AddRuleModal />} */}
    </div>
  );
};

export default SkipBranchLogic;
