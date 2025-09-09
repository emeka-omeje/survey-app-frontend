import React from "react";
import styles from "./skip_branch.module.css";
// import AvailableQuestionListFlatArray from "./AvailableQuestionListFlatArray";
// import { AvailableQuestionListFlatArrayProps } from "../../../../../Utils/dataTypes";
// // import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import {
  AnotherDropDownProps,
  AvailableQuestionListFlatArrayProps,
  conditionStatementObjectArrayProps,
} from "../../../../../Utils/dataTypes";
import SelectorComponent from "./SelectorComponent";
import { conditionStatementObjectArray } from "./Object_ArrayStatments";

// const conditionStatementObjectArray: conditionStatementObjectArrayProps[] = [
//   { label: "True/False", value: "true_false" },
//   { label: "Equal", value: "equal" },
//   { label: "Not Equal", value: "not_equal" },
//   { label: "Greater Than", value: "greater_than" },
//   { label: "Less Than", value: "less_than" },
//   { label: "Includes", value: "includes" },
// ];

const ConditionStatementSelector: React.FC<AnotherDropDownProps> = ({
  isAnotherDropDown,
  setIsAnotherDropDown,
}) => {
  const { logicConditionStatement, setLogicConditionStatement } = useAppStateMgtContext();
  const [isAvailableQuestionListOpen, setIsAvailableQuestionListOpen] =
    React.useState<boolean>(false);

  const handleOnclick = () => {
    setIsAvailableQuestionListOpen(true);
    setIsAnotherDropDown(true);
  };

  const handleAvailableQuestionUpdate = (
    optionProps:
      | conditionStatementObjectArrayProps
      | AvailableQuestionListFlatArrayProps
  ) => {
    if ("label" in optionProps) {
      setLogicConditionStatement(optionProps);
      setIsAvailableQuestionListOpen(false);
      setIsAnotherDropDown(false);
    }
  };

  React.useEffect(() => {
    if (
      conditionStatementObjectArray &&
      conditionStatementObjectArray.length > 0 &&
      logicConditionStatement === null
    ) {
      setLogicConditionStatement(conditionStatementObjectArray[0]);
    }
  }, [logicConditionStatement, conditionStatementObjectArray]);


  // React.useEffect(() => {
  //   if (!isAnotherDropDown) {
  //     setIsAvailableQuestionListOpen(false);
  //   }
  // }, [isAnotherDropDown]);

  return (
    <span className={styles.availableQuestionListDisplay}>
      <SelectorComponent
        tag="Condition"
        isAnotherDropDown={isAnotherDropDown}
        handleOnclick={handleOnclick}
        handleAvailableQuestionUpdate={handleAvailableQuestionUpdate}
        isAvailableQuestionListOpen={isAvailableQuestionListOpen}
        RenderObjectArray={conditionStatementObjectArray}
      />
    </span>
  );
};

export default ConditionStatementSelector;
