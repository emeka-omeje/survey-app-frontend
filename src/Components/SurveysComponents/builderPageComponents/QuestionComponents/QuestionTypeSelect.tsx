import React from "react";
import style from "./questionComponents.module.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { QuestionTypeSelectList, questionTypeSelectListArray } from "./questionTypeSelectListArray";
import { QuestionFrameProps } from "../../../../Utils/dataTypes";

type QuestionTypeSelectPropsType = {
  sectionId: string;
  questionType: QuestionFrameProps;
  chooseDiffQuestionType: (
    sectionId: string,
    questionId: string,
    selectedType: QuestionTypeSelectList
  ) => void;
};

const QuestionTypeSelect: React.FC<QuestionTypeSelectPropsType> = ({
  sectionId,
  questionType,
  chooseDiffQuestionType,
}) => {
  // const questionTypesArray: QuestionTypeSelectList[] = [
  //   // { value: "", label: "Select question type", icon: null},
  //   {
  //     value: "multiple-choice",
  //     label: "Multiple choice",
  //     icon: RiCheckboxBlankCircleFill,
  //   },
  //   { value: "checkboxes", label: "Checkboxes", icon: MdOutlineCheckBox },
  //   { value: "dropdown", label: "Dropdown", icon: IoIosArrowDropdown },
  //   { value: "short-answer", label: "Short answer", icon: MdOutlineShortText },
  //   { value: "long-answer", label: "Long answer", icon: BsTextParagraph },
  //   { value: "rating", label: "Rating", icon: IoMdStarOutline },
  //   { value: "date", label: "Date", icon: RiCalendarEventLine },
  //   { value: "time", label: "Time", icon: PiTimerBold },
  //   { value: "file-upload", label: "File upload", icon: MdOutlineFileUpload },
  // ];
  const [isOpen, setIsOpen] = React.useState(false);
  //   const [selected, setSelected] = React.useState("Select question type");

  const handleSelect = (option: QuestionTypeSelectList) => {
    chooseDiffQuestionType(sectionId, questionType.id, option);
    setIsOpen(false);
    // getQuestionTypeCallBack(option.value);
  };

  // React.useEffect(() => {
  //   getQuestionTypeCallBack(questionTypesArray[0]);
  // }, []);

  return (
    <span className={style.dropdown}>
      <button className={style.dropdown_btn} onClick={() => setIsOpen(!isOpen)}>
        <span>
          {questionType.questionTypeIcon !== null ? (
            questionType.questionTypeLabel === "Multiple choice" ? (
              <div className={style.multiple_choice_icon}>
                <questionType.questionTypeIcon size={16} />
              </div>
            ) : (
              <questionType.questionTypeIcon size={20} />
            )
          ) : null}
          {questionType.questionTypeLabel}
        </span>
        <MdOutlineArrowDropDown size={30} />
      </button>
      {isOpen && (
        <ul className={style.dropdown_menu}>
          {questionTypeSelectListArray.map((option, optionIndex) => (
            <li
              key={optionIndex}
              className={
                option.label === questionType.questionTypeLabel ? style.dropdown_chosen : ""
              }
              onClick={() => handleSelect(option)}
            >
              {option.icon !== null ? (
                option.label === "Multiple choice" ? (
                  <div className={style.multiple_choice_icon}>
                    <option.icon size={16} />
                  </div>
                ) : (
                  <option.icon size={20} />
                )
              ) : null}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};

export default QuestionTypeSelect;
