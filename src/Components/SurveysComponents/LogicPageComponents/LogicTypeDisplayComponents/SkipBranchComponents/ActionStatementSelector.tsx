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

const actionStatementObjectArray: conditionStatementObjectArrayProps[] = [
  { label: "Show", value: "show" },
  { label: "Hide", value: "hide" },
  { label: "Skip To", value: "skip_to" },
  { label: "End Survey", value: "end_survey" },
];

const ActionStatementSelector: React.FC<AnotherDropDownProps> = ({
  isAnotherDropDown,
  setIsAnotherDropDown,
}) => {
  const { setLogicActionStatement } = useAppStateMgtContext();
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
      setLogicActionStatement(optionProps);
      setIsAvailableQuestionListOpen(false);
      setIsAnotherDropDown(false);
    }
  };

  React.useEffect(() => {
    if (actionStatementObjectArray && actionStatementObjectArray.length > 0) {
      setLogicActionStatement(actionStatementObjectArray[0]);
    }
  }, []);

  // React.useEffect(() => {
  //   if (!isAnotherDropDown) {
  //     setIsAvailableQuestionListOpen(false);
  //   }
  // }, [isAnotherDropDown]);

  return (
    <span className={styles.availableQuestionListDisplay}>
      <SelectorComponent
        tag="Action"
        isAnotherDropDown={isAnotherDropDown}
        handleOnclick={handleOnclick}
        handleAvailableQuestionUpdate={handleAvailableQuestionUpdate}
        isAvailableQuestionListOpen={isAvailableQuestionListOpen}
        RenderObjectArray={actionStatementObjectArray}
      />
    </span>
  );
};

export default ActionStatementSelector;
