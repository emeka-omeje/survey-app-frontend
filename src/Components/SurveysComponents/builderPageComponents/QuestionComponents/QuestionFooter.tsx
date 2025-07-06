import React from "react";
import style from "./questionComponents.module.css";
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import ListEachItemOtherProps from "../../../ListEachItemOtherProps";
import ToggleSwitchComponent from "../../../ToggleSwitchComponent";
import { IoMdMore } from "react-icons/io";

type QuestionFooterPropsType = {
  sectionId: string;
  questionId: string;
  onRemoveQuestionFrame: (
    sectionId: string,
    questionId: string,
  ) => void;
};

const QuestionFooter: React.FC<QuestionFooterPropsType> = ({sectionId, questionId, onRemoveQuestionFrame}) => {
// const QuestionFooter: React.FC = () => {
  const [assignedPointValue, setAssignedPointValue] = React.useState(0);
  return (
    <div className={style.questionInputFooter_wrapper}>
      <div className={style.questionInputFooter_main}>
        <label htmlFor="assignedPoint">
          <i>Assign point:</i>
        </label>
        <input
          type="text"
          id="assignedPoint"
          value={assignedPointValue}
          onChange={(e) => setAssignedPointValue(Number(e.target.value))}
        />
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
          <ToggleSwitchComponent />
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
