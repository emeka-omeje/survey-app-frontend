import React from "react";
import style from "./questionComponents.module.css";
import { MdOutlineCancel } from "react-icons/md";

type QuestionCheckboxOptionsProps = {
  visibleOptions: number;
  optionsNumberArray: string[];
  onOptionChange: (index: number, value: string) => void;
  handleRemoveOption: () => void;
  handleAddOptions: () => void;
  // Callback to inform the parent about the current selected options (by index)
  onSelectionChange?: (selected: number[]) => void;
};

const CheckboxInputOptions: React.FC<QuestionCheckboxOptionsProps> = ({
  visibleOptions,
  optionsNumberArray,
  onOptionChange,
  handleRemoveOption,
  handleAddOptions,
  onSelectionChange,
}) => {
  // const [optionsNumberArray, setOptionsNumberArray] = React.useState([
  //   "Option 1",
  // ]);
  // Maintain an array of indices representing which options are checked
  const [selectedOptions, setSelectedOptions] = React.useState<number[]>([]);

  const  [eachQuestionOptionText, setEachQuestionOptionText] = React.useState<string>('');

  const handleCheckboxChange = (index: number) => {
    let updatedSelection: number[];
    if (selectedOptions.includes(index)) {
      // Uncheck the option: remove it from the array
      updatedSelection = selectedOptions.filter((i) => i !== index);
    } else {
      // Check the option: add it to the array
      updatedSelection = [...selectedOptions, index];
    }
    setSelectedOptions(updatedSelection);
    if (onSelectionChange) {
      onSelectionChange(updatedSelection);
    }
  };

  return (
    <div className={style.questionInputOptions_main}>
      {optionsNumberArray
        .slice(0, visibleOptions)
        .map((eachOptionNumber, index) => (
          <div key={index} className={style.option}>
            <input
              type="checkbox"
              name="checkboxOptions"
              id={`checkbox-${index}`}
              value={eachOptionNumber}
              checked={selectedOptions.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className={style.optionInputText}
              onChange={(e) => onOptionChange(index, e.target.value)}
              onClick={() => handleAddOptions}
            />
            {index > 0 && (
              <span onClick={() => handleRemoveOption()}>
                <MdOutlineCancel size={18} />
              </span>
            )}
          </div>
        ))}
    </div>
  );
};

export default CheckboxInputOptions;
