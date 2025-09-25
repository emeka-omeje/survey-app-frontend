import React from "react";
import styles from "./skip_branch.module.css";
import useLogicHandleFxns from "../../../../../Utils/LogicHandlers/useLogicHandleFxns";
import { skipLogicEditDeleteBTNProps } from "../../../../../Utils/dataTypes";
import useEditSkipLogicFxn from "../../../../../Utils/LogicHandlers/useEditSkipLogicFxn";

const SkipBranchEditDeleteBTN: React.FC<skipLogicEditDeleteBTNProps> = ({
  buttonLabel,
  sectionId,
  questionId,
  conditionId,
}) => {
  const { deleteSkipLogicRule } = useLogicHandleFxns();
  const { initiateEditSkipLogicRule } = useEditSkipLogicFxn();
  const isEditButton = buttonLabel === "Edit";

  const handleClick = () => {
    if (isEditButton) {
      try {
        initiateEditSkipLogicRule(sectionId, questionId, conditionId);
      } catch (err) {
        console.error("Failed to initiate edit for skip logic rule:", err);
      }
      return;
    }

    // Confirm before deleting (enterprise practice)
    const confirmed = window.confirm(
      "Delete this rule? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      deleteSkipLogicRule(sectionId, questionId, conditionId);
    } catch (err) {
      console.error("Failed to delete skip logic rule:", err);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.logicList_btn} ${
        isEditButton ? styles.logicList_btn_edit : styles.logicList_btn_delete
      }`}
      aria-label={`${buttonLabel} condition`}
      onClick={handleClick}
    >
      {buttonLabel}
    </button>
  );
};

export default SkipBranchEditDeleteBTN;
