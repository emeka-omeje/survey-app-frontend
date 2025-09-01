import React from "react";
import styles from "./skip_branch.module.css";
import AvailableQuestionListDisplay from "./AvailableQuestionListDisplay";
import ConditionStatementSelector from "./ConditionStatementSelector";
import ValueConditionInput from "./ValueConditionInput";
import { AnotherDropDownProps } from "../../../../../Utils/dataTypes";
import ActionStatementSelector from "./ActionStatementSelector";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import AvailableQuestionListAfterSelect from "./AvailableQuestionListAfterSelect";
// import SpinIcon from "../../../../../Middlewares/SpinIcon/SpinIcon";
// import SpinIcon2 from "../../../../../Middlewares/SpinIcon/SpinIcon2";
// import { AddRuleDropDownProps } from "../../../../../Utils/dataTypes";

const RuleSetter: React.FC<AnotherDropDownProps> = ({
  isAnotherDropDown,
  setIsAnotherDropDown,
}) => {
  const { logicActionStatement } = useAppStateMgtContext();

  // if (logicIfQuestion === null || logicThenQuestion === null) {
  //   return <SpinIcon />;
  // }

  return (
    <div className={styles.ruleSetter_wrapper}>
      <span className={styles.ruleSetter_item}>
        <h3>If:</h3>
        <AvailableQuestionListDisplay
          isAnotherDropDown={isAnotherDropDown}
          setIsAnotherDropDown={setIsAnotherDropDown}
        />
      </span>
      <span className={styles.ruleSetter_item}>
        <h3>Is:</h3>
        <ConditionStatementSelector
          isAnotherDropDown={isAnotherDropDown}
          setIsAnotherDropDown={setIsAnotherDropDown}
        />
      </span>
      <span className={styles.ruleSetter_item}>
        <h3>Value:</h3>
        <ValueConditionInput
          isAnotherDropDown={isAnotherDropDown}
          setIsAnotherDropDown={setIsAnotherDropDown}
        />
      </span>
      <span className={styles.ruleSetter_item}>
        <h3>Action:</h3>
        <ActionStatementSelector
          isAnotherDropDown={isAnotherDropDown}
          setIsAnotherDropDown={setIsAnotherDropDown}
        />
      </span>
      {logicActionStatement?.value === "end_survey" ? null : (
        <span className={styles.ruleSetter_item}>
          <h3>To:</h3>
          <AvailableQuestionListAfterSelect
            isAnotherDropDown={isAnotherDropDown}
            setIsAnotherDropDown={setIsAnotherDropDown}
          />
        </span>
      )}
    </div>
  );
};

export default RuleSetter;
