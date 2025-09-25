import React from "react";
import styles from "./skip_branch.module.css";
import { LogicAction } from "../../../../../Utils/dataTypes";
import { renderConditionAction } from "./ConditionalObject_ArrayStatments";



const LogicActionItemDisplay: React.FC<{ questionAction: LogicAction; questionNumberForTarget: string }> = ({ questionAction, questionNumberForTarget }) => {
  return (
    <>
      <span className={styles.logicList_actionType}>{renderConditionAction(questionAction.actionType)}</span>
      {questionAction.targetQuestionId && (
        <span className={styles.logicList_actionTarget}>
          {questionNumberForTarget ? `→ ${questionNumberForTarget}` : `→ ${questionAction.targetQuestionId}`}
        </span>
      )}
    </>
  );
};

export default LogicActionItemDisplay;