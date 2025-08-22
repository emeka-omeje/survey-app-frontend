import React from "react";
import style from "./questionComponents.module.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import {
  iconRegistry,
  questionTypeSelectListArray,
} from "./questionTypeSelectListArray";
import {
  QuestionFrameProps,
  QuestionTypeSelectList,
} from "../../../../Utils/dataTypes";
import { useBuilderPageFxns } from "../../../../Utils/useBuilderPageFxns";

type QuestionTypeSelectPropsType = {
  sectionId: string;
  questionType: QuestionFrameProps;
  // chooseDiffQuestionType: (
  //   sectionId: string,
  //   questionId: string,
  //   selectedType: QuestionTypeSelectList
  // ) => void;
};

const QuestionTypeSelect: React.FC<QuestionTypeSelectPropsType> = ({
  sectionId,
  questionType,
}) => {
  const { chooseDiffQuestionType } = useBuilderPageFxns();
  const [isOpen, setIsOpen] = React.useState(false);

  // we are retrieving the icon from the iconRegistry based on the questionTypeIcon
  const IconComponent = questionType.questionTypeIcon
    ? iconRegistry[questionType.questionTypeIcon]
    : null;

  const handleSelect = (option: QuestionTypeSelectList) => {
    chooseDiffQuestionType(sectionId, questionType.id, option);
    setIsOpen(false);
    // getQuestionTypeCallBack(option.value);
  };

  return (
    <span className={style.dropdown}>
      <button className={style.dropdown_btn} onClick={() => setIsOpen(!isOpen)}>
        <span>
          {IconComponent !== null ? (
            questionType.questionTypeLabel === "Multiple choice" ? (
              <div className={style.multiple_choice_icon}>
                <IconComponent size={16} />
              </div>
            ) : (
              <IconComponent size={20} />
            )
          ) : null}
          {questionType.questionTypeLabel}
        </span>
        <MdOutlineArrowDropDown size={30} />
      </button>
      {isOpen && (
        <ul className={style.dropdown_menu}>
          {questionTypeSelectListArray.map((option, optionIndex) => {
            // we then retrieve the icon from the iconRegistry based on the option's icon
            const OptionIcon = option.icon ? iconRegistry[option.icon] : null;
            return (
              <li
                key={optionIndex}
                className={
                  option.label === questionType.questionTypeLabel
                    ? style.dropdown_chosen
                    : ""
                }
                onClick={() => handleSelect(option)}
              >
                {OptionIcon ? (
                  option.label === "Multiple choice" ? (
                    // const OptionIcon = iconRegistry[option.icon];
                    <div className={style.multiple_choice_icon}>
                      <OptionIcon size={16} />
                    </div>
                  ) : (
                    <OptionIcon size={20} />
                  )
                ) : null}
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </span>
  );
};

export default QuestionTypeSelect;
