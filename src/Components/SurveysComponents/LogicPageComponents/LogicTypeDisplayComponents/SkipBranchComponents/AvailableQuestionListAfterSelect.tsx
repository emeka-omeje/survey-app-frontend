import React from "react";
import styles from "./skip_branch.module.css";
import SelectorComponent from "./SelectorComponent";
import {
  AnotherDropDownProps,
  AvailableQuestionListFlatArrayProps,
  conditionStatementObjectArrayProps,
} from "../../../../../Utils/dataTypes";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import useAvailableQuestionsAfterSelected from "./AvailableQuestionAfterSelectHook";

const AvailableQuestionListAfterSelect: React.FC<AnotherDropDownProps> = ({
  isAnotherDropDown,
  setIsAnotherDropDown,
}) => {
  const { logicIfQuestion, logicThenQuestion, setLogicThenQuestion } =
    useAppStateMgtContext();

  const selectedQuestionId = logicIfQuestion?.questionFrame.id ?? "";
  const questionsAfterSelected =
    useAvailableQuestionsAfterSelected(selectedQuestionId);
  //   const questionsAfterSelected = useAvailableQuestionsAfterSelected(
  //     logicIfQuestion!.availableQuestionArrayIndex
  //   );
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
    if ("questionFrame" in optionProps) {
      setLogicThenQuestion(optionProps);
      setIsAvailableQuestionListOpen(false);
      setIsAnotherDropDown(false);
    }
  };

  React.useEffect(() => {
    if (
      questionsAfterSelected &&
      questionsAfterSelected.length > 0 &&
      logicThenQuestion === null
    ) {
      setLogicThenQuestion(questionsAfterSelected[0]);
    }
  }, [logicThenQuestion, questionsAfterSelected, setLogicThenQuestion]);

  //   React.useEffect(() => {
  //     if (isAnotherDropDown === false) {
  //       setIsAvailableQuestionListOpen(false);
  //       setIsAnotherDropDown(false);
  //     }
  //   }, [isAnotherDropDown]);

  return (
    <span className={styles.availableQuestionListDisplay}>
      {questionsAfterSelected.length > 0 ? (
        <SelectorComponent
          tag="Then"
          isAnotherDropDown={isAnotherDropDown}
          handleOnclick={handleOnclick}
          handleAvailableQuestionUpdate={handleAvailableQuestionUpdate}
          isAvailableQuestionListOpen={isAvailableQuestionListOpen}
          RenderObjectArray={questionsAfterSelected}
        />
      ) : (
        <button className={styles.availableQuestionListDisplay_btn}>
          No available question after selecting question{" "}
          {`${logicIfQuestion?.questionNumber}`}
        </button>
      )}
    </span>
  );
};

export default AvailableQuestionListAfterSelect;
