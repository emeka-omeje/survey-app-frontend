import React from "react";
import styles from "./skip_branch.module.css"; // Assuming you have a CSS module for styles
import AddRuleModal from "./AddRuleModal";
import SkipBranchListDisplay from "./Skip_Branch_List_Display";

const SkipBranchLogic: React.FC = () => {
  return (
    <div className={styles.skipBranchLogic_wrapper}>
      <AddRuleModal />
      {/* <div className={styles.skipBranchLogic_main}> */}
        <SkipBranchListDisplay />
      {/* </div> */}
    </div>
  );
};

export default SkipBranchLogic;
