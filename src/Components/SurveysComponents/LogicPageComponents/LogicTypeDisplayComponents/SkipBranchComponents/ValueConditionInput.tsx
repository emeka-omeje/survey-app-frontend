import React from "react";
import styles from "./skip_branch.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import {
  AnotherDropDownProps,
  AvailableQuestionListFlatArrayProps,
  conditionStatementObjectArrayProps,
} from "../../../../../Utils/dataTypes";
import SelectorComponent from "./SelectorComponent";
import { booleanObjectArray } from "./ConditionalObject_ArrayStatments";

// const booleanObjectArray: conditionStatementObjectArrayProps[] = [
//   { label: "True", value: "true" },
//   { label: "False", value: "false" },
// ];

const ValueConditionInput: React.FC<AnotherDropDownProps> = ({
  isAnotherDropDown,
  setIsAnotherDropDown,
}) => {
  const {
    logicConditionStatement,
    logicConditionValue,
    setLogicConditionValue,
  } = useAppStateMgtContext();
  const [isAvailableQuestionListOpen, setIsAvailableQuestionListOpen] =
    React.useState<boolean>(false);

  const handleOnclick = () => {
    setIsAvailableQuestionListOpen(true);
    setIsAnotherDropDown(true);
  };

  const handleValueConditionChange = (
    optionProps:
      | conditionStatementObjectArrayProps
      | AvailableQuestionListFlatArrayProps
  ) => {
    if ("label" in optionProps) {
      setLogicConditionValue(optionProps);
      setIsAvailableQuestionListOpen(false);
      setIsAnotherDropDown(false);
    }
  };

  const handleStringValueConditionChange = (value: string) => {
    setLogicConditionValue(value);
  };

  const handleNumberValueConditionChange = (value: number) => {
    setLogicConditionValue(value);
  };

  React.useEffect(() => {
    if (
      booleanObjectArray &&
      booleanObjectArray.length > 0 &&
      logicConditionStatement?.value === "true_false"
    ) {
      setLogicConditionValue(booleanObjectArray[0]);
    }
  }, [logicConditionStatement, booleanObjectArray]);

  return (
    <>
      {logicConditionStatement?.value === "true_false" ? (
        <span className={styles.availableQuestionListDisplay}>
          <SelectorComponent
            tag="Boolean"
            isAnotherDropDown={isAnotherDropDown}
            handleOnclick={handleOnclick}
            handleAvailableQuestionUpdate={handleValueConditionChange}
            isAvailableQuestionListOpen={isAvailableQuestionListOpen}
            RenderObjectArray={booleanObjectArray}
          />
        </span>
      ) : logicConditionStatement?.value === "includes" ? (
        <input
          className={styles.valueCondition_input}
          placeholder={"Enter text"}
          type="text"
          onChange={(e) => handleStringValueConditionChange(e.target.value)}
          value={
            typeof logicConditionValue === "string" ? logicConditionValue : ""
          }
        />
      ) : (
        <input
          className={styles.valueCondition_input}
          type="number"
          id="numberValue_condition"
          placeholder={"Enter a number"}
          onChange={(e) => handleNumberValueConditionChange(+e.target.value)}
          value={
            typeof logicConditionValue === "number" ? logicConditionValue : 0
          }
        />
      )}
    </>
  );
};

export default ValueConditionInput;
