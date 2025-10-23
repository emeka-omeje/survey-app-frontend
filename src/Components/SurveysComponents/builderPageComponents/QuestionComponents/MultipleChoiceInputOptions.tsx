import React from "react";
import style from "./questionComponents.module.css";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { QuestionOptionItem } from "../../../../Utils/dataTypes";

type QuestionInputOptionsProps = {
  numberOfOptionsCreated: number;
  handleRemoveOptions: (id: string) => void;
  handleAddOptions: () => void;
  optionItemArray: QuestionOptionItem[];
  handleOptionTextChange: (id: string, newText: string) => void;
};

const MultipleChoiceInputOptions: React.FC<QuestionInputOptionsProps> = ({
  numberOfOptionsCreated,
  handleRemoveOptions,
  handleAddOptions,
  optionItemArray,
  handleOptionTextChange,
}) => {
  // Define placeholders for each option
  // const [optionItemArray, setoptionItemArray] = React.useState([
  //   "Option 1",
  // ]);

  // Render only the number of options specified by numberOfOptionsCreated
  return (
    <div className={style.questionInputOptions_main}>
      {optionItemArray
        .slice(0, numberOfOptionsCreated)
        .map((eachOptionItem, index) => (
          <div key={eachOptionItem.id} className={style.option}>
            <input
              type="radio"
              name="multipleChoiceOptions"
              id={eachOptionItem.id}
              // value={eachOptionItem.text}
            />
            {/* <label htmlFor={`option${index}`}>{eachPlaceholder}</label> */}
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className={style.optionInputText}
              value={eachOptionItem.text}
              onChange={(e) =>
                handleOptionTextChange(eachOptionItem.id, e.target.value)
              }
              // onClick={handleAddOptions}
            />
            {numberOfOptionsCreated > 0 && (
              <span onClick={() => handleRemoveOptions(eachOptionItem.id)}>
                <MdOutlineCancel size={18} />
              </span>
            )}
          </div>
        ))}
      <span
        className={style.questionInputOptions_add}
        onClick={handleAddOptions}
      >
        <IoMdAddCircleOutline size={18} />
        Add
      </span>
    </div>
  );
};

export default MultipleChoiceInputOptions;
