import React from "react";
import style from "./questionComponents.module.css";
import { MdOutlineCancel } from "react-icons/md";

type QuestionInputOptionsProps = {
  visibleOptions: number;
  handleRemoveOptions: () => void;
  handleAddOptions: () => void;
  optionsNumberArray: string[];
};

const MultipleChoiceInputOptions: React.FC<QuestionInputOptionsProps> = ({
  visibleOptions,
  handleRemoveOptions,
  handleAddOptions,
  optionsNumberArray,
}) => {
  // Define placeholders for each option
  // const [optionsNumberArray, setOptionsNumberArray] = React.useState([
  //   "Option 1",
  // ]);

  // Render only the number of options specified by visibleOptions
  return (
    <div className={style.questionInputOptions_main}>
      {optionsNumberArray
        .slice(0, visibleOptions)
        .map((eachOptionNumber, index) => (
          <div key={index} className={style.option}>
            <input
              type="radio"
              name="multipleChoiceOptions"
              id={`option${index}`}
              value={eachOptionNumber}
            />
            {/* <label htmlFor={`option${index}`}>{eachPlaceholder}</label> */}
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className={style.optionInputText}
              onChange={(e) => {
                optionsNumberArray[index] = e.target.value;
              }}
              onClick={handleAddOptions}
            />
            {index > 0 && (
              <span onClick={handleRemoveOptions}>
                <MdOutlineCancel size={18} />
              </span>
            )}
          </div>
        ))}
    </div>
  );
};

export default MultipleChoiceInputOptions;
