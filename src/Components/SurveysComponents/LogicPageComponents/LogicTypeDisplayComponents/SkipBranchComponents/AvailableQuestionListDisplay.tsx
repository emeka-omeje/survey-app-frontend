import React from "react";
import styles from "./skip_branch.module.css";
import AvailableQuestionListFlatArray from "./AvailableQuestionListFlatArray";
import { AvailableQuestionListFlatArrayProps } from "../../../../../Utils/dataTypes";
import { useBuilderPageFxns } from "../../../../../Utils/useBuilderPageFxns";
// import { useAppStateMgtContext } from "../../../../../Utils/AppContext";

const AvailableQuestionListDisplay: React.FC = () => {
    // const {sections} = useAppStateMgtContext();
  const AvailableQuestionListArray = AvailableQuestionListFlatArray();
  const [isAvailableQuestionListOpen, setIsAvailableQuestionListOpen] =
      React.useState<boolean>(false);
    // const { setQuestionLogic } = useBuilderPageFxns();
    
    const handleAvailableQuestionUpdate = (question: AvailableQuestionListFlatArrayProps) => {
        console.log("Selected Question:", question);
        // setQuestionLogic(question.ownSectionProps.sectionId, question.questionFrame.id, )
        setIsAvailableQuestionListOpen(false)
    }

  return (
    <span className={styles.availableQuestionListDisplay}>
      <button
        className={styles.availableQuestionListDisplay_btn}
        onClick={() =>
          setIsAvailableQuestionListOpen(!isAvailableQuestionListOpen)
        }
      >{`${AvailableQuestionListArray[0].questionNumber}: ${
        AvailableQuestionListArray[0].questionFrame.questionText ||
        "Question Text Not Available."
      }`}</button>
      {isAvailableQuestionListOpen && (
        <ul className={styles.availableQuestionListDisplay_wrapper}>
          {AvailableQuestionListArray.map((question, index) => (
            <li
              key={index}
                  className={styles.availableQuestionListDisplay_item}
                  onClick={()=> handleAvailableQuestionUpdate(question)}
            >{`${question.questionNumber}: ${
              question.questionFrame.questionText ||
              "Question Text Not Available."
            }`}</li>
          ))}
        </ul>
      )}
    </span>
  );
};

export default AvailableQuestionListDisplay;
