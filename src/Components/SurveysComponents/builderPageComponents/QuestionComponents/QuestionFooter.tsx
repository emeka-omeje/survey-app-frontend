import React from "react";
import style from "./questionComponents.module.css";
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import ListEachItemOtherProps from "../../../ListEachItemOtherProps";
import ToggleSwitchComponent from "../../../ToggleSwitchComponent";
import { IoMdMore } from "react-icons/io";
import { QuestionFooterPropsType } from "../../../../Utils/dataTypes";
import { MdDragHandle } from "react-icons/md";
// import { useAppStateMgtContext } from "../../../../Utils/AppContext";
import { useBuilderPageFxns } from "../../../../Utils/useBuilderPageFxns";

const QuestionFooter: React.FC<QuestionFooterPropsType> = ({
  sectionId,
  questionId,
  onRemoveQuestionFrame,
  dragHandleProps,
  itemIndex,
  sectionIndex,
  totalSections,
}) => {
  // const { surveyData, setSurveyData } = useAppStateMgtContext();
  const {getQuestionNumber} = useBuilderPageFxns()

  // if (!sectionIndex) return null;
  const questionNumber = getQuestionNumber(sectionIndex, itemIndex, totalSections);

  return (
    <div className={style.questionInputFooter_wrapper}>
      <div className={style.questionInputFooter_main}>
        <h4>{questionNumber}</h4>

        {/* <div className={style.questionInputFooter_main}>
        <label htmlFor="assignedPoint">
          <i>Assign point:</i>
        </label>
        <input
          type="text"
          id="assignedPoint"
          value={assignedPointValue}
          onChange={(e) => setAssignedPointValue(Number(e.target.value))}
        />
      </div> */}
      </div>
      <div
        {...dragHandleProps.attributes}
        {...dragHandleProps.listeners}
        style={{
          cursor: "grab",
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <MdDragHandle style={{ fontSize: "24px", color: `var(--navy-blue)` }} />
      </div>
      <div className={style.questionInputFooter_alt}>
        <ListEachItemOtherProps
          Icon={MdContentCopy}
          toolTip="Duplicate"
          IconSize="20px"
          fontSize="10px"
        />
        <span onClick={() => onRemoveQuestionFrame(sectionId, questionId)}>
          <ListEachItemOtherProps
            Icon={MdDeleteOutline}
            toolTip="Delete"
            IconSize="24px"
            fontSize="10px"
            // getCallBack={onRemoveQuestionFrame}
          />
        </span>
        <span className={style.requireToggle}>
          <p>Required</p>
          <ToggleSwitchComponent
            sectionId={sectionId}
            questionId={questionId}
          />
        </span>
        <ListEachItemOtherProps
          Icon={IoMdMore}
          toolTip="More"
          IconSize="24px"
          fontSize="10px"
        />
      </div>
    </div>
  );
};

export default QuestionFooter;
