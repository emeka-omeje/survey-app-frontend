import React from "react";
import styles from "./skip_branch.module.css";
import { SelectorDropDownProps } from "../../../../../Utils/dataTypes";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import {
  isAvailableQuestionListFlatArray,
  isConditionStatementObjectArray,
} from "./SelectorTypeGuard";

const SelectorComponent: React.FC<SelectorDropDownProps> = ({
  tag,
  isAnotherDropDown,
  handleOnclick,
  handleAvailableQuestionUpdate,
  isAvailableQuestionListOpen,
  RenderObjectArray,
}) => {
  const {
    logicConditionStatement,
    logicConditionValue,
    logicActionStatement,
    logicIfQuestion,
    logicThenQuestion,
  } = useAppStateMgtContext();

  if(typeof logicConditionValue === "string" || typeof logicConditionValue === "number") return <div>Loading...</div>

  return (
    <>
      <button
        className={styles.availableQuestionListDisplay_btn}
        onClick={() => isAnotherDropDown === false && handleOnclick()}
      >
        {tag === "Condition"
          ? logicConditionStatement?.label
          : tag === "Action"
          ? logicActionStatement?.label
          : tag === "Boolean"
          ? logicConditionValue?.label
          : tag === "Then"
          ? `${logicThenQuestion?.questionNumber}: ${
              logicThenQuestion?.questionFrame.questionText ||
              "Question Text Not Available."
            }`
          : `${logicIfQuestion?.questionNumber}: ${
              logicIfQuestion?.questionFrame.questionText ||
              "Question Text Not Available."
            }`}
      </button>
      {isAvailableQuestionListOpen && (
        <ul className={styles.availableQuestionListDisplay_wrapper}>
          {isConditionStatementObjectArray(RenderObjectArray)
            ? RenderObjectArray.map((conditionStatement, index) => (
                <li
                  key={index}
                  className={styles.availableQuestionListDisplay_item}
                  onClick={() =>
                    handleAvailableQuestionUpdate(conditionStatement)
                  }
                >
                  {conditionStatement.label}
                </li>
              ))
            : isAvailableQuestionListFlatArray(RenderObjectArray)
            ? RenderObjectArray.map((question, index) => (
                <li
                  key={index}
                  className={styles.availableQuestionListDisplay_item}
                  onClick={() => handleAvailableQuestionUpdate(question)}
                >
                  {`${question.questionNumber}: ${
                    question.questionFrame.questionText ||
                    "Question Text Not Available."
                  }`}
                </li>
              ))
            : null}
        </ul>
      )}
    </>
  );
};

export default SelectorComponent;
