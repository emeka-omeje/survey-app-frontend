import React from "react";
import style from "./questionComponents.module.css";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io"; //for add question
import { QuestionOptionItem } from "../../../../Utils/dataTypes";

type QuestionCheckboxOptionsProps = {
  numberOfOptionsCreated: number;
  optionItemArray: QuestionOptionItem[];
  handleOptionTextChange: (id: string, newText: string) => void;
  handleRemoveOptions: (id: string) => void;
  handleAddOptions: () => void;
  // Callback to inform the parent about the current selected options (by index)
  // onSelectionChange?: (selected: number[]) => void;
};

const CheckboxInputOptions: React.FC<QuestionCheckboxOptionsProps> = ({
  numberOfOptionsCreated,
  optionItemArray,
  handleOptionTextChange,
  handleRemoveOptions,
  handleAddOptions,
  // onSelectionChange,
}) => {
  // const [optionItemArray, setoptionItemArray] = React.useState([
  //   "Option 1",
  // ]);
  // Maintain an array of indices representing which options are checked
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  // const  [eachQuestionOptionText, setEachQuestionOptionText] = React.useState<string>('');

  const handleCheckboxChange = (eachOptionCheckerId: string) => {
    let updatedSelection: string[];
    if (selectedOptions.includes(eachOptionCheckerId)) {
      // Uncheck the option: remove it from the array
      updatedSelection = selectedOptions.filter(
        (i) => i !== eachOptionCheckerId
      );
    } else {
      // Check the option: add it to the array
      updatedSelection = [...selectedOptions, eachOptionCheckerId];
    }
    setSelectedOptions(updatedSelection);
    // if (onSelectionChange) {
    //   onSelectionChange(updatedSelection);
    // }
  };

  return (
    <div className={style.questionInputOptions_main}>
      {optionItemArray
        .slice(0, numberOfOptionsCreated)
        .map((eachOptionItem, index) => (
          <div key={eachOptionItem.id} className={style.option}>
            <input
              type="checkbox"
              name="checkboxOptions"
              id={eachOptionItem.id}
              // value={eachOptionItem}
              checked={selectedOptions.includes(eachOptionItem.id)}
              onChange={() => handleCheckboxChange(eachOptionItem.id)}
            />
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className={style.optionInputText}
              value={eachOptionItem.text}
              onChange={(e) =>
                handleOptionTextChange(eachOptionItem.id, e.target.value)
              }
              // onClick={() => handleAddOptions}
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

export default CheckboxInputOptions;
